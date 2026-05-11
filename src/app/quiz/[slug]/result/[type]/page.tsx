import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuiz, getQuizArchetypes, QUIZZES } from "@/lib/quiz/compute";
import ShareButtons from "@/components/blog/ShareButtons";
import Icon from "@/components/icons/Icon";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nguyenducquang.website";

const DICH_LABELS: Record<string, string> = {
  E: "Hướng ngoại", I: "Hướng nội",
  S: "Giác quan", N: "Trực giác",
  T: "Lý trí", F: "Cảm xúc",
  J: "Nguyên tắc", P: "Linh hoạt",
};

export function generateStaticParams() {
  const params: Array<{ slug: string; type: string }> = [];
  for (const quiz of QUIZZES) {
    const archetypes = getQuizArchetypes(quiz.slug);
    for (const a of archetypes) params.push({ slug: quiz.slug, type: a.id });
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; type: string }> }): Promise<Metadata> {
  const { slug, type } = await params;
  const quiz = getQuiz(slug);
  const archetype = getQuizArchetypes(slug).find((a) => a.id === type);
  if (!quiz || !archetype) return { title: "Kết quả Quiz" };

  const title = `${archetype.name} - ${quiz.name} | Phân tích chi tiết`;
  const description = `${archetype.tagline}. ${archetype.description[0].slice(0, 140)}...`;

  return {
    title,
    description,
    alternates: { canonical: `/quiz/${slug}/result/${type}` },
    openGraph: {
      type: "article",
      locale: "vi_VN",
      title,
      description,
      url: `${SITE_URL}/quiz/${slug}/result/${type}`,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function QuizResultPage({ params }: { params: Promise<{ slug: string; type: string }> }) {
  const { slug, type } = await params;
  const quiz = getQuiz(slug);
  const archetype = getQuizArchetypes(slug).find((a) => a.id === type);
  if (!quiz || !archetype) notFound();

  const pageUrl = `${SITE_URL}/quiz/${slug}/result/${type}`;

  // For MBTI, derive dichotomy display from type letters
  const isMBTI = quiz.scoringType === "mbti" && type.length === 4;
  const mbtiLetters = isMBTI ? type.split("") : [];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: archetype.name,
    description: archetype.description[0],
    url: pageUrl,
    inLanguage: "vi-VN",
    author: { "@type": "Person", name: "Nguyễn Đức Quảng", url: SITE_URL },
    publisher: { "@type": "Person", name: "Nguyễn Đức Quảng" },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Quiz", item: `${SITE_URL}/quiz` },
      { "@type": "ListItem", position: 3, name: quiz.name, item: `${SITE_URL}/quiz/${slug}` },
      { "@type": "ListItem", position: 4, name: archetype.name, item: pageUrl },
    ],
  };

  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

        {/* HERO */}
        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "purple", size: 500, top: "-20%", left: "-5%" },
            { variant: "blue", size: 420, bottom: "-30%", right: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-28 pb-12 md:pt-32 md:pb-16">
            <div className="mb-5">
              <Link href={`/quiz/${slug}`} className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium transition-colors hover:text-white" style={{ color: "var(--ink-mute)" }}>
                ← {quiz.name}
              </Link>
            </div>

            <div
              className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${archetype.color}18 0%, rgba(122,61,255,0.10) 100%)`,
                border: `1px solid ${archetype.color}55`,
              }}
            >
              <div className="text-[0.7rem] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: archetype.color }}>
                {quiz.name}
              </div>
              <h1 className="text-[2rem] md:text-[3rem] font-extrabold leading-[1.05] tracking-tight text-white mb-4">
                {archetype.name}
              </h1>
              <p className="text-[1rem] md:text-[1.1rem] font-semibold" style={{ color: archetype.color }}>
                {archetype.tagline}
              </p>

              {isMBTI && (
                <div className="mt-7 grid grid-cols-4 gap-3 max-w-[480px]">
                  {mbtiLetters.map((letter) => (
                    <div key={letter} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}>
                      <div className="text-[1.6rem] font-extrabold leading-none mb-1" style={{ color: archetype.color }}>{letter}</div>
                      <div className="text-[0.66rem] font-semibold uppercase tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.5)" }}>{DICH_LABELS[letter]}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* BODY */}
        <section className="relative">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 xl:gap-14">
              <article className="min-w-0 flex flex-col gap-7">
                {/* Description */}
                <div className="rounded-2xl p-6 md:p-8" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
                  <h2 className="text-[1.25rem] font-bold text-white mb-4">Bạn là ai?</h2>
                  <div className="flex flex-col gap-3">
                    {archetype.description.map((p, i) => (
                      <p key={i} className="text-[0.95rem] leading-[1.75]" style={{ color: "var(--ink-soft)" }}>{p}</p>
                    ))}
                  </div>
                </div>

                {/* Strengths + Weaknesses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="rounded-2xl p-6" style={{ background: "rgba(95,255,170,0.05)", border: "1px solid rgba(95,255,170,0.2)" }}>
                    <div className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: "#5fffaa" }}>
                      <Icon name="check" size={14} strokeWidth={2.5} />
                      <span>Điểm mạnh</span>
                    </div>
                    <ul className="flex flex-col gap-2 list-none">
                      {archetype.strengths.map((s) => (
                        <li key={s} className="text-[0.9rem] flex items-start gap-2" style={{ color: "rgba(255,255,255,0.9)" }}>
                          <span style={{ color: "#5fffaa" }}>•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl p-6" style={{ background: "rgba(255,212,121,0.05)", border: "1px solid rgba(255,212,121,0.22)" }}>
                    <div className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: "#ffd479" }}>
                      <Icon name="alert-triangle" size={14} />
                      <span>Cần lưu ý</span>
                    </div>
                    <ul className="flex flex-col gap-2 list-none">
                      {archetype.weaknesses.map((s) => (
                        <li key={s} className="text-[0.9rem] flex items-start gap-2" style={{ color: "rgba(255,255,255,0.9)" }}>
                          <span style={{ color: "#ffd479" }}>•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Context */}
                <div className="rounded-2xl p-6 md:p-8" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
                  <h2 className="text-[1.1rem] font-bold text-white mb-4">
                    {quiz.scoringType === "leadership" ? "Phù hợp nhất với" : quiz.scoringType === "career" ? "Career path + Lương VN" : "Công việc phù hợp"}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {archetype.context.map((c) => (
                      <span key={c} className="text-[0.85rem] px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.85)" }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Advice */}
                {archetype.advice && archetype.advice.length > 0 && (
                  <div className="rounded-2xl p-6 md:p-8" style={{ background: `${archetype.color}10`, border: `1px solid ${archetype.color}33` }}>
                    <h2 className="flex items-center gap-2 text-[1.1rem] font-bold text-white mb-4">
                      <Icon name="lightbulb" size={20} color={archetype.color} />
                      <span>Lời khuyên cân bằng</span>
                    </h2>
                    <ul className="flex flex-col gap-2 list-none">
                      {archetype.advice.map((a) => (
                        <li key={a} className="text-[0.92rem] leading-[1.6] flex items-start gap-2.5" style={{ color: "var(--ink-soft)" }}>
                          <span style={{ color: archetype.color }}></span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Share */}
                <div>
                  <ShareButtons url={pageUrl} title={`${archetype.name} - ${quiz.name}`} />
                </div>

                {/* Retake CTA */}
                <div className="rounded-2xl p-6 md:p-8 text-center" style={{ background: "linear-gradient(135deg, rgba(20,110,245,0.10) 0%, rgba(122,61,255,0.10) 100%)", border: "1px solid rgba(20,110,245,0.28)" }}>
                  <p className="text-[0.95rem] mb-4" style={{ color: "rgba(255,255,255,0.85)" }}>
                    Đây là kết quả {archetype.name} - bạn có muốn tự làm bài test để kiểm tra mình không?
                  </p>
                  <Link href={`/quiz/${slug}`} className="btn btn-primary">
                    Làm bài test ngay
                  </Link>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:sticky lg:top-24 flex flex-col gap-5 self-start">
                <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
                  <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Các kiểu khác
                  </div>
                  <div className="flex flex-col gap-2">
                    {getQuizArchetypes(slug).filter((a) => a.id !== type).slice(0, 8).map((a) => (
                      <Link
                        key={a.id}
                        href={`/quiz/${slug}/result/${a.id}`}
                        className="flex items-center gap-3 p-2.5 rounded-lg transition-all hover:bg-white/5"
                        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                      >
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: a.color }} />
                        <span className="text-[0.84rem] font-medium text-white">{a.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl p-5" style={{ background: "linear-gradient(135deg, rgba(20,110,245,0.18) 0%, rgba(122,61,255,0.18) 100%)", border: "1px solid rgba(20,110,245,0.32)" }}>
                  <div className="text-[0.66rem] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: "#7da9ff" }}>
                    Khoá học
                  </div>
                  <div className="text-[1rem] font-bold mb-2 leading-tight text-white">
                    Ecom Foundation
                  </div>
                  <p className="text-[0.82rem] leading-[1.55] mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>
                    12 buổi build P&L thực chiến + scale shop từ 60+ project.
                  </p>
                  <Link href="/ecom-foundation" className="block w-full text-center py-2.5 rounded-lg text-[0.85rem] font-bold"
                    style={{ background: "var(--grad-primary)", color: "white" }}>
                    Xem khoá học 
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
