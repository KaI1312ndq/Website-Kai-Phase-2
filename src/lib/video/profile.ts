// Server-side helpers for video_profiles + token operations.

import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { WELCOME_BONUS_TOKENS } from "./pricing";
import type { VideoProfile, VideoTokenTransaction } from "./types";

/** Get or create profile for the given Clerk user_id. Welcome bonus granted only once. */
export async function getOrCreateVideoProfile(userId: string): Promise<VideoProfile> {
  const sb = getSupabaseAdmin();
  const { data: existing } = await sb
    .from("video_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) return existing as VideoProfile;

  // Grant welcome bonus via RPC (idempotent)
  await sb.rpc("grant_video_welcome_bonus", { p_user_id: userId });

  const { data, error } = await sb
    .from("video_profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data as VideoProfile;
}

export async function getTokenBalance(userId: string): Promise<number> {
  const profile = await getOrCreateVideoProfile(userId);
  return profile.token_balance;
}

export async function getRecentTransactions(
  userId: string,
  limit = 20
): Promise<VideoTokenTransaction[]> {
  const sb = getSupabaseAdmin();
  const { data } = await sb
    .from("video_token_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as VideoTokenTransaction[];
}

export { WELCOME_BONUS_TOKENS };
