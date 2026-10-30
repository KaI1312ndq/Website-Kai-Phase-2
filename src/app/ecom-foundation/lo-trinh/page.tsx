import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { COURSE, MODULES, SESSIONS } from "@/lib/course-data";
import {
  PHASES,
  ONBOARDING_TASKS,
  SESSION_PLANS,
  SESSION_RHYTHM,
  CHECKPOINTS,
  SKILL_LEVELS,
  SKILL_MATRIX,
  GRADING,
  GRADUATION,
  GRADUATION_RULES,
  CAPSTONE_RUBRIC,
  MENTORING_MONTHS,
} from "@/lib/training-roadmap";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nguyenducquang.website";

export const metadata: Metadata = {
  title: "Lộ trình đào tạo Ecom Foundation - 12 buổi + 3 tháng mentoring",
  description:
    "Lộ trình đào tạo chi tiết khoá Foundation Ecommerce: onboarding, 12 buổi với mục tiêu + bài tập từng buổi, 3 checkpoint, skill matrix S0-S4, cách chấm điểm tốt nghiệp và 3 tháng mentoring.",
  alternates: { canonical: "/ecom-foundation/lo-trinh" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "Lộ trình đào tạo Ecom Foundation",
    description: "12 buổi · 3 checkpoint · Capstone Plan 1 năm + P&L · 3 tháng mentoring.",
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Ecom Foundation", item: `${SITE_URL}/ecom-foundation` },
    { "@type": "ListItem", position: 3, name: "Lộ trình đào tạo", item: `${SITE_URL}/ecom-foundation/lo-trinh` },
  ],
};

