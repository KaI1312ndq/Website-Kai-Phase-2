import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Tính phí sàn TikTok Shop & Shopee 2026 - Cập nhật 29/05/2026",
  description:
    "Công cụ tính phí sàn TikTok Shop và Shopee 2026 chính xác - phí hoa hồng theo ngành hàng cập nhật 29/05/2026, so sánh đồng thời 4 phương án Mall · Non-Mall. Miễn phí, không đăng ký.",
  keywords: [
    "tính phí sàn", "phí sàn tiktok shop 2026", "phí sàn shopee 2026",
    "phí hoa hồng tiktok shop", "phí hoa hồng shopee mall",
    "công cụ tính phí sàn", "tính lợi nhuận sàn tmđt",
    "phí shopee tháng 5 2026", "shopee tăng phí 2026",
    "tiktok shop hay shopee", "shopee mall có nên đăng ký",
    "voucher extra shopee 5.5%", "pi ship shopee 2700đ", "sfr tiktok",
    "phí giao dịch shopee", "phí giao dịch tiktok shop",
    "tính margin shop tmđt", "p&l shopee", "p&l tiktok shop",
  ],
  alternates: { canonical: "/tools/tinh-phi-san" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "Tính phí sàn TikTok Shop & Shopee 2026 - Cập nhật 29/05/2026",
    description: "Phí hoa hồng theo ngành cập nhật 29/05/2026. So sánh Mall vs Non-Mall TikTok Shop & Shopee đồng thời. Có voucher extra 5.5%, pi ship 2.700đ, sfr. Miễn phí.",
  },
};

