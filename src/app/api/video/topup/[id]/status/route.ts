import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getPaymentInfo } from "@/lib/video/payos";

export const runtime = "nodejs";

/**
 * Poll endpoint to check payment status.
 * Also acts as fallback: if PayOS webhook hasn't fired but PayOS API shows PAID,
 * we trigger the credit RPC manually.
 */
export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sb = getSupabaseAdmin();
  const { data: payment } = await sb
    .from("video_payments")
    .select("id, status, payos_order_code, amount_vnd, expires_at")
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();

  if (!payment) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // If already terminal status, return as-is
  if (payment.status === "completed" || payment.status === "failed" || payment.status === "cancelled") {
    return NextResponse.json({ status: payment.status });
  }

  // Check expiry
  if (new Date(payment.expires_at) < new Date()) {
    await sb.from("video_payments").update({ status: "expired" }).eq("id", id);
    return NextResponse.json({ status: "expired" });
  }

  // Fallback: ask PayOS directly (in case webhook didn't reach us)
  if (payment.payos_order_code) {
    try {
      const info = await getPaymentInfo(Number(payment.payos_order_code));
      if (info.code === "00" && info.data?.status === "PAID") {
        // Trigger credit
        await sb.rpc("credit_tokens_from_payment", { p_payment_id: id });
        return NextResponse.json({ status: "completed" });
      }
      if (info.data?.status === "CANCELLED" || info.data?.status === "EXPIRED") {
        await sb.from("video_payments")
          .update({ status: info.data.status.toLowerCase() })
          .eq("id", id);
        return NextResponse.json({ status: info.data.status.toLowerCase() });
      }
    } catch {
      /* ignore - return pending */
    }
  }

  return NextResponse.json({ status: payment.status });
}
