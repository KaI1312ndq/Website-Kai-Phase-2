"use client";
import { useState } from "react";

type Props = {
  url: string;
  title: string;
  variant?: "horizontal" | "compact";
};

export default function ShareButtons({ url, title, variant = "horizontal" }: Props) {
  const [copied, setCopied] = useState(false);

  const encUrl = encodeURIComponent(url);
  const encTitle = encodeURIComponent(title);

  const shares = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encUrl}`,
      bg: "#1877f2",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
        </svg>
      ),
    },
    {
      label: "X / Twitter",
      href: `https://twitter.com/intent/tweet?url=${encUrl}&text=${encTitle}`,
      bg: "#000000",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`,
      bg: "#0a66c2",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "Zalo",
      href: `https://zalo.me/share/?url=${encUrl}&title=${encTitle}`,
      bg: "#0068ff",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 5.94 2 10.8c0 2.78 1.5 5.27 3.84 6.9L4.5 22l4.85-2.42c.85.2 1.74.32 2.65.32 5.52 0 10-3.94 10-8.8S17.52 2 12 2z" />
        </svg>
      ),
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const t = document.createElement("textarea");
      t.value = url;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      document.body.removeChild(t);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2">
        {shares.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Share trên ${s.label}`}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
            style={{ background: s.bg }}
          >
            {s.icon}
          </a>
        ))}
        <button
          onClick={copyLink}
          aria-label="Copy link"
          className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
          style={{ background: copied ? "#5fffaa" : "var(--st-08)", color: copied ? "#0a1438" : "white", border: "1px solid var(--st-12)" }}
        >
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] mr-1" style={{ color: "var(--st-50)" }}>
        Chia sẻ:
      </span>
      {shares.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-[0.82rem] font-semibold text-white transition-transform hover:scale-[1.04]"
          style={{ background: s.bg }}
        >
          {s.icon}
          <span>{s.label}</span>
        </a>
      ))}
      <button
        onClick={copyLink}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-[0.82rem] font-semibold transition-all"
        style={{
          background: copied ? "rgba(95,255,170,0.15)" : "var(--st-04)",
          border: `1px solid ${copied ? "rgba(95,255,170,0.4)" : "var(--st-12)"}`,
          color: copied ? "#5fffaa" : "white",
        }}
      >
        {copied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            <span>Đã copy!</span>
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <span>Copy link</span>
          </>
        )}
      </button>
    </div>
  );
}
