import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealWrapper from "@/components/RevealWrapper";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import BrandsCarousel from "@/components/BrandsCarousel";

const IconChart = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="18" y="3" width="4" height="18"/><rect x="10" y="8" width="4" height="13"/><rect x="2" y="13" width="4" height="8"/></svg>;
const IconCoin = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 000 4h4a2 2 0 010 4H8"/><path d="M12 6v2m0 8v2"/></svg>;
const IconUsers = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>;
const IconTrend = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
const IconTeam = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>;
const IconNav = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>;
const IconTarget = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const IconData = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><polyline points="2 20 22 20"/></svg>;
const IconCart = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>;
const IconCheck = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconCheckW = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconChevron = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;
const IconMail = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const IconMsg = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;
const IconCalendar = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IconHeart = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>;
const IconPin = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;

const stats = [
  { icon: <IconChart/>, num: "60", suffix: "+", label: "Dự án Ecommerce", sub: "Triển khai & tối ưu" },
  { icon: <IconCoin/>, num: "10", suffix: "B+", label: "Ngân sách quảng cáo", sub: "Tháng / VNĐ" },
  { icon: <IconUsers/>, num: "12", suffix: "", label: "Thành viên team", sub: "Đã xây dựng & dẫn dắt" },
];

const pillars = [
  { icon: <IconTarget/>, title: "Growth Mindset", desc: "Tập trung vào tăng trưởng bền vững và tối ưu hiệu quả từng đồng ngân sách." },
  { icon: <IconTeam/>, title: "Team Builder", desc: "Xây dựng đội nhóm mạnh, rõ vai trò, quy trình và mục tiêu để đạt kết quả lớn." },
  { icon: <IconData/>, title: "Data Driven", desc: "Dựa trên dữ liệu để ra quyết định, đo lường và tối ưu liên tục." },
  { icon: <IconCart/>, title: "Ecom First", desc: "Hiểu sâu hành vi người mua sắm online và vận hành hệ sinh thái Ecommerce hiệu quả." },
];

const expertise = [
  { icon: <IconTrend/>, title: "Ecommerce Performance Marketing", desc: "Triển khai chiến lược full-funnel trên TikTok, Shopee, Meta, Google với mục tiêu ROAS và tăng trưởng doanh thu.", tags: ["TikTok Ads","Shopee Ads","Meta Ads","Google Ads"] },
  { icon: <IconTeam/>, title: "Team Building & Leadership", desc: "Xây dựng team từ 0→1, thiết lập quy trình, đào tạo, quản trị hiệu suất và văn hóa hướng đến kết quả.", tags: ["Recruitment","Training","OKR/KPI","Operation"] },
  { icon: <IconNav/>, title: "Ecommerce Strategy & Consulting", desc: "Tư vấn mô hình, định vị sản phẩm, chiến lược kênh, chiến lược giá và kế hoạch tăng trưởng dài hạn.", tags: ["Strategy","Brand Positioning","Growth Plan"] },
];

const caseStudies = [
  { platform: "TikTok Shop · Fashion", metric: "11B", unit: "", label: "Doanh thu 3 ngày Super Brand Day", detail: "Top 1 TikTok Shop Fashion", role: "Lead Media + Content Strategy", award: "Best Commerce Campaign Gold — TikTok Awards 2024", tags: ["TikTok Shop","Media","KOC/KOL"] },
  { platform: "Multi-platform · Health & Beauty", metric: "60", unit: "+", label: "Dự án triển khai đồng thời", detail: "TikTok · Shopee · Meta · Google", role: "Digital Marketing Manager", award: "Ngân sách 10B+/tháng, tăng trưởng 5-20%/tháng", tags: ["Performance","Multi-platform","ROAS"] },
  { platform: "Sắp cập nhật", metric: "—", unit: "", label: "Case study thứ 3", detail: "", role: "", award: "", tags: [] },
];

