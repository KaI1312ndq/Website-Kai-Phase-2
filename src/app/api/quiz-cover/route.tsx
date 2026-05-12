import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getQuiz, getQuizArchetypes } from "@/lib/quiz/compute";

export const runtime = "edge";

/**
 * Dynamic OG image cho kết quả quiz.
 *   GET /api/quiz-cover?quiz=mbti&type=ENTP[&name=Quang]
 *
 * Render PNG 1200x630 với:
 *   - Gradient bg theo quiz color
 *   - Badge archetype.id (vd "ENTP")
 *   - Archetype name + tagline
 *   - Kai branding + CTA "Test miễn phí"
 *
 * Cache 1 ngày để Facebook/Zalo scrape không hammer.
 */

function hexAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const quizSlug = url.searchParams.get("quiz") || "";
  const typeId = url.searchParams.get("type") || "";
  const userName = url.searchParams.get("name")?.slice(0, 30) || "";
  const w = parseInt(url.searchParams.get("w") || "1200", 10);
  const h = parseInt(url.searchParams.get("h") || "630", 10);

  const quiz = getQuiz(quizSlug);
  const archetype = getQuizArchetypes(quizSlug).find((a) => a.id === typeId);

  // Fallback nếu không match
  const accent = quiz?.color || "#146ef5";
  const quizName = quiz?.name?.replace(/^Test\s+/i, "") || "Quiz";
  const archetypeName = archetype?.name || typeId || "Kết quả";
  const archetypeId = archetype?.id || typeId || "?";
  const tagline = archetype?.tagline?.slice(0, 110) || quiz?.shortDescription?.slice(0, 110) || "Khám phá bản thân qua bài test miễn phí";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: `linear-gradient(135deg, #050a1f 0%, #08102b 50%, ${hexAlpha(accent, 0.35)} 100%)`,
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          padding: "60px 70px",
          position: "relative",
        }}
      >
        {/* Decorative orb */}
        <div style={{ position: "absolute", top: "-160px", right: "-180px", width: "560px", height: "560px", borderRadius: "50%", background: `radial-gradient(circle, ${hexAlpha(accent, 0.45)}, transparent 70%)`, display: "flex" }} />
        <div style={{ position: "absolute", bottom: "-200px", left: "-160px", width: "480px", height: "480px", borderRadius: "50%", background: `radial-gradient(circle, ${hexAlpha("#7a3dff", 0.30)}, transparent 70%)`, display: "flex" }} />

        {/* Top - branding + quiz name */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "linear-gradient(135deg, #4ad6ff, #146ef5, #7a3dff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", fontWeight: 800, boxShadow: "0 6px 18px rgba(20,110,245,0.45)" }}>K</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.01em" }}>Kai .</div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em" }}>nguyenducquang.website</div>
            </div>
          </div>
          <div style={{ display: "flex", padding: "10px 20px", borderRadius: "999px", background: hexAlpha(accent, 0.18), border: `1px solid ${hexAlpha(accent, 0.55)}`, fontSize: "16px", fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {quizName}
          </div>
        </div>

        {/* Middle - archetype display */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", zIndex: 2, marginTop: "20px" }}>
          {userName ? (
            <div style={{ fontSize: "26px", color: "rgba(255,255,255,0.72)", fontWeight: 600, marginBottom: "12px", display: "flex" }}>
              {userName} là
            </div>
          ) : (
            <div style={{ fontSize: "22px", color: "rgba(255,255,255,0.55)", fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: "16px", display: "flex" }}>
              Kết quả của bạn
            </div>
          )}
          <div style={{ display: "flex", alignItems: "baseline", gap: "26px", marginBottom: "18px" }}>
            <div
              style={{
                fontSize: "150px",
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                background: `linear-gradient(135deg, ${accent} 0%, #ffffff 100%)`,
                backgroundClip: "text",
                color: "transparent",
                display: "flex",
              }}
            >
              {archetypeId.slice(0, 6)}
            </div>
            <div style={{ fontSize: "44px", fontWeight: 700, color: "#ffffff", lineHeight: 1.05, display: "flex", maxWidth: "560px" }}>
              {archetypeName}
            </div>
          </div>
          <div style={{ fontSize: "22px", color: "rgba(255,255,255,0.78)", lineHeight: 1.4, maxWidth: "880px", display: "flex" }}>
            {tagline}
          </div>
        </div>

        {/* Bottom - CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 2, marginTop: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "20px", color: "rgba(255,255,255,0.65)" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: accent }} />
            <span>Test miễn phí · Kết quả ngay</span>
          </div>
          <div style={{ display: "flex", padding: "14px 28px", borderRadius: "12px", background: "linear-gradient(135deg, #146ef5, #4b5dff, #7a3dff)", color: "#ffffff", fontSize: "20px", fontWeight: 700, boxShadow: "0 8px 24px rgba(20,110,245,0.45)" }}>
            Khám phá tính cách →
          </div>
        </div>
      </div>
    ),
    {
      width: w,
      height: h,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
