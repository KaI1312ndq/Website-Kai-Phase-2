import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Mẫu P&L Ecom 2026 — Lập báo cáo lãi lỗ gian hàng TikTok & Shopee miễn phí",
  description:
    "Công cụ lập P&L gian hàng TMĐT online — nhập số đơn, AOV, COGS, phí sàn, ads, ops → ra ngay báo cáo P&L hoàn chỉnh: Net Revenue, Gross Profit, Contribution Margin, EBITDA. In PDF được. Miễn phí.",
  keywords: [
    "mẫu P&L ecom", "P&L gian hàng", "lập P&L tmđt",
    "mẫu báo cáo lãi lỗ ecommerce", "P&L TikTok Shop", "P&L Shopee",
    "P&L template", "tính lãi lỗ shop", "báo cáo P&L gian hàng",
    "tính lợi nhuận shop tmđt", "tool tính P&L", "P&L 2026",
    "EBITDA gian hàng", "contribution margin ecom",
    "unit economics ecom", "P&L mẫu seller",
    "lập kế hoạch tài chính shop", "P&L excel ecom",
  ],
  alternates: { canonical: "/tools/pnl-ecom" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "Mẫu P&L Ecom 2026 — Lập báo cáo lãi lỗ gian hàng miễn phí",
    description:
      "Công cụ lập P&L gian hàng TikTok Shop & Shopee — preset phí sàn 2026, in PDF, có chẩn đoán margin tự động.",
  },
};

