import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { VIDEO_PRESETS, VIDEO_FLOWS } from "@/lib/video/voices";

export const runtime = "nodejs";

/**
 * Status poll endpoint - returns video + all 6 scenes.
 *
 * MOCK MODE: advances each scene's status based on time elapsed since
 * scene.updated_at. This means regen (which resets updated_at) restarts
 * the timer for just that scene.
 *
 * Timeline per scene (~12s total from pending to completed):
 *   0-3s:  pending
 *   3-12s: rendering (with progress)
 *   12s+:  completed (sample MP4 + thumbnail set)
 */

// Mock sample clips - reliable W3.org test videos + Pexels free CDN backups.
// In Phase 4 these get replaced with real fal.ai output.
const SAMPLE_CLIPS = [
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
];
const SAMPLE_THUMBS = [
  "https://images.pexels.com/videos/3209828/free-video-3209828.jpg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/videos/3045163/free-video-3045163.jpg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/videos/3197123/free-video-3197123.jpg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/videos/2932301/free-video-2932301.jpg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/videos/4434243/free-video-4434243.jpg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/videos/3209828/free-video-3209828.jpg?auto=compress&cs=tinysrgb&w=300",
];

interface SceneRow {
  id: string;
  scene_idx: number;
  label: string | null;
  status: string;
  output_url: string | null;
  thumbnail_url: string | null;
  script_text: string | null;
  visual_prompt: string | null;
  voiceover_text: string | null;
  is_lipsync: boolean;
  approved_by_user: boolean;
  regen_count: number;
  cost_token: number;
  updated_at: string;
}

function buildSceneScript(input: Record<string, unknown>, sceneIdx: number, label: string): {
  script: string;
  visual: string;
  voice: string;
} {
  const name = String(input.product_name ?? "sản phẩm");
  const desc = String(input.product_description ?? "");
  const cta = input.cta ? String(input.cta) : "Đặt mua ngay";
  const promo = input.promo ? String(input.promo) : null;
  const price = typeof input.price_vnd === "number" ? input.price_vnd : null;
  const proof = input.social_proof ? String(input.social_proof) : null;
  const presetId = String(input.preset_id ?? "cartoon_3d_character");
  const preset = VIDEO_PRESETS.find((p) => p.id === presetId);
  const flowId = String(input.flow_template ?? "aida_classic");
  const flow = VIDEO_FLOWS.find((f) => f.id === flowId);
  const sceneLabels = (input.scene_labels as string[] | undefined) ?? flow?.scenes ?? [];
  const scriptHint = flow?.scriptHints[sceneIdx] ?? "";
  const sceneLabel = sceneLabels[sceneIdx] ?? label;
  const hasImages = Array.isArray(input.product_images) && (input.product_images as unknown[]).length > 0;
  const visualBase = preset?.defaults.conceptHint ?? "Cảnh quay sản phẩm";
  const imageHint = hasImages ? " · Match sản phẩm trong ảnh user upload" : "";

  // Generate scene-specific script based on flow + scene index + product info
  const labelLower = sceneLabel.toLowerCase();
  let script: string;
  let visual: string;
  let voice: string;

  if (labelLower.includes("hook") || labelLower.includes("mystery") || labelLower.includes("setup") || sceneIdx === 0) {
    script = `Đừng vội mua ${name} - xem hết video này đã!`;
    visual = `${visualBase}, hook overlay STOP đỏ${imageHint}`;
  } else if (labelLower.includes("pain") || labelLower.includes("conflict") || labelLower.includes("tension") || labelLower.includes("vấn đề")) {
    script = "Bạn đang gặp vấn đề này đúng không? Mất tiền cho cái không hiệu quả?";
    visual = "Cảnh người dùng bối rối, 3 icon vấn đề pop in";
  } else if (labelLower.includes("product") || labelLower.includes("solution") || labelLower.includes("sản phẩm") || labelLower.includes("reveal") || labelLower.includes("cách mới")) {
    script = `Đây - ${name}. ${desc}`;
    visual = `${name} cận cảnh, biểu cảm tự tin${imageHint}`;
  } else if (labelLower.includes("proof") || labelLower.includes("testimonial") || labelLower.includes("khách hàng") || labelLower.includes("result") || labelLower.includes("kết quả") || labelLower.includes("explain") || labelLower.includes("twist")) {
    script = proof ? `${proof} - không phải tự khen, là sự thật.` : "Ai dùng cũng quay lại - khác hẳn bọn rẻ tiền.";
    visual = proof ? `Counter "${proof}" pulse animation` : "Loop demo + happy reaction faces";
  } else if (labelLower.includes("price") || labelLower.includes("promo") || labelLower.includes("giá") || labelLower.includes("khuyến") || labelLower.includes("offer") || labelLower.includes("lợi ích")) {
    script = price ? `Chỉ ${price.toLocaleString("vi-VN")}đ. ${promo ?? ""}` : (promo ?? "Best value, đáng giá hơn 10 lần.");
    visual = "Light flare effect, giá overlay neon to";
  } else if (labelLower.includes("cta") || labelLower.includes("mua") || sceneIdx === 5) {
    script = cta;
    visual = "Arrow chỉ xuống giỏ hàng, music drop, shop link đính kèm";
  } else if (labelLower.includes("tip")) {
    script = `Tip ${sceneIdx}: ${desc.slice(0, 60)}...`;
    visual = `Text overlay TIP ${sceneIdx} lớn, icon minh hoạ`;
  } else {
    // Fallback - dùng script hint từ flow definition
    script = scriptHint || `${sceneLabel}: ${desc.slice(0, 80)}`;
    visual = `${visualBase}, theo nhịp ${sceneLabel}${imageHint}`;
  }

  voice = script;
  return { script, visual, voice };
}

