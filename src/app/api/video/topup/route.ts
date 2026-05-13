import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { computeTokensForTopup, MIN_TOPUP_VND, MAX_TOPUP_VND } from "@/lib/video/pricing";
import { createPaymentLink, paymentIdToOrderCode } from "@/lib/video/payos";
import { buildBankMemo } from "@/lib/video/bank";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const amountVnd = Number(body.amount_vnd);

  if (!Number.isFinite(amountVnd) || amountVnd < MIN_TOPUP_VND || amountVnd > MAX_TOPUP_VND) {
    return NextResponse.json({
      error: `Số tiền không hợp lệ. Min ${MIN_TOPUP_VND.toLocaleString("vi-VN")}đ, max ${MAX_TOPUP_VND.toLocaleString("vi-VN")}đ.`,
    }, { status: 400 });
  }

  // Round to nearest 1000 (VND smallest practical unit for bank)
  const cleanAmount = Math.floor(amountVnd / 1000) * 1000;
  const { totalTokens, bonusPercent } = computeTokensForTopup(cleanAmount);

  if (totalTokens <= 0) {
    return NextResponse.json({ error: "Số token tính ra = 0" }, { status: 400 });
  }

  const sb = getSupabaseAdmin();

  // Step 1: insert pending payment to get UUID
  const { data: inserted, error: insertErr } = await sb
    .from("video_payments")
    .insert({
      user_id: userId,
      amount_vnd: cleanAmount,
      tokens_received: totalTokens,
      bonus_percent: bonusPercent,
      method: "bank",
      status: "pending",
    })
    .select("id")
    .single();

  if (insertErr || !inserted) {
    return NextResponse.json({ error: insertErr?.message ?? "DB insert failed" }, { status: 500 });
  }

  const paymentId: string = inserted.id;
  const orderCode = paymentIdToOrderCode(paymentId);
  const memo = buildBankMemo(paymentId);

  const origin = req.nextUrl.origin;

  // Step 2: create PayOS payment link
  try {
    const expiredAt = Math.floor(Date.now() / 1000) + 24 * 3600; // 24h
    const resp = await createPaymentLink({
      orderCode,
      amount: cleanAmount,
      description: memo,                         // max 25 chars, PayOS expects ASCII memo
      cancelUrl: `${origin}/tools/video/topup/${paymentId}?status=cancelled`,
      returnUrl: `${origin}/tools/video/topup/${paymentId}?status=success`,
      expiredAt,
      items: [
        { name: `Nap ${totalTokens} token`, quantity: 1, price: cleanAmount },
      ],
    });

    if (resp.code !== "00" || !resp.data) {
      // Rollback: mark payment failed
      await sb.from("video_payments")
        .update({ status: "failed", bank_memo: memo })
        .eq("id", paymentId);
      return NextResponse.json({
        error: "PayOS error",
        detail: resp.desc,
        code: resp.code,
      }, { status: 502 });
    }

    // Update payment record with PayOS info (incl. VIRTUAL ACCOUNT - critical!)
    await sb
      .from("video_payments")
      .update({
        bank_memo: memo,
        payos_order_code: orderCode,
        payos_payment_link_id: resp.data.paymentLinkId,
        checkout_url: resp.data.checkoutUrl,
        payos_account_number: resp.data.accountNumber,
        payos_account_name: resp.data.accountName,
        payos_bin: resp.data.bin,
      })
      .eq("id", paymentId);

    return NextResponse.json({
      payment_id: paymentId,
      order_code: orderCode,
      amount_vnd: cleanAmount,
      tokens_total: totalTokens,
      bonus_percent: bonusPercent,
      memo,
      checkout_url: resp.data.checkoutUrl,
      qr_code: resp.data.qrCode,
      account_number: resp.data.accountNumber,
      account_name: resp.data.accountName,
      bin: resp.data.bin,
    });
  } catch (e) {
    await sb.from("video_payments")
      .update({ status: "failed", bank_memo: memo })
      .eq("id", paymentId);
    return NextResponse.json({
      error: "PayOS request failed",
      detail: String(e),
    }, { status: 502 });
  }
}
