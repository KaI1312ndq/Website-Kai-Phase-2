import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Tính phí sàn TikTok Shop & Shopee 2026 — Công cụ miễn phí",
  description:
    "Công cụ tính phí sàn TikTok Shop và Shopee chính xác — so sánh đồng thời 4 phương án Mall · Non-Mall, áp dụng phí mới 2026. Miễn phí, không cần đăng ký.",
  keywords: [
    "tính phí sàn",
    "phí sàn tiktok",
    "phí sàn shopee",
    "công cụ tính phí sàn tiktok",
    "công cụ tính phí sàn shopee",
    "phí hoa hồng tiktok shop",
    "phí hoa hồng shopee mall",
    "tính lợi nhuận sàn",
    "p&l shopee",
    "p&l tiktok shop",
  ],
  alternates: { canonical: "/tools/tinh-phi-san" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "Tính phí sàn TikTok Shop & Shopee 2026 — Công cụ miễn phí",
    description: "So sánh phí Mall vs Non-Mall trên TikTok Shop và Shopee đồng thời. Phí 2026, có voucher extra, pi ship, chi phí ads/marketing tuỳ chỉnh.",
  },
};

export default function Page() {
  // Schema.org WebApplication structured data — for Google rich results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Tính phí sàn TikTok Shop & Shopee",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: "Công cụ tính phí sàn TikTok Shop và Shopee, so sánh Mall vs Non-Mall, áp dụng bảng phí mới 2026.",
    url: "https://nguyenducquang.website/tools/tinh-phi-san",
    inLanguage: "vi-VN",
    isAccessibleForFree: true,
    creator: { "@type": "Person", name: "Nguyễn Đức Quảng" },
    offers: { "@type": "Offer", price: 0, priceCurrency: "VND" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Phí sàn TikTok Shop 2026 bao nhiêu phần trăm?",
        acceptedAnswer: { "@type": "Answer", text: "Từ 09/05/2026, phí hoa hồng nền tảng TikTok Shop dao động 11.5%–17.8% tuỳ ngành hàng và loại shop (Mall hoặc Non-Mall). Default rate là 12.5% Non-Mall và 15.5% Mall. Ngoài ra có phí giao dịch 6% và phí xử lý đơn 3.000đ/đơn." },
      },
      {
        "@type": "Question",
        name: "Phí sàn Shopee Mall và Non-Mall khác nhau thế nào?",
        acceptedAnswer: { "@type": "Answer", text: "Shopee Mall thường có phí hoa hồng cao hơn Non-Mall 3-5% tuỳ ngành hàng. Cả 2 đều có thêm phí giao dịch 6% và phí cơ sở hạ tầng 3.000đ/đơn. Phí áp dụng từ 08/05/2026 đã bao gồm thuế GTGT 8%." },
      },
      {
        "@type": "Question",
        name: "Voucher Extra Plus của TikTok khác Voucher Extra như thế nào?",
        acceptedAnswer: { "@type": "Answer", text: "Voucher Extra của TikTok Shop là 4% giá trị đơn hàng (cap 50.000đ). Voucher Extra Plus là 5.5% (cap 80.000đ) với nhiều ưu đãi giảm giá độc quyền hơn cho shop." },
      },
      {
        "@type": "Question",
        name: "Tại sao kết quả tool có sự chênh lệch giữa Mall và Non-Mall?",
        acceptedAnswer: { "@type": "Answer", text: "Mall trả phí hoa hồng cao hơn Non-Mall vì shop được hưởng độ tin cậy thương hiệu, ưu tiên hiển thị và chính sách hỗ trợ tốt hơn. So sánh trong tool giúp bạn quyết định có nên đăng ký Mall hay không dựa trên margin." },
      },
      {
        "@type": "Question",
        name: "Tool có tính phí Pi Ship của Shopee không?",
        acceptedAnswer: { "@type": "Answer", text: "Có. Pi Ship là phí 1.600đ/đơn, áp dụng khi seller đăng ký dịch vụ. Bật/tắt qua checkbox trong phần Phí option." },
      },
    ],
  };

  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

        {/* HERO */}
        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <div className="blob blob-blue blob-anim" style={{ width: 600, height: 600, top: "-15%", left: "-10%" }} />
          <div className="blob blob-purple blob-anim" style={{ width: 500, height: 500, bottom: "-20%", right: "-10%", animationDelay: "3s" }} />
          <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-12 md:pb-16">
            <Link href="/tools" className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium mb-6 transition-colors hover:text-white" style={{ color: "var(--ink-mute)" }}>
              ← Tất cả Tools
            </Link>
            <div className="section-tag">Tools · Miễn phí</div>
            <h1 className="t-h1 mb-4 leading-[1.1] text-white max-w-[820px]">
              Tính phí sàn <span className="grad-text">TikTok Shop & Shopee.</span>
            </h1>
            <p className="t-body-lg max-w-[760px] mb-6">
              Công cụ tính phí sàn cho seller TMĐT — so sánh đồng thời 4 phương án <strong className="text-white">Mall vs Non-Mall</strong> trên TikTok Shop và Shopee, áp dụng bảng phí mới 2026.
              Hỗ trợ voucher extra, pi ship, và chi phí ads/marketing tuỳ chỉnh.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Phí TikTok Shop 2026", "Phí Shopee Mall", "Voucher Extra Plus", "Pi Ship", "P&L gian hàng"].map((tag) => (
                <span key={tag} className="wf-badge text-[0.72rem]">{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* CALCULATOR */}
        <section className="relative">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 md:py-16">
            <Calculator />
          </div>
        </section>

        {/* HOW-TO */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-20">
            <div className="section-tag">Hướng dẫn</div>
            <h2 className="t-h2 mb-8 text-white">Cách dùng <span className="grad-text">tool tính phí sàn.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
              {[
                { n: "01", t: "Nhập sản phẩm", d: "Giá bán, giá vốn (COGS), và voucher seller áp dụng. Đây là 3 thông số quyết định doanh thu thực." },
                { n: "02", t: "Chọn ngành hàng", d: "Pick ngành cấp 1/2/3 cho TikTok và Shopee riêng. Tool sẽ auto tra phí hoa hồng theo bảng 2026 cho cả Mall + Non-Mall." },
                { n: "03", t: "So sánh 4 phương án", d: "Output hiện song song lợi nhuận và margin của 4 option. Card 'Best' highlight phương án lãi cao nhất." },
              ].map((s) => (
                <div key={s.n} className="glass p-6">
                  <div className="text-[1.6rem] font-bold tracking-tight grad-text leading-none mb-3">{s.n}</div>
                  <div className="text-[1rem] font-semibold text-white mb-2">{s.t}</div>
                  <div className="text-[0.88rem] leading-[1.65]" style={{ color: "var(--ink-mute)" }}>{s.d}</div>
                </div>
              ))}
            </div>

            {/* Fee structure tables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
              <div className="glass p-6">
                <h3 className="text-[1.05rem] font-semibold text-white mb-4 tracking-tight">Phí TikTok Shop 2026</h3>
                <ul className="space-y-2.5 text-[0.9rem]" style={{ color: "var(--ink-soft)" }}>
                  <li>• <strong className="text-white">Hoa hồng nền tảng:</strong> 11.5%–17.8% (tuỳ ngành hàng + Mall/Non-Mall)</li>
                  <li>• <strong className="text-white">Phí giao dịch:</strong> 6%</li>
                  <li>• <strong className="text-white">Phí xử lý đơn:</strong> 3.000đ/đơn</li>
                  <li>• <strong className="text-white">Voucher Extra:</strong> 4% (cap 50.000đ) — đăng ký</li>
                  <li>• <strong className="text-white">Voucher Extra Plus:</strong> 5.5% (cap 80.000đ) — đăng ký</li>
                </ul>
              </div>
              <div className="glass p-6">
                <h3 className="text-[1.05rem] font-semibold text-white mb-4 tracking-tight">Phí Shopee 2026</h3>
                <ul className="space-y-2.5 text-[0.9rem]" style={{ color: "var(--ink-soft)" }}>
                  <li>• <strong className="text-white">Phí cố định:</strong> 8%–17% (tuỳ ngành hàng + Mall/Non-Mall)</li>
                  <li>• <strong className="text-white">Phí giao dịch:</strong> 6%</li>
                  <li>• <strong className="text-white">Phí cơ sở hạ tầng:</strong> 3.000đ/đơn</li>
                  <li>• <strong className="text-white">Voucher Extra:</strong> 4% (cap 50.000đ) — đăng ký</li>
                  <li>• <strong className="text-white">Pi Ship:</strong> 1.600đ/đơn — đăng ký</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[820px] mx-auto px-6 md:px-10 py-16 md:py-20">
            <div className="section-tag">FAQ</div>
            <h2 className="t-h2 mb-10 text-white">Câu hỏi <span className="grad-text">thường gặp.</span></h2>
            <div className="space-y-1">
              {(faqLd.mainEntity as any[]).map((item, i) => (
                <details key={i} className="py-5 group" style={{ borderBottom: "1px solid var(--line)" }}>
                  <summary className="flex justify-between items-center cursor-pointer text-[1rem] font-semibold list-none gap-4 text-white group-hover:text-[#7da9ff] transition-colors">
                    {item.name}
                    <span className="flex-shrink-0">
                      <svg className="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7da9ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </summary>
                  <p className="text-[0.95rem] leading-[1.75] mt-3 pr-8" style={{ color: "var(--ink-mute)" }}>{item.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Course CTA */}
        <section className="relative border-t overflow-hidden" style={{ borderColor: "var(--line)" }}>
          <div className="blob blob-blue blob-anim" style={{ width: 500, height: 500, top: "-20%", right: "-10%" }} />
          <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-20 text-center">
            <div className="section-tag justify-center" style={{ display: "inline-flex" }}>Đào tạo</div>
            <h2 className="t-h2 mb-4 text-white">
              Muốn hiểu sâu về <span className="grad-text">P&L sàn TMĐT?</span>
            </h2>
            <p className="t-body-lg max-w-[640px] mx-auto mb-8">
              Module Vận hành sàn của khoá Foundation Ecommerce dạy chi tiết về tư duy giá, phí sàn, tồn kho, và cách build P&L 1 năm cho gian hàng thật.
            </p>
            <Link href="/ecom-foundation" className="btn btn-primary">
              Xem khoá Foundation Ecommerce <span className="arrow">→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
