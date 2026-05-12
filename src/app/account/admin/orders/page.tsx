import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import { isAdmin } from "@/lib/admin";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import OrderActions from "./OrderActions";

export const metadata: Metadata = {
  title: "Admin · Đơn hàng",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

async function getOrders(status: string | null) {
  const sb = getSupabaseAdmin();
  let query = sb.from("orders").select("*").order("created_at", { ascending: false }).limit(100);
  if (status === "pending") query = query.eq("payment_status", "unpaid");
  else if (status === "paid_undelivered") query = query.eq("payment_status", "paid").neq("delivery_status", "delivered");
  else if (status === "delivered") query = query.eq("delivery_status", "delivered");
  const { data } = await query;
  return data || [];
}

export default async function AdminOrdersPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  if (!(await isAdmin())) redirect("/");
  const { status } = await searchParams;

  const orders = await getOrders(status || null);

  const filters = [
    { label: "Tất cả", value: "" },
    { label: "Chờ thanh toán", value: "pending" },
    { label: "Đã thu tiền - chưa gửi", value: "paid_undelivered" },
    { label: "Đã gửi file", value: "delivered" },
  ];

  return (
    <>
      <Navbar />
      <GradientBlobs blobs={[{ variant: "blue", size: 480, top: "-20%", right: "-5%" }, { variant: "purple", size: 400, bottom: "-30%", left: "-5%", delay: "2s" }]} />
      <main className="relative max-w-[1200px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <Link href="/account/admin" className="text-[0.8rem]" style={{ color: "#7da9ff" }}>&larr; Dashboard</Link>
            <h1 className="t-h2 text-white mt-2">Đơn hàng ({orders.length})</h1>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((f) => {
            const active = (status || "") === f.value;
            return (
              <Link
                key={f.value}
                href={f.value ? `/account/admin/orders?status=${f.value}` : "/account/admin/orders"}
                className="px-3 py-1.5 rounded-md text-[0.8rem] font-medium"
                style={{
                  background: active ? "var(--grad-primary)" : "rgba(255,255,255,0.06)",
                  color: active ? "white" : "var(--ink-mute)",
                }}
              >
                {f.label}
              </Link>
            );
          })}
        </div>

        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <table className="w-full text-[0.85rem]">
            <thead style={{ background: "rgba(255,255,255,0.04)" }}>
              <tr>
                <Th>Mã đơn</Th><Th>Khách</Th><Th>Tổng</Th><Th>TT</Th><Th>Gửi</Th><Th>Ngày</Th><Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id as string} className="border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <Td>
                    <Link href={`/shop/order/${o.order_number}`} className="font-mono text-[0.78rem]" style={{ color: "#7da9ff" }}>
                      {String(o.order_number)}
                    </Link>
                  </Td>
                  <Td>
                    <div className="text-white">{String(o.customer_name)}</div>
                    <div className="text-[0.7rem]" style={{ color: "var(--ink-mute)" }}>{String(o.customer_email)}</div>
                  </Td>
                  <Td className="text-white font-semibold">{Number(o.total).toLocaleString("vi-VN")}đ</Td>
                  <Td>
                    <Badge label={String(o.payment_status)} color={o.payment_status === "paid" ? "#5fffaa" : "#ffd479"} />
                  </Td>
                  <Td>
                    <Badge label={String(o.delivery_status)} color={o.delivery_status === "delivered" ? "#5fffaa" : o.delivery_status === "failed" ? "#ff5a72" : "#7da9ff"} />
                  </Td>
                  <Td className="text-[0.75rem] text-white/60">
                    {new Date(o.created_at as string).toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                  </Td>
                  <Td>
                    <OrderActions
                      orderId={o.id as string}
                      paymentStatus={String(o.payment_status)}
                      deliveryStatus={String(o.delivery_status)}
                    />
                  </Td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center" style={{ color: "var(--ink-mute)" }}>Không có đơn nào.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left px-4 py-3 font-semibold text-[0.78rem] uppercase tracking-wider" style={{ color: "var(--ink-mute)" }}>{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}
function Badge({ label, color }: { label: string; color: string }) {
  return <span className="px-2 py-0.5 rounded text-[0.7rem] font-semibold" style={{ background: `${color}22`, color }}>{label}</span>;
}
