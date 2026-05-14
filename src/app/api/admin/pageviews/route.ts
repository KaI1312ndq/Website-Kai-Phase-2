import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const ADMIN_SECRET = process.env.SEED_SECRET || "kai-seed-2026";

function isAuthed(req: NextRequest) {
  return req.cookies.get("admin_session")?.value === ADMIN_SECRET;
}

/**
 * Return view counts per blog post slug.
 * Query: ?range=7d|30d|all (default: all)
 *
 * Returns: { [slug: string]: { views: number, week: number, today: number } }
 */
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const sb = getSupabaseAdmin();

    // Pull all blog pageviews from the last 90 days (limit by time, not by row count)
    // For higher scale, this could be moved to a daily aggregate view.
    const since = new Date(Date.now() - 90 * 86400000).toISOString();
    const { data, error } = await sb
      .from("pageviews")
      .select("path, created_at")
      .like("path", "/blog/%")
      .gte("created_at", since)
      .limit(50000);

    if (error) throw error;

    const now = Date.now();
    const dayMs = 86400000;
    const result: Record<string, { views: number; week: number; today: number }> = {};

    for (const row of data || []) {
      const slug = row.path.replace(/^\/blog\//, "").replace(/\?.*$/, "").replace(/\/$/, "");
      if (!slug || slug.includes("/")) continue; // skip nested /blog/x/y
      if (!result[slug]) result[slug] = { views: 0, week: 0, today: 0 };
      result[slug].views++;
      const age = now - new Date(row.created_at).getTime();
      if (age < 7 * dayMs) result[slug].week++;
      if (age < dayMs) result[slug].today++;
    }

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
