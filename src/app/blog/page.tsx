import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import Link from "next/link";
import { getPaginatedPosts, getFeaturedPosts, getPopularTags } from "@/lib/queries";
import { urlFor } from "../../../sanity/lib/image";
import { buildCoverUrl } from "@/lib/blog/cover-url";
import BlogFilterBar from "@/components/blog/BlogFilterBar";
import TagCloud from "@/components/blog/TagCloud";
import Pagination from "@/components/blog/Pagination";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nguyenducquang.website";

const CATEGORY_LABELS: Record<string, string> = {
  "tmdt-co-ban": "TMĐT 101",
  "ads-scaling": "Ads & Scaling",
  "unit-economics": "Unit Economics",
  "mua-vu-sale": "Mùa vụ & Sale",
  "team-leadership": "Team & Leadership",
  "case-study-data": "Case Study & Data",
  "tam-ly-mindset": "Tâm lý & Mindset",
  "thue-cong-cu": "Thuế & Công cụ",
  // legacy
  ecom: "Ecommerce",
  performance: "Performance",
  leadership: "Leadership",
  tiktok: "TikTok Shop",
  shopee: "Shopee",
  mindset: "Mindset",
  psychology: "Tâm lý & Phát triển bản thân",
  career: "Hướng nghiệp",
};

export const metadata = {
  title: "Blog & Insights - Nguyễn Đức Quảng",
  description: "Góc nhìn thực tế về Ecommerce, Performance Marketing và Leadership cho seller TMĐT Việt Nam.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": [{ url: "/blog/feed.xml", title: "Blog & Insights RSS" }] },
  },
  openGraph: { type: "website", title: "Blog & Insights - Nguyễn Đức Quảng", description: "Góc nhìn thực tế về Ecommerce, Performance Marketing và Leadership." },
};

export const revalidate = 60;

type SearchParams = { page?: string; category?: string; q?: string; tag?: string };

