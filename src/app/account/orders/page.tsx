import type { Metadata } from "next";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import Icon from "@/components/icons/Icon";
import { getOrdersForUser } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Đơn hàng của tôi",
  description: "Xem lại đơn hàng + tải lại file đã mua.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type OrderItem = { title: string; price: number };
type Order = {
  _id: string;
  orderNumber: string;
  customer?: { name?: string; email?: string };
  items?: OrderItem[];
  total: number;
  discount?: number;
  paymentStatus: "pending" | "paid" | "cancelled";
  deliveryStatus: "pending" | "delivered" | "failed";
  downloadToken?: string;
  downloadExpiresAt?: string;
  createdAt: string;
};

function statusBadge(o: Order) {
  if (o.paymentStatus === "cancelled") return { label: "Huỷ", color: "#ff5a72", bg: "rgba(255,90,114,0.12)" };
  if (o.paymentStatus === "paid" && o.deliveryStatus === "delivered") return { label: "Đã gửi file", color: "#5fffaa", bg: "rgba(95,255,170,0.12)" };
  if (o.paymentStatus === "paid") return { label: "Chờ gửi file", color: "#ffd479", bg: "rgba(255,212,121,0.12)" };
  return { label: "Chờ thanh toán", color: "#7da9ff", bg: "rgba(122,169,255,0.12)" };
}

function isTokenExpired(o: Order) {
  if (!o.downloadExpiresAt) return false;
  return new Date(o.downloadExpiresAt).getTime() < Date.now();
}

export default async function OrdersPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses[0]?.emailAddress || null;

  const orders = (await getOrdersForUser({ clerkUserId: userId, email })) as Order[] | null;
  const list = Array.isArray(orders) ? orders : [];

  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden">
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "blue", size: 480, top: "-20%", right: "-5%" },
            { variant: "purple", size: 400, bottom: "-30%", left: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1000px] mx-auto px-6 md:px-10 pt-28 pb-16 md:pt-32 md:pb-20">
            <div className="flex items-center gap-2 text-[0.82rem] mb-4" style={{ color: "var(--ink-mute)" }}>
              <Link href="/account" className="hover:text-white transition-colors">Tài khoản</Link>
              <span>/</span>
              <span className="text-white">Đơn hàng</span>
            </div>
            <h1 className="t-h1 leading-[1.1] text-white mb-3">
              Đơn hàng <span className="grad-text">của tôi.</span>
            </h1>
            <p className="t-body-lg max-w-[600px] mb-10" style={{ color: "var(--ink-soft)" }}>
              Tất cả đơn liên kết với tài khoản hoặc email <strong className="text-white">{email}</strong>. File đã mua tải lại không giới hạn.
            </p>

            {list.length === 0 ? (
              <div className="rounded-2xl p-10 text-center" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "var(--st-04)", border: "1px solid var(--line)" }}>
                  <Icon name="shopping-cart" size={28} color="var(--st-40)" />
                </div>
                <h2 className="text-[1.1rem] font-bold text-white mb-2">Chưa có đơn nào</h2>
                <p className="text-[0.92rem] mb-5" style={{ color: "var(--ink-mute)" }}>
                  Khám phá Shop để xem templates + bundle giảm tới 50%.
                </p>
                <Link
                  href="/shop"
                  className="inline-block px-5 py-2.5 rounded-lg text-[0.9rem] font-semibold text-white"
                  style={{ background: "var(--grad-primary)", boxShadow: "0 4px 14px rgba(20,110,245,0.35)" }}
                >
                  Đến Shop 
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {list.map((o) => {
                  const badge = statusBadge(o);
                  const canDownload = o.paymentStatus === "paid" && o.deliveryStatus === "delivered" && o.downloadToken && !isTokenExpired(o);
                  const expired = o.paymentStatus === "paid" && o.deliveryStatus === "delivered" && isTokenExpired(o);
                  const date = new Date(o.createdAt).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
                  return (
                    <div
                      key={o._id}
                      className="rounded-2xl p-5 md:p-6"
                      style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-[1rem] font-bold text-white font-mono">#{o.orderNumber}</span>
                            <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] px-2 py-0.5 rounded" style={{ background: badge.bg, color: badge.color }}>
                              {badge.label}
                            </span>
                          </div>
                          <div className="text-[0.78rem]" style={{ color: "var(--ink-mute)" }}>
                            Tạo {date} · {o.items?.length || 0} sản phẩm
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[1.25rem] font-extrabold grad-text">{o.total.toLocaleString("vi-VN")}đ</div>
                          {o.discount ? (
                            <div className="text-[0.72rem]" style={{ color: "#5fffaa" }}>tiết kiệm {o.discount.toLocaleString("vi-VN")}đ</div>
                          ) : null}
                        </div>
                      </div>

                      {Array.isArray(o.items) && o.items.length > 0 && (
                        <ul className="flex flex-col gap-1 mb-4 list-none">
                          {o.items.map((it, i) => (
                            <li key={i} className="text-[0.88rem] flex items-center gap-2" style={{ color: "var(--st-80)" }}>
                              <Icon name="check" size={12} color="#5fffaa" strokeWidth={3} />
                              {it.title}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex flex-wrap gap-2 pt-2" style={{ borderTop: "1px solid var(--st-06)" }}>
                        <Link
                          href={`/shop/order/${o.orderNumber}`}
                          className="text-[0.82rem] font-semibold px-4 py-2 rounded-lg transition-colors"
                          style={{ background: "var(--st-05)", border: "1px solid var(--line)", color: "white" }}
                        >
                          Chi tiết đơn
                        </Link>
                        {canDownload && (
                          <Link
                            href={`/shop/download/${o.downloadToken}`}
                            className="text-[0.82rem] font-bold px-4 py-2 rounded-lg text-white"
                            style={{ background: "var(--grad-primary)", boxShadow: "0 4px 12px rgba(20,110,245,0.3)" }}
                          >
                            Tải lại file 
                          </Link>
                        )}
                        {expired && (
                          <span className="text-[0.78rem] px-3 py-2 rounded-lg" style={{ color: "#ffd479", background: "rgba(255,212,121,0.08)" }}>
                            Link đã hết hạn - liên hệ admin để cấp lại
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
