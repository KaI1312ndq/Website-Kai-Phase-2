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

const MOCK_SCRIPT = (name: string, desc: string, cta?: string) => `
[HOOK 0-3s] Bạn đã thử bao nhiêu sản phẩm nhưng vẫn chưa thấy hiệu quả?

[PAIN 3-8s] Tốn tiền, tốn thời gian - vẫn không thay đổi gì. Mệt mỏi đúng không?

[PRODUCT 8-22s] ${name} là giải pháp. ${desc}

[CTA 22-30s] ${cta ?? "Truy cập ngay để trải nghiệm sự khác biệt."}
`.trim();

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
  const input = video.input_data as Record<string, string | undefined> | null;
  const productName = input?.product_name ?? "sản phẩm";
  const productDesc = input?.product_description ?? "";
  const cta = input?.cta;

  const patch: Record<string, unknown> = {
    status: target.status,
    progress_percent: target.progress,
    status_message: target.message,
  };

  // Set script when entering scripting stage if not already set
  if (target.atSeconds >= 3 && !video.script_text) {
    patch.script_text = MOCK_SCRIPT(productName, productDesc, cta);
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
