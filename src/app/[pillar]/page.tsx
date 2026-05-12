import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import Icon, { type IconName } from "@/components/icons/Icon";
import { PILLARS, getPillar } from "@/lib/pillars/config";
import { getPostsByCategories } from "@/lib/queries";
import { urlFor } from "../../../sanity/lib/image";
import { buildCoverUrl } from "@/lib/blog/cover-url";
import { QUIZZES } from "@/lib/quiz/compute";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nguyenducquang.website";

const TOOL_META: Record<string, { title: string; desc: string; color: string; icon: IconName }> = {
  "tinh-phi-san": {
    title: "Tính phí sàn TikTok & Shopee",
    desc: "So sánh đồng thời 4 platform - Mall vs Non-Mall, có search ngành cấp 3.",
    color: "#4ad6ff",
    icon: "tool",
  },
  "roas-calculator": {
    title: "ROAS Calculator",
    desc: "Tính break-even ROAS + target ROAS theo phí sàn 2026 + cấu trúc cost.",
    color: "#7da9ff",
    icon: "trending-up",
  },
  "pnl-ecom": {
    title: "Mẫu P&L Ecom",
    desc: "Báo cáo lãi lỗ 5 tầng: Net Revenue  Gross  Contribution  Marketing  EBITDA.",
    color: "#a78bff",
    icon: "layers",
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return PILLARS.map((p) => ({ pillar: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ pillar: string }> }): Promise<Metadata> {
  const { pillar } = await params;
  const config = getPillar(pillar);
  if (!config) return { title: "Pillar" };
  return {
    title: config.seoTitle,
    description: config.seoDescription,
    keywords: config.keywords,
    alternates: { canonical: `/${pillar}` },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      title: config.seoTitle,
      description: config.seoDescription,
      url: `${SITE_URL}/${pillar}`,
    },
  };
}

export const revalidate = 3600;

export default async function PillarPage({ params }: { params: Promise<{ pillar: string }> }) {
  const { pillar } = await params;
  const config = getPillar(pillar);
  if (!config) notFound();

  // Fetch all posts in pillar's categories
  let allPosts: any[] = [];
  try {
    allPosts = await getPostsByCategories(config.categories, 50);
  } catch {}

  // Group posts by cluster (match by tag)
  const clusters = config.clusters.map((cluster) => {
    const matched = allPosts.filter((post) => {
      if (!Array.isArray(post.tags) || post.tags.length === 0) {
        // Fallback: match by title containing tag keywords
        const title = (post.title || "").toLowerCase();
        return cluster.tagKeywords.some((kw) => title.includes(kw.toLowerCase()));
      }
      return post.tags.some((tag: string) =>
        cluster.tagKeywords.some((kw) => tag.toLowerCase().includes(kw.toLowerCase()))
      );
    });
    return { ...cluster, posts: matched.slice(0, 6) };
  });

  // Posts not in any cluster (shown in "More articles")
  const usedIds = new Set(clusters.flatMap((c) => c.posts.map((p) => p._id)));
  const otherPosts = allPosts.filter((p) => !usedIds.has(p._id)).slice(0, 6);

  const quiz = config.quizSlug ? QUIZZES.find((q) => q.slug === config.quizSlug) : null;
  const totalArticles = allPosts.length;

  // JSON-LD
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: config.title,
    description: config.intro[0],
    url: `${SITE_URL}/${pillar}`,
    inLanguage: "vi-VN",
    isPartOf: { "@type": "WebSite", name: "Nguyễn Đức Quảng", url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalArticles,
      itemListElement: allPosts.slice(0, 20).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/blog/${p.slug.current}`,
        name: p.title,
      })),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: config.shortTitle, item: `${SITE_URL}/${pillar}` },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

        {/* HERO */}
        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "blue", size: 500, top: "-20%", right: "-5%" },
            { variant: "purple", size: 420, bottom: "-30%", left: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1300px] mx-auto px-6 md:px-10 pt-32 pb-14 md:pt-36 md:pb-20">
            <div className="mb-5">
              <Link href="/" className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium transition-colors hover:text-white" style={{ color: "var(--ink-mute)" }}>
                ← Trang chủ
              </Link>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-xl"
                style={{ background: `${config.color}18`, border: `1px solid ${config.color}55`, color: config.color }}
              >
                <Icon name={config.iconName} size={28} strokeWidth={1.8} />
              </div>
              <div className="section-tag" style={{ borderColor: `${config.color}66`, color: config.color, background: `${config.color}10` }}>
                Pillar · {config.shortTitle}
              </div>
            </div>
            <h1 className="t-display tracking-tight leading-[1.05] mb-6 max-w-[920px] text-white">
              {config.title}
            </h1>
            <p className="text-[1.05rem] md:text-[1.15rem] font-medium mb-3" style={{ color: config.color }}>
              {config.tagline}
            </p>
            <div className="flex items-center gap-4 mt-6 flex-wrap">
              <div className="text-[0.88rem]" style={{ color: "var(--ink-mute)" }}>
                <strong className="text-white">{totalArticles}</strong> bài viết · <strong className="text-white">{config.clusters.length}</strong> chủ đề con · cập nhật liên tục
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="relative">
          <div className="max-w-[920px] mx-auto px-6 md:px-10 py-12 md:py-16">
            <div className="flex flex-col gap-4">
              {config.intro.map((p, i) => (
                <p key={i} className="text-[1rem] md:text-[1.05rem] leading-[1.8]" style={{ color: "var(--ink-soft)" }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* CLUSTERS */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-16 md:py-20">
            <div className="section-tag">Chủ đề chính</div>
            <h2 className="t-h2 mb-10 text-white">Khám phá theo <span className="grad-text">chủ đề.</span></h2>

            <div className="flex flex-col gap-12">
              {clusters.map((cluster, i) => (
                <div key={cluster.title}>
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span className="text-[1.4rem] md:text-[1.6rem] font-extrabold leading-none" style={{ color: config.color }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[1.2rem] md:text-[1.35rem] font-bold tracking-tight text-white">{cluster.title}</h3>
                  </div>
                  <p className="text-[0.92rem] mb-5 max-w-[760px]" style={{ color: "var(--ink-mute)" }}>
                    {cluster.description}
                  </p>

                  {cluster.posts.length === 0 ? (
                    <div className="rounded-xl px-5 py-4 text-[0.88rem]" style={{ background: "var(--st-03)", border: "1px solid var(--line)", color: "var(--ink-mute)" }}>
                      Bài viết về chủ đề này đang được biên soạn. Quay lại sớm nhé.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {cluster.posts.map((post: any) => (
                        <Link key={post._id} href={`/blog/${post.slug.current}`} className="group glass overflow-hidden flex flex-col">
                          <div className="aspect-[16/9] flex items-center justify-center overflow-hidden" style={{ background: "var(--grad-primary-soft)" }}>
                            <img
                              src={buildCoverUrl({
                                sanityUrl: post.coverImage ? urlFor(post.coverImage).width(600).height(338).url() : undefined,
                                title: post.title,
                                category: post.category,
                                width: 600,
                                height: 338,
                              })}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                          <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {post.readTime && <span className="text-[0.7rem]" style={{ color: "var(--ink-mute)" }}>{post.readTime} phút đọc</span>}
                            </div>
                            <h4 className="text-[0.95rem] font-semibold leading-snug tracking-tight text-white group-hover:text-[#7da9ff] transition-colors line-clamp-3">
                              {post.title}
                            </h4>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TOOLS */}
        {config.tools.length > 0 && (
          <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
            <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-16 md:py-20">
              <div className="section-tag">Tools miễn phí</div>
              <h2 className="t-h2 mb-8 text-white">Công cụ <span className="grad-text">áp dụng ngay.</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {config.tools.map((slug) => {
                  const tool = TOOL_META[slug];
                  if (!tool) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/tools/${slug}`}
                      className="rounded-2xl p-7 transition-all hover:scale-[1.01] flex items-start gap-4"
                      style={{
                        background: `linear-gradient(135deg, ${tool.color}10 0%, var(--st-03) 100%)`,
                        border: `1px solid ${tool.color}33`,
                      }}
                    >
                      <span
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${tool.color}20`, border: `1px solid ${tool.color}55`, color: tool.color }}
                      >
                        <Icon name={tool.icon} size={24} strokeWidth={1.8} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[1.1rem] font-bold text-white mb-2">{tool.title}</h3>
                        <p className="text-[0.88rem] leading-[1.6]" style={{ color: "var(--ink-mute)" }}>{tool.desc}</p>
                        <div className="text-[0.85rem] font-semibold mt-3" style={{ color: tool.color }}>Mở tool </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* QUIZ */}
        {quiz && (
          <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
            <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-20">
              <div className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${config.color}15 0%, rgba(122,61,255,0.10) 100%)`, border: `1px solid ${config.color}40` }}>
                <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: config.color }}>
                  Test miễn phí · {quiz.questionCount} câu · {quiz.estimatedMinutes} phút
                </div>
                <h2 className="text-[1.6rem] md:text-[2rem] font-bold leading-tight text-white mb-4">{quiz.name}</h2>
                <p className="text-[0.95rem] leading-[1.7] mb-6 max-w-[680px]" style={{ color: "var(--st-80)" }}>
                  {quiz.shortDescription}
                </p>
                <Link href={`/quiz/${quiz.slug}`} className="btn btn-primary">
                  Làm test ngay
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="section-tag">FAQ</div>
            <h2 className="t-h2 mb-8 text-white">Câu hỏi thường gặp về <span className="grad-text">{config.shortTitle}.</span></h2>
            <div className="flex flex-col gap-3">
              {config.faqs.map((f) => (
                <details key={f.q} className="group rounded-xl overflow-hidden" style={{ background: "var(--st-03)", border: "1px solid var(--line)" }}>
                  <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none">
                    <span className="text-[0.95rem] font-semibold text-white">{f.q}</span>
                    <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full transition-transform group-open:rotate-45" style={{ background: `${config.color}30`, color: config.color }}>+</span>
                  </summary>
                  <div className="px-5 pb-5 text-[0.9rem] leading-[1.75]" style={{ color: "var(--ink-mute)" }}>{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* OTHER POSTS in pillar */}
        {otherPosts.length > 0 && (
          <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
            <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-16 md:py-20">
              <div className="section-tag">Đọc thêm</div>
              <h2 className="t-h2 mb-8 text-white">Bài viết khác cùng <span className="grad-text">{config.shortTitle}.</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {otherPosts.map((p: any) => (
                  <Link key={p._id} href={`/blog/${p.slug.current}`} className="group glass overflow-hidden flex flex-col">
                    <div className="aspect-[16/9] flex items-center justify-center overflow-hidden" style={{ background: "var(--grad-primary-soft)" }}>
                      <img
                        src={buildCoverUrl({
                          sanityUrl: p.coverImage ? urlFor(p.coverImage).width(600).height(338).url() : undefined,
                          title: p.title,
                          category: p.category,
                          width: 600,
                          height: 338,
                        })}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <h4 className="text-[0.95rem] font-semibold leading-snug tracking-tight text-white group-hover:text-[#7da9ff] transition-colors line-clamp-3">{p.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* COURSE CTA */}
        <section className="relative border-t overflow-hidden" style={{ borderColor: "var(--line)" }}>
          <div className="blob blob-blue blob-anim" style={{ width: 500, height: 500, top: "-20%", right: "-10%" }} />
          <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 py-20 md:py-28 text-center">
            <div className="section-tag mx-auto">Khoá học</div>
            <h2 className="t-h2 mb-4 text-white">Muốn học sâu hơn từ <span className="grad-text">60+ project thực chiến?</span></h2>
            <p className="t-body max-w-[600px] mx-auto mb-8">
              Khoá Ecom Foundation - 12 buổi từ cơ cấu chi phí, P&L gian hàng, tối ưu ROAS đến scale team Ecom.
            </p>
            <Link href="/ecom-foundation" className="btn btn-primary">Xem khoá học</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
