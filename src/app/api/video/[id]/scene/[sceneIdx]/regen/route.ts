import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getSceneRegenCost } from "@/lib/video/pricing";
import type { VideoTier } from "@/lib/video/types";

export const runtime = "nodejs";

/**
 * Regenerate a single scene.
 * Costs (v2 2026-05-14): 5 token Std / 10 Pro for B-roll; 8 / 13 for lip-sync.
 * Tokens deducted atomically via regen_video_scene RPC.
 */
export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string; sceneIdx: string }> }) {
  const { id, sceneIdx } = await ctx.params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sb = getSupabaseAdmin();

  // Fetch video to know tier + verify ownership
  const { data: video } = await sb
    .from("videos")
    .select("id, user_id, tier")
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();
  if (!video) return NextResponse.json({ error: "Video not found" }, { status: 404 });

  // Fetch scene + check lip-sync flag
  const { data: scene } = await sb
    .from("video_scenes")
    .select("id, is_lipsync, status")
    .eq("video_id", id)
    .eq("scene_idx", Number(sceneIdx))
    .maybeSingle();
  if (!scene) return NextResponse.json({ error: "Scene not found" }, { status: 404 });

  // Optionally accept body with edited script_text/visual_prompt
  let bodyJson: { script_text?: string; visual_prompt?: string } = {};
  try {
    bodyJson = await req.json();
  } catch { /* no body OK */ }

  const cost = getSceneRegenCost(video.tier as VideoTier, scene.is_lipsync);

  // Apply text edits before regen (free)
  if (bodyJson.script_text || bodyJson.visual_prompt) {
    await sb.from("video_scenes").update({
      ...(bodyJson.script_text ? { script_text: bodyJson.script_text } : {}),
      ...(bodyJson.visual_prompt ? { visual_prompt: bodyJson.visual_prompt } : {}),
    }).eq("id", scene.id);
  }

  // Atomic regen
  const { error: rpcErr } = await sb.rpc("regen_video_scene", {
    p_user_id: userId,
    p_scene_id: scene.id,
    p_cost: cost,
  });

  if (rpcErr) {
    if (rpcErr.message?.includes("INSUFFICIENT_TOKENS")) {
      return NextResponse.json({ error: `Không đủ token (cần ${cost}).` }, { status: 402 });
    }
    return NextResponse.json({ error: rpcErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, cost, scene_id: scene.id });
}
