import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import Icon from "@/components/icons/Icon";

export const metadata: Metadata = {
  title: "Trang không tồn tại - 404",
  description: "Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển. Khám phá các tools, blog và quizzes của Quảng.",
};

const POPULAR_LINKS = [
  { href: "/tools", label: "Tools miễn phí", desc: "3 tools tính phí sàn, ROAS, P&L", icon: "tool" as const, color: "#4ad6ff" },
  { href: "/quiz", label: "Test miễn phí", desc: "MBTI, Phong cách lãnh đạo, Hướng nghiệp", icon: "test-tube" as const, color: "#a78bff" },
  { href: "/blog", label: "Blog & Insights", desc: "50+ bài về Ecom, Performance, Career", icon: "book-open" as const, color: "#5fffaa" },
  { href: "/ecom-foundation", label: "Khoá Ecom Foundation", desc: "12 buổi build P&L thực chiến", icon: "graduation-cap" as const, color: "#7da9ff" },
];

const PILLAR_LINKS = [
  { href: "/ecom", label: "Ecom" },
  { href: "/index", label: "Marketing Index" },
  { href: "/self-discovery", label: "Self-Discovery" },
  { href: "/career", label: "Career" },
];

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden min-h-[80vh] flex items-center" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "blue", size: 500, top: "-20%", right: "-5%" },
            { variant: "purple", size: 420, bottom: "-30%", left: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 py-20 md:py-28 w-full">
            {/* 404 hero */}
            <div className="text-center mb-14">
              <div className="text-[6rem] md:text-[8rem] font-extrabold leading-none grad-text mb-2">404</div>
              <h1 className="text-[1.5rem] md:text-[2rem] font-bold text-white mb-4">
                Trang này không tồn tại
              </h1>
              <p className="text-[1rem] max-w-[560px] mx-auto" style={{ color: "var(--ink-soft)" }}>
                Có thể URL đã thay đổi, hoặc bạn vừa gõ nhầm. Đừng lo - site có nhiều thứ hay khám phá ở dưới.
              </p>
            </div>

            {/* Popular links */}
            <div>
              <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-4 text-center" style={{ color: "rgba(255,255,255,0.5)" }}>
                Đang phổ biến
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {POPULAR_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="rounded-xl p-5 flex items-start gap-4 transition-all hover:scale-[1.01]"
                    style={{ background: `${l.color}10`, border: `1px solid ${l.color}30` }}
                  >
                    <span
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${l.color}25`, border: `1px solid ${l.color}55`, color: l.color }}
                    >
                      <Icon name={l.icon} size={22} strokeWidth={1.8} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[1rem] font-bold text-white mb-1">{l.label}</div>
                      <div className="text-[0.85rem] leading-snug" style={{ color: "var(--ink-mute)" }}>{l.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pillars */}
              <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3 text-center" style={{ color: "rgba(255,255,255,0.5)" }}>
                Hoặc khám phá theo chủ đề
              </div>
              <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
                {PILLAR_LINKS.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="px-4 py-2 rounded-lg text-[0.85rem] font-semibold transition-all"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.85)" }}
                  >
                    {p.label}
                  </Link>
                ))}
              </div>

              {/* Search via blog */}
              <div className="text-center">
                <p className="text-[0.85rem] mb-3" style={{ color: "var(--ink-mute)" }}>
                  Hoặc tìm bài viết theo từ khoá:
                </p>
                <Link href="/blog" className="btn btn-primary">
                  Vào trang Blog tìm kiếm
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
