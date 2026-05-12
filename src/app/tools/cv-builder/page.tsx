import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";

export const metadata: Metadata = {
  title: "CV Builder ATS-friendly miễn phí - Tạo CV chuẩn 5 phút",
  description: "Tạo CV chuẩn ATS-friendly cho sinh viên + junior marketer. 3 template free + AI feedback cụ thể. 3 lần tải miễn phí, Pro 49k vĩnh viễn.",
  keywords: ["cv builder", "tạo cv miễn phí", "cv template marketing", "cv ats friendly"],
  alternates: { canonical: "/tools/cv-builder" },
};

const FAQ = [
  { q: "Free 3 lần tải nghĩa là sao?", a: "Bạn đăng nhập rồi tạo CV - có thể tải 3 file PDF không watermark hoàn toàn miễn phí. Sau 3 lần, muốn tải thêm thì upgrade Pro 49k - vĩnh viễn unlimited." },
  { q: "AI feedback hoạt động thế nào?", a: "Sau khi điền xong CV, bấm 'AI feedback' - GPT-4o-mini sẽ phân tích CV và cho 4 nhóm: điểm mạnh, điểm yếu, gợi ý cụ thể từng bullet, và ATS score 1-10. Bạn TỰ sửa CV theo gợi ý - không có auto-rewrite vì recruiter dễ nhận ra CV AI viết." },
  { q: "CV này có ATS-friendly không?", a: "Có. Template ATS dùng layout 1 cột plain text, không icon/graphics, font Inter standard - parse được 99% các hệ thống ATS (Workday, Lever, Greenhouse, BambooHR...)." },
  { q: "Khác Canva/TopCV?", a: "Canva visual-first nhưng không ATS-friendly (2 cột thường fail). TopCV form cứng + ít template. Tool này: ATS-first + AI feedback chuyên sâu cho Marketing/Ecom VN." },
  { q: "Có hoàn tiền không?", a: "Có. Nếu sau khi mua Pro mà thấy không phù hợp, inbox Zalo 0868464658 trong 7 ngày, mình hoàn 100%." },
];

