import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Foundation Ecommerce — Khoá học TMĐT 2 buổi/tuần";
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
          background: "linear-gradient(135deg, #050a1f 0%, #0a1438 35%, #0d1c52 70%, #1a1f4a 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ position: "absolute", top: "-15%", right: "-5%", width: "560px", height: "560px", borderRadius: "50%", background: "radial-gradient(circle, rgba(74,214,255,0.4), transparent 65%)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: "550px", height: "550px", borderRadius: "50%", background: "radial-gradient(circle, rgba(122,61,255,0.45), transparent 65%)", display: "flex" }} />

        {/* Top */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #146ef5 0%, #4b5dff 50%, #7a3dff 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                fontWeight: 800,
              }}
            >
              K
            </div>
            <div style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em" }}>Kai .</div>
          </div>
          <div
            style={{
              display: "inline-flex",
              padding: "10px 18px",
              borderRadius: "8px",
              background: "rgba(74,214,255,0.15)",
              border: "1px solid rgba(74,214,255,0.4)",
              fontSize: "18px",
              fontWeight: 700,
              color: "#7ee2ff",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            ● Khoá 1 · Đang nhận application
          </div>
        </div>

        {/* Middle — title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "120px", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.04em", display: "flex", flexDirection: "column" }}>
            <span style={{ color: "white" }}>Foundation</span>
            <span style={{ background: "linear-gradient(120deg, #4ad6ff 0%, #146ef5 50%, #7a3dff 100%)", backgroundClip: "text", color: "transparent" }}>Ecommerce.</span>
          </div>
          <div style={{ fontSize: "30px", fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "-0.01em" }}>
            Tư duy thật, Thực chiến thật.
          </div>
        </div>

        {/* Bottom — pricing + format */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600 }}>Khoá 1 · giới hạn 7 học viên</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
              <div style={{ fontSize: "72px", fontWeight: 800, letterSpacing: "-0.03em", background: "linear-gradient(120deg, #4ad6ff 0%, #146ef5 50%, #7a3dff 100%)", backgroundClip: "text", color: "transparent" }}>
                999.000đ
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "32px" }}>
            {[
              { val: "12", label: "Buổi" },
              { val: "6", label: "Tuần" },
              { val: "Offline", label: "Hà Nội" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
                <div style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-0.02em", color: "white" }}>{s.val}</div>
                <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
