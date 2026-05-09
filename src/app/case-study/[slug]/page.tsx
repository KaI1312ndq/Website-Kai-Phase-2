import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getCaseStudy, getCaseStudies } from "@/lib/queries";
import { urlFor } from "../../../../sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams() {
  try {
    const list = await getCaseStudies();
    return (list || [])
      .filter((cs: any) => cs?.slug?.current)
      .map((cs: any) => ({ slug: cs.slug.current }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  let cs: any;
  try { cs = await getCaseStudy(slug); } catch {}
  if (!cs) return { title: "Case Study" };
  const title = `${cs.title || cs.brand || "Case Study"} — Case Study`;
  const description = cs.description || `${cs.brand || ""} · ${(cs.platforms || []).join(" · ")}`.trim();
  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      images: cs.coverImage ? [{ url: urlFor(cs.coverImage).width(1200).height(630).url() }] : undefined,
    },
  };
}

const CATEGORY_LABEL: Record<string, string> = {
  performance: "Performance Marketing",
  team: "Team Building",
  strategy: "Ecom Strategy",
};

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  let cs: any;
  try { cs = await getCaseStudy(slug); } catch {}
  if (!cs) notFound();

  // Related — same category, exclude current
  let related: any[] = [];
  try {
    const all = await getCaseStudies();
    related = (all || []).filter((x: any) => x.slug?.current !== slug && x.category === cs.category).slice(0, 3);
  } catch {}

  const cover = cs.coverImage ? urlFor(cs.coverImage).width(1600).height(900).url() : null;
  const platforms: string[] = cs.platforms || [];
  const tags: string[] = cs.tags || [];

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <div className="blob blob-blue blob-anim" style={{ width: 600, height: 600, top: "-15%", left: "-10%" }} />
          <div className="blob blob-purple blob-anim" style={{ width: 500, height: 500, bottom: "-20%", right: "-10%", animationDelay: "3s" }} />

          <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-16 md:pb-24">
            <Link href="/#casestudies" className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium mb-8 transition-colors hover:text-white" style={{ color: "var(--ink-mute)" }}>
              ← Quay lại Case Studies
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-5">
              {cs.category && CATEGORY_LABEL[cs.category] && (
                <span className="wf-badge">{CATEGORY_LABEL[cs.category]}</span>
              )}
              {platforms.map((p) => (
                <span key={p} className="wf-badge-soft text-[0.72rem] px-2.5 py-1 rounded-md" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--line)", color: "var(--ink-soft)" }}>
                  {p}
                </span>
              ))}
            </div>

            <h1 className="t-h1 mb-4 leading-[1.1] text-white max-w-[920px]">
              {cs.title || cs.brand}
            </h1>

            {cs.description && (
              <p className="t-body-lg max-w-[760px] mb-7" style={{ color: "rgba(255,255,255,0.78)" }}>
                {cs.description}
              </p>
            )}

            {/* Headline metric */}
            {cs.headline && (
              <div className="inline-flex items-baseline gap-3 mt-2">
                <div className="text-[clamp(3rem,7vw,5rem)] font-bold tracking-tight leading-none grad-text">
                  {cs.headline}
                </div>
                {cs.headlineLabel && (
                  <div className="text-[1.1rem] font-medium" style={{ color: "var(--ink-mute)" }}>
                    {cs.headlineLabel}
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-8 pt-6 border-t" style={{ borderColor: "var(--line)" }}>
              {cs.brand && (
                <div>
                  <div className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] mb-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>Brand</div>
                  <div className="text-[0.95rem] font-semibold text-white">{cs.brand}</div>
                </div>
              )}
              {cs.role && (
                <div>
                  <div className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] mb-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>Vai trò</div>
                  <div className="text-[0.95rem] font-semibold text-white">{cs.role}</div>
                </div>
              )}
              {cs.award && (
                <div>
                  <div className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] mb-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>Award</div>
                  <div className="text-[0.95rem] font-semibold grad-text">{cs.award}</div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* COVER IMAGE */}
        {cover && (
          <section className="relative">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 -mt-2 mb-12 md:mb-16">
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--line)", boxShadow: "0 24px 60px rgba(5,10,31,0.45)" }}>
                <img src={cover} alt={cs.title || cs.brand || "cover"} className="w-full h-auto block" />
              </div>
            </div>
          </section>
        )}

        {/* BODY */}
        <section className="relative">
          <div className="max-w-[760px] mx-auto px-6 md:px-10 py-8 md:py-12">
            <div className="prose-ndq">
              {cs.body ? (
                <PortableText value={cs.body} />
              ) : (
                <p style={{ color: "var(--ink-mute)" }}>
                  Nội dung chi tiết đang được cập nhật. Trong lúc đó, xem thêm các case studies khác bên dưới.
                </p>
              )}
            </div>

            {tags.length > 0 && (
              <div className="mt-10 pt-6 border-t" style={{ borderColor: "var(--line)" }}>
                <div className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>Tags</div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span key={t} className="wf-badge text-[0.75rem]">{t}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 pt-8 border-t flex items-center justify-between flex-wrap gap-4" style={{ borderColor: "var(--line)" }}>
              <Link href="/#casestudies" className="text-[0.88rem] font-semibold transition-colors hover:text-white" style={{ color: "var(--ink-soft)" }}>
                ← Tất cả case studies
              </Link>
              <Link href="/#contact" className="btn btn-primary">
                Làm việc cùng tôi <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* RELATED */}
        {related.length > 0 && (
          <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-32">
              <div className="section-tag">Cùng chủ đề</div>
              <h2 className="t-h2 mb-10 text-white">
                Case studies <span className="grad-text">liên quan.</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {related.map((r: any) => (
                  <Link key={r._id} href={`/case-study/${r.slug.current}`} className="group glass p-6 h-full block">
                    <div className="flex items-center gap-2 mb-4">
                      {r.category && CATEGORY_LABEL[r.category] && (
                        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] grad-text">{CATEGORY_LABEL[r.category]}</span>
                      )}
                    </div>
                    <div className="text-[2rem] font-bold tracking-tight leading-none mb-2 text-white">
                      {r.headline}<span className="grad-text">{r.headlineLabel ? ` ${r.headlineLabel}` : ""}</span>
                    </div>
                    <div className="text-[0.95rem] font-semibold mb-2 text-white tracking-tight">{r.title || r.brand}</div>
                    {r.description && (
                      <div className="text-[0.85rem] leading-[1.65] mb-4" style={{ color: "var(--ink-mute)" }}>
                        {r.description}
                      </div>
                    )}
                    <div className="text-[0.82rem] font-semibold grad-text mt-2">Đọc tiếp →</div>
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
