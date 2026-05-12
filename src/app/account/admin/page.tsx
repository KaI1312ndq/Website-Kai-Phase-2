import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

async function getCounts() {
  const sb = getSupabaseAdmin();
  const tables = ["users", "orders", "quiz_leads", "course_applications", "newsletter_subscribers", "comments", "voucher_usage"];
  const results = await Promise.all(
    tables.map(async (t) => {
      const { count } = await sb.from(t).select("*", { count: "exact", head: true });
      return [t, count ?? 0] as const;
    }),
  );
  return Object.fromEntries(results);
}

async function getOrderStats() {
  const sb = getSupabaseAdmin();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sevenDays = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [allTime, last7d, pendingDeliver] = await Promise.all([
    sb.from("orders").select("total, payment_status").eq("payment_status", "paid"),
    sb.from("orders").select("total").eq("payment_status", "paid").gte("created_at", sevenDays.toISOString()),
    sb.from("orders").select("*", { count: "exact", head: true }).eq("payment_status", "paid").neq("delivery_status", "delivered"),
  ]);

  const revAllTime = (allTime.data || []).reduce((s, o) => s + Number(o.total || 0), 0);
  const rev7d = (last7d.data || []).reduce((s, o) => s + Number(o.total || 0), 0);
  return {
    revenueAllTime: revAllTime,
    revenue7d: rev7d,
    pendingDeliver: pendingDeliver.count || 0,
  };
}

async function getRecentActivity() {
  const sb = getSupabaseAdmin();
  const [orders, leads, apps, users] = await Promise.all([
    sb.from("orders").select("order_number, customer_name, total, payment_status, delivery_status, created_at").order("created_at", { ascending: false }).limit(8),
    sb.from("quiz_leads").select("name, quiz_slug, email, created_at").order("created_at", { ascending: false }).limit(8),
    sb.from("course_applications").select("name, course_slug, email, created_at").order("created_at", { ascending: false }).limit(8),
    sb.from("users").select("name, email, created_at").order("created_at", { ascending: false }).limit(8),
  ]);
  return {
    orders: orders.data || [],
    leads: leads.data || [],
    apps: apps.data || [],
    users: users.data || [],
  };
}

