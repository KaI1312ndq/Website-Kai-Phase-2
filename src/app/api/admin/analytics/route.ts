import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const ADMIN_SECRET = process.env.SEED_SECRET || "kai-seed-2026";

function isAuthed(req: NextRequest) {
  return req.cookies.get("admin_session")?.value === ADMIN_SECRET;
}

/**
 * Analytics aggregations cho admin dashboard.
 * Query: ?range=7|30|90 (days)
 *
 * Trả về:
 * - summary: { totalViews, uniqueVisitors, mobilePercent, topCountry }
 * - daily: [{ date, views }]
 * - topPaths: [{ path, views }]   (top 20)
 * - topReferrers: [{ source, views }]
 * - deviceBreakdown: { mobile, desktop }
 * - countryBreakdown: [{ country, views }] top 5
 */
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // range = 1 -> hourly bucket (24h), > 1 -> daily bucket (7/30/90 ngày)
  const rangeDays = Math.min(90, Math.max(1, parseInt(req.nextUrl.searchParams.get("range") || "30")));
  const hourly = rangeDays === 1;
  const since = new Date(Date.now() - rangeDays * 86400000).toISOString();

  try {
    const sb = getSupabaseAdmin();
    // Pull rows in range (cap 50k để không OOM với traffic cao)
    const { data, error } = await sb
      .from("pageviews")
      .select("path, referrer, session_id, country, device, created_at")
      .gte("created_at", since)
      .limit(50000);

    if (error) throw error;
    const rows = data || [];

    // Aggregations
    const totalViews = rows.length;
    const uniqueVisitors = new Set(rows.map(r => r.session_id).filter(Boolean)).size;
    const mobile = rows.filter(r => r.device === "mobile").length;
    const mobilePercent = totalViews > 0 ? Math.round((mobile / totalViews) * 100) : 0;

    // Time buckets - hourly (24 bars) hoặc daily (rangeDays bars)
    const buckets = new Map<string, number>();
    const now = Date.now();
    if (hourly) {
      // 24 buckets: each hour from (now - 24h) to now. Label = "HH:00" trong Asia/Ho_Chi_Minh (UTC+7)
      for (let h = 23; h >= 0; h--) {
        const t = new Date(now - h * 3600000);
        // Format key as ISO hour (UTC), display as VN hour
        const key = t.toISOString().slice(0, 13); // "2026-05-18T15"
        buckets.set(key, 0);
      }
      rows.forEach(r => {
        const key = (r.created_at as string).slice(0, 13);
        if (buckets.has(key)) buckets.set(key, (buckets.get(key) || 0) + 1);
      });
    } else {
      for (let d = rangeDays - 1; d >= 0; d--) {
        const day = new Date(now - d * 86400000).toISOString().slice(0, 10);
        buckets.set(day, 0);
      }
      rows.forEach(r => {
        const day = (r.created_at as string).slice(0, 10);
        if (buckets.has(day)) buckets.set(day, (buckets.get(day) || 0) + 1);
      });
    }
    const daily = Array.from(buckets.entries())
      .map(([key, views]) => {
        if (hourly) {
          // "2026-05-18T15" -> +7h cho VN -> "22:00 (18/5)"
          const d = new Date(key + ":00:00Z");
          const vnHour = (d.getUTCHours() + 7) % 24;
          const label = `${String(vnHour).padStart(2, "0")}:00`;
          return { date: label, views, _key: key };
        }
        return { date: key, views, _key: key };
      })
      .sort((a, b) => a._key.localeCompare(b._key));

    // Top paths
    const pathMap = new Map<string, number>();
    rows.forEach(r => {
      const p = r.path as string;
      pathMap.set(p, (pathMap.get(p) || 0) + 1);
    });
    const topPaths = Array.from(pathMap.entries())
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 20);

    // Top referrers (normalize to domain)
    const refMap = new Map<string, number>();
    rows.forEach(r => {
      const raw = r.referrer as string | null;
      let source = "Direct (no referrer)";
      if (raw) {
        try {
          const u = new URL(raw);
          source = u.hostname.replace(/^www\./, "");
        } catch {
          source = raw.slice(0, 30);
        }
      }
      refMap.set(source, (refMap.get(source) || 0) + 1);
    });
    const topReferrers = Array.from(refMap.entries())
      .map(([source, views]) => ({ source, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Device
    const desktop = totalViews - mobile;
    const deviceBreakdown = { mobile, desktop };

    // Country
    const countryMap = new Map<string, number>();
    rows.forEach(r => {
      const c = (r.country as string) || "Unknown";
      countryMap.set(c, (countryMap.get(c) || 0) + 1);
    });
    const countryBreakdown = Array.from(countryMap.entries())
      .map(([country, views]) => ({ country, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
    const topCountry = countryBreakdown[0]?.country || "—";

    return NextResponse.json({
      range: rangeDays,
      summary: { totalViews, uniqueVisitors, mobilePercent, topCountry },
      daily,
      topPaths,
      topReferrers,
      deviceBreakdown,
      countryBreakdown,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
