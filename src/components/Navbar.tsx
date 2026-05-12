"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Show, UserButton } from "@clerk/nextjs";
import Icon, { type IconName } from "@/components/icons/Icon";
import CartButton from "@/components/cart/CartButton";
import AdminMenuLink from "@/components/AdminMenuLink";
import ThemeToggleButton from "@/components/theme/ThemeToggleButton";

type Submenu = { label: string; desc?: string; href: string; badge?: string; section?: string };
type NavLink = { label: string; href: string; submenu?: Submenu[]; submenuIcon?: IconName; viewAllText?: string };

const links: NavLink[] = [
  { label: "Về tôi", href: "/#about" },
  { label: "Case Study", href: "/#casestudies" },
  {
    label: "Khoá học",
    href: "/courses",
    submenuIcon: "graduation-cap",
    viewAllText: "Xem tất cả khoá học",
    submenu: [
      // Offline / Hybrid - flagship cohort
      {
        section: "Offline · Hybrid",
        label: "Khoá Ecom Foundation",
        desc: "Cohort 8 tuần · live + recording · Slack community · final project",
        href: "/ecom-foundation",
        badge: "Đang mở",
      },
      // Online self-paced mini courses
      {
        section: "Online · Self-paced",
        label: "TikTok Ads từ AZ",
        desc: "15 video · ~5h · 499k · cho fresher + chủ shop tự chạy ads",
        href: "/courses#online",
        badge: "Sắp ra",
      },
      {
        section: "Online · Self-paced",
        label: "Shopee Performance 14 ngày",
        desc: "12 video · ~4h · 399k · setup gian hàng + Ads + voucher",
        href: "/courses#online",
        badge: "Sắp ra",
      },
      {
        section: "Online · Self-paced",
        label: "P&L gian hàng cho người mới",
        desc: "8 video · ~2h · 299k · đọc + làm P&L từ 0",
        href: "/courses#online",
        badge: "Sắp ra",
      },
      {
        section: "Online · Self-paced",
        label: "MBTI x Career Marketing",
        desc: "10 video · ~3h · 299k · cho sinh viên năm 3-4",
        href: "/courses#online",
        badge: "Sắp ra",
      },
    ],
  },
  {
    label: "Tài liệu",
    href: "/resources",
    submenuIcon: "book-open",
    viewAllText: "Xem tất cả tài liệu",
    submenu: [
      {
        section: "Tài liệu free",
        label: "Salary Benchmark, CV Template, P&L...",
        desc: "6 file PDF/Excel + cheatsheet copywriting · nhập email nhận",
        href: "/resources",
        badge: "Free",
      },
      {
        section: "Lương ngành VN 2026",
        label: "Tổng quan lương 20 role Marketing/Ecom",
        desc: "Salary benchmark theo level + top company tuyển dụng",
        href: "/luong",
        badge: "Mới",
      },
      {
        section: "Lương ngành VN 2026",
        label: "Lương Performance Marketer",
        desc: "10-150tr/tháng · TikTok Ads · FB Ads · Google",
        href: "/luong/performance-marketer",
      },
      {
        section: "Lương ngành VN 2026",
        label: "Lương TikTok Shop Specialist",
        desc: "12-100tr/tháng · Hot nhất VN 2026",
        href: "/luong/tiktok-shop-specialist",
      },
      {
        section: "Lương ngành VN 2026",
        label: "Lương Marketing Manager",
        desc: "25-150tr/tháng · Lead team 3-10 người",
        href: "/luong/marketing-manager",
      },
      {
        section: "Lương ngành VN 2026",
        label: "Lương Ecommerce Executive",
        desc: "4-65tr/tháng · Entry-level Ecom phổ biến nhất",
        href: "/luong/ecommerce-executive",
      },
    ],
  },
  {
    label: "Tools",
    href: "/tools",
    submenuIcon: "tool",
    viewAllText: "Xem tất cả tools",
    submenu: [
      {
        label: "Tính Thuế TNCN 2026",
        desc: "So sánh luật 2025 vs 2026 · giảm trừ 15.500.000 · lương Net",
        href: "/tools/tinh-thue-tncn",
        badge: "Hot",
      },
      {
        label: "Tính phí sàn TikTok & Shopee",
        desc: "So sánh Mall vs Non-Mall · phí 2026 · miễn phí",
        href: "/tools/tinh-phi-san",
        badge: "Mới",
      },
      {
        label: "ROAS Calculator",
        desc: "Tính break-even ROAS & target ROAS theo phí sàn 2026",
        href: "/tools/roas-calculator",
        badge: "Mới",
      },
      {
        label: "Mẫu P&L Ecom",
        desc: "Báo cáo lãi lỗ gian hàng - Net Revenue  EBITDA, in PDF",
        href: "/tools/pnl-ecom",
        badge: "Mới",
      },
    ],
  },
  {
    label: "Test",
    href: "/quiz",
    submenuIcon: "test-tube",
    viewAllText: "Xem tất cả 10 test",
    submenu: [
      // === Test bản thân (5 bài) ===
      { section: "Test bản thân", label: "MBTI - 16 kiểu tính cách", desc: "70 câu · 16 type · ~15 phút", href: "/quiz/mbti", badge: "Hot" },
      { section: "Test bản thân", label: "Big Five (OCEAN)", desc: "50 câu · 5 chiều khoa học · ~12 phút", href: "/quiz/test-big-five", badge: "Mới" },
      { section: "Test bản thân", label: "Enneagram 9 kiểu", desc: "45 câu · 9 type + wing · ~10 phút", href: "/quiz/test-enneagram", badge: "Mới" },
      { section: "Test bản thân", label: "EQ - Trí tuệ cảm xúc", desc: "35 câu · 5 chiều Goleman · ~10 phút", href: "/quiz/test-eq", badge: "Mới" },
      { section: "Test bản thân", label: "Dark Triad - 3 trait tối", desc: "27 câu · giải trí · ~5 phút", href: "/quiz/test-dark-triad", badge: "Mới" },

      // === Test Leadership (2 bài) ===
      { section: "Test Leadership", label: "DISC - Phong cách hành xử", desc: "24 câu · D/I/S/C · ~6 phút", href: "/quiz/test-disc", badge: "Mới" },
      { section: "Test Leadership", label: "Phong Cách Lãnh Đạo", desc: "15 câu · 6 phong cách · ~5 phút", href: "/quiz/phong-cach-lanh-dao" },

      // === Test hướng nghiệp (1 bài) ===
      { section: "Test hướng nghiệp", label: "Hướng Nghiệp Marketing & Ecom", desc: "12 câu · 5 archetype · ~5 phút", href: "/quiz/huong-nghiep-marketing" },

      // === Test kiến thức (2 bài) ===
      { section: "Test kiến thức", label: "Chỉ Số Quảng Cáo", desc: "30 câu · ROAS, CPC, CPM, CIR · timer 30s", href: "/quiz/chi-so-quang-cao" },
      { section: "Test kiến thức", label: "Content Frameworks", desc: "30 câu · AIDA, PAS, Cialdini · timer 30s", href: "/quiz/content-frameworks" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Shop", href: "/shop" },
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
              background: scrolled ? "var(--db-78)" : "var(--st-04)",
              border: `1px solid ${scrolled ? "var(--st-10)" : "var(--st-08)"}`,
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              boxShadow: scrolled ? "0 12px 40px rgba(5,10,31,0.45)" : "none",
            }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 text-white group">
              <span className="relative w-9 h-9 rounded-[10px] flex items-center justify-center text-white font-bold text-[1rem] overflow-hidden transition-transform group-hover:scale-[1.05]" style={{ background: "var(--grad-primary)", boxShadow: "0 4px 14px rgba(20,110,245,0.45)" }}>
                <span className="relative z-10">K</span>
                <span className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 20%, var(--st-40), transparent 60%)" }} />
              </span>
              <span className="text-[1.05rem] font-bold tracking-tight leading-none">
                Kai<span className="grad-text">.</span>
              </span>
            </Link>

            {/* Right-aligned links */}
            <ul className="hidden md:flex items-center gap-0.5 list-none px-1.5 py-1.5 rounded-full ml-auto" style={{ background: "var(--st-04)", border: "1px solid var(--st-08)", boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
              {links.map((l) => (
                <li key={l.label} className="relative group">
                  <Link
                    href={l.href}
                    className="flex items-center gap-1 px-4 py-1.5 text-[0.86rem] font-medium rounded-full transition-all"
                    style={{ color: "var(--st-72)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--st-06)"; (e.currentTarget as HTMLElement).style.color = "white"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--st-72)"; }}
                  >
                    {l.label}
                    {l.submenu && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 transition-opacity">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    )}
                  </Link>
                  {l.submenu && (
                    // Dropdown panel - shows on hover. pt-3 below trigger creates a hoverable bridge so the panel doesn't disappear when cursor moves down.
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
                      <div className="rounded-xl p-2 min-w-[340px]" style={{
                        background: "var(--db-95)",
                        border: "1px solid var(--st-10)",
                        boxShadow: "0 24px 60px rgba(5,10,31,0.55)",
                        backdropFilter: "blur(20px) saturate(180%)",
                      }}>
                        {(() => {
                          // Group submenu items by section (if any have section set).
                          // Sections render with a small uppercase header divider above the group.
                          const hasSections = l.submenu!.some((s) => s.section);
                          if (!hasSections) {
                            return l.submenu!.map((s) => (
                              <SubmenuItem key={s.href} s={s} icon={(l.submenuIcon || "tool") as IconName} />
                            ));
                          }
                          const groups = new Map<string, Submenu[]>();
                          for (const s of l.submenu!) {
                            const key = s.section || "Khác";
                            if (!groups.has(key)) groups.set(key, []);
                            groups.get(key)!.push(s);
                          }
                          return Array.from(groups.entries()).map(([section, items], gi) => (
                            <div key={section} className={gi > 0 ? "mt-2 pt-2" : ""} style={gi > 0 ? { borderTop: "1px solid var(--st-06)" } : undefined}>
                              <div className="px-3 pt-1 pb-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--st-42)" }}>
                                {section}
                              </div>
                              {items.map((s) => (
                                <SubmenuItem key={s.href} s={s} icon={(l.submenuIcon || "tool") as IconName} />
                              ))}
                            </div>
                          ));
                        })()}
                        <div className="border-t mt-1 pt-1" style={{ borderColor: "var(--st-06)" }}>
                          <Link href={l.href} className="flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-[0.78rem] font-semibold"
                            style={{ color: "var(--st-60)" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--st-04)"; (e.currentTarget as HTMLElement).style.color = "white"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--st-60)"; }}
                          >
                            <span>{l.viewAllText || `Xem tất cả ${l.label.toLowerCase()}`}</span>
                            <span></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Cart + Auth - desktop */}
            <div className="hidden md:flex items-center gap-2 ml-2">
              <ThemeToggleButton />
              <CartButton />
              <Show when="signed-out">
                <Link
                  href="/sign-in"
                  className="px-4 py-1.5 text-[0.84rem] font-semibold rounded-full transition-all"
                  style={{
                    color: "var(--ink)",
                    background: "var(--grad-primary)",
                    boxShadow: "0 4px 14px rgba(20,110,245,0.35)",
                  }}
                >
                  Đăng nhập
                </Link>
              </Show>
              <Show when="signed-in">
                <AdminMenuLink />
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 ring-2 ring-white/10 hover:ring-white/25 transition-all",
                    },
                  }}
                  userProfileMode="navigation"
                  userProfileUrl="/account/profile"
                />
              </Show>
            </div>

            {/* Mobile cart + burger */}
            <div className="flex md:hidden items-center gap-2">
              <CartButton />
            </div>
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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden overflow-y-auto"
            style={{ background: "rgba(5,10,31,0.97)", backdropFilter: "blur(20px)" }}
          >
            <div className="min-h-full flex flex-col pt-24 pb-10 px-5">
              {/* Auth pill at top */}
              <Show when="signed-out">
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="mb-6"
                >
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3.5 text-[0.95rem] font-bold rounded-2xl text-white"
                    style={{ background: "var(--grad-primary)", boxShadow: "0 8px 24px rgba(20,110,245,0.35)" }}
                  >
                    <Icon name="user" size={16} />
                    Đăng nhập / Đăng ký
                  </Link>
                </motion.div>
              </Show>
              <Show when="signed-in">
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="mb-6 flex items-center justify-between p-3 rounded-2xl"
                  style={{ background: "var(--st-04)", border: "1px solid var(--st-10)" }}
                >
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className="text-[0.9rem] font-semibold text-white pl-2"
                  >
                    Tài khoản của tôi 
                  </Link>
                  <UserButton
                    appearance={{ elements: { avatarBox: "w-10 h-10 ring-2 ring-white/15" } }}
                    userProfileMode="navigation"
                    userProfileUrl="/account/profile"
                  />
                </motion.div>
              </Show>

              {/* Nav links */}
              <ul className="flex flex-col gap-2 list-none">
                {links.map((l, i) => (
                  <motion.li
                    key={l.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.03 }}
                  >
                    {l.submenu ? (
                      <div
                        className="rounded-2xl overflow-hidden"
                        style={{ background: "var(--st-03)", border: "1px solid var(--st-08)" }}
                      >
                        <Link
                          href={l.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3"
                        >
                          <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(20,110,245,0.12)", border: "1px solid rgba(20,110,245,0.22)", color: "#7da9ff" }}>
                            <Icon name={(l.submenuIcon || "tool") as IconName} size={16} />
                          </span>
                          <span className="text-[1rem] font-bold text-white">{l.label}</span>
                          <span className="ml-auto text-[0.7rem] uppercase tracking-[0.14em] font-semibold" style={{ color: "var(--st-45)" }}>
                            {l.submenu.length} mục
                          </span>
                        </Link>
                        <div className="px-2 pb-2 flex flex-col gap-1" style={{ borderTop: "1px solid var(--st-05)" }}>
                          {(() => {
                            const hasSections = l.submenu!.some((s) => s.section);
                            const items = l.submenu!;
                            if (!hasSections) {
                              return items.map((s) => (
                                <MobileSubmenuItem key={s.href} s={s} onClose={() => setMobileOpen(false)} />
                              ));
                            }
                            const groups = new Map<string, Submenu[]>();
                            for (const s of items) {
                              const key = s.section || "Khác";
                              if (!groups.has(key)) groups.set(key, []);
                              groups.get(key)!.push(s);
                            }
                            return Array.from(groups.entries()).map(([section, gi], idx) => (
                              <div key={section} className={idx > 0 ? "mt-2 pt-2" : ""} style={idx > 0 ? { borderTop: "1px solid var(--st-05)" } : undefined}>
                                <div className="px-3 pt-1 pb-1 text-[0.62rem] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--st-42)" }}>
                                  {section}
                                </div>
                                {gi.map((s) => (
                                  <MobileSubmenuItem key={s.href} s={s} onClose={() => setMobileOpen(false)} />
                                ))}
                              </div>
                            ));
                          })()}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={l.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between px-4 py-3.5 rounded-2xl"
                        style={{ background: "var(--st-03)", border: "1px solid var(--st-08)" }}
                      >
                        <span className="text-[1rem] font-bold text-white">{l.label}</span>
                        <Icon name="arrow-right" size={14} color="var(--st-40)" />
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>

              {/* Theme toggle - mobile */}
              <div className="mt-6 pt-4 border-t flex justify-between items-center gap-3" style={{ borderColor: "var(--st-06)" }}>
                <span className="text-[0.85rem] font-semibold" style={{ color: "var(--ink-mute)" }}>Giao diện</span>
                <ThemeToggleButton compact />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SubmenuItem({ s, icon }: { s: Submenu; icon: IconName }) {
  return (
    <Link
      href={s.href}
      className="flex items-start gap-3 px-3 py-2.5 rounded-lg transition-colors"
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(20,110,245,0.10)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
    >
      <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(20,110,245,0.12)", border: "1px solid rgba(20,110,245,0.22)", color: "#7da9ff" }}>
        <Icon name={icon} size={16} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[0.88rem] font-semibold text-white">{s.label}</span>
          {s.badge && <span className="text-[0.6rem] font-bold uppercase tracking-[0.14em] px-1.5 py-0.5 rounded-md whitespace-nowrap flex-shrink-0" style={{ background: "rgba(0,215,34,0.15)", color: "#5fffaa", border: "1px solid rgba(0,215,34,0.3)" }}>{s.badge}</span>}
        </div>
        {s.desc && <div className="text-[0.75rem] mt-0.5 leading-snug" style={{ color: "var(--st-55)" }}>{s.desc}</div>}
      </div>
    </Link>
  );
}

function MobileSubmenuItem({ s, onClose }: { s: Submenu; onClose: () => void }) {
  return (
    <Link
      href={s.href}
      onClick={onClose}
      className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[0.9rem] font-semibold text-white truncate">{s.label}</span>
          {s.badge && (
            <span className="text-[0.55rem] font-bold uppercase tracking-[0.14em] px-1.5 py-0.5 rounded whitespace-nowrap flex-shrink-0" style={{ background: "rgba(0,215,34,0.15)", color: "#5fffaa", border: "1px solid rgba(0,215,34,0.3)" }}>
              {s.badge}
            </span>
          )}
        </div>
        {s.desc && (
          <div className="text-[0.72rem] mt-0.5 leading-snug truncate" style={{ color: "var(--st-50)" }}>
            {s.desc}
          </div>
        )}
      </div>
      <Icon name="arrow-right" size={14} color="var(--st-40)" />
    </Link>
  );
}
