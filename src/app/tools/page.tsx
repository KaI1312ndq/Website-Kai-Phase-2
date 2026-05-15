import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nguyenducquang.website";

export const metadata: Metadata = {
  title: "Công cụ miễn phí cho seller Ecommerce 2026 - Tính phí sàn, Thuế, ROAS, P&L",
  description: "Bộ 4 công cụ miễn phí cho seller TikTok Shop & Shopee: tính phí sàn theo ngành hàng (cập nhật 29/05/2026), tính thuế TNCN 2026, ROAS calculator và P&L gian hàng. Không đăng ký.",
  keywords: [
    "công cụ ecommerce miễn phí", "tools seller tmđt", "tính phí sàn shopee tiktok",
    "tính thuế tncn 2026", "roas calculator", "p&l gian hàng",
    "công cụ tính lợi nhuận shop", "tools seller shopee", "tools seller tiktok shop",
  ],
  alternates: { canonical: "/tools" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "Công cụ miễn phí cho seller Ecommerce 2026",
    description: "Tính phí sàn TikTok & Shopee, thuế TNCN, ROAS, P&L - 4 tools miễn phí, không đăng ký.",
  },
};

const TOOLS = [
  {
    href: "/tools/tinh-thue-tncn",
    badge: "Hot · 2026",
    title: "Tính Thuế TNCN 2026 (so sánh 2025)",
    desc: "So sánh trực tiếp thuế thu nhập cá nhân theo luật mới 2026 (5 bậc, giảm trừ 15.500.000) vs luật cũ 2025 (7 bậc, giảm trừ 11.000.000). Tự tính BHXH 10.5% + lương Net thực nhận.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5fffaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 13h6M9 17h4" />
      </svg>
    ),
    keywords: ["Thuế TNCN 2026", "Giảm trừ gia cảnh", "Lương Net", "Nghị quyết 110/2025"],
    available: true,
  },
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
    href: "/tools/tach-nen-anh",
    badge: "Mới · AI",
    title: "Tách nền ảnh AI",
    desc: "Xoá nền ảnh sản phẩm cho Shopee/TikTok bằng AI chạy 100% trên trình duyệt. 5 ảnh free/ngày, batch 10 ảnh, nền trong suốt/trắng/màu, crop tỷ lệ chuẩn sàn. Không upload server, không watermark.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff7ad9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3-3-7 7" />
      </svg>
    ),
    keywords: ["Tách nền ảnh", "Remove background", "AI", "Shopee ảnh chính"],
    available: true,
  },
  {
    href: "/tools/roas-calculator",
    badge: "Mới · 2026",
    title: "ROAS Calculator",
    desc: "Tính ROAS break-even cần đạt theo cost & target margin. Cho biết campaign target ROAS bao nhiêu là đủ - có preset phí TikTok Shop & Shopee 2026.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7da9ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    keywords: ["ROAS", "Break-even", "Target Margin", "Performance"],
    available: true,
  },
  {
    href: "/tools/pnl-ecom",
    badge: "Mới · 2026",
    title: "Mẫu P&L Ecom - Báo cáo lãi lỗ",
    desc: "Lập P&L gian hàng TMĐT 5 tầng (Net Revenue  Gross  Contribution  Marketing  EBITDA). Preset phí TikTok Shop & Shopee 2026, có chẩn đoán margin và in PDF.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><polyline points="2 20 22 20" />
      </svg>
    ),
    keywords: ["P&L", "EBITDA", "Contribution Margin", "Báo cáo"],
    available: true,
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
              Bộ tools tự build từ kinh nghiệm thực chiến - tính phí sàn, ROAS, P&L, và nhiều hơn nữa. Tất cả miễn phí, không cần đăng ký.
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
                        background: t.available ? "rgba(0,215,34,0.10)" : "var(--st-04)",
                        color: t.available ? "#5fffaa" : "var(--st-50)",
                        border: t.available ? "1px solid rgba(0,215,34,0.25)" : "1px solid var(--st-08)",
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
                      <div className="text-[0.85rem] font-semibold grad-text group-hover:underline">Mở tool </div>
                    ) : (
                      <div className="text-[0.85rem] font-semibold" style={{ color: "var(--st-40)" }}>Sắp ra mắt</div>
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
