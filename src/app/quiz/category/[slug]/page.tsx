import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QUIZ_CATEGORIES, getQuizCategory, getQuizzesByCategory } from "@/lib/quiz/compute";
import Icon, { type IconName } from "@/components/icons/Icon";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nguyenducquang.website";

export function generateStaticParams() {
  return QUIZ_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getQuizCategory(slug);
  if (!category) return { title: "Category" };
  return {
    title: category.seoTitle,
    description: category.seoDescription,
    alternates: { canonical: `/quiz/category/${slug}` },
    openGraph: {
      type: "website",
      title: category.seoTitle,
      description: category.seoDescription,
      url: `${SITE_URL}/quiz/category/${slug}`,
    },
    twitter: { card: "summary_large_image", title: category.label, description: category.shortDescription },
  };
}

export default async function QuizCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getQuizCategory(slug);
  if (!category) notFound();

  const quizzes = getQuizzesByCategory(slug);

  // Related categories (same page network)
  const otherCategories = QUIZ_CATEGORIES.filter((c) => c.slug !== slug && getQuizzesByCategory(c.slug).length > 0);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Quiz", item: `${SITE_URL}/quiz` },
      { "@type": "ListItem", position: 3, name: category.label, item: `${SITE_URL}/quiz/category/${slug}` },
    ],
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.label,
    description: category.longDescription,
    url: `${SITE_URL}/quiz/category/${slug}`,
    numberOfItems: quizzes.length,
    itemListElement: quizzes.map((q, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/quiz/${q.slug}`,
      name: q.name,
      description: q.shortDescription,
    })),
  };

  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

        {/* HERO */}
        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "purple", size: 480, top: "-20%", right: "-5%" },
            { variant: "blue", size: 400, bottom: "-30%", left: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1300px] mx-auto px-6 md:px-10 pt-28 pb-12 md:pt-32 md:pb-16">
            <div className="mb-5">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium transition-colors hover:text-white"
                style={{ color: "var(--ink-mute)" }}
              >
                Quay lại tất cả Quiz
              </Link>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shrink-0"
                style={{ background: `${category.color}18`, border: `1px solid ${category.color}45`, color: category.color }}
              >
                <Icon name={category.iconName as IconName} size={32} strokeWidth={1.8} />
              </div>
              <div>
                <div
                  className="text-[0.72rem] font-bold uppercase tracking-[0.16em] mb-1.5"
                  style={{ color: category.color }}
                >
                  Nhóm Quiz · {quizzes.length} bài
                </div>
                <h1 className="t-h1 text-white tracking-tight">{category.label}</h1>
              </div>
            </div>
            <p className="t-body-lg max-w-[720px]" style={{ color: "var(--ink-soft)" }}>
              {category.longDescription}
            </p>
          </div>
        </section>

        {/* QUIZ CARDS */}
        <section className="relative">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-14 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quizzes.map((q) => (
                <Link
                  key={q.slug}
                  href={`/quiz/${q.slug}`}
                  className="group rounded-2xl p-7 md:p-8 transition-all hover:scale-[1.01]"
                  style={{
                    background: `linear-gradient(135deg, ${q.color}14 0%, rgba(122,61,255,0.06) 100%)`,
                    border: `1px solid ${q.color}33`,
                  }}
                >
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4"
                    style={{ background: `${q.color}15`, border: `1px solid ${q.color}40`, color: q.color }}
                  >
                    <Icon name={q.iconName as IconName} size={28} strokeWidth={1.8} />
                  </div>
                  <h2 className="text-[1.3rem] md:text-[1.45rem] font-bold leading-tight text-white mb-3 group-hover:text-[#7da9ff] transition-colors">
                    {q.name}
                  </h2>
                  <p className="text-[0.92rem] leading-[1.65] mb-5" style={{ color: "var(--ink-soft)" }}>
                    {q.shortDescription}
                  </p>
                  <div className="flex items-center gap-4 mb-5 flex-wrap">
                    <span className="text-[0.78rem] font-semibold" style={{ color: q.color }}>
                      {q.questionCount} câu · ~{q.estimatedMinutes} phút
                    </span>
                    {q.gateResult && (
                      <span className="text-[0.7rem] font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded-md" style={{ background: "rgba(255,212,121,0.15)", color: "#ffd479", border: "1px solid rgba(255,212,121,0.3)" }}>
                        Cần email
                      </span>
                    )}
                  </div>
                  <div className="text-[0.9rem] font-bold flex items-center gap-1.5 group-hover:gap-2.5 transition-all" style={{ color: q.color }}>
                    Bắt đầu test
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* OTHER CATEGORIES */}
        {otherCategories.length > 0 && (
          <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
            <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-14 md:py-20">
              <div className="section-tag">Nhóm Quiz khác</div>
              <h2 className="t-h2 mb-10 text-white">Khám phá <span className="grad-text">tiếp.</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {otherCategories.map((c) => {
                  const count = getQuizzesByCategory(c.slug).length;
                  return (
                    <Link
                      key={c.slug}
                      href={`/quiz/category/${c.slug}`}
                      className="group rounded-2xl p-6 transition-all hover:scale-[1.02]"
                      style={{
                        background: `linear-gradient(135deg, ${c.color}12 0%, var(--st-03) 100%)`,
                        border: `1px solid ${c.color}33`,
                      }}
                    >
                      <div
                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3"
                        style={{ background: `${c.color}15`, border: `1px solid ${c.color}40`, color: c.color }}
                      >
                        <Icon name={c.iconName as IconName} size={24} strokeWidth={1.8} />
                      </div>
                      <h3 className="text-[1.1rem] font-bold text-white mb-2 group-hover:text-[#7da9ff] transition-colors">
                        {c.label} <span style={{ color: c.color, fontWeight: 600 }}>· {count}</span>
                      </h3>
                      <p className="text-[0.85rem] leading-[1.6]" style={{ color: "var(--ink-soft)" }}>
                        {c.shortDescription}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
