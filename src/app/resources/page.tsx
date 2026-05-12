import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import Reveal from "@/components/Reveal";
import Icon, { type IconName } from "@/components/icons/Icon";
import ResourceLeadGate from "./ResourceLeadGate";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nguyenducquang.website";

export const metadata: Metadata = {
  title: "Tài liệu miễn phí - Marketing / Ecom cho sinh viên + junior marketer",
  description:
    "Tổng hợp tài liệu miễn phí của Quảng - Salary Benchmark 2026, Career Roadmap, CV Template Marketing, P&L Excel, framework cheatsheet. Cộng với 3 tool + 5 quiz trên site.",
  alternates: { canonical: "/resources" },
  openGraph: {
    type: "website",
    title: "Tài liệu miễn phí · Nguyễn Đức Quảng",
    description: "Salary Benchmark, Career Roadmap, CV Template, P&L Excel + tools + quizzes - tất cả miễn phí.",
    url: `${SITE_URL}/resources`,
  },
};

type Magnet = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  color: string;
  status: "available" | "soon";
  /** Available: file URL to deliver. Soon: undefined  form chỉ thu email, Quảng send sau */
  downloadUrl?: string;
  fileType: string;
  forAudience: string;
};

const MAGNETS: Magnet[] = [
  {
    id: "salary-benchmark-2026",
    title: "Salary Benchmark Marketing/Ecom VN 2026",
    description: "Báo cáo lương chi tiết cho 5 archetype + 4 level (Intern  Manager). Dữ liệu tổng hợp từ 200+ JD + survey alumni.",
    icon: "trending-up",
    color: "#5fffaa",
    status: "soon",
    fileType: "PDF · 24 trang",
    forAudience: "Sinh viên đàm phán lương · Marketer chuyển job · HR build comp",
  },
  {
    id: "career-roadmap-marketing",
    title: "Career Roadmap Marketing 1-3-5 năm",
    description: "Lộ trình kỹ năng + công việc + lương cho từng năm. 5 archetype path: Performance / Content / Brand / Ecom / Growth.",
    icon: "compass",
    color: "#7da9ff",
    status: "soon",
    fileType: "Workbook PDF · 32 trang",
    forAudience: "Sinh viên năm 3-4 · New grad · Marketer mid-junior",
  },
  {
    id: "cv-template-marketing",
    title: "CV Template cho Marketer fresher",
    description: "3 template (ATS-friendly / Visual / Hybrid) + checklist viết bullet đo lường được + 20 câu phỏng vấn thực tế.",
    icon: "clipboard-list",
    color: "#ffd479",
    status: "soon",
    fileType: "Word + PDF · 3 templates",
    forAudience: "Sinh viên năm cuối · New grad apply Marketing/Ecom",
  },
  {
    id: "pnl-template",
    title: "P&L Excel Template gian hàng TMĐT",
    description: "File Excel P&L 5 tầng (Net Revenue  EBITDA) cho TikTok Shop + Shopee. Có sẵn formula, fill số là ra.",
    icon: "tool",
    color: "#a78bff",
    status: "soon",
    fileType: "Excel + 3 video hướng dẫn",
    forAudience: "Seller mới · Marketing assistant · Founder shop nhỏ",
  },
  {
    id: "content-framework-cheatsheet",
    title: "Cheatsheet Content Frameworks",
    description: "1 trang A4 tổng hợp 12 framework: AIDA, PAS, FAB, BAB, Cialdini's 6, StoryBrand SB7, hook 3s TikTok, headline 4Us.",
    icon: "book-open",
    color: "#ff5a72",
    status: "soon",
    fileType: "PDF · 1 trang",
    forAudience: "Content creator · Marketer junior · Copywriter",
  },
  {
    id: "brief-template-pack",
    title: "Brief Template Pack Marketing",
    description: "5 template brief: Campaign brief / Creative brief / Influencer brief / Media plan / Performance report.",
    icon: "layers",
    color: "#22d3ee",
    status: "soon",
    fileType: "Word + Notion · 5 templates",
    forAudience: "Marketer mid-junior · Agency account · Brand manager",
  },
];

