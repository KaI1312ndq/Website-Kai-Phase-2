"use client";
import { motion, useInView, useMotionValue, useTransform, animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function CounterStat({
  to,
  suffix = "",
  duration = 1.6,
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString("vi-VN"));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      count.set(to);
      return;
    }
    const controls = animate(count, to, { duration, ease: [0.2, 0.8, 0.2, 1] });
    return () => controls.stop();
  }, [inView, to, duration, reduce, count]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix && <span className="grad-text">{suffix}</span>}
    </span>
  );
}
