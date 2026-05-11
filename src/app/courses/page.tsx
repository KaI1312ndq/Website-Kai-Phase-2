import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import Reveal from "@/components/Reveal";
import Icon, { type IconName } from "@/components/icons/Icon";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nguyenducquang.website";

export const metadata: Metadata = {
  title: "Khoá học — Marketing / Ecom cho sinh viên + junior marketer",
  description:
    "Khoá Ecom Foundation cohort + mini courses self-paced về TikTok Ads, Shopee Performance, P&L gian hàng. Học từ thực chiến — đầu ra cụ thể, không lý thuyết suông.",
  alternates: { canonical: "/courses" },
  openGraph: {
    type: "website",
    title: "Khoá học của Nguyễn Đức Quảng",
    description: "Ecom Foundation cohort + mini courses cho sinh viên + junior marketer.",
    url: `${SITE_URL}/courses`,
  },
};

type Course = {
  id: string;
  slug?: string;
  title: string;
  subtitle: string;
  format: "Cohort" | "Self-paced" | "Lớp offline" | "Workshop";
  duration: string;
  price: string;
  audience: string;
  highlights: string[];
  color: string;
  icon: IconName;
  status: "available" | "soon" | "waitlist";
  href: string;
  cta: string;
};

const COURSES: Course[] = [
  {
    id: "ecom-foundation",
    slug: "ecom-foundation",
    title: "Khoá Ecom Foundation",
    subtitle: "Cohort 8 tuần — từ 0 đến Marketing Manager Ecom",
    format: "Cohort",
    duration: "8 tuần · live online + recording",
    price: "Cohort 1 — apply để biết giá",
    audience: "Sinh viên năm cuối + new joiner muốn vào Marketing/Ecom + chủ shop nhỏ tự chạy",
    highlights: [
      "11 module thực chiến: tư duy đa sàn → setup → traffic → ads → plan IMC → P&L",
      "1 brand thật + dataset thật để làm bài tập + final project P&L 12 tháng",
      "Direct feedback từ Quảng + alumni Slack community",
      "Outcome: portfolio P&L + brief campaign mang đi phỏng vấn",
    ],
    color: "#146ef5",
    icon: "graduation-cap",
    status: "available",
    href: "/ecom-foundation",
    cta: "Xem chi tiết & apply",
  },
  {
    id: "tiktok-ads",
    title: "TikTok Ads từ A→Z",
    subtitle: "Mini course self-paced cho junior marketer",
    format: "Self-paced",
    duration: "15 video · ~4-6h tổng",
    price: "499.000đ",
    audience: "Marketer fresher + chủ shop muốn tự chạy TikTok Ads không qua agency",
    highlights: [
      "Setup TikTok Ads Manager + Business Center từ 0",
      "Cấu trúc campaign · target audience · bidding · creative testing",
      "Phân tích metric ROAS, CIR, CPM — biết khi nào scale, khi nào pause",
      "Case study 3 brand thực: FMCG, Beauty, Tech",
    ],
    color: "#ff5a72",
    icon: "trending-up",
    status: "soon",
    href: "#waitlist",
    cta: "Đăng ký waitlist",
  },
  {
    id: "shopee-performance",
    title: "Shopee Performance trong 14 ngày",
    subtitle: "Mini course self-paced",
    format: "Self-paced",
    duration: "12 video · ~4h",
    price: "399.000đ",
    audience: "Seller mới + Marketing assistant đang quản gian hàng Shopee",
    highlights: [
      "Setup gian hàng + xếp hạng category + chính sách Shopee Mall",
      "Shopee Ads — Discovery vs Search · bidding strategy",
      "Optimize listing: title · image · description theo Shopee algorithm",
      "Voucher · Flash Sale · Live · KOL Affiliate — khi nào dùng cái nào",
    ],
    color: "#ee4d2d",
    icon: "tool",
    status: "soon",
    href: "#waitlist",
    cta: "Đăng ký waitlist",
  },
  {
    id: "pnl-for-newbie",
    title: "P&L gian hàng cho người mới",
    subtitle: "Mini course self-paced — đọc + làm được P&L",
    format: "Self-paced",
    duration: "8 video · ~2h",
    price: "299.000đ",
    audience: "Marketer + seller mới — chưa biết đọc/làm P&L mà cần để đàm phán KPI",
    highlights: [
      "Net Revenue → Gross → Contribution → Marketing → EBITDA: từng tầng nghĩa là gì",
      "Phân biệt phí sàn cố định vs variable · cost mở rộng kênh",
      "Excel template kèm theo — fill số là ra ngay",
      "Áp dụng trên 2 case TikTok Shop + Shopee thực tế",
    ],
    color: "#5fffaa",
    icon: "clipboard-list",
    status: "soon",
    href: "#waitlist",
    cta: "Đăng ký waitlist",
  },
  {
    id: "career-marketing",
    title: "MBTI x Career — Chọn nghề Marketing đúng",
    subtitle: "Mini course self-paced cho sinh viên + new grad",
    format: "Self-paced",
    duration: "10 video · ~3h",
    price: "299.000đ",
    audience: "Sinh viên năm 3-4 + new grad chưa biết chọn nhánh nào trong Marketing/Ecom",
    highlights: [
      "5 archetype career trong Marketing/Ecom Việt Nam — bạn fit cái nào",
      "Lương + lộ trình thăng tiến 1-3-5 năm theo từng archetype",
      "Skill cần học (110 skills framework) — ưu tiên gì cho 6 tháng đầu",
      "CV template + interview question theo từng nhánh",
    ],
    color: "#a78bff",
    icon: "compass",
    status: "soon",
    href: "#waitlist",
    cta: "Đăng ký waitlist",
  },
  {
    id: "workshop-hn",
    title: "Workshop Offline — Ecom Foundation 1 ngày",
    subtitle: "Lớp hybrid 6h tại Hà Nội cho sinh viên + chủ shop",
    format: "Lớp offline",
    duration: "6 giờ · 1 ngày · max 30 người",
    price: "990.000đ (early bird) — 1.500.000đ",
    audience: "Sinh viên Hà Nội + chủ shop nhỏ muốn networking + học nhanh trong 1 ngày",
    highlights: [
      "9:00 — 12:00: Tư duy đa sàn + Setup gian hàng + Traffic flow",
      "13:00 — 16:00: TikTok Ads + Shopee Ads + Live Q&A",
      "Bộ tài liệu in + flash drive tài liệu mở rộng",
      "Networking + chụp ảnh tập thể + Quảng 1-1 mini 15 phút mỗi người",
    ],
    color: "#ffd479",
    icon: "users",
    status: "soon",
    href: "#waitlist",
    cta: "Đăng ký waitlist",
  },
];

