import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getGA4Summary } from "@/lib/ga4";

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
  const days = RANGES[rangeKey].days;
  const [a, ga4] = await Promise.all([getAnalytics(rangeKey), getGA4Summary(days)]);
  const maxDaily = Math.max(1, ...a.dailyList.map(([, n]) => n));
  const ga4MaxDaily = Math.max(1, ...ga4.daily.map((d) => d.pageviews));

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
                  background: active ? "var(--grad-primary)" : "var(--st-06)",
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
        <div className="rounded-xl border p-5" style={{ background: "var(--db-55)", borderColor: "var(--st-08)" }}>
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

      {/* ─── GA4 SECTION ─── */}
      <section className="pt-6 border-t" style={{ borderColor: "var(--st-08)" }}>
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <div>
            <h2 className="text-[1.15rem] font-bold text-white">Google Analytics 4</h2>
            <p className="text-[0.78rem]" style={{ color: "var(--ink-mute)" }}>
              Data từ GA4 Data API. {ga4.enabled ? `Range: ${a.rangeLabel}` : "Chưa config (xem hướng dẫn cuối trang)"}
            </p>
          </div>
          {!ga4.enabled && <span className="px-2 py-1 rounded text-[0.72rem] font-semibold" style={{ background: "rgba(255,212,121,0.13)", color: "#ffd479" }}>Chưa setup</span>}
        </div>

        {ga4.enabled && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
              <Metric label="Pageviews" value={ga4.pageviews.toLocaleString("vi-VN")} sub={a.rangeLabel} />
              <Metric label="Users" value={ga4.totalUsers.toLocaleString("vi-VN")} sub={`${ga4.newUsers.toLocaleString("vi-VN")} new`} />
              <Metric label="Sessions" value={ga4.sessions.toLocaleString("vi-VN")} sub={a.rangeLabel} />
              <Metric label="Avg. session" value={`${Math.round(ga4.avgSessionDuration)}s`} sub="Thời lượng" />
              <Metric label="Bounce rate" value={`${(ga4.bounceRate * 100).toFixed(1)}%`} sub="Thoát ngay" />
              <Metric label="Pages / session" value={ga4.sessions > 0 ? (ga4.pageviews / ga4.sessions).toFixed(1) : "0"} sub="Sâu vào site" />
            </div>

            <div className="rounded-xl border p-5 mb-5" style={{ background: "var(--db-55)", borderColor: "var(--st-08)" }}>
              <div className="text-[0.78rem] uppercase tracking-wider font-semibold mb-3" style={{ color: "var(--ink-mute)" }}>Daily (GA4)</div>
              {ga4.daily.length === 0 ? (
                <div className="py-6 text-center text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>Chưa có data GA4.</div>
              ) : (
                <div className="flex items-end gap-1 h-40">
                  {ga4.daily.map((d) => {
                    const pct = (d.pageviews / ga4MaxDaily) * 100;
                    const formatted = `${d.date.slice(0, 4)}-${d.date.slice(4, 6)}-${d.date.slice(6, 8)}`;
                    return (
                      <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group" title={`${formatted}: ${d.pageviews} pv, ${d.users} users`}>
                        <div className="text-[0.65rem] opacity-0 group-hover:opacity-100 transition" style={{ color: "#ffd479" }}>{d.pageviews}</div>
                        <div className="w-full rounded-t" style={{ height: `${pct}%`, background: "linear-gradient(180deg, #ff8a3d, #ffd479)", minHeight: d.pageviews > 0 ? "4px" : "1px" }} />
                        <div className="text-[0.6rem] text-white/40 mt-1">{d.date.slice(4, 6)}-{d.date.slice(6, 8)}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ListCard title="GA4 · Top pages" rows={ga4.topPages.map((p) => [p.path, p.views])} />
              <ListCard title="GA4 · Top countries" rows={ga4.topCountries.map((p) => [p.country, p.users])} />
              <ListCard title="GA4 · Top sources" rows={ga4.topReferrers.map((p) => [p.source, p.sessions])} />
              <ListCard title="GA4 · Devices" rows={ga4.topDevices.map((p) => [p.device, p.users])} />
            </div>
          </>
        )}

        {!ga4.enabled && (
          <div className="rounded-xl border p-5 text-[0.85rem] space-y-2.5" style={{ background: "var(--db-50)", borderColor: "var(--st-08)", color: "var(--st-85)" }}>
            <div className="font-semibold text-white">Setup GA4 Data API (1 lần, ~10 phút)</div>
            <ol className="list-decimal list-inside space-y-1.5" style={{ color: "var(--ink-mute)" }}>
              <li>Vào <a href="https://console.cloud.google.com/" target="_blank" rel="noopener" className="underline" style={{ color: "#7da9ff" }}>Google Cloud Console</a> -&gt; tạo project mới hoặc dùng project có sẵn</li>
              <li>Enable <strong className="text-white">Google Analytics Data API</strong></li>
              <li>Tạo Service Account: IAM &amp; Admin -&gt; Service Accounts -&gt; Create</li>
              <li>Tạo JSON key cho service account -&gt; download file</li>
              <li>Vào GA4 Property -&gt; Admin -&gt; Property Access Management -&gt; Add user = email service account, role <strong className="text-white">Viewer</strong></li>
              <li>Lấy <strong className="text-white">Property ID</strong> (numeric, vd 350123456) ở Admin -&gt; Property Settings</li>
              <li>Add 2 env vars trong Vercel (Production):
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li><code className="font-mono text-[0.78rem]" style={{ color: "#7da9ff" }}>GA4_PROPERTY_ID</code> = numeric ID</li>
                  <li><code className="font-mono text-[0.78rem]" style={{ color: "#7da9ff" }}>GA4_SERVICE_ACCOUNT</code> = paste toàn bộ nội dung JSON file (1 dòng)</li>
                </ul>
              </li>
              <li>Redeploy Vercel</li>
            </ol>
          </div>
        )}
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
    <div className="p-5 rounded-xl border" style={{ background: "linear-gradient(180deg, var(--dg-50), var(--db-85))", borderColor: "var(--st-10)" }}>
      <div className="text-[0.78rem] font-medium mb-2" style={{ color: "var(--ink-mute)" }}>{label}</div>
      <div className="text-[1.8rem] font-bold text-white leading-tight">{value}</div>
      <div className="text-[0.75rem] mt-1.5" style={{ color: "var(--ink-mute)" }}>{sub}</div>
    </div>
  );
}

function ListCard({ title, rows: inputRows, formatLabel }: { title: string; rows: Array<[string, number]> | Array<[string, number | string]>; formatLabel?: (s: string) => string }) {
  const rows: Array<[string, number]> = (inputRows as Array<[string, number | string]>).map(([k, v]) => [k, Number(v) || 0]);
  const total = rows.reduce((s, [, n]) => s + n, 0) || 1;
  return (
    <div className="rounded-xl border" style={{ background: "var(--db-55)", borderColor: "var(--st-08)" }}>
      <div className="px-5 py-3.5 border-b" style={{ borderColor: "var(--st-06)" }}>
        <h3 className="font-bold text-white text-[0.98rem]">{title}</h3>
      </div>
      {rows.length === 0 ? (
        <div className="px-5 py-8 text-center text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>Chưa có data.</div>
      ) : (
        <ul>
          {rows.map(([label, count], i) => {
            const pct = (count / total) * 100;
            return (
              <li key={i} className="px-5 py-2 border-b last:border-b-0 relative" style={{ borderColor: "var(--st-04)" }}>
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
      style={{ background: "var(--db-55)", borderColor: "var(--st-08)" }}>
      <div className="text-[0.95rem] font-bold text-white mb-1">{title} <span className="text-[0.72rem] opacity-50">↗</span></div>
      <div className="text-[0.78rem]" style={{ color: "var(--ink-mute)" }}>{desc}</div>
    </a>
  );
}