const FAQS = [
  {
    q: "Phí sàn TikTok Shop 2026 bao nhiêu phần trăm?",
    a: "Từ 09/05/2026, phí hoa hồng nền tảng TikTok Shop dao động 11.5%–17.8% tuỳ ngành hàng và loại shop (Mall hoặc Non-Mall). Default rate là 12.5% Non-Mall và 15.5% Mall. Ngoài ra TikTok có phí giao dịch 6% (tính trên giá + phí ship buyer trả - voucher seller) và phí xử lý đơn 3.000đ/đơn.",
  },
  {
    q: "Phí sàn Shopee 2026 áp dụng từ khi nào? Có gì thay đổi?",
    a: "Shopee áp dụng bảng phí cố định mới từ 08/05/2026. Phí cố định dao động 8%–17% tuỳ ngành và Mall/Non-Mall, đã bao gồm thuế GTGT 8%. Cộng thêm phí giao dịch 6% và phí cơ sở hạ tầng 3.000đ/đơn. Mall thường cao hơn Non-Mall 3-5%.",
  },
  {
    q: "Phí Mall và Non-Mall khác nhau thế nào? Có nên đăng ký Mall?",
    a: "Mall trả phí hoa hồng cao hơn Non-Mall 3-5% tuỳ ngành. Đổi lại, Mall có badge thương hiệu chính hãng, ưu tiên hiển thị tìm kiếm, được tham gia campaign sàn lớn, và độ tin cậy buyer cao hơn. Đăng ký Mall phù hợp khi: brand đã có nhận diện, GMV ổn định, margin còn dư để chịu phí cao hơn. Dùng tool so sánh 4 cột để quyết.",
  },
  {
    q: "Voucher Extra và Voucher Extra Plus TikTok khác nhau thế nào?",
    a: "Voucher Extra TikTok Shop là 4% giá trị đơn hàng (cap 50.000đ). Voucher Extra Plus là 5.5% (cap 80.000đ) với nhiều voucher giảm giá độc quyền và ưu tiên hiển thị hơn. Chỉ chọn 1 trong 2 - Plus thường hiệu quả hơn cho shop có volume lớn vì cap 80k.",
  },
  {
    q: "Phí giao dịch tính như thế nào? Tại sao có cả phí ship buyer trả?",
    a: "Phí giao dịch (6%) cả TikTok và Shopee đều tính theo công thức: (Giá bán + Phí ship buyer trả - Voucher seller) × 6%. Đây là số tiền buyer thực sự pay đến tay sàn, không phải doanh thu thực của seller. Đó là lý do tool có input 'Phí ship buyer trả' - nếu để 0 (hiểu nhầm là không tính), bạn sẽ thấy phí giao dịch thấp hơn thực tế.",
  },
  {
    q: "SFR (Bồi hoàn vận chuyển) là gì?",
    a: "SFR là phí TikTok Shop thu của seller khi xử lý các trường hợp bồi hoàn phí vận chuyển cho buyer (vd: hoàn đơn). Phí 1.620đ/đơn - chỉ áp dụng khi seller đăng ký gói SFR. Nếu không đăng ký, seller phải tự xử lý bồi hoàn - thường tốn thời gian hơn.",
  },
  {
    q: "Pi Ship của Shopee có hữu ích không?",
    a: "Pi Ship là dịch vụ vận chuyển nội bộ của Shopee. Phí 2.700đ/đơn từ 23/05/2026 (tăng từ 1.620đ). Lợi: rate ship rẻ hơn ngoài, tích hợp sâu vào Seller Center, tự động cập nhật trạng thái. Nhược: phụ thuộc Shopee, ít linh động khi có vấn đề. Phù hợp shop có volume cao và ngành hàng nhỏ gọn.",
  },
  {
    q: "Margin bao nhiêu là an toàn cho seller TMĐT?",
    a: "Tuỳ ngành: Beauty/Health 25-35%, Fashion 15-25%, F&B 15-20%, Electronics 8-15% sau khi trừ HẾT chi phí (kể cả ads + nhân sự). Margin <10% là vùng nguy hiểm - chỉ một biến động phí sàn hoặc cost ads tăng là âm. Tool này tự cảnh báo khi margin <10%.",
  },
  {
    q: "Sàn nào lãi cao hơn - TikTok Shop hay Shopee?",
    a: "Không có câu trả lời chung. Phụ thuộc: ngành hàng (Beauty thường lãi cao hơn ở TikTok do live commerce; Electronics lãi tốt hơn ở Shopee), giai đoạn brand, kênh traffic chính. Tool so sánh 4 cột giúp test cụ thể với sản phẩm của bạn - nhập số  biết liền.",
  },
  {
    q: "Cách giảm phí sàn - có cách nào không?",
    a: "Phí hoa hồng và phí giao dịch là cố định theo sàn - không thương lượng được. Nhưng có thể tối ưu: (1) chọn ngành cấp 3 phù hợp (đôi khi đặt sai cấp khiến phí cao hơn), (2) cân nhắc kỹ Mall vs Non-Mall, (3) bỏ option không cần (Voucher Extra, Pi Ship nếu không tận dụng), (4) tăng giá bán hoặc giảm voucher seller để tăng margin gross.",
  },
  {
    q: "Phí sàn 2026 có còn tăng nữa không?",
    a: "Lịch sử: Shopee và TikTok đều tăng phí 1-2 lần/năm. Đợt 05/2026 vừa rồi là tăng đáng kể (TikTok Mall lên 17.8% ngành Sức khoẻ Làm đẹp). Seller nên build P&L với buffer 1-2% margin để chịu được tăng phí trong tương lai. Tool sẽ update phí mới khi sàn công bố.",
  },
];

