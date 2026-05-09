"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal, { RevealText } from "@/components/Reveal";
import CounterStat from "@/components/CounterStat";
import Marquee from "@/components/Marquee";
import GradientBlobs from "@/components/GradientBlobs";
import ContactForm from "@/components/ContactForm";
import BrandsCarousel from "@/components/BrandsCarousel";
import PersonalCard from "@/components/PersonalCard";
import Link from "next/link";
import { motion } from "framer-motion";

/* ─────────────── ICONS ─────────────── */
const sw = "#7da9ff";
const Ic = ({ children, w = 22, color = sw }: { children: React.ReactNode; w?: number; color?: string }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);

const IconChart = (p?: { color?: string }) => <Ic color={p?.color}><rect x="18" y="3" width="4" height="18" /><rect x="10" y="8" width="4" height="13" /><rect x="2" y="13" width="4" height="8" /></Ic>;
const IconCoin = () => <Ic><circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 000 4h4a2 2 0 010 4H8" /><path d="M12 6v2m0 8v2" /></Ic>;
const IconUsers = () => <Ic><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></Ic>;
const IconTrend = () => <Ic w={20}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></Ic>;
const IconNav = () => <Ic w={20}><polygon points="3 11 22 2 13 21 11 13 3 11" /></Ic>;
const IconTarget = () => <Ic w={20}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></Ic>;
const IconData = () => <Ic w={20}><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><polyline points="2 20 22 20" /></Ic>;
const IconCart = () => <Ic w={20}><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" /></Ic>;
const IconCheck = ({ color = "#7da9ff", w = 14 }: { color?: string; w?: number }) => <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
const IconCalendar = () => <Ic w={18}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></Ic>;
const IconHeart = () => <Ic w={18}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></Ic>;
const IconPin = () => <Ic w={18}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></Ic>;
const IconTeam = () => <Ic w={20}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></Ic>;
const IconStar = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="url(#starG)"><defs><linearGradient id="starG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#4ad6ff" /><stop offset="100%" stopColor="#7a3dff" /></linearGradient></defs><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
const IconMail = () => <Ic w={16}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></Ic>;
const IconChat = () => <Ic w={16}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></Ic>;
const IconLinkedIn = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="#7da9ff"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;

/* ─────────────── DATA ─────────────── */
const stats = [
  {
    icon: <IconChart />,
    num: 60,
    suffix: "+",
    label: "Dự án Ecommerce",
    sub: "TikTok Shop · Shopee · Meta · Google",
    trend: "+18% YoY",
    trendColor: "#5fffaa",
    color: "#4ad6ff",
    chart: "M0 28 L20 26 L40 24 L60 18 L80 22 L100 14 L120 10 L140 12 L160 6 L180 4",
  },
  {
    icon: <IconCoin />,
    num: 10,
    suffix: "B+",
    label: "Ngân sách / tháng",
    sub: "Quản lý hiệu quả · ROAS >7x",
    trend: "Tỷ VNĐ",
    trendColor: "#7da9ff",
    color: "#7da9ff",
    chart: "M0 24 L20 20 L40 22 L60 16 L80 18 L100 12 L120 14 L140 8 L160 10 L180 4",
  },
  {
    icon: <IconUsers />,
    num: 12,
    suffix: "",
    label: "Thành viên team",
    sub: "Tuyển dụng · Đào tạo · Dẫn dắt",
    trend: "20+ Mentees",
    trendColor: "#a78bff",
    color: "#a78bff",
    chart: "M0 26 L20 24 L40 20 L60 22 L80 16 L100 18 L120 12 L140 10 L160 8 L180 6",
  },
];

const pillars = [
  { icon: <IconTarget />, title: "Growth Mindset", desc: "Tập trung vào tăng trưởng bền vững và tối ưu hiệu quả từng đồng ngân sách." },
  { icon: <IconTeam />, title: "Team Builder", desc: "Xây dựng đội nhóm mạnh, rõ vai trò, quy trình và mục tiêu để đạt kết quả lớn." },
  { icon: <IconData />, title: "Data Driven", desc: "Dựa trên dữ liệu để ra quyết định, đo lường và tối ưu liên tục." },
  { icon: <IconCart />, title: "Ecom First", desc: "Hiểu sâu hành vi người mua sắm online và vận hành hệ sinh thái Ecommerce hiệu quả." },
];

const expertise = [
  { icon: <IconTrend />, title: "Ecommerce Performance Marketing", desc: "Triển khai chiến lược full-funnel trên TikTok, Shopee, Meta, Google với mục tiêu ROAS và tăng trưởng doanh thu.", tags: ["TikTok Ads", "Shopee Ads", "Meta Ads", "Google Ads"] },
  { icon: <IconTeam />, title: "Team Building & Leadership", desc: "Xây dựng team từ 0→1, thiết lập quy trình, đào tạo, quản trị hiệu suất và văn hóa hướng đến kết quả.", tags: ["Recruitment", "Training", "OKR/KPI", "Operation"] },
  { icon: <IconNav />, title: "Ecommerce Strategy & Consulting", desc: "Tư vấn mô hình, định vị sản phẩm, chiến lược kênh, chiến lược giá và kế hoạch tăng trưởng dài hạn.", tags: ["Strategy", "Brand Positioning", "Growth Plan"] },
];

