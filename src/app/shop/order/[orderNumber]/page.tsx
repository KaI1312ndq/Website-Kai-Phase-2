import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import Icon from "@/components/icons/Icon";
import { getOrderByNumber } from "@/lib/queries";
import { BANK_CONFIG, generateVietQRUrl } from "@/lib/payment/config";
import OrderStatusPoller from "./OrderStatusPoller";

export const metadata: Metadata = {
  title: "Đơn hàng - Đợi xác nhận thanh toán",
  description: "Quét QR Techcombank để chuyển khoản - file sẽ gửi qua email sau khi xác nhận.",
  robots: { index: false, follow: false }, // không cho Google index trang này
};

export const dynamic = "force-dynamic";

export default async function OrderStatusPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await params;
  const order = await getOrderByNumber(orderNumber).catch(() => null);
  if (!order) notFound();

  const qrUrl = generateVietQRUrl({
    amount: order.total,
    memo: order.orderNumber,
  });

  const isPaid = order.paymentStatus === "paid";
  const isDelivered = order.deliveryStatus === "delivered";

  return (
    <>
      <Navbar />
      <main>
        <OrderStatusPoller orderNumber={orderNumber} initialPaid={isPaid} initialDelivered={isDelivered} />

        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "blue", size: 500, top: "-20%", right: "-5%" },
            { variant: "purple", size: 420, bottom: "-30%", left: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[920px] mx-auto px-6 md:px-10 pt-28 pb-10 md:pt-32 md:pb-12">
            <Link href="/shop" className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium mb-4" style={{ color: "var(--ink-mute)" }}>
              ← Shop
            </Link>
            <div className="section-tag">Đơn hàng · {order.orderNumber}</div>
            <h1 className="t-h1 leading-[1.1] text-white max-w-[820px] mb-3">
              {order.total === 0 ? (
                <>Đơn miễn phí - <span className="grad-text">đã gửi file qua email.</span></>
              ) : isDelivered ? (
                <>File đã gửi vào <span className="grad-text">email của bạn.</span></>
              ) : isPaid ? (
                <>Đang gửi file qua <span className="grad-text">email...</span></>
              ) : (
                <>Quét QR để <span className="grad-text">chuyển khoản.</span></>
              )}
            </h1>
            <p className="t-body" style={{ color: "var(--ink-soft)" }}>
              {order.total === 0
                ? `Voucher ${order.voucherCode || ""} đã áp dụng - không cần chuyển khoản. File gửi vào ${order.customer.email} (kiểm tra cả spam).`
                : isDelivered
                  ? `File đã được gửi vào ${order.customer.email}. Kiểm tra hộp thư + spam.`
                  : isPaid
                    ? "Đợi 1-2 phút mình gửi file vào email của bạn."
                    : "Mở ứng dụng ngân hàng  quét QR  tiền tự nhập kèm mã đơn  xong."}
            </p>
          </div>
        </section>

        <section className="relative">
          <div className="max-w-[920px] mx-auto px-6 md:px-10 py-10 md:py-14">
            {/* Order summary card */}
            <div className="rounded-2xl p-6 md:p-7 mb-6" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
              <div className="flex items-center justify-between mb-4 pb-4 border-b" style={{ borderColor: "var(--line)" }}>
                <div>
                  <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.5)" }}>Mã đơn</div>
                  <div className="text-[1.05rem] font-bold text-white tabular-nums">{order.orderNumber}</div>
                </div>
                <StatusBadge paid={isPaid} delivered={isDelivered} />
              </div>

              <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Sản phẩm</div>
              <ul className="flex flex-col gap-1.5 mb-4 list-none">
                {order.items.map((it: any, i: number) => (
                  <li key={i} className="text-[0.92rem] flex items-start gap-2" style={{ color: "rgba(255,255,255,0.85)" }}>
                    <Icon name="check" size={12} color="#5fffaa" strokeWidth={3} />
                    {it.title} <span style={{ color: "var(--ink-mute)" }}>· {(it.price || 0).toLocaleString("vi-VN")}đ</span>
                  </li>
                ))}
              </ul>

              {order.voucherCode && (order.voucherDiscount || 0) > 0 && (
                <div className="pt-3 mb-2 text-[0.85rem] flex items-center justify-between" style={{ color: "#5fffaa" }}>
                  <span className="flex items-center gap-2">
                    <Icon name="gift" size={14} />
                    Voucher <strong className="font-mono">{order.voucherCode}</strong>
                  </span>
                  <span className="font-semibold">−{(order.voucherDiscount || 0).toLocaleString("vi-VN")}đ</span>
                </div>
              )}
              <div className="pt-4 border-t flex items-baseline justify-between" style={{ borderColor: "var(--line)" }}>
                <span className="text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>Tổng phải trả</span>
                <div className="flex items-baseline gap-2">
                  {(order.discount > 0 || (order.voucherDiscount || 0) > 0) && (
                    <span className="text-[0.78rem] line-through" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {order.subtotal.toLocaleString("vi-VN")}đ
                    </span>
                  )}
                  <span className="text-[1.6rem] font-extrabold grad-text tabular-nums">{order.total.toLocaleString("vi-VN")}đ</span>
                </div>
              </div>
            </div>

            {/* Payment QR / Status */}
            {!isPaid && (
              <div className="rounded-2xl p-6 md:p-7 mb-6" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
                <h2 className="text-[1.1rem] font-bold text-white mb-1">Quét QR - auto-fill số tiền + mã đơn</h2>
                <p className="text-[0.85rem] mb-5" style={{ color: "var(--ink-mute)" }}>
                  Mở app ngân hàng bất kỳ  quét QR  kiểm tra  ấn chuyển. Mã đơn sẽ tự nhập vào nội dung.
                </p>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* QR code */}
                  <div className="rounded-2xl p-4 bg-white shrink-0">
                    <img src={qrUrl} alt={`QR Techcombank ${order.orderNumber}`} width={280} height={350} style={{ display: "block" }} />
                  </div>

                  {/* Manual transfer info */}
                  <div className="flex-1 w-full">
                    <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                      Hoặc chuyển khoản thủ công
                    </div>
                    <div className="rounded-xl p-4 flex flex-col gap-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <Detail label="Ngân hàng" value={BANK_CONFIG.bankName} />
                      <Detail label="Số tài khoản" value={BANK_CONFIG.accountNumber} copy />
                      <Detail label="Tên" value={BANK_CONFIG.accountName} />
                      <Detail label="Số tiền" value={`${order.total.toLocaleString("vi-VN")}đ`} highlight />
                      <Detail label="Nội dung CK" value={order.orderNumber} copy highlight />
                    </div>
                    <div className="mt-3 rounded-lg px-3 py-2 text-[0.78rem]" style={{ background: "rgba(255,212,121,0.08)", border: "1px solid rgba(255,212,121,0.25)", color: "rgba(255,255,255,0.85)" }}>
                      <strong style={{ color: "#ffd479" }}>Quan trọng:</strong> nhập đúng nội dung <strong>{order.orderNumber}</strong> để mình match đơn nhanh.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Steps */}
            <div className="rounded-2xl p-6 md:p-7 mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)" }}>
              <h2 className="text-[1rem] font-bold text-white mb-4">Các bước tiếp theo</h2>
              <div className="flex flex-col gap-3">
                <Step n={1} done={isPaid} text="Bạn chuyển khoản (1-2 phút)" />
                <Step n={2} done={isPaid} active={!isPaid} text={isPaid ? "Đã nhận tiền" : "Đợi mình nhận tiền (thường <1 giờ giờ hành chính)"} />
                <Step n={3} done={isDelivered} active={isPaid && !isDelivered} text={isDelivered ? `File đã gửi vào ${order.customer.email}` : `Mình gửi file vào email ${order.customer.email}`} />
                <Step n={4} done={isDelivered} text="Bạn click link trong email  tải file về" />
              </div>
            </div>

            {/* Support */}
            <div className="text-center text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>
              Cần hỗ trợ? Nhắn Zalo <a href="https://zalo.me/0868464658" className="underline" style={{ color: "#7da9ff" }}>0868464658</a> hoặc email <a href="mailto:qforwork13@gmail.com" className="underline" style={{ color: "#7da9ff" }}>qforwork13@gmail.com</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function StatusBadge({ paid, delivered }: { paid: boolean; delivered: boolean }) {
  if (delivered) {
    return <Pill icon="check" color="#5fffaa" text="Đã giao file" />;
  }
  if (paid) {
    return <Pill icon="hourglass" color="#7da9ff" text="Đang gửi email..." />;
  }
  return <Pill icon="clock" color="#ffd479" text="Chờ thanh toán" />;
}

