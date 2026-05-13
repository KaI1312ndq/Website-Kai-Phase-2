# Kai Video Worker

Standalone Node.js worker for AI Video Studio render pipeline.

Deploys to Railway (or any Docker host) - **NOT** to Vercel (FFmpeg + 5-minute jobs don't fit Vercel function limits).

## Architecture

- **Polling mode (current)**: Worker polls `public.videos` table every 5s for `status='pending'` rows, locks via `SELECT FOR UPDATE SKIP LOCKED`, runs pipeline, updates DB.
- **BullMQ mode (Phase 4+)**: Switch to Upstash Redis queue. Web API enqueues `videoId`, worker consumes with concurrency limit. Same DB layer.

Polling is simpler for MVP - we control concurrency by running 1 worker instance and processing 1 video at a time. Migrate to BullMQ once concurrency > 1 needed.

## Pipeline stages

1. `scripting`   - Anthropic Claude Haiku 4.5 generates Vietnamese ad script (hook-pain-product-CTA) split into N scenes
2. `imaging`     - fal.ai Flux Schnell generates 1 image per scene from style + prompt
3. `animating`   - fal.ai Kling 3.0 Std/Pro animates each image into 4-6s clip with camera motion
4. `composing`   - FPT.AI TTS v5 generates Vietnamese voiceover, FFmpeg composes clips + voice + background music + watermark (if Eco), uploads MP4 to Cloudflare R2

On failure: 3 retries with exponential backoff. After 3 fails, mark `status=refunded` via `refund_video_token(video_id)` RPC.

## Deployment to Railway

```bash
cd worker
npm install
npm run build

# Then push to Railway via:
# 1. Connect GitHub repo to Railway
# 2. Set service root to `/worker`
# 3. Set env vars (see below)
# 4. Deploy
```

Railway auto-detects Dockerfile and builds.

## Required environment variables

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=sk-ant-...
FAL_KEY=
FPT_TTS_API_KEY=
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_VIDEOS=
R2_PUBLIC_URL=
VIDEO_WORKER_SECRET=  # shared with web for callback auth (currently unused since worker writes DB directly)
WORKER_POLL_INTERVAL_MS=5000
WORKER_MAX_RETRIES=3
```

## Current state: MOCK pipeline

`src/pipeline/mock.ts` simulates each stage with progressive sleep (no real API calls).
After Phase 3 validates the full flow, replace with `src/pipeline/real.ts` (Phase 4).

## Local test without Railway

```bash
cd worker
npm install
cp .env.example .env  # fill values
npm run dev
```

Worker will start polling Supabase. Create a video via web UI - worker picks it up and runs mock pipeline.