const RENDER_START_SEC = 3;
const RENDER_END_SEC = 12;

function computeSceneStatus(scene: SceneRow, input: Record<string, string | number | null | undefined>): {
  status: string;
  output_url: string | null;
  thumbnail_url: string | null;
  script_text: string;
  visual_prompt: string;
  voiceover_text: string;
} | null {
  // Always populate script even before render (free, just text)
  const { script, visual, voice } = buildSceneScript(input, scene.scene_idx, scene.label ?? "");

  // If already terminal (completed/failed/approved) OR waiting for user approval (script_ready),
  // return null - no auto-advance
  if (scene.status === "completed" || scene.status === "approved" || scene.status === "failed" || scene.status === "script_ready") {
    return null;
  }

  const elapsedMs = Date.now() - new Date(scene.updated_at).getTime();
  const elapsedSec = Math.floor(elapsedMs / 1000);

  if (elapsedSec < RENDER_START_SEC) {
    return scene.script_text === script
      ? null
      : { status: "pending", output_url: null, thumbnail_url: null, script_text: script, visual_prompt: visual, voiceover_text: voice };
  }

  if (elapsedSec < RENDER_END_SEC) {
    return {
      status: "rendering",
      output_url: null,
      thumbnail_url: null,
      script_text: script,
      visual_prompt: visual,
      voiceover_text: voice,
    };
  }

  // Completed - assign mock clip
  const clipIdx = scene.scene_idx % SAMPLE_CLIPS.length;
  return {
    status: "completed",
    output_url: SAMPLE_CLIPS[clipIdx],
    thumbnail_url: SAMPLE_THUMBS[clipIdx],
    script_text: script,
    visual_prompt: visual,
    voiceover_text: voice,
  };
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sb = getSupabaseAdmin();
  const { data: video } = await sb
    .from("videos")
    .select("id, status, status_message, progress_percent, output_url, thumbnail_url, error_message, script_text, created_at, started_at, completed_at, tier, duration, token_cost, watermark, input_data, preset_id, auto_caption, compose_status")
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();

  if (!video) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { data: scenes } = await sb
    .from("video_scenes")
    .select("*")
    .eq("video_id", id)
    .order("scene_idx", { ascending: true });

  const sceneRows = (scenes ?? []) as SceneRow[];
  const input = (video.input_data ?? {}) as Record<string, string | number | null | undefined>;

  // Advance each scene's status (mock pipeline)
  const updates: Array<PromiseLike<unknown>> = [];
  const updatedScenes = sceneRows.map((s) => {
    const patch = computeSceneStatus(s, input);
    if (patch) {
      updates.push(sb.from("video_scenes").update(patch).eq("id", s.id) as unknown as PromiseLike<unknown>);
      return { ...s, ...patch };
    }
    return s;
  });

  // Compute aggregate video status from scenes
  const allCompleted = updatedScenes.every((s) => s.status === "completed" || s.status === "approved");
  const anyRendering = updatedScenes.some((s) => s.status === "rendering");
  let aggregatedStatus = video.status;
  let aggregatedProgress = video.progress_percent ?? 0;

  if (anyRendering) {
    aggregatedStatus = "animating";
    aggregatedProgress = Math.round(
      (updatedScenes.filter((s) => s.status === "completed" || s.status === "approved").length / updatedScenes.length) * 100,
    );
  }
  if (allCompleted && video.compose_status === "not_ready") {
    await sb.from("videos").update({ compose_status: "ready" }).eq("id", id);
  }

  // Run updates async (don't block response)
  if (updates.length > 0) {
    await Promise.allSettled(updates);
  }

  return NextResponse.json({
    ...video,
    status: aggregatedStatus,
    progress_percent: aggregatedProgress,
    compose_status: allCompleted ? "ready" : video.compose_status,
    scenes: updatedScenes,
  });
}
