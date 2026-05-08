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
        <div style={{ background: "var(--bg)" }}>
          <div className="max-w-[860px] mx-auto px-12 pt-16 pb-8">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium mb-8 transition-colors hover:text-blue-600" style={{ color: "var(--muted)" }}>
              ← Quay lại Blog
            </Link>
            {post.category && (
              <span className="inline-block text-[0.72rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4"
                style={{ background: "var(--blue-sky)", color: "var(--blue)" }}>
                {post.category}
              </span>
            )}
            <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold tracking-tight mb-4 leading-[1.15]">{post.title}</h1>
            <div className="flex items-center gap-4 text-[0.82rem]" style={{ color: "var(--muted)" }}>
              <span>Nguyễn Đức Quảng</span>
              {post.readTime && <><span>·</span><span>{post.readTime} phút đọc</span></>}
              {post.publishedAt && <><span>·</span><span>{new Date(post.publishedAt).toLocaleDateString("vi-VN")}</span></>}
            </div>
          </div>
        </div>
        <div style={{ background: "white" }}>
          <div className="max-w-[860px] mx-auto px-12 py-16">
            <div className="prose-ndq">
              {post.body ? <PortableText value={post.body}/> : <p style={{ color: "var(--muted)" }}>Nội dung đang được cập nhật...</p>}
            </div>
            <div className="mt-16 pt-10 border-t" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between">
                <Link href="/blog" className="text-[0.88rem] font-semibold transition-colors hover:text-blue-600" style={{ color: "var(--muted)" }}>← Xem tất cả bài viết</Link>
                <Link href="/#contact" className="inline-flex items-center gap-2 text-white font-semibold text-[0.88rem] px-5 py-2.5 rounded-lg transition-all hover:-translate-y-0.5" style={{ background: "var(--blue)" }}>Liên hệ →</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