const caseStudies = [
  { platform: "TikTok Shop · Fashion", metric: "11B", unit: "", label: "Doanh thu 3 ngày Super Brand Day", detail: "Top 1 TikTok Shop Fashion", role: "Lead Media + Content Strategy", award: "Best Commerce Campaign Gold — TikTok Awards 2024", tags: ["TikTok Shop", "Media", "KOC/KOL"] },
  { platform: "Multi-platform · Health & Beauty", metric: "60", unit: "+", label: "Dự án triển khai đồng thời", detail: "TikTok · Shopee · Meta · Google", role: "Digital Marketing Manager", award: "Ngân sách 10B+/tháng, tăng trưởng 5-20%/tháng", tags: ["Performance", "Multi-platform", "ROAS"] },
  { platform: "Multi-platform · Health & Beauty 2", metric: "5-20", unit: "%", label: "Tăng trưởng tháng-on-tháng", detail: "Quản lý team Performance", role: "Team Lead", award: "", tags: ["Performance", "Growth"] },
  { platform: "Sắp cập nhật", metric: "—", unit: "", label: "Case study thứ 4", detail: "", role: "", award: "", tags: [] as string[] },
  { platform: "Sắp cập nhật", metric: "—", unit: "", label: "Case study thứ 5", detail: "", role: "", award: "", tags: [] as string[] },
  { platform: "Sắp cập nhật", metric: "—", unit: "", label: "Case study thứ 6", detail: "", role: "", award: "", tags: [] as string[] },
];

const timeline = [
  { year: "2025 – Nay", title: "Digital Marketing Manager · UpBase", desc: "Xây dựng & phát triển đội ngũ 10 nhân sự trong 5 tháng. Quản lý ngân sách team 8-10 tỷ/tháng, cover doanh thu 50-70 tỷ/tháng. Quản lý 60+ dự án đa nền tảng TikTok, Shopee, Meta, Website, O2O. Mở rộng kênh sang Philippines từ con số 0.", current: true, logo: "UpBase" },
  { year: "T1/2024 – 2025", title: "Ecommerce Executive · UpBase", desc: "Triển khai TikTok Ads cho 18 gian hàng, GMV ~7 tỷ/tháng. Lên plan IMC cho 3 thương hiệu ngân sách ~500M/campaign đạt ROI 6. Mentor 2 nhân sự, nhân viên xuất sắc 2024 & giải nhất dự án tối ưu hoá vận hành.", current: false, logo: "UpBase" },
  { year: "2023", title: "Ecommerce Executive · The Bad God", desc: "Vận hành TikTok Shop & Shopee cho thương hiệu thời trang. Booking KOC/KOL, content performance, media buying.", current: false, logo: "TheBadGod" },
  { year: "2022", title: "Ecommerce Junior · Bigmi / Xiaomi Vietnam", desc: "Vận hành sàn TMĐT, hỗ trợ triển khai campaigns cho ngành hàng gia dụng.", current: false, logo: "Xiaomi" },
  { year: "2021", title: "Bắt đầu hành trình Ecommerce", desc: "Sinh viên Greenwich BTEC FPT. Bắt đầu với Shopee & Facebook Ads từ năm 2 đại học.", current: false, logo: "" },
];

const faqs = [
  { q: "Khoá Foundation Ecommerce dành cho ai?", a: "Sinh viên muốn vào ngành TMĐT, người mới đi làm chuyển sang Ecom, marketer trẻ đang làm sàn nhưng muốn nâng tư duy. Không phù hợp nếu bạn đã hơn 3 năm Ecom expert — sẽ quá cơ bản." },
  { q: "Lộ trình 12 buổi gồm những gì?", a: "5 module: Tư duy thị trường (2 buổi) · Chiến lược SP (1 buổi) · Vận hành sàn (2 buổi) · Performance Ads (4 buổi) · Data & Plan + Capstone (3 buổi). Mỗi buổi 2–3h, có quiz cuối buổi và bài thu hoạch Sheet. Chi tiết từng buổi xem ở trang Khoá học." },
  { q: "Học phí bao nhiêu?", a: "Khoá 1 mở bán testing chỉ 999.000đ — giới hạn 7 học viên. Early-bird các khoá sau 2.999.000đ. Giá chuẩn 4.999.000đ. Đăng ký nhóm 2+ người giảm thêm 10%." },
  { q: "Sau khoá có hỗ trợ gì?", a: "3 tháng mentoring 1-1 (tối thiểu 2 tuần/buổi) — career advice, CV review, technical Q&A, apply công việc. Thêm slide + template + Zalo group hỗ trợ vĩnh viễn." },
  { q: "Apply thế nào?", a: "Vào trang Khoá học, điền application. Mình sẽ liên hệ trong 24h đặt lịch quick meet 15 phút để 2 bên cùng đánh giá phù hợp. Sau đó mới chuyển khoản — apply không phải nộp tiền là vào." },
];