const FAQS = [
  {
    q: "P&L là gì? Tại sao seller TMĐT cần?",
    a: "P&L (Profit & Loss Statement) là báo cáo lãi lỗ — bảng tóm tắt doanh thu trừ đi mọi chi phí trong một kỳ (tuần/tháng/quý) để biết thực sự lãi hay lỗ bao nhiêu. Seller TMĐT cần P&L vì: (1) doanh thu cao không có nghĩa là lãi — nhiều shop GMV tỷ đồng nhưng lỗ vì phí sàn + ads ăn hết margin. (2) Để lập kế hoạch scale phải biết unit economics — mỗi đơn lãi bao nhiêu sau mọi chi phí. (3) Ngân hàng, đối tác, investor đều xem P&L để đánh giá sức khoẻ business.",
  },
  {
    q: "Cấu trúc P&L gian hàng TMĐT chuẩn gồm những gì?",
    a: "Tiêu chuẩn P&L ecom có 5 tầng: (1) Net Revenue = GMV − Hoàn hàng. (2) Gross Profit = Net Revenue − Voucher seller − COGS. (3) Contribution Margin = Gross Profit − Phí sàn − Phí ship seller chịu (đo lường mỗi đơn đóng góp gì). (4) Marketing Profit = Contribution Margin − Ads spend. (5) EBITDA / Operating Profit = Marketing Profit − Nhân sự − Kho − Marketing khác. EBITDA là con số cuối phản ánh business có lãi vận hành hay không.",
  },
  {
    q: "Sự khác nhau giữa Gross Margin, Contribution Margin và EBITDA?",
    a: "Gross Margin chỉ tính giá vốn — sản phẩm có 'biên dư' bao nhiêu trước mọi chi phí khác. Contribution Margin là margin sau khi trừ thêm phí sàn và logistics — đây là con số quan trọng nhất với seller TMĐT, vì nó cho biết mỗi đơn 'còn dư' bao nhiêu để chi cho ads + ops. EBITDA là lợi nhuận vận hành cuối (chưa trừ thuế và khấu hao) — phản ánh business có lãi thật sự hay không. Một shop có gross margin 60% nhưng EBITDA 2% là dấu hiệu chi phí ads + ops quá cao.",
  },
  {
    q: "EBITDA bao nhiêu là khoẻ với gian hàng ecom?",
    a: "Benchmark theo growth stage: shop mới (0-6 tháng) thường EBITDA 0-5% (đang invest vào ads để build brand awareness). Shop ổn định (6-18 tháng) nên đạt 8-15%. Shop trưởng thành (18 tháng+) target 15-25%. Một số ngành như Beauty premium có thể đạt 25-35% nhờ gross margin cao và brand loyalty. F&B/Electronics thường < 10% là điều bình thường vì ngành mỏng margin.",
  },
  {
    q: "Cách dùng P&L để ra quyết định kinh doanh?",
    a: "3 ứng dụng chính: (1) Scale ads — nếu Contribution Margin > 25%, có thể tăng ads aggressive vì mỗi đơn còn dư đủ. Nếu CM < 10%, đừng tăng ads, hãy fix cost structure trước. (2) Đánh giá SKU — chạy P&L riêng từng SKU, cắt SKU EBITDA âm sau 2-3 tháng thử. (3) Plan headcount — nguyên tắc: chi nhân sự không quá 30% Contribution Margin, không thì sẽ ăn hết operating profit.",
  },
  {
    q: "Tại sao Contribution Margin quan trọng hơn ROAS?",
    a: "ROAS chỉ đo hiệu quả ads, không tính phí sàn, COGS, ops. Một shop ROAS 8x trông có vẻ tốt, nhưng nếu Contribution Margin chỉ 5%, scale ads = scale lỗ vì mỗi đơn không đủ để cover ads + ops cố định. Contribution Margin tính đến tất cả chi phí biến đổi — đây mới là con số cho biết bạn có thể chi bao nhiêu cho ads mà vẫn lãi. Best practice: track ROAS hằng ngày, track CM hằng tuần, track EBITDA hằng tháng.",
  },
  {
    q: "Phải tách P&L theo từng platform (TikTok vs Shopee) không?",
    a: "Có, nên tách. Vì cấu trúc phí, ROAS, return rate, AOV của TikTok Shop và Shopee rất khác nhau. Nhiều shop tổng EBITDA 15% nhưng tách ra mới biết Shopee 22% (cõng phần lỗ), TikTok 8% (đang đau). Tách P&L theo platform giúp ra quyết định re-allocate budget chính xác. Tool này hỗ trợ tính từng platform — bạn chạy 2 lần với preset khác nhau và so sánh.",
  },
  {
    q: "P&L tháng tốt nhưng cash flow vẫn âm — tại sao?",
    a: "P&L (accrual basis) khác Cash Flow (cash basis). Lý do phổ biến: (1) Sàn TikTok/Shopee giữ tiền 14-30 ngày sau giao thành công → P&L ghi doanh thu nhưng cash chưa về. (2) Bạn nhập hàng đủ cho 2 tháng → COGS ghi theo bán nhưng cash ra trước. (3) Hoàn hàng — nhiều shop bị âm cash đột ngột vì bão hoàn 1 tuần. Lưu ý: P&L cho biết business có lãi không, Cash Flow cho biết có sống được không. Cần track cả 2.",
  },
  {
    q: "Tool này có lưu data hay export Excel được không?",
    a: "Hiện tại tool tính tức thời trong trình duyệt và có nút In / Xuất PDF — bạn có thể in ra hoặc save thành PDF qua hộp thoại in của trình duyệt. Phiên bản tiếp theo sẽ có lưu URL state để share kết quả và export Excel. Nếu cần file Excel template chuyên sâu hơn (theo dõi 12 tháng, breakdown theo SKU/platform), đăng ký khoá Ecom Foundation để nhận template thực chiến đầy đủ.",
  },
  {
    q: "Sự khác nhau giữa tool này và tool ROAS Calculator?",
    a: "ROAS Calculator dùng để biết campaign ads cần ROAS bao nhiêu để có lãi (tính theo từng đơn, từng SKU, focus vào marketing). P&L Ecom dùng để xem toàn bộ business 1 tháng (gồm cả ads, nhân sự, ops, kho — focus vào tổng thể). Best workflow: dùng ROAS Calculator khi set KPI cho campaign mới, dùng P&L Ecom mỗi cuối tháng để review sức khoẻ business và quyết định scale hay điều chỉnh.",
  },
];

