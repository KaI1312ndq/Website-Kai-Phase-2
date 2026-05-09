"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = [
  { label: "Ecom Manager", color: "#4ad6ff" },
  { label: "Team Builder", color: "#7da9ff" },
  { label: "Mentor", color: "#a78bff" },
  { label: "Strategist", color: "#ed52cb" },
];

const stack = [
  { label: "Performance", sub: "TikTok · Shopee · Meta" },
  { label: "Leadership", sub: "Team 12 · 60+ projects" },
  { label: "Mentoring", sub: "Ecom Foundation cohort" },
  { label: "Strategy", sub: "Growth · P/L · IMC" },
];

export default function PersonalCard() {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full max-w-[520px] mx-auto lg:mx-0 lg:ml-auto">
      {/* Floating top-right "Hà Nội · Open" pill */}
      <motion.div
        initial={{ opacity: 0, y: -16, x: 16 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute -top-5 -right-2 md:-right-5 z-20 rounded-xl px-3.5 py-2 flex items-center gap-2.5"
        style={{ background: "rgba(8,16,43,0.85)", border: "1px solid rgba(0,215,34,0.3)", boxShadow: "0 8px 24px rgba(5,10,31,0.45)", backdropFilter: "blur(12px)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00d722" }} />
        <span className="text-[0.7rem] font-semibold tracking-[0.1em]" style={{ color: "#5fffaa" }}>Available · Hà Nội</span>
      </motion.div>

      {/* Main profile card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(20,40,90,0.55) 0%, rgba(8,16,43,0.85) 100%)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 30px 80px rgba(5,10,31,0.6), 0 1px 0 rgba(255,255,255,0.08) inset",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Typography header strip */}
        <div className="relative h-[200px] overflow-hidden">
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0d1c52 0%, #1e2c7a 50%, #2a1c6a 100%)" }} />
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(125,169,255,0.18) 1.2px, transparent 1.2px)", backgroundSize: "20px 20px", opacity: 0.6 }} />
          {/* Gradient orbs */}
          <div className="absolute" style={{ top: "-20%", right: "-10%", width: 280, height: 280, background: "radial-gradient(circle, rgba(74,214,255,0.4), transparent 65%)", filter: "blur(30px)" }} />
          <div className="absolute" style={{ bottom: "-30%", left: "-10%", width: 260, height: 260, background: "radial-gradient(circle, rgba(122,61,255,0.35), transparent 65%)", filter: "blur(30px)" }} />

          {/* Big monogram K with gradient outline */}
          <div className="absolute right-4 bottom-0 z-10 leading-none select-none" style={{
            fontSize: "260px",
            fontWeight: 800,
            background: "linear-gradient(135deg, rgba(74,214,255,0.18), rgba(122,61,255,0.18))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            letterSpacing: "-0.05em",
            transform: "translateY(20px)",
          }}>K</div>

          {/* Top-left badge */}
          <div className="absolute top-4 left-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-md" style={{ background: "rgba(8,16,43,0.7)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,0.55)" }}>Profile</span>
            <span className="w-px h-2.5" style={{ background: "rgba(255,255,255,0.2)" }} />
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] grad-text">2025</span>
          </div>

          {/* Bottom-left tagline */}
          <div className="absolute bottom-5 left-5 z-30">
            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>Personal stack</div>
            <div className="text-[1rem] font-bold tracking-tight text-white">Marketer · Leader · Mentor</div>
          </div>

          {/* Vignette */}
          <div className="absolute inset-x-0 bottom-0 h-20 z-20" style={{ background: "linear-gradient(180deg, transparent, rgba(8,16,43,0.95))" }} />
        </div>

        {/* Body */}
        <div className="p-5 md:p-6 -mt-4 relative z-30">
          {/* Name + cycling role */}
          <div className="mb-5">
            <div className="text-[1.4rem] font-bold tracking-tight text-white leading-none mb-1.5">Nguyễn Đức Quảng</div>
            <div className="flex items-center gap-2">
              <span className="text-[0.78rem]" style={{ color: "rgba(255,255,255,0.55)" }}>Currently:</span>
              <div className="relative h-5 overflow-hidden">
                {roles.map((r, i) => (
                  <motion.span
                    key={r.label}
                    animate={{ y: roleIdx === i ? 0 : roleIdx > i ? -20 : 20, opacity: roleIdx === i ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                    className="absolute left-0 top-0 text-[0.85rem] font-semibold whitespace-nowrap"
                    style={{ color: r.color }}
                  >
                    {r.label}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* 2x2 stats grid */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { label: "Years", val: "5+", color: "#4ad6ff" },
              { label: "Projects", val: "60+", color: "#7da9ff" },
              { label: "Team led", val: "12", color: "#a78bff" },
              { label: "Budget/mo", val: "10B+", color: "#ed52cb" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.06 }}
                className="rounded-lg px-3 py-2.5"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</div>
                <div className="text-[1.15rem] font-bold tracking-tight leading-none" style={{ color: s.color }}>{s.val}</div>
              </motion.div>
            ))}
          </div>

          {/* Stack list */}
          <div className="space-y-1.5 mb-4">
            <div className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Stack</div>
            {stack.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.85 + i * 0.06 }}
                className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--grad-primary)" }} />
                <span className="text-[0.82rem] font-semibold text-white">{s.label}</span>
                <span className="text-[0.72rem]" style={{ color: "rgba(255,255,255,0.45)" }}>{s.sub}</span>
              </motion.div>
            ))}
          </div>

          {/* Now playing strip */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.15 }}
            className="rounded-lg px-3 py-3 flex items-center gap-3"
            style={{ background: "rgba(20,110,245,0.10)", border: "1px solid rgba(20,110,245,0.25)" }}
          >
            <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: "var(--grad-primary)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[0.6rem] font-semibold uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.55)" }}>Now building</div>
              <div className="text-[0.85rem] font-semibold text-white truncate">Ecom Foundation · Cohort 01</div>
            </div>
            <div className="text-[0.7rem] font-bold grad-text">SOON</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating bottom-left "Mentee" mini card */}
      <motion.div
        initial={{ opacity: 0, y: 16, x: -16 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.6, delay: 0.95, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute -bottom-4 left-2 md:-left-5 z-20 rounded-xl px-3.5 py-2.5 flex items-center gap-3"
        style={{ background: "rgba(8,16,43,0.85)", border: "1px solid rgba(122,61,255,0.3)", boxShadow: "0 8px 24px rgba(122,61,255,0.25)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex -space-x-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-6 h-6 rounded-full border-2" style={{
              background: i === 0 ? "linear-gradient(135deg, #4ad6ff, #146ef5)" : i === 1 ? "linear-gradient(135deg, #7a3dff, #ed52cb)" : "linear-gradient(135deg, #ffae13, #ff6b00)",
              borderColor: "#0a1438",
            }} />
          ))}
        </div>
        <div>
          <div className="text-[0.62rem] font-semibold uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.5)" }}>Mentees</div>
          <div className="text-[0.85rem] font-bold text-white leading-none mt-0.5">20+ <span className="text-[0.7rem] font-normal" style={{ color: "rgba(255,255,255,0.55)" }}>marketers</span></div>
        </div>
      </motion.div>
    </div>
  );
}
