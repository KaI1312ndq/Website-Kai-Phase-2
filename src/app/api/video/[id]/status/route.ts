import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { VIDEO_PRESETS } from "@/lib/video/voices";

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

const SAMPLE_CLIPS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
];
const SAMPLE_THUMBS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
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

function buildSceneScript(input: Record<string, string | number | null | undefined>, sceneIdx: number, label: string): {
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

  // 6 scenes: Hook / Pain / Product / Proof / Price / CTA
  const scenes = [
    {
      script: `Đừng vội mua ${name} - xem hết video này đã!`,
      visual: `${preset?.defaults.conceptHint ?? "Sản phẩm trên bàn"}, hook overlay STOP đỏ`,
      voice: `Đừng vội mua ${name} - xem hết video này đã!`,
    },
    {
      script: "Bạn ăn theo thói quen, không phải nhu cầu - vòng luẩn quẩn không lối thoát.",
      visual: "Cảnh người dùng bối rối, 3 icon vấn đề overlay: đói/béo/mệt",
      voice: "Bạn ăn theo thói quen, không phải nhu cầu. Vòng luẩn quẩn không lối thoát.",
    },
    {
      script: `Đây - ${name}. ${desc}`,
      visual: `${name} cận cảnh, biểu cảm tự tin, đèn vàng warmth`,
      voice: `Đây. ${name}. ${desc}`,
    },
    {
      script: proof ? `${proof} - không phải tự khen, là sự thật.` : "Ai dùng cũng quay lại - vì khác bọn snack thường.",
      visual: proof ? `Counter "${proof}" pulse animation` : "Loop demo + happy reaction faces",
      voice: proof ? `${proof}. Không phải tự khen, là sự thật.` : "Ai dùng cũng quay lại. Vì khác bọn snack thường.",
    },
    {
      script: price ? `Chỉ ${price.toLocaleString("vi-VN")}đ. ${promo ?? ""}` : (promo ?? "Best value, đáng giá hơn 10 lần."),
      visual: "Light flare effect, giá overlay neon to",
      voice: price ? `Chỉ ${price.toLocaleString("vi-VN")} đồng. ${promo ?? ""}` : (promo ?? "Best value, đáng giá hơn mười lần."),
    },
    {
      script: cta,
      visual: "Arrow chỉ xuống giỏ hàng, music drop, shop link đính kèm",
      voice: cta,
    },
  ];
  return scenes[sceneIdx] ?? { script: label, visual: "", voice: label };
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

  // If already terminal (completed/failed/approved), return null - no update needed
  if (scene.status === "completed" || scene.status === "approved" || scene.status === "failed") {
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
