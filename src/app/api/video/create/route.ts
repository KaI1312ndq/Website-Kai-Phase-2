import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getVideoTokenCost, SCENES_PER_VIDEO } from "@/lib/video/pricing";
import { FPT_VOICES, VIDEO_PRESETS } from "@/lib/video/voices";
import type { VideoTier, VideoDuration } from "@/lib/video/types";

export const runtime = "nodejs";

interface CreateVideoBody {
  tier: VideoTier;
  duration: VideoDuration;
  preset_id?: string;
  auto_caption?: boolean;
  input: {
    preset_id?: string;
    platform?: string;
    product_name: string;
    product_description: string;
    target_audience?: string;
    cta?: string;
    price_vnd?: number;
    promo?: string;
    social_proof?: string;
    shot_size?: string;
    camera_angle?: string;
    camera_motion?: string;
    lighting?: string;
    mc_emotion?: string;
    mc_character?: string;
    wardrobe?: string;
    voice_id?: string;
  };
}

const VALID_TIERS: VideoTier[] = ["eco", "standard", "pro"];
const VALID_DURATIONS: VideoDuration[] = [15, 20, 25, 30];

const SCENE_LABELS = ["Hook", "Pain point", "Product intro", "Proof", "Price & promo", "CTA"];

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: CreateVideoBody;
  try {
    body = (await req.json()) as CreateVideoBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!VALID_TIERS.includes(body.tier)) {
    return NextResponse.json({ error: "Tier không hợp lệ" }, { status: 400 });
  }
  if (!VALID_DURATIONS.includes(body.duration)) {
    return NextResponse.json({ error: "Thời lượng không hợp lệ" }, { status: 400 });
  }
  const tokenCost = getVideoTokenCost(body.tier, body.duration);
  if (!tokenCost) {
    return NextResponse.json({
      error: `Combination ${body.tier} ${body.duration}s không support.`,
    }, { status: 400 });
  }

  const input = body.input ?? ({} as CreateVideoBody["input"]);
  if (!input.product_name || input.product_name.trim().length < 3) {
    return NextResponse.json({ error: "Tên sản phẩm tối thiểu 3 ký tự" }, { status: 400 });
  }
  if (!input.product_description || input.product_description.trim().length < 10) {
    return NextResponse.json({ error: "Mô tả tối thiểu 10 ký tự" }, { status: 400 });
  }

  const presetId = body.preset_id ?? input.preset_id ?? "cartoon_3d_character";
  const preset = VIDEO_PRESETS.find((p) => p.id === presetId);
  if (!preset) {
    return NextResponse.json({ error: "Preset không hợp lệ" }, { status: 400 });
  }

  const voiceValid = !input.voice_id || FPT_VOICES.some((v) => v.id === input.voice_id);
  if (!voiceValid) return NextResponse.json({ error: "Voice không hợp lệ" }, { status: 400 });

  const sb = getSupabaseAdmin();

  // Atomically deduct tokens + create video
  const { data: videoId, error } = await sb.rpc("create_video_with_token_lock", {
    p_user_id: userId,
    p_input_data: {
      preset_id: presetId,
      platform: input.platform || "tiktok",
      product_name: input.product_name.trim(),
      product_description: input.product_description.trim(),
      target_audience: input.target_audience?.trim() || null,
      cta: input.cta?.trim() || null,
      price_vnd: typeof input.price_vnd === "number" && input.price_vnd > 0 ? input.price_vnd : null,
      promo: input.promo?.trim() || null,
      social_proof: input.social_proof?.trim() || null,
      shot_size: input.shot_size || preset.defaults.shotSize,
      camera_angle: input.camera_angle || preset.defaults.cameraAngle,
      camera_motion: input.camera_motion || preset.defaults.cameraMotion,
      lighting: input.lighting || preset.defaults.lighting,
      mc_emotion: input.mc_emotion || preset.defaults.mcEmotion,
      mc_character: input.mc_character || preset.defaults.mcCharacter,
      wardrobe: input.wardrobe || preset.defaults.wardrobe,
      voice_id: input.voice_id || preset.defaults.voiceId,
    },
    p_duration: body.duration,
    p_tier: body.tier,
    p_token_cost: tokenCost,
    p_avatar_id: null,
    p_is_draft: false,
  });

  if (error) {
    if (error.message?.includes("INSUFFICIENT_TOKENS")) {
      return NextResponse.json({ error: "Không đủ token. Vui lòng nạp thêm." }, { status: 402 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Update video with preset_id + auto_caption flag
  await sb.from("videos").update({
    preset_id: presetId,
    auto_caption: body.auto_caption ?? true,
  }).eq("id", videoId);

  // Create 6 scene rows (status='pending', mock will advance them)
  const sceneDuration = Math.floor(body.duration / SCENES_PER_VIDEO) || 5;
  const scenesPayload = Array.from({ length: SCENES_PER_VIDEO }, (_, i) => ({
    video_id: videoId,
    scene_idx: i,
    label: SCENE_LABELS[i] ?? `Scene ${i + 1}`,
    duration_sec: sceneDuration,
    status: "pending",
    is_lipsync: preset.needsLipSync,
  }));
  await sb.from("video_scenes").insert(scenesPayload);

  return NextResponse.json({
    video_id: videoId,
    token_cost: tokenCost,
    status: "pending",
    scenes_count: SCENES_PER_VIDEO,
  });
}
