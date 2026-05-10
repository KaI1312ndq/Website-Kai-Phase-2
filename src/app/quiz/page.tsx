import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import Link from "next/link";
import { QUIZZES } from "@/lib/quiz/compute";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nguyenducquang.website";

export const metadata: Metadata = {
  title: "Quiz · Trắc nghiệm Tính cách & Lãnh đạo Miễn phí",
  description: "Bộ trắc nghiệm tính cách miễn phí: MBTI 16 kiểu, Phong cách lãnh đạo. Khám phá bản thân và career path phù hợp.",
  alternates: { canonical: "/quiz" },
  openGraph: {
    type: "website",
    title: "Quiz · Trắc nghiệm Tính cách & Lãnh đạo Miễn phí",
    description: "MBTI, Phong cách lãnh đạo, Hướng nghiệp — biết mình rõ hơn trong 5-15 phút.",
  },
};

export default function QuizLandingPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Quiz tính cách miễn phí",
    description: "Bộ trắc nghiệm tính cách MBTI và phong cách lãnh đạo.",
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

  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "purple", size: 500, top: "-20%", right: "-5%" },
            { variant: "blue", size: 420, bottom: "-30%", left: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1300px] mx-auto px-6 md:px-10 pt-32 pb-14 md:pt-36 md:pb-20">
            <div className="section-tag">Quiz · Miễn phí</div>
            <h1 className="t-display tracking-tight mb-5 max-w-[840px] text-white">
              Khám phá<br /><span className="grad-text">tính cách của bạn.</span>
            </h1>
            <p className="t-body-lg max-w-[640px]">
              Bộ trắc nghiệm tính cách và phong cách lãnh đạo — biết mình rõ hơn để chọn nghề, làm việc và phát triển hiệu quả hơn.
            </p>
          </div>
        </section>

        <section className="relative">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {QUIZZES.map((q) => (
                <Link
                  key={q.slug}
                  href={`/quiz/${q.slug}`}
                  className="group rounded-2xl p-7 md:p-8 transition-all hover:scale-[1.01]"
                  style={{
                    background: `linear-gradient(135deg, ${q.color}14 0%, rgba(122,61,255,0.06) 100%)`,
                    border: `1px solid ${q.color}33`,
                  }}
                >
                  <div className="text-[3rem] mb-4">{q.emoji}</div>
                  <h2 className="text-[1.4rem] md:text-[1.5rem] font-bold leading-tight text-white mb-3 group-hover:text-[#7da9ff] transition-colors">
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
                        Cần email/SĐT
                      </span>
                    )}
                  </div>
                  <div className="text-[0.9rem] font-bold flex items-center gap-1.5 group-hover:gap-2.5 transition-all" style={{ color: q.color }}>
                    Bắt đầu test <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
