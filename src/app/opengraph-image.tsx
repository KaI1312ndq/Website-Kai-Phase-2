import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Nguyễn Đức Quảng — Ecom Growth Expert";
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
          padding: "80px",
          background: "linear-gradient(135deg, #050a1f 0%, #0a1438 35%, #0d1c52 70%, #1a1f4a 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Decorative orbs */}
        <div style={{ position: "absolute", top: "-15%", left: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(20,110,245,0.45), transparent 65%)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "550px", height: "550px", borderRadius: "50%", background: "radial-gradient(circle, rgba(122,61,255,0.45), transparent 65%)", display: "flex" }} />

        {/* Top — brand mark + role pill */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #146ef5 0%, #4b5dff 50%, #7a3dff 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              fontWeight: 800,
              boxShadow: "0 8px 24px rgba(20,110,245,0.45)",
            }}
          >
            K
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "26px", fontWeight: 700, letterSpacing: "-0.02em" }}>Kai .</div>
            <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600 }}>nguyenducquang.website</div>
          </div>
        </div>

        {/* Center — headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "10px 18px",
              borderRadius: "8px",
              background: "rgba(20,110,245,0.18)",
              border: "1px solid rgba(20,110,245,0.4)",
              fontSize: "20px",
              fontWeight: 600,
              color: "#9bb6ff",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Marketer · Leader · Mentor
          </div>
          <div style={{ fontSize: "92px", fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.035em", color: "white", display: "flex", flexDirection: "column" }}>
            <span>Build teams. Scale brands.</span>
            <span style={{ display: "flex", gap: "20px" }}>
              <span style={{ background: "linear-gradient(120deg, #4ad6ff 0%, #146ef5 50%, #7a3dff 100%)", backgroundClip: "text", color: "transparent" }}>Grow</span>
              <span>smarter.</span>
            </span>
          </div>
        </div>

        {/* Bottom — stats */}
        <div style={{ display: "flex", gap: "56px", alignItems: "flex-end", justifyContent: "space-between" }}>
          {[
            { val: "5+", label: "Năm thực chiến" },
            { val: "60+", label: "Dự án Ecom" },
            { val: "10B+", label: "Ngân sách / tháng" },
            { val: "20+", label: "Mentees" },
          ].map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ fontSize: "44px", fontWeight: 800, letterSpacing: "-0.02em", background: "linear-gradient(120deg, #4ad6ff 0%, #146ef5 50%, #7a3dff 100%)", backgroundClip: "text", color: "transparent" }}>{s.val}</div>
              <div style={{ fontSize: "18px", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
