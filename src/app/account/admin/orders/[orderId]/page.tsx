import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import OrderDetailActions from "./OrderDetailActions";

export const metadata: Metadata = {
  title: "Admin · Order detail",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

async function getOrder(orderId: string) {
  const sb = getSupabaseAdmin();
  const [orderRes, itemsRes, voucherRes] = await Promise.all([
    sb.from("orders").select("*").eq("id", orderId).maybeSingle(),
    sb.from("order_items").select("*").eq("order_id", orderId).order("created_at", { ascending: true }),
    sb.from("voucher_usage").select("*").eq("order_id", orderId),
  ]);
  return {
    order: orderRes.data,
    items: itemsRes.data || [],
    voucher: voucherRes.data?.[0] || null,
  };
}

function fmtDate(d: unknown) {
  if (!d) return "-";
  return new Date(d as string).toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const { order, items, voucher } = await getOrder(orderId);
  if (!order) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <Link href="/account/admin/orders" className="text-[0.78rem] hover:underline" style={{ color: "#7da9ff" }}>
            ← Quay lại danh sách đơn
          </Link>
          <h1 className="t-h2 text-white mt-2">Đơn #{String(order.order_number)}</h1>
          <p className="text-[0.82rem]" style={{ color: "var(--ink-mute)" }}>
            ID: <span className="font-mono">{String(order.id)}</span>
          </p>
        </div>
        <OrderDetailActions
          orderId={String(order.id)}
          orderNumber={String(order.order_number)}
          paymentStatus={String(order.payment_status)}
          deliveryStatus={String(order.delivery_status)}
        />
      </div>

      {/* Status row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatusCard label="Thanh toán" value={String(order.payment_status)}
          color={order.payment_status === "paid" ? "#5fffaa" : "#ffd479"} />
        <StatusCard label="Trạng thái gửi" value={String(order.delivery_status)}
          color={order.delivery_status === "delivered" ? "#5fffaa" : order.delivery_status === "failed" ? "#ff5a72" : "#7da9ff"} />
        <StatusCard label="Tổng tiền" value={`${Number(order.total).toLocaleString("vi-VN")}đ`}
          color="#ffffff" />
        <StatusCard label="Ngày tạo" value={fmtDate(order.created_at)} color="var(--ink-soft)" small />
      </div>

      {/* Customer + Order summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Khách hàng">
          <Field label="Họ tên" value={String(order.customer_name)} />
          <Field label="Email" value={String(order.customer_email)} mono />
          <Field label="SĐT" value={String(order.customer_phone || "-")} />
          {order.user_id ? (
            <Field label="Clerk User ID" value={String(order.user_id)} mono />
          ) : (
            <Field label="Loại" value="Guest checkout" />
          )}
        </Section>

        <Section title="Tài chính">
          <Field label="Subtotal" value={`${Number(order.subtotal).toLocaleString("vi-VN")}đ`} />
          <Field label="Bundle discount" value={`-${Number(order.discount).toLocaleString("vi-VN")}đ`} />
          {order.voucher_code && (
            <>
              <Field label="Voucher" value={String(order.voucher_code)} mono />
              <Field label="Voucher discount" value={`-${Number(order.voucher_discount).toLocaleString("vi-VN")}đ`} />
            </>
          )}
          <Field label="TOTAL" value={`${Number(order.total).toLocaleString("vi-VN")}đ`} highlight />
          {order.payment_method && <Field label="Phương thức" value={String(order.payment_method)} />}
        </Section>
      </div>

      {/* Items */}
      <Section title={`Sản phẩm (${items.length})`}>
        <div className="space-y-2">
          {items.map((it) => (
            <div key={String(it.id)} className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg" style={{ background: "var(--st-04)" }}>
              <div className="flex-1 min-w-0">
                <div className="text-[0.95rem] font-medium text-white">{String(it.title_snapshot)}</div>
                <div className="text-[0.72rem] font-mono" style={{ color: "var(--ink-mute)" }}>{String(it.product_sanity_id)}</div>
              </div>
              <div className="text-[0.85rem] whitespace-nowrap" style={{ color: "var(--ink-mute)" }}>x{Number(it.qty || 1)}</div>
              <div className="text-[0.95rem] font-semibold whitespace-nowrap text-white">
                {Number(it.price_snapshot).toLocaleString("vi-VN")}đ
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Delivery + Email tracking */}
      <Section title="Delivery & email tracking">
        <Field label="Download token" value={order.download_token ? String(order.download_token).slice(0, 20) + "..." : "-"} mono />
        <Field label="Download expires" value={fmtDate(order.download_expires_at)} />
        <Field label="Paid at" value={fmtDate(order.paid_at)} />
        <Field label="Delivered at" value={fmtDate(order.delivered_at)} />
        <Field label="Resend email ID" value={order.resend_email_id ? String(order.resend_email_id).slice(0, 20) + "..." : "-"} mono />
        <div className="mt-3 pt-3 border-t flex flex-wrap gap-2" style={{ borderColor: "var(--st-08)" }}>
          {order.email_delivered ? <Tag label="Delivered" color="#5fffaa" /> : <Tag label="Not delivered" color="var(--ink-faint)" />}
          {order.email_opened ? <Tag label={`Opened ${fmtDate(order.email_opened_at)}`} color="#7da9ff" /> : null}
          {order.email_clicked ? <Tag label={`Clicked ${fmtDate(order.email_clicked_at)}`} color="#a78bff" /> : null}
          {order.email_bounced ? <Tag label="Bounced" color="#ff5a72" /> : null}
        </div>
      </Section>

      {/* Voucher usage */}
      {voucher && (
        <Section title="Voucher usage">
          <Field label="Code" value={String(voucher.voucher_code)} mono />
          <Field label="Discount applied" value={`${Number(voucher.discount_amount).toLocaleString("vi-VN")}đ`} />
          <Field label="Used at" value={fmtDate(voucher.used_at)} />
        </Section>
      )}

      {/* Meta / Notes */}
      {order.notes && (
        <Section title="Admin notes">
          <p className="text-[0.92rem] whitespace-pre-wrap" style={{ color: "var(--ink-soft)" }}>{String(order.notes)}</p>
        </Section>
      )}
    </div>
  );
}

function StatusCard({ label, value, color, small }: { label: string; value: string; color: string; small?: boolean }) {
  return (
    <div className="rounded-xl p-4" style={{ background: "var(--st-04)", border: "1px solid var(--st-08)" }}>
      <div className="text-[0.65rem] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--ink-mute)" }}>{label}</div>
      <div className={small ? "text-[0.85rem] font-medium" : "text-[1.05rem] font-bold"} style={{ color }}>{value}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: "var(--st-03)", border: "1px solid var(--st-08)" }}>
      <h2 className="text-[0.95rem] font-bold text-white mb-3">{title}</h2>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Field({ label, value, mono, highlight }: { label: string; value: string; mono?: boolean; highlight?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3 py-1.5 text-[0.88rem]">
      <span style={{ color: "var(--ink-mute)" }}>{label}</span>
      <span
        className={`text-right break-all ${mono ? "font-mono text-[0.78rem]" : ""}`}
        style={{
          color: highlight ? "#5fffaa" : "var(--ink-soft)",
          fontWeight: highlight ? 700 : 500,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span className="text-[0.7rem] font-semibold px-2 py-1 rounded" style={{ background: `${color}1f`, color }}>
      {label}
    </span>
  );
}
