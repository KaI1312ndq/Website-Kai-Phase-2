import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { CV_PRICING, grantPro } from "@/lib/cv/quota";
import { isAdmin } from "@/lib/admin";

/**
 * Tạo purchase intent (pending) - user scan VietQR + chuyển tiền + báo lại.
 *   POST /api/cv/purchase  body: { paymentRef?: string }
 *
 * Admin confirm thủ công qua endpoint riêng (action=confirm) hoặc auto qua MoMo webhook (future).
 */
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Cần đăng nhập" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const action = body?.action || "create";

  const sb = getSupabaseAdmin();

  // Admin cancel
  if (action === "cancel") {
    if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const purchaseId = body?.purchaseId;
    if (!purchaseId) return NextResponse.json({ error: "Missing purchaseId" }, { status: 400 });
    await sb.from("cv_purchases").update({ status: "cancelled" }).eq("id", purchaseId);
    return NextResponse.json({ ok: true, message: "Cancelled" });
  }

  // Admin confirm - mark paid + grant Pro
  if (action === "confirm") {
    if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const purchaseId = body?.purchaseId;
    const targetUserId = body?.targetUserId;
    if (!purchaseId && !targetUserId) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    if (purchaseId) {
      const { data: p } = await sb.from("cv_purchases").select("*").eq("id", purchaseId).maybeSingle();
      if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
      await sb.from("cv_purchases").update({ status: "paid", paid_at: new Date().toISOString() }).eq("id", purchaseId);
      await grantPro(String(p.user_id));
      return NextResponse.json({ ok: true, message: `Granted Pro cho user ${p.user_id}` });
    }
    // Grant by user id directly
    await grantPro(targetUserId);
    return NextResponse.json({ ok: true, message: `Granted Pro cho user ${targetUserId}` });
  }

  // Create pending purchase
  const paymentRef = typeof body?.paymentRef === "string" ? body.paymentRef.slice(0, 100) : null;
  const { data: created, error } = await sb
    .from("cv_purchases")
    .insert({
      user_id: userId,
      amount: CV_PRICING.proPriceVND,
      payment_method: "VietQR",
      payment_ref: paymentRef,
      status: "pending",
    })
    .select("id")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    ok: true,
    purchaseId: created.id,
    amount: CV_PRICING.proPriceVND,
    message: "Đơn đã tạo. Sau khi chuyển tiền, Quảng sẽ confirm trong 24h và bật Pro cho bạn.",
  });
}
