"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Icon from "@/components/icons/Icon";
import { useCart } from "@/components/cart/CartContext";

type AppliedVoucher = {
  code: string;
  displayName?: string;
  discount: number;
  finalTotal: number;
  isFree: boolean;
};

export default function CheckoutClient() {
  const { items, pricing, remove, clear, hydrated: cartHydrated } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voucherInput, setVoucherInput] = useState("");
  const [voucherChecking, setVoucherChecking] = useState(false);
  const [voucherError, setVoucherError] = useState<string | null>(null);
  const [voucher, setVoucher] = useState<AppliedVoucher | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();

  // Avoid SSR / first-render flash before cart hydrates from localStorage
  useEffect(() => { setHydrated(true); }, []);

  // Pick up voucher code from URL (?voucher=XYZ)
  useEffect(() => {
    const v = searchParams.get("voucher");
    if (v) setVoucherInput(v.toUpperCase());
  }, [searchParams]);

  // Prefill from Clerk profile for signed-in users
  useEffect(() => {
    if (!user) return;
    const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
    if (fullName && !name) setName(fullName);
    const primaryEmail = user.primaryEmailAddress?.emailAddress || user.emailAddresses[0]?.emailAddress;
    if (primaryEmail && !email) setEmail(primaryEmail);
    const primaryPhone = user.primaryPhoneNumber?.phoneNumber || user.phoneNumbers[0]?.phoneNumber;
    if (primaryPhone && !phone) setPhone(primaryPhone);
  }, [user, name, email, phone]);

  // Auto-revalidate if cart subtotal changes after voucher applied
  useEffect(() => {
    if (voucher && pricing && voucher.finalTotal + voucher.discount !== pricing.total) {
      setVoucher(null);
      setVoucherError(null);
    }
  }, [pricing, voucher]);

  async function applyVoucher() {
    const code = voucherInput.trim();
    if (!code || !pricing) return;
    setVoucherChecking(true);
    setVoucherError(null);
    try {
      const res = await fetch("/api/vouchers/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, subtotal: pricing.total }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setVoucherError(data.error || "Không áp dụng được mã");
        setVoucher(null);
      } else {
        setVoucher({
          code: data.voucher.code,
          displayName: data.voucher.displayName,
          discount: data.discount,
          finalTotal: data.finalTotal,
          isFree: data.isFree,
        });
        setVoucherInput(data.voucher.code);
      }
    } catch {
      setVoucherError("Lỗi kết nối");
    }
    setVoucherChecking(false);
  }

  function clearVoucher() {
    setVoucher(null);
    setVoucherInput("");
    setVoucherError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pricing || items.length === 0) return;
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
          productIds: items.map((i) => i.id),
          customer: { name, email, phone },
          ...(voucher ? { voucherCode: voucher.code } : {}),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Có lỗi xảy ra, vui lòng thử lại");
        setSubmitting(false);
        return;
      }
      // Clear cart on success so user doesn't double-checkout
      clear();
      router.push(data.redirectUrl);
    } catch {
      setError("Lỗi kết nối, vui lòng thử lại");
      setSubmitting(false);
    }
  }

  // Empty cart state
  if (cartHydrated && items.length === 0) {
    return (
      <div className="rounded-2xl p-10 text-center" style={{ background: "var(--st-03)", border: "1px solid var(--line)" }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "var(--st-04)", border: "1px solid var(--line)" }}>
          <Icon name="shopping-cart" size={28} color="var(--st-40)" />
        </div>
        <h2 className="text-[1.1rem] font-bold text-white mb-2">Giỏ hàng trống</h2>
        <p className="text-[0.92rem] mb-5" style={{ color: "var(--ink-mute)" }}>
          Thêm sản phẩm vào giỏ trước khi thanh toán.
        </p>
        <Link
          href="/shop"
          className="inline-block px-5 py-2.5 rounded-lg text-[0.9rem] font-semibold text-white"
          style={{ background: "var(--grad-primary)", boxShadow: "0 4px 14px rgba(20,110,245,0.35)" }}
        >
          Đến Shop 
        </Link>
      </div>
    );
  }

  if (!hydrated || !cartHydrated || !pricing) return null;
  const finalTotal = voucher ? voucher.finalTotal : pricing.total;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 items-start">
      {/* Left - form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl p-6 md:p-7 flex flex-col gap-5"
        style={{ background: "var(--st-03)", border: "1px solid var(--line)" }}
      >
        <div>
          <h2 className="text-[1.05rem] font-bold text-white mb-1">Thông tin nhận file</h2>
          <p className="text-[0.82rem]" style={{ color: "var(--ink-mute)" }}>
            File sẽ gửi vào email bạn nhập bên dưới sau khi xác nhận thanh toán.
          </p>
        </div>

        <div>
          <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">
            Tên đầy đủ <span style={{ color: "#ff5a72" }}>*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg outline-none focus:border-[#7da9ff] transition-colors"
            style={{ border: "1px solid var(--st-10)", background: "var(--st-03)", color: "var(--ink)" }}
            placeholder="Nguyễn Văn A"
          />
        </div>

        <div>
          <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">
            Email nhận file <span style={{ color: "#ff5a72" }}>*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg outline-none focus:border-[#7da9ff] transition-colors"
            style={{ border: "1px solid var(--st-10)", background: "var(--st-03)", color: "var(--ink)" }}
            placeholder="email@example.com"
          />
          {user && email && (
            <div className="text-[0.72rem] mt-1 flex items-center gap-1.5" style={{ color: "#5fffaa" }}>
              <Icon name="check" size={10} strokeWidth={3} />
              Tự điền từ tài khoản của bạn
            </div>
          )}
        </div>

        <div>
          <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">
            Số điện thoại <span style={{ color: "#ff5a72" }}>*</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg outline-none focus:border-[#7da9ff] transition-colors"
            style={{ border: "1px solid var(--st-10)", background: "var(--st-03)", color: "var(--ink)" }}
            placeholder="0xxx xxx xxx"
          />
        </div>

        {error && (
          <div className="rounded-lg px-4 py-3 text-[0.85rem]" style={{ background: "rgba(255,90,114,0.10)", border: "1px solid rgba(255,90,114,0.3)", color: "#ff5a72" }}>
            {error}
          </div>
        )}

        <div className="text-[0.75rem]" style={{ color: "var(--st-45)" }}>
          Bằng việc thanh toán, bạn đồng ý chính sách <strong className="text-white">không hoàn tiền</strong> với sản phẩm số.
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="text-white font-bold text-[1rem] px-6 py-4 rounded-xl transition-all hover:scale-[1.01]"
          style={{ background: "var(--grad-primary)", boxShadow: "0 8px 24px rgba(20,110,245,0.4)", opacity: submitting ? 0.6 : 1 }}
        >
          {submitting ? "Đang xử lý..." : voucher?.isFree ? "Nhận file miễn phí" : "Mua hàng"}
        </button>
      </form>

      {/* Right - order summary */}
      <aside className="rounded-2xl p-6 lg:sticky lg:top-24" style={{ background: "var(--st-03)", border: "1px solid var(--line)" }}>
        <h2 className="text-[1rem] font-bold text-white mb-4">Đơn hàng của bạn</h2>

        <ul className="flex flex-col gap-3 mb-4 list-none">
          {items.map((it) => (
            <li key={it.id} className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden" style={{ background: "var(--grad-primary-soft)" }}>
                {it.image ? (
                  <img src={it.image} alt={it.title} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[0.55rem] uppercase tracking-[0.14em] grad-text font-bold">NDQ</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[0.88rem] font-semibold text-white leading-snug">{it.title}</div>
                <div className="text-[0.78rem] mt-0.5 font-semibold grad-text">{it.price.toLocaleString("vi-VN")}đ</div>
              </div>
              <button
                type="button"
                onClick={() => remove(it.id)}
                aria-label={`Xoá ${it.title}`}
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,90,114,0.08)", color: "#ff5a72" }}
              >
                <Icon name="trash" size={12} />
              </button>
            </li>
          ))}
        </ul>

        <div className="border-t pt-4 flex flex-col gap-2 text-[0.85rem]" style={{ borderColor: "var(--st-08)" }}>
          <div className="flex justify-between" style={{ color: "var(--ink-mute)" }}>
            <span>Tạm tính ({items.length} SP)</span>
            <span>{pricing.subtotal.toLocaleString("vi-VN")}đ</span>
          </div>
          {pricing.discount > 0 && (
            <div className="flex justify-between" style={{ color: "#5fffaa" }}>
              <span>Combo giảm</span>
              <span>−{pricing.discount.toLocaleString("vi-VN")}đ</span>
            </div>
          )}
          {voucher && (
            <div className="flex justify-between" style={{ color: "#5fffaa" }}>
              <span className="flex items-center gap-1.5"><Icon name="gift" size={12} />Voucher {voucher.code}</span>
              <span>−{voucher.discount.toLocaleString("vi-VN")}đ</span>
            </div>
          )}

          {/* Voucher input - applies directly to total below */}
          <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--st-08)" }}>
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] mb-2" style={{ color: "var(--st-50)" }}>
              Mã voucher
            </div>
            {voucher ? (
              <div className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ background: "rgba(95,255,170,0.08)", border: "1px solid rgba(95,255,170,0.3)" }}>
                <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                  <Icon name="check" size={12} color="#5fffaa" strokeWidth={3} />
                  <span className="text-[0.82rem] font-bold text-white font-mono">{voucher.code}</span>
                  {voucher.isFree && (
                    <span className="text-[0.6rem] font-bold uppercase tracking-[0.14em] px-1.5 py-0.5 rounded" style={{ background: "rgba(95,255,170,0.2)", color: "#5fffaa" }}>
                      MIỄN PHÍ
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={clearVoucher}
                  className="text-[0.72rem] font-semibold flex-shrink-0"
                  style={{ color: "var(--st-55)" }}
                >
                  Bỏ
                </button>
              </div>
            ) : (
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
                  placeholder="VD: BANBE100"
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg outline-none uppercase font-mono text-[0.85rem]"
                  style={{ border: "1px solid var(--st-10)", background: "var(--st-03)", color: "var(--ink)" }}
                />
                <button
                  type="button"
                  onClick={applyVoucher}
                  disabled={voucherChecking || !voucherInput.trim()}
                  className="px-3 py-2 rounded-lg text-[0.78rem] font-semibold transition-all"
                  style={{
                    background: "rgba(20,110,245,0.18)",
                    border: "1px solid rgba(20,110,245,0.4)",
                    color: "#7da9ff",
                    opacity: voucherChecking || !voucherInput.trim() ? 0.5 : 1,
                  }}
                >
                  {voucherChecking ? "..." : "Áp dụng"}
                </button>
              </div>
            )}
            {voucherError && (
              <div className="mt-1.5 text-[0.74rem]" style={{ color: "#ff5a72" }}>
                {voucherError}
              </div>
            )}
          </div>

          <div className="flex items-baseline justify-between mt-3 pt-3 border-t" style={{ borderColor: "var(--st-08)" }}>
            <span className="text-white font-semibold">Tổng</span>
            <span className="text-[1.4rem] font-extrabold grad-text">
              {finalTotal.toLocaleString("vi-VN")}đ
            </span>
          </div>
        </div>

        <Link
          href="/shop"
          className="mt-4 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold"
          style={{ color: "#7da9ff" }}
        >
          <Icon name="arrow-left" size={12} />
          Tiếp tục mua sắm
        </Link>
      </aside>
    </div>
  );
}
