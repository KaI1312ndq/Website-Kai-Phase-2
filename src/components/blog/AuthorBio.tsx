import Link from "next/link";

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/duc-quang-nguyen-b7495223a/",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "Zalo",
    href: "https://zalo.me/0868464658",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 5.94 2 10.8c0 2.78 1.5 5.27 3.84 6.9L4.5 22l4.85-2.42c.85.2 1.74.32 2.65.32 5.52 0 10-3.94 10-8.8S17.52 2 12 2z" />
      </svg>
    ),
  },
];

export default function AuthorBio() {
  return (
    <div className="rounded-2xl p-6 md:p-8 mt-12" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Avatar */}
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex-shrink-0 flex items-center justify-center text-[1.4rem] font-bold text-white" style={{ background: "var(--grad-primary)", boxShadow: "0 8px 24px rgba(20,110,245,0.35)" }}>
          NQ
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-[0.66rem] font-bold uppercase tracking-[0.16em] mb-1.5" style={{ color: "#7da9ff" }}>
            Tác giả
          </div>
          <h3 className="text-[1.25rem] md:text-[1.4rem] font-bold tracking-tight text-white mb-2">
            Nguyễn Đức Quảng
          </h3>
          <div className="text-[0.88rem] font-medium mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>
            Ecom Growth Expert · Team Builder · 60+ project Ecom
          </div>
          <p className="text-[0.92rem] leading-[1.7] mb-5" style={{ color: "var(--ink-soft)" }}>
            Đã quản lý growth + team marketing cho 60+ thương hiệu TMĐT tại Việt Nam, từ shop launch 0 đến brand 5+ tỷ GMV/tháng.
            Đoạt giải <strong className="text-white">TikTok Awards 2024 - Best Commerce Campaign Gold</strong>.
            Hiện mentor 20+ marketer trẻ và phụ trách khoá <Link href="/ecom-foundation" className="underline" style={{ color: "#7da9ff" }}>Ecom Foundation</Link>.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <Link href="/ecom-foundation" className="btn btn-primary text-[0.85rem] py-2 px-4">
              Xem khoá học
            </Link>
            <Link href="/#contact" className="text-[0.85rem] font-semibold px-4 py-2 rounded-lg transition-all" style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}>
              Liên hệ Quảng
            </Link>
            <div className="flex items-center gap-2 ml-auto">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.7)" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