function Pill({ icon, color, text }: { icon: any; color: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[0.82rem] font-bold px-3 py-1.5 rounded-lg" style={{ background: `${color}15`, border: `1px solid ${color}40`, color }}>
      <Icon name={icon} size={14} />
      {text}
    </span>
  );
}

function Detail({ label, value, copy, highlight }: { label: string; value: string; copy?: boolean; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[0.78rem]" style={{ color: "rgba(255,255,255,0.55)" }}>{label}</span>
      <span className="text-[0.92rem] font-mono font-bold" style={{ color: highlight ? "#7da9ff" : "white" }}>{value}</span>
    </div>
  );
}

function Step({ n, done, active, text }: { n: number; done?: boolean; active?: boolean; text: string }) {
  const color = done ? "#5fffaa" : active ? "#7da9ff" : "rgba(255,255,255,0.25)";
  return (
    <div className="flex items-center gap-3">
      <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[0.78rem] font-bold" style={{ background: done ? color : "rgba(255,255,255,0.06)", color: done ? "#0a1438" : color, border: !done ? `1px solid ${color}` : "none" }}>
        {done ? <Icon name="check" size={12} strokeWidth={3} /> : n}
      </span>
      <span className="text-[0.92rem]" style={{ color: done ? "rgba(255,255,255,0.85)" : active ? "white" : "rgba(255,255,255,0.5)", fontWeight: active ? 600 : 400 }}>
        {text}
      </span>
    </div>
  );
}
