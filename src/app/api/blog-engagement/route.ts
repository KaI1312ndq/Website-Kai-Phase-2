import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

/**
 * Blog engagement API:
 *   POST /api/blog-engagement
 *     { postId: string, action: 'view' | 'like' | 'unlike' }
 *
 * View tracking:
 *   - Per-IP debounced (10 phút) - không double-count cùng người reload
 *
 * Like tracking:
 *   - Increment / decrement counter
 *   - Client-side dùng localStorage để biết user đã like chưa
 */

const VIEW_DEBOUNCE_MS = 10 * 60 * 1000; // 10 phút
const VIEW_BUCKET = new Map<string, number>(); // key = `${ip}:${postId}`, value = expiresAt

function checkViewDebounce(ip: string, postId: string): boolean {
  const key = `${ip}:${postId}`;
  const now = Date.now();
  const expiresAt = VIEW_BUCKET.get(key);
  if (expiresAt && expiresAt > now) return false;
  VIEW_BUCKET.set(key, now + VIEW_DEBOUNCE_MS);
  // Cleanup periodically
  if (VIEW_BUCKET.size > 5000) {
    for (const [k, v] of VIEW_BUCKET) {
      if (v < now) VIEW_BUCKET.delete(k);
    }
  }
  return true;
}

function getSanityClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!token || !projectId || projectId === "placeholder") return null;
  return createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
  });
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const body = await req.json();
    const { postId, action } = body || {};

    if (typeof postId !== "string" || !postId) {
      return NextResponse.json({ error: "Missing postId" }, { status: 400 });
    }

    const client = getSanityClient();
    if (!client) return NextResponse.json({ error: "Sanity not configured" }, { status: 500 });

    if (action === "view") {
      if (!checkViewDebounce(ip, postId)) {
        return NextResponse.json({ ok: true, deduped: true });
      }
      await client.patch(postId).setIfMissing({ viewCount: 0 }).inc({ viewCount: 1 }).commit({ autoGenerateArrayKeys: true });
      return NextResponse.json({ ok: true });
    }

    if (action === "like") {
      await client.patch(postId).setIfMissing({ likeCount: 0 }).inc({ likeCount: 1 }).commit();
      return NextResponse.json({ ok: true });
    }

    if (action === "unlike") {
      await client.patch(postId).setIfMissing({ likeCount: 0 }).dec({ likeCount: 1 }).commit();
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unknown error" }, { status: 500 });
  }
}
