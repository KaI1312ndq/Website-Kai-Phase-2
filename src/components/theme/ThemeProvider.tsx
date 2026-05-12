"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type ThemeMode = "light" | "dark" | "auto";
export type ResolvedTheme = "light" | "dark";

type Ctx = {
  mode: ThemeMode;
  resolved: ResolvedTheme;
  setMode: (m: ThemeMode) => void;
};

const ThemeContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "ndq-theme";

function resolve(mode: ThemeMode): ResolvedTheme {
  if (mode === "light" || mode === "dark") return mode;
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(resolved: ResolvedTheme, animate = false) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (animate) {
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 300);
  }
  root.setAttribute("data-theme", resolved);
  root.style.colorScheme = resolved;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("auto");
  const [resolved, setResolved] = useState<ResolvedTheme>("dark");
  const [mounted, setMounted] = useState(false);

  // Initial load - đọc từ localStorage
  useEffect(() => {
    setMounted(true);
    let stored: ThemeMode = "auto";
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "light" || v === "dark" || v === "auto") stored = v;
    } catch {}
    const r = resolve(stored);
    setModeState(stored);
    setResolved(r);
    applyTheme(r, false);
  }, []);

  // Listen for OS theme change khi mode = "auto"
  useEffect(() => {
    if (mode !== "auto" || typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-color-scheme: light)");
    const handler = (e: MediaQueryListEvent) => {
      const r: ResolvedTheme = e.matches ? "light" : "dark";
      setResolved(r);
      applyTheme(r, true);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [mode]);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    const r = resolve(next);
    setResolved(r);
    applyTheme(r, true);
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, resolved, setMode }}>
      {/* Hide body till mounted để tránh flash khi script chưa chạy (nếu không có inline script) */}
      <div style={{ visibility: mounted ? "visible" : "visible" }}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): Ctx {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    // Fallback nếu component dùng ngoài provider
    return { mode: "auto", resolved: "dark", setMode: () => {} };
  }
  return ctx;
}

// Inline script chạy TRƯỚC khi React hydrate để set data-theme và tránh FOUC.
// Dùng dangerouslySetInnerHTML trong <head>.
export const THEME_INIT_SCRIPT = `
(function(){
  try {
    var m = localStorage.getItem('${STORAGE_KEY}');
    if (m !== 'light' && m !== 'dark' && m !== 'auto') m = 'auto';
    var r = m;
    if (m === 'auto') {
      r = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    document.documentElement.setAttribute('data-theme', r);
    document.documentElement.style.colorScheme = r;
  } catch (e) {}
})();
`.trim();