const timeline = [
  { year: "2025 – Nay", title: "Digital Marketing Manager · UpBase", desc: "Xây dựng & phát triển đội ngũ 10 nhân sự trong 5 tháng. Quản lý ngân sách team 8-10 tỷ/tháng, cover doanh thu 50-70 tỷ/tháng. Quản lý 60+ dự án đa nền tảng TikTok, Shopee, Meta, Website, O2O. Mở rộng kênh sang Philippines từ con số 0.", current: true, logo: "UpBase" },
  { year: "T1/2024 – 2025", title: "Ecommerce Executive · UpBase", desc: "Triển khai TikTok Ads cho 18 gian hàng, GMV ~7 tỷ/tháng. Lên plan IMC cho 3 thương hiệu ngân sách ~500M/campaign đạt ROI 6. Mentor 2 nhân sự, nhân viên xuất sắc 2024 & giải nhất dự án tối ưu hoá vận hành.", current: false, logo: "UpBase" },
  { year: "2023", title: "Ecommerce Executive · The Bad God", desc: "Vận hành TikTok Shop & Shopee cho thương hiệu thời trang. Booking KOC/KOL, content performance, media buying.", current: false, logo: "TheBadGod" },
  { year: "2022", title: "Ecommerce Junior · Bigmi / Xiaomi Vietnam", desc: "Vận hành sàn TMĐT, hỗ trợ triển khai campaigns cho ngành hàng gia dụng.", current: false, logo: "Xiaomi" },
  { year: "2021", title: "Bắt đầu hành trình Ecommerce", desc: "Sinh viên Greenwich BTEC FPT. Bắt đầu với Shopee & Facebook Ads từ năm 2 đại học.", current: false, logo: "" },
];

const faqs = [
  { q: "Khoá học này dành cho ai?", a: "Dành cho sinh viên, người mới đi làm, marketer đang muốn chuyển sang Ecom hoặc làm sâu hơn về TMĐT. Không yêu cầu kinh nghiệm trước." },
  { q: "Học xong tôi sẽ làm được gì?", a: "Hiểu cách thị trường TMĐT VN vận hành, biết cách đọc số liệu để ra quyết định, xây được chiến lược cơ bản cho một ngành hàng, và tự tin bước vào môi trường Ecom thực tế." },
  { q: "Khác gì so với các khoá học Ecom khác?", a: "Không dạy tool lẻ hay trick ngắn hạn. Tập trung vào tư duy — cách nhìn thị trường, cách đưa ra quyết định dựa trên data. Cohort nhỏ (1–5 người) nên mỗi buổi học thực sự là thảo luận." },
  { q: "Phần Mentoring 3 tháng bao gồm những gì?", a: "Sau 2 tháng khoá học chính, bạn sẽ có 3 tháng tiếp tục được support 1-1 qua chat hoặc call định kỳ — review CV, định hướng career path trong Ecom." },
  { q: "Làm thế nào để đăng ký?", a: "Nhắn tin qua email hoặc Zalo phía dưới trang. Mình sẽ trao đổi ngắn để hiểu mục tiêu của bạn trước khi confirm tham gia cohort tiếp theo." },
];

