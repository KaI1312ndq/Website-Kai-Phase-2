import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import Link from "next/link";
import { QUIZZES, QUIZ_CATEGORIES, getQuizzesByCategory } from "@/lib/quiz/compute";
import Icon, { type IconName } from "@/components/icons/Icon";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nguyenducquang.website";

export const metadata: Metadata = {
  title: "Quiz tính cách & kiến thức Marketing - 10 test miễn phí tiếng Việt",
  description: "Bộ 10 quiz tiếng Việt: MBTI, Big Five, Enneagram, EQ, DISC, Dark Triad, Lãnh đạo, Hướng nghiệp Marketing, ROAS knowledge, Content frameworks. Free + chi tiết.",
  alternates: { canonical: "/quiz" },
  openGraph: {
    type: "website",
    title: "Quiz tính cách & Marketing - 10 test miễn phí 2026",
    description: "10 quiz tiếng Việt: tính cách (MBTI/Big Five/Enneagram/EQ/Dark Triad), leadership (DISC/Phong cách lãnh đạo), hướng nghiệp, kiến thức ads. Free 100%.",
    url: `${SITE_URL}/quiz`,
  },
  twitter: { card: "summary_large_image", title: "10 Quiz tiếng Việt - Tính cách + Marketing", description: "MBTI, Big Five, EQ, DISC, Enneagram, Dark Triad, hướng nghiệp - free 100%" },
};

export default function QuizLandingPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Bộ quiz tính cách + Marketing tiếng Việt",
    description: "10 quiz miễn phí: tính cách, leadership, hướng nghiệp, kiến thức Marketing.",
    url: `${SITE_URL}/quiz`,
    numberOfItems: QUIZZES.length,
    itemListElement: QUIZZES.map((q, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/quiz/${q.slug}`,
      name: q.name,
      description: q.shortDescription,
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Quiz", item: `${SITE_URL}/quiz` },
    ],
  };

  // Quizzes uncategorized (legacy) - fallback
  const uncategorized = QUIZZES.filter((q) => !q.quizCategory);

  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

        {/* HERO */}
        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "purple", size: 500, top: "-20%", right: "-5%" },
            { variant: "blue", size: 420, bottom: "-30%", left: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1300px] mx-auto px-6 md:px-10 pt-32 pb-14 md:pt-36 md:pb-20">
            <div className="section-tag">Quiz · {QUIZZES.length} bài · Miễn phí 100%</div>
            <h1 className="t-display tracking-tight mb-5 max-w-[840px] text-white">
              Khám phá<br /><span className="grad-text">bản thân + kỹ năng.</span>
            </h1>
            <p className="t-body-lg max-w-[700px]">
              {QUIZZES.length} quiz tiếng Việt chia làm 4 nhóm: Tính cách bản thân, Leadership, Hướng nghiệp, Kiến thức Marketing. Free 100%, kết quả ngay.
            </p>

            {/* Category quick-jump chips */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              {QUIZ_CATEGORIES.map((cat) => {
                const count = getQuizzesByCategory(cat.slug).length;
                if (count === 0) return null;
                return (
                  <a
                    key={cat.slug}
                    href={`#${cat.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[0.82rem] font-semibold transition-all hover:scale-[1.03]"
                    style={{
                      background: `${cat.color}15`,
                      border: `1px solid ${cat.color}45`,
                      color: cat.color,
                    }}
                  >
                    <Icon name={cat.iconName as IconName} size={16} strokeWidth={2} />
                    {cat.label}
                    <span style={{ opacity: 0.65 }}>· {count}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* CATEGORY SECTIONS */}
        {QUIZ_CATEGORIES.map((category) => {
          const quizzes = getQuizzesByCategory(category.slug);
          if (quizzes.length === 0) return null;

          return (
            <section
              key={category.slug}
              id={category.slug}
              className="relative border-b"
              style={{ borderColor: "var(--line)" }}
            >
              <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-14 md:py-20">
                {/* Category header */}
                <div className="flex items-start gap-4 mb-10">
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl shrink-0"
                    style={{ background: `${category.color}15`, border: `1px solid ${category.color}40`, color: category.color }}
                  >
                    <Icon name={category.iconName as IconName} size={26} strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-1.5"
                      style={{ color: category.color }}
                    >
                      {quizzes.length} bài · Nhóm {quizzes.length === 1 ? "" : ""}
                    </div>
                    <h2 className="text-[1.8rem] md:text-[2.2rem] font-extrabold tracking-tight text-white leading-tight mb-2">
                      {category.label}
                    </h2>
                    <p className="text-[0.95rem] md:text-[1rem] max-w-[720px]" style={{ color: "var(--ink-soft)" }}>
                      {category.longDescription}
                    </p>
                  </div>
                  <Link
                    href={`/quiz/category/${category.slug}`}
                    className="hidden md:inline-flex items-center gap-1.5 text-[0.85rem] font-semibold whitespace-nowrap transition-all hover:gap-2.5"
                    style={{ color: category.color }}
                  >
                    Xem nhóm
                  </Link>
                </div>

                {/* Quiz cards */}
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
                      <h3 className="text-[1.3rem] md:text-[1.45rem] font-bold leading-tight text-white mb-3 group-hover:text-[#7da9ff] transition-colors">
                        {q.name}
                      </h3>
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
          );
        })}

        {/* Fallback: legacy quiz không có category */}
        {uncategorized.length > 0 && (
          <section className="relative border-b" style={{ borderColor: "var(--line)" }}>
            <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-14 md:py-20">
              <h2 className="text-[1.6rem] font-bold text-white mb-8">Khác</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {uncategorized.map((q) => (
                  <Link
                    key={q.slug}
                    href={`/quiz/${q.slug}`}
                    className="group rounded-2xl p-7 md:p-8 transition-all hover:scale-[1.01]"
                    style={{
                      background: `linear-gradient(135deg, ${q.color}14 0%, rgba(122,61,255,0.06) 100%)`,
                      border: `1px solid ${q.color}33`,
                    }}
                  >
                    <h3 className="text-[1.3rem] font-bold leading-tight text-white mb-3">{q.name}</h3>
                    <p className="text-[0.92rem] leading-[1.65]" style={{ color: "var(--ink-soft)" }}>
                      {q.shortDescription}
                    </p>
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