export default async function AdminDashboardPage() {
  const [counts, stats, activity] = await Promise.all([getCounts(), getOrderStats(), getRecentActivity()]);

  const metricCards = [
    { label: "Doanh thu (tất cả)", value: `${stats.revenueAllTime.toLocaleString("vi-VN")}đ`, sub: "Đơn đã thanh toán" },
    { label: "Doanh thu 7 ngày", value: `${stats.revenue7d.toLocaleString("vi-VN")}đ`, sub: "Đơn đã thanh toán" },
    { label: "Chờ gửi file", value: stats.pendingDeliver, sub: "Đơn đã thu - chưa gửi", href: "/account/admin/orders?status=paid_undelivered", highlight: stats.pendingDeliver > 0 },
    { label: "Users", value: counts.users, sub: "Đã đăng ký Clerk", href: "/account/admin/users" },
  ];

  const secondaryCards = [
    { label: "Tổng đơn hàng", value: counts.orders, href: "/account/admin/orders" },
    { label: "Quiz leads", value: counts.quiz_leads, href: "/account/admin/leads" },
    { label: "Course applications", value: counts.course_applications, href: "/account/admin/leads?tab=courses" },
    { label: "Newsletter", value: counts.newsletter_subscribers, href: "/account/admin/leads?tab=newsletter" },
    { label: "Comments", value: counts.comments, href: "/account/admin/comments" },
    { label: "Voucher usage", value: counts.voucher_usage, href: "/studio/desk/voucher" },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="t-h2 text-white mb-1.5">Dashboard</h1>
        <p className="text-[0.92rem]" style={{ color: "var(--ink-mute)" }}>
          Tổng quan đơn hàng, leads, users. Update real-time từ Supabase.
        </p>
      </header>

      {/* Primary metrics */}
      <section>
        <h2 className="text-[0.74rem] uppercase tracking-[0.16em] font-semibold mb-3" style={{ color: "var(--ink-mute)" }}>Kết quả kinh doanh</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {metricCards.map((c) => {
            const Inner = (
              <div
                className="p-5 rounded-xl border h-full"
                style={{
                  background: c.highlight ? "linear-gradient(180deg, rgba(255,212,121,0.12), rgba(8,16,43,0.85))" : "linear-gradient(180deg, rgba(20,40,90,0.5), rgba(8,16,43,0.85))",
                  borderColor: c.highlight ? "rgba(255,212,121,0.35)" : "rgba(255,255,255,0.10)",
                }}
              >
                <div className="text-[0.78rem] font-medium mb-2" style={{ color: "var(--ink-mute)" }}>{c.label}</div>
                <div className="text-[1.8rem] font-bold text-white leading-tight">{c.value}</div>
                <div className="text-[0.75rem] mt-1.5" style={{ color: c.highlight ? "#ffd479" : "var(--ink-mute)" }}>{c.sub}</div>
              </div>
            );
            return c.href ? (
              <Link key={c.label} href={c.href} className="block transition hover:scale-[1.01]">{Inner}</Link>
            ) : (
              <div key={c.label}>{Inner}</div>
            );
          })}
        </div>
      </section>

      {/* Secondary metrics */}
      <section>
        <h2 className="text-[0.74rem] uppercase tracking-[0.16em] font-semibold mb-3" style={{ color: "var(--ink-mute)" }}>Đếm nhanh</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {secondaryCards.map((c) => (
            <Link key={c.label} href={c.href} className="block p-4 rounded-lg border transition hover:bg-white/5"
              style={{ background: "rgba(8,16,43,0.6)", borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="text-[1.3rem] font-bold text-white">{c.value}</div>
              <div className="text-[0.74rem] mt-0.5" style={{ color: "var(--ink-mute)" }}>{c.label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section>
        <h2 className="text-[0.74rem] uppercase tracking-[0.16em] font-semibold mb-3" style={{ color: "var(--ink-mute)" }}>Hoạt động gần đây</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ActivityList
            title="Đơn hàng"
            viewAll="/account/admin/orders"
            empty="Chưa có đơn."
            rows={activity.orders.map((o) => ({
              primary: String(o.order_number),
              secondary: String(o.customer_name),
              meta: `${Number(o.total).toLocaleString("vi-VN")}đ`,
              badge: `${o.payment_status}/${o.delivery_status}`,
              time: String(o.created_at),
            }))}
          />
          <ActivityList
            title="Quiz leads"
            viewAll="/account/admin/leads"
            empty="Chưa có lead."
            rows={activity.leads.map((l) => ({
              primary: String(l.name),
              secondary: String(l.email || "(no email)"),
              meta: String(l.quiz_slug),
              time: String(l.created_at),
            }))}
          />
          <ActivityList
            title="Course applications"
            viewAll="/account/admin/leads?tab=courses"
            empty="Chưa có application."
            rows={activity.apps.map((a) => ({
              primary: String(a.name),
              secondary: String(a.email),
              meta: String(a.course_slug),
              time: String(a.created_at),
            }))}
          />
          <ActivityList
            title="Users mới"
            viewAll="/account/admin/users"
            empty="Chưa có user."
            rows={activity.users.map((u) => ({
              primary: String(u.name || "(no name)"),
              secondary: String(u.email),
              meta: "",
              time: String(u.created_at),
            }))}
          />
        </div>
      </section>
    </div>
  );
}

function ActivityList({
  title, viewAll, empty, rows,
}: {
  title: string;
  viewAll: string;
  empty: string;
  rows: Array<{ primary: string; secondary: string; meta: string; badge?: string; time: string }>;
}) {
  return (
    <div className="rounded-xl border" style={{ background: "rgba(8,16,43,0.55)", borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <h3 className="font-bold text-white text-[0.98rem]">{title}</h3>
        <Link href={viewAll} className="text-[0.76rem] font-medium" style={{ color: "#7da9ff" }}>Xem tất cả</Link>
      </div>
      {rows.length === 0 ? (
        <div className="px-5 py-8 text-center text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>{empty}</div>
      ) : (
        <ul>
          {rows.map((r, i) => (
            <li key={i} className="flex items-start justify-between gap-3 px-5 py-3 border-b last:border-b-0" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
              <div className="flex-1 min-w-0">
                <div className="text-[0.88rem] font-semibold text-white truncate">{r.primary}</div>
                <div className="text-[0.76rem] truncate" style={{ color: "var(--ink-mute)" }}>{r.secondary}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  {r.meta && <span className="text-[0.72rem]" style={{ color: "#7da9ff" }}>{r.meta}</span>}
                  {r.badge && <span className="text-[0.68rem] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "var(--ink-mute)" }}>{r.badge}</span>}
                </div>
              </div>
              <div className="text-[0.7rem] flex-shrink-0 pt-0.5" style={{ color: "var(--ink-mute)" }}>
                {new Date(r.time).toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", day: "2-digit", month: "2-digit" })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
