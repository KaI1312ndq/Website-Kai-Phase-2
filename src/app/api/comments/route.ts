import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

/**
 * Submit comment on a blog post.
 *   POST /api/comments
 *   { postId: string, authorName: string, authorEmail?: string, content: string, parentId?: string }
 *
 * Comment is created with approved=false — Quảng review trong Sanity Studio rồi mới hiện.
 *
 * Anti-abuse:
 *   - Min 1 char, max 3000 chars content
 *   - Min 1 char, max 80 chars name
 *   - Simple rate-limit by IP (in-memory, naive — for serious anti-spam dùng upstash)
 */

const RATE_LIMIT = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT.get(ip);
  if (!entry || entry.resetAt < now) {
    RATE_LIMIT.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_PER_WINDOW) return false;
  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Quá nhiều bình luận trong 1 phút. Vui lòng đợi." }, { status: 429 });
    }

    const body = await req.json();
    const { postId, authorName, authorEmail, content, parentId } = body || {};

    if (typeof postId !== "string" || !postId) {
      return NextResponse.json({ error: "Thiếu postId" }, { status: 400 });
    }
    if (typeof authorName !== "string" || authorName.trim().length === 0 || authorName.length > 80) {
      return NextResponse.json({ error: "Tên không hợp lệ" }, { status: 400 });
    }
    if (typeof content !== "string" || content.trim().length === 0 || content.length > 3000) {
      return NextResponse.json({ error: "Nội dung không hợp lệ" }, { status: 400 });
    }

    const token = process.env.SANITY_API_WRITE_TOKEN;
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!token || !projectId || projectId === "placeholder") {
      return NextResponse.json({ error: "Cấu hình Sanity chưa sẵn sàng" }, { status: 500 });
    }

    const sanity = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      token,
      useCdn: false,
    });

    const doc: any = {
      _type: "comment",
      post: { _type: "reference", _ref: postId },
      authorName: authorName.trim(),
      content: content.trim(),
      approved: false,
      createdAt: new Date().toISOString(),
    };
    if (typeof authorEmail === "string" && authorEmail.includes("@")) doc.authorEmail = authorEmail.trim();
    if (typeof parentId === "string" && parentId) doc.parent = { _type: "reference", _ref: parentId };

    await sanity.create(doc);

    return NextResponse.json({
      ok: true,
      message: "Cảm ơn bạn đã bình luận! Bình luận sẽ hiện sau khi được duyệt.",
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Lỗi không xác định" }, { status: 500 });
  }
}
