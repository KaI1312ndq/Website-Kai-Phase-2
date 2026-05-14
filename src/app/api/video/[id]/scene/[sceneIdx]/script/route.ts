import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

/** Edit scene script/prompt text inline. FREE - no render yet. */
export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string; sceneIdx: string }> }) {
  const { id, sceneIdx } = await ctx.params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { script_text?: string; visual_prompt?: string; voiceover_text?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const sb = getSupabaseAdmin();
  const { data: video } = await sb
    .from("videos")
    .select("id, user_id")
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();
  if (!video) return NextResponse.json({ error: "Video not found" }, { status: 404 });

  const patch: Record<string, unknown> = {};
  if (body.script_text !== undefined) patch.script_text = body.script_text;
  if (body.visual_prompt !== undefined) patch.visual_prompt = body.visual_prompt;
  if (body.voiceover_text !== undefined) patch.voiceover_text = body.voiceover_text;
  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const { error } = await sb
    .from("video_scenes")
    .update(patch)
    .eq("video_id", id)
    .eq("scene_idx", Number(sceneIdx));
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
