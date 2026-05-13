import { createClient, SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Worker env missing: SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY");
  }
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export interface VideoJob {
  id: string;
  user_id: string;
  input_data: Record<string, unknown>;
  duration: number;
  tier: "eco" | "standard" | "pro";
  token_cost: number;
  status: string;
  retry_count: number;
}

/** Claim the next pending video. Atomic via single UPDATE. */
export async function claimNextJob(): Promise<VideoJob | null> {
  const sb = getSupabase();
  // Use a SQL-side claim: update status to 'scripting' for the oldest pending row,
  // returning it. This prevents races between multiple workers.
  const { data, error } = await sb.rpc("claim_next_video_job");
  if (error) {
    if (!error.message.includes("function") || !error.message.includes("does not exist")) {
      console.error("[worker] claim_next_video_job error:", error.message);
    }
    // Fallback: simple update select (race-prone but OK for 1 worker)
    return claimNextJobFallback();
  }
  if (!data || (Array.isArray(data) && data.length === 0)) return null;
  const row = Array.isArray(data) ? data[0] : data;
  return row as VideoJob;
}

async function claimNextJobFallback(): Promise<VideoJob | null> {
  const sb = getSupabase();
  const { data: pending } = await sb
    .from("videos")
    .select("id, user_id, input_data, duration, tier, token_cost, status, retry_count")
    .eq("status", "pending")
    .order("queue_priority", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (!pending) return null;

  // Try to claim
  const { error: updErr } = await sb
    .from("videos")
    .update({ status: "scripting", started_at: new Date().toISOString(), progress_percent: 5 })
    .eq("id", pending.id)
    .eq("status", "pending");  // optimistic lock

  if (updErr) return null;
  return pending as VideoJob;
}

export async function updateStatus(videoId: string, patch: {
  status?: string;
  status_message?: string;
  progress_percent?: number;
  output_url?: string;
  thumbnail_url?: string;
  error_message?: string;
  failed_step?: string;
  script_text?: string;
}): Promise<void> {
  const sb = getSupabase();
  const { error } = await sb.from("videos").update(patch).eq("id", videoId);
  if (error) console.error("[worker] updateStatus error:", error.message);
}

export async function markCompleted(videoId: string, outputUrl: string, thumbnailUrl?: string): Promise<void> {
  await updateStatus(videoId, {
    status: "completed",
    progress_percent: 100,
    output_url: outputUrl,
    thumbnail_url: thumbnailUrl,
    status_message: "Render hoàn tất",
  });
  const sb = getSupabase();
  await sb.from("videos").update({ completed_at: new Date().toISOString() }).eq("id", videoId);
}

export async function refundVideo(videoId: string, reason: string): Promise<void> {
  const sb = getSupabase();
  await sb.from("videos").update({
    status: "failed",
    error_message: reason,
  }).eq("id", videoId);

  const { error } = await sb.rpc("refund_video_token", { p_video_id: videoId });
  if (error) console.error("[worker] refund_video_token error:", error.message);
}

export async function incrementRetry(videoId: string, currentRetry: number, failedStep: string): Promise<void> {
  const sb = getSupabase();
  await sb.from("videos").update({
    retry_count: currentRetry + 1,
    failed_step: failedStep,
    status: "pending",  // re-queue for retry
    progress_percent: 0,
  }).eq("id", videoId);
}
