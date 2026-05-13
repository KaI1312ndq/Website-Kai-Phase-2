import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

/**
 * Status poll endpoint.
 *
 * Phase 3 MOCK MODE: instead of relying on a worker, we advance the video
 * state machine based on time elapsed since created_at. Each poll from the
 * client checks if it's time to move to the next stage and updates the DB.
 *
 * This way the full UX works on Vercel only - no Railway/worker needed
 * until Phase 4 swaps in real fal.ai/Anthropic/FPT calls.
 */

// Sample for mock mode (real 9:16 video comes from worker in Phase 4).
// Player container is 9:16 with objectFit:contain so any aspect ratio displays correctly.
const MOCK_SAMPLE_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const MOCK_SAMPLE_THUMB = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg";

interface Stage {
  status: string;
  progress: number;
  message: string;
  atSeconds: number;
}

const STAGES: Stage[] = [
  { status: "scripting",  progress: 15, message: "AI đang viết kịch bản tiếng Việt...",        atSeconds: 3 },
  { status: "scripting",  progress: 30, message: "Kịch bản xong, chuẩn bị tạo hình ảnh...",     atSeconds: 7 },
  { status: "imaging",    progress: 45, message: "Đang gen hình ảnh từng cảnh (Flux Schnell)...", atSeconds: 11 },
  { status: "imaging",    progress: 60, message: "Hình ảnh xong, bắt đầu animate...",            atSeconds: 15 },
  { status: "animating",  progress: 75, message: "Kling 3.0 đang animate clip...",               atSeconds: 19 },
  { status: "composing",  progress: 90, message: "Đang ghép voice + music + watermark...",       atSeconds: 23 },
  { status: "completed",  progress: 100, message: "Hoàn tất (MOCK - dùng sample video)",          atSeconds: 26 },
];

