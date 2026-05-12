import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { QuotaStatus } from "./types";

const FREE_DOWNLOADS_LIMIT = 3;
const FREE_AI_LIMIT = 5;
const PRO_AI_LIMIT = 50; // mỗi tháng cho Pro

export async function getQuotaStatus(userId: string): Promise<QuotaStatus> {
  const sb = getSupabaseAdmin();
  const { data } = await sb.from("cv_user_quota").select("*").eq("user_id", userId).maybeSingle();
  if (!data) {
    return {
      freeDownloadsUsed: 0,
      freeDownloadsRemaining: FREE_DOWNLOADS_LIMIT,
      isPro: false,
      aiFeedbackUsed: 0,
      aiFeedbackRemaining: FREE_AI_LIMIT,
    };
  }
  const isPro = !!data.is_pro;
  return {
    freeDownloadsUsed: Number(data.free_downloads_used || 0),
    freeDownloadsRemaining: isPro ? 9999 : Math.max(0, FREE_DOWNLOADS_LIMIT - Number(data.free_downloads_used || 0)),
    isPro,
    aiFeedbackUsed: Number(data.ai_feedback_used || 0),
    aiFeedbackRemaining: isPro
      ? Math.max(0, PRO_AI_LIMIT - Number(data.ai_feedback_used || 0))
      : Math.max(0, FREE_AI_LIMIT - Number(data.ai_feedback_used || 0)),
  };
}

export async function ensureQuotaRow(userId: string) {
  const sb = getSupabaseAdmin();
  await sb.from("cv_user_quota").upsert({ user_id: userId }, { onConflict: "user_id" });
}

export async function consumeDownload(userId: string): Promise<{ ok: boolean; isPro: boolean; remaining: number }> {
  const status = await getQuotaStatus(userId);
  if (status.isPro) return { ok: true, isPro: true, remaining: 9999 };
  if (status.freeDownloadsRemaining <= 0) return { ok: false, isPro: false, remaining: 0 };

  const sb = getSupabaseAdmin();
  await ensureQuotaRow(userId);
  const newCount = status.freeDownloadsUsed + 1;
  await sb.from("cv_user_quota").update({ free_downloads_used: newCount }).eq("user_id", userId);
  return { ok: true, isPro: false, remaining: Math.max(0, FREE_DOWNLOADS_LIMIT - newCount) };
}

export async function consumeAIFeedback(userId: string): Promise<{ ok: boolean; remaining: number }> {
  const status = await getQuotaStatus(userId);
  if (status.aiFeedbackRemaining <= 0) return { ok: false, remaining: 0 };

  const sb = getSupabaseAdmin();
  await ensureQuotaRow(userId);
  const newCount = status.aiFeedbackUsed + 1;
  await sb.from("cv_user_quota").update({ ai_feedback_used: newCount }).eq("user_id", userId);
  return { ok: true, remaining: status.aiFeedbackRemaining - 1 };
}

export async function grantPro(userId: string) {
  const sb = getSupabaseAdmin();
  await ensureQuotaRow(userId);
  await sb.from("cv_user_quota").update({
    is_pro: true,
    pro_purchased_at: new Date().toISOString(),
  }).eq("user_id", userId);
}

export const CV_PRICING = {
  proPriceVND: 49000,
  freeDownloadsLimit: FREE_DOWNLOADS_LIMIT,
  freeAILimit: FREE_AI_LIMIT,
  proAILimit: PRO_AI_LIMIT,
};
