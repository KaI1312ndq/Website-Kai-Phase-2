import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import CVPurchaseActions from "./CVPurchaseActions";

export const metadata: Metadata = {
  title: "Admin · CV Purchases",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

type SearchParams = { status?: string };

async function fetchPurchases(status: string | null) {
  const sb = getSupabaseAdmin();
  let q = sb
    .from("cv_purchases")
    .select("*, users:users(email, name)")
    .order("created_at", { ascending: false })
    .limit(200);
  if (status) q = q.eq("status", status);
  const { data } = await q;
  return data || [];
}

async function fetchProUserCount() {
  const sb = getSupabaseAdmin();
  const { count } = await sb.from("cv_user_quota").select("*", { count: "exact", head: true }).eq("is_pro", true);
  return count || 0;
}

function fmtDate(d: unknown) {
  if (!d) return "-";
  return new Date(d as string).toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit", month: "2-digit", year: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
}

export default async function AdminCVPurchasesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const status = sp.status || "pending";
  const [purchases, proCount] = await Promise.all([
    fetchPurchases(status === "all" ? null : status),
    fetchProUserCount(),
  ]);

  const totalRevenue = purchases
    .filter((p) => p.status === "paid")
    .reduce((s, p) => s + Number(p.amount || 0), 0);

  const filters = [
    { label: "Pending (cần confirm)", value: "pending" },
    { label: "Paid", value: "paid" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Tất cả", value: "all" },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="t-h2 text-white mb-1">CV Pro Purchases</h1>
        <p className="text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>
          {proCount} user đang là Pro · Doanh thu paid: {totalRevenue.toLocaleString("vi-VN")}đ
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = (status || "pending") === f.value;
          return (
            <Link
              key={f.value}
              href={`/account/admin/cv-purchases?status=${f.value}`}
              className="px-3 py-1.5 rounded-md text-[0.8rem] font-semibold"
              style={{
                background: active ? "var(--grad-primary)" : "var(--st-06)",
                color: active ? "white" : "var(--ink-mute)",
              }}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      <div className="text-[0.78rem]" style={{ color: "var(--ink-mute)" }}>
        Hiển thị {purchases.length} record
      </div>

      <div className="rounded-xl border overflow-x-auto" style={{ borderColor: "var(--st-08)" }}>
        <table className="w-full text-[0.85rem]">
          <thead style={{ background: "var(--st-06)" }}>
            <tr>
              <Th>User</Th>
              <Th>Amount</Th>
              <Th>Payment Ref</Th>
              <Th>Status</Th>
              <Th>Created</Th>
              <Th>Paid</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p) => (
              <tr key={String(p.id)} className="border-t hover:bg-white/[0.02]" style={{ borderColor: "var(--st-05)" }}>
                <Td>
                  <div className="text-white font-medium">{(p.users as { email?: string; name?: string })?.name || "(no name)"}</div>
                  <div className="font-mono text-[0.72rem]" style={{ color: "var(--ink-mute)" }}>{(p.users as { email?: string })?.email}</div>
                  <div className="font-mono text-[0.68rem] mt-0.5" style={{ color: "var(--ink-faint)" }}>{String(p.user_id).slice(0, 16)}...</div>
                </Td>
                <Td className="text-white font-bold whitespace-nowrap">
                  {Number(p.amount).toLocaleString("vi-VN")}đ
                </Td>
                <Td className="font-mono text-[0.78rem]">{String(p.payment_ref || "-")}</Td>
                <Td><StatusBadge status={String(p.status)} /></Td>
                <Td className="text-[0.78rem] whitespace-nowrap text-white/70">{fmtDate(p.created_at)}</Td>
                <Td className="text-[0.78rem] whitespace-nowrap text-white/70">{fmtDate(p.paid_at)}</Td>
                <Td>
                  <CVPurchaseActions
                    purchaseId={String(p.id)}
                    userId={String(p.user_id)}
                    status={String(p.status)}
                  />
                </Td>
              </tr>
            ))}
            {purchases.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-12 text-center" style={{ color: "var(--ink-mute)" }}>Không có purchase nào.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left px-4 py-3 font-semibold text-[0.74rem] uppercase tracking-wider whitespace-nowrap" style={{ color: "var(--ink-mute)" }}>{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string }> = {
    pending: { label: "Pending", color: "#ffd479" },
    paid: { label: "Paid", color: "#5fffaa" },
    cancelled: { label: "Cancelled", color: "#ff5a72" },
    refunded: { label: "Refunded", color: "#ff5a72" },
  };
  const cfg = map[status] || { label: status, color: "#7da9ff" };
  return <span className="px-2 py-0.5 rounded text-[0.72rem] font-semibold whitespace-nowrap" style={{ background: `${cfg.color}22`, color: cfg.color }}>{cfg.label}</span>;
}
