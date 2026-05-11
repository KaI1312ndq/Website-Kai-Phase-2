import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "ROAS Calculator - Tính Break-even ROAS & Target ROAS miễn phí",
  description:
    "Công cụ tính ROAS break-even và target ROAS cho seller TMĐT - nhập giá vốn, phí sàn, chi phí vận hành, target margin  biết ngay ROAS cần đạt. Miễn phí, không cần đăng ký.",
  keywords: [
    "ROAS là gì", "tính ROAS", "ROAS calculator", "break-even ROAS",
    "công thức ROAS", "ROAS bao nhiêu là đủ", "tính ROAS ecom",
    "ROAS tiktok shop", "ROAS shopee", "target ROAS",
    "ROAS beauty", "ROAS fashion", "ROAS ngành hàng",
    "MER vs ROAS", "ROAS break even công thức",
    "tính lợi nhuận ads", "ads ecom hiệu quả",
  ],
  alternates: { canonical: "/tools/roas-calculator" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "ROAS Calculator - Tính Break-even & Target ROAS miễn phí",
    description:
      "Tính ROAS break-even theo giá vốn, phí sàn và margin target. Công cụ miễn phí cho seller TikTok Shop & Shopee.",
  },
};

const FAQS = [
  {
    q: "ROAS là gì?",
    a: "ROAS (Return on Ad Spend) = Doanh thu / Chi phí quảng cáo. Ví dụ: bỏ 1 triệu ads thu về 5 triệu doanh thu = ROAS 5x. ROAS đo hiệu quả của từng đồng ads chi ra, nhưng ROAS cao không đồng nghĩa với lãi - phụ thuộc vào cấu trúc chi phí của từng sản phẩm.",
  },
  {
    q: "Công thức tính ROAS là gì?",
    a: "ROAS = Doanh thu ÷ Chi phí quảng cáo. Break-even ROAS = 1 ÷ (Gross margin% − Phí sàn% − Chi phí vận hành%). Target ROAS = 1 ÷ (Gross margin% − Phí sàn% − Vận hành% − Target margin%). Gross margin = (Giá bán − Giá vốn) ÷ Giá bán.",
  },
  {
    q: "Break-even ROAS là gì và tại sao quan trọng?",
    a: "Break-even ROAS là mức ROAS tối thiểu để không lỗ (lợi nhuận = 0). Dưới mức này, mỗi đơn hàng bạn đang mất tiền. Quan trọng vì: nhiều seller chạy ROAS 4–5x nhưng vẫn lỗ vì phí sàn cao + gross margin thấp đẩy break-even lên 7–8x. Phải biết break-even của mình mới đặt KPI ads đúng.",
  },
  {
    q: "ROAS bao nhiêu là đủ cho Beauty/Fashion/F&B/Electronics?",
    a: "Mỗi ngành khác nhau do gross margin và phí sàn khác nhau. Tham khảo benchmark (phí TikTok Non-Mall ~18.5%, ops ~8%): Beauty/Health 55–70% gross margin  break-even ~4–5x, target 8–12x. Fashion 45–60%  break-even ~5–7x, target 10–15x. F&B/FMCG 35–50%  break-even ~6–8x, target 12–18x. Electronics 15–25%  break-even 15–25x, target 30–50x. Nhập số thực của sản phẩm vào tool để có kết quả chính xác.",
  },
  {
    q: "Tại sao ROAS cao nhưng vẫn lỗ?",
    a: "Vì ROAS không tính phí sàn, giá vốn, hay chi phí vận hành. Ví dụ: sản phẩm 200.000đ, giá vốn 150.000đ (gross margin 25%), phí sàn 18.5%, ops 8%  break-even ROAS = 1 ÷ (25% − 18.5% − 8%) = âm số  không bao giờ có lãi dù ROAS vô cực. Bài học: luôn kiểm tra gross margin trước khi chạy ads.",
  },
  {
    q: "Phí sàn ảnh hưởng ROAS thế nào?",
    a: "Phí sàn trực tiếp làm giảm 'available margin' cho ads và profit. Mỗi 3% phí sàn tăng thêm đẩy break-even ROAS lên ~0.5–1x. Ví dụ sản phẩm Beauty gross margin 60%: phí sàn Non-Mall 18.5%  break-even ~4.4x; phí Mall 21.5%  break-even ~5.2x. Đây là lý do phải so sánh kỹ Mall vs Non-Mall trước khi chạy ads.",
  },
  {
    q: "ROAS TikTok Shop và Shopee có khác nhau không?",
    a: "Phí sàn khác nhau nên break-even ROAS cũng khác nhau dù cùng sản phẩm. TikTok Non-Mall ~18.5%, Shopee Non-Mall ~18% (chênh 0.5%). TikTok Mall ~21.5%, Shopee Mall ~21%. Ngoài phí, performance của ads và live commerce trên 2 sàn cũng khác - TikTok thường có ROAS tự nhiên cao hơn nhờ content viral, nhưng Shopee ads ổn định và dễ scale hơn. Dùng Tool tính phí sàn để lấy số phí chính xác rồi nhập vào đây.",
  },
  {
    q: "Cách tăng ROAS mà không tăng ngân sách ads?",
    a: "4 hướng tối ưu: (1) Tăng giá bán hoặc upsell/bundle  tăng gross margin, giảm break-even ROAS. (2) Giảm COGS bằng cách negotiate supplier, đặt số lượng lớn. (3) Tối ưu landing page và CVR - cùng số tiền ads nhưng ra nhiều đơn hơn. (4) Cải thiện creative, targeting - giảm CPM/CPC. Tối ưu ROAS là cải thiện cả 4 mặt trận, không chỉ tối ưu ads account.",
  },
  {
    q: "MER là gì? Khác ROAS thế nào?",
    a: "MER (Marketing Efficiency Ratio) = Tổng doanh thu ÷ Tổng chi phí marketing (tất cả channels: paid ads, influencer, photoshoot, samples, v.v.). ROAS chỉ tính riêng paid ads. MER phản ánh hiệu quả marketing tổng thể và sustainability của business - thường thấp hơn ROAS paid vì tử số lớn hơn. Seller nên track cả 2: ROAS để tối ưu campaign, MER để đánh giá sức khoẻ business.",
  },
  {
    q: "ROAS nên đo theo đơn hay theo tháng?",
    a: "Cần đo cả 2 cấp độ. ROAS per đơn (hoặc per campaign): để biết SKU nào đang lãi, targeting nào hiệu quả, có nên scale không. ROAS/MER theo tháng: để đánh giá tổng hiệu quả marketing và so sánh với target business. Một campaign ROAS 10x nhưng volume thấp không bằng 6x nhưng volume 10x - phải nhìn cả margin tuyệt đối và tỷ suất.",
  },
];

