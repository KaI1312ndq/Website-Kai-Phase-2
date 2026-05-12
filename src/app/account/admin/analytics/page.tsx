import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Admin · Analytics",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

type SearchParams = { range?: string };

const RANGES: Record<string, { label: string; days: number }> = {
  "24h": { label: "24 giờ", days: 1 },
  "7d": { label: "7 ngày", days: 7 },
  "30d": { label: "30 ngày", days: 30 },
  "90d": { label: "90 ngày", days: 90 },
};

async function getAnalytics(rangeKey: string) {
  const sb = getSupabaseAdmin();
  const range = RANGES[rangeKey] || RANGES["7d"];
  const since = new Date(Date.now() - range.days * 24 * 60 * 60 * 1000).toISOString();

  // Total pageviews + unique sessions
  const [pvAll, pvCurrent, sessionsData, topPaths, byDeviceData, byCountryData, byReferrerData, dailyData] = await Promise.all([
    sb.from("pageviews").select("*", { count: "exact", head: true }),
    sb.from("pageviews").select("*", { count: "exact", head: true }).gte("created_at", since),
    sb.from("pageviews").select("session_id").gte("created_at", since).not("session_id", "is", null),
    sb.from("pageviews").select("path").gte("created_at", since),
    sb.from("pageviews").select("device").gte("created_at", since),
    sb.from("pageviews").select("country").gte("created_at", since).not("country", "is", null),
    sb.from("pageviews").select("referrer").gte("created_at", since).not("referrer", "is", null),
    sb.from("pageviews").select("created_at").gte("created_at", since),
  ]);

  const uniqueSessions = new Set((sessionsData.data || []).map((r) => r.session_id)).size;

  function countBy<T>(rows: T[], key: keyof T): Array<[string, number]> {
    const m = new Map<string, number>();
    for (const r of rows) {
      const v = String((r as Record<string, unknown>)[key as string] || "");
      if (!v) continue;
      m.set(v, (m.get(v) || 0) + 1);
    }
    return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
  }

  const topPathsList = countBy(topPaths.data || [], "path").slice(0, 20);
  const deviceList = countBy(byDeviceData.data || [], "device");
  const countryList = countBy(byCountryData.data || [], "country").slice(0, 10);
  const referrerList = countBy(
    (byReferrerData.data || []).map((r) => ({
      // Normalize referrer to hostname
      referrer: r.referrer ? new URL(r.referrer as string).hostname.replace(/^www\./, "") : "",
    })).filter((r) => r.referrer),
    "referrer",
  ).slice(0, 10);

  // Daily series
  const daily = new Map<string, number>();
  for (const r of dailyData.data || []) {
    const d = new Date(r.created_at as string).toLocaleDateString("en-CA", { timeZone: "Asia/Ho_Chi_Minh" });
    daily.set(d, (daily.get(d) || 0) + 1);
  }
  const dailyList = Array.from(daily.entries()).sort();

  return {
    pvAll: pvAll.count || 0,
    pvCurrent: pvCurrent.count || 0,
    uniqueSessions,
    topPathsList,
    deviceList,
    countryList,
    referrerList,
    dailyList,
    rangeLabel: range.label,
  };
}

