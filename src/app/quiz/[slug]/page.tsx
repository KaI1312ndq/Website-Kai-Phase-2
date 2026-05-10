import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuiz, getQuizQuestions, getQuizArchetypes, QUIZZES } from "@/lib/quiz/compute";
import QuizRunner from "@/components/quiz/QuizRunner";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nguyenducquang.website";

export function generateStaticParams() {
  return QUIZZES.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getQuiz(slug);
  if (!quiz) return { title: "Quiz" };
  return {
    title: `${quiz.name} — Trắc nghiệm miễn phí`,
    description: quiz.longDescription,
    alternates: { canonical: `/quiz/${slug}` },
    openGraph: {
      type: "website",
      title: `${quiz.name} — Trắc nghiệm miễn phí`,
      description: quiz.shortDescription,
      url: `${SITE_URL}/quiz/${slug}`,
    },
    twitter: { card: "summary_large_image", title: quiz.name, description: quiz.shortDescription },
  };
}

export default async function QuizDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = getQuiz(slug);
  if (!quiz) notFound();

  const questions = getQuizQuestions(slug);
  const archetypes = getQuizArchetypes(slug);

  const quizLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: quiz.name,
    description: quiz.longDescription,
    url: `${SITE_URL}/quiz/${slug}`,
    educationalLevel: "general",
    numberOfQuestions: quiz.questionCount,
    inLanguage: "vi-VN",
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Quiz", item: `${SITE_URL}/quiz` },
      { "@type": "ListItem", position: 3, name: quiz.name, item: `${SITE_URL}/quiz/${slug}` },
    ],
  };

  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "purple", size: 500, top: "-20%", left: "-5%" },
            { variant: "blue", size: 420, bottom: "-30%", right: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-28 pb-10 md:pt-32 md:pb-14">
            <div className="mb-5">
              <Link href="/quiz" className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium transition-colors hover:text-white" style={{ color: "var(--ink-mute)" }}>
                ← Tất cả Quiz
              </Link>
            </div>
            <div className="section-tag">Quiz · Miễn phí</div>
            <h1 className="t-h1 leading-[1.1] text-white max-w-[820px]">{quiz.name}</h1>
          </div>
        </section>

        <section className="relative">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-12 md:py-16">
            <QuizRunner config={quiz} questions={questions} archetypes={archetypes} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