export default function CVBuilderLanding() {
  return (
    <>
      <Navbar />
      <GradientBlobs blobs={[
        { variant: "blue", size: 520, top: "-20%", right: "-5%" },
        { variant: "purple", size: 380, bottom: "20%", left: "-8%", delay: "2s" },
      ]} />

      <main className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-28 pb-16 md:pt-32 md:pb-24">
        {/* Hero */}
        <header className="text-center mb-14">
          <div className="section-tag mb-3">CV Builder · Miễn phí · ATS-friendly</div>
          <h1 className="t-display mb-5 max-w-[900px] mx-auto text-white">
            Tạo CV chuẩn ATS <span className="grad-text">trong 5 phút</span>
          </h1>
          <p className="t-body-lg max-w-[680px] mx-auto mb-7" style={{ color: "var(--ink-soft)" }}>
            3 template free + AI feedback chi tiết cho Marketing, Ecom, Tech VN.
            Đăng nhập 1 lần - tải 3 file PDF không watermark hoàn toàn miễn phí.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/tools/cv-builder/build" className="btn btn-primary text-[1.05rem]">
              Bắt đầu tạo CV miễn phí
            </Link>
            <Link href="#templates" className="btn btn-ghost">
              Xem template
            </Link>
          </div>
        </header>

        {/* Pricing tier */}
        <section id="pricing" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14 max-w-[800px] mx-auto">
          <div className="rounded-2xl p-6" style={{ background: "var(--st-04)", border: "1px solid var(--st-10)" }}>
            <div className="text-[0.7rem] font-bold uppercase tracking-wider mb-2" style={{ color: "var(--ink-mute)" }}>Free</div>
            <div className="text-[2rem] font-bold text-white mb-1">0đ</div>
            <div className="text-[0.85rem] mb-4" style={{ color: "var(--ink-mute)" }}>Đăng nhập 1 lần</div>
            <ul className="space-y-2 text-[0.9rem]" style={{ color: "var(--ink-soft)" }}>
              <li>✓ 3 lần tải PDF không watermark</li>
              <li>✓ 3 template (ATS / Visual / Hybrid)</li>
              <li>✓ AI feedback 1 lần / CV</li>
              <li>✓ Lưu draft auto</li>
            </ul>
          </div>
          <div className="rounded-2xl p-6 relative" style={{ background: "var(--grad-primary-soft)", border: "2px solid var(--wf-blue)" }}>
            <span className="absolute -top-2.5 right-5 px-2.5 py-0.5 rounded-md text-[0.65rem] font-bold uppercase tracking-wider" style={{ background: "var(--grad-primary)", color: "white" }}>
              Lifetime
            </span>
            <div className="text-[0.7rem] font-bold uppercase tracking-wider mb-2" style={{ color: "#7da9ff" }}>Pro · Vĩnh viễn</div>
            <div className="text-[2rem] font-bold text-white mb-1">49.000đ</div>
            <div className="text-[0.85rem] mb-4" style={{ color: "var(--ink-mute)" }}>1 lần - dùng mãi mãi</div>
            <ul className="space-y-2 text-[0.9rem]" style={{ color: "var(--ink-soft)" }}>
              <li>✓ Unlimited download không watermark</li>
              <li>✓ Tất cả template + update mới</li>
              <li>✓ AI feedback 50 lần/tháng</li>
              <li>✓ Priority support qua Zalo</li>
            </ul>
          </div>
        </section>

        {/* Why */}
        <section className="mb-14">
          <h2 className="t-h2 text-center mb-8 text-white">Tại sao chọn tool này?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "ATS-friendly thực sự", desc: "Template ATS dùng 1 cột plain text, parse 99% bởi Workday/Lever/Greenhouse - khác Canva 2 cột thường fail." },
              { title: "AI feedback chuyên sâu", desc: "GPT-4o-mini phân tích CV theo lens recruiter Marketing/Ecom VN. Không auto-rewrite, bạn TỰ sửa - giữ giọng riêng." },
              { title: "Miễn phí thật sự", desc: "3 lần tải không watermark. Pro chỉ 49k vĩnh viễn - không subscription, không phí ẩn." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl p-6" style={{ background: "var(--st-03)", border: "1px solid var(--st-08)" }}>
                <h3 className="text-[1.05rem] font-bold text-white mb-2">{f.title}</h3>
                <p className="text-[0.92rem] leading-[1.6]" style={{ color: "var(--ink-mute)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Templates preview */}
        <section id="templates" className="mb-14">
          <h2 className="t-h2 text-center mb-8 text-white">3 template</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "ATS", desc: "1 cột plain, ATS-optimized cho Tech + Banks + Corp", color: "#1f2937" },
              { name: "Visual", desc: "Header gradient + bullet rõ - cho Marketing + Creative", color: "#1d4ed8" },
              { name: "Hybrid", desc: "Balanced - default cho 80% case", color: "#0f172a" },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-base)", border: "1px solid var(--st-10)" }}>
                <div className="aspect-[3/4] flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${t.color}22, ${t.color}05)` }}>
                  <div className="text-[2.5rem] font-bold" style={{ color: t.color }}>{t.name}</div>
                </div>
                <div className="p-5">
                  <h3 className="text-[1.05rem] font-bold text-white mb-1">Template {t.name}</h3>
                  <p className="text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mb-14 rounded-2xl p-8 md:p-10" style={{ background: "var(--grad-primary-soft)", border: "1px solid var(--st-12)" }}>
          <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold mb-3 text-white">Sẵn sàng tạo CV?</h2>
          <p className="text-[0.95rem] max-w-[560px] mx-auto mb-5" style={{ color: "var(--ink-soft)" }}>
            Đăng nhập 1 lần - dùng được ngay. Không thẻ visa, không subscription.
          </p>
          <Link href="/tools/cv-builder/build" className="btn btn-primary">
            Bắt đầu tạo CV
          </Link>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="t-h2 text-center mb-7 text-white">FAQ</h2>
          <div className="space-y-2.5 max-w-[800px] mx-auto">
            {FAQ.map((f) => (
              <details key={f.q} className="rounded-xl p-5 group" style={{ background: "var(--st-03)", border: "1px solid var(--st-08)" }}>
                <summary className="font-semibold text-white cursor-pointer text-[1rem] list-none flex justify-between items-center gap-3">
                  <span>{f.q}</span>
                  <span className="text-[0.85rem] opacity-50 group-open:rotate-180 transition" aria-hidden>v</span>
                </summary>
                <p className="text-[0.92rem] leading-[1.7] mt-3" style={{ color: "var(--ink-soft)" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
