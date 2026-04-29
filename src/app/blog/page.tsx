import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getPosts } from "@/lib/queries";
import { urlFor } from "../../../sanity/lib/image";


export const metadata = {
  title: "Blog & Insights — Nguyễn Đức Quảng",
  description: "Góc nhìn thực tế về Ecommerce, Performance Marketing và Leadership.",
};

export const revalidate = 60;

export default async function BlogPage() {
  let posts: any[] = [];
  try { posts = await getPosts(20); } catch {}

  return (
    <>
      <Navbar />
      <main>
        <div style={{ background: "var(--bg)" }}>
          <div className="max-w-[1280px] mx-auto px-12 pt-20 pb-8">
            <div className="section-tag">Blog & Insights</div>
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight mb-4">
              Góc nhìn từ<br/><span style={{ color: "var(--blue)" }}>thực chiến Ecom.</span>
            </h1>
            <p className="text-[0.95rem] max-w-lg" style={{ color: "var(--muted)" }}>
              Chia sẻ về Performance Marketing, Team Building, và cách tư duy trong thị trường TMĐT Việt Nam.
            </p>
          </div>
        </div>

        <div style={{ background: "white" }}>
          <div className="max-w-[1280px] mx-auto px-12 py-16">
            {posts.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "var(--blue-sky)" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <h3 className="text-[1.1rem] font-bold mb-2">Bài viết đang được chuẩn bị</h3>
                <p className="text-[0.88rem]" style={{ color: "var(--muted)" }}>
                  Sắp có — theo dõi LinkedIn để cập nhật sớm nhất.
                </p>
                <a href="https://www.linkedin.com/in/duc-quang-nguyen-b7495223a/" target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 text-white font-semibold text-[0.88rem] px-5 py-2.5 rounded-lg mt-6 transition-all hover:-translate-y-0.5"
                  style={{ background: "var(--blue)" }}>
                  Theo dõi LinkedIn →
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.map((post: any) => (
                  <Link key={post._id} href={`/blog/${post.slug.current}`}
                    className="group bg-white rounded-2xl border overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl"
                    style={{ border: "1px solid var(--border)" }}>
                    <div className="aspect-[16/9] bg-gradient-to-br from-blue-sky to-blue-soft flex items-center justify-center"
                      style={{ background: "var(--blue-sky)" }}>
                      {post.coverImage ? (
                        <img src={urlFor(post.coverImage).width(600).height(338).url()} alt={post.title} className="w-full h-full object-cover"/>
                      ) : (
                        <span className="text-[0.72rem] font-bold uppercase tracking-widest" style={{ color: "var(--blue)" }}>{post.category || "Insights"}</span>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[0.72rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                          style={{ background: "var(--blue-sky)", color: "var(--blue)" }}>
                          {post.category || "Ecom"}
                        </span>
                        {post.readTime && <span className="text-[0.72rem]" style={{ color: "var(--muted)" }}>{post.readTime} phút đọc</span>}
                      </div>
                      <h2 className="text-[1rem] font-bold mb-2 leading-snug group-hover:text-blue-600 transition-colors">{post.title}</h2>
                      {post.excerpt && <p className="text-[0.82rem] leading-[1.6] line-clamp-2" style={{ color: "var(--muted)" }}>{post.excerpt}</p>}
                      <div className="mt-4 text-[0.78rem] font-semibold" style={{ color: "var(--blue)" }}>Đọc tiếp →</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