export default function PnLEcomPage() {
  const baseUrl = "https://nguyenducquang.website";
  const pageUrl = `${baseUrl}/tools/pnl-ecom`;

  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Mẫu P&L Ecom — Lập báo cáo lãi lỗ gian hàng TMĐT",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Profit & Loss Calculator",
    operatingSystem: "Web",
    description:
      "Công cụ lập báo cáo P&L (Profit & Loss) cho gian hàng TikTok Shop và Shopee — tính Net Revenue, Gross Profit, Contribution Margin, EBITDA tự động, có in PDF.",
    url: pageUrl,
    inLanguage: "vi-VN",
    isAccessibleForFree: true,
    creator: { "@type": "Person", name: "Nguyễn Đức Quảng", url: baseUrl },
    offers: { "@type": "Offer", price: 0, priceCurrency: "VND" },
    featureList: [
      "Tính P&L 5 tầng: Net Revenue → Gross → Contribution → Marketing → EBITDA",
      "Preset phí sàn TikTok Shop & Shopee 2026",
      "3 kịch bản mẫu Beauty / Fashion / F&B",
      "Chẩn đoán margin tự động",
      "In PDF / Xuất báo cáo",
      "Unit economics: CPA, ROAS, profit/đơn",
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${baseUrl}/tools` },
      { "@type": "ListItem", position: 3, name: "Mẫu P&L Ecom", item: pageUrl },
    ],
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cách lập P&L cho gian hàng TMĐT",
    description:
      "Hướng dẫn 5 bước lập báo cáo P&L cho shop TikTok Shop / Shopee với công cụ Mẫu P&L Ecom.",
    inLanguage: "vi-VN",
    totalTime: "PT3M",
    step: [
      { "@type": "HowToStep", position: 1, name: "Nhập volume", text: "Nhập số đơn hoàn thành và AOV (giá trị trung bình/đơn) trong tháng. Tỷ lệ hoàn hàng tính trên GMV." },
      { "@type": "HowToStep", position: 2, name: "Nhập biến đổi/đơn", text: "Giá vốn (COGS), phí sàn (chọn preset hoặc nhập tay), voucher seller, phí ship seller chịu/đơn." },
      { "@type": "HowToStep", position: 3, name: "Nhập chi phí cố định", text: "Ads spend tháng, nhân sự, kho/logistics cố định, marketing khác (KOC, content), chi khác." },
      { "@type": "HowToStep", position: 4, name: "Đọc P&L 5 tầng", text: "Net Revenue → Gross Profit (sau COGS) → Contribution Margin (sau phí sàn) → Marketing Profit (sau ads) → EBITDA." },
      { "@type": "HowToStep", position: 5, name: "In hoặc xuất PDF", text: "Nút In / Xuất PDF in báo cáo P&L sạch để share team hoặc lưu trữ." },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question", name: f.q,
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
            <li>Mẫu P&L Ecom</li>
          </ol>
        </nav>

        {/* HERO */}
        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <div className="blob blob-purple blob-anim" style={{ width: 600, height: 600, top: "-15%", left: "-10%" }} />
          <div className="blob blob-blue blob-anim" style={{ width: 500, height: 500, bottom: "-20%", right: "-10%", animationDelay: "3s" }} />
          <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-16 md:pb-24">
            <div className="mb-6">
              <Link href="/tools" className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium transition-colors hover:text-white" style={{ color: "var(--ink-mute)" }}>
                ← Tất cả Tools
              </Link>
            </div>
            <div className="section-tag">Tools · Miễn phí</div>
            <h1 className="t-h1 mb-4 leading-[1.1] text-white max-w-[860px]">
              Mẫu P&L Ecom — <span className="grad-text">Báo cáo lãi lỗ gian hàng.</span>
            </h1>
            <p className="t-body-lg max-w-[760px] mb-6">
              Nhập số đơn, AOV, COGS, phí sàn, ads, ops — tool ra ngay báo cáo <strong className="text-white">P&L 5 tầng</strong> đúng chuẩn ecom: Net Revenue → Gross Profit → Contribution Margin → Marketing Profit → EBITDA. Có preset TikTok Shop & Shopee 2026 và in PDF.
            </p>
            <div className="flex flex-wrap gap-2">
              {["P&L 5 tầng", "Net Revenue", "Contribution Margin", "EBITDA", "Phí sàn 2026", "In PDF"].map((tag) => (
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
            <h2 className="t-h2 mb-8 text-white">Cách dùng <span className="grad-text">Mẫu P&L Ecom.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { n: "01", t: "Volume", d: "Số đơn hoàn thành + AOV. Hoàn hàng % tính trên GMV." },
                { n: "02", t: "Biến đổi/đơn", d: "COGS, phí sàn (preset), voucher seller, ship seller chịu." },
                { n: "03", t: "Cố định/tháng", d: "Ads, nhân sự, kho, marketing khác, chi khác." },
                { n: "04", t: "Đọc P&L", d: "5 tầng: Net → Gross → CM → Marketing → EBITDA. Mỗi tầng có % so net revenue." },
                { n: "05", t: "In PDF", d: "Nút ⎙ In/PDF — báo cáo sạch để share team hoặc lưu trữ." },
              ].map((s) => (
                <div key={s.n} className="glass p-5">
                  <div className="text-[1.4rem] font-bold tracking-tight grad-text leading-none mb-3">{s.n}</div>
                  <div className="text-[0.95rem] font-semibold text-white mb-2">{s.t}</div>
                  <div className="text-[0.84rem] leading-[1.6]" style={{ color: "var(--ink-mute)" }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FORMULA / STRUCTURE */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32">
            <div className="section-tag">Cấu trúc</div>
            <h2 className="t-h2 mb-3 text-white">P&L 5 tầng — <span className="grad-text">đúng chuẩn ecom.</span></h2>
            <p className="t-body mb-10 max-w-[680px]">
              Sai lầm phổ biến của seller là chỉ nhìn doanh thu và profit cuối, bỏ qua các tầng giữa. Cấu trúc 5 tầng giúp pinpoint chính xác chi phí nào đang ăn margin.
            </p>

            <div className="flex flex-col gap-3">
              {[
                { name: "1. Net Revenue", formula: "GMV − Hoàn hàng / huỷ", note: "Doanh thu thực tế đã giao thành công, chưa trừ voucher hay phí." },
                { name: "2. Gross Profit", formula: "Net Revenue − Voucher seller − COGS", note: "Margin trước khi trừ phí sàn — đo sức khoẻ giá vốn của sản phẩm." },
                { name: "3. Contribution Margin", formula: "Gross Profit − Phí sàn − Phí ship seller", note: "★ Quan trọng nhất — mỗi đơn đóng góp bao nhiêu để cover ads và ops cố định.", highlight: true },
                { name: "4. Marketing Profit", formula: "Contribution Margin − Ads spend", note: "Phần dư sau khi trừ ads — biểu thị hiệu quả paid marketing." },
                { name: "5. EBITDA", formula: "Marketing Profit − Nhân sự − Kho − Marketing khác − Chi khác", note: "Lãi vận hành thật sự (chưa thuế và khấu hao). Đây là số cuối phản ánh sức khoẻ business." },
              ].map((t, i) => (
                <div key={i} className="rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-6" style={{ background: t.highlight ? "rgba(95,255,170,0.06)" : "rgba(255,255,255,0.025)", border: `1px solid ${t.highlight ? "rgba(95,255,170,0.25)" : "var(--line)"}` }}>
                  <div className="text-[0.95rem] font-bold text-white md:w-44 flex-shrink-0">{t.name}</div>
                  <div className="font-mono text-[0.88rem] md:w-[420px] flex-shrink-0" style={{ color: t.highlight ? "#5fffaa" : "rgba(255,255,255,0.85)" }}>= {t.formula}</div>
                  <div className="text-[0.84rem] leading-[1.6]" style={{ color: "var(--ink-mute)" }}>{t.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BENCHMARKS */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32">
            <div className="section-tag">Benchmark</div>
            <h2 className="t-h2 mb-3 text-white">EBITDA bao nhiêu là <span className="grad-text">khoẻ?</span></h2>
            <p className="t-body mb-8 max-w-[680px]">Mức EBITDA % nên đạt theo growth stage của shop:</p>
            <div className="overflow-x-auto rounded-2xl" style={{ background: "rgba(20,40,90,0.30)", border: "1px solid var(--line)" }}>
              <table className="w-full text-[0.88rem]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                    <th className="text-left px-4 py-3 font-semibold text-white">Stage</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--ink-soft)" }}>Đặc điểm</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: "#4ad6ff" }}>EBITDA target</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: "#5fffaa" }}>Contribution Margin</th>
                  </tr>
                </thead>
                <tbody style={{ color: "var(--ink-soft)" }}>
                  {[
                    { s: "0–6 tháng (Launch)", d: "Đầu tư brand, ads aggressive", e: "0–5%", c: "≥ 15%" },
                    { s: "6–18 tháng (Scale)", d: "Đã có repeat, đang scale", e: "8–15%", c: "≥ 20%" },
                    { s: "18 tháng+ (Mature)", d: "Brand ổn định, optimize", e: "15–25%", c: "≥ 25%" },
                    { s: "Premium / Niche", d: "Beauty cao cấp, brand mạnh", e: "25–35%", c: "≥ 35%" },
                  ].map((r, i) => (
                    <tr key={i} style={{ borderTop: "1px solid var(--line)" }}>
                      <td className="px-4 py-3 font-semibold text-white">{r.s}</td>
                      <td className="px-4 py-3">{r.d}</td>
                      <td className="px-4 py-3 font-semibold" style={{ color: "#4ad6ff" }}>{r.e}</td>
                      <td className="px-4 py-3 font-semibold" style={{ color: "#5fffaa" }}>{r.c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32">
            <div className="section-tag">FAQ</div>
            <h2 className="t-h2 mb-8 text-white">Câu hỏi thường gặp về <span className="grad-text">P&L gian hàng.</span></h2>
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
                <div className="text-[1rem] font-semibold text-white mb-2">Tính phí sàn TikTok & Shopee</div>
                <div className="text-[0.88rem] leading-[1.6]" style={{ color: "var(--ink-mute)" }}>Lấy số phí chính xác theo ngành hàng để nhập vào P&L.</div>
              </Link>
              <Link href="/tools/roas-calculator" className="glass p-6 block hover:border-blue-500/30 transition-colors">
                <div className="text-[0.72rem] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "#7da9ff" }}>Tool</div>
                <div className="text-[1rem] font-semibold text-white mb-2">ROAS Calculator</div>
                <div className="text-[0.88rem] leading-[1.6]" style={{ color: "var(--ink-mute)" }}>Tính break-even & target ROAS cho từng campaign ads.</div>
              </Link>
            </div>
          </div>
        </section>

        {/* COURSE CTA */}
        <section className="relative border-t overflow-hidden" style={{ borderColor: "var(--line)" }}>
          <div className="blob blob-blue blob-anim" style={{ width: 500, height: 500, top: "-20%", right: "-10%" }} />
          <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
            <div className="section-tag mx-auto">Khoá học thực chiến</div>
            <h2 className="t-h2 mb-4 text-white">Muốn build P&L 12 tháng + breakdown SKU/platform?</h2>
            <p className="t-body max-w-[600px] mx-auto mb-8">Khoá Ecom Foundation có 1 buổi chuyên về P&L thực chiến + template Excel theo dõi 12 tháng và 4 platform.</p>
            <Link href="/ecom-foundation" className="btn btn-primary">
              Xem khoá học <span className="arrow">→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
