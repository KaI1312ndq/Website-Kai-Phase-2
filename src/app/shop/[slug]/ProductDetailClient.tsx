"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/icons/Icon";

export default function ProductDetailClient({
  productId,
  productTitle,
  price,
}: {
  productId: string;
  productTitle: string;
  price: number;
}) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.includes("@") || phone.replace(/\D/g, "").length < 9) {
      setError("Vui lòng kiểm tra lại tên, email, số điện thoại");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productIds: [productId],
          customer: { name, email, phone },
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Có lỗi xảy ra, vui lòng thử lại");
        setSubmitting(false);
        return;
      }
      router.push(data.redirectUrl);
    } catch {
      setError("Lỗi kết nối, vui lòng thử lại");
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Buy button — used in multiple places */}
      <button
        onClick={() => setShowCheckout(true)}
        className="w-full inline-flex items-center justify-center gap-2 text-white font-bold text-[1rem] px-6 py-3.5 rounded-xl transition-all hover:scale-[1.02]"
        style={{ background: "var(--grad-primary)", boxShadow: "0 8px 24px rgba(20,110,245,0.35)" }}
      >
        Mua ngay — {price.toLocaleString("vi-VN")}đ
      </button>

      {/* Checkout modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(5,10,31,0.85)", backdropFilter: "blur(8px)" }}>
          <div className="rounded-2xl max-w-[520px] w-full p-7 max-h-[90vh] overflow-y-auto" style={{ background: "rgba(8,16,43,0.98)", border: "1px solid var(--line)" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[1.3rem] font-bold text-white">Thanh toán</h2>
              <button onClick={() => setShowCheckout(false)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}>
                <Icon name="x-circle" size={18} />
              </button>
            </div>

            <div className="rounded-xl p-4 mb-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Đơn hàng</div>
              <div className="flex items-baseline justify-between">
                <span className="text-[0.92rem]" style={{ color: "rgba(255,255,255,0.85)" }}>{productTitle}</span>
                <span className="text-[1.3rem] font-extrabold grad-text">{price.toLocaleString("vi-VN")}đ</span>
              </div>
              <div className="mt-2 text-[0.75rem]" style={{ color: "var(--ink-mute)" }}>
                Mua thêm 2 sản phẩm chỉ +100k (combo 3 = 199k). <a href="/shop" className="underline" style={{ color: "#7da9ff" }}>Xem combo</a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">
                  Tên <span style={{ color: "#ff5a72" }}>*</span>
                </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                  className="w-full px-4 py-2.5 rounded-lg outline-none"
                  style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", color: "white" }}
                  placeholder="Nguyễn Văn A" />
              </div>
              <div>
                <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">
                  Email nhận file <span style={{ color: "#ff5a72" }}>*</span>
                </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full px-4 py-2.5 rounded-lg outline-none"
                  style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", color: "white" }}
                  placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">
                  Số điện thoại <span style={{ color: "#ff5a72" }}>*</span>
                </label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required
                  className="w-full px-4 py-2.5 rounded-lg outline-none"
                  style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", color: "white" }}
                  placeholder="0xxx xxx xxx" />
              </div>

              {error && (
                <div className="rounded-lg px-4 py-2.5 text-[0.85rem]" style={{ background: "rgba(255,90,114,0.10)", border: "1px solid rgba(255,90,114,0.3)", color: "#ff5a72" }}>
                  {error}
                </div>
              )}

              <div className="text-[0.75rem] mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                Bằng việc thanh toán, bạn đồng ý chính sách <strong className="text-white">không hoàn tiền</strong> với sản phẩm số.
              </div>

              <button type="submit" disabled={submitting}
                className="text-white font-bold text-[1rem] px-6 py-3.5 rounded-xl transition-all"
                style={{ background: "var(--grad-primary)", boxShadow: "0 8px 24px rgba(20,110,245,0.35)", opacity: submitting ? 0.6 : 1 }}>
                {submitting ? "Đang xử lý..." : `Tạo đơn ${price.toLocaleString("vi-VN")}đ — Chuyển khoản`}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