/** Generate scene-by-scene script per Yumvita TikTok ads workflow. */
const MOCK_SCRIPT = (input: Record<string, string | number | null | undefined>) => {
  const name = String(input.product_name ?? "sản phẩm");
  const desc = String(input.product_description ?? "");
  const cta = input.cta ? String(input.cta) : "Đặt mua ngay trong giỏ hàng đính kèm.";
  const promo = input.promo ? String(input.promo) : null;
  const price = typeof input.price_vnd === "number" ? input.price_vnd : null;
  const proof = input.social_proof ? String(input.social_proof) : null;
  const format = String(input.format ?? "dialog");
  const character = String(input.character ?? "product");
  const tone = String(input.tone ?? "sharp_sarcastic");
  const bodyPart = input.body_part_focus ? String(input.body_part_focus) : "dạ dày";

  // Pick hook based on format + tone
  const hooks: Record<string, string> = {
    dialog: `"Bạn đang ăn ${name} sai cách rồi đấy."`,
    monologue: `"Tôi là ${name} - khác bọn snack rẻ tiền kia hoàn toàn."`,
    drama: `"Snack thường vs ${name} - chọn cái nào?"`,
    body_pain: `"${bodyPart.toUpperCase()} của bạn đang KÊU CỨU đấy!"`,
  };
  const hook = hooks[format] ?? hooks.dialog;

  // Pick visual cue based on character type
  const visuals: Record<string, string> = {
    product: `Sản phẩm hoạt hình có tay chân, biểu cảm xéo`,
    user_persona: `Cô gái Gen Z, mặt bối rối`,
    body_part: `${bodyPart} hoạt hình mặt mệt mỏi, exaggerated`,
    duo: `2 nhân vật: sản phẩm + cô gái user`,
  };
  const visualCue = visuals[character] ?? visuals.product;

  // Tone modifier for dialogue
  const toneStyle: Record<string, string> = {
    sharp_sarcastic: "thẳng thắn + xéo, không khiêm tốn",
    friendly_funny: "vui tươi, hài nhẹ như nói chuyện với bạn",
    confident_proud: "tự tin, dứt khoát, không dài dòng",
    urgent_punchy: "gấp gáp, cắt nhanh, nhấn từ khóa",
  };

  return `
═══ KỊCH BẢN 6 CẢNH ═══
Format: ${format} | Nhân vật: ${character} | Tone: ${toneStyle[tone] ?? toneStyle.sharp_sarcastic}

CẢNH 1 (0-4s) - HOOK
Visual: ${visualCue} - close-up đầu video
Lời thoại: ${hook}
On-screen text: ${format === "body_pain" ? "S.O.S 🆘" : "STOP ✋"}

CẢNH 2 (4-10s) - PAIN POINT
Visual: ${format === "body_pain" ? `${bodyPart} hoạt hình giận dữ, gánh chịu` : "Cô gái user mặt bối rối, lifestyle hiện đại"}
Lời thoại: "Bạn ăn vặt linh tinh chiều nào cũng vậy. Đói + stress + sợ béo - vòng luẩn quẩn."
On-screen text: 3 icon vấn đề: đói/béo/mệt

CẢNH 3 (10-18s) - PRODUCT INTRO
Visual: ${name} hoạt hình xuất hiện, cười tự tin
Lời thoại: "Đây - ${name}. ${desc}"
On-screen text: Highlight 2-3 USP keyword

CẢNH 4 (18-24s) - PROOF & DIFFERENTIATION
Visual: ${name} demo, cận cảnh thành phần
Lời thoại: ${proof ? `"${proof} - không phải tự khen, là sự thật."` : `"Ai ăn cũng quay lại - vì khác bọn snack thường."`}
On-screen text: ${proof ? `⭐ ${proof}` : "Loop demo + happy reaction"}

CẢNH 5 (24-30s) - PRICE & PROMO
Visual: Sản phẩm trên bàn, light flare effect
Lời thoại: ${price ? `"Chỉ ${price.toLocaleString("vi-VN")}đ. ` : '"'}${promo ? `${promo}."` : 'Đáng tin hơn 10 lần snack khác."'}
On-screen text: ${price ? `${price.toLocaleString("vi-VN")}đ` : "Best value"}${promo ? ` · ${promo}` : ""}

CẢNH 6 (30-${input.duration ?? 30}s) - CTA
Visual: Sản phẩm + arrow chỉ xuống giỏ hàng, music drop
Lời thoại: "${cta}"
On-screen text: Đặt mua ↓ (đính kèm shop link)

═══ GHI CHÚ AI RENDER ═══
- Voice: ${input.voice_id ?? "leminh"} - tốc độ nhanh, nhấn từ khóa
- Style: ${input.style ?? "ugc"}
- Aspect: 9:16 dọc cho TikTok/Shopee/Reels
- Music: punchy, BPM 100-120, drop ở cảnh 5-6
`.trim();
};

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sb = getSupabaseAdmin();
  const { data: video } = await sb
    .from("videos")
    .select("id, status, status_message, progress_percent, output_url, thumbnail_url, error_message, failed_step, script_text, created_at, started_at, completed_at, tier, duration, token_cost, watermark, input_data")
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();

  if (!video) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // If already terminal (completed/failed/refunded/cancelled), return as-is
  const TERMINAL = ["completed", "failed", "refunded", "cancelled"];
  if (TERMINAL.includes(video.status)) {
    return NextResponse.json(video);
  }

  // MOCK MODE: advance state based on elapsed time
  const elapsedMs = Date.now() - new Date(video.created_at).getTime();
  const elapsedSec = Math.floor(elapsedMs / 1000);

  // Find latest stage we should be at
  const reached = STAGES.filter((s) => elapsedSec >= s.atSeconds);
  const target = reached.length > 0 ? reached[reached.length - 1] : null;

  if (!target) {
    // Still pre-stage 1 - return current state
    return NextResponse.json(video);
  }

  // Build patch
  const input = (video.input_data as Record<string, string | number | null | undefined> | null) ?? {};

  const patch: Record<string, unknown> = {
    status: target.status,
    progress_percent: target.progress,
    status_message: target.message,
  };

  // Set script when entering scripting stage if not already set
  if (target.atSeconds >= 3 && !video.script_text) {
    patch.script_text = MOCK_SCRIPT(input);
  }

  // Set started_at on first transition out of pending
  if (!video.started_at) {
    patch.started_at = new Date().toISOString();
  }

  // Set output_url + thumbnail on completion
  if (target.status === "completed") {
    patch.output_url = MOCK_SAMPLE_VIDEO;
    patch.thumbnail_url = MOCK_SAMPLE_THUMB;
    patch.completed_at = new Date().toISOString();
  }

  // Only update DB if something changed (avoid spamming writes)
  const needsUpdate =
    video.status !== target.status ||
    video.progress_percent !== target.progress ||
    video.status_message !== target.message;

  if (needsUpdate) {
    await sb.from("videos").update(patch).eq("id", id);
  }

  return NextResponse.json({
    ...video,
    ...patch,
  });
}
