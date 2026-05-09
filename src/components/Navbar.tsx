"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Về tôi", href: "/#about" },
  { label: "Chuyên môn", href: "/#expertise" },
  { label: "Mentoring", href: "/#mentoring" },
  { label: "Kết quả", href: "/#casestudies" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[1.1rem] font-semibold tracking-tight text-ink">
            <span className="w-7 h-7 rounded-wf flex items-center justify-center text-white font-bold text-[0.85rem]" style={{ background: "var(--grad-primary)" }}>
              N
            </span>
            <span>NĐQ</span>
            <span className="grad-text">.</span>
          </Link>

          <ul className="hidden md:flex items-center gap-1 list-none">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="relative px-3.5 py-2 text-[0.92rem] font-medium text-gray-700 hover:text-ink transition-colors group"
                >
                  {l.label}
                  <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{ background: "var(--grad-text)" }} />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/#contact"
            className="hidden md:inline-flex btn btn-primary text-[0.88rem] py-2.5 px-4"
          >
            Liên hệ
            <span className="arrow">→</span>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className={`block w-[22px] h-[2px] bg-ink rounded transition-transform duration-300 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block w-[22px] h-[2px] bg-ink rounded transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-[22px] h-[2px] bg-ink rounded transition-transform duration-300 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 md:hidden"
            style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)" }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[1.8rem] font-semibold tracking-tight text-ink"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + links.length * 0.05 }}>
              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="btn btn-primary text-[1rem] mt-4"
              >
                Liên hệ ngay <span className="arrow">→</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-[68px]" aria-hidden />
    </>
  );
}
