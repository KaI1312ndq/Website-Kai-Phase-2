"use client";
import { useEffect, useState } from "react";
import type { Heading } from "@/lib/blog/headings";

export default function BlogTOC({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const onScroll = () => {
      // Find the heading closest to top (within first 25% of viewport)
      const els = headings
        .map((h) => document.getElementById(h.id))
        .filter((el): el is HTMLElement => Boolean(el));

      const triggerY = window.innerHeight * 0.25;
      let current: string | null = null;
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY) current = el.id;
        else break;
      }
      if (!current && els[0]) current = els[0].id;
      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Mục lục bài viết">
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
        Mục lục
      </div>
      <ul className="flex flex-col gap-0.5 list-none border-l" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        {headings.map((h) => {
          const isActive = h.id === activeId;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(h.id);
                  if (!el) return;
                  const y = el.getBoundingClientRect().top + window.scrollY - 90;
                  window.scrollTo({ top: y, behavior: "smooth" });
                  history.replaceState(null, "", `#${h.id}`);
                }}
                className="block py-1.5 text-[0.85rem] leading-snug transition-all"
                style={{
                  paddingLeft: h.level === 3 ? "1.5rem" : "0.85rem",
                  marginLeft: "-1px",
                  borderLeft: isActive ? "2px solid #7da9ff" : "2px solid transparent",
                  color: isActive ? "white" : "rgba(255,255,255,0.55)",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
