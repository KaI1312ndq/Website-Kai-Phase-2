import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import OrderActions from "./OrderActions";

export const metadata: Metadata = {
  title: "Admin · Đơn hàng",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

type SearchParams = {
  status?: string;
  q?: string;
  from?: string;
  to?: string;
  page?: string;
};

const PAGE_SIZE = 30;

async function fetchOrders(sp: SearchParams) {
  const sb = getSupabaseAdmin();
  let query = sb.from("orders").select("*", { count: "exact" }).order("created_at", { ascending: false });

  // Status filter
  if (sp.status === "pending") query = query.eq("payment_status", "unpaid");
  else if (sp.status === "paid_undelivered") query = query.eq("payment_status", "paid").neq("delivery_status", "delivered");
  else if (sp.status === "delivered") query = query.eq("delivery_status", "delivered");
  else if (sp.status === "failed") query = query.eq("delivery_status", "failed");

  // Search q (orderNumber / email / name)
  if (sp.q && sp.q.trim()) {
    const q = sp.q.trim().replace(/[%,]/g, "");
    query = query.or(`order_number.ilike.%${q}%,customer_email.ilike.%${q}%,customer_name.ilike.%${q}%`);
  }

  // Date range
  if (sp.from) query = query.gte("created_at", new Date(sp.from).toISOString());
  if (sp.to) {
    const to = new Date(sp.to);
    to.setHours(23, 59, 59, 999);
    query = query.lte("created_at", to.toISOString());
  }

  const page = Math.max(1, parseInt(sp.page || "1", 10) || 1);
  const start = (page - 1) * PAGE_SIZE;
  query = query.range(start, start + PAGE_SIZE - 1);

  const { data, count } = await query;
  return { rows: data || [], total: count || 0, page };
}

export default async function AdminOrdersPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const { rows, total, page } = await fetchOrders(sp);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const statusFilters = [
    { label: "Tất cả", value: "" },
    { label: "Chờ thanh toán", value: "pending" },
    { label: "Đã thu, chưa gửi", value: "paid_undelivered" },
    { label: "Đã gửi file", value: "delivered" },
    { label: "Gửi lỗi", value: "failed" },
  ];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="t-h2 text-white mb-1">Đơn hàng</h1>
          <p className="text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>
            Hiển thị {rows.length} / {total} đơn · Trang {page}/{totalPages}
          </p>
        </div>
      </header>

      {/* Filter bar */}
      <form method="get" action="/account/admin/orders" className="rounded-xl border p-4 space-y-3" style={{ background: "var(--db-55)", borderColor: "var(--st-08)" }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Field label="Tìm kiếm">
            <input name="q" defaultValue={sp.q || ""} placeholder="Mã đơn / email / tên..." className="input-dark" />
          </Field>
          <Field label="Trạng thái">
            <select name="status" defaultValue={sp.status || ""} className="input-dark">
              {statusFilters.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Từ ngày">
            <input type="date" name="from" defaultValue={sp.from || ""} className="input-dark" />
          </Field>
          <Field label="Đến ngày">
            <input type="date" name="to" defaultValue={sp.to || ""} className="input-dark" />
          </Field>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-md text-[0.85rem] font-semibold text-white" style={{ background: "var(--grad-primary)" }}>
            Áp dụng
          </button>
          <Link href="/account/admin/orders" className="px-4 py-2 rounded-md text-[0.85rem] font-medium text-white/80 border" style={{ borderColor: "var(--st-15)" }}>
            Reset
          </Link>
        </div>
      </form>

      {/* Table */}
      <div className="rounded-xl border overflow-x-auto" style={{ borderColor: "var(--st-08)" }}>
        <table className="w-full text-[0.85rem]">
          <thead style={{ background: "var(--st-04)" }}>
            <tr>
              <Th>Mã đơn</Th>
              <Th>Khách hàng</Th>
              <Th>Tổng tiền</Th>
              <Th>Thanh toán</Th>
              <Th>Trạng thái gửi</Th>
              <Th>Ngày tạo</Th>
              <Th>Hành động</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((o) => (
              <tr key={o.id as string} className="border-t hover:bg-white/[0.02]" style={{ borderColor: "var(--st-05)" }}>
                <Td>
                  <Link href={`/account/admin/orders/${o.id}`} className="font-mono text-[0.78rem] hover:underline" style={{ color: "#7da9ff" }}>
                    {String(o.order_number)}
                  </Link>
                </Td>
                <Td>
                  <div className="text-white font-medium">{String(o.customer_name)}</div>
                  <div className="text-[0.72rem]" style={{ color: "var(--ink-mute)" }}>{String(o.customer_email)}</div>
                  {o.customer_phone ? <div className="text-[0.7rem]" style={{ color: "var(--ink-mute)" }}>{String(o.customer_phone)}</div> : null}
                </Td>
                <Td className="text-white font-semibold whitespace-nowrap">{Number(o.total).toLocaleString("vi-VN")}đ</Td>
                <Td><PaymentBadge status={String(o.payment_status)} /></Td>
                <Td><DeliveryBadge status={String(o.delivery_status)} /></Td>
                <Td className="text-[0.74rem] text-white/60 whitespace-nowrap">
                  {new Date(o.created_at as string).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })}
                </Td>
                <Td>
                  <OrderActions orderId={o.id as string} paymentStatus={String(o.payment_status)} deliveryStatus={String(o.delivery_status)} />
                </Td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-[0.9rem]" style={{ color: "var(--ink-mute)" }}>Không có đơn nào khớp filter.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const params = new URLSearchParams();
            if (sp.q) params.set("q", sp.q);
            if (sp.status) params.set("status", sp.status);
            if (sp.from) params.set("from", sp.from);
            if (sp.to) params.set("to", sp.to);
            params.set("page", String(p));
            const active = p === page;
            return (
              <Link key={p} href={`/account/admin/orders?${params.toString()}`}
                className="w-9 h-9 inline-flex items-center justify-center rounded text-[0.85rem] font-semibold"
                style={{ background: active ? "var(--grad-primary)" : "var(--st-06)", color: active ? "white" : "var(--ink-mute)" }}>
                {p}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[0.72rem] uppercase tracking-wider font-medium mb-1.5" style={{ color: "var(--ink-mute)" }}>{label}</span>
      {children}
    </label>
  );
}
function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left px-4 py-3 font-semibold text-[0.74rem] uppercase tracking-wider whitespace-nowrap" style={{ color: "var(--ink-mute)" }}>{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}

function PaymentBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string }> = {
    paid: { label: "Đã thanh toán", color: "#5fffaa" },
    unpaid: { label: "Chưa thanh toán", color: "#ffd479" },
    refunded: { label: "Hoàn tiền", color: "#ff5a72" },
  };
  const cfg = map[status] || { label: status, color: "#7da9ff" };
  return <span className="px-2 py-0.5 rounded text-[0.7rem] font-semibold whitespace-nowrap" style={{ background: `${cfg.color}22`, color: cfg.color }}>{cfg.label}</span>;
}
function DeliveryBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string }> = {
    delivered: { label: "Đã gửi", color: "#5fffaa" },
    pending: { label: "Chờ gửi", color: "#7da9ff" },
    failed: { label: "Gửi lỗi", color: "#ff5a72" },
  };
  const cfg = map[status] || { label: status, color: "#7da9ff" };
  return <span className="px-2 py-0.5 rounded text-[0.7rem] font-semibold whitespace-nowrap" style={{ background: `${cfg.color}22`, color: cfg.color }}>{cfg.label}</span>;
}