const mentorFeatures = [
  { icon: <IconUsers />, label: "Lớp nhỏ", val: "1–7 người" },
  { icon: <IconCalendar />, label: "Thời gian", val: "12 buổi · 6 tuần" },
  { icon: <IconHeart />, label: "Mentoring 1-1", val: "3 tháng tiếp theo" },
  { icon: <IconPin />, label: "Hình thức", val: "100% Offline · Hà Nội" },
];

const marqueeWords = ["Ecommerce", "TikTok Shop", "Shopee", "Performance Marketing", "Team Builder", "Growth Strategy", "Data-Driven", "Multi-Platform"];

/* ─────────────── PAGE ─────────────── */
type SanityCaseStudy = { _id: string; title?: string; brand?: string; platforms?: string[]; category?: string; role?: string; headline?: string; headlineLabel?: string; description?: string; award?: string; tags?: string[]; coverImage?: any };
type SanityTestimonial = { _id: string; name: string; role?: string; company?: string; avatar?: any; content: string; rating?: number };
type SanityTimeline = { _id: string; year: string; title: string; description?: string; current?: boolean };

type Props = {
  sanityCaseStudies?: SanityCaseStudy[];
  sanityTestimonials?: SanityTestimonial[];
  sanityTimeline?: SanityTimeline[];
};

