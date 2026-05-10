import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { getPost, getPosts, getRelatedPosts, getCommentsForPost } from "@/lib/queries";
import { urlFor } from "../../../../sanity/lib/image";
import { extractHeadings } from "@/lib/blog/headings";
import BlogSidebar from "@/components/blog/BlogSidebar";
import PortableTextWithIds from "@/components/blog/PortableTextWithIds";
import CommentSection from "@/components/blog/CommentSection";
import { notFound } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nguyenducquang.website";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const posts = await getPosts(100);
    return posts.map((p: any) => ({ slug: p.slug.current }));
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPost(slug);
    if (!post) return { title: "Bài viết" };
    const title = post.seoTitle || post.title;
    const description = post.seoDescription || post.excerpt;
    const image = post.coverImage ? urlFor(post.coverImage).width(1200).height(630).url() : undefined;
    return {
      title,
      description,
      alternates: { canonical: `/blog/${slug}` },
      openGraph: {
        type: "article",
        title,
        description,
        url: `${SITE_URL}/blog/${slug}`,
        images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
        authors: ["Nguyễn Đức Quảng"],
        publishedTime: post.publishedAt,
      },
      twitter: { card: "summary_large_image", title, description },
    };
  } catch { return {}; }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: any;
  try { post = await getPost(slug); } catch {}
  if (!post) notFound();

  let relatedPosts: any[] = [];
  let comments: any[] = [];
  try {
    [relatedPosts, comments] = await Promise.all([
      getRelatedPosts(post.category, slug, 4),
      getCommentsForPost(post._id),
    ]);
  } catch {}

  const image = post.coverImage ? urlFor(post.coverImage).width(1600).height(900).url() : undefined;
  const headings = extractHeadings(post.body || []);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.seoDescription,
    image: image ? [image] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Person", name: "Nguyễn Đức Quảng", url: SITE_URL },
    publisher: { "@type": "Person", name: "Nguyễn Đức Quảng", logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
    inLanguage: "vi-VN",
    articleSection: post.category,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${slug}` },
    ],
  };

  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : null;

  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

        {/* HERO — full width with cover image background */}
        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <div className="blob blob-blue blob-anim" style={{ width: 500, height: 500, top: "-15%", left: "-5%", opacity: 0.5 }} />
          <div className="blob blob-purple blob-anim" style={{ width: 420, height: 420, bottom: "-30%", right: "-5%", animationDelay: "2s", opacity: 0.5 }} />
          <div className="relative max-w-[1300px] mx-auto px-6 md:px-10 pt-32 pb-12 md:pt-36 md:pb-16">
            <div className="mb-5">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium transition-colors hover:text-white" style={{ color: "var(--ink-mute)" }}>
                ← Quay lại Blog
              </Link>
            </div>
            <div className="flex items-center gap-2 flex-wrap mb-5">
              {post.category && <span className="wf-badge">{post.category}</span>}
              {post.readTime && (
                <span className="text-[0.78rem] font-medium" style={{ color: "var(--ink-mute)" }}>
                  · {post.readTime} phút đọc
                </span>
              )}
              {publishedDate && (
                <time dateTime={post.publishedAt} className="text-[0.78rem]" style={{ color: "var(--ink-mute)" }}>
                  · {publishedDate.toLocaleDateString("vi-VN")}
                </time>
              )}
            </div>
            <h1 className="t-h1 leading-[1.1] text-white max-w-[920px] mb-5">{post.title}</h1>
            {post.excerpt && (
              <p className="t-body-lg max-w-[760px]" style={{ color: "var(--ink-soft)" }}>
                {post.excerpt}
              </p>
            )}
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-[0.85rem]" style={{ background: "var(--grad-primary)" }}>
                NQ
              </div>
              <div>
                <div className="text-[0.88rem] font-semibold text-white">Nguyễn Đức Quảng</div>
                <div className="text-[0.72rem]" style={{ color: "var(--ink-mute)" }}>Ecom Growth Expert · 60+ project</div>
              </div>
            </div>
          </div>

          {/* Cover image — full width banner */}
          {image && (
            <div className="relative max-w-[1300px] mx-auto px-6 md:px-10 pb-12 md:pb-16">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden" style={{ border: "1px solid var(--line)" }}>
                <img src={image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </section>

        {/* BODY — 2-column with sticky sidebar */}
        <section className="relative">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-14 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 xl:gap-16">
              {/* Article content */}
              <article className="prose-ndq min-w-0">
                {post.body ? (
                  <PortableTextWithIds value={post.body} />
                ) : (
                  <p style={{ color: "var(--ink-mute)" }}>Nội dung đang được cập nhật...</p>
                )}

                {/* In-article CTA after body */}
                <div className="mt-14 pt-10 border-t" style={{ borderColor: "var(--line)" }}>
                  <div className="rounded-2xl p-6 md:p-8" style={{ background: "linear-gradient(135deg, rgba(20,110,245,0.10) 0%, rgba(122,61,255,0.10) 100%)", border: "1px solid rgba(20,110,245,0.22)" }}>
                    <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: "#7da9ff" }}>
                      Khoá học · Đang mở apply Khoá 1
                    </div>
                    <div className="text-[1.4rem] md:text-[1.6rem] font-bold mb-3 leading-tight text-white">
                      Muốn build P&L thực chiến + scale shop từ kinh nghiệm 60+ project?
                    </div>
                    <p className="text-[0.95rem] leading-[1.7] mb-5" style={{ color: "rgba(255,255,255,0.75)" }}>
                      Khoá Ecom Foundation — 12 buổi từ cơ cấu chi phí, P&L gian hàng, đến tối ưu ROAS và build team.
                    </p>
                    <Link href="/ecom-foundation" className="btn btn-primary">
                      Xem khoá học <span className="arrow">→</span>
                    </Link>
                  </div>

                  <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
                    <Link href="/blog" className="text-[0.88rem] font-semibold transition-colors hover:text-white" style={{ color: "var(--ink-soft)" }}>
                      ← Tất cả bài viết
                    </Link>
                    <Link href="/#contact" className="text-[0.88rem] font-semibold transition-colors hover:text-white" style={{ color: "var(--ink-soft)" }}>
                      Liên hệ Quảng →
                    </Link>
                  </div>
                </div>

                {/* Comments */}
                <CommentSection postId={post._id} initialComments={comments} />
              </article>

              {/* Sidebar */}
              <BlogSidebar headings={headings} relatedPosts={relatedPosts} />
            </div>
          </div>
        </section>

        {/* Footer related posts grid */}
        {relatedPosts.length > 0 && (
          <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
            <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-20 md:py-28">
              <div className="section-tag">Đọc thêm</div>
              <h2 className="t-h2 mb-10 text-white">Bài viết <span className="grad-text">cùng chủ đề.</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedPosts.slice(0, 3).map((p: any) => (
                  <Link key={p._id} href={`/blog/${p.slug.current}`} className="group glass overflow-hidden flex flex-col">
                    <div className="aspect-[16/9] flex items-center justify-center overflow-hidden" style={{ background: "var(--grad-primary-soft)" }}>
                      {p.coverImage ? (
                        <img src={urlFor(p.coverImage).width(600).height(338).url()} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] grad-text">{p.category || "Insights"}</span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="wf-badge text-[0.7rem]">{p.category || "Ecom"}</span>
                        {p.readTime && <span className="text-[0.72rem]" style={{ color: "var(--ink-mute)" }}>{p.readTime} phút đọc</span>}
                      </div>
                      <h3 className="text-[1.05rem] font-semibold leading-snug tracking-tight text-white group-hover:text-[#7da9ff] transition-colors">{p.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
