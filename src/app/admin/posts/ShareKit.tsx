"use client";

import { useState, useMemo } from "react";
import type { Post } from "./PostsClient";
import { IcX, IcCheck, IcExternal } from "./Icons";

/**
 * Share Kit modal - one-stop để distribute 1 blog post.
 *
 * Features:
 * - OG preview (FB / LinkedIn style)
 * - 4 caption templates (LinkedIn long, FB punchy, Zalo casual, Twitter/X short)
 * - 1-click copy each caption (with URL appended)
 * - Direct share buttons mở popup share platforms
 * - URL + hashtag suggestions
 */

const SITE = "https://www.nguyenducquang.website";

function buildHashtags(post: Post): string {
  const cat = post.category || "";
  const tagSet = new Set<string>();

  // Auto from category
  const catTags: Record<string, string[]> = {
    "unit-economics": ["UnitEconomics", "ECom", "PL"],
    performance: ["PerformanceMarketing", "ROAS", "Ads"],
    tiktok: ["TikTokShop", "ECom", "LiveCommerce"],
    shopee: ["Shopee", "ECom", "ShopeeMall"],
    ecom: ["ECommerce", "OnlineSeller", "ECom"],
    career: ["Career", "Marketing", "Sales"],
    psychology: ["MBTI", "PersonalGrowth", "Mindset"],
    "thue-cong-cu": ["Thue", "TNCN", "TaiChinh"],
    "tmdt-co-ban": ["TMDT", "OnlineBusiness", "Ecommerce"],
  };
  (catTags[cat] || ["ECommerce"]).forEach(t => tagSet.add(t));

  // From post tags
  (post.tags || []).slice(0, 3).forEach(t => {
    const cleaned = t.replace(/[^a-zA-ZÀ-ỹ0-9]/g, "");
    if (cleaned.length > 2) tagSet.add(cleaned[0].toUpperCase() + cleaned.slice(1));
  });

  return Array.from(tagSet).slice(0, 6).map(t => `#${t}`).join(" ");
}

type Caption = { key: string; label: string; emoji?: string; color: string; text: string; shareUrl: string };

function buildCaptions(post: Post): Caption[] {
  const url = `${SITE}/blog/${post.slug.current}`;
  const encUrl = encodeURIComponent(url);
  const title = post.title;
  const excerpt = (post.excerpt || "").trim();
  const tags = buildHashtags(post);

  // LinkedIn - long form, professional
  const linkedinText = `${title}

${excerpt}

Đây là 1 trong những vấn đề mình thấy nhiều seller / marketer hay gặp - viết chi tiết trong bài này:
👉 ${url}

${tags}`;

  // Facebook - punchy hook + intrigue
  const facebookText = `${title}

${excerpt}

Đọc full bài 👇
${url}`;

  // Zalo OA - personal, conversational
  const zaloText = `${title}

${excerpt}

Mình vừa viết chi tiết về vấn đề này. Đọc tại đây nha: ${url}`;

  // X / Twitter - very short
  const twitterText = `${title}

${excerpt.slice(0, 100)}${excerpt.length > 100 ? "..." : ""}

${url}`;

  return [
    {
      key: "linkedin",
      label: "LinkedIn",
      color: "#0a66c2",
      text: linkedinText,
      shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`,
    },
    {
      key: "facebook",
      label: "Facebook",
      color: "#1877f2",
      text: facebookText,
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encUrl}`,
    },
    {
      key: "zalo",
      label: "Zalo / Tin nhắn",
      color: "#0068ff",
      text: zaloText,
      shareUrl: `https://zalo.me/share/?url=${encUrl}&title=${encodeURIComponent(title)}`,
    },
    {
      key: "twitter",
      label: "X / Twitter",
      color: "#000000",
      text: twitterText,
      shareUrl: `https://twitter.com/intent/tweet?url=${encUrl}&text=${encodeURIComponent(title)}`,
    },
  ];
}

