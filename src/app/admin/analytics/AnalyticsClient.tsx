"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

/* ─── SVG icons (no emoji) ────────────────────────────────────────── */
const Ic = ({ d, size = 16 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    {d.split("|").map((p, i) => <path key={i} d={p} />)}
  </svg>
);
const IcEye = (p: { size?: number }) => <Ic size={p.size} d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />;
const IcUsers = (p: { size?: number }) => <Ic size={p.size} d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2|M9 7a4 4 0 0 1 0 8 4 4 0 0 1 0-8|M22 21v-2a4 4 0 0 0-3-3.87|M16 3.13a4 4 0 0 1 0 7.75" />;
const IcPhone = (p: { size?: number }) => <Ic size={p.size} d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2|M12 18h.01" />;
const IcGlobe = (p: { size?: number }) => <Ic size={p.size} d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20|M2 12h20|M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10|M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10" />;
const IcArrowLeft = (p: { size?: number }) => <Ic size={p.size} d="M19 12H5|M12 19l-7-7 7-7" />;
const IcExternal = (p: { size?: number }) => <Ic size={p.size} d="M15 3h6v6|M10 14 21 3|M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />;
const IcRefresh = (p: { size?: number }) => <Ic size={p.size} d="M3 12a9 9 0 0 1 15-6.7L21 8|M21 3v5h-5|M21 12a9 9 0 0 1-15 6.7L3 16|M3 21v-5h5" />;

/* ─── Types ──────────────────────────────────────────────────────── */
type Range = 7 | 30 | 90;
type Data = {
  range: number;
  summary: { totalViews: number; uniqueVisitors: number; mobilePercent: number; topCountry: string };
  daily: { date: string; views: number }[];
  topPaths: { path: string; views: number }[];
  topReferrers: { source: string; views: number }[];
  deviceBreakdown: { mobile: number; desktop: number };
  countryBreakdown: { country: string; views: number }[];
};

/* ─── Login ──────────────────────────────────────────────────────── */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState(""); const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setErr("");
    try {
      const r = await fetch("/api/admin/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
      if (!r.ok) throw new Error("Wrong password");
      onLogin();
    } catch { setErr("Sai mật khẩu"); }
    finally { setLoading(false); }
  }
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#08080f" }}>
      <form onSubmit={submit} style={{ width: 360, padding: "40px 36px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Analytics</div>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)} autoFocus placeholder="Admin password"
          style={{ padding: "12px 14px", borderRadius: 10, border: `1px solid ${err ? "#ff6b6b" : "rgba(255,255,255,0.12)"}`, background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 15, outline: "none" }} />
        {err && <div style={{ color: "#ff6b6b", fontSize: 13 }}>{err}</div>}
        <button type="submit" disabled={loading} style={{ padding: "12px 0", borderRadius: 10, background: "#146ef5", color: "#fff", fontWeight: 600, fontSize: 15, border: "none", cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
          {loading ? "..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}

/* ─── Stat card ──────────────────────────────────────────────────── */
function StatCard({ Icon, label, value, color, sub }: { Icon: any; label: string; value: string | number; color: string; sub?: string }) {
  return (
    <div style={{ padding: 18, borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: `${color}18`, color, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={16} />
        </div>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{label}</span>
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

/* ─── Bar chart ──────────────────────────────────────────────────── */
function BarChart({ data }: { data: { date: string; views: number }[] }) {
  const max = Math.max(...data.map(d => d.views), 1);
  const barWidth = 100 / data.length;
  return (
    <div style={{ width: "100%", height: 220, position: "relative" }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${data.length * 10} 100`} preserveAspectRatio="none" style={{ overflow: "visible" }}>
        {data.map((d, i) => {
          const h = (d.views / max) * 95;
          return (
            <g key={d.date}>
              <rect
                x={i * 10 + 1} y={100 - h}
                width={8} height={h}
                fill="url(#barGradient)"
                rx={1}
              >
                <title>{d.date}: {d.views.toLocaleString()} views</title>
              </rect>
            </g>
          );
        })}
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a3dff" />
            <stop offset="100%" stopColor="#146ef5" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
        <span>{data[0]?.date?.slice(5)}</span>
        <span>{data[Math.floor(data.length / 2)]?.date?.slice(5)}</span>
        <span>{data[data.length - 1]?.date?.slice(5)}</span>
      </div>
    </div>
  );
}

/* ─── Horizontal bar list ────────────────────────────────────────── */
function HBarList({ items, accent, maxLabelLen = 60 }: { items: { label: string; value: number; href?: string }[]; accent: string; maxLabelLen?: number }) {
  if (items.length === 0) return <div style={{ padding: 20, textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: 13 }}>Chưa có data</div>;
  const max = Math.max(...items.map(i => i.value), 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, idx) => {
        const pct = (item.value / max) * 100;
        const truncated = item.label.length > maxLabelLen ? item.label.slice(0, maxLabelLen) + "…" : item.label;
        return (
          <div key={idx} style={{ position: "relative", padding: "8px 12px", borderRadius: 8, background: "rgba(255,255,255,0.03)" }}>
            <div style={{ position: "absolute", inset: 0, background: `${accent}10`, width: `${pct}%`, borderRadius: 8, transition: "width 0.4s" }} />
            <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.85)", fontSize: 12.5, textDecoration: "none", display: "flex", alignItems: "center", gap: 4, minWidth: 0, flex: 1 }}>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{truncated}</span>
                  <IcExternal size={9} />
                </a>
              ) : (
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{truncated}</span>
              )}
              <span style={{ fontVariantNumeric: "tabular-nums", color: accent, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{item.value.toLocaleString()}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */
export default function AnalyticsClient({ authed }: { authed: boolean }) {
  const [isAuthed, setIsAuthed] = useState(authed);
  const [range, setRange] = useState<Range>(30);
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const r = await fetch(`/api/admin/analytics?range=${range}`);
      if (!r.ok) throw new Error(await r.text());
      setData(await r.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  useEffect(() => { if (isAuthed) load(); }, [isAuthed, range]);

  if (!isAuthed) return <LoginScreen onLogin={() => setIsAuthed(true)} />;

  const SITE = typeof window !== "undefined" ? window.location.origin : "https://www.nguyenducquang.website";

  return (
    <div style={{ minHeight: "100vh", background: "#08080f", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.4)", position: "sticky", top: 0, zIndex: 10, backdropFilter: "blur(12px)", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Link href="/admin/posts" style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 8, background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", fontSize: 12.5, textDecoration: "none" }}>
            <IcArrowLeft size={13} /> Quay lại
          </Link>
          <div style={{ fontSize: 17, fontWeight: 800 }}>Analytics</div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {([7, 30, 90] as Range[]).map(r => (
            <button key={r} onClick={() => setRange(r)}
              style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
                background: range === r ? "rgba(20,110,245,0.2)" : "rgba(255,255,255,0.04)",
                color: range === r ? "#7da9ff" : "rgba(255,255,255,0.6)",
                border: `1px solid ${range === r ? "#146ef5" : "rgba(255,255,255,0.08)"}`,
              }}>{r} ngày</button>
          ))}
          <button onClick={load} title="Reload" style={{ padding: 7, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", cursor: "pointer", display: "flex", marginLeft: 4 }}>
            <IcRefresh size={13} />
          </button>
        </div>
      </div>

      <div style={{ padding: "24px", maxWidth: 1400, margin: "0 auto" }}>
        {loading && !data && (
          <div style={{ padding: 60, textAlign: "center", color: "rgba(255,255,255,0.4)" }}>Đang tải dữ liệu...</div>
        )}

        {data && (
          <>
            {/* Summary cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 24 }}>
              <StatCard Icon={IcEye} label={`Pageviews (${range} ngày)`} value={data.summary.totalViews.toLocaleString()} color="#5fffaa" />
              <StatCard Icon={IcUsers} label="Unique visitors" value={data.summary.uniqueVisitors.toLocaleString()} color="#7da9ff"
                sub={data.summary.uniqueVisitors > 0 ? `${(data.summary.totalViews / data.summary.uniqueVisitors).toFixed(1)} views/visitor` : ""} />
              <StatCard Icon={IcPhone} label="Mobile" value={`${data.summary.mobilePercent}%`} color="#ff7ad9"
                sub={`${data.deviceBreakdown.mobile.toLocaleString()} mobile · ${data.deviceBreakdown.desktop.toLocaleString()} desktop`} />
              <StatCard Icon={IcGlobe} label="Top country" value={data.summary.topCountry} color="#ffd700" />
            </div>

            {/* Daily traffic */}
            <div style={{ padding: 20, borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.45)", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Pageviews theo ngày
              </div>
              <BarChart data={data.daily} />
            </div>

            {/* 2-column: Top posts + Top referrers */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16, gridAutoFlow: "row" }} className="grid-2col">
              <div style={{ padding: 20, borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.45)", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Top trang ({data.topPaths.length})
                </div>
                <HBarList accent="#5fffaa" items={data.topPaths.slice(0, 10).map(p => ({ label: p.path, value: p.views, href: SITE + p.path }))} />
              </div>
              <div style={{ padding: 20, borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.45)", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Nguồn traffic ({data.topReferrers.length})
                </div>
                <HBarList accent="#7da9ff" items={data.topReferrers.map(r => ({ label: r.source, value: r.views }))} maxLabelLen={40} />
              </div>
            </div>

            {/* Country breakdown */}
            {data.countryBreakdown.length > 0 && (
              <div style={{ padding: 20, borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.45)", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Phân bố quốc gia
                </div>
                <HBarList accent="#ffd700" items={data.countryBreakdown.map(c => ({ label: c.country, value: c.views }))} maxLabelLen={30} />
              </div>
            )}

            <div style={{ marginTop: 20, padding: "12px 16px", borderRadius: 10, background: "rgba(20,110,245,0.06)", border: "1px solid rgba(20,110,245,0.2)", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
              💡 Data tracking từ Supabase pageviews table. Admin paths + /studio + /api KHÔNG được tính.
              Max 50.000 rows/query - nếu traffic vượt mức cần aggregate Database function.
            </div>
          </>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .grid-2col { grid-template-columns: 1fr !important; }
        }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
      `}</style>
    </div>
  );
}
