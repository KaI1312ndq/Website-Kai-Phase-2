import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

/**
 * Compose final video from 6 scenes (Phase 3.5 MOCK).
 *
 * In Phase 4, worker will run FFmpeg concat + voice mix + auto-caption.
 * For now, we just mark video.status=completed and set output_url to
 * the first completed scene's clip (or sample).
 */

const FINAL_SAMPLE_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const FINAL_SAMPLE_THUMB = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg";

export async function POST(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sb = getSupabaseAdmin();
  const { data: video } = await sb
    .from("videos")
    .select("id, user_id, compose_status, status")
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();
  if (!video) return NextResponse.json({ error: "Video not found" }, { status: 404 });

  // Check all scenes are completed/approved
  const { data: scenes } = await sb
    .from("video_scenes")
    .select("id, status, output_url")
    .eq("video_id", id)
    .order("scene_idx", { ascending: true });

  if (!scenes || scenes.length === 0) {
    return NextResponse.json({ error: "Video không có cảnh nào" }, { status: 400 });
  }

  const notReady = scenes.filter((s) => s.status !== "completed" && s.status !== "approved");
  if (notReady.length > 0) {
    return NextResponse.json({
      error: `Còn ${notReady.length}/6 cảnh chưa render xong. Đợi tất cả cảnh hoàn tất rồi compose.`,
    }, { status: 400 });
  }

  // MOCK: mark video completed with sample output
  await sb.from("videos").update({
    status: "completed",
    compose_status: "composed",
    output_url: FINAL_SAMPLE_VIDEO,
    thumbnail_url: FINAL_SAMPLE_THUMB,
    progress_percent: 100,
    status_message: "Compose hoàn tất (MOCK - dùng sample video). Phase 4 sẽ ghép thật bằng FFmpeg.",
    completed_at: new Date().toISOString(),
  }).eq("id", id);

  return NextResponse.json({
    ok: true,
    output_url: FINAL_SAMPLE_VIDEO,
  });
}
