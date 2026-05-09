import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { getPost, getPosts } from "@/lib/queries";
import { urlFor } from "../../../../sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nguyenducquang.website";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const posts = await getPosts(100);
    return posts.map((p: any) => ({ slug: p.slug.current }));
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const post = await getPost(params.slug);
    if (!post) return { title: "Bài viết" };
    const title = post.seoTitle || post.title;
    const description = post.seoDescription || post.excerpt;
    const image = post.coverImage ? urlFor(post.coverImage).width(1200).height(630).url() : undefined;
    return {
      title,
      description,
      alternates: { canonical: `/blog/${params.slug}` },
      openGraph: {
        type: "article",
        title,
        description,
        url: `${SITE_URL}/blog/${params.slug}`,
        images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
        authors: ["Nguyễn Đức Quảng"],
        publishedTime: post.publishedAt,
      },
      twitter: { card: "summary_large_image", title, description },
    };
  } catch { return {}; }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  let post: any;
  try { post = await getPost(params.slug); } catch {}
  if (!post) notFound();

  const image = post.coverImage ? urlFor(post.coverImage).width(1200).height(630).url() : undefined;

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
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${params.slug}` },
    inLanguage: "vi-VN",
    articleSection: post.category,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${params.slug}` },
    ],
  };

  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <div className="relative max-w-[860px] mx-auto px-6 md:px-10 pt-28 pb-12 md:pt-32 md:pb-16">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium mb-8 transition-colors hover:text-white" style={{ color: "var(--ink-mute)" }}>
              ← Quay lại Blog
            </Link>
            {post.category && <span className="wf-badge mb-5">{post.category}</span>}
            <h1 className="t-h1 mb-5 leading-[1.1] text-white">{post.title}</h1>
            <div className="flex items-center flex-wrap gap-3 text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>
              <span className="font-semibold text-white">Nguyễn Đức Quảng</span>
              {post.readTime && <><span>·</span><span>{post.readTime} phút đọc</span></>}
              {post.publishedAt && <><span>·</span><time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString("vi-VN")}</time></>}
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-[760px] mx-auto px-6 md:px-10 py-16 md:py-20">
            <article className="prose-ndq">
              {post.body ? <PortableText value={post.body} /> : <p style={{ color: "var(--ink-mute)" }}>Nội dung đang được cập nhật...</p>}
            </article>
            <div className="mt-16 pt-10 border-t flex items-center justify-between flex-wrap gap-4" style={{ borderColor: "var(--line)" }}>
              <Link href="/blog" className="text-[0.88rem] font-semibold transition-colors hover:text-white" style={{ color: "var(--ink-soft)" }}>← Xem tất cả bài viết</Link>
              <Link href="/#contact" className="btn btn-primary">Liên hệ <span className="arrow">→</span></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
