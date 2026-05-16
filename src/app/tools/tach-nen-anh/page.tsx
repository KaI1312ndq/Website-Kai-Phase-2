import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import RemoveBgClient from "./RemoveBgClient";

const SITE = "https://www.nguyenducquang.website";
const PAGE = `${SITE}/tools/tach-nen-anh`;

// Skip static generation - render at request time to avoid prerender error
// caused by dynamic import of heavy client component (Transformers.js / WebGPU).
// SEO still works: Googlebot gets the rendered HTML response.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tách nền ảnh AI miễn phí - Xoá nền ảnh sản phẩm online",
  description:
    "Tách nền ảnh sản phẩm Shopee/TikTok bằng AI miễn phí - không cần đăng ký, không watermark, 100% xử lý trên trình duyệt (ảnh không upload đâu cả). Hỗ trợ batch, nền trắng, crop tỷ lệ.",
  keywords: [
    "tách nền ảnh online", "tách nền ảnh miễn phí", "xoá nền ảnh AI",
    "remove background tiếng việt", "tách nền ảnh sản phẩm", "xoá phông ảnh",
    "tách nền hàng loạt", "tách nền ảnh shopee", "tách nền ảnh tiktok",
    "background remover", "ảnh trong suốt PNG", "nền trắng shopee",
  ],
  alternates: { canonical: "/tools/tach-nen-anh" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    title: "Tách nền ảnh AI miễn phí - Xoá nền online không cần đăng ký",
    description: "Tách nền sản phẩm Shopee/TikTok bằng AI · 10 ảnh free/ngày · Privacy 100% (chạy trên trình duyệt)",
    url: PAGE,
  },
};

const FAQS = [
  {
    q: "Tool tách nền ảnh này có tốn phí không?",
    a: "Tool miễn phí 10 ảnh/ngày, không cần đăng ký, không watermark. Nếu cần nhiều hơn chỉ cần nạp 1 lần 19.000đ là dùng VĨNH VIỄN, không giới hạn ảnh, không phải trả lại bao giờ.",
  },
  {
    q: "Ảnh của tôi có bị upload lên server không?",
    a: "KHÔNG. Tool dùng AI model (MODNet) chạy 100% trên trình duyệt của bạn. Ảnh chưa bao giờ rời máy tính. Đây là lý do tốc độ phụ thuộc vào máy bạn (lần đầu phải tải model ~25MB, lần sau dùng cache).",
  },
  {
    q: "Chất lượng tách nền có tốt bằng remove.bg không?",
    a: "85-95% tuỳ ảnh. Ảnh sản phẩm có nền đơn giản (Shopee/TikTok listing) tách rất sạch. Ảnh phức tạp (tóc bay, vật trong suốt) có thể không chính xác bằng remove.bg trả phí - tool sẽ liên tục cải tiến.",
  },
  {
    q: "Trình duyệt nào dùng được?",
    a: "Chrome 113+, Edge, Safari 17+, Firefox 121+. Đặc biệt: Chrome/Edge có WebGPU sẽ chạy nhanh hơn 3-5 lần (1-2s/ảnh), trình duyệt khác fallback WebAssembly (3-8s/ảnh). Mobile Chrome/Safari cũng dùng được nhưng chậm hơn.",
  },
  {
    q: "Có thể xử lý hàng loạt ảnh cùng lúc không?",
    a: "Có. Drag-drop tối đa 10 ảnh/lần, xử lý tuần tự, kết quả tải về dưới dạng .zip. Mỗi ảnh tối đa 12MB. Free 10 ảnh/ngày, Lifetime 19k không giới hạn ảnh/ngày.",
  },
  {
    q: "Nền trắng cho Shopee có chuẩn không?",
    a: "Có. Chọn option 'Nền trắng (chuẩn Shopee)' khi tách - tool tự đặt nền trắng tinh #FFFFFF, đúng yêu cầu ảnh chính của Shopee/TikTok Shop. Kèm option crop 1:1 (vuông) để đúng tỷ lệ ảnh chính sàn.",
  },
  {
    q: "Tỷ lệ crop có gì?",
    a: "4 tuỳ chọn: Giữ nguyên · 1:1 (vuông - ảnh chính Shopee/TikTok) · 3:4 (dọc - listing detail) · 4:5 (Instagram Reel). Tự crop từ trung tâm, không bóp méo ảnh.",
  },
];

const appLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Tách nền ảnh AI - Background Remover",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web Browser",
  description: "Tách nền ảnh sản phẩm bằng AI, chạy 100% client-side, không upload ảnh lên server.",
  url: PAGE,
  inLanguage: "vi-VN",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: 0, priceCurrency: "VND" },
  creator: { "@type": "Person", name: "Nguyễn Đức Quảng", url: SITE },
  featureList: [
    "Tách nền ảnh AI miễn phí 10 ảnh/ngày",
    "Xử lý 100% trên trình duyệt - ảnh không upload",
    "Hỗ trợ batch 10 ảnh cùng lúc",
    "Nền trong suốt PNG / nền trắng / nền màu tuỳ chọn",
    "Crop tỷ lệ 1:1, 3:4, 4:5",
    "Download .zip batch",
  ],
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE}/tools` },
    { "@type": "ListItem", position: 3, name: "Tách nền ảnh AI", item: PAGE },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <Navbar />
      <main className="relative" style={{ background: "var(--bg-base)" }}>
        <GradientBlobs blobs={[
          { variant: "blue", size: 520, top: "10%", left: "-12%" },
          { variant: "purple", size: 460, top: "30%", right: "-10%", delay: "2s" },
          { variant: "blue", size: 380, bottom: "20%", left: "30%", delay: "4s" },
        ]} />

        {/* HERO */}
        <section className="relative pt-24 pb-8 md:pt-32 md:pb-12">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <div className="section-tag">Tools · Image AI</div>
            <h1 className="t-h1 mb-5 text-white">
              Tách nền ảnh sản phẩm AI - <span className="grad-text">5 giây, miễn phí</span>
            </h1>
            <p className="t-body-lg max-w-[720px] mb-5">
              Tách nền ảnh sản phẩm cho Shopee, TikTok Shop bằng AI. <strong className="text-white">Không cần đăng ký</strong>,
              không watermark, ảnh không upload lên server - 100% xử lý trên trình duyệt của bạn.
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {["Miễn phí 10 ảnh/ngày", "Không watermark", "Batch 10 ảnh", "Privacy 100%", "Nền trong suốt / trắng / màu"].map(t => (
                <span key={t} className="wf-badge text-[0.72rem]">{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* TOOL */}
        <section className="relative">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-10 md:py-14">
            <RemoveBgClient />
          </div>
        </section>

        {/* USE CASES */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="section-tag">Dành cho ai</div>
            <h2 className="t-h2 mb-10 text-white">Ai dùng tool này <span className="grad-text">nhiều nhất?</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { t: "Seller Shopee / TikTok Shop", d: "Tách nền ảnh sản phẩm để đạt chuẩn ảnh chính - nền trắng tinh, vuông 1:1. Tăng CTR + ranking listing." },
                { t: "Người làm content e-commerce", d: "Cắt sản phẩm để overlay vào background mới, làm thumbnail livestream, video sản phẩm." },
                { t: "Freelance / Designer", d: "Pre-process ảnh nhanh trước khi đưa vào Photoshop/Figma. Tiết kiệm 80% thời gian so với mask thủ công." },
              ].map(uc => (
                <div key={uc.t} className="glass p-6">
                  <div className="text-[1rem] font-semibold text-white mb-2">{uc.t}</div>
                  <div className="text-[0.88rem] leading-[1.65]" style={{ color: "var(--ink-mute)" }}>{uc.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="section-tag">Cách hoạt động</div>
            <h2 className="t-h2 mb-10 text-white">3 bước - <span className="grad-text">5 giây mỗi ảnh.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { n: "01", t: "Upload ảnh", d: "Kéo thả hoặc click chọn 1-10 ảnh sản phẩm. PNG/JPG/WebP, tối đa 12MB mỗi ảnh." },
                { n: "02", t: "Chọn setting", d: "Loại nền (trong suốt / trắng / màu tuỳ chọn) + tỷ lệ crop (1:1 vuông, 3:4 dọc, 4:5 reel). Mặc định: trong suốt + giữ nguyên." },
                { n: "03", t: "Tách + Tải", d: "Click 'Tách nền' - AI model chạy ngay trên trình duyệt. Kết quả hiện ngay, tải về từng ảnh hoặc batch .zip." },
              ].map(s => (
                <div key={s.n} className="glass p-6">
                  <div className="text-[1.6rem] font-bold tracking-tight grad-text leading-none mb-3">{s.n}</div>
                  <div className="text-[1rem] font-semibold text-white mb-2">{s.t}</div>
                  <div className="text-[0.88rem] leading-[1.65]" style={{ color: "var(--ink-mute)" }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARE */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="section-tag">So sánh</div>
            <h2 className="t-h2 mb-3 text-white">Vs remove.bg, vs Photoroom - <span className="grad-text">khác gì?</span></h2>
            <p className="t-body mb-8 max-w-[700px]">Tool này phù hợp với seller VN cần volume cao, free, ưu tiên privacy.</p>
            <div className="overflow-x-auto rounded-2xl" style={{ background: "var(--dg-30)", border: "1px solid var(--line)" }}>
              <table className="w-full text-[0.88rem]">
                <thead>
                  <tr style={{ background: "var(--st-04)" }}>
                    <th className="text-left px-4 py-3 font-semibold text-white">Tính năng</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: "#5fffaa" }}>Tool này</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--st-65)" }}>remove.bg</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--st-65)" }}>Photoroom</th>
                  </tr>
                </thead>
                <tbody style={{ color: "var(--ink-soft)" }}>
                  {[
                    ["Free tier", "10 ảnh/ngày", "1 ảnh full HD/tháng", "Hạn chế watermark"],
                    ["Privacy", "100% browser, ảnh không upload", "Upload server", "Upload server"],
                    ["Batch xử lý", "10 ảnh/lần (free)", "Pro $$ mới có", "Pro $$ mới có"],
                    ["Đăng ký tài khoản", "Không cần", "Có (email)", "Có (email)"],
                    ["Watermark trên free", "Không", "Output thumbnail thôi", "Có"],
                    ["Tiếng Việt", "Có", "Không", "Không"],
                    ["Premium giá", "19k lifetime (1 lần)", "$9/tháng (~225k)", "$13/tháng (~325k)"],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderTop: "1px solid var(--line)" }}>
                      <td className="px-4 py-3 font-semibold text-white">{row[0]}</td>
                      <td className="px-4 py-3" style={{ color: "#5fffaa" }}>{row[1]}</td>
                      <td className="px-4 py-3">{row[2]}</td>
                      <td className="px-4 py-3">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[860px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="section-tag">FAQ</div>
            <h2 className="t-h2 mb-10 text-white">Câu hỏi <span className="grad-text">thường gặp.</span></h2>
            <div className="space-y-3">
              {FAQS.map((f, i) => (
                <details key={i} className="group rounded-xl p-5" style={{ background: "var(--st-03)", border: "1px solid var(--line)" }}>
                  <summary className="cursor-pointer font-semibold text-white text-[0.95rem] flex items-center justify-between">
                    {f.q}
                    <span className="ml-3 text-[0.7rem]" style={{ color: "var(--st-45)" }}>▾</span>
                  </summary>
                  <div className="mt-3 text-[0.88rem] leading-[1.7]" style={{ color: "var(--ink-mute)" }}>{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
