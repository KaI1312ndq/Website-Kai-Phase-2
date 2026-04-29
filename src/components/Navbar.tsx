"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Trang chủ", href: "/" },
    { label: "Về tôi", href: "/#about" },
    { label: "Chuyên môn", href: "/#expertise" },
    { label: "Mentoring", href: "/#mentoring" },
    { label: "Blog", href: "/blog" },
    { label: "Kết quả", href: "/#casestudies" },
  ];

  return (
    <>
      <nav className={`sticky top-0 z-50 border-b border-brand-border transition-all duration-300 ${scrolled ? "py-3" : "py-0"}`}
        style={{ background: "rgba(247,244,239,0.92)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-[1280px] mx-auto px-12 h-16 flex items-center justify-between">
          <Link href="/" className="text-[1.25rem] font-extrabold tracking-tight text-brand-text">
            Kai<span style={{ color: "var(--blue)" }}>.</span>
          </Link>

          <ul className="hidden md:flex gap-8 list-none">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}
                  className="text-[0.85rem] font-medium text-brand-muted hover:text-brand-text transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/#contact"
            className="hidden md:flex items-center gap-2 text-white text-[0.88rem] font-semibold px-5 py-2.5 rounded-lg transition-all hover:-translate-y-0.5"
            style={{ background: "var(--blue)" }}>
            Liên hệ ngay →
          </Link>

          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] p-1 bg-transparent border-none cursor-pointer">
            <span className={`block w-[22px] h-[2px] bg-brand-text rounded transition-transform ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block w-[22px] h-[2px] bg-brand-text rounded transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-[22px] h-[2px] bg-brand-text rounded transition-transform ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 top-16 z-40 flex flex-col items-center justify-center gap-8 transition-opacity duration-300 md:hidden ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(247,244,239,0.97)", backdropFilter: "blur(20px)" }}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
            className="text-[1.8rem] font-extrabold text-brand-text hover:text-blue-primary transition-colors tracking-tight">
            {l.label}
          </Link>
        ))}
        <Link href="/#contact" onClick={() => setMobileOpen(false)}
          className="text-white font-bold text-[1.1rem] px-9 py-3.5 rounded-xl"
          style={{ background: "var(--blue)" }}>
          Liên hệ ngay
        </Link>
      </div>
    </>
  );
}
