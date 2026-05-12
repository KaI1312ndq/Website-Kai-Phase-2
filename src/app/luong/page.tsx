import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import { getAllSalaryRoles, CATEGORY_LABELS, type SalaryCategory } from "@/lib/salary-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nguyenducquang.website";

export const metadata: Metadata = {
  title: "Lương ngành Marketing & Ecommerce Việt Nam 2026 - Cập nhật mới nhất",
  description: "Salary benchmark đầy đủ cho 20+ role Marketing, Ecommerce, Performance, Content, Data Việt Nam 2026. Range theo level + top companies tuyển dụng.",
  keywords: ["lương marketing việt nam", "lương ecom việt nam", "salary benchmark 2026", "lương digital marketing"],
  alternates: { canonical: "/luong" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "Lương ngành Marketing & Ecommerce VN 2026",
    description: "Salary benchmark 20+ role Marketing, Ecom, Performance VN 2026.",
    url: `${SITE_URL}/luong`,
  },
};

export default function SalaryIndexPage() {
  const roles = getAllSalaryRoles();

  // Group by category
  const categories: SalaryCategory[] = ["performance", "ecommerce", "marketing", "content", "data", "product", "sales", "leadership"];
  const grouped = categories
    .map((cat) => ({
      cat,
      label: CATEGORY_LABELS[cat],
      roles: roles.filter((r) => r.category === cat),
    }))
    .filter((g) => g.roles.length > 0);

  return (
    <>
      <Navbar />
      <GradientBlobs blobs={[
        { variant: "blue", size: 540, top: "-20%", right: "-5%" },
        { variant: "purple", size: 400, top: "30%", left: "-8%", delay: "2s" },
        { variant: "blue", size: 360, bottom: "-30%", right: "10%", delay: "4s" },
      ]} />

      <main className="relative max-w-[1200px] mx-auto px-6 md:px-10 pt-28 pb-16 md:pt-32 md:pb-24">
        {/* Hero */}
        <header className="mb-14">
          <div className="section-tag mb-3">Salary Benchmark · 2026</div>
          <h1 className="t-display mb-5 max-w-[900px] text-white">
            Lương ngành <span className="grad-text">Marketing & Ecommerce VN</span>
          </h1>
          <p className="t-body-lg max-w-[760px]" style={{ color: "var(--ink-soft)" }}>
            Số liệu cập nhật 2026 cho {roles.length} role hot nhất - từ Performance Marketer, TikTok Specialist, đến Marketing Director.
            Range salary theo level + top company tuyển dụng + skills cần.
          </p>
        </header>

        {/* Category groups */}
        <div className="space-y-12">
          {grouped.map((g) => (
            <section key={g.cat}>
              <h2 className="t-h3 mb-5 text-white">{g.label} <span className="text-[0.85rem] font-medium" style={{ color: "var(--ink-mute)" }}>({g.roles.length} role)</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {g.roles.map((r) => {
                  const ranges = Object.values(r.ranges).flat();
                  const minSal = Math.min(...ranges);
                  const maxSal = Math.max(...ranges);
                  return (
                    <Link
                      key={r.slug}
                      href={`/luong/${r.slug}`}
                      className="rounded-xl p-5 transition hover:scale-[1.01] block"
                      style={{ background: "var(--st-03)", border: "1px solid var(--st-08)" }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="text-[1.05rem] font-bold text-white">{r.name}</div>
                        {r.trending === "up" && (
                          <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded uppercase tracking-wider whitespace-nowrap" style={{ background: "rgba(95,255,170,0.15)", color: "#5fffaa" }}>
                            Hot
                          </span>
                        )}
                      </div>
                      <div className="text-[0.85rem] mb-3 line-clamp-2" style={{ color: "var(--ink-mute)" }}>{r.description}</div>
                      <div className="flex items-center justify-between gap-3 pt-3 border-t" style={{ borderColor: "var(--st-06)" }}>
                        <div>
                          <div className="text-[0.65rem] font-semibold uppercase tracking-wider mb-0.5" style={{ color: "var(--ink-faint)" }}>Range</div>
                          <div className="text-[0.95rem] font-bold" style={{ color: "#5fffaa" }}>{minSal}-{maxSal}tr</div>
                        </div>
                        <div className="text-[0.78rem] font-semibold" style={{ color: "#7da9ff" }}>
                          Xem chi tiết →
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <section className="mt-16 rounded-2xl p-7 md:p-10 text-center" style={{ background: "var(--grad-primary-soft)", border: "1px solid var(--st-12)" }}>
          <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold mb-3 text-white">Không biết role nào hợp với mình?</h2>
          <p className="text-[1rem] max-w-[640px] mx-auto mb-6" style={{ color: "var(--ink-soft)" }}>
            Làm test hướng nghiệp Marketing & Ecom (12 câu, ~5 phút) để xem 5 archetype career nào match tính cách + skills của bạn.
          </p>
          <Link href="/quiz/huong-nghiep-marketing" className="btn btn-primary">
            Test hướng nghiệp miễn phí
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
