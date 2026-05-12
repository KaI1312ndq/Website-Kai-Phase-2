"use client";
import { useEffect } from "react";
import Link from "next/link";
import Icon from "@/components/icons/Icon";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const { items, pricing, drawerOpen, closeDrawer, remove, clear, syncing } = useCart();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (!drawerOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [drawerOpen]);

  // ESC to close
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeDrawer(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeDrawer]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(5,10,31,0.7)", backdropFilter: "blur(6px)" }}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[61] w-full max-w-[440px] flex flex-col transition-transform duration-300 ease-out ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ background: "var(--db-95)", borderLeft: "1px solid var(--line)", boxShadow: "-24px 0 60px rgba(0,0,0,0.5)" }}
        role="dialog"
        aria-label="Giỏ hàng"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--line)" }}>
          <div className="flex items-center gap-2.5">
            <Icon name="shopping-cart" size={18} color="#7da9ff" />
            <h2 className="text-[1.05rem] font-bold text-white">Giỏ hàng</h2>
            {items.length > 0 && (
              <span className="text-[0.75rem] px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(20,110,245,0.15)", color: "#7da9ff" }}>
                {items.length}
              </span>
            )}
            {syncing && (
              <span className="text-[0.7rem]" style={{ color: "var(--st-40)" }}>đang đồng bộ…</span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Đóng giỏ hàng"
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "var(--st-06)", color: "var(--st-70)" }}
          >
            <Icon name="x" size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center px-6 py-16 h-full">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "var(--st-04)", border: "1px solid var(--line)" }}>
                <Icon name="shopping-cart" size={28} color="var(--st-40)" />
              </div>
              <h3 className="text-[1rem] font-semibold text-white mb-1.5">Giỏ hàng trống</h3>
              <p className="text-[0.85rem] mb-5" style={{ color: "var(--ink-mute)" }}>
                Khám phá Shop để xem các template + bundle giảm tới 50%.
              </p>
              <Link
                href="/shop"
                onClick={closeDrawer}
                className="px-5 py-2.5 rounded-lg text-[0.88rem] font-semibold text-white"
                style={{ background: "var(--grad-primary)", boxShadow: "0 4px 14px rgba(20,110,245,0.35)" }}
              >
                Đến Shop 
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-2 p-4 list-none">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: "var(--st-03)", border: "1px solid var(--line)" }}
                >
                  <div className="w-14 h-14 rounded-lg flex-shrink-0 overflow-hidden" style={{ background: "var(--grad-primary-soft)" }}>
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[0.6rem] uppercase tracking-[0.16em] grad-text font-bold">NDQ</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${item.slug}`}
                      onClick={closeDrawer}
                      className="block text-[0.92rem] font-semibold text-white leading-snug hover:text-[#7da9ff] transition-colors truncate"
                    >
                      {item.title}
                    </Link>
                    <div className="text-[0.85rem] font-bold mt-1 grad-text">
                      {item.price.toLocaleString("vi-VN")}đ
                    </div>
                  </div>
                  <button
                    onClick={() => remove(item.id)}
                    aria-label={`Xoá ${item.title}`}
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,90,114,0.08)", color: "#ff5a72" }}
                  >
                    <Icon name="trash" size={14} />
                  </button>
                </li>
              ))}
              {items.length > 1 && (
                <button
                  onClick={clear}
                  className="text-[0.78rem] mt-1 mx-3 font-medium self-start"
                  style={{ color: "var(--st-50)" }}
                >
                  Xoá toàn bộ
                </button>
              )}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && pricing && (
          <div className="px-5 py-4 flex flex-col gap-3" style={{ borderTop: "1px solid var(--line)", background: "var(--st-03)" }}>
            <div className="flex items-baseline justify-between">
              <span className="text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>Tổng</span>
              <div className="flex items-baseline gap-2">
                {pricing.discount > 0 && (
                  <span className="text-[0.8rem] line-through" style={{ color: "var(--st-40)" }}>
                    {pricing.subtotal.toLocaleString("vi-VN")}đ
                  </span>
                )}
                <span className="text-[1.45rem] font-extrabold grad-text">
                  {pricing.total.toLocaleString("vi-VN")}đ
                </span>
              </div>
            </div>
            {pricing.discount > 0 && (
              <div className="text-[0.78rem] font-semibold flex items-center gap-1.5" style={{ color: "#5fffaa" }}>
                <Icon name="gift" size={12} />
                Đã áp dụng combo - tiết kiệm {pricing.discount.toLocaleString("vi-VN")}đ
              </div>
            )}
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="text-center px-6 py-3 rounded-xl text-[0.95rem] font-bold text-white transition-all hover:scale-[1.01]"
              style={{ background: "var(--grad-primary)", boxShadow: "0 8px 24px rgba(20,110,245,0.4)" }}
            >
              Thanh toán 
            </Link>
            <Link
              href="/shop"
              onClick={closeDrawer}
              className="text-center text-[0.82rem] font-semibold py-1"
              style={{ color: "var(--st-60)" }}
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
