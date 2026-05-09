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
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-4">
          <div
            className="flex items-center justify-between rounded-2xl px-4 md:px-5 h-[60px] transition-all duration-300"
            style={{
              background: scrolled ? "rgba(8,16,43,0.78)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${scrolled ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.08)"}`,
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              boxShadow: scrolled ? "0 12px 40px rgba(5,10,31,0.45)" : "none",
            }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 text-white">
              <span className="relative w-9 h-9 rounded-[10px] flex items-center justify-center text-white font-bold text-[1rem] overflow-hidden" style={{ background: "var(--grad-primary)", boxShadow: "0 4px 14px rgba(20,110,245,0.45)" }}>
                <span className="relative z-10">K</span>
                <span className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4), transparent 60%)" }} />
              </span>
              <span className="text-[1.05rem] font-bold tracking-tight">Kai</span>
              <span className="text-[1.05rem] font-bold grad-text">.</span>
            </Link>

            {/* Center links */}
            <ul className="hidden md:flex items-center gap-0.5 list-none px-1.5 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block px-4 py-1.5 text-[0.86rem] font-medium rounded-full transition-all"
                    style={{ color: "rgba(255,255,255,0.72)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.color = "white"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)"; }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link href="/#contact" className="hidden md:inline-flex btn btn-primary text-[0.85rem] py-2 px-4">
              Liên hệ <span className="arrow">→</span>
            </Link>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
              aria-label="Toggle menu"
            >
              <span className={`block w-[22px] h-[2px] bg-white rounded transition-transform duration-300 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block w-[22px] h-[2px] bg-white rounded transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-[22px] h-[2px] bg-white rounded transition-transform duration-300 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
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
            style={{ background: "rgba(5,10,31,0.96)", backdropFilter: "blur(20px)" }}
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
                  className="text-[1.8rem] font-bold tracking-tight text-white"
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
    </>
  );
}
