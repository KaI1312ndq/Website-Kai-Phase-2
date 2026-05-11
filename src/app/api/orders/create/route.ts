import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { auth } from "@clerk/nextjs/server";
import { calculatePrice, generateOrderNumber, generateDownloadToken } from "@/lib/payment/config";

/**
 * Create new order with selected products.
 * POST /api/orders/create
 *   body: { productIds: string[], customer: { name, email, phone? } }
 * Returns: { orderNumber, total, redirectUrl }
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
    const { productIds, customer } = body || {};

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
    const products = await sanity.fetch(
      `*[_type == "product" && active == true && _id in $ids] { _id, title, price }`,
      { ids: productIds }
    ) as Array<{ _id: string; title: string; price: number }>;

    if (products.length !== productIds.length) {
      return NextResponse.json({ error: "Một số sản phẩm không tồn tại hoặc đã hết bán" }, { status: 400 });
    }

    // Calculate pricing using bundle rule
    const { subtotal, total, discount } = calculatePrice(products.length);

    // Generate unique order number (retry if collision — extremely rare)
    let orderNumber = generateOrderNumber();
    for (let i = 0; i < 5; i++) {
      const existing = await sanity.fetch(`*[_type == "order" && orderNumber == $on][0]._id`, { on: orderNumber });
      if (!existing) break;
      orderNumber = generateOrderNumber();
    }

    const downloadToken = generateDownloadToken();
    const now = new Date();

    // Attach Clerk userId if signed in (best-effort — checkout still works for guests)
    let clerkUserId: string | null = null;
    try {
      const { userId } = await auth();
      clerkUserId = userId || null;
    } catch {}

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
      subtotal,
      discount,
      total,
      paymentStatus: "pending",
      deliveryStatus: "pending",
      downloadToken,
      createdAt: now.toISOString(),
    };

    const created = await sanity.create(doc);

    return NextResponse.json({
      ok: true,
      orderId: created._id,
      orderNumber,
      total,
      redirectUrl: `/shop/order/${orderNumber}`,
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unknown error" }, { status: 500 });
  }
}
