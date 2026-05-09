"use client";
import { motion, Variants, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "span" | "h1" | "h2" | "h3" | "p" | "li";
};

export default function Reveal({ children, delay = 0, y = 28, className = "", as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as any;

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, delay: reduce ? 0 : delay, ease: [0.2, 0.8, 0.2, 1] },
    },
  };

  return (
    <Comp className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={variants}>
      {children}
    </Comp>
  );
}

/** Reveal each word/character of a string */
export function RevealText({
  text,
  delay = 0,
  className = "",
  splitBy = "word",
  stagger = 0.04,
}: {
  text: string;
  delay?: number;
  className?: string;
  splitBy?: "word" | "char";
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const parts = splitBy === "word" ? text.split(" ") : text.split("");

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay } },
  };
  const item: Variants = {
    hidden: { y: reduce ? 0 : "100%", opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      style={{ overflow: "hidden" }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={container}
      aria-label={text}
    >
      {parts.map((p, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.1em" }}>
          <motion.span style={{ display: "inline-block" }} variants={item}>
            {p}
            {splitBy === "word" && i < parts.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