export default async function AdminAnalyticsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const rangeKey = sp.range && RANGES[sp.range] ? sp.range : "7d";
  const a = await getAnalytics(rangeKey);
  const maxDaily = Math.max(1, ...a.dailyList.map(([, n]) => n));

  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="t-h2 text-white mb-1">Analytics</h1>
          <p className="text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>
            First-party tracking lưu trong Supabase. Bổ sung Vercel + GA4 ở cuối.
          </p>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {Object.entries(RANGES).map(([key, r]) => {
            const active = key === rangeKey;
            return (
              <Link
                key={key}
                href={`/account/admin/analytics?range=${key}`}
                className="px-3 py-1.5 rounded-md text-[0.8rem] font-semibold"
                style={{
                  background: active ? "var(--grad-primary)" : "rgba(255,255,255,0.06)",
                  color: active ? "white" : "var(--ink-mute)",
                }}
              >
                {r.label}
              </Link>
            );
          })}
        </div>
      </header>

      {/* Top metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Metric label={`Pageviews ${a.rangeLabel}`} value={a.pvCurrent.toLocaleString("vi-VN")} sub="First-party tracking" />
        <Metric label={`Unique sessions`} value={a.uniqueSessions.toLocaleString("vi-VN")} sub={`Khoảng ${a.rangeLabel}`} />
        <Metric label="Pageviews tất cả thời gian" value={a.pvAll.toLocaleString("vi-VN")} sub="Từ ngày tracking bắt đầu" />
      </section>

      {/* Daily chart */}
      <section>
        <h2 className="text-[0.74rem] uppercase tracking-[0.16em] font-semibold mb-3" style={{ color: "var(--ink-mute)" }}>
          Pageviews theo ngày ({a.rangeLabel})
        </h2>
        <div className="rounded-xl border p-5" style={{ background: "rgba(8,16,43,0.55)", borderColor: "rgba(255,255,255,0.08)" }}>
          {a.dailyList.length === 0 ? (
            <div className="py-8 text-center text-[0.9rem]" style={{ color: "var(--ink-mute)" }}>Chưa có data.</div>
          ) : (
            <div className="flex items-end gap-1 h-40">
              {a.dailyList.map(([day, count]) => {
                const heightPct = (count / maxDaily) * 100;
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1 group relative" title={`${day}: ${count} pv`}>
                    <div className="text-[0.65rem] opacity-0 group-hover:opacity-100 transition" style={{ color: "#7da9ff" }}>{count}</div>
                    <div className="w-full rounded-t" style={{ height: `${heightPct}%`, background: "linear-gradient(180deg, #146ef5, #4ad6ff)", minHeight: count > 0 ? "4px" : "1px" }} />
                    <div className="text-[0.62rem] text-white/40 transform -rotate-45 origin-top-left whitespace-nowrap mt-1">
                      {day.slice(5)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Top pages + Devices + Countries + Referrers */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ListCard title={`Top 20 pages (${a.rangeLabel})`} rows={a.topPathsList} formatLabel={(p) => p} />
        <ListCard title="Devices" rows={a.deviceList} />
        <ListCard title={`Top countries`} rows={a.countryList} />
        <ListCard title="Top referrers" rows={a.referrerList} />
      </section>

      {/* External dashboards */}
      <section>
        <h2 className="text-[0.74rem] uppercase tracking-[0.16em] font-semibold mb-3" style={{ color: "var(--ink-mute)" }}>
          Dashboard ngoài
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <ExtLink
            title="Vercel Web Analytics"
            desc="Realtime pageview, top page, country, browser. Đã enable trong project."
            href="https://vercel.com/dashboard"
          />
          <ExtLink
            title="Vercel Speed Insights"
            desc="Core Web Vitals (LCP, FID, CLS) theo route. Auto-track qua @vercel/speed-insights."
            href="https://vercel.com/dashboard"
          />
          <ExtLink
            title="Google Analytics 4"
            desc="Acquisition, funnels, events. Cần set NEXT_PUBLIC_GA_ID env."
            href="https://analytics.google.com/"
          />
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="p-5 rounded-xl border" style={{ background: "linear-gradient(180deg, rgba(20,40,90,0.5), rgba(8,16,43,0.85))", borderColor: "rgba(255,255,255,0.10)" }}>
      <div className="text-[0.78rem] font-medium mb-2" style={{ color: "var(--ink-mute)" }}>{label}</div>
      <div className="text-[1.8rem] font-bold text-white leading-tight">{value}</div>
      <div className="text-[0.75rem] mt-1.5" style={{ color: "var(--ink-mute)" }}>{sub}</div>
    </div>
  );
}

function ListCard({ title, rows, formatLabel }: { title: string; rows: Array<[string, number]>; formatLabel?: (s: string) => string }) {
  const total = rows.reduce((s, [, n]) => s + n, 0) || 1;
  return (
    <div className="rounded-xl border" style={{ background: "rgba(8,16,43,0.55)", borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="px-5 py-3.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <h3 className="font-bold text-white text-[0.98rem]">{title}</h3>
      </div>
      {rows.length === 0 ? (
        <div className="px-5 py-8 text-center text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>Chưa có data.</div>
      ) : (
        <ul>
          {rows.map(([label, count], i) => {
            const pct = (count / total) * 100;
            return (
              <li key={i} className="px-5 py-2 border-b last:border-b-0 relative" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                <div className="absolute inset-0 left-0" style={{ width: `${pct}%`, background: "rgba(122,169,255,0.06)" }} />
                <div className="relative flex items-center justify-between gap-3 text-[0.82rem]">
                  <span className="text-white truncate" style={{ maxWidth: "70%" }}>{formatLabel ? formatLabel(label) : label}</span>
                  <span className="text-white/70 font-semibold whitespace-nowrap">{count}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function ExtLink({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener" className="block p-4 rounded-xl border transition hover:bg-white/5"
      style={{ background: "rgba(8,16,43,0.55)", borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="text-[0.95rem] font-bold text-white mb-1">{title} <span className="text-[0.72rem] opacity-50">↗</span></div>
      <div className="text-[0.78rem]" style={{ color: "var(--ink-mute)" }}>{desc}</div>
    </a>
  );
}
