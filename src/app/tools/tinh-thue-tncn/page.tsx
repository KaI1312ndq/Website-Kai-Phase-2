import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons/Icon";
import Calculator from "./Calculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nguyenducquang.website";

export const metadata: Metadata = {
  title: "Tính Thuế TNCN 2026 - So sánh 2025 vs 2026 mới nhất",
  description:
    "Tool tính thuế thu nhập cá nhân 2026 theo Nghị quyết 110/2025/UBTVQH15 - so sánh trực tiếp với luật 2025 cũ. Nhập lương Gross/tháng, tự tính BHXH 10.5% + giảm trừ gia cảnh + thuế lũy tiến 5 bậc mới (giảm trừ 15.500.000 cho bản thân, 6.200.000/người phụ thuộc) + lương Net. Miễn phí.",
  alternates: { canonical: "/tools/tinh-thue-tncn" },
  openGraph: {
    type: "website",
    title: "Tính Thuế TNCN 2026 vs 2025 - Tool miễn phí",
    description: "So sánh thuế thu nhập cá nhân theo luật mới 2026 (5 bậc, giảm trừ 15.500.000) vs luật cũ 2025 (7 bậc, giảm trừ 11.000.000). Tính lương Net trong 3 giây.",
    url: `${SITE_URL}/tools/tinh-thue-tncn`,
  },
};

const FAQS = [
  {
    q: "Luật thuế TNCN 2026 khác gì 2025?",
    a: "2 thay đổi lớn: (1) Số bậc giảm từ 7 xuống 5 (nới rộng bậc thấp + bỏ bậc 15%/25%), (2) Giảm trừ gia cảnh tăng 41% - bản thân 11.000.000  15.500.000, người phụ thuộc 4.400.000  6.200.000/tháng. Áp dụng cho thu nhập từ 1/1/2026 theo Nghị quyết 110/2025/UBTVQH15.",
  },
  {
    q: "Người phụ thuộc là ai?",
    a: "Theo luật: (1) Con dưới 18 tuổi (hoặc 18+ nhưng đang đi học chính quy đến đại học), con khuyết tật; (2) Vợ/chồng + cha mẹ + ông bà + anh chị em không có thu nhập hoặc thu nhập ≤ 1.000.000/tháng và bạn đang nuôi dưỡng. Mỗi người phụ thuộc CHỈ được đăng ký giảm trừ tại 1 người nộp thuế.",
  },
  {
    q: "Bảo hiểm bắt buộc 10.5% gồm những gì?",
    a: "Người lao động đóng: BHXH 8% + BHYT 1.5% + BHTN 1% = 10.5% lương. Cap: BHXH+BHYT trừ trên mức lương tối đa 46.800.000 (20× lương cơ sở 2.340.000) - vượt mức này thì chỉ đóng tối đa 4.446.000 tổng BHXH+BHYT/tháng. BHTN cap riêng tại 99.200.000 (20× lương tối thiểu vùng I).",
  },
  {
    q: "Thưởng Tết có bị tính thuế không?",
    a: "Có. Thưởng Tết tính vào thu nhập tháng nhận thưởng (thường tháng 12 hoặc tháng 1)  đẩy thu nhập tháng đó lên cao có thể rơi vào bậc thuế cao hơn. Tool này tính cho lương đều mỗi tháng - nếu có thưởng lớn, bạn nên tính riêng tháng có thưởng.",
  },
  {
    q: "Tôi có 2 nguồn thu nhập (lương + freelance), tính sao?",
    a: "Lương cố định mỗi tháng: đơn vị trả lương khấu trừ thuế theo biểu lũy tiến (tool này áp dụng). Freelance/hợp đồng dưới 3 tháng > 2.000.000/lần: khấu trừ thẳng 10% (không qua biểu lũy tiến). Cuối năm quyết toán, gộp lại để tính chính xác - có thể nhận lại hoặc đóng thêm.",
  },
  {
    q: "Lương bao nhiêu thì không phải đóng thuế?",
    a: "2026 mới: lương Gross ≤ 17.318.000 (nếu đóng BHXH) HOẶC ≤ 15.500.000 (không BHXH) + 0 người phụ thuộc  không thuế. Mỗi người phụ thuộc nâng ngưỡng thêm 6.200.000. 2025 cũ: tương đương ngưỡng 12.291.000 (có BH) hoặc 11.000.000 (không BH).",
  },
  {
    q: "Tool có chính xác không?",
    a: "Tool áp dụng đúng công thức luật pháp + biểu thuế hiện hành. Sai số có thể xảy ra ở các trường hợp đặc thù: không cư trú, lao động nước ngoài, thu nhập từ chuyển nhượng/cổ tức/trúng thưởng, các khoản thưởng tính riêng. Cho thu nhập tiền lương thông thường - chính xác 100%.",
  },
  {
    q: "Khi nào quyết toán thuế TNCN 2025?",
    a: "Trước 31/3/2026 cho cá nhân tự quyết toán (qua portal etax.gdt.gov.vn), hoặc 30/4/2026 nếu uỷ quyền cho đơn vị trả lương. Quyết toán bù trừ chênh lệch giữa thuế đã khấu trừ trong năm và thuế tính lại tổng kết.",
  },
];