const Check = ({ color = "#5fffaa" }: { color?: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-1">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] mb-1.5" style={{ color: "var(--st-45)" }}>{children}</div>
);

export default function TrainingRoadmapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Navbar />
      <main>
        <Hero />
        <PhaseTimeline />
        <Onboarding />
        <Rhythm />
        <SessionDetails />
        <Checkpoints />
        <SkillMatrix />
        <Grading />
        <Mentoring />
        <BottomCta />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  const stats = [
    { val: "5", label: "Giai đoạn" },
    { val: String(COURSE.format.sessions), label: "Buổi offline" },
    { val: String(CHECKPOINTS.length), label: "Checkpoint" },
    { val: "3", label: "Tháng mentoring" },
  ];
  return (
    <section className="relative overflow-hidden">
      <div className="grid-pattern" />
      <div className="blob blob-blue blob-anim" style={{ width: 600, height: 600, top: "-20%", left: "-10%" }} />
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-36 pb-20">
        <Reveal instant>
          <nav className="text-[0.78rem] mb-6" style={{ color: "var(--st-45)" }}>
            <Link href="/ecom-foundation" className="hover:text-white">Ecom Foundation</Link>
            <span className="mx-2">/</span>
            <span style={{ color: "var(--st-72)" }}>Lộ trình đào tạo</span>
          </nav>
          <div className="section-tag">Training roadmap</div>
          <h1 className="t-h1 mb-5 text-white max-w-[820px]">
            Lộ trình đào tạo <span className="grad-text">Ecom Foundation.</span>
          </h1>
          <p className="t-body-lg max-w-[640px] mb-10" style={{ color: "var(--st-72)" }}>
            Từ ngày onboarding đến hết 3 tháng mentoring: mỗi buổi học có mục tiêu đo được, bài tập cụ thể và đầu ra cộng dồn thành 1 Plan 1 năm + P&L cho brand thật.
          </p>
        </Reveal>
        <Reveal instant>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-[820px]">
            {stats.map((s) => (
              <div key={s.label} className="glass p-5">
                <div className="text-[2rem] font-bold text-white leading-none mb-1.5">{s.val}</div>
                <div className="text-[0.8rem]" style={{ color: "var(--st-55)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PhaseTimeline() {
  return (
    <section className="relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
        <Reveal><div className="section-tag">5 giai đoạn</div></Reveal>
        <Reveal delay={0.08}>
          <h2 className="t-h2 mb-10 text-white">Bức tranh <span className="grad-text">toàn khoá.</span></h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {PHASES.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.06}>
              <div className="glass p-5 h-full flex flex-col" style={{ borderTop: `3px solid ${p.color}` }}>
                <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] mb-1" style={{ color: p.color }}>{p.key} · {p.name}</div>
                <div className="text-[0.78rem] mb-4" style={{ color: "var(--st-45)" }}>{p.time}</div>
                <p className="text-[0.9rem] mb-4 flex-1" style={{ color: "var(--st-78)" }}>{p.goal}</p>
                <div className="rounded-lg px-3 py-2 text-[0.78rem]" style={{ background: `${p.color}12`, border: `1px solid ${p.color}30`, color: "var(--st-78)" }}>
                  <span className="font-semibold" style={{ color: p.color }}>Đầu ra: </span>{p.output}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Onboarding() {
  return (
    <section className="relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <Reveal><div className="section-tag">P0 · Onboarding</div></Reveal>
        <Reveal delay={0.08}>
          <h2 className="t-h2 mb-3 text-white">7 ngày <span className="grad-text">trước khai giảng.</span></h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="t-caption mb-8 max-w-[560px]">Vào lớp với baseline rõ ràng để cuối khoá đo được mình tiến bộ bao nhiêu.</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {ONBOARDING_TASKS.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.05}>
              <div className="glass p-5 h-full">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[0.75rem] font-bold text-white mb-3" style={{ background: "rgba(74,214,255,0.2)", border: "1px solid rgba(74,214,255,0.4)" }}>{i + 1}</div>
                <div className="text-[0.95rem] font-semibold text-white mb-1.5">{t.title}</div>
                <p className="text-[0.84rem]" style={{ color: "var(--st-65)" }}>{t.desc}</p>
                {t.href && (
                  <Link href={t.href} className="inline-block mt-3 text-[0.8rem] font-semibold" style={{ color: "#7da9ff" }}>Làm ngay -&gt;</Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Rhythm() {
  return (
    <section className="relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <Reveal><div className="section-tag">Nhịp mỗi buổi</div></Reveal>
        <Reveal delay={0.08}>
          <h2 className="t-h2 mb-10 text-white">Trước - Trong - <span className="grad-text">Sau buổi.</span></h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SESSION_RHYTHM.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.06}>
              <div className="glass p-6 h-full">
                <div className="flex items-baseline justify-between mb-4">
                  <div className="text-[1.05rem] font-bold text-white">{r.label}</div>
                  <div className="text-[0.78rem]" style={{ color: "var(--st-45)" }}>{r.time}</div>
                </div>
                <ul className="space-y-2">
                  {r.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-[0.88rem]" style={{ color: "var(--st-72)" }}><Check />{it}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SessionDetails() {
  const phases = PHASES.filter((p) => p.sessions);
  return (
    <section id="chi-tiet" className="relative overflow-hidden">
      <div className="blob blob-purple blob-anim" style={{ width: 500, height: 500, top: "20%", right: "-15%" }} />
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-20">
        <Reveal><div className="section-tag">Chi tiết 12 buổi</div></Reveal>
        <Reveal delay={0.08}>
          <h2 className="t-h2 mb-3 text-white">Mục tiêu, bài tập <span className="grad-text">từng buổi.</span></h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="t-caption mb-10 max-w-[600px]">Tất cả bài tập làm trên brand đồng hành bạn chọn ở P0. Hết buổi 12, các bài tập ghép lại thành capstone hoàn chỉnh.</p>
        </Reveal>

        <div className="space-y-12">
          {phases.map((p) => (
            <div key={p.key}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                <h3 className="text-[1.1rem] font-bold text-white">{p.key} · {p.name}</h3>
                <span className="text-[0.8rem]" style={{ color: "var(--st-45)" }}>{p.time}</span>
              </div>
              <div className="space-y-3">
                {SESSION_PLANS.filter((s) => s.phase === p.key).map((plan) => {
                  const s = SESSIONS.find((x) => x.no === plan.no)!;
                  const mod = MODULES[s.module];
                  return (
                    <details key={plan.no} className="group rounded-xl overflow-hidden" style={{ background: "var(--st-03)", border: "1px solid var(--st-08)" }} open={plan.no === 1}>
                      <summary className="cursor-pointer list-none p-4 md:p-5 flex items-center gap-4">
                        <span className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-[0.9rem]" style={{ background: `${mod.color}20`, border: `1px solid ${mod.color}45` }}>{plan.no}</span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-0.5" style={{ color: mod.color }}>{mod.name} · {s.week}</span>
                          <span className="block text-[0.95rem] font-semibold text-white">{s.title}</span>
                        </span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7da9ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 transition-transform group-open:rotate-180">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </summary>
                      <div className="px-4 md:px-5 pb-5 grid grid-cols-1 lg:grid-cols-2 gap-5 md:pl-[76px]">
                        <div>
                          <Label>Mục tiêu sau buổi</Label>
                          <p className="text-[0.92rem] text-white font-medium mb-4">{plan.objective}</p>
                          <Label>Pre-read</Label>
                          <ul className="space-y-1.5 mb-4">
                            {plan.preRead.map((r) => (
                              <li key={r.href}>
                                <Link href={r.href} className="text-[0.86rem] hover:underline" style={{ color: "#9bb6ff" }}>{r.label}</Link>
                              </li>
                            ))}
                          </ul>
                          {plan.tool && (
                            <>
                              <Label>Công cụ</Label>
                              <Link href={plan.tool.href} className="inline-block text-[0.86rem] font-semibold px-3 py-1.5 rounded-md" style={{ background: "rgba(20,110,245,0.12)", border: "1px solid rgba(20,110,245,0.3)", color: "#9bb6ff" }}>
                                {plan.tool.label} -&gt;
                              </Link>
                            </>
                          )}
                        </div>
                        <div>
                          <Label>Workshop trên lớp</Label>
                          <p className="text-[0.88rem] mb-4" style={{ color: "var(--st-72)" }}>{plan.workshop}</p>
                          <Label>Bài tập (nộp trong 48h)</Label>
                          <div className="rounded-lg p-3 text-[0.88rem]" style={{ background: `${mod.color}10`, border: `1px solid ${mod.color}30`, color: "var(--st-85)" }}>
                            {plan.homework}
                          </div>
                        </div>
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Checkpoints() {
  return (
    <section className="relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
        <Reveal><div className="section-tag">Checkpoint</div></Reveal>
        <Reveal delay={0.08}>
          <h2 className="t-h2 mb-10 text-white">3 cột mốc <span className="grad-text">bắt buộc.</span></h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CHECKPOINTS.map((c, i) => (
            <Reveal key={c.no} delay={i * 0.06}>
              <div className="glass p-6 h-full flex flex-col">
                <div className="text-[0.72rem] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "#ffd479" }}>Checkpoint {c.no} · {c.when}</div>
                <div className="text-[1.2rem] font-bold text-white mb-2">{c.name}</div>
                <p className="text-[0.88rem] mb-4 flex-1" style={{ color: "var(--st-65)" }}>{c.desc}</p>
                <div className="flex gap-2 text-[0.82rem]" style={{ color: "var(--st-78)" }}><Check />Đạt khi: {c.pass}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillMatrix() {
  return (
    <section className="relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
        <Reveal><div className="section-tag">Skill matrix</div></Reveal>
        <Reveal delay={0.08}>
          <h2 className="t-h2 mb-3 text-white">6 năng lực · <span className="grad-text">thang S0-S4.</span></h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="t-caption mb-8 max-w-[620px]">Tự chấm ở P0, chấm lại cuối buổi 12 và cuối tháng mentoring thứ 3. Mục tiêu: S2 khi tốt nghiệp, S3 sau mentoring.</p>
        </Reveal>

        <div className="flex flex-wrap gap-2 mb-6">
          {SKILL_LEVELS.map((l) => (
            <div key={l.key} className="px-3 py-1.5 rounded-md text-[0.78rem]" style={{ background: "var(--st-03)", border: "1px solid var(--st-08)", color: "var(--st-65)" }}>
              <strong className="text-white">{l.key}</strong> {l.name} - {l.desc}
            </div>
          ))}
        </div>

        <div className="glass overflow-x-auto">
          <table className="w-full text-[0.86rem] min-w-[720px]">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--st-08)" }}>
                <th className="text-left p-4 font-semibold text-white">Năng lực</th>
                {SKILL_LEVELS.map((l) => (
                  <th key={l.key} className="p-4 font-semibold text-center" style={{ color: "var(--st-55)" }}>{l.key}</th>
                ))}
                <th className="text-left p-4 font-semibold text-white">Thế nào là S2</th>
              </tr>
            </thead>
            <tbody>
              {SKILL_MATRIX.map((row) => (
                <tr key={row.skill} style={{ borderBottom: "1px solid var(--st-05)" }}>
                  <td className="p-4 font-semibold text-white whitespace-nowrap">{row.skill}</td>
                  {SKILL_LEVELS.map((l, idx) => {
                    const isTarget = idx === row.target;
                    const isMentor = idx === row.mentor;
                    const filled = idx <= row.mentor;
                    return (
                      <td key={l.key} className="p-4 text-center">
                        <span
                          className="inline-block w-4 h-4 rounded-full"
                          title={isTarget ? "Mục tiêu tốt nghiệp" : isMentor ? "Mục tiêu sau mentoring" : undefined}
                          style={{
                            background: isTarget ? "#7da9ff" : isMentor ? "#5fffaa" : filled ? "rgba(125,169,255,0.35)" : "transparent",
                            border: `1px solid ${filled ? "transparent" : "var(--st-15)"}`,
                          }}
                        />
                      </td>
                    );
                  })}
                  <td className="p-4" style={{ color: "var(--st-65)" }}>{row.s2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-5 mt-4 text-[0.78rem]" style={{ color: "var(--st-55)" }}>
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: "#7da9ff" }} />Mục tiêu tốt nghiệp</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: "#5fffaa" }} />Mục tiêu sau mentoring</span>
        </div>
      </div>
    </section>
  );
}

function Grading() {
  return (
    <section className="relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
        <Reveal><div className="section-tag">Đánh giá</div></Reveal>
        <Reveal delay={0.08}>
          <h2 className="t-h2 mb-10 text-white">Chấm điểm & <span className="grad-text">tốt nghiệp.</span></h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Reveal>
            <div className="glass p-6 h-full">
              <div className="text-[1rem] font-bold text-white mb-4">Cơ cấu điểm (100)</div>
              <div className="flex h-3 rounded-full overflow-hidden mb-5">
                {GRADING.map((g) => (
                  <div key={g.label} style={{ width: `${g.weight}%`, background: g.color }} />
                ))}
              </div>
              <ul className="space-y-2.5 mb-6">
                {GRADING.map((g) => (
                  <li key={g.label} className="flex items-center justify-between text-[0.88rem]">
                    <span className="flex items-center gap-2.5" style={{ color: "var(--st-72)" }}>
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ background: g.color }} />{g.label}
                    </span>
                    <span className="font-bold text-white">{g.weight}%</span>
                  </li>
                ))}
              </ul>
              <Label>Điều kiện tốt nghiệp</Label>
              <ul className="space-y-1.5">
                {GRADUATION_RULES.map((r) => (
                  <li key={r} className="flex gap-2.5 text-[0.86rem]" style={{ color: "var(--st-72)" }}><Check />{r}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass p-6 h-full">
              <div className="text-[1rem] font-bold text-white mb-4">Rubric Capstone (10 điểm)</div>
              <ul className="space-y-2 mb-6">
                {CAPSTONE_RUBRIC.map((c) => (
                  <li key={c.criteria} className="flex items-center justify-between text-[0.88rem] py-1.5" style={{ borderBottom: "1px solid var(--st-08)" }}>
                    <span style={{ color: "var(--st-72)" }}>{c.criteria}</span>
                    <span className="font-bold text-white">{c.points}đ</span>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {GRADUATION.map((g) => (
                  <div key={g.tier} className="rounded-lg p-3" style={{ background: `${g.color}10`, border: `1px solid ${g.color}35` }}>
                    <div className="text-[0.85rem] font-bold" style={{ color: g.color }}>{g.tier}</div>
                    <div className="text-[0.75rem] mb-1.5 text-white">{g.rule}</div>
                    <div className="text-[0.75rem]" style={{ color: "var(--st-65)" }}>{g.perk}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Mentoring() {
  return (
    <section className="relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
        <Reveal><div className="section-tag">P4 · Mentoring</div></Reveal>
        <Reveal delay={0.08}>
          <h2 className="t-h2 mb-10 text-white">3 tháng <span className="grad-text">sau khoá.</span></h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MENTORING_MONTHS.map((m, i) => (
            <Reveal key={m.month} delay={i * 0.06}>
              <div className="glass p-6 h-full flex flex-col">
                <div className="text-[0.72rem] font-bold uppercase tracking-[0.14em] mb-1" style={{ color: "#5fffaa" }}>{m.month}</div>
                <div className="text-[1.15rem] font-bold text-white mb-4">{m.name}</div>
                <ul className="space-y-2 mb-5 flex-1">
                  {m.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-[0.86rem]" style={{ color: "var(--st-72)" }}><Check />{it}</li>
                  ))}
                </ul>
                <div className="rounded-lg px-3 py-2 text-[0.8rem]" style={{ background: "rgba(95,255,170,0.08)", border: "1px solid rgba(95,255,170,0.25)", color: "var(--st-78)" }}>
                  <span className="font-semibold" style={{ color: "#5fffaa" }}>KPI: </span>{m.kpi}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BottomCta() {
  return (
    <section className="relative border-t" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-[900px] mx-auto px-6 md:px-10 py-24 text-center">
        <Reveal>
          <h2 className="t-h2 mb-4 text-white">Sẵn sàng vào <span className="grad-text">{COURSE.cohort.label}?</span></h2>
          <p className="t-caption mb-8 max-w-[520px] mx-auto">Lớp tối đa {COURSE.cohort.capacity} người. Quick meet 15 phút trước khi chốt để chắc chắn lộ trình này hợp với bạn.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/ecom-foundation#apply" className="btn btn-primary">Apply {COURSE.cohort.label}</Link>
            <Link href="/ecom-foundation" className="btn btn-ghost">Về trang khoá học</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