const FAQS = [
  {
    q: "Khoá Cohort Ecom Foundation và Mini Course self-paced khác gì?",
    a: "Cohort = 8 tuần học live cùng 1 nhóm 30 người, có bài tập + final project + Slack community + feedback trực tiếp từ Quảng. Mini course = video tự học, không có deadline, giá rẻ hơn 5-10 lần. Cohort sâu hơn nhưng cần commit thời gian. Mini course phù hợp người muốn unblock 1 kỹ năng cụ thể.",
  },
  {
    q: "Tôi là sinh viên năm 3, chưa từng làm Marketing, học được không?",
    a: "Khoá Ecom Foundation thiết kế cho người MỚI — không yêu cầu kiến thức nền. Mini courses tuỳ topic: TikTok Ads / Shopee Performance / P&L cần biết 1 chút Marketing cơ bản; MBTI x Career thì không yêu cầu gì.",
  },
  {
    q: "Học xong có việc làm không?",
    a: "Quảng không guarantee job — bạn vẫn phải tự apply + phỏng vấn. NHƯNG outcome của khoá là bạn có: (1) Portfolio P&L thực tế + brief campaign + final project mang đi phỏng vấn, (2) Network alumni đã đi làm tại brand/agency, (3) Letter of recommendation từ Quảng nếu hoàn thành tốt. 70% học viên Khoá 1 đã apply được job Marketing/Ecom trong 3 tháng sau khi học xong.",
  },
  {
    q: "Bao giờ Mini Courses ra mắt?",
    a: "Theo roadmap: TikTok Ads + P&L cho người mới ra trước (dự kiến Q2/Q3 2026), Shopee Performance + Career theo sau. Đăng ký waitlist để nhận thông báo + early bird discount 30%.",
  },
  {
    q: "Hoàn tiền nếu không học được?",
    a: "Cohort: hoàn 100% nếu rút trong 7 ngày đầu (chưa qua module 2). Mini courses self-paced: hoàn 100% trong 14 ngày nếu xem chưa đến 30% video. Sau đó không hoàn vì sản phẩm số.",
  },
];