export default async function BlogPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10) || 1);
  const category = params.category || "all";
  const search = params.q || "";
  const tag = params.tag || "";

  const isFiltered = category !== "all" || search.length > 0 || tag.length > 0;

  // Fetch in parallel
  const [paginated, featuredPosts, popularTags] = await Promise.all([
    getPaginatedPosts({
      page, perPage: 9,
      category: category === "all" ? undefined : category,
      search,
      tag: tag || undefined,
    }).catch(() => ({
      posts: [], total: 0, totalPages: 0, page: 1, perPage: 9, categoryCounts: {} as Record<string, number>,
    })),
    isFiltered || page > 1 ? Promise.resolve([] as any[]) : getFeaturedPosts().catch(() => [] as any[]),
    getPopularTags(20).catch(() => [] as { tag: string; count: number }[]),
  ]);

  const { posts, total, totalPages, categoryCounts } = paginated;

  // Build category chip options
  const allCount = Object.values(categoryCounts).reduce((s, n) => s + n, 0);
  const categoryOptions = [
    { value: "all", label: "Tất cả", count: allCount },
    ...Object.entries(CATEGORY_LABELS)
      .map(([value, label]) => ({ value, label, count: categoryCounts[value] || 0 }))
      .filter((c) => c.count > 0),
  ];

  // Build base URL for pagination
  const baseQS = new URLSearchParams();
  if (category !== "all") baseQS.set("category", category);
  if (search) baseQS.set("q", search);
  if (tag) baseQS.set("tag", tag);
  const baseUrl = baseQS.toString() ? `/blog?${baseQS.toString()}` : "/blog";

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog & Insights - Nguyễn Đức Quảng",
    url: `${SITE_URL}/blog`,
    inLanguage: "vi-VN",
    publisher: { "@type": "Person", name: "Nguyễn Đức Quảng", url: SITE_URL },
    description: "Góc nhìn thực tế về Ecommerce, Performance Marketing và Leadership.",
    blogPost: posts.slice(0, 10).map((p: any) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug.current}`,
      datePublished: p.publishedAt,
      author: { "@type": "Person", name: "Nguyễn Đức Quảng" },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    ],
  };

  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

        {/* HERO */}
        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "blue", size: 500, top: "-20%", right: "-5%" },
            { variant: "purple", size: 420, bottom: "-30%", left: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1300px] mx-auto px-6 md:px-10 pt-32 pb-12 md:pt-36 md:pb-16">
            <div className="section-tag">Blog & Insights</div>
            <h1 className="t-display tracking-tight mb-5 max-w-[840px] text-white">
              Góc nhìn từ<br /><span className="grad-text">thực chiến Ecom.</span>
            </h1>
            <p className="t-body-lg max-w-[640px]">
              Chia sẻ về Performance Marketing, P&L gian hàng, Team Building và cách tư duy trong thị trường TMĐT Việt Nam.
            </p>
          </div>
        </section>

        {/* FEATURED POSTS - only show on first page, no filter */}
        {!isFiltered && page === 1 && featuredPosts.length > 0 && (
          <section className="relative border-b" style={{ borderColor: "var(--line)" }}>
            <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-16 md:py-20">
              <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
                <div>
                  <div className="section-tag">Bài nổi bật</div>
                  <h2 className="t-h2 text-white">Đáng đọc <span className="grad-text">trước nhất.</span></h2>
                </div>
              </div>
              <FeaturedPostsGrid posts={featuredPosts.slice(0, 3)} />
            </div>
          </section>
        )}

        {/* MAIN POSTS - filter + grid + pagination */}
        <section className="relative">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-16 md:py-20">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
              <div>
                <div className="section-tag">{isFiltered ? "Kết quả" : "Tất cả bài viết"}</div>
                <h2 className="t-h2 text-white">
                  {tag
                    ? <>Tag: <span className="grad-text">#{tag}</span></>
                    : search
                      ? <>Tìm kiếm: <span className="grad-text">"{search}"</span></>
                      : category !== "all"
                        ? <>Chuyên mục: <span className="grad-text">{CATEGORY_LABELS[category] || category}</span></>
                        : <>Bài viết <span className="grad-text">mới nhất.</span></>}
                </h2>
                {tag && (
                  <Link href="/blog" className="inline-block mt-3 text-[0.85rem] font-semibold transition-colors hover:text-white" style={{ color: "#7da9ff" }}>
                    ← Bỏ tag, xem tất cả
                  </Link>
                )}
                {total > 0 && (
                  <p className="text-[0.88rem] mt-2" style={{ color: "var(--ink-mute)" }}>
                    {total} bài viết{totalPages > 1 ? ` · Trang ${page}/${totalPages}` : ""}
                  </p>
                )}
              </div>
            </div>

            <BlogFilterBar
              categories={categoryOptions}
              currentCategory={category}
              currentSearch={search}
            />

            {popularTags.length > 0 && (
              <div className="mb-12 -mt-6">
                <TagCloud tags={popularTags} currentTag={tag} />
              </div>
            )}

            {posts.length === 0 ? (
              <div className="text-center py-20 max-w-[480px] mx-auto">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6" style={{ background: "var(--grad-primary)" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <h3 className="text-[1.3rem] font-bold mb-3 tracking-tight text-white">Không tìm thấy bài viết</h3>
                <p className="t-body mb-7">
                  {search ? `Chưa có bài nào khớp "${search}".` : "Chuyên mục này chưa có bài viết."} Hãy thử filter khác.
                </p>
                <Link href="/blog" className="btn btn-primary">Xem tất cả bài viết </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {posts.map((post: any) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}

            <Pagination currentPage={page} totalPages={totalPages} baseUrl={baseUrl} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ─── Featured grid: 3 equal cards in a row (vertical layout) ─── */
function FeaturedPostsGrid({ posts }: { posts: any[] }) {
  if (posts.length === 0) return null;
  const featured = posts.slice(0, 3);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {featured.map((p: any, i: number) => (
        <Link
          key={p._id}
          href={`/blog/${p.slug.current}`}
          className="group glass overflow-hidden flex flex-col"
        >
          <div className="aspect-[16/9] overflow-hidden flex items-center justify-center" style={{ background: "var(--grad-primary-soft)" }}>
            <img
              src={buildCoverUrl({
                sanityUrl: p.coverImage ? urlFor(p.coverImage).width(600).height(338).url() : undefined,
                title: p.title,
                category: p.category,
              })}
              alt={p.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {i === 0 && (
                <span className="wf-badge text-[0.66rem]" style={{ background: "rgba(20,110,245,0.18)", borderColor: "rgba(20,110,245,0.4)", color: "#7da9ff" }}>
                  ★ Top
                </span>
              )}
              <span className="wf-badge text-[0.66rem]">{CATEGORY_LABELS[p.category] || p.category}</span>
              {p.readTime && (
                <span className="text-[0.7rem]" style={{ color: "var(--ink-mute)" }}>
                  · {p.readTime} phút đọc
                </span>
              )}
            </div>
            <h3 className="text-[1.05rem] md:text-[1.1rem] font-bold mb-2.5 leading-snug tracking-tight text-white group-hover:text-[#7da9ff] transition-colors line-clamp-2">
              {p.title}
            </h3>
            {p.excerpt && (
              <p className="text-[0.86rem] leading-[1.55] line-clamp-3" style={{ color: "var(--ink-mute)" }}>
                {p.excerpt}
              </p>
            )}
            <div className="mt-auto pt-4 text-[0.82rem] font-semibold grad-text">Đọc bài</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ─── Standard post card ─── */
function PostCard({ post }: { post: any }) {
  return (
    <Link href={`/blog/${post.slug.current}`} className="group glass overflow-hidden flex flex-col">
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
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="wf-badge text-[0.7rem]">{CATEGORY_LABELS[post.category] || post.category || "Ecom"}</span>
          {post.readTime && <span className="text-[0.72rem]" style={{ color: "var(--ink-mute)" }}>{post.readTime} phút đọc</span>}
        </div>
        <h2 className="text-[1.05rem] font-semibold mb-2 leading-snug tracking-tight text-white group-hover:text-[#7da9ff] transition-colors">{post.title}</h2>
        {post.excerpt && <p className="text-[0.88rem] leading-[1.6] line-clamp-2" style={{ color: "var(--ink-mute)" }}>{post.excerpt}</p>}
        <div className="mt-auto pt-4 text-[0.82rem] font-semibold grad-text">Đọc tiếp </div>
      </div>
    </Link>
  );
}
