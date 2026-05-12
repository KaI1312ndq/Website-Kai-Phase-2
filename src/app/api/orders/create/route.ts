import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { auth } from "@clerk/nextjs/server";
import { calculatePrice, generateOrderNumber, generateDownloadToken } from "@/lib/payment/config";
import { getVoucherByCode } from "@/lib/queries";
import { normalizeCode, validateVoucher } from "@/lib/voucher";
import { sendDeliveryEmail } from "@/lib/email/send-delivery";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Create new order with selected products.
 * Products vẫn ở Sanity (editorial). Order ghi vào Supabase.
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

    // Fetch products từ Sanity (vẫn ở Sanity vì là editorial content)
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId || projectId === "placeholder") {
      return NextResponse.json({ error: "Sanity not configured" }, { status: 500 });
    }
    const sanity = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      token: process.env.SANITY_API_WRITE_TOKEN,
      useCdn: false,
    });

    const products = (await sanity.fetch(
      `*[_type == "product" && active == true && _id in $ids] { _id, title, price }`,
      { ids: productIds },
    )) as Array<{ _id: string; title: string; price: number }>;

    if (products.length !== productIds.length) {
      return NextResponse.json({ error: "Một số sản phẩm không tồn tại hoặc đã hết bán" }, { status: 400 });
    }

    const bundle = calculatePrice(products.length);
    let total = bundle.total;
    let voucherDiscount = 0;
    let appliedCode: string | null = null;
    let voucherDocId: string | null = null;

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

    let clerkUserId: string | null = null;
    try {
      const { userId } = await auth();
      clerkUserId = userId || null;
    } catch {}

    const sb = getSupabaseAdmin();

    // Unique order_number (Supabase enforces unique via constraint, retry on collision)
    let orderNumber = generateOrderNumber();
    for (let i = 0; i < 5; i++) {
      const { data: existing } = await sb
        .from("orders")
        .select("id")
        .eq("order_number", orderNumber)
        .maybeSingle();
      if (!existing) break;
      orderNumber = generateOrderNumber();
    }

    const downloadToken = generateDownloadToken();
    const now = new Date();
    const isFree = total === 0;

    // Insert order
    const { data: created, error: orderErr } = await sb
      .from("orders")
      .insert({
        order_number: orderNumber,
        user_id: clerkUserId,
        customer_name: name.trim(),
        customer_email: email.trim().toLowerCase(),
        customer_phone: phoneClean,
        subtotal: bundle.subtotal,
        discount: bundle.discount,
        voucher_code: appliedCode,
        voucher_discount: voucherDiscount,
        total,
        payment_status: isFree ? "paid" : "unpaid",
        delivery_status: "pending",
        download_token: downloadToken,
        status: isFree ? "paid" : "pending",
        paid_at: isFree ? now.toISOString() : null,
      })
      .select("id")
      .single();

    if (orderErr || !created) {
      return NextResponse.json({ error: orderErr?.message || "Tạo đơn thất bại" }, { status: 500 });
    }

    // Insert order_items
    const { error: itemsErr } = await sb.from("order_items").insert(
      products.map((p) => ({
        order_id: created.id,
        product_sanity_id: p._id,
        title_snapshot: p.title,
        price_snapshot: p.price,
        qty: 1,
      })),
    );
    if (itemsErr) {
      // Rollback order nếu items insert fail
      await sb.from("orders").delete().eq("id", created.id);
      return NextResponse.json({ error: itemsErr.message }, { status: 500 });
    }

    // Log voucher usage + bump usedCount in Sanity
    if (voucherDocId && appliedCode) {
      try {
        await sb.from("voucher_usage").insert({
          voucher_code: appliedCode,
          user_id: clerkUserId,
          order_id: created.id,
          discount_amount: voucherDiscount,
        });
        await sanity.patch(voucherDocId).inc({ usedCount: 1 }).commit();
      } catch (e) {
        console.warn("[orders/create] voucher_usage log failed:", e);
      }
    }

    // Free order -> auto-deliver
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
        const patches: Record<string, unknown> = {
          delivery_status: emailResult.ok ? "delivered" : "failed",
          download_expires_at: expiresAt.toISOString(),
        };
        if (emailResult.ok) {
          patches.delivered_at = now.toISOString();
          if (emailResult.emailId) patches.resend_email_id = emailResult.emailId;
        }
        await sb.from("orders").update(patches).eq("id", created.id);
      } catch {
        // Email failure không block order creation
      }
    }

    return NextResponse.json({
      ok: true,
      orderId: created.id,
      orderNumber,
      total,
      isFree,
      redirectUrl: `/shop/order/${orderNumber}`,
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unknown error" }, { status: 500 });
  }
}
