"use client";
import Icon from "@/components/icons/Icon";
import { useCart } from "./CartContext";

export default function CartButton({ className }: { className?: string }) {
  const { count, openDrawer } = useCart();
  return (
    <button
      onClick={openDrawer}
      aria-label={`Mở giỏ hàng (${count} sản phẩm)`}
      className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all ${className || ""}`}
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.10)",
        color: "white",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
    >
      <Icon name="shopping-cart" size={16} />
      {count > 0 && (
        <span
          className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full text-[0.65rem] font-bold flex items-center justify-center px-1"
          style={{ background: "#ff5a72", color: "white", boxShadow: "0 2px 6px rgba(255,90,114,0.5)" }}
        >
          {count}
        </span>
      )}
    </button>
  );
}