export default function HomeClient({ sanityCaseStudies, sanityTestimonials, sanityTimeline }: Props = {}) {
  // Map Sanity → display shape, fall back to hardcoded if empty
  const caseStudyList = sanityCaseStudies && sanityCaseStudies.length
    ? sanityCaseStudies.map((c) => ({
        platform: [c.platforms?.join(" · "), c.brand].filter(Boolean).join(" · ") || c.title || "—",
        metric: c.headline || "—",
        unit: c.headlineLabel || "",
        label: c.description || "",
        detail: c.brand || "",
        role: c.role || "",
        award: c.award || "",
        tags: c.tags || [],
      }))
    : caseStudies;

  const timelineList = sanityTimeline && sanityTimeline.length
    ? sanityTimeline.map((t) => ({
        year: t.year,
        title: t.title,
        desc: t.description || "",
        current: !!t.current,
        logo: /UpBase/i.test(t.title) ? "UpBase" : /Bad God/i.test(t.title) ? "TheBadGod" : /Xiaomi|Bigmi/i.test(t.title) ? "Xiaomi" : "",
      }))
    : timeline;

  const testimonialList = sanityTestimonials && sanityTestimonials.length
    ? sanityTestimonials.map((t) => ({
        name: t.name,
        role: t.role || "",
        company: t.company || "",
        content: t.content,
        rating: t.rating || 5,
      }))
    : null;

  return (
    <>
      <Navbar />
      <main>
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="relative overflow-hidden flex items-center" style={{ minHeight: "100vh" }}>
          <div className="grid-pattern" />
          <div className="blob blob-blue blob-anim" style={{ width: 700, height: 700, top: "-15%", left: "-10%" }} />
          <div className="blob blob-purple blob-anim" style={{ width: 600, height: 600, bottom: "-20%", right: "-10%", animationDelay: "3s" }} />

          <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] items-center gap-12 lg:gap-16 pt-28 pb-20 lg:pt-24 lg:pb-16">
            <div className="relative z-10">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md mb-6" style={{ background: "rgba(20,110,245,0.12)", border: "1px solid rgba(20,110,245,0.3)" }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#7da9ff" }} />
                  <span className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase" style={{ color: "#9bb6ff" }}>
                    Marketer · Leader · Mentor
                  </span>
                </div>
              </Reveal>

              <h1 className="t-display tracking-tight mb-6 text-white">
                <RevealText text="Build teams." className="block" />
                <RevealText text="Scale brands." className="block" delay={0.12} />
                <span className="block">
                  <RevealText text="Grow" splitBy="char" delay={0.26} className="grad-text" stagger={0.05} />{" "}
                  <RevealText text="smarter." delay={0.45} />
                </span>
              </h1>

              <Reveal delay={0.55}>
                <p className="t-body-lg max-w-[500px] mb-8" style={{ color: "rgba(255,255,255,0.72)" }}>
                  Tôi xây team, vận hành Ecom đa kênh và mentor cho thế hệ marketer mới — với kết quả đo lường bằng số thật, và sự nghiệp được xây dựng chậm mà chắc.
                </p>
              </Reveal>

              <Reveal delay={0.7}>
                <div className="flex gap-3 items-center flex-wrap">
                  <Link href="/#contact" className="btn btn-primary">
                    Làm việc cùng tôi <span className="arrow">→</span>
                  </Link>
                  <Link href="/ecom-foundation" className="btn btn-ghost">
                    Xem khoá Ecom Foundation <span className="arrow">→</span>
                  </Link>
                </div>
              </Reveal>

              {/* Inline mini-stats */}
              <Reveal delay={0.85}>
                <div className="flex gap-6 md:gap-10 mt-12 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  {[
                    { val: "5+", label: "Năm kinh nghiệm" },
                    { val: "60+", label: "Dự án Ecom" },
                    { val: "10B+", label: "Ngân sách / tháng" },
                    { val: "20+", label: "Mentees" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-[1.4rem] md:text-[1.6rem] font-bold tracking-tight grad-text leading-none">{s.val}</div>
                      <div className="text-[0.72rem] mt-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <PersonalCard />
            </Reveal>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
          >
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.4)" }}>Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════ STATS ═══════════════ */}
        <section className="relative">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
            <Reveal>
              <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
                <div>
                  <div className="section-tag">Số liệu</div>
                  <h2 className="t-h2 text-white max-w-[560px]">
                    5 năm thực chiến,<br /><span className="grad-text">được đo bằng kết quả.</span>
                  </h2>
                </div>
                <Link href="/#casestudies" className="btn btn-ghost text-[0.85rem] py-2.5">
                  Xem case studies <span className="arrow">→</span>
                </Link>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {stats.map((s, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="relative rounded-2xl p-6 md:p-7 overflow-hidden h-full group"
                    style={{
                      background: "linear-gradient(180deg, rgba(20,40,90,0.45) 0%, rgba(8,16,43,0.7) 100%)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      boxShadow: "0 16px 40px rgba(5,10,31,0.4)",
                      backdropFilter: "blur(16px)",
                    }}>
                    {/* Glow on hover */}
                    <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle, ${s.color}40, transparent 70%)`, filter: "blur(20px)" }} />

                    {/* Top row: icon + trend badge */}
                    <div className="relative flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(20,110,245,0.12)", border: "1px solid rgba(20,110,245,0.25)" }}>
                        {s.icon}
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md" style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                          <polyline points="17 6 23 6 23 12" />
                        </svg>
                        <span className="text-[0.7rem] font-semibold" style={{ color: s.color }}>{s.trend}</span>
                      </div>
                    </div>

                    {/* Big number */}
                    <div className="relative text-[3.2rem] md:text-[3.6rem] font-bold tracking-tight leading-none text-white mb-3">
                      <CounterStat to={s.num} suffix="" />
                      <span style={{ background: `linear-gradient(120deg, ${s.color}, var(--wf-purple))`, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.suffix}</span>
                    </div>

                    {/* Label + sub */}
                    <div className="relative mb-5">
                      <div className="text-[1rem] font-semibold text-white tracking-tight">{s.label}</div>
                      <div className="text-[0.82rem] mt-1" style={{ color: "var(--ink-mute)" }}>{s.sub}</div>
                    </div>

                    {/* Sparkline */}
                    <div className="relative pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                      <svg viewBox="0 0 180 32" className="w-full h-[36px]" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id={`sparkLine${i}`} x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor={s.color} stopOpacity="0.2" />
                            <stop offset="100%" stopColor={s.color} stopOpacity="1" />
                          </linearGradient>
                          <linearGradient id={`sparkFill${i}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={s.color} stopOpacity="0.25" />
                            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d={`${s.chart} L180 32 L0 32 Z`} fill={`url(#sparkFill${i})`} />
                        <motion.path
                          d={s.chart}
                          fill="none"
                          stroke={`url(#sparkLine${i})`}
                          strokeWidth="2"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 1.4, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                        />
                        <motion.circle
                          cx="180"
                          cy={i === 0 ? 4 : i === 1 ? 4 : 6}
                          r="3"
                          fill={s.color}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ delay: 1.6 + i * 0.1 }}
                        />
                      </svg>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ MARQUEE ═══════════════ */}
        <section className="py-10 md:py-14 overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <Marquee
            items={marqueeWords.map((w, i) => (
              <span key={i} className="inline-flex items-center gap-6">
                <span
                  className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight whitespace-nowrap"
                  style={{
                    color: i % 2 === 0 ? "white" : "transparent",
                    WebkitTextStroke: i % 2 === 0 ? "0" : "1.5px rgba(125,169,255,0.8)",
                  }}
                >
                  {w}
                </span>
                <span className="text-[2rem] grad-text">✦</span>
              </span>
            ))}
          />
        </section>

        {/* ═══════════════ BRANDS ═══════════════ */}
        <BrandsCarousel />

        {/* ═══════════════ ABOUT ═══════════════ */}
        <section id="about" className="relative overflow-hidden">
          <div className="blob blob-blue blob-anim" style={{ width: 500, height: 500, top: "10%", right: "-15%" }} />
          <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <Reveal><div className="section-tag">Về tôi</div></Reveal>
              <Reveal delay={0.1}>
                <h2 className="t-h1 mb-6 text-white">
                  Tư duy chiến lược.<br />
                  Thực thi kỷ luật.<br />
                  <span className="grad-text">Tăng trưởng bền vững.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="t-body mb-4 max-w-[480px]">
                  Hơn 5 năm kinh nghiệm trong lĩnh vực <strong className="text-white">Digital Marketing và Ecommerce</strong>. Tập trung vào hiệu quả thực tế, xây dựng hệ thống, đội nhóm và chiến lược tăng trưởng.
                </p>
                <p className="t-body mb-8 max-w-[480px]">
                  Tại <strong className="text-white">UpBase</strong>, quản lý team 12 người phụ trách 60+ dự án trên TikTok Shop, Shopee, Meta, Google với ngân sách <strong className="text-white">10 tỷ VNĐ/tháng</strong>.
                </p>
                <Link href="/#contact" className="btn btn-ghost">
                  Tìm hiểu thêm về tôi <span className="arrow">→</span>
                </Link>
              </Reveal>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {pillars.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="glass p-5 md:p-6 h-full">
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: "var(--grad-primary-soft)", border: "1px solid rgba(20,110,245,0.2)" }}>
                      {p.icon}
                    </div>
                    <div className="text-[1rem] font-semibold mb-1.5 tracking-tight text-white">{p.title}</div>
                    <div className="text-[0.85rem] leading-[1.65]" style={{ color: "var(--ink-mute)" }}>{p.desc}</div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ EXPERTISE ═══════════════ */}
        <section id="expertise" className="relative">
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent, rgba(20,110,245,0.04), transparent)" }} />
          <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <Reveal><div className="section-tag">Chuyên môn</div></Reveal>
            <Reveal delay={0.08}>
              <h2 className="t-h2 mb-3 max-w-[640px] text-white">
                3 mảng chuyên môn <span className="grad-text">chính.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="t-caption mb-12 max-w-[480px]">Tập trung vào những gì tạo ra kết quả lớn nhất.</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {expertise.map((c, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="glass p-7 md:p-8 h-full flex flex-col">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--grad-primary-soft)", border: "1px solid rgba(20,110,245,0.2)" }}>
                      {c.icon}
                    </div>
                    <h3 className="t-h3 mb-3 text-white">{c.title}</h3>
                    <p className="text-[0.92rem] leading-[1.7] mb-5" style={{ color: "var(--ink-mute)" }}>{c.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {c.tags.map((t) => <span key={t} className="wf-badge text-[0.72rem]">{t}</span>)}
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ CASE STUDIES ═══════════════ */}
        <section id="casestudies" className="relative overflow-hidden">
          <div className="blob blob-purple blob-anim" style={{ width: 500, height: 500, top: "30%", left: "-15%" }} />
          <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <Reveal><div className="section-tag">Kết quả thực tế</div></Reveal>
            <Reveal delay={0.08}><h2 className="t-h2 mb-3 text-white">Case <span className="grad-text">Studies.</span></h2></Reveal>
            <Reveal delay={0.14}><p className="t-caption mb-12 max-w-[480px]">Những con số thực tế từ các dự án đã triển khai.</p></Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {caseStudyList.map((cs, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="glass-grad p-6 md:p-7 h-full">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "var(--grad-primary-soft)", border: "1px solid rgba(20,110,245,0.2)" }}>
                        <IconTrend />
                      </div>
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] grad-text">{cs.platform}</span>
                    </div>
                    <div className="text-[2.4rem] font-bold tracking-tight leading-none mb-2 text-white">
                      {cs.metric}<span className="grad-text">{cs.unit}</span>
                    </div>
                    <p className="text-[0.85rem] mb-4 leading-snug" style={{ color: "var(--ink-mute)" }}>
                      {cs.label}
                      {cs.detail && <><br /><strong className="text-white">{cs.detail}</strong></>}
                    </p>
                    {cs.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {cs.tags.map((t) => <span key={t} className="wf-badge text-[0.7rem]">{t}</span>)}
                      </div>
                    )}
                    {cs.award && (
                      <p className="text-[0.82rem] pt-4 border-t mt-3 font-semibold grad-text" style={{ borderColor: "var(--line)" }}>
                        → {cs.award}
                      </p>
                    )}
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ TIMELINE + PORTRAIT ═══════════════ */}
        <section id="timeline" className="relative overflow-hidden">
          <div className="blob blob-cyan blob-anim" style={{ width: 480, height: 480, top: "20%", right: "-10%" }} />
          <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <Reveal><div className="section-tag">Hành trình</div></Reveal>
            <Reveal delay={0.08}>
              <h2 className="t-h2 mb-14 max-w-[640px] text-white">
                Từng bước xây dựng <span className="grad-text">sự nghiệp.</span>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">
              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-5 top-2 bottom-2 w-[2px]" style={{ background: "linear-gradient(to bottom, #4ad6ff, #146ef5, #7a3dff, transparent)" }} />
                {timelineList.map((t, i) => (
                  <Reveal key={i} delay={i * 0.08} className="flex gap-6 relative">
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18, delay: i * 0.08 }}
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                        style={{
                          background: t.current ? "var(--grad-primary)" : "rgba(8,16,43,1)",
                          border: t.current ? "none" : "2px solid rgba(125,169,255,0.4)",
                          boxShadow: t.current ? "0 0 0 6px rgba(20,110,245,0.18), 0 4px 16px rgba(20,110,245,0.4)" : "none",
                        }}
                      >
                        <IconCheck color={t.current ? "white" : "#7da9ff"} />
                      </motion.div>
                    </div>
                    <div className="pb-10 flex-1">
                      <div className="flex items-center flex-wrap gap-2 mb-1.5">
                        <div className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] grad-text">{t.year}</div>
                        {t.logo === "UpBase" && <span className="text-[0.7rem] font-bold px-2.5 py-0.5 rounded-md" style={{ background: "#0052CC", color: "white" }}>UpBase</span>}
                        {t.logo === "TheBadGod" && <span className="text-[0.7rem] font-bold px-2.5 py-0.5 rounded-md" style={{ background: "#1a5c2a", color: "white" }}>The Bad God</span>}
                        {t.logo === "Xiaomi" && <span className="text-[0.7rem] font-bold px-2.5 py-0.5 rounded-md" style={{ background: "#FF6900", color: "white" }}>Xiaomi</span>}
                      </div>
                      <div className="text-[1.05rem] font-semibold mb-1.5 tracking-tight text-white">{t.title}</div>
                      <div className="text-[0.92rem] leading-[1.7]" style={{ color: "var(--ink-mute)" }}>{t.desc}</div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Portrait card — sticky right */}
              <Reveal delay={0.2}>
                <div className="lg:sticky lg:top-28">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 240, damping: 22 }}
                    className="rounded-2xl overflow-hidden relative"
                    style={{
                      background: "linear-gradient(180deg, rgba(20,40,90,0.5), rgba(8,16,43,0.85))",
                      border: "1px solid rgba(255,255,255,0.10)",
                      boxShadow: "0 24px 60px rgba(5,10,31,0.55)",
                    }}
                  >
                    {/* Photo */}
                    <div className="relative" style={{ background: "linear-gradient(135deg, #0d1c52 0%, #142768 100%)" }}>
                      <div className="absolute inset-0 z-0" style={{ backgroundImage: "radial-gradient(rgba(125,169,255,0.18) 1.2px, transparent 1.2px)", backgroundSize: "20px 20px", opacity: 0.5 }} />
                      <img src="/kai-photo.png" alt="Nguyễn Đức Quảng" className="relative z-10 w-full h-auto block object-cover object-top" style={{ aspectRatio: "4/5" }} />
                      <div className="absolute inset-0 z-20" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(8,16,43,0.85) 100%)" }} />
                    </div>
                    {/* Caption */}
                    <div className="px-5 py-4 flex items-center justify-between gap-3 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                      <div>
                        <div className="text-[0.95rem] font-bold text-white tracking-tight">Nguyễn Đức Quảng</div>
                        <div className="text-[0.78rem]" style={{ color: "var(--ink-mute)" }}>Digital Marketing Manager</div>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md" style={{ background: "rgba(0,215,34,0.10)", border: "1px solid rgba(0,215,34,0.25)" }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00d722" }} />
                        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em]" style={{ color: "#5fffaa" }}>Open</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════ TESTIMONIALS ═══════════════ */}
        <section id="testimonials" className="relative">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <Reveal><div className="section-tag">Nhận xét</div></Reveal>
            <Reveal delay={0.08}>
              <h2 className="t-h2 mb-12 text-white">Người đã làm việc<br /><span className="grad-text">cùng tôi nói gì.</span></h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {(testimonialList ?? [0, 1, 2].map(() => null)).map((t, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="glass p-7 md:p-8 h-full">
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(t?.rating || 5)].map((_, j) => <IconStar key={j} />)}
                    </div>
                    <p className="text-[0.95rem] leading-[1.75] italic mb-6" style={{ color: "var(--ink-soft)" }}>
                      "{t?.content || "Sắp cập nhật — nhận xét từ client hoặc đồng nghiệp."}"
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "var(--line)" }}>
                      <div className="w-10 h-10 rounded-full flex-shrink-0" style={{ background: "var(--grad-primary)" }} />
                      <div>
                        <div className="text-[0.9rem] font-semibold tracking-tight text-white">{t?.name ? `${t.name}${t.role ? ` · ${t.role}` : ""}` : "Tên · Chức vụ"}</div>
                        <div className="text-[0.78rem]" style={{ color: "var(--ink-mute)" }}>{t?.company || "Công ty"}</div>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ MENTORING ═══════════════ */}
        <section id="mentoring" className="relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent, rgba(20,30,80,0.4), transparent)" }} />
          <div className="blob blob-blue blob-anim" style={{ width: 600, height: 600, top: "-10%", left: "-10%" }} />
          <div className="blob blob-purple blob-anim" style={{ width: 500, height: 500, bottom: "-15%", right: "-10%", animationDelay: "3s" }} />
          <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
            {/* Header (full width) */}
            <div className="max-w-[760px] mb-14">
              <Reveal><div className="section-tag">Khoá học</div></Reveal>
              <Reveal delay={0.08}>
                <h2 className="t-h1 text-white mb-5 tracking-tight">
                  Foundation <span className="grad-text">Ecommerce.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="text-[1.05rem] leading-[1.75]" style={{ color: "var(--ink-soft)" }}>
                  Khoá foundation về thương mại điện tử — 12 buổi · 6 tuần · 100% Offline Hà Nội. Xây tư duy đúng từ đầu để bước vào ngành làm thật, không học cho biết.
                </p>
              </Reveal>
            </div>

            {/* Body 2-col */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-start">
            <div>

              <Reveal delay={0.2}>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] mb-4" style={{ color: "var(--ink-mute)" }}>
                  5 module · 12 buổi · 1 capstone
                </p>
                <div className="flex flex-col gap-2.5 mb-9">
                  {[
                    { num: "M1", title: "Tư duy thị trường TMĐT", count: "2 buổi", items: ["Thương mại & Ecom hiện nay", "Sharing kinh nghiệm trainer", "Chiến lược kinh doanh đa sàn"], color: "#4ad6ff" },
                    { num: "M2", title: "Chiến lược sản phẩm", count: "1 buổi", items: ["Phân tích đối thủ", "Định vị USP & SWOT", "Customer journey"], color: "#7da9ff" },
                    { num: "M3", title: "Vận hành sàn", count: "2 buổi", items: ["Setup gian hàng A→Z", "Tư duy giá & phí sàn", "Tồn kho · Điểm gian hàng (Mall vs non-Mall)"], color: "#a78bff" },
                    { num: "M4", title: "Performance Marketing", count: "4 buổi", items: ["Traffic & thuật toán", "Bộ chỉ số Marketing", "TikTok · Shopee · Facebook Ads · KOC"], color: "#ed52cb" },
                    { num: "M5", title: "Data & Plan + Capstone", count: "3 buổi", items: ["Plan tháng/quý + IMC", "Plan 1 năm + P&L", "Phân tích data → giải pháp"], color: "#ffae13" },
                  ].map((m, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
                      whileHover={{ x: 4 }}
                      className="glass px-4 py-3.5">
                      <div className="flex items-start gap-3">
                        <span className="text-[0.82rem] font-bold flex-shrink-0 mt-0.5" style={{ color: m.color }}>{m.num}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <div className="text-[0.92rem] font-semibold text-white tracking-tight">{m.title}</div>
                            <div className="text-[0.7rem] font-semibold flex-shrink-0" style={{ color: m.color }}>{m.count}</div>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {m.items.map((item, j) => (
                              <span key={j} className="text-[0.7rem] px-2 py-0.5 rounded-md" style={{ background: `${m.color}15`, color: m.color, border: `1px solid ${m.color}25` }}>
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="flex flex-wrap gap-3 mb-8">
                  {mentorFeatures.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(20,110,245,0.12)", border: "1px solid rgba(20,110,245,0.2)" }}>
                        {f.icon}
                      </div>
                      <div>
                        <div className="text-[0.85rem] font-semibold text-white">{f.val}</div>
                        <div className="text-[0.72rem]" style={{ color: "var(--ink-mute)" }}>{f.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/ecom-foundation" className="btn btn-primary">
                  Xem chi tiết khoá học <span className="arrow">→</span>
                </Link>
              </Reveal>
            </div>

            <Reveal delay={0.18}>
              <div className="lg:sticky lg:top-28 flex flex-col gap-3">
                {/* Early-bird featured card */}
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="relative rounded-2xl p-6 overflow-hidden"
                  style={{
                    background: "linear-gradient(160deg, rgba(20,110,245,0.18) 0%, rgba(122,61,255,0.18) 60%, rgba(8,16,43,0.85) 100%)",
                    border: "1px solid rgba(74,214,255,0.35)",
                    boxShadow: "0 24px 60px rgba(20,110,245,0.25), 0 0 0 1px rgba(74,214,255,0.15) inset",
                  }}>
                  <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(74,214,255,0.30), transparent 70%)", filter: "blur(20px)" }} />

                  <div className="relative">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md mb-4" style={{ background: "rgba(74,214,255,0.15)", border: "1px solid rgba(74,214,255,0.3)" }}>
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4ad6ff" }} />
                      <span className="text-[0.6rem] font-bold uppercase tracking-[0.16em]" style={{ color: "#7ee2ff" }}>Mở bán sớm</span>
                    </div>

                    <div className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>Early-bird Khoá 1</div>

                    <div className="flex items-baseline gap-2 mb-1">
                      <div className="text-[2.4rem] font-bold tracking-tight leading-none grad-text">2.999.000<span className="text-[0.95rem] font-normal align-top ml-1">đ</span></div>
                    </div>
                    <div className="flex items-center gap-2 mb-5">
                      <span className="text-[0.85rem] line-through" style={{ color: "rgba(255,255,255,0.4)" }}>4.999.000đ</span>
                      <span className="text-[0.7rem] font-bold px-2 py-0.5 rounded-md" style={{ background: "rgba(0,215,34,0.15)", color: "#5fffaa", border: "1px solid rgba(0,215,34,0.3)" }}>-40%</span>
                    </div>

                    <div className="space-y-2 mb-6 pb-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                      {[
                        "2 tháng học chính + 3 tháng mentoring",
                        "Lớp nhỏ 1–5 người",
                        "100% Offline tại Hà Nội",
                      ].map((b) => (
                        <div key={b} className="flex items-start gap-2 text-[0.82rem]" style={{ color: "rgba(255,255,255,0.78)" }}>
                          <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ad6ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                          {b}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-5 text-[0.78rem]" style={{ color: "rgba(255,255,255,0.65)" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                      </svg>
                      Đăng ký nhóm <strong className="text-white">2+ người</strong> giảm thêm <strong className="grad-text">10%</strong>
                    </div>

                    <Link href="/ecom-foundation#apply" className="btn btn-primary w-full justify-center">
                      Đăng ký Early-bird <span className="arrow">→</span>
                    </Link>
                  </div>
                </motion.div>

                {/* First-cohort flash note */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-xl p-4 flex items-start gap-3"
                  style={{ background: "rgba(255,174,19,0.08)", border: "1px solid rgba(255,174,19,0.25)" }}
                >
                  <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(255,174,19,0.15)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffae13" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <div className="text-[0.78rem] leading-[1.6]">
                    <div className="font-bold mb-0.5" style={{ color: "#ffd479" }}>Khoá đầu tiên · chỉ 999.000đ</div>
                    <div style={{ color: "rgba(255,255,255,0.65)" }}>
                      Số lượng giới hạn —{" "}
                      <a href="https://zalo.me/0868464658" target="_blank" rel="noreferrer" className="underline font-semibold" style={{ color: "#ffd479" }}>
                        inbox mình
                      </a>{" "}
                      để nhận thông tin sớm nhất.
                    </div>
                  </div>
                </motion.div>
              </div>
            </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════ FAQ ═══════════════ */}
        <section id="faq" className="relative">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <Reveal><div className="section-tag">FAQ</div></Reveal>
            <Reveal delay={0.08}>
              <h2 className="t-h2 mb-3 text-white">Câu hỏi thường gặp<br />về <span className="grad-text">khoá học.</span></h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="t-caption mb-10 max-w-[520px]">
                Câu hỏi sâu hơn về curriculum và policy — xem đầy đủ tại trang Khoá học.
              </p>
            </Reveal>
            <div className="max-w-[760px]">
              {faqs.map((f, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <details className="py-5 group" style={{ borderBottom: "1px solid var(--line)" }}>
                    <summary className="flex justify-between items-center cursor-pointer text-[1rem] font-semibold list-none gap-4 text-white group-hover:text-[#7da9ff] transition-colors">
                      {f.q}
                      <span className="flex-shrink-0">
                        <svg className="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7da9ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </summary>
                    <p className="text-[0.95rem] leading-[1.75] mt-3 pr-8" style={{ color: "var(--ink-mute)" }}>{f.a}</p>
                  </details>
                </Reveal>
              ))}
              <div className="mt-8">
                <Link href="/ecom-foundation#faq" className="btn btn-ghost text-[0.85rem] py-2.5">
                  Xem toàn bộ FAQ khoá học <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ CONTACT ═══════════════ */}
        <section id="contact" className="relative overflow-hidden border-t" style={{ borderColor: "var(--line)" }}>
          <div className="blob blob-blue blob-anim" style={{ width: 600, height: 600, top: "-20%", left: "-10%" }} />
          <div className="blob blob-purple blob-anim" style={{ width: 500, height: 500, bottom: "-15%", right: "-10%", animationDelay: "2s" }} />
          <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="lg:pt-4">
                <Reveal><div className="section-tag">Đăng ký & Liên hệ</div></Reveal>
                <Reveal delay={0.08}>
                  <h2 className="t-h1 mb-5 text-white">
                    Sẵn sàng tăng trưởng<br /><span className="grad-text">cùng tôi?</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.14}>
                  <p className="t-body mb-8 max-w-[440px]">
                    Để lại thông tin — mình sẽ liên hệ trong vòng <strong className="text-white">24 giờ</strong> để trao đổi về khoá học hoặc dự án phù hợp với bạn.
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="flex flex-col gap-3.5">
                    {[
                      { href: "mailto:qforwork13@gmail.com", label: "qforwork13@gmail.com", icon: <IconMail /> },
                      { href: "https://zalo.me/0868464658", label: "Zalo: 0868 464 658", icon: <IconChat /> },
                      { href: "https://www.linkedin.com/in/duc-quang-nguyen-b7495223a/", label: "LinkedIn", icon: <IconLinkedIn /> },
                    ].map((c) => (
                      <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                        className="inline-flex items-center gap-3 text-[0.95rem] font-medium transition-colors hover:text-white"
                        style={{ color: "var(--ink-soft)" }}>
                        <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--grad-primary-soft)", border: "1px solid rgba(20,110,245,0.2)" }}>
                          {c.icon}
                        </span>
                        {c.label}
                      </a>
                    ))}
                  </div>
                </Reveal>
              </div>
              <Reveal delay={0.12}><ContactForm /></Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
