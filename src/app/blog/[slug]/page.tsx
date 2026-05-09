import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getPost, getPosts } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const posts = await getPosts(100);
    return posts.map((p: any) => ({ slug: p.slug.current }));
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const post = await getPost(params.slug);
    return {
      title: post?.seoTitle || `${post?.title} — NĐQ`,
      description: post?.seoDescription || post?.excerpt,
    };
  } catch { return {}; }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  let post: any;
  try { post = await getPost(params.slug); } catch {}
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main>
        <section className="border-b" style={{ background: "var(--canvas-mute)", borderColor: "var(--border)" }}>
          <div className="max-w-[860px] mx-auto px-6 md:px-10 pt-12 pb-10 md:pt-16">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium mb-8 text-gray-500 hover:text-wf-blue transition-colors">
              ← Quay lại Blog
            </Link>
            {post.category && <span className="wf-badge mb-5">{post.category}</span>}
            <h1 className="t-h1 mb-5 leading-[1.1]">{post.title}</h1>
            <div className="flex items-center flex-wrap gap-3 text-[0.85rem] text-gray-500">
              <span className="font-semibold text-ink">Nguyễn Đức Quảng</span>
              {post.readTime && <><span>·</span><span>{post.readTime} phút đọc</span></>}
              {post.publishedAt && <><span>·</span><span>{new Date(post.publishedAt).toLocaleDateString("vi-VN")}</span></>}
            </div>
          </div>
        </section>

        <section style={{ background: "white" }}>
          <div className="max-w-[760px] mx-auto px-6 md:px-10 py-16 md:py-20">
            <div className="prose-ndq">
              {post.body ? <PortableText value={post.body} /> : <p className="text-gray-500">Nội dung đang được cập nhật...</p>}
            </div>
            <div className="mt-16 pt-10 border-t flex items-center justify-between flex-wrap gap-4" style={{ borderColor: "var(--border)" }}>
              <Link href="/blog" className="text-[0.88rem] font-semibold text-gray-600 hover:text-wf-blue transition-colors">← Xem tất cả bài viết</Link>
              <Link href="/#contact" className="btn btn-primary">Liên hệ <span className="arrow">→</span></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