// Tools đã có sẵn - link trực tiếp, không cần email gate
const FREE_TOOLS = [
  { title: "Tính phí sàn TikTok & Shopee", href: "/tools/tinh-phi-san", icon: "tool" as IconName, color: "#146ef5" },
  { title: "ROAS Calculator", href: "/tools/roas-calculator", icon: "trending-up" as IconName, color: "#7a3dff" },
  { title: "Mẫu P&L Ecom", href: "/tools/pnl-ecom", icon: "clipboard-list" as IconName, color: "#5fffaa" },
];

// Quizzes
const QUIZZES = [
  { title: "Test Phong Cách Lãnh Đạo", href: "/quiz/phong-cach-lanh-dao", subtitle: "6 phong cách · 15 câu · 5 phút" },
  { title: "Test MBTI 16 Tính Cách", href: "/quiz/mbti", subtitle: "16 kiểu · 70 câu · 15 phút" },
  { title: "Test Hướng Nghiệp Marketing", href: "/quiz/huong-nghiep-marketing", subtitle: "5 archetype · 12 câu · 5 phút" },
  { title: "Test Chỉ Số Quảng Cáo", href: "/quiz/chi-so-quang-cao", subtitle: "30 câu kiến thức · timer 30s/câu" },
  { title: "Test Content Frameworks", href: "/quiz/content-frameworks", subtitle: "30 câu kiến thức · timer 30s/câu" },
];