export default function ShareKit({ post, onClose }: { post: Post; onClose: () => void }) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const captions = useMemo(() => buildCaptions(post), [post]);
  const url = `${SITE}/blog/${post.slug.current}`;

  async function copy(key: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {}
  }

  return (
    <div onClick={onClose} className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto p-4"
      style={{ background: "rgba(0,0,0,0.7)" }}>
      <div onClick={e => e.stopPropagation()}
        className="w-full max-w-3xl rounded-2xl my-8"
        style={{ background: "#0c0c14", border: "1px solid rgba(255,255,255,0.1)" }}>

        {/* Header */}
        <div className="flex items-center justify-between p-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <div className="text-[1.05rem] font-bold text-white">📤 Share Kit</div>
            <div className="text-[0.78rem] mt-0.5" style={{ color: "var(--st-50)" }}>Copy caption sẵn cho từng nền tảng - share blog nhanh</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}>
            <IcX size={14} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* OG Preview */}
          <div>
            <div className="text-[0.7rem] font-bold uppercase tracking-[0.12em] mb-2" style={{ color: "var(--st-45)" }}>Preview link</div>
            <div className="rounded-xl overflow-hidden border border-white/10 max-w-[480px]" style={{ background: "rgba(255,255,255,0.03)" }}>
              {post.coverUrl ? (
                <div className="aspect-[1.91/1]">
                  <img src={`${post.coverUrl}?w=480&h=251&fit=crop`} alt="" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="aspect-[1.91/1] flex items-center justify-center text-[0.78rem]" style={{ background: "rgba(255,255,255,0.04)", color: "var(--st-40)" }}>
                  Chưa có ảnh bìa
                </div>
              )}
              <div className="p-3">
                <div className="text-[0.65rem] uppercase tracking-wider mb-1" style={{ color: "var(--st-40)" }}>nguyenducquang.website</div>
                <div className="text-[0.92rem] font-semibold text-white leading-snug mb-1 line-clamp-2">{post.title}</div>
                {post.excerpt && <div className="text-[0.78rem] line-clamp-2" style={{ color: "var(--st-55)" }}>{post.excerpt}</div>}
              </div>
            </div>
            {!post.coverUrl && (
              <div className="text-[0.72rem] mt-2" style={{ color: "#ffaa44" }}>
                ⚠ Thiếu ảnh bìa - share preview sẽ kém hấp dẫn. Upload ảnh ở cột "Ảnh" trong admin trước khi share.
              </div>
            )}
          </div>

          {/* URL */}
          <div>
            <div className="text-[0.7rem] font-bold uppercase tracking-[0.12em] mb-2" style={{ color: "var(--st-45)" }}>URL</div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <a href={url} target="_blank" rel="noreferrer" className="flex-1 text-[0.82rem] truncate" style={{ color: "#7da9ff" }}>{url}</a>
              <button onClick={() => copy("url", url)} className="flex-shrink-0 px-3 py-1 text-[0.72rem] font-semibold rounded transition-colors"
                style={{ background: copiedKey === "url" ? "#5fffaa" : "rgba(255,255,255,0.08)", color: copiedKey === "url" ? "#000" : "#fff" }}>
                {copiedKey === "url" ? "✓ Đã copy" : "Copy URL"}
              </button>
            </div>
          </div>

          {/* Captions */}
          <div>
            <div className="text-[0.7rem] font-bold uppercase tracking-[0.12em] mb-2" style={{ color: "var(--st-45)" }}>Caption theo nền tảng</div>
            <div className="space-y-3">
              {captions.map(c => (
                <div key={c.key} className="rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${c.color}30` }}>
                  <div className="flex items-center justify-between px-3 py-2" style={{ background: `${c.color}10`, borderBottom: `1px solid ${c.color}25` }}>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                      <span className="text-[0.82rem] font-bold text-white">{c.label}</span>
                      <span className="text-[0.7rem]" style={{ color: "var(--st-50)" }}>· {c.text.length} ký tự</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => copy(c.key, c.text)}
                        className="px-2.5 py-1 text-[0.72rem] font-bold rounded transition-colors"
                        style={{ background: copiedKey === c.key ? "#5fffaa" : "rgba(255,255,255,0.1)", color: copiedKey === c.key ? "#000" : "#fff" }}>
                        {copiedKey === c.key ? <IcCheck size={12} /> : "Copy caption"}
                      </button>
                      <a href={c.shareUrl} target="_blank" rel="noreferrer"
                        className="px-2.5 py-1 text-[0.72rem] font-bold rounded inline-flex items-center gap-1"
                        style={{ background: c.color, color: "#fff" }}>
                        <IcExternal size={11} /> Share
                      </a>
                    </div>
                  </div>
                  <pre className="px-3 py-2.5 text-[0.8rem] whitespace-pre-wrap break-words font-sans leading-relaxed" style={{ color: "var(--st-70)", maxHeight: 200, overflow: "auto" }}>
{c.text}
                  </pre>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg p-3 text-[0.72rem]" style={{ background: "rgba(20,110,245,0.06)", border: "1px solid rgba(20,110,245,0.2)", color: "var(--st-60)" }}>
            💡 <strong className="text-white">Tip:</strong> Click "Share" mở thẳng cửa sổ post của nền tảng. Nhưng nội dung caption sẽ KHÔNG tự pre-fill (giới hạn API). Hãy <strong className="text-white">Copy caption trước → Share → Paste vào</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}
