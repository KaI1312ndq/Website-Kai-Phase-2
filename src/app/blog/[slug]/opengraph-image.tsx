import { ImageResponse } from "next/og";
import { getPost } from "@/lib/queries";

export const runtime = "nodejs";
export const alt = "Blog · Nguyễn Đức Quảng";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CATEGORY_META: Record<string, { label: string; accent: string; gradient: string }> = {
  shopee: { label: "Shopee", accent: "#ee4d2d", gradient: "linear-gradient(135deg, rgba(238,77,45,0.40), transparent 65%)" },
  "tiktok-shop": { label: "TikTok Shop", accent: "#ff5a72", gradient: "linear-gradient(135deg, rgba(255,90,114,0.40), transparent 65%)" },
  marketing: { label: "Marketing", accent: "#7da9ff", gradient: "linear-gradient(135deg, rgba(125,169,255,0.40), transparent 65%)" },
  career: { label: "Career", accent: "#5fffaa", gradient: "linear-gradient(135deg, rgba(95,255,170,0.40), transparent 65%)" },
  mbti: { label: "MBTI", accent: "#a78bff", gradient: "linear-gradient(135deg, rgba(167,139,255,0.40), transparent 65%)" },
  default: { label: "Blog", accent: "#7da9ff", gradient: "linear-gradient(135deg, rgba(20,110,245,0.40), transparent 65%)" },
};

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let title = "Blog Marketing & Ecom";
  let category = "default";
  let excerpt = "";

  try {
    const post = await getPost(slug);
    if (post) {
      title = post.title || title;
      category = String(post.category || "default").toLowerCase();
      excerpt = post.excerpt || "";
    }
  } catch {}

  const meta = CATEGORY_META[category] || CATEGORY_META.default;
  const truncatedTitle = title.length > 90 ? title.slice(0, 87) + "..." : title;
  const truncatedExcerpt = excerpt.length > 140 ? excerpt.slice(0, 137) + "..." : excerpt;

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
        {/* Accent blobs */}
        <div style={{ position: "absolute", top: "-18%", right: "-8%", width: "560px", height: "560px", borderRadius: "50%", background: meta.gradient, display: "flex" }} />
        <div style={{ position: "absolute", bottom: "-22%", left: "-12%", width: "560px", height: "560px", borderRadius: "50%", background: "radial-gradient(circle, rgba(122,61,255,0.32), transparent 65%)", display: "flex" }} />

        {/* Top - Brand + Category */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "linear-gradient(135deg, #146ef5 0%, #4b5dff 50%, #7a3dff 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: 800 }}>K</div>
            <div style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em" }}>Kai .</div>
          </div>
          <div style={{ display: "flex", padding: "10px 18px", borderRadius: "8px", background: `${meta.accent}1f`, border: `1px solid ${meta.accent}66`, fontSize: "16px", fontWeight: 700, color: meta.accent, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            {meta.label}
          </div>
        </div>

        {/* Middle - Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", paddingTop: "20px" }}>
          <div
            style={{
              fontSize: title.length > 70 ? "52px" : title.length > 50 ? "62px" : "72px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "white",
              display: "flex",
            }}
          >
            {truncatedTitle}
          </div>
          {truncatedExcerpt && (
            <div style={{ fontSize: "22px", fontWeight: 500, color: "rgba(255,255,255,0.7)", letterSpacing: "-0.005em", lineHeight: 1.4, display: "flex" }}>
              {truncatedExcerpt}
            </div>
          )}
        </div>

        {/* Bottom URL strip */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "18px", color: "rgba(255,255,255,0.55)" }}>
          <div>nguyenducquang.website/blog</div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: meta.accent }} />
            <span>Đọc bài đầy đủ</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
