"use client";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal, { RevealText } from "@/components/Reveal";
import CohortStatus from "@/components/CohortStatus";
import ApplyForm from "@/components/ApplyForm";
import BrandsCarousel from "@/components/BrandsCarousel";
import { COURSE, MODULES, SESSIONS, FIT_FOR, NOT_FIT_FOR, OUTCOMES, AFTER_COURSE, FAQS, type Module } from "@/lib/course-data";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

/* ─── ICONS ─── */
const Ic = ({ d, w = 22, color = "#7da9ff" }: { d: React.ReactNode; w?: number; color?: string }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const IconCheck = ({ color = "#5fffaa" }: { color?: string }) => <Ic d={<polyline points="20 6 9 17 4 12" />} w={16} color={color} />;
const IconX = ({ color = "#ff5a72" }: { color?: string }) => <Ic d={<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>} w={16} color={color} />;
const IconBook = () => <Ic d={<><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></>} />;
const IconQuiz = () => <Ic d={<><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></>} />;
const IconChart = () => <Ic d={<><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>} />;
const IconMentor = () => <Ic d={<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></>} />;
const IconSlide = () => <Ic d={<><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></>} />;
const IconChat = () => <Ic d={<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />} />;
const IconNetwork = () => <Ic d={<><circle cx="12" cy="5" r="3" /><circle cx="5" cy="19" r="3" /><circle cx="19" cy="19" r="3" /><line x1="12" y1="8" x2="5" y2="16" /><line x1="12" y1="8" x2="19" y2="16" /></>} />;
const IconChevron = () => <Ic d={<polyline points="6 9 12 15 18 9" />} w={18} />;
const IconClock = () => <Ic d={<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>} w={16} />;
const IconLocation = () => <Ic d={<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>} w={16} />;
const IconUsers = () => <Ic d={<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></>} w={16} />;
const IconCalendar = () => <Ic d={<><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>} w={16} />;

/* Module-specific icons for curriculum cards */
const ModuleIcon = ({ mod, color }: { mod: string; color: string }) => {
  const props = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (mod) {
    case "M1": // Tư duy thị trường — lightbulb
      return <svg {...props}><path d="M9 18h6M10 22h4" /><path d="M2 9a10 10 0 0120 0c0 4-3 6-3 9H5c0-3-3-5-3-9z" /></svg>;
    case "M2": // Chiến lược SP — target
      return <svg {...props}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill={color} stroke="none" /></svg>;
    case "M3": // Vận hành sàn — store
      return <svg {...props}><path d="M3 9l1.5-5h15L21 9" /><path d="M5 9v11a1 1 0 001 1h12a1 1 0 001-1V9" /><path d="M9 21v-6h6v6" /></svg>;
    case "M4": // Performance — rocket / trending
      return <svg {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>;
    case "M5": // Data & Plan — bar chart
      return <svg {...props}><line x1="3" y1="20" x2="21" y2="20" /><rect x="5" y="10" width="3" height="10" /><rect x="10.5" y="6" width="3" height="14" /><rect x="16" y="13" width="3" height="7" /></svg>;
    case "Final": // Capstone — trophy
      return <svg {...props}><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v5a5 5 0 01-10 0V4z" /><path d="M17 6h3a2 2 0 01-2 4h-1" /><path d="M7 6H4a2 2 0 002 4h1" /></svg>;
    default:
      return <svg {...props}><circle cx="12" cy="12" r="9" /></svg>;
  }
};

/* ─── PAGE ─── */
export default function CoursePage() {
  return (
    <>
      <Navbar />
      <main>
        <CourseHero />
        <FitForSection />
        <OutcomesSection />
        <CurriculumSection />
        <ToolCallout />
        <FormatSection />
        <AfterCourseSection />
        <TrainerSection />
        <BrandsCarousel />
        <PricingSection />
        <ApplyFlowSection />
        <FAQSection />
        <ApplySection />
      </main>
      <Footer />
    </>
  );
}

/* ─── HERO ─── */
function CourseHero() {
  return (
    <section className="relative overflow-hidden flex items-center" style={{ minHeight: "100vh" }}>
      <div className="grid-pattern" />
      <div className="blob blob-blue blob-anim" style={{ width: 700, height: 700, top: "-15%", left: "-10%" }} />
      <div className="blob blob-purple blob-anim" style={{ width: 600, height: 600, bottom: "-20%", right: "-10%", animationDelay: "3s" }} />

      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-center gap-12 lg:gap-16 pt-28 pb-20 lg:pt-24 lg:pb-16">
        <div className="relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md mb-6" style={{ background: "rgba(74,214,255,0.12)", border: "1px solid rgba(74,214,255,0.3)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4ad6ff" }} />
              <span className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase" style={{ color: "#7ee2ff" }}>
                Ecom Foundation · {COURSE.cohort.label}
              </span>
            </div>
          </Reveal>

          <h1 className="t-display tracking-tight mb-6 text-white">
            <RevealText text="Foundation" className="block" />
            <RevealText text="Ecommerce." className="block grad-text" delay={0.12} stagger={0.04} />
            <span className="block text-[0.55em] font-semibold mt-3" style={{ color: "rgba(255,255,255,0.65)" }}>
              <RevealText text="Tư duy thật, Thực chiến thật." delay={0.32} />
            </span>
          </h1>

          <Reveal delay={0.5}>
            <p className="t-body-lg max-w-[520px] mb-8" style={{ color: "rgba(255,255,255,0.72)" }}>
              Khoá foundation về thương mại điện tử cho người mới và marketer trẻ — không dạy tool lẻ, không hứa hẹn ngắn hạn. Xây tư duy đúng từ đầu để bước vào ngành làm thật.
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="mb-7">
              <CohortStatus />
            </div>
          </Reveal>

          <Reveal delay={0.7}>
            <div className="flex gap-3 items-center flex-wrap">
              <Link href="#apply" className="btn btn-primary">
                Đăng ký Khoá 1 — 999.000đ <span className="arrow">→</span>
              </Link>
              <Link href="#curriculum" className="btn btn-ghost">
                Xem lộ trình <span className="arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Khoá detail card */}
        <Reveal delay={0.25}>
          <CohortCard />
        </Reveal>
      </div>
    </section>
  );
}

function CohortCard() {
  return (
    <div className="relative w-full max-w-[460px] mx-auto lg:mx-0 lg:ml-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="rounded-2xl overflow-hidden relative"
        style={{
          background: "linear-gradient(180deg, rgba(20,40,90,0.6), rgba(8,16,43,0.85))",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 30px 80px rgba(5,10,31,0.6)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Header */}
        <div className="relative p-6 pb-4 overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(74,214,255,0.18), rgba(122,61,255,0.18))" }}>
          <div className="absolute top-0 right-0 w-40 h-40" style={{ background: "radial-gradient(circle, rgba(74,214,255,0.3), transparent 65%)", filter: "blur(20px)" }} />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md mb-4" style={{ background: "rgba(0,215,34,0.12)", border: "1px solid rgba(0,215,34,0.25)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00d722" }} />
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em]" style={{ color: "#5fffaa" }}>Đang nhận application</span>
            </div>
            <div className="text-[1.6rem] font-bold tracking-tight text-white leading-tight mb-1">{COURSE.cohort.label}</div>
            <div className="text-[0.85rem]" style={{ color: "rgba(255,255,255,0.65)" }}>{COURSE.name} — Khoá đầu tiên</div>
          </div>
        </div>

        {/* Body details */}
        <div className="p-6 space-y-4">
          {[
            { icon: <IconCalendar />, label: "Khai giảng", val: COURSE.cohort.startsAt },
            { icon: <IconClock />, label: "Thời lượng", val: `${COURSE.format.sessions} buổi · ${COURSE.format.weeks} tuần · ${COURSE.format.hoursPerSession}/buổi` },
            { icon: <IconUsers />, label: "Quy mô lớp", val: "Lớp nhỏ · 4–7 người" },
            { icon: <IconLocation />, label: "Địa điểm", val: COURSE.cohort.location },
          ].map((it, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(20,110,245,0.12)", border: "1px solid rgba(20,110,245,0.2)" }}>
                {it.icon}
              </span>
              <div>
                <div className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] mb-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{it.label}</div>
                <div className="text-[0.92rem] font-semibold text-white">{it.val}</div>
              </div>
            </div>
          ))}

          {/* Highlight pill */}
          <div className="pt-2">
            <div className="rounded-lg px-3.5 py-2.5 flex items-center gap-2.5" style={{ background: "rgba(74,214,255,0.08)", border: "1px solid rgba(74,214,255,0.22)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ad6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18h6M10 22h4" /><path d="M2 9a10 10 0 0120 0c0 4-3 6-3 9H5c0-3-3-5-3-9z" />
              </svg>
              <span className="text-[0.78rem]" style={{ color: "rgba(255,255,255,0.78)" }}>
                Lớp nhỏ giữ chất lượng — <strong className="text-white">tối đa 7</strong>, chốt khi đủ ít nhất <strong className="text-white">5</strong>.
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── FIT FOR ─── */
function FitForSection() {
  return (
    <section className="relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-24">
        <Reveal>
          <div className="section-tag">Đối tượng</div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="t-h2 mb-12 max-w-[640px] text-white">
            Khoá này dành cho <span className="grad-text">đúng người.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Reveal delay={0.1}>
            <div className="glass p-7 md:p-8 h-full">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,215,34,0.10)", border: "1px solid rgba(0,215,34,0.25)" }}>
                  <IconCheck />
                </span>
                <span className="text-[0.95rem] font-bold text-white">Phù hợp với bạn nếu</span>
              </div>
              <ul className="space-y-3">
                {FIT_FOR.map((it, i) => (
                  <li key={i} className="flex items-start gap-3 text-[0.95rem]" style={{ color: "rgba(255,255,255,0.78)" }}>
                    <span className="flex-shrink-0 mt-1"><IconCheck /></span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="glass p-7 md:p-8 h-full">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,90,114,0.08)", border: "1px solid rgba(255,90,114,0.25)" }}>
                  <IconX />
                </span>
                <span className="text-[0.95rem] font-bold text-white">Không phù hợp nếu</span>
              </div>
              <ul className="space-y-3">
                {NOT_FIT_FOR.map((it, i) => (
                  <li key={i} className="flex items-start gap-3 text-[0.95rem]" style={{ color: "rgba(255,255,255,0.78)" }}>
                    <span className="flex-shrink-0 mt-1"><IconX /></span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── OUTCOMES ─── */
function OutcomesSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="blob blob-cyan blob-anim" style={{ width: 480, height: 480, top: "20%", right: "-10%" }} />
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-24">
        <Reveal><div className="section-tag">Outcomes</div></Reveal>
        <Reveal delay={0.08}>
          <h2 className="t-h2 mb-3 max-w-[640px] text-white">
            Học xong, bạn <span className="grad-text">làm được gì?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="t-caption mb-12 max-w-[520px]">6 năng lực cụ thể, đo được — không phải kiến thức mơ hồ.</p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {OUTCOMES.map((o, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="glass p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-[0.95rem]" style={{ background: "var(--grad-primary)", color: "white" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="text-[1.05rem] font-semibold text-white mb-2 tracking-tight">{o.title}</div>
                <div className="text-[0.85rem] leading-[1.65]" style={{ color: "var(--ink-mute)" }}>{o.sub}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CURRICULUM ─── */
function CurriculumSection() {
  const [activeModule, setActiveModule] = useState<Module | "ALL">("ALL");
  const [openSession, setOpenSession] = useState<number | null>(1);

  const filtered = activeModule === "ALL" ? SESSIONS : SESSIONS.filter((s) => s.module === activeModule);

  const moduleKeys = Object.keys(MODULES) as Module[];

  return (
    <section id="curriculum" className="relative overflow-hidden">
      <div className="blob blob-purple blob-anim" style={{ width: 500, height: 500, top: "30%", left: "-15%" }} />
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <Reveal><div className="section-tag">Lộ trình</div></Reveal>
        <Reveal delay={0.08}>
          <h2 className="t-h2 mb-3 text-white">
            12 buổi · 6 tuần · <span className="grad-text">5 module.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="t-caption mb-10 max-w-[520px]">
            Mỗi buổi: training 2–3h + quiz cuối buổi + bài thu hoạch Sheet. 3 buổi presentation lớn vào tuần 1, 3, 5.
          </p>
        </Reveal>

        {/* Module filter pills */}
        <Reveal delay={0.2}>
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveModule("ALL")}
              className="px-3.5 py-1.5 rounded-md text-[0.78rem] font-semibold transition-all border"
              style={{
                borderColor: activeModule === "ALL" ? "#146ef5" : "rgba(255,255,255,0.10)",
                background: activeModule === "ALL" ? "rgba(20,110,245,0.15)" : "rgba(255,255,255,0.02)",
                color: activeModule === "ALL" ? "#9bb6ff" : "rgba(255,255,255,0.65)",
              }}
            >
              Tất cả ({SESSIONS.length})
            </button>
            {moduleKeys.map((k) => {
              const active = activeModule === k;
              const count = SESSIONS.filter((s) => s.module === k).length;
              return (
                <button
                  key={k}
                  onClick={() => setActiveModule(k)}
                  className="px-3.5 py-1.5 rounded-md text-[0.78rem] font-semibold transition-all border"
                  style={{
                    borderColor: active ? MODULES[k].color : "rgba(255,255,255,0.10)",
                    background: active ? `${MODULES[k].color}15` : "rgba(255,255,255,0.02)",
                    color: active ? MODULES[k].color : "rgba(255,255,255,0.65)",
                  }}
                >
                  {MODULES[k].name} ({count})
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Sessions accordion */}
        <div className="space-y-3">
          {filtered.map((s, i) => {
            const open = openSession === s.no;
            const moduleColor = MODULES[s.module].color;
            return (
              <Reveal key={s.no} delay={i * 0.04}>
                <motion.div
                  layout
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${open ? moduleColor + "40" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  <button
                    onClick={() => setOpenSession(open ? null : s.no)}
                    className="w-full text-left p-4 md:p-5 flex items-center gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center relative" style={{ background: `${moduleColor}10`, border: `1px solid ${moduleColor}30` }}>
                      <ModuleIcon mod={s.module} color={moduleColor} />
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[0.62rem] text-white" style={{ background: moduleColor, boxShadow: "0 2px 6px rgba(0,0,0,0.3)" }}>
                        {s.no}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em]" style={{ color: moduleColor }}>{MODULES[s.module].name}</span>
                        <span className="text-[0.68rem]" style={{ color: "rgba(255,255,255,0.4)" }}>· {s.week}</span>
                        {s.isPresentation && (
                          <span className="text-[0.62rem] font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded" style={{ background: "rgba(255,174,19,0.12)", color: "#ffd479", border: "1px solid rgba(255,174,19,0.25)" }}>
                            Presentation
                          </span>
                        )}
                      </div>
                      <div className="text-[0.95rem] md:text-[1rem] font-semibold text-white tracking-tight">{s.title}</div>
                    </div>
                    <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
                      <IconChevron />
                    </motion.div>
                  </button>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 md:px-5 pb-5 pl-[72px] md:pl-[88px]"
                    >
                      <ul className="space-y-2">
                        {s.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-[0.9rem]" style={{ color: "rgba(255,255,255,0.72)" }}>
                            <span className="w-1 h-1 rounded-full flex-shrink-0 mt-2.5" style={{ background: moduleColor }} />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── FORMAT ─── */
/* ─── Tool callout — links from M3 Vận hành sàn ─── */
function ToolCallout() {
  return (
    <section className="relative">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-10 md:py-14">
        <Reveal>
          <div className="rounded-2xl p-6 md:p-7 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-7"
            style={{ background: "linear-gradient(135deg, rgba(74,214,255,0.10) 0%, rgba(122,61,255,0.10) 100%)", border: "1px solid rgba(74,214,255,0.30)" }}>
            <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(74,214,255,0.30), transparent 70%)", filter: "blur(20px)" }} />
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--grad-primary)", boxShadow: "0 4px 14px rgba(20,110,245,0.45)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="18" rx="2" /><line x1="2" y1="9" x2="22" y2="9" /><line x1="9" y1="3" x2="9" y2="21" />
              </svg>
            </div>
            <div className="relative flex-1">
              <div className="text-[0.62rem] font-bold uppercase tracking-[0.16em] mb-1.5" style={{ color: "#7ee2ff" }}>Tool miễn phí · Practice ngay</div>
              <div className="text-[1.1rem] md:text-[1.2rem] font-bold tracking-tight text-white mb-1.5">Tính phí sàn TikTok Shop & Shopee</div>
              <p className="text-[0.88rem] leading-[1.6]" style={{ color: "rgba(255,255,255,0.7)" }}>
                Học xong B5 (Tư duy giá · Tồn kho · Điểm gian hàng), thực hành ngay với tool tính phí sàn — so sánh đồng thời 4 phương án Mall vs Non-Mall. Bảng phí 2026 mới nhất.
              </p>
            </div>
            <Link href="/tools/tinh-phi-san" className="btn btn-primary flex-shrink-0">
              Mở tool <span className="arrow">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FormatSection() {
  const blocks = [
    { icon: <IconBook />, title: "Training", desc: "Mỗi buổi 2–3 tiếng. Trainer chia sẻ tư duy + case study thực tế. Lớp nhỏ nên thực sự là thảo luận, không phải giảng 1 chiều." },
    { icon: <IconQuiz />, title: "Quiz cuối buổi", desc: "Quiz nhanh 5–10 câu (Google Form hoặc giấy) để chốt kiến thức key. Không pass/fail — chỉ giúp bạn biết mình đang ở đâu." },
    { icon: <IconChart />, title: "Bài thu hoạch", desc: "Bài tập về nhà làm bằng Sheet, nộp trước buổi sau. Trainer đọc và feedback 1-1. Không chấm điểm, chỉ đánh giá định tính." },
  ];
  return (
    <section className="relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-24">
        <Reveal><div className="section-tag">Format</div></Reveal>
        <Reveal delay={0.08}>
          <h2 className="t-h2 mb-12 max-w-[640px] text-white">
            Mỗi buổi gồm <span className="grad-text">3 phần.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {blocks.map((b, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="glass p-7 h-full">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--grad-primary-soft)", border: "1px solid rgba(20,110,245,0.2)" }}>
                  {b.icon}
                </div>
                <div className="text-[1.05rem] font-semibold text-white mb-2 tracking-tight">{b.title}</div>
                <div className="text-[0.9rem] leading-[1.7]" style={{ color: "var(--ink-mute)" }}>{b.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Presentation note */}
        <Reveal delay={0.4}>
          <div className="mt-6 rounded-xl p-5 flex items-start gap-4" style={{ background: "rgba(255,174,19,0.06)", border: "1px solid rgba(255,174,19,0.18)" }}>
            <span className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,174,19,0.12)" }}>
              <Ic d={<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />} w={20} color="#ffae13" />
            </span>
            <div className="text-[0.92rem] leading-[1.7]">
              <strong className="text-white">Presentation lớn 2 tuần/lần.</strong>{" "}
              <span style={{ color: "var(--ink-soft)" }}>
                Sau B2 (chiến lược kinh doanh), B5 (vận hành sàn), B8 (setup ads), và B11 (Plan 1 năm). Bạn trình bày — trainer + lớp cùng phản biện. Đây là phần xây tự tin và giao tiếp chuyên nghiệp.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── AFTER COURSE ─── */
function AfterCourseSection() {
  const icons = [<IconMentor key="m" />, <IconSlide key="s" />, <IconChat key="c" />, <IconNetwork key="n" />];
  return (
    <section className="relative overflow-hidden">
      <div className="blob blob-blue blob-anim" style={{ width: 500, height: 500, top: "10%", left: "-15%" }} />
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-24">
        <Reveal><div className="section-tag">Sau khoá</div></Reveal>
        <Reveal delay={0.08}>
          <h2 className="t-h2 mb-3 max-w-[640px] text-white">
            Học xong không phải <span className="grad-text">tạm biệt.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="t-caption mb-12 max-w-[520px]">3 tháng mentoring + tài liệu + group hỗ trợ vĩnh viễn — đi cùng bạn dài hạn.</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {AFTER_COURSE.map((it, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="glass p-6 h-full">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: "var(--grad-primary-soft)", border: "1px solid rgba(20,110,245,0.2)" }}>
                  {icons[i]}
                </div>
                <div className="text-[1rem] font-semibold text-white mb-2 tracking-tight">{it.title}</div>
                <div className="text-[0.85rem] leading-[1.65]" style={{ color: "var(--ink-mute)" }}>{it.desc}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TRAINER ─── */
function TrainerSection() {
  return (
    <section className="relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 lg:gap-16 items-start">
          <Reveal>
            <div className="rounded-2xl overflow-hidden relative" style={{
              background: "linear-gradient(180deg, rgba(20,40,90,0.5), rgba(8,16,43,0.85))",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 24px 60px rgba(5,10,31,0.55)",
            }}>
              <div className="relative" style={{ background: "linear-gradient(135deg, #0d1c52 0%, #1e2c7a 50%, #2a1c6a 100%)" }}>
                <div className="absolute inset-0 z-0" style={{ backgroundImage: "radial-gradient(rgba(125,169,255,0.18) 1.2px, transparent 1.2px)", backgroundSize: "20px 20px", opacity: 0.5 }} />
                <Image src="/kai-photo.webp" alt={`${COURSE.trainer.name} — Trainer Foundation Ecommerce`} width={600} height={750} className="relative z-10 w-full h-auto block object-cover object-top" style={{ aspectRatio: "4/5" }} sizes="(max-width: 768px) 90vw, 360px" />
                <div className="absolute inset-0 z-20" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(8,16,43,0.85) 100%)" }} />
              </div>
              <div className="px-5 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="text-[1rem] font-bold text-white tracking-tight">{COURSE.trainer.name}</div>
                <div className="text-[0.8rem]" style={{ color: "var(--ink-mute)" }}>{COURSE.trainer.role}</div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal><div className="section-tag">Trainer</div></Reveal>
            <Reveal delay={0.08}>
              <h2 className="t-h2 mb-6 text-white">
                <span className="grad-text">Nguyễn Đức Quảng</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="space-y-4 mb-8">
                <p className="t-body">
                  Hơn <strong className="text-white">5 năm thực chiến</strong> trong lĩnh vực Digital Marketing và Ecommerce — kinh qua cả Agency (UpBase) và Client (Yumvita). Từng làm Ecom từ những ngày đầu của TikTok Shop tại Việt Nam.
                </p>
                <p className="t-body">
                  Hiện là <strong className="text-white">Digital Marketing Manager tại UpBase</strong>, quản lý team 12 người phụ trách 60+ dự án trên TikTok Shop, Shopee, Meta, Google với ngân sách <strong className="text-white">10 tỷ VNĐ/tháng</strong>.
                </p>
                <p className="t-body">
                  Đã mentor 20+ marketer trẻ. Đoạt giải <strong className="text-white">TikTok Awards 2024 — Best Commerce Campaign Gold</strong> với một thương hiệu thời trang.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { val: "5+", label: "Năm thực chiến" },
                  { val: "60+", label: "Dự án Ecom" },
                  { val: "10B+", label: "Ngân sách/tháng" },
                  { val: "12", label: "Người trong team" },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg p-3.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="text-[1.4rem] font-bold tracking-tight grad-text leading-none">{s.val}</div>
                    <div className="text-[0.72rem] mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PRICING ─── */
function PricingSection() {
  const tiers = [
    {
      name: "Khoá 1", badge: "Khoá đầu tiên", price: "999.000", featured: true,
      desc: "Mở bán testing — số lượng giới hạn",
      bullets: ["Full nội dung 12 buổi", "Slot giới hạn 7 học viên", "3 tháng mentoring 1-1", "Group hỗ trợ vĩnh viễn"],
      cta: "Đăng ký Khoá 1",
    },
    {
      name: "Early-bird", badge: "Khoá sau", price: "2.999.000",
      desc: "Đóng đơn trước cuối tháng — countdown tự reset",
      bullets: ["Full nội dung 12 buổi", "Slot mở rộng hơn", "3 tháng mentoring 1-1", "Group hỗ trợ vĩnh viễn"],
      cta: "Quan tâm Early-bird",
    },
    {
      name: "Giá chuẩn", badge: "Sau early-bird", price: "4.999.000",
      desc: "Áp dụng các khoá sau early-bird",
      bullets: ["Full nội dung 12 buổi", "Slot mở rộng hơn", "3 tháng mentoring 1-1", "Group hỗ trợ vĩnh viễn"],
      cta: "Quan tâm",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="blob blob-cyan blob-anim" style={{ width: 480, height: 480, bottom: "10%", right: "-10%" }} />
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-24">
        <Reveal><div className="section-tag">Học phí</div></Reveal>
        <Reveal delay={0.08}>
          <h2 className="t-h2 mb-3 text-white">
            3 mức giá theo <span className="grad-text">khoá học.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="t-caption mb-12 max-w-[520px]">
            Cùng 1 nội dung. Mình giảm sâu khoá đầu để testing và build community trước.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {tiers.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="relative rounded-2xl p-6 md:p-7 h-full overflow-hidden flex flex-col"
                style={{
                  background: t.featured
                    ? "linear-gradient(160deg, rgba(20,110,245,0.18) 0%, rgba(122,61,255,0.18) 60%, rgba(8,16,43,0.85) 100%)"
                    : "linear-gradient(180deg, rgba(20,40,90,0.45), rgba(8,16,43,0.7))",
                  border: t.featured ? "1px solid rgba(74,214,255,0.35)" : "1px solid rgba(255,255,255,0.10)",
                  boxShadow: t.featured ? "0 24px 60px rgba(20,110,245,0.25), 0 0 0 1px rgba(74,214,255,0.15) inset" : "0 16px 40px rgba(5,10,31,0.4)",
                }}>
                {t.featured && (
                  <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(74,214,255,0.30), transparent 70%)", filter: "blur(20px)" }} />
                )}
                <div className="relative flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-[0.78rem] font-semibold uppercase tracking-[0.14em]" style={{ color: t.featured ? "#7ee2ff" : "var(--ink-mute)" }}>{t.name}</div>
                    {t.featured && (
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md" style={{ background: "rgba(74,214,255,0.15)", border: "1px solid rgba(74,214,255,0.3)" }}>
                        <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: "#4ad6ff" }} />
                        <span className="text-[0.6rem] font-bold uppercase tracking-[0.14em]" style={{ color: "#7ee2ff" }}>Đang mở</span>
                      </div>
                    )}
                  </div>
                  <div className="text-[0.78rem] mb-5" style={{ color: "var(--ink-mute)" }}>{t.badge}</div>

                  <div className="flex items-baseline gap-1.5 mb-2">
                    <div className={`text-[2.2rem] md:text-[2.4rem] font-bold tracking-tight leading-none ${t.featured ? "grad-text" : "text-white"}`}>{t.price}</div>
                    <span className="text-[0.95rem] font-normal" style={{ color: "var(--ink-mute)" }}>đ</span>
                  </div>
                  <div className="text-[0.85rem] mb-6" style={{ color: "var(--ink-mute)" }}>{t.desc}</div>

                  <ul className="space-y-2.5 mb-7 pb-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                    {t.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[0.88rem]" style={{ color: "rgba(255,255,255,0.78)" }}>
                        <IconCheck color={t.featured ? "#4ad6ff" : "#7da9ff"} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="#apply" className={t.featured ? "btn btn-primary w-full justify-center mt-auto" : "btn btn-ghost w-full justify-center mt-auto"}>
                    {t.cta} <span className="arrow">→</span>
                  </Link>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-6 rounded-xl p-5 flex items-start gap-4" style={{ background: "rgba(20,110,245,0.06)", border: "1px solid rgba(20,110,245,0.18)" }}>
            <span className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(20,110,245,0.12)" }}>
              <IconUsers />
            </span>
            <div className="text-[0.92rem] leading-[1.7]" style={{ color: "var(--ink-soft)" }}>
              <strong className="text-white">Đăng ký nhóm 2+ người giảm thêm 10%.</strong>{" "}
              Apply cùng nhóm bạn cùng học cùng tiến — group nhỏ 1–2 người chung môi trường công ty hoặc trường thường giữ nhịp tốt hơn.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── APPLY FLOW ─── */
function ApplyFlowSection() {
  const steps = [
    { no: "01", title: "Đăng ký form", desc: "Điền form bên dưới — không cam kết gì, chỉ là khởi đầu." },
    { no: "02", title: "Trainer review", desc: "Mình đọc application và liên hệ trong 24h để đặt lịch quick meet." },
    { no: "03", title: "Quick meet 15 phút", desc: "Zoom hoặc offline. Cùng nhau check phù hợp 2 chiều — bạn với khoá, mình với bạn." },
    { no: "04", title: "Xác nhận + chuyển khoản", desc: "Phù hợp 2 bên: chuyển khoản học phí + sắp xếp lịch học cùng lớp." },
  ];
  return (
    <section className="relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-24">
        <Reveal><div className="section-tag">Quy trình apply</div></Reveal>
        <Reveal delay={0.08}>
          <h2 className="t-h2 mb-12 max-w-[640px] text-white">
            Apply không phải nộp tiền là vào — <span className="grad-text">2 bên cùng phù hợp</span> mới làm việc.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 relative">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="glass p-6 h-full relative">
                <div className="text-[2rem] font-bold tracking-tight grad-text leading-none mb-4">{s.no}</div>
                <div className="text-[1.05rem] font-semibold text-white mb-2 tracking-tight">{s.title}</div>
                <div className="text-[0.88rem] leading-[1.65]" style={{ color: "var(--ink-mute)" }}>{s.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function FAQSection() {
  return (
    <section className="relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <Reveal><div className="section-tag">FAQ</div></Reveal>
        <Reveal delay={0.08}>
          <h2 className="t-h2 mb-12 text-white">Câu hỏi <span className="grad-text">thường gặp.</span></h2>
        </Reveal>
        <div className="max-w-[820px]">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <details className="py-5 group" style={{ borderBottom: "1px solid var(--line)" }}>
                <summary className="flex justify-between items-center cursor-pointer text-[1rem] font-semibold list-none gap-4 text-white group-hover:text-[#7da9ff] transition-colors">
                  {f.q}
                  <span className="flex-shrink-0">
                    <svg className="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7da9ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <p className="text-[0.95rem] leading-[1.75] mt-3 pr-8" style={{ color: "var(--ink-mute)" }}>{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── APPLY (with form) ─── */
function ApplySection() {
  return (
    <section id="apply" className="relative overflow-hidden border-t" style={{ borderColor: "var(--line)" }}>
      <div className="blob blob-blue blob-anim" style={{ width: 600, height: 600, top: "-20%", left: "-10%" }} />
      <div className="blob blob-purple blob-anim" style={{ width: 500, height: 500, bottom: "-15%", right: "-10%", animationDelay: "2s" }} />
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="lg:pt-4">
            <Reveal><div className="section-tag">Apply Khoá 1</div></Reveal>
            <Reveal delay={0.08}>
              <h2 className="t-h1 mb-5 text-white">
                Sẵn sàng làm Ecom <span className="grad-text">thật?</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="t-body mb-8 max-w-[440px]">
                Điền application bên dưới — mình sẽ liên hệ trong <strong className="text-white">24 giờ</strong> để đặt lịch quick meet 15 phút. Apply không phải nộp tiền là vào.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mb-6">
                <CohortStatus />
              </div>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="rounded-xl p-5" style={{ background: "rgba(255,174,19,0.06)", border: "1px solid rgba(255,174,19,0.18)" }}>
                <div className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,174,19,0.12)" }}>
                    <Ic d={<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />} w={16} color="#ffae13" />
                  </span>
                  <div className="text-[0.85rem] leading-[1.6]">
                    <div className="font-bold text-white mb-0.5">Khoá 1 — chỉ 999.000đ</div>
                    <div style={{ color: "var(--ink-soft)" }}>
                      Khoá đầu tiên giới hạn <strong className="text-white">7 học viên</strong>. Mình giảm sâu để testing — các khoá sau sẽ là 2.999.000đ rồi 4.999.000đ.
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.12}><ApplyForm /></Reveal>
        </div>
      </div>
    </section>
  );
}
