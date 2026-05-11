"use client";
import { useRouter } from "next/navigation";
import { useCart, type CartItem } from "@/components/cart/CartContext";

export default function VoucherApplyButton({
  code,
  product,
}: {
  code: string;
  product?: CartItem;
}) {
  const { add } = useCart();
  const router = useRouter();

  function handleClick() {
    if (product) add(product);
    router.push(`/checkout?voucher=${encodeURIComponent(code)}`);
  }

  return (
    <button
      onClick={handleClick}
      className="text-[0.78rem] font-bold px-3 py-1.5 rounded-lg flex-shrink-0"
      style={{ background: "rgba(20,110,245,0.18)", border: "1px solid rgba(20,110,245,0.4)", color: "#7da9ff" }}
    >
      Dùng ngay →
    </button>
  );
}
