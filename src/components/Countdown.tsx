"use client";
import { useEffect, useState } from "react";

function endOfMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).getTime();
}

function diff() {
  const ms = Math.max(0, endOfMonth() - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s };
}

export default function Countdown({ compact = false }: { compact?: boolean }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-[42px] w-[180px] rounded-lg" style={{ background: "var(--st-04)" }} />
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  if (compact) {
    return (
      <span className="inline-flex items-baseline gap-1.5 font-mono font-bold tracking-tight">
        <span className="grad-text">{t.d}</span>
        <span className="text-[0.7em]" style={{ color: "var(--st-40)" }}>ngày</span>
        <span className="grad-text">{pad(t.h)}</span>
        <span className="text-[0.7em]" style={{ color: "var(--st-40)" }}>:</span>
        <span className="grad-text">{pad(t.m)}</span>
        <span className="text-[0.7em]" style={{ color: "var(--st-40)" }}>:</span>
        <span className="grad-text">{pad(t.s)}</span>
      </span>
    );
  }

  const blocks = [
    { val: t.d, label: "Ngày" },
    { val: t.h, label: "Giờ" },
    { val: t.m, label: "Phút" },
    { val: t.s, label: "Giây" },
  ];

  return (
    <div className="flex items-center gap-2">
      {blocks.map((b, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="rounded-lg px-3 py-2.5 min-w-[58px] text-center"
            style={{
              background: "var(--dg-70)",
              border: "1px solid rgba(74,214,255,0.25)",
              boxShadow: "0 1px 0 var(--st-06) inset",
            }}>
            <span className="text-[1.4rem] font-bold tracking-tight grad-text font-mono leading-none">
              {pad(b.val)}
            </span>
          </div>
          <span className="text-[0.6rem] mt-1.5 font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--st-45)" }}>
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}
