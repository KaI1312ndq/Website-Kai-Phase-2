import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { auth } from "@clerk/nextjs/server";
import { calculatePrice, generateOrderNumber, generateDownloadToken } from "@/lib/payment/config";
import { getVoucherByCode } from "@/lib/queries";
import { normalizeCode, validateVoucher } from "@/lib/voucher";
import { sendDeliveryEmail } from "@/lib/email/send-delivery";

/**
 * Create new order with selected products.
 * POST /api/orders/create
 *   body: {
 *     productIds: string[],
 *     customer: { name, email, phone },
 *     voucherCode?: string,
 *   }
 * Returns: { orderNumber, total, redirectUrl, isFree }
 *
 * If voucher reduces total to 0 → mark paid + delivered immediately, send file email, skip QR.
 */

const RATE_LIMIT = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT.get(ip);
  if (!entry || entry.resetAt < now) {
    RATE_LIMIT.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Quá nhiều đơn trong 1 phút. Vui lòng đợi." }, { status: 429 });
    }

    const body = await req.json();
    const { productIds, customer, voucherCode } = body || {};

    if (!Array.isArray(productIds) || productIds.length === 0 || productIds.length > 10) {
      return NextResponse.json({ error: "productIds phải là mảng 1-10 phần tử" }, { status: 400 });
    }
    if (!customer || typeof customer !== "object") {
      return NextResponse.json({ error: "Thiếu thông tin khách hàng" }, { status: 400 });
    }
    const { name, email, phone } = customer;
    if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
      return NextResponse.json({ error: "Tên không hợp lệ" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@") || email.length > 120) {
      return NextResponse.json({ error: "Email không hợp lệ" }, { status: 400 });
    }
    const phoneClean = typeof phone === "string" ? phone.replace(/\D/g, "") : "";
    if (phoneClean.length < 9 || phoneClean.length > 12) {
      return NextResponse.json({ error: "SĐT không hợp lệ" }, { status: 400 });
    }

    const token = process.env.SANITY_API_WRITE_TOKEN;
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!token || !projectId || projectId === "placeholder") {
      return NextResponse.json({ error: "Sanity not configured" }, { status: 500 });
    }

    const sanity = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      token,
      useCdn: false,
    });

    // Fetch products to validate + lock prices
    const products = (await sanity.fetch(
      `*[_type == "product" && active == true && _id in $ids] { _id, title, price }`,
      { ids: productIds }
    )) as Array<{ _id: string; title: string; price: number }>;

    if (products.length !== productIds.length) {
      return NextResponse.json({ error: "Một số sản phẩm không tồn tại hoặc đã hết bán" }, { status: 400 });
    }

    // Bundle pricing
    const bundle = calculatePrice(products.length);
    let total = bundle.total;
    let voucherDiscount = 0;
    let appliedCode: string | null = null;
    let voucherDocId: string | null = null;

    // Voucher (re-validate server-side)
    if (voucherCode && typeof voucherCode === "string" && voucherCode.trim()) {
      const code = normalizeCode(voucherCode);
      const voucher = await getVoucherByCode(code);
      const check = validateVoucher(voucher, total);
      if (!check.ok) {
        return NextResponse.json({ error: `Voucher: ${check.error}` }, { status: 400 });
      }
      voucherDiscount = check.discount;
      total = check.finalTotal;
      appliedCode = check.voucher.code;
      voucherDocId = check.voucher._id;
    }

    // Attach Clerk userId if signed in
    let clerkUserId: string | null = null;
    try {
      const { userId } = await auth();
      clerkUserId = userId || null;
    } catch {}

    // Generate unique order number
    let orderNumber = generateOrderNumber();
    for (let i = 0; i < 5; i++) {
      const existing = await sanity.fetch(`*[_type == "order" && orderNumber == $on][0]._id`, { on: orderNumber });
      if (!existing) break;
      orderNumber = generateOrderNumber();
    }

    const downloadToken = generateDownloadToken();
    const now = new Date();
    const isFree = total === 0;

    const doc: any = {
      _type: "order",
      orderNumber,
      ...(clerkUserId ? { clerkUserId } : {}),
      customer: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phoneClean,
      },
      items: products.map((p) => ({
        _key: p._id,
        product: { _type: "reference", _ref: p._id },
        title: p.title,
        price: p.price,
      })),
      subtotal: bundle.subtotal,
      discount: bundle.discount,
      ...(appliedCode ? { voucherCode: appliedCode, voucherDiscount } : { voucherDiscount: 0 }),
      total,
      paymentStatus: isFree ? "paid" : "pending",
      deliveryStatus: "pending",
      downloadToken,
      createdAt: now.toISOString(),
      ...(isFree ? { paidAt: now.toISOString() } : {}),
    };

    const created = await sanity.create(doc);

    // If voucher applied, bump usedCount (best-effort)
    if (voucherDocId) {
      try {
        await sanity.patch(voucherDocId).inc({ usedCount: 1 }).commit();
      } catch {}
    }

    // Free order → auto-send delivery email immediately
    if (isFree) {
      try {
        const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        const emailResult = await sendDeliveryEmail({
          to: email.trim().toLowerCase(),
          customerName: name.trim(),
          orderNumber,
          total: 0,
          items: products.map((p) => ({ title: p.title })),
          downloadToken,
          expiresAt: expiresAt.toISOString(),
        });
        const patches: any = {
          deliveryStatus: emailResult.ok ? "delivered" : "failed",
          downloadExpiresAt: expiresAt.toISOString(),
        };
        if (emailResult.ok) {
          patches.deliveredAt = now.toISOString();
          if (emailResult.emailId) patches.resendEmailId = emailResult.emailId;
        }
        await sanity.patch(created._id).set(patches).commit();
      } catch {
        // Email failure shouldn't block order creation; Quảng can re-send from Studio
      }
    }

    return NextResponse.json({
      ok: true,
      orderId: created._id,
      orderNumber,
      total,
      isFree,
      redirectUrl: `/shop/order/${orderNumber}`,
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unknown error" }, { status: 500 });
  }
}
