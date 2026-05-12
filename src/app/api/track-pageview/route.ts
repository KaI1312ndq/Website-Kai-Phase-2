import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { auth } from "@clerk/nextjs/server";

/**
 * Lightweight first-party pageview tracking → Supabase pageviews table.
 * Khác Vercel Analytics / GA4: data own, query trực tiếp trong admin.
 *
 * POST /api/track-pageview
 *   { path: string, referrer?: string, sessionId?: string }
 *
 * Gọi từ client mỗi route change. Fail-soft: không throw, không block UI.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const path = typeof body?.path === "string" ? body.path.slice(0, 500) : null;
    if (!path) return NextResponse.json({ ok: false });

    // Skip tracking admin pages
    if (path.startsWith("/account/admin") || path.startsWith("/studio") || path.startsWith("/api/")) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const referrer = typeof body?.referrer === "string" ? body.referrer.slice(0, 500) : null;
    const sessionId = typeof body?.sessionId === "string" ? body.sessionId.slice(0, 64) : null;
    const country = req.headers.get("x-vercel-ip-country") || null;
    const ua = req.headers.get("user-agent") || "";
    const device = /Mobile|Android|iPhone|iPad/.test(ua) ? "mobile" : "desktop";

    let userId: string | null = null;
    try {
      const { userId: uid } = await auth();
      userId = uid;
    } catch {}

    await getSupabaseAdmin().from("pageviews").insert({
      path,
      referrer,
      session_id: sessionId,
      user_id: userId,
      country,
      device,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
