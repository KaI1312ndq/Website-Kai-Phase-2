import { NextRequest, NextResponse } from "next/server";
import { sendDeliveryEmail } from "@/lib/email/send-delivery";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Confirm payment + send file delivery email.
 * Quảng trigger qua /account/admin hoặc curl với ?secret.
 *
 * POST /api/orders/deliver?secret=<SEED_SECRET>
 *   body: { orderId: string }  (Supabase uuid của orders.id)
 */

function checkAuth(req: NextRequest): boolean {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  if (process.env.SEED_SECRET && secret === process.env.SEED_SECRET) return true;

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.nguyenducquang.website").replace(/\/$/, "");
  const origin = req.headers.get("origin")?.replace(/\/$/, "");
  const referer = req.headers.get("referer") || "";
  if (origin === siteUrl) return true;
  if (referer.startsWith(siteUrl)) return true;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    if (!checkAuth(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { orderId } = body || {};
    if (typeof orderId !== "string" || !orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const sb = getSupabaseAdmin();
    const { data: order, error: fetchErr } = await sb
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .maybeSingle();
    if (fetchErr || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.delivery_status === "delivered") {
      return NextResponse.json({ ok: true, alreadyDelivered: true, message: "Already delivered" });
    }

    const { data: items } = await sb
      .from("order_items")
      .select("title_snapshot")
      .eq("order_id", orderId);

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const emailResult = await sendDeliveryEmail({
      to: String(order.customer_email),
      customerName: String(order.customer_name),
      orderNumber: String(order.order_number),
      total: Number(order.total),
      items: (items || []).map((it) => ({ title: String(it.title_snapshot) })),
      downloadToken: String(order.download_token),
      expiresAt: expiresAt.toISOString(),
    });

    const patches: Record<string, unknown> = {
      delivery_status: emailResult.ok ? "delivered" : "failed",
      download_expires_at: expiresAt.toISOString(),
    };
    if (emailResult.ok) {
      patches.delivered_at = now.toISOString();
      if (emailResult.emailId) patches.resend_email_id = emailResult.emailId;
    }
    if (order.payment_status !== "paid") {
      patches.payment_status = "paid";
      patches.status = "paid";
      patches.paid_at = now.toISOString();
    }

    await sb.from("orders").update(patches).eq("id", orderId);

    return NextResponse.json({
      ok: emailResult.ok,
      orderNumber: order.order_number,
      email: order.customer_email,
      error: emailResult.error,
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unknown error" }, { status: 500 });
  }
}