const mentorFeatures = [
  { icon: <IconUsers/>, label: "Nhóm nhỏ", val: "1–5 người" },
  { icon: <IconCalendar/>, label: "Thời gian", val: "2 tháng" },
  { icon: <IconHeart/>, label: "Mentoring 1-1", val: "3 tháng tiếp theo" },
  { icon: <IconPin/>, label: "Hình thức", val: "Offline HN / Online" },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>

        {/* HERO */}
        <div style={{ background: "var(--bg)", overflow: "hidden" }}>
          <div className="max-w-[1280px] mx-auto px-12 grid grid-cols-1 md:grid-cols-2 items-end" style={{ minHeight: "560px" }}>
            <div className="pb-12 pt-16">
              <div className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-7"
                style={{ background: "var(--blue-sky)", border: "1px solid var(--blue-soft)", color: "var(--blue)" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--blue)" }}></span>
                Digital Marketing Manager
              </div>
              <h1 className="text-[clamp(2.6rem,5vw,4.2rem)] font-extrabold leading-[1.1] tracking-tight mb-5">
                Build teams.<br/>
                Scale brands.<br/>
                <span style={{ color: "var(--blue)" }}>Grow</span> smarter.
              </h1>
              <p className="text-[1rem] leading-[1.7] max-w-[480px] mb-8" style={{ color: "var(--muted)" }}>
                Tôi giúp thương hiệu tăng trưởng bền vững trên TikTok Shop, Shopee, Meta và các nền tảng Ecommerce.
              </p>
              <div className="flex gap-3 mb-9">
                {[
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.18 8.18 0 004.78 1.52V6.86a4.85 4.85 0 01-1.01-.17z" fill="#000"/></svg>, label: "TikTok" },
                  { icon: <svg width="20" height="20" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg"><rect width="192" height="192" rx="32" fill="#EE4D2D"/><path d="M96 28c-22 0-40 18-40 40H40a8 8 0 00-8 8.8l10 88A8 8 0 0050 172h92a8 8 0 008-7.2l10-88A8 8 0 00152 68h-16c0-22-18-40-40-40zm0 14c14.4 0 26 11.6 26 26H70c0-14.4 11.6-26 26-26z" fill="white"/><circle cx="76" cy="120" r="10" fill="#EE4D2D"/><circle cx="116" cy="120" r="10" fill="#EE4D2D"/></svg>, label: "Shopee" },
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="#0866FF"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>, label: "Meta" },
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>, label: "Google" },
                ].map((p) => (
                  <div key={p.label} className="w-11 h-11 rounded-xl flex items-center justify-center hover:-translate-y-0.5 transition-transform cursor-default"
                    style={{ background: "white", border: "1px solid var(--border)", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                    {p.icon}
                  </div>
                ))}
              </div>
              <div className="flex gap-4 items-center flex-wrap">
                <Link href="/#contact" className="inline-flex items-center gap-2 text-white font-semibold text-[0.9rem] px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: "var(--blue)" }}>
                  Làm việc cùng tôi →
                </Link>
                <Link href="/#casestudies" className="inline-flex items-center gap-1.5 font-medium text-[0.9rem] transition-colors py-3"
                  style={{ color: "var(--muted)" }}>
                  Xem kết quả tôi đã làm →
                </Link>
              </div>
            </div>
            <div className="relative flex justify-end items-end overflow-visible -mr-12">
              <div className="absolute w-[360px] h-[420px] z-0 blur-sm" style={{ top:0, left:"-60px", background: "radial-gradient(ellipse at 50% 40%, var(--blue-sky) 0%, var(--blue-soft) 55%, transparent 100%)", borderRadius: "50% 50% 40% 60%/60% 40% 60% 40%" }}></div>
              <div className="absolute w-[100px] h-[100px] z-0 opacity-70" style={{ bottom:"20px", left:"-20px", backgroundImage:"radial-gradient(var(--blue-soft) 1.5px, transparent 1.5px)", backgroundSize:"14px 14px" }}></div>
              <img src="/kai-photo.png" alt="Nguyễn Đức Quảng" className="relative z-10 w-full block object-cover object-top"
                style={{ maxWidth:"500px", minHeight:"560px", maxHeight:"680px" }}/>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div style={{ background:"white", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
          <div className="max-w-[1280px] mx-auto px-12 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{ borderColor:"var(--border)" }}>
            {stats.map((s, i) => (
              <RevealWrapper key={i} delay={i * 80} className="flex items-center gap-5 px-10 py-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background:"var(--blue-sky)" }}>{s.icon}</div>
                <div>
                  <div className="text-[2rem] font-extrabold tracking-tight leading-none">{s.num}<span style={{ color:"var(--blue)" }}>{s.suffix}</span></div>
                  <div className="text-[0.88rem] font-semibold mt-1">{s.label}</div>
                  <div className="text-[0.78rem]" style={{ color:"var(--muted)" }}>{s.sub}</div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>

        {/* BRANDS CAROUSEL */}
        <BrandsCarousel />

        {/* ABOUT */}
        <div id="about" style={{ background:"white" }}>
          <div className="max-w-[1280px] mx-auto px-12 py-24 grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <div>
              <RevealWrapper><div className="section-tag">Về tôi</div></RevealWrapper>
              <RevealWrapper delay={100}><h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold leading-[1.15] tracking-tight mb-6">Tư duy chiến lược.<br/>Thực thi kỷ luật.<br/><span style={{ color:"var(--blue)" }}>Tăng trưởng bền vững.</span></h2></RevealWrapper>
              <RevealWrapper delay={180}>
                <p className="text-[0.95rem] leading-[1.8] mb-4" style={{ color:"var(--muted)" }}>Hơn 5 năm kinh nghiệm trong lĩnh vực <strong style={{ color:"var(--text)" }}>Digital Marketing và Ecommerce</strong>. Tập trung vào hiệu quả thực tế, xây dựng hệ thống, đội nhóm và chiến lược tăng trưởng.</p>
                <p className="text-[0.95rem] leading-[1.8] mb-8" style={{ color:"var(--muted)" }}>Tại <strong style={{ color:"var(--text)" }}>UpBase</strong>, quản lý team 12 người phụ trách 60+ dự án trên TikTok Shop, Shopee, Meta, Google với ngân sách <strong style={{ color:"var(--text)" }}>10 tỷ VNĐ/tháng</strong>.</p>
                <a href="/#contact" className="inline-flex items-center gap-2 font-semibold text-[0.88rem] px-5 py-2.5 rounded-lg border-2 transition-all hover:text-blue-600" style={{ borderColor:"var(--border)", color:"var(--text)" }}>Tìm hiểu thêm về tôi →</a>
              </RevealWrapper>
            </div>
            <div className="grid grid-cols-2 gap-4" style={{ alignItems: "stretch" }}>
              {pillars.map((p, i) => (
                <RevealWrapper key={i} delay={i * 80}>
                  <div className="rounded-2xl p-5 border transition-all hover:shadow-md cursor-default h-full" style={{ background:"var(--bg)", border:"1px solid var(--border)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background:"var(--blue-sky)" }}>{p.icon}</div>
                    <div className="text-[0.92rem] font-bold mb-1.5">{p.title}</div>
                    <div className="text-[0.8rem] leading-[1.6]" style={{ color:"var(--muted)" }}>{p.desc}</div>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </div>

        {/* EXPERTISE */}
        <div id="expertise" style={{ background:"var(--bg)" }}>
          <div className="max-w-[1280px] mx-auto px-12 py-24">
            <RevealWrapper><div className="section-tag">Chuyên môn</div></RevealWrapper>
            <RevealWrapper delay={100}><p className="text-[0.88rem] mb-10" style={{ color:"var(--muted)" }}>3 mảng chuyên môn chính</p></RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {expertise.map((c, i) => (
                <RevealWrapper key={i} delay={i * 80}>
                  <div className="bg-white rounded-2xl p-8 border transition-all hover:-translate-y-1 hover:shadow-xl cursor-default h-full flex flex-col" style={{ border:"1px solid var(--border)" }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background:"var(--blue-sky)" }}>{c.icon}</div>
                    <h3 className="text-[1rem] font-bold mb-3 leading-snug">{c.title}</h3>
                    <p className="text-[0.85rem] leading-[1.7] mb-5" style={{ color:"var(--muted)" }}>{c.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {c.tags.map((t) => <span key={t} className="text-[0.72rem] font-semibold px-2.5 py-1 rounded-full" style={{ background:"var(--blue-sky)", color:"var(--blue)", border:"1px solid var(--blue-soft)" }}>{t}</span>)}
                    </div>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </div>

        {/* CASE STUDIES */}
        <div id="casestudies" style={{ background:"white" }}>
          <div className="max-w-[1280px] mx-auto px-12 py-24">
            <RevealWrapper><div className="section-tag">Kết quả thực tế</div></RevealWrapper>
            <RevealWrapper delay={100}><h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold tracking-tight mb-3">Case Studies</h2></RevealWrapper>
            <RevealWrapper delay={160}><p className="text-[0.95rem] mb-12 max-w-lg" style={{ color:"var(--muted)" }}>Những con số thực tế từ các dự án đã triển khai.</p></RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {caseStudies.map((cs, i) => (
                <RevealWrapper key={i} delay={i * 80}>
                  <div className="rounded-2xl p-7 h-full transition-all hover:shadow-md" style={{ borderTop:"3px solid var(--blue)", border:"1px solid var(--border)", background: cs.tags.length === 0 ? "var(--bg)" : "white" }}>
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background:"var(--blue-sky)" }}><IconTrend/></div>
                      <span className="text-[0.72rem] font-bold uppercase tracking-wider" style={{ color:"var(--blue)" }}>{cs.platform}</span>
                    </div>
                    <div className="text-[2.2rem] font-extrabold tracking-tight leading-none mb-1.5">{cs.metric}<span style={{ color:"var(--blue)" }}>{cs.unit}</span></div>
                    <p className="text-[0.78rem] mb-4 leading-snug" style={{ color:"var(--muted)" }}>{cs.label}{cs.detail && <><br/><strong style={{ color:"var(--text)" }}>{cs.detail}</strong></>}</p>
                    {cs.tags.length > 0 && <div className="flex flex-wrap gap-1.5 mb-4">{cs.tags.map((t) => <span key={t} className="text-[0.72rem] font-semibold px-2.5 py-1 rounded-full" style={{ background:"var(--blue-sky)", color:"var(--blue)", border:"1px solid var(--blue-soft)" }}>{t}</span>)}</div>}
                    {cs.award && <p className="text-[0.78rem] pt-4 border-t" style={{ borderColor:"var(--border)", color:"var(--blue)" }}>→ {cs.award}</p>}
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </div>

        {/* TIMELINE */}
        <div id="timeline" style={{ background:"var(--bg)" }}>
          <div className="max-w-[1280px] mx-auto px-12 py-24">
            <RevealWrapper><div className="section-tag">Hành trình</div></RevealWrapper>
            <RevealWrapper delay={100}><h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold tracking-tight mb-14">Từng bước xây dựng <span style={{ color:"var(--blue)" }}>sự nghiệp.</span></h2></RevealWrapper>
            <div className="max-w-[720px]">
              {timeline.map((t, i) => (
                <RevealWrapper key={i} delay={i * 80} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: t.current ? "var(--blue)" : "var(--bg)", border: t.current ? "none" : "2px solid var(--blue-soft)" }}>
                      {t.current ? <IconCheckW/> : <IconCheck/>}
                    </div>
                    {i < timeline.length - 1 && <div className="w-[2px] flex-1 my-1.5" style={{ background:"var(--border)", minHeight:"40px" }}></div>}
                  </div>
                  <div className="pb-10 flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="text-[0.72rem] font-bold uppercase tracking-widest" style={{ color:"var(--blue)" }}>{t.year}</div>
                      {t.logo === "UpBase" && <span className="text-[0.68rem] font-bold px-2 py-0.5 rounded-full" style={{ background:"#0052CC", color:"white" }}>UpBase</span>}
                      {t.logo === "TheBadGod" && <span className="text-[0.68rem] font-bold px-2 py-0.5 rounded-full" style={{ background:"#1a5c2a", color:"white" }}>The Bad God</span>}
                      {t.logo === "Xiaomi" && <span className="text-[0.68rem] font-bold px-2 py-0.5 rounded-full" style={{ background:"#FF6900", color:"white" }}>Xiaomi</span>}
                    </div>
                    <div className="text-[1rem] font-bold mb-1.5">{t.title}</div>
                    <div className="text-[0.88rem] leading-[1.7]" style={{ color:"var(--muted)" }}>{t.desc}</div>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div id="testimonials" style={{ background:"white" }}>
          <div className="max-w-[1280px] mx-auto px-12 py-24">
            <RevealWrapper><div className="section-tag">Nhận xét</div></RevealWrapper>
            <RevealWrapper delay={100}><h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold tracking-tight mb-12">Người đã làm việc<br/>cùng tôi nói gì.</h2></RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[0,1,2].map((i) => (
                <RevealWrapper key={i} delay={i * 80}>
                  <div className="bg-white rounded-2xl p-7 border h-full" style={{ border:"1px solid var(--border)" }}>
                    <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_,j)=><span key={j} className="text-yellow-400 text-base">★</span>)}</div>
                    <p className="text-[0.9rem] leading-[1.8] italic mb-5" style={{ color:"var(--muted)" }}>"Sắp cập nhật — nhận xét từ client hoặc đồng nghiệp."</p>
                    <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor:"var(--border)" }}>
                      <div className="w-10 h-10 rounded-full flex-shrink-0" style={{ background:"var(--blue-sky)" }}></div>
                      <div>
                        <div className="text-[0.85rem] font-bold">Tên · Chức vụ</div>
                        <div className="text-[0.75rem]" style={{ color:"var(--muted)" }}>Công ty</div>
                      </div>
                    </div>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </div>

        {/* MENTORING */}
        <div id="mentoring" style={{ background:"var(--dark)" }}>
          <div className="max-w-[1280px] mx-auto px-12 py-24 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-20 items-center">
            <div>
              <RevealWrapper><div className="section-tag" style={{ color:"#60A5FA" }}>Chương trình Mentoring</div></RevealWrapper>
              <RevealWrapper delay={100}><h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold tracking-tight text-white mb-4">Ecom <span style={{ color:"var(--blue)" }}>Foundation</span></h2></RevealWrapper>
              <RevealWrapper delay={160}><p className="text-[0.95rem] leading-[1.8] mb-6" style={{ color:"rgba(255,255,255,0.55)" }}>Chương trình mentoring 1-1 / nhóm nhỏ giúp bạn xây nền tảng Ecommerce bài bản. Không phải một khoá học về kỹ năng — mà về tư duy để gia nhập thị trường.</p>
              <div className="mb-9">
                <p className="text-[0.78rem] font-bold uppercase tracking-widest mb-4" style={{ color:"rgba(255,255,255,0.35)" }}>Nội dung chương trình (5 giai đoạn)</p>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { num: "01", title: "Tổng quan thị trường TMĐT", items: ["Thị phần các sàn VN/SEA", "Hành vi người mua sắm online", "Omni Channel & Customer Journey"] },
                    { num: "02", title: "Chiến lược kinh doanh Ecom", items: ["Kinh doanh TikTok Shop & Shopee", "Chiến lược sản phẩm & thị trường", "Phân tích đối thủ & định vị brand"] },
                    { num: "03", title: "Performance Marketing", items: ["TikTok Ads từ A→Z", "Shopee Ads & Facebook Ads", "Đọc data & tối ưu campaign"] },
                    { num: "04", title: "Vận hành & Lập kế hoạch", items: ["Lập kế hoạch & báo cáo thực chiến", "Phân tích data & đề xuất giải pháp", "Setup Ads & quản lý KOC/KOL"] },
                    { num: "05", title: "P/L & Chiến lược dài hạn", items: ["P/L Marketplace", "Plan Digital Marketing 1 năm", "Conversion Tracking & Analytics"] },
                  ].map((stage, i) => (
                    <div key={i} className="rounded-xl px-4 py-3" style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)" }}>
                      <div className="flex items-start gap-3">
                        <span className="text-[0.72rem] font-black flex-shrink-0 mt-0.5" style={{ color:"var(--blue)" }}>{stage.num}</span>
                        <div>
                          <div className="text-[0.85rem] font-bold text-white mb-1">{stage.title}</div>
                          <div className="flex flex-wrap gap-1.5">
                            {stage.items.map((item, j) => (
                              <span key={j} className="text-[0.72rem] px-2 py-0.5 rounded-full" style={{ background:"rgba(37,99,235,0.2)", color:"#93C5FD" }}>{item}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div></RevealWrapper>
              <RevealWrapper delay={200}>
                <div className="flex flex-wrap gap-4 mb-9">
                  {mentorFeatures.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)" }}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:"rgba(37,99,235,0.2)" }}>{f.icon}</div>
                      <div>
                        <div className="text-[0.8rem] font-semibold text-white">{f.val}</div>
                        <div className="text-[0.72rem]" style={{ color:"rgba(255,255,255,0.45)" }}>{f.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <a href="/#contact" className="inline-flex items-center gap-2 text-white font-semibold text-[0.92rem] px-7 py-3.5 rounded-lg hover:opacity-90 transition-all hover:-translate-y-0.5" style={{ background:"var(--blue)" }}>Tìm hiểu chi tiết →</a>
              </RevealWrapper>
            </div>
            <RevealWrapper delay={160}>
              <div className="rounded-2xl p-10 text-center" style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", minWidth:"250px" }}>
                <div className="text-[0.72rem] font-bold uppercase tracking-widest mb-3" style={{ color:"rgba(255,255,255,0.4)" }}>Đầu tư</div>
                <div className="text-[3.5rem] font-extrabold text-white tracking-tight leading-none mb-1">3–5<span className="text-[1.2rem] font-normal" style={{ color:"rgba(255,255,255,0.4)" }}>M</span></div>
                <div className="text-[0.82rem] mb-8" style={{ color:"rgba(255,255,255,0.4)" }}>VNĐ / người</div>
                <a href="/#contact" className="flex justify-center items-center gap-2 text-white font-semibold text-[0.88rem] px-6 py-3 rounded-lg w-full hover:opacity-90 transition-all" style={{ background:"var(--blue)" }}>Tìm hiểu chi tiết →</a>
              </div>
            </RevealWrapper>
          </div>
        </div>

        {/* FAQ */}
        <div id="faq" style={{ background:"white" }}>
          <div className="max-w-[1280px] mx-auto px-12 py-24">
            <RevealWrapper><div className="section-tag">FAQ</div></RevealWrapper>
            <RevealWrapper delay={100}><h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold tracking-tight mb-12">Câu hỏi thường gặp<br/>về <span style={{ color:"var(--blue)" }}>Mentoring.</span></h2></RevealWrapper>
            <div className="max-w-[720px]">
              {faqs.map((f, i) => (
                <RevealWrapper key={i} delay={i * 60}>
                  <details className="py-5" style={{ borderBottom:"1px solid var(--border)" }}>
                    <summary className="flex justify-between items-center cursor-pointer text-[0.95rem] font-semibold list-none">
                      {f.q}
                      <span className="flex-shrink-0 ml-4"><IconChevron/></span>
                    </summary>
                    <p className="text-[0.88rem] leading-[1.8] mt-3 pr-8" style={{ color:"var(--muted)" }}>{f.a}</p>
                  </details>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div id="contact" style={{ background:"linear-gradient(135deg, var(--blue-sky) 0%, var(--bg) 100%)", borderTop:"1px solid var(--blue-soft)" }}>
          <div className="max-w-[1100px] mx-auto px-12 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

              {/* Left — headline */}
              <div className="md:pt-4">
                <RevealWrapper><div className="section-tag">Đăng ký & Liên hệ</div></RevealWrapper>
                <RevealWrapper delay={100}>
                  <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold tracking-tight mb-5">
                    Sẵn sàng tăng<br/>trưởng cùng tôi?
                  </h2>
                </RevealWrapper>
                <RevealWrapper delay={160}>
                  <p className="text-[0.95rem] leading-[1.8] mb-8" style={{ color:"var(--muted)" }}>
                    Để lại thông tin — mình sẽ liên hệ trong vòng <strong style={{ color:"var(--text)" }}>24 giờ</strong> để trao đổi về khoá học hoặc dự án phù hợp với bạn.
                  </p>
                </RevealWrapper>
                <RevealWrapper delay={200}>
                  <div className="flex flex-col gap-4">
                    <a href="mailto:qforwork13@gmail.com" className="inline-flex items-center gap-3 text-[0.88rem] font-medium transition-colors hover:text-blue-600" style={{ color:"var(--muted)" }}>
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:"var(--blue-sky)" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      </span>
                      qforwork13@gmail.com
                    </a>
                    <a href="https://zalo.me/0868464658" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-[0.88rem] font-medium transition-colors hover:text-blue-600" style={{ color:"var(--muted)" }}>
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:"var(--blue-sky)" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                      </span>
                      Zalo: 0868 464 658
                    </a>
                    <a href="https://www.linkedin.com/in/duc-quang-nguyen-b7495223a/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-[0.88rem] font-medium transition-colors hover:text-blue-600" style={{ color:"var(--muted)" }}>
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:"var(--blue-sky)" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#2563EB"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </span>
                      LinkedIn
                    </a>
                  </div>
                </RevealWrapper>
              </div>

              {/* Right — form */}
              <RevealWrapper delay={120}>
                <ContactForm />
              </RevealWrapper>

            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
