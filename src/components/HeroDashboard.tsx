"use client";
import { motion } from "framer-motion";

const metrics = [
  { label: "GMV ADS", value: "323B", trend: "↑ YoY", color: "#4ad6ff" },
  { label: "ROAS TB", value: ">7x", trend: "↑ Target", color: "#7da9ff" },
  { label: "BUDGET", value: "10B", trend: "● Active", color: "#a78bff" },
];

const platforms = [
  // TikTok
  { bg: "#000", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.18 8.18 0 004.78 1.52V6.86a4.85 4.85 0 01-1.01-.17z" /></svg> },
  // Shopee
  { bg: "#EE4D2D", svg: <svg width="14" height="14" viewBox="0 0 192 192"><path d="M96 28c-22 0-40 18-40 40H40a8 8 0 00-8 8.8l10 88A8 8 0 0050 172h92a8 8 0 008-7.2l10-88A8 8 0 00152 68h-16c0-22-18-40-40-40zm0 14c14.4 0 26 11.6 26 26H70c0-14.4 11.6-26 26-26z" fill="white" /></svg> },
  // Meta
  { bg: "#0866FF", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" /></svg> },
  // Google
  { bg: "white", svg: <svg width="14" height="14" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg> },
];

export default function HeroDashboard() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto lg:mx-0 lg:ml-auto">
      {/* Floating top-right NMV card */}
      <motion.div
        initial={{ opacity: 0, y: -20, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute -top-6 -right-2 md:-right-6 z-20 rounded-xl px-4 py-2.5 flex items-center gap-3"
        style={{ background: "var(--db-85)", border: "1px solid rgba(74,214,255,0.3)", boxShadow: "0 8px 28px rgba(20,110,245,0.25)", backdropFilter: "blur(12px)" }}
      >
        <span className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "rgba(74,214,255,0.15)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ad6ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        </span>
        <div>
          <div className="text-[0.6rem] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--st-45)" }}>NMV Total</div>
          <div className="text-[0.92rem] font-bold text-white leading-none mt-0.5">356B <span style={{ color: "#4ad6ff" }}>↑</span></div>
        </div>
      </motion.div>

      {/* Main dashboard card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative rounded-2xl p-5 md:p-6 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, var(--dg-70) 0%, var(--db-85) 100%)",
          border: "1px solid var(--st-10)",
          boxShadow: "0 24px 60px rgba(5,10,31,0.55), 0 1px 0 var(--st-08) inset",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--grad-primary)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="M7 14l4-4 4 4 5-5" />
              </svg>
            </span>
            <span className="text-[0.92rem] font-semibold text-white">Ecom Performance Dashboard</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md" style={{ background: "rgba(0,215,34,0.10)", border: "1px solid rgba(0,215,34,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00d722" }} />
            <span className="text-[0.65rem] font-semibold tracking-[0.12em] uppercase" style={{ color: "#5fffaa" }}>Live</span>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
              className="rounded-lg p-3"
              style={{ background: "var(--st-03)", border: "1px solid var(--st-08)" }}
            >
              <div className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] mb-1.5" style={{ color: "var(--st-45)" }}>{m.label}</div>
              <div className="text-[1.4rem] font-bold tracking-tight text-white leading-none">{m.value}</div>
              <div className="text-[0.7rem] mt-1.5" style={{ color: m.color }}>{m.trend}</div>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <div className="rounded-lg p-4 mb-4" style={{ background: "var(--st-03)", border: "1px solid var(--st-05)" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--st-40)" }}>Growth · 6 tháng</span>
            <span className="text-[0.7rem] font-semibold" style={{ color: "#4ad6ff" }}>+248%</span>
          </div>
          <svg viewBox="0 0 320 70" className="w-full h-[70px]" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4ad6ff" />
                <stop offset="50%" stopColor="#146ef5" />
                <stop offset="100%" stopColor="#7a3dff" />
              </linearGradient>
              <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#146ef5" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#146ef5" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {[15, 30, 45].map((y) => (
              <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="var(--st-05)" strokeDasharray="2 4" />
            ))}
            {/* Filled area */}
            <path
              d="M0,55 C40,52 60,45 100,40 C140,35 160,38 200,28 C240,18 260,15 320,8 L320,70 L0,70 Z"
              fill="url(#chartFill)"
            />
            {/* Line */}
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.7, ease: "easeOut" }}
              d="M0,55 C40,52 60,45 100,40 C140,35 160,38 200,28 C240,18 260,15 320,8"
              fill="none"
              stroke="url(#chartLine)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Dots */}
            {[
              [0, 55], [100, 40], [200, 28], [320, 8],
            ].map(([x, y], i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="3.5"
                fill="#4ad6ff"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.1 }}
              />
            ))}
          </svg>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {platforms.map((p, i) => (
              <div key={i} className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: p.bg, border: p.bg === "white" ? "1px solid rgba(0,0,0,0.1)" : "none" }}>
                {p.svg}
              </div>
            ))}
            <span className="ml-2 text-[0.7rem] font-semibold px-2 py-1 rounded-md" style={{ background: "var(--st-05)", color: "var(--st-60)" }}>+40 shops</span>
          </div>
          <div className="text-right">
            <div className="text-[0.6rem] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--st-40)" }}>Active brands</div>
            <div className="text-[0.92rem] font-bold text-white leading-tight">60+</div>
          </div>
        </div>
      </motion.div>

      {/* Floating bottom-left ROAS pill */}
      <motion.div
        initial={{ opacity: 0, y: 20, x: -20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute -bottom-5 left-2 md:-left-4 z-20 rounded-xl px-4 py-2.5 flex items-center gap-3"
        style={{ background: "var(--db-85)", border: "1px solid rgba(122,61,255,0.3)", boxShadow: "0 8px 28px rgba(122,61,255,0.25)", backdropFilter: "blur(12px)" }}
      >
        <span className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "rgba(122,61,255,0.15)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </span>
        <div>
          <div className="text-[0.6rem] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--st-45)" }}>ROAS Trung bình</div>
          <div className="text-[0.92rem] font-bold text-white leading-none mt-0.5">&gt;7x</div>
        </div>
      </motion.div>
    </div>
  );
}