export default function ROASCalculatorPage() {
  const baseUrl = "https://www.nguyenducquang.website";
  const pageUrl = `${baseUrl}/tools/roas-calculator`;

  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ROAS Calculator - Tính Break-even & Target ROAS",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "ROAS Calculator",
    operatingSystem: "Web",
    description:
      "Công cụ tính ROAS break-even và target ROAS cho seller TMĐT dựa trên giá vốn, phí sàn và target margin.",
    url: pageUrl,
    inLanguage: "vi-VN",
    isAccessibleForFree: true,
    creator: { "@type": "Person", name: "Nguyễn Đức Quảng", url: baseUrl },
    offers: { "@type": "Offer", price: 0, priceCurrency: "VND" },
    featureList: [
      "Tính Break-even ROAS theo cấu trúc chi phí thực tế",
      "Tính Target ROAS để đạt margin mục tiêu",
      "Preset phí sàn TikTok Shop & Shopee 2026",
      "Bảng kịch bản lợi nhuận tại 13 mức ROAS",
      "Biểu đồ phân bổ doanh thu trực quan",
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${baseUrl}/tools` },
      { "@type": "ListItem", position: 3, name: "ROAS Calculator", item: pageUrl },
    ],
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cách tính ROAS break-even cho seller TMĐT",
    description:
      "Hướng dẫn 4 bước tính ROAS break-even và target ROAS bằng công cụ ROAS Calculator.",
    inLanguage: "vi-VN",
    totalTime: "PT2M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Nhập giá bán và giá vốn",
        text: "Nhập giá bán (giá buyer thanh toán, đã có VAT) và giá vốn (COGS: xuất xưởng + bao bì + vận chuyển về kho). Tool tự tính gross margin %.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Chọn phí sàn",
        text: "Chọn platform preset (TikTok Non-Mall 18.5%, TikTok Mall 21.5%, Shopee Non-Mall 18%, Shopee Mall 21%) hoặc nhập tay. Lấy số chính xác từ Tool tính phí sàn nếu cần.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Nhập chi phí vận hành và target margin",
        text: "Nhập chi phí vận hành (fulfillment, nhân sự - không tính ads) và margin % muốn đạt. Thường ops 5–15%, target margin 10–20%.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Đọc kết quả",
        text: "Tool hiển thị Break-even ROAS (mức ROAS tối thiểu không lỗ) và Target ROAS (mức ROAS để đạt margin mục tiêu), kèm bảng kịch bản 13 mức ROAS và biểu đồ phân bổ doanh thu.",
      },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const allLd = [appLd, breadcrumbLd, howToLd, faqLd];

  return (
    <>
      <Navbar />
      <main>
        {allLd.map((ld, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        ))}

        <nav aria-label="Breadcrumb" className="sr-only">
          <ol>
            <li><Link href="/">Trang chủ</Link></li>
            <li><Link href="/tools">Tools</Link></li>
            <li>ROAS Calculator</li>
          </ol>
        </nav>

        {/* HERO */}
        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <div className="blob blob-blue blob-anim" style={{ width: 600, height: 600, top: "-15%", left: "-10%" }} />
          <div className="blob blob-purple blob-anim" style={{ width: 500, height: 500, bottom: "-20%", right: "-10%", animationDelay: "3s" }} />
          <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-16 md:pb-24">
            <div className="mb-6">
              <Link href="/tools" className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium transition-colors hover:text-white" style={{ color: "var(--ink-mute)" }}>
                ← Tất cả Tools
              </Link>
            </div>
            <div className="section-tag">Tools · Miễn phí</div>
            <h1 className="t-h1 mb-4 leading-[1.1] text-white max-w-[820px]">
              ROAS Calculator - <span className="grad-text">Break-even & Target ROAS.</span>
            </h1>
            <p className="t-body-lg max-w-[760px] mb-6">
              Nhập giá vốn, phí sàn, chi phí vận hành và target margin - tool tính ngay <strong className="text-white">ROAS break-even</strong> (mức tối thiểu không lỗ) và <strong className="text-white">Target ROAS</strong> cần đạt. Có preset phí TikTok Shop & Shopee 2026.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Break-even ROAS", "Target Margin", "TikTok Shop", "Shopee", "Bảng kịch bản ROAS", "Phân bổ doanh thu"].map((tag) => (
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
            <h2 className="t-h2 mb-8 text-white">Cách dùng <span className="grad-text">ROAS Calculator.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  n: "01",
                  t: "Nhập giá bán & giá vốn",
                  d: "Giá bán = giá buyer thanh toán (có VAT). Giá vốn = COGS xuất xưởng + bao bì + logistics về kho. Tool tự tính gross margin %.",
                },
                {
                  n: "02",
                  t: "Chọn phí sàn",
                  d: "4 preset sẵn: TikTok Non-Mall 18.5%, TikTok Mall 21.5%, Shopee Non-Mall 18%, Shopee Mall 21%. Hoặc nhập tay từ Tool tính phí sàn.",
                },
                {
                  n: "03",
                  t: "Nhập ops & target",
                  d: "Chi phí vận hành = fulfillment + nhân sự + marketing khác (không tính ads). Target margin = % lợi nhuận muốn đạt.",
                },
                {
                  n: "04",
                  t: "Đọc kết quả",
                  d: "Break-even ROAS + Target ROAS hiện ngay. Bảng 13 kịch bản ROAS giúp biết campaign nào đang lãi, lãi bao nhiêu mỗi đơn.",
                },
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

        {/* FORMULA SECTION */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32">
            <div className="section-tag">Công thức</div>
            <h2 className="t-h2 mb-3 text-white">Công thức tính <span className="grad-text">Break-even ROAS.</span></h2>
            <p className="t-body mb-10 max-w-[680px]">
              ROAS break-even phụ thuộc vào gross margin, phí sàn và chi phí vận hành - không phải chỉ gross margin. Đây là sai lầm phổ biến nhất của seller khi đặt KPI ads.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="glass p-6">
                <div className="text-[0.7rem] font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#4ad6ff" }}>Break-even ROAS</div>
                <div className="font-mono text-[1.1rem] mb-3 text-white leading-relaxed">
                  ROAS<sub>be</sub> = 1 ÷ (GM% − Fee% − Ops%)
                </div>
                <div className="text-[0.82rem] leading-[1.7]" style={{ color: "var(--ink-mute)" }}>
                  GM = Gross Margin = (Giá bán − COGS) ÷ Giá bán<br />
                  Fee = Phí sàn tổng (hoa hồng + giao dịch)<br />
                  Ops = Chi phí vận hành (không gồm ads)
                </div>
              </div>
              <div className="glass p-6">
                <div className="text-[0.7rem] font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#5fffaa" }}>Target ROAS</div>
                <div className="font-mono text-[1.1rem] mb-3 text-white leading-relaxed">
                  ROAS<sub>target</sub> = 1 ÷ (GM% − Fee% − Ops% − Margin%)
                </div>
                <div className="text-[0.82rem] leading-[1.7]" style={{ color: "var(--ink-mute)" }}>
                  Margin% = % lợi nhuận mục tiêu<br />
                  Ads/đơn = Giá bán ÷ ROAS<br />
                  Profit/đơn = Giá bán × (GM − Fee − Ops − 1/ROAS)
                </div>
              </div>
            </div>

            <div className="rounded-xl p-6 text-[0.9rem] leading-[1.75]" style={{ background: "rgba(20,110,245,0.06)", border: "1px solid rgba(20,110,245,0.22)", color: "rgba(255,255,255,0.78)" }}>
              <strong className="text-white">Ví dụ thực tế:</strong> Sản phẩm Beauty giá 300.000đ, COGS 90.000đ (GM 70%), phí TikTok Non-Mall 18.5%, ops 8%, target margin 15%.<br />
              Break-even ROAS = 1 ÷ (70% − 18.5% − 8%) = 1 ÷ 43.5% ≈ <strong className="text-white">2.3x</strong> (chỉ để không lỗ)<br />
              Target ROAS = 1 ÷ (70% − 18.5% − 8% − 15%) = 1 ÷ 28.5% ≈ <strong className="text-white">3.5x</strong> (để lãi 15%).<br />
              <span style={{ color: "rgba(255,255,255,0.55)" }}> Đây là sản phẩm có cấu trúc tốt. Fashion hay F&B sẽ cần target ROAS cao hơn nhiều.</span>
            </div>
          </div>
        </section>

        {/* INDUSTRY BENCHMARKS */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32">
            <div className="section-tag">Benchmark ngành</div>
            <h2 className="t-h2 mb-3 text-white">
              ROAS bao nhiêu là đủ - <span className="grad-text">theo ngành hàng.</span>
            </h2>
            <p className="t-body mb-8 max-w-[680px]">
              Benchmark tính với phí TikTok Non-Mall ~18.5% + chi phí vận hành 8% điển hình. Nhập số thực của sản phẩm vào tool để có kết quả chính xác.
            </p>

            <div className="overflow-x-auto rounded-2xl mb-6" style={{ background: "rgba(20,40,90,0.30)", border: "1px solid var(--line)" }}>
              <table className="w-full text-[0.88rem]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                    <th className="text-left px-4 py-3 font-semibold text-white">Ngành hàng</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--ink-soft)" }}>Gross Margin điển hình</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: "#4ad6ff" }}>Break-even ROAS</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: "#5fffaa" }}>Target ROAS nên đạt</th>
                  </tr>
                </thead>
                <tbody style={{ color: "var(--ink-soft)" }}>
                  {[
                    { ngành: "Beauty / Health & Care", gm: "55–70%", be: "4–5x", target: "8–12x" },
                    { ngành: "Fashion / Apparel", gm: "45–60%", be: "5–7x", target: "10–15x" },
                    { ngành: "F&B / FMCG", gm: "35–50%", be: "6–8x", target: "12–18x" },
                    { ngành: "Home & Living", gm: "40–60%", be: "5–7x", target: "10–14x" },
                    { ngành: "Mother & Baby", gm: "50–65%", be: "4–6x", target: "9–13x" },
                    { ngành: "Electronics / Tech", gm: "15–25%", be: "15–25x", target: "30–50x", warn: true },
                  ].map((r, i) => (
                    <tr key={i} style={{ borderTop: "1px solid var(--line)" }}>
                      <td className="px-4 py-3 font-semibold text-white">{r.ngành}</td>
                      <td className="px-4 py-3">{r.gm}</td>
                      <td className="px-4 py-3 font-semibold" style={{ color: "#4ad6ff" }}>{r.be}</td>
                      <td className="px-4 py-3">
                        <span className="font-semibold" style={{ color: r.warn ? "#ffd479" : "#5fffaa" }}>{r.target}</span>
                        {r.warn && <span className="ml-2 text-[0.72rem]" style={{ color: "rgba(255,255,255,0.4)" }}>⚠ khó scale ads</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl px-5 py-4 text-[0.85rem] leading-[1.7]" style={{ background: "rgba(255,212,121,0.06)", border: "1px solid rgba(255,212,121,0.22)", color: "rgba(255,255,255,0.7)" }}>
              <strong className="text-white">Lưu ý Electronics:</strong> ROAS break-even 15–25x không có nghĩa là không thể chạy ads - seller Electronics thường build từ repeat purchase (accessory, consumable) và upsell warranty, không thuần profit per đơn đầu. Nếu chỉ bán 1 đơn, ads gần như không có lãi.
            </div>
          </div>
        </section>

        {/* GLOSSARY */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32">
            <div className="section-tag">Thuật ngữ</div>
            <h2 className="t-h2 mb-8 text-white">Glossary - <span className="grad-text">thuật ngữ cần biết.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  term: "ROAS",
                  def: "Return on Ad Spend = Doanh thu ÷ Chi phí ads. Ví dụ ROAS 5x: bỏ 1đ ads ra 5đ doanh thu.",
                },
                {
                  term: "Break-even ROAS",
                  def: "Mức ROAS tối thiểu để lợi nhuận = 0. Dưới mức này mỗi đơn hàng đang lỗ tiền thực.",
                },
                {
                  term: "Target ROAS",
                  def: "Mức ROAS cần đạt để đạt margin mục tiêu. Luôn cao hơn break-even ROAS.",
                },
                {
                  term: "Gross Margin (GM)",
                  def: "(Giá bán − COGS) ÷ Giá bán × 100%. Đây là 'sân chơi' cho phí sàn, ads và profit.",
                },
                {
                  term: "COGS",
                  def: "Cost of Goods Sold - giá vốn. Gồm xuất xưởng + bao bì + logistics về kho.",
                },
                {
                  term: "MER",
                  def: "Marketing Efficiency Ratio = Doanh thu ÷ Tổng chi marketing (mọi channel). Big-picture hơn ROAS.",
                },
                {
                  term: "ACOS",
                  def: "Advertising Cost of Sale = Chi phí ads ÷ Doanh thu ads × 100%. Nghịch đảo ROAS: ACOS 20% = ROAS 5x.",
                },
                {
                  term: "Available Margin",
                  def: "Gross margin − Phí sàn − Ops cost. Đây là phần 'có thể chi cho ads và còn lãi'.",
                },
              ].map((g) => (
                <div key={g.term} className="flex gap-4 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)" }}>
                  <div className="text-[0.78rem] font-bold uppercase tracking-[0.1em] w-28 flex-shrink-0 mt-0.5 grad-text leading-[1.4]">{g.term}</div>
                  <div className="text-[0.87rem] leading-[1.65]" style={{ color: "var(--ink-soft)" }}>{g.def}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32">
            <div className="section-tag">FAQ</div>
            <h2 className="t-h2 mb-8 text-white">Câu hỏi thường gặp về <span className="grad-text">ROAS.</span></h2>
            <div className="flex flex-col gap-3">
              {FAQS.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)" }}
                >
                  <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none">
                    <span className="text-[0.95rem] font-semibold text-white">{f.q}</span>
                    <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full transition-transform group-open:rotate-45" style={{ background: "rgba(20,110,245,0.18)", color: "#7da9ff" }}>+</span>
                  </summary>
                  <div className="px-5 pb-5 text-[0.9rem] leading-[1.75]" style={{ color: "var(--ink-mute)" }}>{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED TOOLS */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-20">
            <div className="section-tag">Xem thêm</div>
            <h2 className="t-h2 mb-8 text-white">Tools liên quan.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Link href="/tools/tinh-phi-san" className="glass p-6 block hover:border-blue-500/30 transition-colors">
                <div className="text-[0.72rem] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "#4ad6ff" }}>Tool</div>
                <div className="text-[1rem] font-semibold text-white mb-2">Tính phí sàn TikTok Shop & Shopee</div>
                <div className="text-[0.88rem] leading-[1.6]" style={{ color: "var(--ink-mute)" }}>
                  Lấy số phí sàn chính xác (hoa hồng + giao dịch + voucher extra) theo ngành hàng cụ thể  nhập vào ROAS Calculator.
                </div>
              </Link>
              <Link href="/ecom-foundation" className="glass p-6 block hover:border-blue-500/30 transition-colors">
                <div className="text-[0.72rem] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "#5fffaa" }}>Khoá học</div>
                <div className="text-[1rem] font-semibold text-white mb-2">Ecom Foundation - Build P&L thực chiến</div>
                <div className="text-[0.88rem] leading-[1.6]" style={{ color: "var(--ink-mute)" }}>
                  12 buổi từ cơ cấu chi phí, P&L gian hàng, đến tối ưu ROAS và scale team Ecom. Dành cho seller muốn làm bài bản.
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* COURSE CTA */}
        <section className="relative border-t overflow-hidden" style={{ borderColor: "var(--line)" }}>
          <div className="blob blob-blue blob-anim" style={{ width: 500, height: 500, top: "-20%", right: "-10%" }} />
          <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
            <div className="section-tag mx-auto">Khoá học thực chiến</div>
            <h2 className="t-h2 mb-4 text-white">
              Muốn hiểu sâu hơn về <span className="grad-text">P&L & tối ưu ROAS?</span>
            </h2>
            <p className="t-body max-w-[600px] mx-auto mb-8">
              Khoá Ecom Foundation đi từ cơ cấu chi phí, cách đọc P&L gian hàng, đến tối ưu ROAS và scale team - từ kinh nghiệm quản lý 60+ project Ecom thực tế.
            </p>
            <Link href="/ecom-foundation" className="btn btn-primary">
              Xem khoá học
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
