import { ImageResponse } from "next/og";
import { getQuiz, getQuizArchetypes } from "@/lib/quiz/compute";

export const alt = "Quiz Result";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG({ params }: { params: { slug: string; type: string } }) {
  const { slug, type } = params;
  const quiz = getQuiz(slug);
  const archetype = getQuizArchetypes(slug).find((a) => a.id === type);
  if (!quiz || !archetype) {
    return new ImageResponse(<div>Not found</div>, size);
  }

  // Convert hex to rgba helper
  const accentColor = archetype.color;

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
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: "-15%", right: "-5%", width: "560px", height: "560px", borderRadius: "50%", background: `radial-gradient(circle, ${accentColor}55, transparent 65%)`, display: "flex" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: "550px", height: "550px", borderRadius: "50%", background: "radial-gradient(circle, rgba(122,61,255,0.40), transparent 65%)", display: "flex" }} />

        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "linear-gradient(135deg, #146ef5 0%, #4b5dff 50%, #7a3dff 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: 800 }}>K</div>
            <div style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em" }}>Kai .</div>
          </div>
          <div style={{
            display: "flex",
            padding: "10px 18px",
            borderRadius: "8px",
            background: `${accentColor}22`,
            border: `1px solid ${accentColor}66`,
            fontSize: "16px",
            fontWeight: 700,
            color: accentColor,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}>
            {quiz.name}
          </div>
        </div>

        {/* Middle - title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "26px", fontWeight: 600, color: "rgba(255,255,255,0.55)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Kết quả của tôi
          </div>
          <div style={{ fontSize: "78px", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.035em", color: "white", display: "flex" }}>
            {archetype.name}
          </div>
          <div style={{ fontSize: "26px", fontWeight: 600, color: accentColor, letterSpacing: "-0.005em" }}>
            {archetype.tagline}
          </div>
        </div>

        {/* Bottom - strengths + URL */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {archetype.strengths.slice(0, 3).map((s) => (
              <div key={s} style={{
                padding: "10px 18px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.18)",
                fontSize: "18px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.85)",
                display: "flex",
              }}>{s}</div>
            ))}
          </div>
          <div style={{ fontSize: "18px", color: "rgba(255,255,255,0.55)", display: "flex" }}>
            nguyenducquang.website/quiz/{slug}
          </div>
        </div>
      </div>
    ),
    size
  );
}
