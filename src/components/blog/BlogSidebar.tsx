import Link from "next/link";
import type { Heading } from "@/lib/blog/headings";
import { urlFor } from "../../../sanity/lib/image";
import BlogTOC from "./BlogTOC";
import Icon, { type IconName } from "@/components/icons/Icon";
import type { LinkSuggestion } from "@/lib/blog/internal-links";

type RelatedPost = {
  _id: string;
  title: string;
  slug: { current: string };
  category?: string;
  readTime?: number;
  coverImage?: any;
};

type MostReadPost = {
  _id: string;
  title: string;
  slug: { current: string };
  viewCount?: number;
};

const ALL_TOOLS = [
  { href: "/tools/tinh-phi-san", label: "Tính phí sàn TikTok & Shopee", color: "#4ad6ff" },
  { href: "/tools/roas-calculator", label: "ROAS Calculator", color: "#7da9ff" },
  { href: "/tools/pnl-ecom", label: "Mẫu P&L Ecom", color: "#a78bff" },
];

export default function BlogSidebar({
  headings,
  relatedPosts,
  mostReadPosts = [],
  relevantTools = [],
  relevantQuiz = null,
}: {
  headings: Heading[];
  relatedPosts: RelatedPost[];
  mostReadPosts?: MostReadPost[];
  relevantTools?: LinkSuggestion[];
  relevantQuiz?: LinkSuggestion | null;
}) {
  return (
    <aside className="lg:sticky lg:top-24 flex flex-col gap-7 self-start">
      {/* TOC */}
      {headings.length >= 2 && (
        <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)" }}>
          <BlogTOC headings={headings} />
        </div>
      )}

      {/* Relevant Tools (top 2 — context-aware) */}
      {relevantTools.length > 0 && (
        <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)" }}>
          <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
            Tools liên quan
          </div>
          <div className="flex flex-col gap-2">
            {relevantTools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="flex items-start gap-3 p-3 rounded-lg transition-all hover:bg-white/5"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <span
                  className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center"
                  style={{ background: `${t.color}20`, border: `1px solid ${t.color}40`, color: t.color }}
                >
                  <Icon name={t.iconName as IconName} size={16} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[0.86rem] font-semibold text-white leading-snug">{t.title}</div>
                  <div className="text-[0.74rem] mt-0.5 line-clamp-2" style={{ color: "rgba(255,255,255,0.5)" }}>{t.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Relevant Quiz (single — context-aware) */}
      {relevantQuiz && (
        <div className="rounded-xl p-5" style={{ background: `${relevantQuiz.color}10`, border: `1px solid ${relevantQuiz.color}33` }}>
          <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] mb-3" style={{ color: relevantQuiz.color }}>
            Test miễn phí
          </div>
          <div className="flex items-start gap-3">
            <span
              className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center"
              style={{ background: `${relevantQuiz.color}20`, border: `1px solid ${relevantQuiz.color}50`, color: relevantQuiz.color }}
            >
              <Icon name={relevantQuiz.iconName as IconName} size={16} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[0.92rem] font-bold text-white leading-snug mb-1">{relevantQuiz.title}</div>
              <div className="text-[0.78rem] mb-3" style={{ color: "rgba(255,255,255,0.65)" }}>{relevantQuiz.description}</div>
              <Link href={relevantQuiz.href} className="text-[0.82rem] font-bold inline-flex items-center gap-1" style={{ color: relevantQuiz.color }}>
                Làm test ngay <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* All tools fallback (always shown for discoverability) */}
      <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)" }}>
        <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
          Tất cả tools
        </div>
        <div className="flex flex-col gap-1.5">
          {ALL_TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="flex items-center justify-between gap-2 p-2.5 rounded-lg transition-all"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: t.color }} />
                <span className="text-[0.85rem] font-medium text-white">{t.label}</span>
              </span>
              <span className="text-[0.78rem]" style={{ color: "rgba(255,255,255,0.4)" }}>→</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Course CTA */}
      <div className="rounded-xl p-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(20,110,245,0.18) 0%, rgba(122,61,255,0.18) 100%)", border: "1px solid rgba(20,110,245,0.32)" }}>
        <div className="text-[0.66rem] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: "#7da9ff" }}>
          Khoá học · Đang mở apply
        </div>
        <div className="text-[1.05rem] font-bold mb-2 leading-tight text-white">
          Ecom Foundation — 12 buổi build P&L thực chiến.
        </div>
        <div className="text-[0.82rem] leading-[1.55] mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>
          Từ cơ cấu chi phí, P&L gian hàng, tối ưu ROAS đến scale team — kinh nghiệm 60+ project Ecom.
        </div>
        <Link href="/ecom-foundation" className="block w-full text-center py-2.5 rounded-lg text-[0.85rem] font-bold transition-all"
          style={{ background: "var(--grad-primary)", color: "white", boxShadow: "0 4px 14px rgba(20,110,245,0.35)" }}>
          Xem khoá học →
        </Link>
      </div>

      {/* Most read */}
      {mostReadPosts.length > 0 && (
        <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)" }}>
          <div className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Icon name="fire" size={13} />
            <span>Đọc nhiều nhất</span>
          </div>
          <ol className="flex flex-col gap-3 list-none">
            {mostReadPosts.slice(0, 5).map((p, i) => (
              <li key={p._id}>
                <Link href={`/blog/${p.slug.current}`} className="flex gap-3 items-start group">
                  <span className="text-[1.05rem] font-extrabold leading-none flex-shrink-0 w-6 grad-text">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.84rem] font-medium leading-snug text-white group-hover:text-[#7da9ff] transition-colors line-clamp-2">{p.title}</div>
                    {typeof p.viewCount === "number" && p.viewCount > 0 && (
                      <div className="text-[0.7rem] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {p.viewCount.toLocaleString("vi-VN")} lượt xem
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)" }}>
          <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
            Bài liên quan
          </div>
          <div className="flex flex-col gap-3">
            {relatedPosts.slice(0, 4).map((p) => {
              const img = p.coverImage ? urlFor(p.coverImage).width(120).height(80).url() : null;
              return (
                <Link key={p._id} href={`/blog/${p.slug.current}`} className="flex gap-3 items-start group">
                  <div className="w-[64px] h-[44px] flex-shrink-0 rounded-md overflow-hidden flex items-center justify-center" style={{ background: "var(--grad-primary-soft)" }}>
                    {img ? (
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[0.55rem] font-bold uppercase tracking-[0.1em] grad-text">{p.category?.slice(0, 4) || "BLOG"}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.82rem] font-medium leading-snug text-white group-hover:text-[#7da9ff] transition-colors line-clamp-2">{p.title}</div>
                    {p.readTime && <div className="text-[0.7rem] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{p.readTime} phút đọc</div>}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Social / Author block */}
      <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white" style={{ background: "var(--grad-primary)" }}>NQ</div>
          <div>
            <div className="text-[0.9rem] font-bold text-white">Nguyễn Đức Quảng</div>
            <div className="text-[0.72rem]" style={{ color: "var(--ink-mute)" }}>Ecom Growth · 60+ project</div>
          </div>
        </div>
        <Link href="/#contact" className="block text-center py-2 rounded-lg text-[0.82rem] font-semibold transition-all"
          style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}>
          Liên hệ Quảng
        </Link>
      </div>
    </aside>
  );
}
