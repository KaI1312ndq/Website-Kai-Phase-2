import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Capture quiz lead before showing gated quiz result.
 *   POST /api/quiz-leads
 *   { quizSlug, quizName, resultType, name, email?, phone?, scores }
 */

const RATE_LIMIT = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT.get(ip);
  if (!entry || entry.resetAt < now) {
    RATE_LIMIT.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 10) return false;
  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Quá nhiều request, vui lòng đợi 1 phút." }, { status: 429 });
    }

    const body = await req.json();
    const { quizSlug, quizName, resultType, name, email, phone, scores, source, utm } = body || {};

    if (typeof quizSlug !== "string" || !quizSlug) {
      return NextResponse.json({ error: "Thiếu quiz" }, { status: 400 });
    }
    if (typeof name !== "string" || name.trim().length === 0 || name.length > 80) {
      return NextResponse.json({ error: "Vui lòng nhập tên" }, { status: 400 });
    }

    const hasEmail = typeof email === "string" && email.includes("@") && email.length <= 120;
    const hasPhone = typeof phone === "string" && phone.replace(/\D/g, "").length >= 9 && phone.length <= 20;
    if (!hasEmail && !hasPhone) {
      return NextResponse.json({ error: "Vui lòng nhập email hoặc số điện thoại" }, { status: 400 });
    }

    const ipHash = createHash("sha256").update(ip).digest("hex").slice(0, 16);
    const sb = getSupabaseAdmin();

    const { error } = await sb.from("quiz_leads").insert({
      name: name.trim(),
      email: hasEmail ? email.trim().toLowerCase() : null,
      phone: hasPhone ? phone.trim() : null,
      quiz_slug: quizSlug,
      quiz_name: typeof quizName === "string" ? quizName : null,
      result_type: typeof resultType === "string" ? resultType : null,
      scores: scores ?? null,
      source: typeof source === "string" ? source : null,
      utm: utm ?? null,
      ip_hash: ipHash,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Lỗi không xác định" }, { status: 500 });
  }
}
