import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { auth } from "@clerk/nextjs/server";

/**
 * Submit comment on a blog post.
 *   POST /api/comments
 *   { postId: string, authorName: string, authorEmail?: string, content: string, parentId?: string }
 *
 * Auto-approve - moderate sau qua Supabase Studio nếu cần.
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

    let userId: string | null = null;
    try {
      const { userId: uid } = await auth();
      userId = uid;
    } catch {}

    const sb = getSupabaseAdmin();
    const { error } = await sb.from("comments").insert({
      post_sanity_id: postId,
      user_id: userId,
      guest_name: userId ? null : authorName.trim(),
      guest_email:
        !userId && typeof authorEmail === "string" && authorEmail.includes("@")
          ? authorEmail.trim()
          : null,
      parent_id: typeof parentId === "string" && parentId ? parentId : null,
      body: content.trim(),
      approved: true,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: "Cảm ơn bạn đã bình luận!" });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Lỗi không xác định" }, { status: 500 });
  }
}
