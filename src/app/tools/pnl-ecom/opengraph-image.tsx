import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Mẫu P&L Ecom — Báo cáo lãi lỗ gian hàng TikTok & Shopee";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "linear-gradient(135deg, #050a1f 0%, #0a1438 35%, #1a0d52 70%, #2a1f4a 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ position: "absolute", top: "-15%", right: "-5%", width: "560px", height: "560px", borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,255,0.35), transparent 65%)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: "550px", height: "550px", borderRadius: "50%", background: "radial-gradient(circle, rgba(74,214,255,0.40), transparent 65%)", display: "flex" }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "linear-gradient(135deg, #146ef5 0%, #4b5dff 50%, #7a3dff 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: 800 }}>K</div>
            <div style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em" }}>Kai .</div>
          </div>
          <div style={{ display: "flex", padding: "10px 18px", borderRadius: "8px", background: "rgba(167,139,255,0.14)", border: "1px solid rgba(167,139,255,0.4)", fontSize: "16px", fontWeight: 700, color: "#c9b3ff", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Tools · Miễn phí
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "28px", fontWeight: 600, color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Mẫu P&L Ecom 2026
          </div>
          <div style={{ fontSize: "82px", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.035em", display: "flex", flexDirection: "column" }}>
            <span style={{ color: "white" }}>Báo cáo lãi lỗ</span>
            <span style={{ background: "linear-gradient(120deg, #a78bff 0%, #4ad6ff 50%, #5fffaa 100%)", backgroundClip: "text", color: "transparent" }}>gian hàng TMĐT.</span>
          </div>
          <div style={{ fontSize: "26px", fontWeight: 500, color: "rgba(255,255,255,0.7)", letterSpacing: "-0.01em" }}>
            TikTok Shop · Shopee · 5 tầng · EBITDA · In PDF
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {["Net Revenue", "Gross Profit", "Contribution Margin", "Marketing Profit", "EBITDA"].map((t) => (
            <div key={t} style={{
              padding: "12px 22px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.18)",
              fontSize: "20px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.85)",
            }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
