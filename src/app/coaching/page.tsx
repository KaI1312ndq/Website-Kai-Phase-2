import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import Reveal from "@/components/Reveal";
import Icon, { type IconName } from "@/components/icons/Icon";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nguyenducquang.website";

export const metadata: Metadata = {
  title: "Coaching 1-1 & Group — Mentor cho Marketer / Founder Ecom",
  description:
    "Coaching 1-1 hoặc Group 6-8 người cho founder Ecom + Marketing Manager đang scale gian hàng 1-10 tỷ/tháng. P&L review, Growth strategy, Team building. Booking qua application form.",
  alternates: { canonical: "/coaching" },
  openGraph: {
    type: "website",
    title: "Coaching 1-1 & Group — Nguyễn Đức Quảng",
    description: "Coaching cho founder Ecom + Marketing Manager — P&L, Growth, Team Building.",
    url: `${SITE_URL}/coaching`,
  },
};

const TIERS: Tier[] = [
  {
    id: "founder-1on1",
    name: "Founder / CEO Coaching",
    tagline: "1-1 cho founder Ecom đang scale 1-10 tỷ/tháng",
    price: "8.000.000đ",
    priceNote: "60-90 phút / buổi · Package 6-12 buổi",
    color: "#5fffaa",
    audience: "Founder Ecom có team, doanh thu 1-10 tỷ/tháng, đang gặp bottleneck scale hoặc tổ chức team",
    deliverables: [
      "P&L review chi tiết — bóc tách lãi lỗ từng kênh, SKU, agency partner",
      "Growth strategy 90 ngày — kênh nào double-down, kênh nào cắt",
      "Hiring + Team structure — JD, level, lương, KPI cho Marketing/Ecom team",
      "Pre-work + post-action plan từng buổi — không lý thuyết suông",
      "Slack/Telegram support giữa buổi cho urgent decisions",
    ],
    cta: "Đặt buổi tư vấn 30 phút",
    href: "#apply",
    featured: true,
  },
  {
    id: "group-monthly",
    name: "Group Coaching",
    tagline: "Cohort 6-8 người · Cùng nhau scale",
    price: "3.500.000đ",
    priceNote: "/ tháng · 2 buổi group + Slack community",
    color: "#7da9ff",
    audience: "Marketer mid-senior + founder solo muốn community feedback + accountability",
    deliverables: [
      "2 buổi group call/tháng (Zoom, 90 phút mỗi buổi)",
      "Hot seat — mỗi tháng 2-3 thành viên được Quảng review case riêng",
      "Slack community 24/7 — Q&A, peer review brief, share case study",
      "Recording đầy đủ — vắng buổi nào xem lại buổi đó",
      "Tài liệu nội bộ: template P&L, brief, hiring framework, scaling playbook",
    ],
    cta: "Tham gia waitlist cohort tới",
    href: "#apply",
  },
  {
    id: "office-hours",
    name: "Office Hours",
    tagline: "1 buổi · Tư vấn vấn đề cụ thể",
    price: "2.500.000đ",
    priceNote: "60 phút · 1 vấn đề / 1 quyết định",
    color: "#ffd479",
    audience: "Marketer cần second opinion cho 1 quyết định cụ thể (chọn agency, đàm phán KPI, plan campaign)",
    deliverables: [
      "60 phút Zoom 1-1 — Quảng phân tích + đưa khuyến nghị",
      "Pre-work form: bạn brief vấn đề + data trước buổi",
      "Email follow-up tóm tắt action items trong 24h",
      "Phù hợp: cần unstuck, không cần long-term coaching",
    ],
    cta: "Đặt 1 buổi",
    href: "#apply",
  },
];

type Tier = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  color: string;
  audience: string;
  deliverables: string[];
  cta: string;
  href: string;
  featured?: boolean;
};

