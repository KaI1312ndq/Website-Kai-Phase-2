import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import Link from "next/link";
import { getPosts } from "@/lib/queries";
import { urlFor } from "../../../sanity/lib/image";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nguyenducquang.website";

export const metadata = {
  title: "Blog & Insights — Nguyễn Đức Quảng",
  description: "Góc nhìn thực tế về Ecommerce, Performance Marketing và Leadership cho seller TMĐT Việt Nam.",
  alternates: { canonical: "/blog" },
  openGraph: { type: "website", title: "Blog & Insights — Nguyễn Đức Quảng", description: "Góc nhìn thực tế về Ecommerce, Performance Marketing và Leadership." },
};

export const revalidate = 60;

export default async function BlogPage() {
  let posts: any[] = [];
  try { posts = await getPosts(20); } catch {}

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog & Insights — Nguyễn Đức Quảng",
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
        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "blue", size: 500, top: "-20%", right: "-5%" },
            { variant: "purple", size: 420, bottom: "-30%", left: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-32 pb-14 md:pt-36 md:pb-20">
            <div className="section-tag">Blog & Insights</div>
            <h1 className="t-display tracking-tight mb-5 max-w-[840px] text-white">
              Góc nhìn từ<br /><span className="grad-text">thực chiến Ecom.</span>
            </h1>
            <p className="t-body-lg max-w-[560px]">
              Chia sẻ về Performance Marketing, Team Building, và cách tư duy trong thị trường TMĐT Việt Nam.
            </p>
          </div>
        </section>

        <section className="relative">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
            {posts.length === 0 ? (
              <div className="text-center py-28 md:py-36 max-w-[480px] mx-auto">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6" style={{ background: "var(--grad-primary)" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <h3 className="text-[1.4rem] font-bold mb-3 tracking-tight text-white">Bài viết đang được chuẩn bị</h3>
                <p className="t-body mb-7">Sắp có — theo dõi LinkedIn để cập nhật sớm nhất.</p>
                <a href="https://www.linkedin.com/in/duc-quang-nguyen-b7495223a/" target="_blank" rel="noreferrer" className="btn btn-primary">
                  Theo dõi LinkedIn <span className="arrow">→</span>
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {posts.map((post: any) => (
                  <Link key={post._id} href={`/blog/${post.slug.current}`}
                    className="group glass overflow-hidden flex flex-col">
                    <div className="aspect-[16/9] flex items-center justify-center overflow-hidden" style={{ background: "var(--grad-primary-soft)" }}>
                      {post.coverImage ? (
                        <img src={urlFor(post.coverImage).width(600).height(338).url()} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] grad-text">{post.category || "Insights"}</span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="wf-badge text-[0.7rem]">{post.category || "Ecom"}</span>
                        {post.readTime && <span className="text-[0.72rem]" style={{ color: "var(--ink-mute)" }}>{post.readTime} phút đọc</span>}
                      </div>
                      <h2 className="text-[1.05rem] font-semibold mb-2 leading-snug tracking-tight text-white group-hover:text-[#7da9ff] transition-colors">{post.title}</h2>
                      {post.excerpt && <p className="text-[0.88rem] leading-[1.6] line-clamp-2" style={{ color: "var(--ink-mute)" }}>{post.excerpt}</p>}
                      <div className="mt-auto pt-4 text-[0.82rem] font-semibold grad-text">Đọc tiếp →</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
