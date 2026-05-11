import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

/**
 * Dynamic blog cover image generator — fallback khi post chưa có coverImage Sanity.
 *   GET /api/blog-cover?title=<title>&category=<slug>&w=1600&h=900
 *
 * Render: gradient hero + category badge + title adaptive font size.
 * Cached cứng 1h by Vercel CDN.
 */

export const runtime = "edge";

const CATEGORY_META: Record<string, { label: string; accent: string; gradient: string }> = {
  shopee: { label: "Shopee", accent: "#ee4d2d", gradient: "radial-gradient(circle, rgba(238,77,45,0.40), transparent 65%)" },
  "tiktok-shop": { label: "TikTok Shop", accent: "#ff5a72", gradient: "radial-gradient(circle, rgba(255,90,114,0.40), transparent 65%)" },
  marketing: { label: "Marketing", accent: "#7da9ff", gradient: "radial-gradient(circle, rgba(125,169,255,0.40), transparent 65%)" },
  ads: { label: "Ads", accent: "#7da9ff", gradient: "radial-gradient(circle, rgba(125,169,255,0.40), transparent 65%)" },
  ecommerce: { label: "Ecom", accent: "#5fffaa", gradient: "radial-gradient(circle, rgba(95,255,170,0.40), transparent 65%)" },
  career: { label: "Career", accent: "#5fffaa", gradient: "radial-gradient(circle, rgba(95,255,170,0.40), transparent 65%)" },
  mbti: { label: "MBTI", accent: "#a78bff", gradient: "radial-gradient(circle, rgba(167,139,255,0.40), transparent 65%)" },
  team: { label: "Team", accent: "#ffd479", gradient: "radial-gradient(circle, rgba(255,212,121,0.40), transparent 65%)" },
  default: { label: "Blog", accent: "#7da9ff", gradient: "radial-gradient(circle, rgba(20,110,245,0.40), transparent 65%)" },
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const title = (url.searchParams.get("title") || "Blog Marketing & Ecom").slice(0, 140);
  const category = (url.searchParams.get("category") || "default").toLowerCase();
  const w = Math.max(800, Math.min(2400, parseInt(url.searchParams.get("w") || "1600", 10)));
  const h = Math.max(450, Math.min(1350, parseInt(url.searchParams.get("h") || "900", 10)));

  const meta = CATEGORY_META[category] || CATEGORY_META.default;
  const truncated = title.length > 110 ? title.slice(0, 107) + "..." : title;
  const fontSize = title.length > 80 ? 56 : title.length > 60 ? 66 : title.length > 40 ? 76 : 88;

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
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: "-18%", right: "-8%", width: "640px", height: "640px", borderRadius: "50%", background: meta.gradient, display: "flex" }} />
        <div style={{ position: "absolute", bottom: "-22%", left: "-12%", width: "640px", height: "640px", borderRadius: "50%", background: "radial-gradient(circle, rgba(122,61,255,0.32), transparent 65%)", display: "flex" }} />
        <div style={{ position: "absolute", top: "30%", left: "60%", width: "200px", height: "200px", borderRadius: "50%", background: `${meta.accent}22`, filter: "blur(40px)", display: "flex" }} />

        {/* Top */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "13px", background: "linear-gradient(135deg, #146ef5 0%, #4b5dff 50%, #7a3dff 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", fontWeight: 800, boxShadow: "0 6px 20px rgba(20,110,245,0.45)" }}>K</div>
            <div style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.02em" }}>Kai .</div>
          </div>
          <div style={{ display: "inline-flex", padding: "12px 20px", borderRadius: "10px", background: `${meta.accent}1f`, border: `1px solid ${meta.accent}66`, fontSize: "18px", fontWeight: 700, color: meta.accent, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            {meta.label}
          </div>
        </div>

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", paddingTop: "30px" }}>
          <div
            style={{
              fontSize: `${fontSize}px`,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "white",
              display: "flex",
              maxWidth: "92%",
            }}
          >
            {truncated}
          </div>
        </div>

        {/* Bottom strip */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "20px", color: "rgba(255,255,255,0.55)" }}>
          <div>nguyenducquang.website/blog</div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: meta.accent }} />
            <span>Đọc đầy đủ</span>
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
    }
  );
}
