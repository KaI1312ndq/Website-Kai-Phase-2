import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { sendDeliveryEmail } from "@/lib/email/send-delivery";

/**
 * Confirm payment + send file delivery email.
 * Quảng tick "đã thanh toán" trong Sanity Studio → API này trigger gửi email.
 *
 * POST /api/orders/deliver?secret=<SEED_SECRET>
 *   body: { orderId: string }
 *
 * Effect:
 *   1. Fetch order from Sanity
 *   2. Generate downloadExpiresAt = now + 30 days
 *   3. Send email via Resend with download link
 *   4. Update Sanity: paymentStatus=paid, deliveryStatus=delivered, paidAt, deliveredAt
 */

/**
 * Auth: accept either
 *   1. ?secret=<SEED_SECRET> (for cURL / external admin)
 *   2. Origin or Referer matches NEXT_PUBLIC_SITE_URL (for Sanity Studio actions)
 *      — Studio is protected by Sanity login so this is acceptable.
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

    const token = process.env.SANITY_API_WRITE_TOKEN;
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!token || !projectId) {
      return NextResponse.json({ error: "Sanity not configured" }, { status: 500 });
    }

    const sanity = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      token,
      useCdn: false,
    });

    // Fetch order
    const order = await sanity.fetch(
      `*[_type == "order" && _id == $id][0] {
        _id, orderNumber, customer, items, total, downloadToken,
        paymentStatus, deliveryStatus
      }`,
      { id: orderId }
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.deliveryStatus === "delivered") {
      return NextResponse.json({ ok: true, alreadyDelivered: true, message: "Already delivered" });
    }

    // Calculate expiry — 30 days from now
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    // Send email
    const emailResult = await sendDeliveryEmail({
      to: order.customer.email,
      customerName: order.customer.name,
      orderNumber: order.orderNumber,
      total: order.total,
      items: order.items.map((it: any) => ({ title: it.title })),
      downloadToken: order.downloadToken,
      expiresAt: expiresAt.toISOString(),
    });

    // Update Sanity
    const patches: any = {
      deliveryStatus: emailResult.ok ? "delivered" : "failed",
      downloadExpiresAt: expiresAt.toISOString(),
    };
    if (emailResult.ok) {
      patches.deliveredAt = now.toISOString();
      if (emailResult.emailId) patches.resendEmailId = emailResult.emailId;
    }
    if (order.paymentStatus !== "paid") {
      patches.paymentStatus = "paid";
      patches.paidAt = now.toISOString();
    }

    await sanity.patch(orderId).set(patches).commit();

    return NextResponse.json({
      ok: emailResult.ok,
      orderNumber: order.orderNumber,
      email: order.customer.email,
      error: emailResult.error,
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unknown error" }, { status: 500 });
  }
}
