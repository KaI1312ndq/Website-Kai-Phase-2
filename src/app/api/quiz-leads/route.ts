import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { createHash } from "crypto";

/**
 * Capture quiz lead (name + email + phone) before showing gated quiz result.
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
    const { quizSlug, quizName, resultType, name, email, phone, scores } = body || {};

    if (typeof quizSlug !== "string" || !quizSlug) {
      return NextResponse.json({ error: "Thiếu quiz" }, { status: 400 });
    }
    if (typeof name !== "string" || name.trim().length === 0 || name.length > 80) {
      return NextResponse.json({ error: "Vui lòng nhập tên" }, { status: 400 });
    }

    // At least 1 of email or phone required
    const hasEmail = typeof email === "string" && email.includes("@") && email.length <= 120;
    const hasPhone = typeof phone === "string" && phone.replace(/\D/g, "").length >= 9 && phone.length <= 20;
    if (!hasEmail && !hasPhone) {
      return NextResponse.json({ error: "Vui lòng nhập email hoặc số điện thoại" }, { status: 400 });
    }

    const token = process.env.SANITY_API_WRITE_TOKEN;
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!token || !projectId || projectId === "placeholder") {
      // Fail soft: don't block user from seeing result
      return NextResponse.json({ ok: true, warning: "Sanity chưa config - lead chưa lưu" });
    }

    const sanity = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      token,
      useCdn: false,
    });

    const ipHash = createHash("sha256").update(ip).digest("hex").slice(0, 16);

    const doc: any = {
      _type: "quizLead",
      quizSlug,
      quizName: typeof quizName === "string" ? quizName : undefined,
      resultType: typeof resultType === "string" ? resultType : undefined,
      name: name.trim(),
      email: hasEmail ? email.trim() : undefined,
      phone: hasPhone ? phone.trim() : undefined,
      scoresJson: scores ? JSON.stringify(scores) : undefined,
      createdAt: new Date().toISOString(),
      ipHash,
    };

    await sanity.create(doc);

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Lỗi không xác định" }, { status: 500 });
  }
}