const STATUS_META: Record<Course["status"], { label: string; color: string }> = {
  available: { label: "Đang mở", color: "#5fffaa" },
  soon: { label: "Sắp ra mắt", color: "#ffd479" },
  waitlist: { label: "Đầy slot — waitlist", color: "#7da9ff" },
};

export default function CoursesPage() {
  const courseListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: COURSES.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: c.title,
        description: c.subtitle,
        provider: { "@type": "Person", name: "Nguyễn Đức Quảng", url: SITE_URL },
        url: c.href.startsWith("/") ? `${SITE_URL}${c.href}` : c.href,
      },
    })),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

        {/* HERO */}
        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "blue", size: 500, top: "-15%", right: "-5%" },
            { variant: "purple", size: 450, bottom: "-30%", left: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 pt-28 pb-12 md:pt-32 md:pb-16">
            <div className="section-tag">Khoá học</div>
            <h1 className="t-h1 leading-[1.05] text-white mb-4 max-w-[900px]">
              Học Marketing / Ecom <span className="grad-text">từ thực chiến — không lý thuyết suông</span>
            </h1>
            <p className="t-body-lg max-w-[700px] mb-6" style={{ color: "var(--ink-soft)" }}>
              Cohort Ecom Foundation 8 tuần + mini courses self-paced + workshop offline tại Hà Nội. Thiết kế cho <strong className="text-white">sinh viên năm cuối / new joiner / junior marketer</strong> muốn vào ngành Marketing/Ecom Việt Nam một cách đúng đắn.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#courses" className="px-6 py-3 rounded-xl text-[0.95rem] font-bold text-white" style={{ background: "var(--grad-primary)", boxShadow: "0 8px 24px rgba(20,110,245,0.35)" }}>
                Xem toàn bộ khoá học →
              </a>
              <Link href="/quiz/huong-nghiep-marketing" className="px-6 py-3 rounded-xl text-[0.95rem] font-bold" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--line)", color: "white" }}>
                Test hướng nghiệp trước
              </Link>
            </div>
          </div>
        </section>

        {/* COURSES GRID */}
        <section id="courses" className="relative">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                <div>
                  <div className="section-tag">Khoá học hiện có</div>
                  <h2 className="t-h2 text-white">{COURSES.length} chương trình · {COURSES.filter((c) => c.status === "available").length} đang mở</h2>
                </div>
                <p className="t-body max-w-[420px]" style={{ color: "var(--ink-mute)" }}>
                  Không chắc nên học cái nào? Làm <Link href="/quiz/huong-nghiep-marketing" className="underline" style={{ color: "#7da9ff" }}>Test hướng nghiệp</Link> trước — Quảng đề xuất khoá phù hợp.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {COURSES.map((c) => {
                const status = STATUS_META[c.status];
                const isAvailable = c.status === "available";
                return (
                  <div
                    key={c.id}
                    className="rounded-2xl p-6 md:p-7 flex flex-col"
                    style={{
                      background: isAvailable ? `${c.color}08` : "rgba(255,255,255,0.025)",
                      border: `1px solid ${isAvailable ? c.color + "55" : "var(--line)"}`,
                      boxShadow: isAvailable ? `0 8px 30px ${c.color}15` : "none",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${c.color}18`, border: `1px solid ${c.color}40`, color: c.color }}>
                        <Icon name={c.icon} size={20} />
                      </div>
                      <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] px-2 py-1 rounded-md flex-shrink-0" style={{ background: `${status.color}15`, color: status.color, border: `1px solid ${status.color}40` }}>
                        {status.label}
                      </span>
                    </div>

                    <h3 className="text-[1.25rem] font-extrabold text-white leading-tight mb-1.5">{c.title}</h3>
                    <p className="text-[0.88rem] font-semibold mb-3" style={{ color: c.color }}>{c.subtitle}</p>

                    <div className="flex flex-wrap gap-2 mb-4 text-[0.74rem]">
                      <span className="px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.75)" }}>{c.format}</span>
                      <span className="px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.75)" }}>{c.duration}</span>
                    </div>

                    <div className="text-[0.72rem] font-bold uppercase tracking-[0.14em] mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>Phù hợp với</div>
                    <p className="text-[0.84rem] mb-4 leading-snug" style={{ color: "rgba(255,255,255,0.82)" }}>{c.audience}</p>

                    <div className="text-[0.72rem] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Bạn sẽ học được</div>
                    <ul className="flex flex-col gap-1.5 mb-5 list-none">
                      {c.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-[0.84rem]" style={{ color: "rgba(255,255,255,0.88)" }}>
                          <Icon name="check" size={12} color="#5fffaa" strokeWidth={3} />
                          <span className="leading-snug">{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-4 flex items-end justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <div>
                        <div className="text-[0.7rem] uppercase tracking-[0.14em] font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>Học phí</div>
                        <div className="text-[1.1rem] font-extrabold text-white mt-0.5">{c.price}</div>
                      </div>
                      {isAvailable ? (
                        <Link
                          href={c.href}
                          className="text-[0.85rem] font-bold px-4 py-2.5 rounded-lg text-white"
                          style={{ background: c.color === "#146ef5" ? "var(--grad-primary)" : c.color, boxShadow: `0 4px 14px ${c.color}50` }}
                        >
                          {c.cta} →
                        </Link>
                      ) : (
                        <a
                          href={`#waitlist`}
                          className="text-[0.85rem] font-bold px-4 py-2.5 rounded-lg"
                          style={{ background: `${c.color}15`, border: `1px solid ${c.color}40`, color: c.color }}
                        >
                          {c.cta}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WAITLIST CTA */}
        <section id="waitlist" className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[800px] mx-auto px-6 md:px-10 py-16 md:py-20 text-center">
            <Reveal>
              <div className="section-tag mx-auto">Waitlist</div>
              <h2 className="t-h2 text-white mb-3">Đăng ký nhận thông báo + early bird 30%</h2>
              <p className="t-body-lg mb-7" style={{ color: "var(--ink-soft)" }}>
                Mini courses ra mắt là bạn được email thông báo đầu tiên + mã giảm 30%. Không spam, hủy bất cứ lúc nào.
              </p>
              <Link
                href="/quiz/huong-nghiep-marketing"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[1rem] font-bold text-white"
                style={{ background: "var(--grad-primary)", boxShadow: "0 8px 24px rgba(20,110,245,0.4)" }}
              >
                Làm test hướng nghiệp + đăng ký →
              </Link>
              <p className="text-[0.78rem] mt-4" style={{ color: "var(--ink-mute)" }}>
                Hiện waitlist gom qua form test (5 phút). Sẽ có signup form riêng khi mini courses chính thức launch.
              </p>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[860px] mx-auto px-6 md:px-10 py-16 md:py-20">
            <Reveal>
              <div className="text-center mb-10">
                <div className="section-tag mx-auto">FAQ</div>
                <h2 className="t-h2 text-white">Câu hỏi thường gặp</h2>
              </div>
            </Reveal>
            <div className="flex flex-col gap-3">
              {FAQS.map((f, i) => (
                <details key={i} className="group rounded-xl p-5" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
                  <summary className="flex items-center justify-between cursor-pointer text-[0.98rem] font-semibold text-white">
                    {f.q}
                    <span className="text-[1.2rem] transition-transform group-open:rotate-45" style={{ color: "#7da9ff" }}>+</span>
                  </summary>
                  <p className="mt-3 text-[0.9rem] leading-[1.7]" style={{ color: "var(--ink-soft)" }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
