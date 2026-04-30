import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "var(--dark)" }}>
      <div className="max-w-[1280px] mx-auto px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <div className="text-[1.3rem] font-extrabold tracking-tight mb-3 text-white">
            Kai<span style={{ color: "var(--blue)" }}>.</span>
          </div>
          <p className="text-[0.82rem] leading-[1.7] mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>
            Ecom Growth Expert & Team Builder. Giúp thương hiệu tăng trưởng bền vững trên TMĐT.
          </p>
          <div className="flex gap-3">
            <a href="https://www.linkedin.com/in/duc-quang-nguyen-b7495223a/" target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:qforwork13@gmail.com"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
            <a href="https://zalo.me/0868464658" target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-[0.78rem] font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>Khám phá</h4>
          <ul className="flex flex-col gap-3">
            {[
              { label: "Về tôi", href: "/#about" },
              { label: "Chuyên môn", href: "/#expertise" },
              { label: "Hành trình", href: "/#timeline" },
              { label: "Case Studies", href: "/#casestudies" },
              { label: "Blog", href: "/blog" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[0.85rem] transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[0.78rem] font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>Dịch vụ</h4>
          <ul className="flex flex-col gap-3">
            {[
              { label: "Ecom Consulting", href: "/#contact" },
              { label: "Performance Marketing", href: "/#contact" },
              { label: "Team Building", href: "/#contact" },
              { label: "Mentoring 1-1", href: "/#mentoring" },
              { label: "Khoá học Ecom Foundation", href: "/#mentoring" },
            ].map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-[0.85rem] transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[0.78rem] font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>Liên hệ</h4>
          <ul className="flex flex-col gap-3">
            <li><a href="mailto:qforwork13@gmail.com" className="text-[0.85rem] transition-colors hover:text-white flex items-center gap-2" style={{ color: "rgba(255,255,255,0.4)" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>qforwork13@gmail.com</a></li>
            <li><a href="https://zalo.me/0868464658" target="_blank" rel="noreferrer" className="text-[0.85rem] transition-colors hover:text-white flex items-center gap-2" style={{ color: "rgba(255,255,255,0.4)" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Zalo: 0868 464 658</a></li>
            <li><a href="https://www.linkedin.com/in/duc-quang-nguyen-b7495223a/" target="_blank" rel="noreferrer" className="text-[0.85rem] transition-colors hover:text-white flex items-center gap-2" style={{ color: "rgba(255,255,255,0.4)" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>LinkedIn</a></li>
            <li className="mt-1"><span className="text-[0.78rem]" style={{ color: "rgba(255,255,255,0.25)" }}>📍 Hà Nội, Việt Nam</span></li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1280px] mx-auto px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[0.75rem]" style={{ color: "rgba(255,255,255,0.2)" }}>© 2026 Nguyễn Đức Quảng. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--blue)" }}></div>
            <span className="text-[0.75rem]" style={{ color: "rgba(255,255,255,0.3)" }}>Sẵn sàng nhận dự án & mentoring</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
