/**
 * AI Video Studio worker - polls Supabase for pending videos and runs render pipeline.
 *
 * Deployment: Railway (Docker). NOT Vercel.
 *
 * Concurrency: 1 video at a time per worker instance.
 * To scale: spin up more Railway instances - claimNextJob is atomic.
 */

import { claimNextJob, refundVideo, incrementRetry, updateStatus } from "./db.js";
import { runMockPipeline } from "./pipeline/mock.js";

const POLL_INTERVAL_MS = parseInt(process.env.WORKER_POLL_INTERVAL_MS ?? "5000", 10);
const MAX_RETRIES = parseInt(process.env.WORKER_MAX_RETRIES ?? "3", 10);
const USE_MOCK = (process.env.WORKER_USE_MOCK ?? "true") === "true";

let running = true;

async function tick(): Promise<void> {
  const job = await claimNextJob();
  if (!job) return;

  console.log(`[worker] picked up video ${job.id} (retry ${job.retry_count}/${MAX_RETRIES})`);
  const start = Date.now();

  try {
    if (USE_MOCK) {
      await runMockPipeline(job);
    } else {
      // Phase 4+: real pipeline
      throw new Error("Real pipeline not implemented yet");
    }
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`[worker] video ${job.id} done in ${elapsed}s`);
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`[worker] video ${job.id} failed:`, errorMsg);

    if (job.retry_count + 1 >= MAX_RETRIES) {
      console.log(`[worker] video ${job.id} reached max retries - refunding`);
      await refundVideo(job.id, errorMsg);
    } else {
      await incrementRetry(job.id, job.retry_count, "unknown");
      await updateStatus(job.id, {
        status_message: `Lỗi (lần ${job.retry_count + 1}/${MAX_RETRIES}), đang retry...`,
      });
    }
  }
}

async function main(): Promise<void> {
  console.log("[worker] starting");
  console.log(`[worker] mode: ${USE_MOCK ? "MOCK" : "REAL"}`);
  console.log(`[worker] poll interval: ${POLL_INTERVAL_MS}ms`);
  console.log(`[worker] max retries: ${MAX_RETRIES}`);

  while (running) {
    try {
      await tick();
    } catch (e) {
      console.error("[worker] tick error:", e);
    }
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
  }
}

process.on("SIGINT", () => {
  console.log("[worker] SIGINT received, shutting down...");
  running = false;
});

process.on("SIGTERM", () => {
  console.log("[worker] SIGTERM received, shutting down...");
  running = false;
});

main().catch((e) => {
  console.error("[worker] fatal:", e);
  process.exit(1);
});
