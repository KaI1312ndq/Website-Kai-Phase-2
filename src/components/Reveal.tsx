"use client";
import { useEffect, useRef, useState, ReactNode, ElementType } from "react";

/**
 * Lightweight CSS-only Reveal - uses IntersectionObserver + CSS keyframes.
 * No framer-motion dependency for simple fade-up - saves ~25KB gzipped on initial load.
 *
 * Use `instant` for above-the-fold content (LCP).
 */

type Props = {
  children: ReactNode;
  delay?: number; // seconds
  y?: number;
  className?: string;
  as?: "div" | "section" | "span" | "h1" | "h2" | "h3" | "p" | "li" | "article";
  /** Skip animation entirely. Use for above-the-fold content so LCP isn't delayed. */
  instant?: boolean;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export default function Reveal({ children, delay = 0, y = 28, className = "", as = "div", instant = false }: Props) {
  const Comp = as as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (instant) return;
    if (prefersReducedMotion()) {
      setRevealed(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [instant]);

  // For instant or reduce-motion, render plain
  if (instant) {
    return <Comp className={className}>{children as any}</Comp>;
  }

  const style: React.CSSProperties = revealed
    ? {
        opacity: 1,
        transform: "translateY(0)",
        transition: `opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`,
      }
    : {
        opacity: 0,
        transform: `translateY(${y}px)`,
        transition: "none",
      };

  return (
    <Comp ref={ref as any} className={className} style={style}>
      {children as any}
    </Comp>
  );
}

/** Reveal each word/character of a string. `instant` skips animation entirely. */
export function RevealText({
  text,
  delay = 0,
  className = "",
  splitBy = "word",
  stagger = 0.04,
  instant = false,
}: {
  text: string;
  delay?: number;
  className?: string;
  splitBy?: "word" | "char";
  stagger?: number;
  instant?: boolean;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (instant) {
      setRevealed(true);
      return;
    }
    if (prefersReducedMotion()) {
      setRevealed(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [instant]);

  if (instant) {
    return <span className={`inline-flex flex-wrap ${className}`}>{text}</span>;
  }

  const parts = splitBy === "word" ? text.split(" ") : text.split("");

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} aria-label={text} style={{ overflow: "hidden" }}>
      {parts.map((p, i) => {
        const itemDelay = delay + i * stagger;
        const itemStyle: React.CSSProperties = revealed
          ? {
              display: "inline-block",
              transform: "translateY(0)",
              opacity: 1,
              transition: `transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) ${itemDelay}s, opacity 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) ${itemDelay}s`,
            }
          : {
              display: "inline-block",
              transform: "translateY(100%)",
              opacity: 0,
              transition: "none",
            };
        return (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.1em" }}>
            <span style={itemStyle}>
              {p}
              {splitBy === "word" && i < parts.length - 1 ? " " : ""}
            </span>
          </span>
        );
      })}
    </span>
  );
}
