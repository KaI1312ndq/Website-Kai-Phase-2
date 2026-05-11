"use client";
import { useEffect, useState } from "react";

/** Sticky progress bar at top - shows % scrolled through article body. */
export default function ReadingProgress({ targetSelector = "article" }: { targetSelector?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const target = document.querySelector(targetSelector) as HTMLElement | null;
      if (!target) {
        // Fallback: whole page progress
        const scrolled = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(100, Math.max(0, (scrolled / max) * 100)) : 0);
        return;
      }
      const rect = target.getBoundingClientRect();
      const winH = window.innerHeight;
      const total = rect.height + 0; // article height
      const seen = -rect.top + winH * 0.5; // start counting when article enters viewport
      const pct = Math.min(100, Math.max(0, (seen / total) * 100));
      setProgress(pct);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetSelector]);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 right-0 z-[60] pointer-events-none"
      style={{ top: 0, height: 3 }}
    >
      <div
        className="h-full transition-[width] duration-100 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #146ef5 0%, #4b5dff 50%, #7a3dff 100%)",
          boxShadow: "0 0 12px rgba(20,110,245,0.5)",
        }}
      />
    </div>
  );
}
