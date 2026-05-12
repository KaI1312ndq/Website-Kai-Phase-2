"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme, type ThemeMode } from "./ThemeProvider";

type OptionDef = { value: ThemeMode; label: string; sub: string };

const OPTIONS: OptionDef[] = [
  { value: "auto", label: "Tự động", sub: "Theo hệ điều hành" },
  { value: "light", label: "Sáng", sub: "Nền trắng + chữ navy" },
  { value: "dark", label: "Tối", sub: "Nền tối + chữ trắng" },
];

const LABEL_MAP: Record<ThemeMode, string> = {
  auto: "Auto",
  light: "Sáng",
  dark: "Tối",
};

/**
 * Theme switcher visible trong Navbar (cả guest + signed-in).
 * Click mở dropdown 3 option, không dùng icon.
 */
export default function ThemeToggleButton({ compact = false }: { compact?: boolean }) {
  const { mode, setMode } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Click outside to close
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function escHandler(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", escHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", escHandler);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[0.78rem] font-semibold transition border"
        style={{
          background: "var(--st-04)",
          borderColor: open ? "var(--wf-blue)" : "var(--st-10)",
          color: "var(--ink)",
        }}
      >
        <span>Theme</span>
        <span className="opacity-50">·</span>
        <span style={{ color: "var(--wf-blue-400)" }}>{LABEL_MAP[mode]}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>
          <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 min-w-[220px] rounded-xl overflow-hidden z-50"
          style={{
            background: "var(--db-95)",
            border: "1px solid var(--line)",
            boxShadow: "var(--shadow-card)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="px-3 py-2 border-b text-[0.65rem] uppercase tracking-[0.14em] font-semibold" style={{ borderColor: "var(--line)", color: "var(--ink-mute)" }}>
            Giao diện
          </div>
          <ul className="py-1">
            {OPTIONS.map((opt) => {
              const active = opt.value === mode;
              return (
                <li key={opt.value}>
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={active}
                    onClick={() => {
                      setMode(opt.value);
                      setOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 flex items-start gap-2.5 transition"
                    style={{
                      background: active ? "var(--st-06)" : "transparent",
                    }}
                  >
                    <span
                      className="flex-shrink-0 mt-0.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: active ? "var(--wf-blue)" : "var(--ink-faint)",
                        background: active ? "var(--wf-blue)" : "transparent",
                      }}
                    >
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[0.85rem] font-semibold" style={{ color: "var(--ink)" }}>
                        {opt.label}
                      </span>
                      {!compact && (
                        <span className="block text-[0.72rem] mt-0.5" style={{ color: "var(--ink-mute)" }}>
                          {opt.sub}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
