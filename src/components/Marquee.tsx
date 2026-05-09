"use client";
import { ReactNode } from "react";

export default function Marquee({
  items,
  reverse = false,
  className = "",
}: {
  items: ReactNode[];
  reverse?: boolean;
  className?: string;
}) {
  const repeated = [...items, ...items];
  return (
    <div className={`marquee ${className}`}>
      <div className={`marquee-track ${reverse ? "marquee-track-rev" : ""}`}>
        {repeated.map((it, i) => (
          <div key={i} className="flex items-center flex-shrink-0">
            {it}
          </div>
        ))}
      </div>
      <div className={`marquee-track ${reverse ? "marquee-track-rev" : ""}`} aria-hidden>
        {repeated.map((it, i) => (
          <div key={`b-${i}`} className="flex items-center flex-shrink-0">
            {it}
          </div>
        ))}
      </div>
    </div>
  );
}
