import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * Render preview PNG cho landing /tools/cv-builder.
 *   GET /api/cv-preview?template=ats|visual|hybrid
 *
 * Render 850x1100 (~A4 ratio) với sample data Quảng để show layout thật.
 * Cache 7 ngày.
 */

const SAMPLE = {
  name: "Nguyễn Đức Quảng",
  tagline: "Digital Marketing Manager · Performance · Team Building",
  contact: "qforwork13@gmail.com · 0868464658 · Hà Nội · linkedin.com/in/duc-quang-nguyen",
  summary: "Digital Marketing Manager 5+ năm tại UpBase. Quản lý team 12 người, ngân sách 10 tỷ/tháng, cover doanh thu 50-70 tỷ. Chuyên TikTok Shop + Shopee Mall + Meta Ads với 60+ project. ROAS trung bình team 6.2x.",
  experience: [
    {
      role: "Digital Marketing Manager",
      company: "UpBase Vietnam",
      date: "2025 - Hiện tại",
      bullets: [
        "Xây dựng team 10 nhân sự trong 5 tháng, quản lý 60+ project đa platform",
        "Cover doanh thu 50-70 tỷ/tháng, ngân sách team 10 tỷ/tháng, ROAS 6.2x",
        "Mở rộng kênh sang Philippines từ con số 0, đạt 5 tỷ GMV/tháng sau 6 tháng",
      ],
    },
    {
      role: "Ecommerce Executive",
      company: "UpBase Vietnam",
      date: "T1/2024 - 2025",
      bullets: [
        "Triển khai TikTok Ads cho 18 gian hàng, GMV ~7 tỷ/tháng",
        "Lên plan IMC cho 3 thương hiệu - ngân sách ~500M/campaign, ROI 6x",
      ],
    },
  ],
  education: { school: "ĐH FPT Greenwich", degree: "Cử nhân BTEC", date: "2019-2023" },
  skills: ["TikTok Ads", "Shopee Mall", "Meta Ads", "Google Ads", "P&L gian hàng", "Team Building", "Excel/Sheets", "Looker Studio"],
};

const TEMPLATES = {
  ats: {
    accent: "#1f2937",
    muted: "#4b5563",
    divider: "#e5e7eb",
    badge: "#f3f4f6",
    headerStyle: "plain" as const,
  },
  visual: {
    accent: "#1d4ed8",
    muted: "#475569",
    divider: "#dbeafe",
    badge: "#dbeafe",
    headerStyle: "gradient" as const,
  },
  hybrid: {
    accent: "#0f172a",
    muted: "#475569",
    divider: "#cbd5e1",
    badge: "#e2e8f0",
    headerStyle: "underline" as const,
  },
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const t = (url.searchParams.get("template") || "ats") as keyof typeof TEMPLATES;
  const cfg = TEMPLATES[t] || TEMPLATES.ats;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          color: "#111827",
          display: "flex",
          flexDirection: "column",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* HEADER */}
        {cfg.headerStyle === "gradient" ? (
          <div style={{ background: `linear-gradient(135deg, ${cfg.accent} 0%, #2563eb 100%)`, padding: "32px 40px 28px", color: "#ffffff", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "6px" }}>{SAMPLE.name}</div>
            <div style={{ fontSize: "15px", opacity: 0.92, marginBottom: "10px" }}>{SAMPLE.tagline}</div>
            <div style={{ fontSize: "11px", opacity: 0.78 }}>{SAMPLE.contact}</div>
          </div>
        ) : (
          <div style={{ padding: "32px 40px 18px", display: "flex", flexDirection: "column", borderBottom: cfg.headerStyle === "underline" ? `2px solid ${cfg.accent}` : "none" }}>
            <div style={{ fontSize: "30px", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "4px", color: cfg.accent }}>{SAMPLE.name}</div>
            <div style={{ fontSize: "14px", color: cfg.muted, marginBottom: "8px", fontWeight: 500 }}>{SAMPLE.tagline}</div>
            <div style={{ fontSize: "10px", color: "#6b7280" }}>{SAMPLE.contact}</div>
          </div>
        )}

        {/* BODY */}
        <div style={{ padding: "20px 40px", flex: 1, display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* SUMMARY */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: cfg.accent, letterSpacing: "1.6px", marginBottom: "4px", textTransform: "uppercase" }}>SUMMARY</div>
            <div style={{ fontSize: "11px", lineHeight: 1.55, color: "#1f2937" }}>{SAMPLE.summary}</div>
          </div>

          {/* EXPERIENCE */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: cfg.accent, letterSpacing: "1.6px", marginBottom: "8px", textTransform: "uppercase" }}>KINH NGHIỆM</div>
            {SAMPLE.experience.map((e, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", marginBottom: i === SAMPLE.experience.length - 1 ? 0 : "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>{e.role}</div>
                  <div style={{ fontSize: "10px", color: "#6b7280" }}>{e.date}</div>
                </div>
                <div style={{ fontSize: "11px", color: cfg.accent, marginBottom: "4px", fontWeight: 600 }}>{e.company}</div>
                {e.bullets.map((b, j) => (
                  <div key={j} style={{ display: "flex", gap: "8px", marginBottom: "2px" }}>
                    <span style={{ fontSize: "10px", color: cfg.accent }}>•</span>
                    <span style={{ fontSize: "10.5px", lineHeight: 1.5, flex: 1 }}>{b}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* EDUCATION + SKILLS row */}
          <div style={{ display: "flex", gap: "32px" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: cfg.accent, letterSpacing: "1.6px", marginBottom: "4px", textTransform: "uppercase" }}>HỌC VẤN</div>
              <div style={{ fontSize: "12px", fontWeight: 600 }}>{SAMPLE.education.degree}</div>
              <div style={{ fontSize: "11px", color: cfg.accent, fontWeight: 500 }}>{SAMPLE.education.school}</div>
              <div style={{ fontSize: "10px", color: "#6b7280", marginTop: "2px" }}>{SAMPLE.education.date}</div>
            </div>
            <div style={{ flex: 1.4, display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: cfg.accent, letterSpacing: "1.6px", marginBottom: "6px", textTransform: "uppercase" }}>KỸ NĂNG</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {SAMPLE.skills.map((s) => (
                  <span key={s} style={{ fontSize: "9.5px", padding: "3px 8px", backgroundColor: cfg.badge, color: cfg.accent, borderRadius: "4px", fontWeight: 600 }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 850,
      height: 1100,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=604800, stale-while-revalidate=604800",
      },
    },
  );
}
