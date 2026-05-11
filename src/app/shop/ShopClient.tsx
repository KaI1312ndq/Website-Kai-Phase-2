"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { urlFor } from "../../../sanity/lib/image";
import Icon from "@/components/icons/Icon";
import { useCart } from "@/components/cart/CartContext";

type Product = {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription?: string;
  bullets?: string[];
  price: number;
  category?: string;
  coverImage?: any;
  mockupImages?: any[];
  previewFileUrl?: string;
};

type Phase = "browse" | "checkout";

export default function ShopClient({ products }: { products: Product[] }) {
  const { items, has, toggle, pricing } = useCart();
  const [phase, setPhase] = useState<Phase>("browse");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();

  // Open checkout if landing with ?checkout=1 and cart has items (e.g. from drawer)
  useEffect(() => {
    if (searchParams.get("checkout") === "1" && items.length > 0) {
      setPhase("checkout");
    }
  }, [searchParams, items.length]);

  // Prefill name + email for signed-in users
  useEffect(() => {
    if (!user) return;
    const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
    if (fullName && !name) setName(fullName);
    const primaryEmail = user.primaryEmailAddress?.emailAddress || user.emailAddresses[0]?.emailAddress;
    if (primaryEmail && !email) setEmail(primaryEmail);
    const primaryPhone = user.primaryPhoneNumber?.phoneNumber || user.phoneNumbers[0]?.phoneNumber;
    if (primaryPhone && !phone) setPhone(primaryPhone);
  }, [user, name, email, phone]);

  async function handleCheckout(e: React.FormEvent) {
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
    <div>
      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {products.map((p) => {
          const isSelected = has(p._id);
          const coverUrl = p.coverImage ? urlFor(p.coverImage).width(800).height(600).url() : undefined;
          return (
            <div
              key={p._id}
              className="rounded-2xl overflow-hidden flex flex-col transition-all"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: `1px solid ${isSelected ? "rgba(20,110,245,0.55)" : "var(--line)"}`,
                boxShadow: isSelected ? "0 8px 30px rgba(20,110,245,0.15)" : "none",
              }}
            >
              <Link href={`/shop/${p.slug.current}`} className="block aspect-[4/3] relative overflow-hidden group/img" style={{ background: "var(--grad-primary-soft)" }}>
                {coverUrl ? (
                  <img src={coverUrl} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[0.78rem] uppercase tracking-[0.2em] grad-text font-semibold">
                    {p.category || "Premium"}
                  </div>
                )}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#5fffaa", color: "#0a1438" }}>
                    <Icon name="check" size={18} strokeWidth={3} />
                  </div>
                )}
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <Link href={`/shop/${p.slug.current}`} className="block mb-2">
                  <h3 className="text-[1.1rem] font-bold text-white leading-tight hover:text-[#7da9ff] transition-colors">{p.title}</h3>
                </Link>
                {p.shortDescription && (
                  <p className="text-[0.88rem] leading-[1.6] mb-4" style={{ color: "var(--ink-mute)" }}>
                    {p.shortDescription}
                  </p>
                )}
                {Array.isArray(p.bullets) && p.bullets.length > 0 && (
                  <ul className="flex flex-col gap-1.5 mb-5 list-none">
                    {p.bullets.slice(0, 4).map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-[0.85rem]" style={{ color: "rgba(255,255,255,0.85)" }}>
                        <Icon name="check" size={12} color="#5fffaa" strokeWidth={3} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto pt-4 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-[0.7rem] uppercase tracking-[0.14em] font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>Giá</div>
                    <div className="text-[1.4rem] font-extrabold grad-text">{p.price.toLocaleString("vi-VN")}đ</div>
                  </div>
                  <button
                    onClick={() => toggle({ id: p._id, slug: p.slug.current, title: p.title, price: p.price, image: coverUrl })}
                    className="text-[0.85rem] font-bold px-4 py-2.5 rounded-lg transition-all"
                    style={{
                      background: isSelected ? "rgba(255,90,114,0.12)" : "var(--grad-primary)",
                      border: isSelected ? "1px solid rgba(255,90,114,0.3)" : "none",
                      color: isSelected ? "#ff5a72" : "white",
                    }}
                  >
                    {isSelected ? "Bỏ khỏi giỏ" : "+ Thêm vào giỏ"}
                  </button>
                </div>

                {p.previewFileUrl && (
                  <a href={p.previewFileUrl} target="_blank" rel="noreferrer" className="mt-3 text-[0.78rem] font-semibold inline-flex items-center gap-1.5" style={{ color: "#7da9ff" }}>
                    <Icon name="book-open" size={12} />
                    Xem preview miễn phí
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bundle pricing info */}
      <div className="mb-8 rounded-xl p-5" style={{ background: "rgba(95,255,170,0.05)", border: "1px solid rgba(95,255,170,0.22)" }}>
        <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "#5fffaa" }}>
          Combo giảm giá
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <PriceTier count={1} price="99k" label="1 sản phẩm" current={items.length === 1} />
          <PriceTier count={2} price="169k" label="Combo 2 (-29k)" current={items.length === 2} />
          <PriceTier count={3} price="199k" label="Combo 3 (-98k)" current={items.length === 3} />
        </div>
      </div>

      {/* Sticky checkout bar */}
      {items.length > 0 && phase === "browse" && pricing && (
        <div className="sticky bottom-4 z-30 rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap backdrop-blur-md"
          style={{ background: "rgba(8,16,43,0.85)", border: "1px solid rgba(20,110,245,0.32)", boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }}>
          <div>
            <div className="text-[0.78rem]" style={{ color: "var(--ink-mute)" }}>
              {items.length} sản phẩm trong giỏ
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[1.6rem] font-extrabold grad-text">{pricing.total.toLocaleString("vi-VN")}đ</span>
              {pricing.discount > 0 && (
                <>
                  <span className="text-[0.85rem] line-through" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {pricing.subtotal.toLocaleString("vi-VN")}đ
                  </span>
                  <span className="text-[0.78rem] font-bold px-2 py-0.5 rounded" style={{ background: "rgba(95,255,170,0.15)", color: "#5fffaa" }}>
                    -{pricing.discount.toLocaleString("vi-VN")}đ
                  </span>
                </>
              )}
            </div>
          </div>
          <button
            onClick={() => setPhase("checkout")}
            className="px-6 py-3 rounded-xl text-[0.95rem] font-bold text-white transition-all hover:scale-[1.02]"
            style={{ background: "var(--grad-primary)", boxShadow: "0 8px 24px rgba(20,110,245,0.4)" }}
          >
            Thanh toán →
          </button>
        </div>
      )}

      {/* Checkout form modal */}
      {phase === "checkout" && pricing && items.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(5,10,31,0.85)", backdropFilter: "blur(8px)" }}>
          <div className="rounded-2xl max-w-[520px] w-full p-7 max-h-[90vh] overflow-y-auto" style={{ background: "rgba(8,16,43,0.98)", border: "1px solid var(--line)" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[1.3rem] font-bold text-white">Thanh toán</h2>
              <button
                onClick={() => setPhase("browse")}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}
              >
                <Icon name="x-circle" size={18} />
              </button>
            </div>

            {/* Order summary */}
            <div className="rounded-xl p-4 mb-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                Đơn hàng
              </div>
              <ul className="flex flex-col gap-1 mb-3 list-none">
                {items.map((p) => (
                  <li key={p.id} className="text-[0.88rem] flex items-center gap-2" style={{ color: "rgba(255,255,255,0.85)" }}>
                    <Icon name="check" size={12} color="#5fffaa" strokeWidth={3} />
                    {p.title}
                  </li>
                ))}
              </ul>
              <div className="border-t pt-2.5 flex items-baseline justify-between" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <span className="text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>Tổng</span>
                <span className="text-[1.4rem] font-extrabold grad-text">{pricing.total.toLocaleString("vi-VN")}đ</span>
              </div>
            </div>

            <form onSubmit={handleCheckout} className="flex flex-col gap-4">
              <div>
                <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">
                  Tên đầy đủ <span style={{ color: "#ff5a72" }}>*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg outline-none"
                  style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", color: "white" }}
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
                  className="w-full px-4 py-2.5 rounded-lg outline-none"
                  style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", color: "white" }}
                  placeholder="email@example.com"
                />
                <div className="text-[0.72rem] mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                  File sẽ gửi vào email này sau khi xác nhận thanh toán.
                </div>
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
                  className="w-full px-4 py-2.5 rounded-lg outline-none"
                  style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", color: "white" }}
                  placeholder="0xxx xxx xxx"
                />
              </div>

              {error && (
                <div className="rounded-lg px-4 py-2.5 text-[0.85rem]" style={{ background: "rgba(255,90,114,0.10)", border: "1px solid rgba(255,90,114,0.3)", color: "#ff5a72" }}>
                  {error}
                </div>
              )}

              <div className="text-[0.75rem] mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                Bằng việc thanh toán, bạn đồng ý chính sách <strong className="text-white">không hoàn tiền</strong> với sản phẩm số.
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="text-white font-bold text-[1rem] px-6 py-3.5 rounded-xl transition-all"
                style={{ background: "var(--grad-primary)", boxShadow: "0 8px 24px rgba(20,110,245,0.35)", opacity: submitting ? 0.6 : 1 }}
              >
                {submitting ? "Đang xử lý..." : `Tạo đơn ${pricing.total.toLocaleString("vi-VN")}đ — Chuyển khoản`}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function PriceTier({ count, price, label, current }: { count: number; price: string; label: string; current: boolean }) {
  return (
    <div
      className="rounded-lg py-3 px-3 transition-all"
      style={{
        background: current ? "rgba(95,255,170,0.15)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${current ? "rgba(95,255,170,0.4)" : "rgba(255,255,255,0.06)"}`,
      }}
    >
      <div className="text-[1.2rem] font-extrabold mb-0.5" style={{ color: current ? "#5fffaa" : "white" }}>
        {price}
      </div>
      <div className="text-[0.7rem]" style={{ color: "rgba(255,255,255,0.55)" }}>{label}</div>
    </div>
  );
}
