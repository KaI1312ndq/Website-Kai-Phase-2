"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type NavItem = { label: string; href: string; matchExact?: boolean };
type NavSection = { title: string; items: NavItem[] };

const NAV: NavSection[] = [
  {
    title: "Tổng quan",
    items: [
      { label: "Dashboard", href: "/account/admin", matchExact: true },
      { label: "Analytics", href: "/account/admin/analytics" },
    ],
  },
  {
    title: "Bán hàng",
    items: [
      { label: "Đơn hàng", href: "/account/admin/orders" },
      { label: "Vouchers", href: "/account/admin/content/voucher" },
    ],
  },
  {
    title: "Lead capture",
    items: [
      { label: "Quiz leads", href: "/account/admin/leads" },
      { label: "Course applications", href: "/account/admin/leads?tab=courses" },
      { label: "Newsletter", href: "/account/admin/leads?tab=newsletter" },
    ],
  },
  {
    title: "Users & UGC",
    items: [
      { label: "Users", href: "/account/admin/users" },
      { label: "Comments", href: "/account/admin/comments" },
    ],
  },
  {
    title: "Content (Sanity)",
    items: [
      { label: "Tất cả content", href: "/account/admin/content", matchExact: true },
      { label: "Blog posts", href: "/account/admin/content/post" },
      { label: "Case studies", href: "/account/admin/content/caseStudy" },
      { label: "Products", href: "/account/admin/content/product" },
      { label: "Testimonials", href: "/account/admin/content/testimonial" },
      { label: "Brands", href: "/account/admin/content/brand" },
      { label: "Timeline", href: "/account/admin/content/timeline" },
      { label: "Site settings", href: "/account/admin/content/settings" },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname() || "";
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get("tab") || "";
  const currentQuery = currentTab ? `?tab=${currentTab}` : "";

  function isActive(item: NavItem) {
    const [itemPath, itemQuery] = item.href.split("?");
    if (item.matchExact) {
      // Exact match: pathname phải đúng + tab phải match (hoặc cả 2 không có tab)
      if (pathname !== itemPath) return false;
      const itemTab = new URLSearchParams(itemQuery || "").get("tab") || "";
      return itemTab === currentTab;
    }
    // Lead với tab param: chỉ active khi tab khớp
    if (itemQuery && itemQuery.includes("tab=")) {
      const itemTab = new URLSearchParams(itemQuery).get("tab");
      return pathname === itemPath && itemTab === currentTab;
    }
    // Leads page mặc định (không tab): chỉ active khi không có tab khác
    if (itemPath === "/account/admin/leads" && pathname === "/account/admin/leads") {
      return !currentTab;
    }
    // Default: startsWith
    return pathname === itemPath || pathname.startsWith(itemPath + "/");
  }

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      {/* Header */}
      <div className="px-3 mb-6">
        <div className="text-[0.62rem] uppercase tracking-[0.22em] font-bold mb-1" style={{ color: "#7da9ff" }}>Admin</div>
        <div className="text-[1.15rem] font-bold text-white leading-tight">Quản trị</div>
      </div>

      {/* Sections */}
      <nav className="space-y-7">
        {NAV.map((sec, secIdx) => (
          <div key={sec.title}>
            {secIdx > 0 && <div className="mx-3 mb-5 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />}
            <div
              className="text-[0.62rem] uppercase tracking-[0.18em] font-semibold mb-2 px-3"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {sec.title}
            </div>
            <ul className="space-y-0.5">
              {sec.items.map((it) => {
                const active = isActive(it);
                return (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      className="group relative flex items-center gap-2 pl-4 pr-3 py-1.5 rounded-md text-[0.875rem] transition"
                      style={{
                        color: active ? "#ffffff" : "rgba(255,255,255,0.7)",
                        background: active ? "rgba(122,169,255,0.10)" : "transparent",
                        fontWeight: active ? 600 : 500,
                      }}
                    >
                      {/* Active accent bar */}
                      <span
                        className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r"
                        style={{
                          background: active ? "linear-gradient(180deg, #4ad6ff, #7a3dff)" : "transparent",
                          transition: "background 0.15s",
                        }}
                      />
                      <span className="truncate">{it.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-8 mx-3 pt-5 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <Link
          href="/"
          className="block text-[0.78rem] py-1.5 px-2 rounded hover:bg-white/5 transition"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Về trang chính
        </Link>
      </div>
    </aside>
  );
}
