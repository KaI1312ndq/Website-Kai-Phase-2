import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getPaymentInfo } from "@/lib/video/payos";

export const runtime = "nodejs";

/**
 * Vercel Cron: every 1 minute.
 * Safety net for PayOS webhook failures.
 *
 * Scans pending video_payments older than 30s, queries PayOS API per row,
 * credits tokens if PayOS reports PAID, marks expired/cancelled accordingly.
 *
 * Idempotent: credit_tokens_from_payment guards against double-credit.
 *
 * Auth: Vercel cron sets `Authorization: Bearer <CRON_SECRET>` header
 * automatically if CRON_SECRET env is set. We also accept the `x-vercel-cron`
 * header which Vercel adds on its cron invocations.
 */
export async function GET(req: NextRequest) {
  const isVercelCron = req.headers.get("x-vercel-cron") === "1";
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization") ?? "";
  const bearer = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!isVercelCron && cronSecret && bearer !== cronSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sb = getSupabaseAdmin();
  const cutoff = new Date(Date.now() - 30_000).toISOString();

  const { data: pending, error } = await sb
    .from("video_payments")
    .select("id, payos_order_code, amount_vnd, expires_at, created_at")
    .eq("status", "pending")
    .eq("method", "bank")
    .lt("created_at", cutoff)
    .not("payos_order_code", "is", null)
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!pending || pending.length === 0) {
    return NextResponse.json({ ok: true, checked: 0 });
  }

  const results: Array<{ id: string; action: string; detail?: string }> = [];

  for (const row of pending) {
    // Expired check (24h)
    if (new Date(row.expires_at) < new Date()) {
      await sb.from("video_payments").update({ status: "expired" }).eq("id", row.id);
      results.push({ id: row.id, action: "expired" });
      continue;
    }

    try {
      const info = await getPaymentInfo(Number(row.payos_order_code));
      if (info.code !== "00") {
        results.push({ id: row.id, action: "skip", detail: `PayOS ${info.code}` });
        continue;
      }
      const status = info.data?.status;
      if (status === "PAID") {
        const { error: creditErr } = await sb.rpc("credit_tokens_from_payment", { p_payment_id: row.id });
        if (creditErr) {
          results.push({ id: row.id, action: "credit_failed", detail: creditErr.message });
        } else {
          results.push({ id: row.id, action: "credited" });
        }
      } else if (status === "CANCELLED" || status === "EXPIRED") {
        await sb.from("video_payments").update({ status: status.toLowerCase() }).eq("id", row.id);
        results.push({ id: row.id, action: status.toLowerCase() });
      } else {
        results.push({ id: row.id, action: "still_pending" });
      }
    } catch (e) {
      results.push({ id: row.id, action: "error", detail: String(e) });
    }
  }

  return NextResponse.json({ ok: true, checked: pending.length, results });
}
