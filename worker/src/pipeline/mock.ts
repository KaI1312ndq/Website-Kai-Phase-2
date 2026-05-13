/**
 * Mock pipeline - simulates render flow without calling fal.ai/Anthropic/FPT.
 * Used in Phase 3 to validate the full state machine end-to-end.
 *
 * Each stage:
 * - Sleeps a few seconds to simulate API call latency
 * - Updates status + progress in DB
 * - Has a small chance of random failure to test refund flow
 */

import { updateStatus, type VideoJob } from "../db.js";

const MOCK_FAIL_RATE = parseFloat(process.env.WORKER_MOCK_FAIL_RATE ?? "0");
const STAGE_DELAY_MS = parseInt(process.env.WORKER_MOCK_DELAY_MS ?? "4000", 10);

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function shouldFail(): boolean {
  return Math.random() < MOCK_FAIL_RATE;
}

const MOCK_SCRIPT_TEMPLATE = (name: string, desc: string, cta?: string) => `
[HOOK 0-3s] Bạn đã thử bao nhiêu sản phẩm nhưng vẫn chưa tìm được giải pháp thực sự hiệu quả?

[PAIN 3-8s] Tốn thời gian, tiền bạc, vẫn không thấy kết quả - mệt mỏi đúng không?

[PRODUCT 8-22s] ${name} là câu trả lời. ${desc}

[CTA 22-30s] ${cta ?? "Truy cập ngay để trải nghiệm khác biệt."}
`.trim();

const SAMPLE_VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const SAMPLE_THUMB_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg";

export async function runMockPipeline(job: VideoJob): Promise<void> {
  const input = job.input_data as Record<string, string | undefined>;
  console.log(`[worker] mock pipeline start for ${job.id} - ${input.product_name}`);

  // Stage 1: scripting
  await updateStatus(job.id, {
    status: "scripting",
    progress_percent: 10,
    status_message: "AI đang viết kịch bản tiếng Việt...",
  });
  await sleep(STAGE_DELAY_MS);
  if (shouldFail()) throw new Error("Mock fail at scripting");

  const script = MOCK_SCRIPT_TEMPLATE(
    input.product_name ?? "sản phẩm",
    input.product_description ?? "",
    input.cta
  );
  await updateStatus(job.id, {
    progress_percent: 25,
    script_text: script,
    status_message: "Kịch bản hoàn tất, bắt đầu tạo hình ảnh...",
  });

  // Stage 2: imaging
  await updateStatus(job.id, {
    status: "imaging",
    progress_percent: 35,
    status_message: "Đang gen hình ảnh từng cảnh với Flux Schnell...",
  });
  await sleep(STAGE_DELAY_MS);
  if (shouldFail()) throw new Error("Mock fail at imaging");

  await updateStatus(job.id, {
    progress_percent: 55,
    status_message: "Hình ảnh xong, bắt đầu animate...",
  });

  // Stage 3: animating
  await updateStatus(job.id, {
    status: "animating",
    progress_percent: 60,
    status_message: "Kling 3.0 đang animate clip...",
  });
  await sleep(STAGE_DELAY_MS);
  if (shouldFail()) throw new Error("Mock fail at animating");

  await updateStatus(job.id, {
    progress_percent: 80,
    status_message: "Clip xong, đang compose video cuối...",
  });

  // Stage 4: composing
  await updateStatus(job.id, {
    status: "composing",
    progress_percent: 90,
    status_message: "Đang ghép voice + music + watermark...",
  });
  await sleep(STAGE_DELAY_MS);
  if (shouldFail()) throw new Error("Mock fail at composing");

  // Mock output
  console.log(`[worker] mock pipeline complete for ${job.id}`);
  await updateStatus(job.id, {
    status: "completed",
    progress_percent: 100,
    output_url: SAMPLE_VIDEO_URL,
    thumbnail_url: SAMPLE_THUMB_URL,
    status_message: "Hoàn tất (MOCK - dùng sample video)",
  });
}