const FAQS = [
  {
    q: "Coaching 1-1 khác gì với khoá học Ecom Foundation?",
    a: "Khoá học là kiến thức chuẩn hoá cho người mới — 1 tài liệu, nhiều người dùng. Coaching 1-1 cá nhân hoá 100% cho case của bạn — P&L bạn, team bạn, kênh bạn. Phù hợp khi đã qua giai đoạn 'không biết bắt đầu từ đâu' và đang stuck ở 1 ngưỡng cụ thể.",
  },
  {
    q: "Tôi không phải founder mà là Marketing Manager — có phù hợp không?",
    a: "Hoàn toàn được. Office Hours hoặc Group Coaching phù hợp nhất cho mid-senior marketer cần unstuck vấn đề cụ thể (đàm phán KPI với sếp, plan campaign Tết, chuyển team agency) hoặc cần community để bounce ideas.",
  },
  {
    q: "Phương thức thanh toán?",
    a: "Sau buổi tư vấn 30 phút miễn phí, nếu cả 2 fit → ký hợp đồng + thanh toán 100% trước cho package 6-12 buổi (Founder 1-1) hoặc trả tháng cho Group. Có thể chia đôi nếu package > 50tr. Hoàn 100% nếu Quảng huỷ buổi không thông báo trước.",
  },
  {
    q: "Có guarantee kết quả không?",
    a: "Không. Coaching không phải dịch vụ done-for-you — Quảng đưa framework + strategy + feedback, bạn execute. Guarantee thuộc về effort của Quảng (đầy đủ pre-work, follow-up, không cancel lung tung), không phải metrics business (do nhiều biến số ngoài tầm kiểm soát).",
  },
  {
    q: "Quy trình từ apply đến buổi đầu?",
    a: "Step 1: Submit form bên dưới với info + vấn đề muốn giải quyết. Step 2: Quảng đọc trong 48h, nếu fit sẽ gửi link đặt buổi tư vấn 30 phút miễn phí. Step 3: Sau buổi tư vấn, nếu cả 2 fit → ký hợp đồng + lên schedule. Toàn bộ ~3-5 ngày.",
  },
  {
    q: "Quảng đã coach những ai?",
    a: "10+ founders Ecom (TikTok Shop + Shopee), 5+ Marketing Managers tại brand FMCG/Beauty/Tech, và mentor cho 50+ học viên Khoá Ecom Foundation. Background: Digital Marketing Manager tại UpBase Vietnam, TikTok Awards 2024 — Best Commerce Campaign Gold.",
  },
];

