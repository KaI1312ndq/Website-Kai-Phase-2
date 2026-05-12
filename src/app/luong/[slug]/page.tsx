import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import {
  getAllSalaryRoles,
  getSalaryRole,
  getRelatedRoles,
  LEVEL_LABELS,
  CATEGORY_LABELS,
  type SalaryLevel,
} from "@/lib/salary-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nguyenducquang.website";

export function generateStaticParams() {
  return getAllSalaryRoles().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const role = getSalaryRole(slug);
  if (!role) return { title: "Không tìm thấy" };

  const ranges = Object.values(role.ranges).flat();
  const minSal = Math.min(...ranges);
  const maxSal = Math.max(...ranges);

  const title = `Lương ${role.name} tại Việt Nam 2026 - Cập nhật mới nhất`;
  const description = `Lương ${role.shortName} VN 2026: ${minSal}-${maxSal}tr/tháng theo level. ${role.description.slice(0, 100)}...`;

  return {
    title,
    description,
    keywords: role.keywords,
    alternates: { canonical: `/luong/${role.slug}` },
    openGraph: {
      type: "article",
      locale: "vi_VN",
      title,
      description,
      url: `${SITE_URL}/luong/${role.slug}`,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function SalaryRolePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = getSalaryRole(slug);
  if (!role) notFound();

  const related = getRelatedRoles(slug);
  const ranges = Object.values(role.ranges).flat();
  const minSal = Math.min(...ranges);
  const maxSal = Math.max(...ranges);
  const levels = Object.keys(role.ranges) as SalaryLevel[];

  // Schema.org structured data
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Lương ${role.name} tại Việt Nam 2026`,
    description: role.description,
    inLanguage: "vi-VN",
    author: { "@type": "Person", name: "Nguyễn Đức Quảng", url: SITE_URL },
    publisher: { "@type": "Person", name: "Nguyễn Đức Quảng" },
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().slice(0, 10),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: role.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Lương ngành", item: `${SITE_URL}/luong` },
      { "@type": "ListItem", position: 3, name: role.name, item: `${SITE_URL}/luong/${role.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <Navbar />
      <GradientBlobs blobs={[
        { variant: "blue", size: 520, top: "-20%", right: "-5%" },
        { variant: "purple", size: 380, bottom: "30%", left: "-8%", delay: "2s" },
      ]} />

      <main className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-28 pb-16 md:pt-32 md:pb-24">
        {/* Breadcrumb */}
        <nav className="text-[0.78rem] mb-5" style={{ color: "var(--ink-mute)" }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2 opacity-50">/</span>
          <Link href="/luong" className="hover:underline">Lương ngành</Link>
          <span className="mx-2 opacity-50">/</span>
          <span style={{ color: "var(--ink-soft)" }}>{role.shortName}</span>
        </nav>

        {/* Hero */}
        <header className="mb-10">
          <div className="section-tag mb-3">Lương · Việt Nam 2026 · {CATEGORY_LABELS[role.category]}</div>
          <h1 className="t-h1 mb-4 max-w-[860px] text-white">
            Lương {role.name} <span className="grad-text">tại Việt Nam 2026</span>
          </h1>
          <p className="t-body-lg max-w-[760px] mb-5" style={{ color: "var(--ink-soft)" }}>
            {role.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 rounded-lg" style={{ background: "var(--st-04)", border: "1px solid var(--st-10)" }}>
              <div className="text-[0.7rem] font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--ink-mute)" }}>Range tổng</div>
              <div className="text-[1.05rem] font-bold text-white">{minSal}-{maxSal}tr/tháng</div>
            </div>
            <div className="px-4 py-2 rounded-lg" style={{ background: "var(--st-04)", border: "1px solid var(--st-10)" }}>
              <div className="text-[0.7rem] font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--ink-mute)" }}>Trending</div>
              <div className="text-[1.05rem] font-bold text-white">
                {role.trending === "up" ? "Đang tăng" : role.trending === "down" ? "Đang giảm" : "Ổn định"}
              </div>
            </div>
            <div className="px-4 py-2 rounded-lg" style={{ background: "var(--st-04)", border: "1px solid var(--st-10)" }}>
              <div className="text-[0.7rem] font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--ink-mute)" }}>Top company</div>
              <div className="text-[1.05rem] font-bold text-white">{role.topCompanies[0]?.name}</div>
            </div>
          </div>
        </header>

        {/* Intro long-form */}
        <section className="mb-12 rounded-2xl p-6 md:p-8" style={{ background: "var(--st-03)", border: "1px solid var(--st-08)" }}>
          <p className="text-[1.02rem] leading-[1.7]" style={{ color: "var(--ink-soft)" }}>
            {role.longDescription}
          </p>
        </section>

        {/* Salary range table */}
        <section className="mb-12">
          <h2 className="t-h3 mb-5 text-white">Lương theo level</h2>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--st-10)" }}>
            <table className="w-full text-[0.95rem]">
              <thead style={{ background: "var(--st-06)" }}>
                <tr>
                  <th className="text-left px-5 py-3.5 font-semibold uppercase text-[0.74rem] tracking-wider" style={{ color: "var(--ink-mute)" }}>Level</th>
                  <th className="text-left px-5 py-3.5 font-semibold uppercase text-[0.74rem] tracking-wider" style={{ color: "var(--ink-mute)" }}>Range (triệu VNĐ/tháng)</th>
                  <th className="text-right px-5 py-3.5 font-semibold uppercase text-[0.74rem] tracking-wider" style={{ color: "var(--ink-mute)" }}>Distribution</th>
                </tr>
              </thead>
              <tbody>
                {levels.map((lv) => {
                  const r = role.ranges[lv]!;
                  const widthPct = ((r[1] - 0) / maxSal) * 100;
                  return (
                    <tr key={lv} className="border-t" style={{ borderColor: "var(--st-08)" }}>
                      <td className="px-5 py-4 text-white font-medium">{LEVEL_LABELS[lv]}</td>
                      <td className="px-5 py-4 text-white">
                        <span className="font-bold text-[1.05rem]">{r[0]}-{r[1]}tr</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="ml-auto h-2 rounded-full overflow-hidden max-w-[180px]" style={{ background: "var(--st-06)" }}>
                          <div className="h-full" style={{ width: `${widthPct}%`, background: "var(--grad-primary)" }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-[0.8rem] mt-3" style={{ color: "var(--ink-faint)" }}>
            * Số liệu reference từ VietnamWorks, JobsGO, LinkedIn + survey alumni. Mức thực tế có thể chênh ±20% tuỳ skill + brand.
          </p>
        </section>

        {/* Top companies */}
        <section className="mb-12">
          <h2 className="t-h3 mb-5 text-white">Top công ty tuyển dụng</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {role.topCompanies.map((c) => (
              <div key={c.name} className="rounded-xl p-4" style={{ background: "var(--st-03)", border: "1px solid var(--st-08)" }}>
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <div className="text-[1rem] font-bold text-white">{c.name}</div>
                  <div className="text-[0.85rem] font-bold whitespace-nowrap" style={{ color: "#5fffaa" }}>{c.salary}</div>
                </div>
                {c.note && <div className="text-[0.8rem]" style={{ color: "var(--ink-mute)" }}>{c.note}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="t-h3 mb-5 text-white">Kỹ năng cần có</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {role.skills.map((s) => (
              <div key={s.name} className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg" style={{ background: "var(--st-03)", border: "1px solid var(--st-08)" }}>
                <span className="text-[0.92rem] font-medium text-white">{s.name}</span>
                <span className="text-[0.7rem] font-bold px-2 py-1 rounded uppercase tracking-wider whitespace-nowrap" style={{
                  background: s.importance === "must" ? "rgba(255,90,114,0.15)" : "rgba(122,169,255,0.15)",
                  color: s.importance === "must" ? "#ff5a72" : "#7da9ff",
                }}>
                  {s.importance === "must" ? "Must-have" : "Nice-to-have"}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Responsibilities */}
        <section className="mb-12">
          <h2 className="t-h3 mb-5 text-white">Trách nhiệm chính</h2>
          <div className="rounded-2xl p-6" style={{ background: "var(--st-03)", border: "1px solid var(--st-08)" }}>
            <ul className="space-y-3">
              {role.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[0.72rem] font-bold mt-0.5" style={{ background: "var(--grad-primary)", color: "white" }}>
                    {i + 1}
                  </span>
                  <span className="text-[0.95rem]" style={{ color: "var(--ink-soft)" }}>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Career path */}
        <section className="mb-12">
          <h2 className="t-h3 mb-5 text-white">Career path tham khảo</h2>
          <div className="space-y-2.5">
            {role.careerPath.map((p, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl p-4" style={{ background: "var(--st-03)", border: "1px solid var(--st-08)" }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-[1rem] font-bold" style={{ background: "var(--grad-primary)", color: "white" }}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[1rem] font-bold text-white">{p.stage}</div>
                  <div className="text-[0.8rem]" style={{ color: "var(--ink-mute)" }}>{p.years}</div>
                </div>
                <div className="text-[1rem] font-bold whitespace-nowrap" style={{ color: "#5fffaa" }}>{p.salary}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="t-h3 mb-5 text-white">Câu hỏi thường gặp</h2>
          <div className="space-y-2.5">
            {role.faq.map((f, i) => (
              <details key={i} className="rounded-xl p-5 group" style={{ background: "var(--st-03)", border: "1px solid var(--st-08)" }}>
                <summary className="font-semibold text-white cursor-pointer text-[1rem] list-none flex justify-between items-center gap-3">
                  <span>{f.q}</span>
                  <span className="text-[0.85rem] opacity-50 group-open:rotate-180 transition" aria-hidden>v</span>
                </summary>
                <p className="text-[0.92rem] leading-[1.7] mt-3" style={{ color: "var(--ink-soft)" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12 rounded-2xl p-7 md:p-9" style={{ background: "var(--grad-primary-soft)", border: "1px solid var(--st-12)" }}>
          <h2 className="text-[1.4rem] md:text-[1.6rem] font-bold mb-3 text-white">Chưa chắc {role.shortName} có phù hợp?</h2>
          <p className="text-[1rem] mb-5 max-w-[640px]" style={{ color: "var(--ink-soft)" }}>
            Làm test hướng nghiệp Marketing & Ecom (12 câu, ~5 phút) để biết role nào match tính cách + skills của bạn.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/quiz/huong-nghiep-marketing" className="btn btn-primary">
              Test hướng nghiệp miễn phí
            </Link>
            <Link href="/ecom-foundation" className="btn btn-ghost">
              Xem Khoá Foundation Ecommerce
            </Link>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section>
            <h2 className="t-h3 mb-5 text-white">Role liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/luong/${r.slug}`} className="block rounded-xl p-5 hover:bg-white/[0.04] transition" style={{ background: "var(--st-03)", border: "1px solid var(--st-08)" }}>
                  <div className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] mb-1.5" style={{ color: "#7da9ff" }}>
                    {CATEGORY_LABELS[r.category]}
                  </div>
                  <div className="text-[1.05rem] font-bold text-white mb-1">{r.name}</div>
                  <div className="text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>{r.description.slice(0, 80)}...</div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
