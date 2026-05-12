"use client";

import { useTheme, type ThemeMode } from "./ThemeProvider";

const OPTIONS: Array<{ value: ThemeMode; label: string; sub: string }> = [
  { value: "auto", label: "Tự động", sub: "Theo hệ điều hành" },
  { value: "light", label: "Sáng", sub: "Light theme" },
  { value: "dark", label: "Tối", sub: "Dark theme" },
];

/**
 * Inline theme switcher - dùng trong dropdown menu của UserButton.
 * Hiển thị 3 nút Tự động / Sáng / Tối.
 */
export default function ThemeToggleMenu({ compact = false }: { compact?: boolean }) {
  const { mode, setMode } = useTheme();

  if (compact) {
    return (
      <div className="flex items-center gap-1 px-2 py-1 rounded-md" style={{ background: "var(--line)" }}>
        {OPTIONS.map((o) => {
          const active = mode === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => setMode(o.value)}
              className="px-2 py-1 rounded text-[0.72rem] font-semibold transition"
              style={{
                background: active ? "var(--wf-blue)" : "transparent",
                color: active ? "#ffffff" : "var(--ink-mute)",
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="px-3 py-2.5">
      <div className="text-[0.68rem] uppercase tracking-[0.14em] font-semibold mb-2" style={{ color: "var(--ink-mute)" }}>
        Giao diện
      </div>
      <div className="grid grid-cols-3 gap-1 p-1 rounded-lg" style={{ background: "var(--line)" }}>
        {OPTIONS.map((o) => {
          const active = mode === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => setMode(o.value)}
              className="px-2 py-1.5 rounded-md text-[0.75rem] font-semibold transition text-center"
              style={{
                background: active ? "var(--wf-blue)" : "transparent",
                color: active ? "#ffffff" : "var(--ink-soft)",
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      <div className="text-[0.68rem] mt-1.5" style={{ color: "var(--ink-faint)" }}>
        {OPTIONS.find((o) => o.value === mode)?.sub}
      </div>
    </div>
  );
}
