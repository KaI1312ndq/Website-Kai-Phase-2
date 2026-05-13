import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getVideoTokenCost, PRICING_MATRIX } from "@/lib/video/pricing";
import { FPT_VOICES, VIDEO_STYLES } from "@/lib/video/voices";
import type { VideoTier, VideoDuration } from "@/lib/video/types";

export const runtime = "nodejs";

interface CreateVideoBody {
  tier: VideoTier;
  duration: VideoDuration;
  input: {
    product_name: string;
    product_description: string;
    target_audience?: string;
    cta?: string;
    style?: string;
    voice_id?: string;
  };
}

const VALID_TIERS: VideoTier[] = ["eco", "standard", "pro"];
const VALID_DURATIONS: VideoDuration[] = [15, 20, 25, 30];

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: CreateVideoBody;
  try {
    body = (await req.json()) as CreateVideoBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Validate tier + duration
  if (!VALID_TIERS.includes(body.tier)) {
    return NextResponse.json({ error: "Tier không hợp lệ" }, { status: 400 });
  }
  if (!VALID_DURATIONS.includes(body.duration)) {
    return NextResponse.json({ error: "Thời lượng không hợp lệ" }, { status: 400 });
  }
  const tokenCost = getVideoTokenCost(body.tier, body.duration);
  if (!tokenCost) {
    return NextResponse.json({
      error: `Combination ${body.tier} ${body.duration}s không support. Xem bảng giá.`,
    }, { status: 400 });
  }

  // Validate product info
  const input = body.input ?? {};
  if (!input.product_name || input.product_name.trim().length < 3) {
    return NextResponse.json({ error: "Tên sản phẩm tối thiểu 3 ký tự" }, { status: 400 });
  }
  if (!input.product_description || input.product_description.trim().length < 10) {
    return NextResponse.json({ error: "Mô tả tối thiểu 10 ký tự" }, { status: 400 });
  }

  // Validate style + voice
  const styleValid = !input.style || VIDEO_STYLES.some((s) => s.id === input.style);
  const voiceValid = !input.voice_id || FPT_VOICES.some((v) => v.id === input.voice_id);
  if (!styleValid) return NextResponse.json({ error: "Style không hợp lệ" }, { status: 400 });
  if (!voiceValid) return NextResponse.json({ error: "Voice không hợp lệ" }, { status: 400 });

  const sb = getSupabaseAdmin();

  // Atomic: check balance + deduct token + insert video
  const { data: videoId, error } = await sb.rpc("create_video_with_token_lock", {
    p_user_id: userId,
    p_input_data: {
      product_name: input.product_name.trim(),
      product_description: input.product_description.trim(),
      target_audience: input.target_audience?.trim() || null,
      cta: input.cta?.trim() || null,
      style: input.style || "modern",
      voice_id: input.voice_id || FPT_VOICES[0].id,
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

  // Note: actual worker enqueue happens here. For now (no Upstash Redis yet),
  // worker will poll the videos table directly. See worker/README.md.
  // When BullMQ ready, add: await videoQueue.add('render', { videoId });

  return NextResponse.json({
    video_id: videoId,
    token_cost: tokenCost,
    status: "pending",
  });
}
