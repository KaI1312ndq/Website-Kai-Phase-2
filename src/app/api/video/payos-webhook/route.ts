import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { verifyWebhookSignature, type PayOSWebhookBody } from "@/lib/video/payos";

export const runtime = "nodejs";

/**
 * PayOS webhook handler.
 *
 * Setup: my.payos.vn -> Channels -> [your channel] -> Webhook -> paste:
 *   https://www.nguyenducquang.website/api/video/payos-webhook
 *
 * PayOS sends a POST when:
 *  - Payment is paid (real money received)
 *  - Webhook URL verification test
 */
export async function POST(req: NextRequest) {
  let body: PayOSWebhookBody;
  try {
    body = (await req.json()) as PayOSWebhookBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Verify HMAC signature
  let ok = false;
  try {
    ok = verifyWebhookSignature(body);
  } catch (e) {
    return NextResponse.json({ error: "Signature verify failed", detail: String(e) }, { status: 401 });
  }

  if (!ok) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // Handle verification ping (PayOS may send a test with orderCode = 123)
  if (!body.success) {
    return NextResponse.json({ ok: true, ignored: "not success" });
  }

  const orderCode = body.data?.orderCode;
  if (!orderCode) {
    return NextResponse.json({ error: "Missing orderCode" }, { status: 400 });
  }

  const sb = getSupabaseAdmin();

  // Find payment by orderCode
  const { data: payment, error } = await sb
    .from("video_payments")
    .select("id, user_id, amount_vnd, status")
    .eq("payos_order_code", orderCode)
    .maybeSingle();

  if (error || !payment) {
    // Could be a verification ping from PayOS for an unknown order; ack to satisfy them.
    return NextResponse.json({ ok: true, note: "payment not found, ack" });
  }

  if (payment.status === "completed") {
    return NextResponse.json({ ok: true, note: "already completed" });
  }

  // Sanity: amount must match (PayOS sends amount in VND)
  if (Number(body.data.amount) !== Number(payment.amount_vnd)) {
    await sb.from("video_payments")
      .update({ status: "failed" })
      .eq("id", payment.id);
    return NextResponse.json({
      ok: false,
      error: "Amount mismatch",
      expected: payment.amount_vnd,
      received: body.data.amount,
    }, { status: 400 });
  }

  // Credit tokens atomically via RPC
  const { error: rpcErr } = await sb.rpc("credit_tokens_from_payment", { p_payment_id: payment.id });
  if (rpcErr) {
    return NextResponse.json({ error: "Credit failed", detail: rpcErr.message }, { status: 500 });
  }

  // Update PayOS metadata on payment
  await sb.from("video_payments")
    .update({ casso_tx_id: body.data.reference })  // reuse field; could rename
    .eq("id", payment.id);

  return NextResponse.json({ ok: true });
}

/** PayOS uses POST. GET returns 200 to ease verification probes. */
export async function GET() {
  return NextResponse.json({ ok: true, service: "payos-webhook" });
}
