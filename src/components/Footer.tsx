import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "#080808", color: "white" }}>
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(20,110,245,0.6), rgba(122,61,255,0.6), transparent)" }} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 pb-10 grid grid-cols-2 md:grid-cols-12 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-3">
          <Link href="/" className="inline-flex items-center gap-2.5 text-[1.3rem] font-bold tracking-tight text-white">
            <span className="relative w-9 h-9 rounded-[10px] flex items-center justify-center text-white font-bold text-[1rem] overflow-hidden" style={{ background: "var(--grad-primary)", boxShadow: "0 4px 14px rgba(20,110,245,0.45)" }}>
              <span className="relative z-10">K</span>
              <span className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 20%, var(--st-40), transparent 60%)" }} />
            </span>
            Kai<span className="grad-text">.</span>
          </Link>
          <p className="text-[0.92rem] leading-[1.7] max-w-[380px] mt-5" style={{ color: "var(--st-55)" }}>
            Ecom Growth Expert & Team Builder. Giúp thương hiệu tăng trưởng bền vững trên TMĐT - TikTok Shop, Shopee, Meta, Google.
          </p>
          <div className="flex gap-2 mt-6">
            {[
              { href: "https://www.linkedin.com/in/duc-quang-nguyen-b7495223a/", label: "LinkedIn", svg: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> },
              { href: "mailto:qforwork13@gmail.com", label: "Email", svg: <><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" fill="none" stroke="currentColor" strokeWidth="2" /></> },
              { href: "https://zalo.me/0868464658", label: "Zalo", svg: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                className="w-10 h-10 rounded-wf flex items-center justify-center transition-all hover:bg-white/15 hover:-translate-y-0.5"
                style={{ background: "var(--st-06)", color: "var(--st-70)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">{s.svg}</svg>
              </a>
            ))}
          </div>
        </div>

        {/* Columns */}
        <div className="col-span-1 md:col-span-2 md:col-start-5">
          <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] mb-4" style={{ color: "var(--st-45)" }}>Khám phá</h4>
          <ul className="flex flex-col gap-2.5">
            {[
              { label: "Về tôi", href: "/#about" },
              { label: "Chuyên môn", href: "/#expertise" },
              { label: "Hành trình", href: "/#timeline" },
              { label: "Case Studies", href: "/#casestudies" },
              { label: "Blog", href: "/blog" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[0.88rem] transition-colors hover:text-white" style={{ color: "var(--st-55)" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 md:col-span-2">
          <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] mb-4" style={{ color: "var(--st-45)" }}>Dịch vụ</h4>
          <ul className="flex flex-col gap-2.5">
            {[
              { label: "Ecom Consulting", href: "/#contact" },
              { label: "Performance MKT", href: "/#contact" },
              { label: "Team Building", href: "/#contact" },
              { label: "Mentoring 1-1", href: "/ecom-foundation" },
              { label: "Ecom Foundation", href: "/ecom-foundation" },
            ].map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-[0.88rem] transition-colors hover:text-white" style={{ color: "var(--st-55)" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 md:col-span-2">
          <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] mb-4" style={{ color: "var(--st-45)" }}>Tools</h4>
          <ul className="flex flex-col gap-2.5">
            <li>
              <Link href="/tools/tinh-phi-san" className="text-[0.88rem] transition-colors hover:text-white inline-flex items-center gap-2" style={{ color: "var(--st-55)" }}>
                Tính phí sàn TikTok & Shopee
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.14em] px-1.5 py-0.5 rounded" style={{ background: "rgba(0,215,34,0.15)", color: "#5fffaa", border: "1px solid rgba(0,215,34,0.3)" }}>Mới</span>
              </Link>
            </li>
            <li>
              <Link href="/tools" className="text-[0.88rem] transition-colors hover:text-white" style={{ color: "var(--st-55)" }}>
                Tất cả tools
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-3">
          <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] mb-4" style={{ color: "var(--st-45)" }}>Liên hệ</h4>
          <ul className="flex flex-col gap-2.5">
            <li><a href="mailto:qforwork13@gmail.com" className="text-[0.88rem] transition-colors hover:text-white" style={{ color: "var(--st-55)" }}>qforwork13@gmail.com</a></li>
            <li><a href="https://zalo.me/0868464658" className="text-[0.88rem] transition-colors hover:text-white" style={{ color: "var(--st-55)" }}>Zalo: 0868 464 658</a></li>
            <li className="inline-flex items-center gap-1.5 text-[0.78rem] mt-2" style={{ color: "var(--st-35)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Hà Nội, Việt Nam
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "var(--st-08)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[0.78rem]" style={{ color: "var(--st-35)" }}>© 2026 Nguyễn Đức Quảng. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--wf-blue)" }} />
            <span className="text-[0.78rem]" style={{ color: "var(--st-45)" }}>Sẵn sàng nhận dự án & mentoring</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
