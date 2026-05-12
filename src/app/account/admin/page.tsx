import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import { isAdmin } from "@/lib/admin";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

async function getCounts() {
  const sb = getSupabaseAdmin();
  const tables = [
    "users",
    "orders",
    "quiz_leads",
    "course_applications",
    "newsletter_subscribers",
    "comments",
    "voucher_usage",
  ];
  const results = await Promise.all(
    tables.map(async (t) => {
      const { count } = await sb.from(t).select("*", { count: "exact", head: true });
      return [t, count ?? 0] as const;
    }),
  );
  return Object.fromEntries(results);
}

async function getRecentActivity() {
  const sb = getSupabaseAdmin();
  const [orders, leads, apps, users] = await Promise.all([
    sb.from("orders").select("order_number, customer_name, total, payment_status, created_at").order("created_at", { ascending: false }).limit(5),
    sb.from("quiz_leads").select("name, quiz_slug, email, created_at").order("created_at", { ascending: false }).limit(5),
    sb.from("course_applications").select("name, course_slug, email, created_at").order("created_at", { ascending: false }).limit(5),
    sb.from("users").select("name, email, created_at").order("created_at", { ascending: false }).limit(5),
  ]);
  return {
    orders: orders.data || [],
    leads: leads.data || [],
    apps: apps.data || [],
    users: users.data || [],
  };
}

export default async function AdminDashboardPage() {
  if (!(await isAdmin())) redirect("/");

  const [counts, activity] = await Promise.all([getCounts(), getRecentActivity()]);

  const cards = [
    { label: "Đơn hàng", count: counts.orders, href: "/account/admin/orders", icon: "🛒" },
    { label: "Quiz leads", count: counts.quiz_leads, href: "/account/admin/leads", icon: "🎯" },
    { label: "Course apply", count: counts.course_applications, href: "/account/admin/leads#courses", icon: "📚" },
    { label: "Users", count: counts.users, href: "/account/admin/users", icon: "👤" },
    { label: "Newsletter", count: counts.newsletter_subscribers, href: "/account/admin/leads#newsletter", icon: "📧" },
    { label: "Comments", count: counts.comments, href: "/account/admin/comments", icon: "💬" },
  ];

  return (
    <>
      <Navbar />
      <GradientBlobs blobs={[{ variant: "blue", size: 480, top: "-20%", right: "-5%" }, { variant: "purple", size: 400, bottom: "-30%", left: "-5%", delay: "2s" }]} />
      <main className="relative max-w-[1200px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="mb-10">
          <div className="section-tag mb-3">Admin</div>
          <h1 className="t-h2 text-white">Dashboard</h1>
          <p className="text-[0.95rem] mt-2" style={{ color: "var(--ink-mute)" }}>
            Quản lý đơn hàng, leads, user. Data từ Supabase.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="block p-5 rounded-xl border transition hover:scale-[1.02]"
              style={{
                background: "linear-gradient(180deg, rgba(20,40,90,0.5), rgba(8,16,43,0.85))",
                borderColor: "rgba(255,255,255,0.10)",
              }}
            >
              <div className="text-2xl mb-2">{c.icon}</div>
              <div className="text-[2rem] font-bold text-white">{c.count}</div>
              <div className="text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>{c.label}</div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ActivityCard title="Đơn hàng gần đây" rows={activity.orders.map((o) => ({
            primary: o.order_number,
            secondary: o.customer_name,
            meta: `${Number(o.total).toLocaleString("vi-VN")}đ · ${o.payment_status}`,
            time: o.created_at,
          }))} viewAll="/account/admin/orders" />

          <ActivityCard title="Quiz leads mới" rows={activity.leads.map((l) => ({
            primary: l.name,
            secondary: l.email || "",
            meta: l.quiz_slug,
            time: l.created_at,
          }))} viewAll="/account/admin/leads" />

          <ActivityCard title="Course applications" rows={activity.apps.map((a) => ({
            primary: a.name,
            secondary: a.email,
            meta: a.course_slug,
            time: a.created_at,
          }))} viewAll="/account/admin/leads#courses" />

          <ActivityCard title="User mới" rows={activity.users.map((u) => ({
            primary: u.name || "(no name)",
            secondary: u.email,
            meta: "",
            time: u.created_at,
          }))} viewAll="/account/admin/users" />
        </div>
      </main>
      <Footer />
    </>
  );
}

function ActivityCard({ title, rows, viewAll }: { title: string; rows: Array<{ primary: string; secondary: string; meta: string; time: string }>; viewAll: string }) {
  return (
    <div className="p-5 rounded-xl border" style={{ background: "rgba(8,16,43,0.6)", borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white text-[1rem]">{title}</h3>
        <Link href={viewAll} className="text-[0.78rem]" style={{ color: "#7da9ff" }}>Xem tất cả -&gt;</Link>
      </div>
      {rows.length === 0 ? (
        <div className="text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>Chưa có data.</div>
      ) : (
        <div className="space-y-3">
          {rows.map((r, i) => (
            <div key={i} className="flex items-start justify-between gap-3 pb-3 border-b last:border-b-0" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <div className="flex-1 min-w-0">
                <div className="text-[0.9rem] font-semibold text-white truncate">{r.primary}</div>
                <div className="text-[0.78rem] truncate" style={{ color: "var(--ink-mute)" }}>{r.secondary}</div>
                {r.meta && <div className="text-[0.72rem] mt-0.5" style={{ color: "#7da9ff" }}>{r.meta}</div>}
              </div>
              <div className="text-[0.7rem] flex-shrink-0" style={{ color: "var(--ink-mute)" }}>
                {new Date(r.time).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