export default function CoachingPage() {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Marketing Coaching",
    provider: { "@type": "Person", name: "Nguyễn Đức Quảng", url: SITE_URL },
    areaServed: { "@type": "Country", name: "Vietnam" },
    offers: TIERS.map((t) => ({
      "@type": "Offer",
      name: t.name,
      description: t.tagline,
      priceCurrency: "VND",
      price: t.price.replace(/[^\d]/g, ""),
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

        {/* HERO */}
        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "blue", size: 500, top: "-15%", right: "-5%" },
            { variant: "purple", size: 450, bottom: "-30%", left: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 pt-28 pb-16 md:pt-32 md:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
              <div>
                <div className="section-tag">Coaching · 1-1 / Group</div>
                <h1 className="t-h1 leading-[1.05] text-white mb-5">
                  Coaching cho<br />
                  <span className="grad-text">Founder Ecom + Marketing Manager</span>
                </h1>
                <p className="t-body-lg mb-6" style={{ color: "var(--ink-soft)" }}>
                  Bạn đang scale gian hàng 1-10 tỷ/tháng, dẫn team Marketing/Ecom, hoặc stuck ở 1 quyết định lớn? 3 hình thức coaching để bạn chọn — từ 60 phút unstuck đến 6 tháng partnership.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <a href="#tiers" className="px-6 py-3 rounded-xl text-[0.95rem] font-bold text-white" style={{ background: "var(--grad-primary)", boxShadow: "0 8px 24px rgba(20,110,245,0.35)" }}>
                    Xem 3 hình thức →
                  </a>
                  <a href="#apply" className="px-6 py-3 rounded-xl text-[0.95rem] font-bold" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--line)", color: "white" }}>
                    Apply ngay
                  </a>
                </div>
                <div className="flex flex-wrap gap-4 text-[0.82rem]" style={{ color: "var(--ink-mute)" }}>
                  <span className="flex items-center gap-1.5"><Icon name="check" size={12} color="#5fffaa" strokeWidth={3} /> 10+ founder đã coach</span>
                  <span className="flex items-center gap-1.5"><Icon name="check" size={12} color="#5fffaa" strokeWidth={3} /> TikTok Awards Gold 2024</span>
                  <span className="flex items-center gap-1.5"><Icon name="check" size={12} color="#5fffaa" strokeWidth={3} /> Buổi tư vấn 30 phút miễn phí</span>
                </div>
              </div>

              {/* Pull-quote card */}
              <Reveal>
                <div className="rounded-2xl p-6 md:p-7" style={{ background: "rgba(20,110,245,0.06)", border: "1px solid rgba(20,110,245,0.22)" }}>
                  <Icon name="sparkles" size={20} color="#7da9ff" />
                  <p className="text-[0.95rem] leading-[1.7] text-white mt-3 mb-4 italic">
                    &quot;Quảng review P&L gian hàng giúp mình. Phát hiện ngay 12% net margin đang bốc hơi qua voucher Plus mà mình không track. Tháng sau lãi tăng 240tr — cùng GMV, chỉ tối ưu cost.&quot;
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[0.92rem]" style={{ background: "rgba(20,110,245,0.18)", color: "#7da9ff" }}>HN</div>
                    <div>
                      <div className="text-[0.88rem] font-semibold text-white">H. — Founder TikTok Shop FMCG</div>
                      <div className="text-[0.78rem]" style={{ color: "var(--ink-mute)" }}>Founder coaching · 6 buổi · 2025</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* TIERS */}
        <section id="tiers" className="relative">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <Reveal>
              <div className="text-center mb-12">
                <div className="section-tag mx-auto">3 hình thức coaching</div>
                <h2 className="t-h2 text-white mb-3">Chọn mức phù hợp với bạn</h2>
                <p className="t-body max-w-[600px] mx-auto" style={{ color: "var(--ink-soft)" }}>
                  Từ 1 buổi 60 phút unstuck cho đến partnership 6 tháng. Tất cả bắt đầu bằng buổi tư vấn 30 phút miễn phí để Quảng đánh giá fit.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {TIERS.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl p-6 md:p-7 flex flex-col"
                  style={{
                    background: t.featured ? "rgba(20,110,245,0.06)" : "rgba(255,255,255,0.025)",
                    border: `1px solid ${t.featured ? "rgba(20,110,245,0.45)" : "var(--line)"}`,
                    boxShadow: t.featured ? "0 12px 40px rgba(20,110,245,0.18)" : "none",
                  }}
                >
                  {t.featured && (
                    <div className="text-[0.65rem] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "#7da9ff" }}>
                      ⭐ Most popular
                    </div>
                  )}
                  <h3 className="text-[1.15rem] font-extrabold text-white mb-1.5">{t.name}</h3>
                  <p className="text-[0.86rem] mb-5 leading-snug" style={{ color: "var(--ink-mute)" }}>{t.tagline}</p>

                  <div className="mb-5 pb-5" style={{ borderBottom: "1px solid var(--line)" }}>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[1.85rem] font-extrabold leading-none" style={{ color: t.color }}>{t.price}</span>
                    </div>
                    <div className="text-[0.78rem] mt-1.5" style={{ color: "var(--ink-mute)" }}>{t.priceNote}</div>
                  </div>

                  <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Phù hợp với</div>
                  <p className="text-[0.85rem] mb-5 leading-snug" style={{ color: "rgba(255,255,255,0.85)" }}>{t.audience}</p>

                  <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Bao gồm</div>
                  <ul className="flex flex-col gap-2 mb-6 list-none">
                    {t.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-[0.85rem]" style={{ color: "rgba(255,255,255,0.85)" }}>
                        <Icon name="check" size={12} color="#5fffaa" strokeWidth={3} />
                        <span className="leading-snug">{d}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={t.href}
                    className="mt-auto text-center px-5 py-3 rounded-xl text-[0.9rem] font-bold transition-all"
                    style={{
                      background: t.featured ? "var(--grad-primary)" : "rgba(255,255,255,0.04)",
                      border: t.featured ? "none" : "1px solid var(--line)",
                      color: "white",
                      boxShadow: t.featured ? "0 6px 20px rgba(20,110,245,0.35)" : "none",
                    }}
                  >
                    {t.cta} →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-20">
            <Reveal>
              <div className="text-center mb-12">
                <div className="section-tag mx-auto">Quy trình</div>
                <h2 className="t-h2 text-white">Từ apply đến buổi đầu — 3-5 ngày</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {[
                { n: 1, icon: "clipboard-list" as IconName, title: "Apply form", desc: "Bạn submit form bên dưới — info + vấn đề muốn giải quyết. 5 phút." },
                { n: 2, icon: "user" as IconName, title: "Quảng review", desc: "48h Quảng đọc + gửi link đặt buổi tư vấn 30 phút miễn phí (Zoom)." },
                { n: 3, icon: "compass" as IconName, title: "Buổi tư vấn", desc: "30 phút Zoom — Quảng hiểu case của bạn, đề xuất hình thức + roadmap." },
                { n: 4, icon: "rocket" as IconName, title: "Bắt đầu", desc: "Nếu fit cả 2 → ký hợp đồng + lên schedule. Buổi đầu trong 1 tuần." },
              ].map((s) => (
                <div key={s.n} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-[0.85rem] font-bold" style={{ background: "rgba(20,110,245,0.18)", color: "#7da9ff" }}>{s.n}</span>
                    <Icon name={s.icon} size={16} color="rgba(255,255,255,0.5)" />
                  </div>
                  <h3 className="text-[0.95rem] font-bold text-white mb-1.5">{s.title}</h3>
                  <p className="text-[0.82rem] leading-snug" style={{ color: "var(--ink-mute)" }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[860px] mx-auto px-6 md:px-10 py-16 md:py-20">
            <Reveal>
              <div className="text-center mb-10">
                <div className="section-tag mx-auto">Câu hỏi thường gặp</div>
                <h2 className="t-h2 text-white">FAQ</h2>
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

        {/* APPLY CTA */}
        <section id="apply" className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24 text-center">
            <Reveal>
              <div className="section-tag mx-auto">Apply</div>
              <h2 className="t-h2 text-white mb-4">Sẵn sàng làm việc cùng Quảng?</h2>
              <p className="t-body-lg mb-8" style={{ color: "var(--ink-soft)" }}>
                Buổi tư vấn 30 phút đầu tiên hoàn toàn miễn phí — không có cam kết tiếp theo nếu cả 2 không fit.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <Link
                  href="/#contact"
                  className="px-7 py-3.5 rounded-xl text-[1rem] font-bold text-white"
                  style={{ background: "var(--grad-primary)", boxShadow: "0 8px 24px rgba(20,110,245,0.4)" }}
                >
                  Submit application →
                </Link>
                <a
                  href="https://zalo.me/0868464658"
                  target="_blank"
                  rel="noreferrer"
                  className="px-7 py-3.5 rounded-xl text-[1rem] font-bold"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--line)", color: "white" }}
                >
                  Nhắn Zalo trực tiếp
                </a>
              </div>
              <p className="text-[0.82rem]" style={{ color: "var(--ink-mute)" }}>
                Hoặc email <a href="mailto:qforwork13@gmail.com" className="underline" style={{ color: "#7da9ff" }}>qforwork13@gmail.com</a> · phản hồi trong 24h giờ hành chính
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
