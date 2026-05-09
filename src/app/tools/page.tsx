import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nguyenducquang.website";

export const metadata: Metadata = {
  title: "Tools — Công cụ miễn phí cho seller TMĐT",
  description: "Bộ tools miễn phí cho seller Ecommerce: tính phí sàn TikTok Shop & Shopee, ROAS calculator, P&L template, và nhiều hơn nữa.",
  alternates: { canonical: "/tools" },
  openGraph: {
    type: "website",
    title: "Tools — Công cụ miễn phí cho seller TMĐT",
    description: "Bộ tools miễn phí cho seller Ecommerce: tính phí sàn TikTok & Shopee và nhiều hơn nữa.",
  },
};

const TOOLS = [
  {
    href: "/tools/tinh-phi-san",
    badge: "Mới · 2026",
    title: "Tính phí sàn TikTok Shop & Shopee",
    desc: "So sánh đồng thời 4 phương án Mall vs Non-Mall trên TikTok Shop và Shopee. Áp dụng bảng phí mới 2026, có voucher extra, pi ship, và chi phí tuỳ chỉnh.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ad6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" /><line x1="2" y1="9" x2="22" y2="9" /><line x1="9" y1="3" x2="9" y2="21" />
      </svg>
    ),
    keywords: ["TikTok Shop", "Shopee", "Mall vs Non-Mall", "P&L"],
    available: true,
  },
  {
    href: "#",
    badge: "Sắp có",
    title: "ROAS Calculator",
    desc: "Tính ROAS break-even cần đạt theo cost & target margin. Cho biết campaign target ROAS bao nhiêu là đủ.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7da9ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    keywords: ["ROAS", "Performance"],
    available: false,
  },
  {
    href: "#",
    badge: "Sắp có",
    title: "P&L Template Marketplace",
    desc: "Sheet template tính P&L tháng/quý cho gian hàng TMĐT. Auto-fill từ data sàn, ra report ngay.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><polyline points="2 20 22 20" />
      </svg>
    ),
    keywords: ["P&L", "Template", "Excel"],
    available: false,
  },
];

export default function ToolsPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Tools cho seller TMĐT",
    description: "Bộ công cụ miễn phí: tính phí sàn TikTok & Shopee, ROAS, P&L template.",
    url: `${SITE_URL}/tools`,
    numberOfItems: TOOLS.length,
    itemListElement: TOOLS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: t.available ? `${SITE_URL}${t.href}` : `${SITE_URL}/tools`,
      name: t.title,
      description: t.desc,
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
    ],
  };

  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <div className="blob blob-blue blob-anim" style={{ width: 500, height: 500, top: "-20%", left: "-5%" }} />
          <div className="blob blob-purple blob-anim" style={{ width: 420, height: 420, bottom: "-30%", right: "-5%", animationDelay: "2s" }} />
          <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-16 md:pb-24">
            <div className="section-tag">Tools · Miễn phí</div>
            <h1 className="t-display tracking-tight mb-5 max-w-[840px] text-white">
              Công cụ cho<br /><span className="grad-text">seller TMĐT.</span>
            </h1>
            <p className="t-body-lg max-w-[640px]">
              Bộ tools tự build từ kinh nghiệm thực chiến — tính phí sàn, ROAS, P&L, và nhiều hơn nữa. Tất cả miễn phí, không cần đăng ký.
            </p>
          </div>
        </section>

        <section className="relative">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {TOOLS.map((t) => {
                const inner = (
                  <div className="glass p-7 h-full flex flex-col group">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "var(--grad-primary-soft)", border: "1px solid rgba(20,110,245,0.2)" }}>
                        {t.icon}
                      </div>
                      <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-md" style={{
                        background: t.available ? "rgba(0,215,34,0.10)" : "rgba(255,255,255,0.04)",
                        color: t.available ? "#5fffaa" : "rgba(255,255,255,0.5)",
                        border: t.available ? "1px solid rgba(0,215,34,0.25)" : "1px solid rgba(255,255,255,0.08)",
                      }}>
                        {t.badge}
                      </span>
                    </div>
                    <h2 className="text-[1.1rem] font-semibold tracking-tight text-white mb-3">{t.title}</h2>
                    <p className="text-[0.9rem] leading-[1.65] mb-5 flex-1" style={{ color: "var(--ink-mute)" }}>{t.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {t.keywords.map((k) => <span key={k} className="wf-badge text-[0.7rem]">{k}</span>)}
                    </div>
                    {t.available ? (
                      <div className="text-[0.85rem] font-semibold grad-text group-hover:underline">Mở tool →</div>
                    ) : (
                      <div className="text-[0.85rem] font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>Sắp ra mắt</div>
                    )}
                  </div>
                );
                return t.available ? (
                  <Link key={t.title} href={t.href} className="block h-full">{inner}</Link>
                ) : (
                  <div key={t.title} className="cursor-not-allowed">{inner}</div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