export default function TaxCalcPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
      { "@type": "ListItem", position: 3, name: "Tính Thuế TNCN 2026", item: `${SITE_URL}/tools/tinh-thue-tncn` },
    ],
  };

  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

        {/* HERO */}
        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "blue", size: 480, top: "-15%", right: "-5%" },
            { variant: "purple", size: 420, bottom: "-30%", left: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 pt-28 pb-10 md:pt-32 md:pb-14">
            <div className="flex items-center gap-2 text-[0.82rem] mb-4" style={{ color: "var(--ink-mute)" }}>
              <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
              <span>/</span>
              <span className="text-white">Tính Thuế TNCN 2026</span>
            </div>
            <div className="section-tag">Tool miễn phí · cập nhật luật mới</div>
            <h1 className="t-h1 leading-[1.05] text-white mb-4 max-w-[900px]">
              Tính thuế TNCN 2026 - <span className="grad-text">so sánh với luật 2025 cũ</span>
            </h1>
            <p className="t-body-lg max-w-[700px] mb-6" style={{ color: "var(--ink-soft)" }}>
              Nhập lương Gross/tháng  tự ra <strong className="text-white">2 kết quả song song</strong>: thuế bạn đóng theo luật 2025 vs 2026 mới (Nghị quyết 110/2025/UBTVQH15). Tự cộng BHXH 10.5% + giảm trừ gia cảnh + áp biểu lũy tiến. Tính lương Net thực nhận trong 3 giây.
            </p>
            <div className="flex flex-wrap gap-3 text-[0.82rem]" style={{ color: "var(--ink-mute)" }}>
              <span className="flex items-center gap-1.5"><Icon name="check" size={12} color="#5fffaa" strokeWidth={3} /> 5 bậc thuế mới 2026</span>
              <span className="flex items-center gap-1.5"><Icon name="check" size={12} color="#5fffaa" strokeWidth={3} /> Giảm trừ 15.500.000 / 6.200.000</span>
              <span className="flex items-center gap-1.5"><Icon name="check" size={12} color="#5fffaa" strokeWidth={3} /> So sánh luật cũ song song</span>
              <span className="flex items-center gap-1.5"><Icon name="check" size={12} color="#5fffaa" strokeWidth={3} /> Hoàn toàn miễn phí, không cần đăng ký</span>
            </div>
          </div>
        </section>

        {/* CALCULATOR */}
        <section className="relative">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 md:py-14">
            <Calculator />
          </div>
        </section>

        {/* LAW EXPLAINER */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-14 md:py-20">
            <Reveal>
              <div className="section-tag">So sánh luật 2025 vs 2026</div>
              <h2 className="t-h2 text-white mb-3 leading-tight">2 thay đổi lớn theo Nghị quyết 110/2025</h2>
              <p className="t-body max-w-[700px] mb-10" style={{ color: "var(--ink-soft)" }}>
                Từ 1/1/2026, người làm công ăn lương ở Việt Nam đóng thuế ít hơn đáng kể nhờ 2 thay đổi: gộp bậc thuế + nâng giảm trừ.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              <Reveal>
                <div className="rounded-2xl p-6" style={{ background: "rgba(255,212,121,0.05)", border: "1px solid rgba(255,212,121,0.22)" }}>
                  <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: "#ffd479" }}>Luật 2025 (cũ)</div>
                  <h3 className="text-[1.05rem] font-bold text-white mb-3">Biểu thuế 7 bậc</h3>
                  <table className="w-full text-[0.85rem]">
                    <thead>
                      <tr style={{ color: "var(--ink-mute)" }}>
                        <th className="text-left pb-2 font-semibold">Thu nhập tính thuế/tháng</th>
                        <th className="text-right pb-2 font-semibold">Thuế suất</th>
                      </tr>
                    </thead>
                    <tbody style={{ color: "var(--st-85)" }}>
                      <tr><td className="py-1">Đến 5.000.000</td><td className="text-right tabular-nums">5%</td></tr>
                      <tr><td className="py-1">5.000.000 – 10.000.000</td><td className="text-right tabular-nums">10%</td></tr>
                      <tr><td className="py-1">10.000.000 – 18.000.000</td><td className="text-right tabular-nums">15%</td></tr>
                      <tr><td className="py-1">18.000.000 – 32.000.000</td><td className="text-right tabular-nums">20%</td></tr>
                      <tr><td className="py-1">32.000.000 – 52.000.000</td><td className="text-right tabular-nums">25%</td></tr>
                      <tr><td className="py-1">52.000.000 – 80.000.000</td><td className="text-right tabular-nums">30%</td></tr>
                      <tr><td className="py-1">Trên 80.000.000</td><td className="text-right tabular-nums">35%</td></tr>
                    </tbody>
                  </table>
                  <div className="mt-4 text-[0.82rem]" style={{ color: "var(--st-70)" }}>
                    <strong>Giảm trừ:</strong> Bản thân 11.000.000 · Phụ thuộc 4.400.000/người/tháng
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="rounded-2xl p-6" style={{ background: "rgba(95,255,170,0.05)", border: "1px solid rgba(95,255,170,0.3)", boxShadow: "0 8px 30px rgba(95,255,170,0.10)" }}>
                  <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: "#5fffaa" }}>Luật 2026 (mới)</div>
                  <h3 className="text-[1.05rem] font-bold text-white mb-3">Biểu thuế 5 bậc</h3>
                  <table className="w-full text-[0.85rem]">
                    <thead>
                      <tr style={{ color: "var(--ink-mute)" }}>
                        <th className="text-left pb-2 font-semibold">Thu nhập tính thuế/tháng</th>
                        <th className="text-right pb-2 font-semibold">Thuế suất</th>
                      </tr>
                    </thead>
                    <tbody style={{ color: "var(--st-90)" }}>
                      <tr><td className="py-1">Đến 10.000.000</td><td className="text-right tabular-nums">5%</td></tr>
                      <tr><td className="py-1">10.000.000 – 30.000.000</td><td className="text-right tabular-nums">10%</td></tr>
                      <tr><td className="py-1">30.000.000 – 60.000.000</td><td className="text-right tabular-nums">20%</td></tr>
                      <tr><td className="py-1">60.000.000 – 100.000.000</td><td className="text-right tabular-nums">30%</td></tr>
                      <tr><td className="py-1">Trên 100.000.000</td><td className="text-right tabular-nums">35%</td></tr>
                    </tbody>
                  </table>
                  <div className="mt-4 text-[0.82rem]" style={{ color: "var(--st-85)" }}>
                    <strong>Giảm trừ:</strong> Bản thân <strong className="text-white">15.500.000</strong> · Phụ thuộc <strong className="text-white">6.200.000</strong>/người/tháng (<span style={{ color: "#5fffaa" }}>+41% so với 2025</span>)
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal>
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
                <h3 className="text-[1.05rem] font-bold text-white mb-4">Công thức tính step-by-step</h3>
                <ol className="flex flex-col gap-2.5 list-none" style={{ color: "var(--st-80)" }}>
                  {[
                    "Lấy Lương Gross/tháng (lương trên hợp đồng, trước trừ BH + thuế)",
                    "Trừ BHXH 8% + BHYT 1.5% + BHTN 1% = 10.5% (cap tại 46.800.000 cho BHXH + BHYT)",
                    "Trừ giảm trừ bản thân (11.000.000 cho 2025, 15.500.000 cho 2026)",
                    "Trừ giảm trừ người phụ thuộc × số người (4.400.000 hoặc 6.200.000/người)",
                    "= Thu nhập tính thuế. Nếu ≤ 0  không phải đóng thuế",
                    "Áp biểu thuế lũy tiến TỪNG PHẦN (không phải toàn phần). Mỗi bậc đóng theo riêng phần thuộc bậc đó",
                    "Cộng dồn  Tổng thuế TNCN tháng",
                    "Lương Net = Lương Gross − Bảo hiểm − Thuế TNCN",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-[0.9rem] leading-snug">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-[0.7rem] font-bold flex-shrink-0 mt-0.5" style={{ background: "rgba(20,110,245,0.18)", color: "#7da9ff" }}>{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[860px] mx-auto px-6 md:px-10 py-14 md:py-20">
            <Reveal>
              <div className="text-center mb-10">
                <div className="section-tag mx-auto">FAQ</div>
                <h2 className="t-h2 text-white">8 câu hỏi thường gặp về thuế TNCN</h2>
              </div>
            </Reveal>
            <div className="flex flex-col gap-3">
              {FAQS.map((f, i) => (
                <details key={i} className="group rounded-xl p-5" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
                  <summary className="flex items-center justify-between cursor-pointer text-[0.96rem] font-semibold text-white gap-3">
                    {f.q}
                    <span className="text-[1.2rem] transition-transform group-open:rotate-45 flex-shrink-0" style={{ color: "#7da9ff" }}>+</span>
                  </summary>
                  <p className="mt-3 text-[0.9rem] leading-[1.7]" style={{ color: "var(--ink-soft)" }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED TOOLS */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-14">
            <h2 className="text-[1.1rem] font-bold text-white mb-4">Tools khác có thể bạn cần</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { href: "/tools/tinh-phi-san", title: "Tính phí sàn TikTok & Shopee", desc: "Phí 2026, Mall vs Non-Mall, ngành cấp 3" },
                { href: "/tools/roas-calculator", title: "ROAS Calculator", desc: "Break-even + target ROAS theo phí sàn" },
                { href: "/tools/pnl-ecom", title: "Mẫu P&L Ecom", desc: "Báo cáo lãi lỗ gian hàng 5 tầng" },
              ].map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="rounded-xl p-5 transition-transform hover:-translate-y-0.5"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}
                >
                  <div className="text-[0.95rem] font-semibold text-white mb-1">{t.title}</div>
                  <div className="text-[0.82rem]" style={{ color: "var(--ink-mute)" }}>{t.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