export default function ResourcesPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: MAGNETS.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "CreativeWork", name: m.title, description: m.description },
    })),
  };

  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

        {/* HERO */}
        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "purple", size: 500, top: "-15%", left: "-5%" },
            { variant: "blue", size: 450, bottom: "-30%", right: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 pt-28 pb-12 md:pt-32 md:pb-16">
            <div className="section-tag">Tài liệu miễn phí</div>
            <h1 className="t-h1 leading-[1.05] text-white mb-4 max-w-[900px]">
              Toàn bộ tài liệu Quảng làm <span className="grad-text">- miễn phí, không spam</span>
            </h1>
            <p className="t-body-lg max-w-[700px] mb-6" style={{ color: "var(--ink-soft)" }}>
              Salary Benchmark, Career Roadmap, CV Template, P&L Excel, Cheatsheet copywriting - cộng với <strong className="text-white">3 tool + 5 quiz</strong> dùng trực tiếp trên site. Quảng làm cho sinh viên + junior marketer thật sự cần.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#downloads" className="px-6 py-3 rounded-xl text-[0.95rem] font-bold text-white" style={{ background: "var(--grad-primary)", boxShadow: "0 8px 24px rgba(20,110,245,0.35)" }}>
                Xem tài liệu tải về 
              </a>
              <a href="#tools" className="px-6 py-3 rounded-xl text-[0.95rem] font-bold" style={{ background: "var(--st-04)", border: "1px solid var(--line)", color: "white" }}>
                Tools + Quizzes
              </a>
            </div>
          </div>
        </section>

        {/* DOWNLOADS */}
        <section id="downloads" className="relative">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20">
            <Reveal>
              <div className="mb-8">
                <div className="section-tag">Tải về</div>
                <h2 className="t-h2 text-white">{MAGNETS.length} tài liệu - nhập email để nhận</h2>
                <p className="text-[0.92rem] mt-2 max-w-[600px]" style={{ color: "var(--ink-mute)" }}>
                  Tài liệu &quot;Sắp ra mắt&quot; bạn vẫn nhập email được - Quảng sẽ gửi ngay khi file ready (1-2 tuần).
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {MAGNETS.map((m) => {
                const isAvailable = m.status === "available";
                return (
                  <div
                    key={m.id}
                    className="rounded-2xl p-6 flex flex-col"
                    style={{
                      background: "var(--st-03)",
                      border: "1px solid var(--line)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${m.color}18`, border: `1px solid ${m.color}40`, color: m.color }}>
                        <Icon name={m.icon} size={20} />
                      </div>
                      <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] px-2 py-1 rounded-md" style={{ background: isAvailable ? "rgba(95,255,170,0.15)" : "rgba(255,212,121,0.15)", color: isAvailable ? "#5fffaa" : "#ffd479", border: `1px solid ${isAvailable ? "rgba(95,255,170,0.4)" : "rgba(255,212,121,0.4)"}` }}>
                        {isAvailable ? "Sẵn sàng" : "Sắp ra mắt"}
                      </span>
                    </div>

                    <h3 className="text-[1.05rem] font-bold text-white leading-tight mb-2">{m.title}</h3>
                    <p className="text-[0.85rem] mb-4 leading-snug" style={{ color: "var(--ink-soft)" }}>{m.description}</p>

                    <div className="flex flex-col gap-1.5 mb-5 text-[0.78rem]" style={{ color: "var(--ink-mute)" }}>
                      <div className="flex items-center gap-1.5">
                        <Icon name="book-open" size={11} />
                        <span>{m.fileType}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <Icon name="user" size={11} />
                        <span className="leading-snug">{m.forAudience}</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <ResourceLeadGate
                        resourceId={m.id}
                        resourceTitle={m.title}
                        buttonLabel={isAvailable ? "Tải miễn phí " : "Đăng ký nhận sớm "}
                        buttonColor={m.color}
                        downloadUrl={m.downloadUrl}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TOOLS + QUIZZES */}
        <section id="tools" className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Tools */}
              <Reveal>
                <div className="section-tag">Tools miễn phí</div>
                <h2 className="t-h2 text-white mb-2">{FREE_TOOLS.length} tool tính toán online</h2>
                <p className="text-[0.9rem] mb-5" style={{ color: "var(--ink-mute)" }}>
                  Tính phí sàn / ROAS / P&L ngay trên trình duyệt - không cần tải, không cần đăng ký.
                </p>
                <ul className="flex flex-col gap-2.5 list-none">
                  {FREE_TOOLS.map((t) => (
                    <li key={t.href}>
                      <Link
                        href={t.href}
                        className="flex items-center gap-3 p-3 rounded-xl transition-colors group"
                        style={{ background: "var(--st-03)", border: "1px solid var(--line)" }}
                      >
                        <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${t.color}18`, border: `1px solid ${t.color}40`, color: t.color }}>
                          <Icon name={t.icon} size={16} />
                        </span>
                        <span className="text-[0.92rem] font-semibold text-white flex-1">{t.title}</span>
                        <Icon name="arrow-right" size={14} color="var(--st-40)" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Quizzes */}
              <Reveal>
                <div className="section-tag">Quiz miễn phí</div>
                <h2 className="t-h2 text-white mb-2">{QUIZZES.length} bài test</h2>
                <p className="text-[0.9rem] mb-5" style={{ color: "var(--ink-mute)" }}>
                  Test phong cách / career / kiến thức - có lưu kết quả + trang chi tiết SEO riêng.
                </p>
                <ul className="flex flex-col gap-2.5 list-none">
                  {QUIZZES.map((q) => (
                    <li key={q.href}>
                      <Link
                        href={q.href}
                        className="flex items-center gap-3 p-3 rounded-xl transition-colors"
                        style={{ background: "var(--st-03)", border: "1px solid var(--line)" }}
                      >
                        <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(20,110,245,0.12)", border: "1px solid rgba(20,110,245,0.22)", color: "#7da9ff" }}>
                          <Icon name="test-tube" size={16} />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-[0.92rem] font-semibold text-white truncate">{q.title}</div>
                          <div className="text-[0.74rem]" style={{ color: "var(--ink-mute)" }}>{q.subtitle}</div>
                        </div>
                        <Icon name="arrow-right" size={14} color="var(--st-40)" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Newsletter teaser */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-20 text-center">
            <Reveal>
              <Icon name="sparkles" size={28} color="#ffd479" />
              <h2 className="t-h2 text-white mt-4 mb-3">Muốn tài liệu mới gửi vào email?</h2>
              <p className="t-body-lg mb-6" style={{ color: "var(--ink-soft)" }}>
                Mỗi 1-2 tuần Quảng làm 1 tài liệu mới (data, framework, template). Đăng ký để nhận sớm hơn 1 tuần so với public.
              </p>
              <Link
                href="/quiz/huong-nghiep-marketing"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[1rem] font-bold text-white"
                style={{ background: "var(--grad-primary)", boxShadow: "0 8px 24px rgba(20,110,245,0.4)" }}
              >
                Làm test hướng nghiệp + nhận newsletter 
              </Link>
              <p className="text-[0.78rem] mt-3" style={{ color: "var(--ink-mute)" }}>
                Hiện newsletter gom qua quiz lead. Email signup riêng sẽ launch khi audience đủ lớn.
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
