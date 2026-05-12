import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import { isAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

const NAV_SECTIONS: Array<{ title: string; items: Array<{ label: string; href: string; external?: boolean }> }> = [
  {
    title: "Tổng quan",
    items: [
      { label: "Dashboard", href: "/account/admin" },
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
      { label: "Tất cả content", href: "/account/admin/content" },
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

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect("/");

  return (
    <>
      <Navbar />
      <GradientBlobs blobs={[
        { variant: "blue", size: 480, top: "-20%", right: "-5%" },
        { variant: "purple", size: 400, bottom: "-30%", left: "-5%", delay: "2s" },
      ]} />
      <main className="relative max-w-[1400px] mx-auto px-4 md:px-8 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
            <div>
              <div className="text-[0.7rem] uppercase tracking-[0.16em] font-semibold mb-1" style={{ color: "#7da9ff" }}>Admin</div>
              <h2 className="text-[1.15rem] font-bold text-white">Quản trị</h2>
            </div>
            {NAV_SECTIONS.map((sec) => (
              <div key={sec.title}>
                <div className="text-[0.68rem] uppercase tracking-[0.14em] font-semibold mb-2 px-3" style={{ color: "var(--ink-mute)" }}>
                  {sec.title}
                </div>
                <nav className="space-y-0.5">
                  {sec.items.map((it) => (
                    <Link
                      key={it.href}
                      href={it.href}
                      target={it.external ? "_blank" : undefined}
                      rel={it.external ? "noopener" : undefined}
                      className="block px-3 py-2 rounded-md text-[0.88rem] text-white/85 hover:bg-white/5 hover:text-white transition"
                    >
                      {it.label}
                      {it.external && <span className="ml-1.5 text-[0.7rem] opacity-50">↗</span>}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </aside>

          {/* Content */}
          <div className="min-w-0">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