export default function Page() {
  const baseUrl = "https://www.nguyenducquang.website";
  const pageUrl = `${baseUrl}/tools/tinh-phi-san`;

  // 1. WebApplication - main tool
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Tính phí sàn TikTok Shop & Shopee",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Marketplace fee calculator",
    operatingSystem: "Web",
    description: "Công cụ tính phí sàn TikTok Shop và Shopee, so sánh Mall vs Non-Mall, áp dụng bảng phí mới 2026.",
    url: pageUrl,
    inLanguage: "vi-VN",
    isAccessibleForFree: true,
    creator: { "@type": "Person", name: "Nguyễn Đức Quảng", url: baseUrl },
    offers: { "@type": "Offer", price: 0, priceCurrency: "VND" },
    featureList: [
      "Tính phí hoa hồng nền tảng theo bảng 2026",
      "So sánh Mall vs Non-Mall đồng thời",
      "Hỗ trợ Voucher Extra, Voucher Extra Plus, SFR, Pi Ship",
      "Tìm ngành hàng nhanh bằng từ khoá",
      "Tính lợi nhuận và margin trên mỗi đơn hàng",
    ],
  };

  // 2. Breadcrumb
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${baseUrl}/tools` },
      { "@type": "ListItem", position: 3, name: "Tính phí sàn", item: pageUrl },
    ],
  };

  // 3. HowTo - how to use the tool
  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cách dùng tool tính phí sàn TikTok Shop & Shopee",
    description: "Hướng dẫn 3 bước sử dụng công cụ tính phí sàn để so sánh lợi nhuận giữa TikTok Shop và Shopee.",
    inLanguage: "vi-VN",
    totalTime: "PT2M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Nhập sản phẩm",
        text: "Nhập giá bán, COGS (giá vốn), voucher seller áp dụng, và phí ship buyer trả. Đây là 4 thông số quyết định doanh thu thực và phí giao dịch.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Tìm ngành hàng",
        text: "Gõ từ khoá vào ô tìm kiếm (vd 'búp bê', 'sữa rửa mặt', 'máy lọc') - tool tự match ngành cấp 1/2/3 cho cả TikTok và Shopee. Phí hoa hồng hiển thị realtime.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "So sánh 4 phương án",
        text: "Output hiện song song lợi nhuận và margin của 4 option (Shopee Non-Mall, Shopee Mall, TikTok Non-Mall, TikTok Mall). Card 'Best' highlight phương án lãi cao nhất.",
      },
    ],
  };

  // 4. FAQ
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Combined LD payload
  const allLd = [appLd, breadcrumbLd, howToLd, faqLd];

  return (
    <>
      <Navbar />
      <main>
        {allLd.map((ld, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        ))}

        {/* Visible breadcrumb (a11y + UX + small SEO boost) */}
        <nav aria-label="Breadcrumb" className="sr-only">
          <ol>
            <li><Link href="/">Trang chủ</Link></li>
            <li><Link href="/tools">Tools</Link></li>
            <li>Tính phí sàn TikTok Shop & Shopee</li>
          </ol>
        </nav>

        {/* HERO */}
        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <div className="blob blob-blue blob-anim" style={{ width: 600, height: 600, top: "-15%", left: "-10%" }} />
          <div className="blob blob-purple blob-anim" style={{ width: 500, height: 500, bottom: "-20%", right: "-10%", animationDelay: "3s" }} />
          <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-16 md:pb-24">
            <Link href="/tools" className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium mb-6 transition-colors hover:text-white" style={{ color: "var(--ink-mute)" }}>
              ← Tất cả Tools
            </Link>
            <div className="section-tag">Tools · Miễn phí</div>
            <div className="flex items-center gap-3 flex-wrap mb-3">
              <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(95,255,170,0.12)", border: "1px solid rgba(95,255,170,0.35)", color: "#5fffaa" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#5fffaa] animate-pulse" />
                Cập nhật {new Date().toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })} · Bảng phí Shopee Mall 29/05/2026
              </span>
            </div>
            <h1 className="t-h1 mb-4 leading-[1.1] text-white max-w-[820px]">
              Tính phí sàn <span className="grad-text">TikTok Shop & Shopee.</span>
            </h1>
            <p className="t-body-lg max-w-[760px] mb-4">
              Công cụ tính phí sàn cho seller TMĐT - so sánh đồng thời 4 phương án <strong className="text-white">Mall vs Non-Mall</strong> trên TikTok Shop và Shopee, áp dụng bảng phí mới 2026.
              Tìm ngành hàng nhanh bằng từ khoá, hỗ trợ voucher extra, SFR, pi ship, và chi phí ads/marketing tuỳ chỉnh.
            </p>
            <div className="mb-5 px-4 py-3 rounded-xl text-[0.85rem] leading-[1.6]" style={{ background: "rgba(255,212,121,0.07)", border: "1px solid rgba(255,212,121,0.25)", color: "var(--st-70)" }}>
              <strong className="text-white">Quan trọng:</strong> Phí hoa hồng dao động <strong style={{ color: "#ffd479" }}>7% - 21%</strong> tuỳ ngành hàng.
              Hãy <strong className="text-white">chọn ngành hàng</strong> trong tool bên dưới để có phí chính xác - kết quả mặc định chỉ là phí trung bình tham khảo.
            </div>
            <div className="flex flex-wrap gap-2">
              {["Phí TikTok Shop 2026", "Phí Shopee Mall 29/05", "Voucher Extra Plus", "SFR", "Pi Ship 2.700đ", "P&L gian hàng"].map((tag) => (
                <span key={tag} className="wf-badge text-[0.72rem]">{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* CALCULATOR */}
        <section className="relative">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <Calculator />
          </div>
        </section>

        {/* HOW-TO */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32">
            <div className="section-tag">Hướng dẫn</div>
            <h2 className="t-h2 mb-8 text-white">Cách dùng <span className="grad-text">tool tính phí sàn.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { n: "01", t: "Nhập sản phẩm", d: "Giá bán, COGS, voucher seller áp dụng, và phí ship buyer trả. Đây là 4 thông số quyết định doanh thu thực và phí giao dịch." },
                { n: "02", t: "Tìm ngành hàng", d: "Gõ từ khoá vào ô tìm kiếm (vd 'búp bê', 'sữa rửa mặt', 'máy lọc') - tool tự match ngành cấp 1/2/3 cho cả TikTok và Shopee. Phí hoa hồng update realtime." },
                { n: "03", t: "So sánh 4 phương án", d: "Output hiện song song lợi nhuận và margin của 4 option (Shopee Non-Mall, Shopee Mall, TikTok Non-Mall, TikTok Mall). Card 'Best' highlight phương án lãi cao nhất." },
              ].map((s) => (
                <div key={s.n} className="glass p-6">
                  <div className="text-[1.6rem] font-bold tracking-tight grad-text leading-none mb-3">{s.n}</div>
                  <div className="text-[1rem] font-semibold text-white mb-2">{s.t}</div>
                  <div className="text-[0.88rem] leading-[1.65]" style={{ color: "var(--ink-mute)" }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE - TikTok vs Shopee */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32">
            <div className="section-tag">So sánh phí 2026</div>
            <h2 className="t-h2 mb-3 text-white">TikTok Shop và Shopee - <span className="grad-text">sàn nào phí cao hơn?</span></h2>
            <p className="t-body mb-4 max-w-[680px]">Tổng quan các loại phí cố định và option giữa 2 sàn, cập nhật bảng phí mới nhất 29/05/2026.</p>
            <div className="mb-8 px-4 py-2.5 rounded-lg text-[0.8rem] inline-flex items-center gap-2" style={{ background: "rgba(95,255,170,0.08)", border: "1px solid rgba(95,255,170,0.25)", color: "#5fffaa" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#5fffaa]" />
              Phí Shopee Mall cập nhật 29/05/2026 · TikTok Shop cập nhật 09/05/2026
            </div>

            <div className="overflow-x-auto rounded-2xl" style={{ background: "var(--dg-30)", border: "1px solid var(--line)" }}>
              <table className="w-full text-[0.88rem]">
                <thead>
                  <tr style={{ background: "var(--st-04)" }}>
                    <th className="text-left px-4 py-3 font-semibold text-white">Loại phí</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: "#EE4D2D" }}>Shopee Non-Mall</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: "#EE4D2D" }}>Shopee Mall</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: "#ff3358" }}>TikTok Non-Mall</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: "#ff3358" }}>TikTok Mall</th>
                  </tr>
                </thead>
                <tbody style={{ color: "var(--ink-soft)" }}>
                  {[
                    { l: "Phí hoa hồng (range)", v: ["7% – 13%", "10% – 21%", "11.5% – 15%", "13% – 18%"] },
                    { l: "Phí giao dịch", v: ["6%", "6%", "6%", "6%"] },
                    { l: "Phí xử lý đơn / CSHT", v: ["3.000đ (CSHT)", "3.000đ (CSHT)", "3.000đ", "3.000đ"] },
                    { l: "Voucher Extra", v: ["5.5% (cap 50k)", "5.5% (cap 50k)", "4% (cap 50k)", "4% (cap 50k)"] },
                    { l: "Voucher Extra Plus", v: ["-", "-", "5.5% (cap 80k)", "5.5% (cap 80k)"] },
                    { l: "SFR / Pi Ship", v: ["2.700đ Pi Ship", "2.700đ Pi Ship", "1.620đ SFR", "1.620đ SFR"] },
                    { l: "Áp dụng từ", v: ["08/05/2026", "08/05/2026", "09/05/2026", "09/05/2026"] },
                    {
                      l: "Tổng phí áp lên SP 500k",
                      v: ["~75.000–110.000đ", "~95.000–130.000đ", "~85.000–115.000đ", "~100.000–130.000đ"],
                      highlight: true,
                    },
                  ].map((row: any, i) => (
                    <tr key={i} style={{ borderTop: "1px solid var(--line)", background: row.highlight ? "rgba(20,110,245,0.06)" : "transparent" }}>
                      <td className="px-4 py-3 font-semibold text-white">{row.l}</td>
                      {row.v.map((v: string, j: number) => (
                        <td key={j} className="px-4 py-3" style={{ color: row.highlight ? "white" : undefined, fontWeight: row.highlight ? 600 : undefined }}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-xl p-5 text-[0.92rem] leading-[1.7]" style={{ background: "rgba(20,110,245,0.06)", border: "1px solid rgba(20,110,245,0.22)", color: "var(--st-78)" }}>
              <strong className="text-white">Kết luận tổng quan:</strong> TikTok Shop có phí hoa hồng <em>cao hơn</em> Shopee 1-3% ở hầu hết ngành. Bù lại, TikTok có sức mạnh live commerce và content viral mà Shopee không có. Quyết định "sàn nào tốt hơn" phụ thuộc <em>sản phẩm, ngành hàng, kênh traffic chính</em> - dùng tool ở trên để test với case cụ thể của bạn.
            </div>
          </div>
        </section>

        {/* MALL vs NON-MALL guide */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32">
            <div className="section-tag">Mall vs Non-Mall</div>
            <h2 className="t-h2 mb-3 text-white">Có nên đăng ký <span className="grad-text">Mall?</span></h2>
            <p className="t-body mb-10 max-w-[680px]">So sánh ưu/nhược của 2 loại shop, giúp seller quyết định khi nào nên upgrade lên Mall.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="glass p-7">
                <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: "#5fffaa" }}>Mall - Khi nên đăng ký</div>
                <ul className="space-y-2.5 text-[0.92rem]" style={{ color: "var(--ink-soft)" }}>
                  <li>• Brand đã có nhận diện, đăng ký giấy phép kinh doanh đầy đủ</li>
                  <li>• GMV ổn định &gt; 200tr/tháng</li>
                  <li>• Margin gross còn &gt; 20% sau khi trừ phí hoa hồng cao hơn</li>
                  <li>• Chiến lược dài hạn: build trust, tham gia campaign lớn của sàn</li>
                  <li>• Sản phẩm có giá trị / cao cấp (Beauty cao cấp, Electronics, Fashion brand)</li>
                </ul>
              </div>
              <div className="glass p-7">
                <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: "#ffd479" }}>Non-Mall - Khi nên giữ nguyên</div>
                <ul className="space-y-2.5 text-[0.92rem]" style={{ color: "var(--ink-soft)" }}>
                  <li>• Mới start, chưa có brand recognition</li>
                  <li>• Giá bán thấp (&lt;200k), margin sát - không đủ chịu phí Mall cao hơn</li>
                  <li>• Bán hàng theo trend, sản phẩm vòng đời ngắn</li>
                  <li>• Không có giấy phép DN hoặc giấy phép không phù hợp ngành hàng</li>
                  <li>• Chưa quyết định gắn bó dài hạn với 1 sàn</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* GLOSSARY */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32">
            <div className="section-tag">Thuật ngữ</div>
            <h2 className="t-h2 mb-10 text-white">Các loại phí <span className="grad-text">trên sàn TMĐT.</span></h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { t: "Phí hoa hồng nền tảng", d: "Phí % sàn lấy trên giá sản phẩm sau khi trừ voucher của seller. Tuỳ ngành hàng cấp 3, dao động 7-18%. Mall thường cao hơn Non-Mall 3-5%." },
                { t: "Phí giao dịch", d: "Phí 6% (cả TikTok và Shopee) tính trên giá thực buyer pay đến tay sàn = (Giá bán + Phí ship buyer trả - Voucher seller)." },
                { t: "Phí xử lý đơn / Phí cơ sở hạ tầng", d: "Phí cố định 3.000đ/đơn. TikTok gọi là 'Phí xử lý đơn', Shopee gọi là 'Phí cơ sở hạ tầng'." },
                { t: "Voucher Extra", d: "Gói voucher do sàn tài trợ, seller đăng ký để có thêm voucher giảm giá cho buyer. Phí 4% giá sản phẩm (cap 50.000đ/SP). Có ở cả TikTok và Shopee." },
                { t: "Voucher Extra Plus (TikTok)", d: "Gói nâng cấp của Voucher Extra - 5.5% (cap 80.000đ). Có nhiều voucher độc quyền + ưu tiên hiển thị. Chỉ chọn 1 trong 2 (không cộng dồn)." },
                { t: "SFR - Bồi hoàn vận chuyển (TikTok)", d: "Dịch vụ TikTok thay seller xử lý bồi hoàn phí ship cho buyer khi có vấn đề. Phí 1.620đ/đơn - đăng ký." },
                { t: "Pi Ship (Shopee)", d: "Dịch vụ vận chuyển nội bộ của Shopee. Phí 2.700đ/đơn từ 23/05/2026 - đăng ký. Rate ship rẻ hơn ngoài, tích hợp sâu Seller Center." },
                { t: "Doanh thu thực", d: "Tiền seller thực sự nhận = Giá bán − Voucher seller. Đây là cơ sở tính phí hoa hồng." },
                { t: "COGS - Cost of Goods Sold", d: "Giá vốn của sản phẩm. Tính trực tiếp vào lợi nhuận, không liên quan phí sàn." },
                { t: "Margin (% lợi nhuận)", d: "Tỷ lệ lợi nhuận trên giá bán. Margin tối thiểu nên đạt 10% - dưới đó dễ âm khi có biến động phí hoặc cost ads." },
              ].map((g, i) => (
                <div key={i} className="rounded-xl p-5" style={{ background: "var(--st-03)", border: "1px solid var(--line)" }}>
                  <div className="text-[1rem] font-semibold text-white mb-2">{g.t}</div>
                  <div className="text-[0.88rem] leading-[1.65]" style={{ color: "var(--ink-mute)" }}>{g.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TIPS */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32">
            <div className="section-tag">Tips thực chiến</div>
            <h2 className="t-h2 mb-10 text-white">5 cách tối ưu <span className="grad-text">phí sàn + margin.</span></h2>

            <div className="space-y-4">
              {[
                { n: "01", t: "Đặt đúng ngành cấp 3", d: "Sai cấp 3 có thể khiến phí hoa hồng cao hơn 2-3%. Vào Seller Center kiểm tra lại danh mục - đôi khi 1 sản phẩm có thể đặt vào 2-3 ngành cấp 3 khác nhau, chọn ngành có phí thấp nhất nhưng vẫn liên quan." },
                { n: "02", t: "Cân nhắc voucher seller - không cần áp đại trà", d: "Voucher seller giảm doanh thu thực, không phải chiêu thức tăng GMV. Chỉ áp dụng khi sản phẩm có volume hoá đơn, hoặc kèm điều kiện (đơn từ X tiền). Tính toán margin sau voucher trước khi tung." },
                { n: "03", t: "Test Mall vs Non-Mall với case cụ thể", d: "Đừng nghe bảo Mall lúc nào cũng tốt hơn. Với SP giá thấp hoặc margin sát, Mall ăn hết lãi. Dùng tool này test 4 cột - chỉ đăng ký Mall khi profit Mall vẫn > Non-Mall + đủ buffer." },
                { n: "04", t: "Đăng ký Voucher Extra Plus thay vì Extra (TikTok)", d: "Cap 80k > cap 50k, % chỉ cao hơn 1.5%. Với SP giá > 1.5tr, Plus về mặt phí không khác Extra nhiều nhưng được ưu tiên hiển thị + nhiều voucher độc quyền." },
                { n: "05", t: "Build P&L với buffer 1-2% margin", d: "Phí sàn tăng 1-2 lần/năm. Khi xây giá bán mới, đừng chỉ tính theo phí hiện tại - buffer thêm 1-2% margin để chịu được tăng phí trong 12 tháng tới mà không phải re-pricing toàn shop." },
              ].map((tip) => (
                <div key={tip.n} className="glass p-6 flex items-start gap-5">
                  <div className="text-[2rem] font-bold tracking-tight grad-text leading-none flex-shrink-0">{tip.n}</div>
                  <div>
                    <div className="text-[1.05rem] font-semibold text-white mb-2">{tip.t}</div>
                    <div className="text-[0.9rem] leading-[1.7]" style={{ color: "var(--ink-mute)" }}>{tip.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FORMULA CALLOUT */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32">
            <div className="section-tag">Công thức</div>
            <h2 className="t-h2 mb-10 text-white">Cách tool <span className="grad-text">tính phí.</span></h2>

            <div className="space-y-4">
              <div className="rounded-xl p-5" style={{ background: "rgba(20,110,245,0.06)", border: "1px solid rgba(20,110,245,0.22)" }}>
                <div className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#9bb6ff" }}>1. Phí hoa hồng nền tảng</div>
                <code className="text-[0.95rem] block" style={{ color: "var(--st-85)" }}>
                  Phí HH = (Giá bán − Voucher seller) × % theo ngành
                </code>
              </div>
              <div className="rounded-xl p-5" style={{ background: "rgba(20,110,245,0.06)", border: "1px solid rgba(20,110,245,0.22)" }}>
                <div className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#9bb6ff" }}>2. Phí giao dịch (6%)</div>
                <code className="text-[0.95rem] block" style={{ color: "var(--st-85)" }}>
                  Phí GD = (Giá bán + Phí ship buyer trả − Voucher seller) × 6%
                </code>
              </div>
              <div className="rounded-xl p-5" style={{ background: "rgba(20,110,245,0.06)", border: "1px solid rgba(20,110,245,0.22)" }}>
                <div className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#9bb6ff" }}>3. Voucher Extra / Extra Plus</div>
                <code className="text-[0.95rem] block" style={{ color: "var(--st-85)" }}>
                  Phí VE = MIN(Giá bán × %, cap)
                </code>
              </div>
              <div className="rounded-xl p-5" style={{ background: "rgba(0,215,34,0.05)", border: "1px solid rgba(0,215,34,0.22)" }}>
                <div className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#5fffaa" }}>4. Lợi nhuận / đơn</div>
                <code className="text-[0.95rem] block" style={{ color: "var(--st-85)" }}>
                  Lợi nhuận = Doanh thu thực − Tổng phí sàn − Chi phí khác − COGS
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[820px] mx-auto px-6 md:px-10 py-24 md:py-32">
            <div className="section-tag">FAQ</div>
            <h2 className="t-h2 mb-10 text-white">Câu hỏi <span className="grad-text">thường gặp.</span></h2>
            <div>
              {FAQS.map((item, i) => (
                <details key={i} className="py-5 group" style={{ borderBottom: "1px solid var(--line)" }}>
                  <summary className="flex justify-between items-center cursor-pointer text-[1rem] font-semibold list-none gap-4 text-white group-hover:text-[#7da9ff] transition-colors">
                    {item.q}
                    <span className="flex-shrink-0">
                      <svg className="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7da9ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </summary>
                  <p className="text-[0.95rem] leading-[1.75] mt-3 pr-8" style={{ color: "var(--ink-mute)" }}>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related links - internal SEO juice */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="section-tag">Khám phá thêm</div>
            <h2 className="t-h2 mb-8 text-white">Resources <span className="grad-text">cho seller TMĐT.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              <Link href="/tools" className="group glass p-6 block">
                <div className="text-[0.62rem] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: "#7da9ff" }}>Tools</div>
                <h3 className="text-[1.05rem] font-semibold text-white mb-2 tracking-tight group-hover:grad-text transition-all">Tất cả tools</h3>
                <p className="text-[0.88rem] leading-[1.6]" style={{ color: "var(--ink-mute)" }}>Bộ công cụ free cho seller - fee calc, ROAS calc, P&L template (sắp có).</p>
                <div className="mt-3 text-[0.82rem] font-semibold grad-text">Xem danh sách </div>
              </Link>
              <Link href="/ecom-foundation" className="group glass p-6 block">
                <div className="text-[0.62rem] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: "#7da9ff" }}>Khoá học</div>
                <h3 className="text-[1.05rem] font-semibold text-white mb-2 tracking-tight group-hover:grad-text transition-all">Foundation Ecommerce</h3>
                <p className="text-[0.88rem] leading-[1.6]" style={{ color: "var(--ink-mute)" }}>12 buổi · 6 tuần. Module Vận hành sàn dạy chi tiết về tư duy giá, phí sàn, tồn kho, P&L 1 năm.</p>
                <div className="mt-3 text-[0.82rem] font-semibold grad-text">Xem khoá học </div>
              </Link>
              <Link href="/blog" className="group glass p-6 block">
                <div className="text-[0.62rem] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: "#7da9ff" }}>Blog</div>
                <h3 className="text-[1.05rem] font-semibold text-white mb-2 tracking-tight group-hover:grad-text transition-all">Insights TMĐT</h3>
                <p className="text-[0.88rem] leading-[1.6]" style={{ color: "var(--ink-mute)" }}>Góc nhìn thực chiến về Performance Marketing, vận hành sàn và team building.</p>
                <div className="mt-3 text-[0.82rem] font-semibold grad-text">Đọc blog </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Course CTA */}
        <section className="relative border-t overflow-hidden" style={{ borderColor: "var(--line)" }}>
          <div className="blob blob-blue blob-anim" style={{ width: 500, height: 500, top: "-20%", right: "-10%" }} />
          <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
            <div className="section-tag justify-center" style={{ display: "flex" }}>Đào tạo</div>
            <h2 className="t-h2 mb-4 text-white">
              Muốn hiểu sâu về <span className="grad-text">P&L sàn TMĐT?</span>
            </h2>
            <p className="t-body-lg max-w-[640px] mx-auto mb-8">
              Module Vận hành sàn của khoá Foundation Ecommerce dạy chi tiết về tư duy giá, phí sàn, tồn kho, và cách build P&L 1 năm cho gian hàng thật.
            </p>
            <Link href="/ecom-foundation" className="btn btn-primary">
              Xem khoá Foundation Ecommerce
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
