import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { sendDeliveryEmail } from "@/lib/email/send-delivery";

/**
 * Admin order actions.
 *   POST /api/admin/orders/[orderId]
 *   body: { action: "deliver" | "resend" | "refund" | "note", notes?: string }
 */

export async function POST(req: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { orderId } = await params;
  const body = await req.json().catch(() => ({}));
  const action = String(body?.action || "");

  const sb = getSupabaseAdmin();
  const { data: order } = await sb.from("orders").select("*").eq("id", orderId).maybeSingle();
  if (!order) return NextResponse.json({ ok: false, error: "Order not found" }, { status: 404 });

  const now = new Date();

  // ── action: note ──
  if (action === "note") {
    const notes = typeof body?.notes === "string" ? body.notes.slice(0, 2000) : "";
    const { error } = await sb.from("orders").update({ notes: notes || null }).eq("id", orderId);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, message: "Đã cập nhật note" });
  }

  // ── action: refund ──
  if (action === "refund") {
    const { error } = await sb.from("orders").update({
      payment_status: "refunded",
      status: "refunded",
    }).eq("id", orderId);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, message: "Đã đánh dấu refunded" });
  }

  // ── action: deliver / resend ──
  if (action === "deliver" || action === "resend") {
    const { data: items } = await sb
      .from("order_items")
      .select("title_snapshot")
      .eq("order_id", orderId);

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
    if (action === "deliver" && order.payment_status !== "paid") {
      patches.payment_status = "paid";
      patches.status = "paid";
      patches.paid_at = now.toISOString();
    }

    await sb.from("orders").update(patches).eq("id", orderId);

    return NextResponse.json({
      ok: emailResult.ok,
      message: emailResult.ok ? "Đã gửi email" : `Gửi email lỗi: ${emailResult.error || "unknown"}`,
      error: emailResult.error,
    });
  }

  return NextResponse.json({ ok: false, error: "Unknown action" }, { status: 400 });
}
