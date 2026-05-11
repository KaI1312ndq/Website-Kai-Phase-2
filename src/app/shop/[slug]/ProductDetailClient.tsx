"use client";
import { useRouter } from "next/navigation";
import Icon from "@/components/icons/Icon";
import { useCart } from "@/components/cart/CartContext";

export default function ProductDetailClient({
  productId,
  productSlug,
  productTitle,
  price,
  coverImageUrl,
}: {
  productId: string;
  productSlug: string;
  productTitle: string;
  price: number;
  coverImageUrl?: string;
}) {
  const { has, add, openDrawer } = useCart();
  const router = useRouter();
  const inCart = has(productId);

  const item = {
    id: productId,
    slug: productSlug,
    title: productTitle,
    price,
    ...(coverImageUrl ? { image: coverImageUrl } : {}),
  };

  function handleAddToCart() {
    if (!inCart) add(item);
    openDrawer();
  }

  function handleBuyNow() {
    if (!inCart) add(item);
    router.push("/checkout");
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleBuyNow}
        className="w-full inline-flex items-center justify-center gap-2 text-white font-bold text-[1rem] px-6 py-3.5 rounded-xl transition-all hover:scale-[1.02]"
        style={{ background: "var(--grad-primary)", boxShadow: "0 8px 24px rgba(20,110,245,0.35)" }}
      >
        Mua ngay - {price.toLocaleString("vi-VN")}đ
      </button>
      <button
        onClick={handleAddToCart}
        className="w-full inline-flex items-center justify-center gap-2 font-bold text-[0.95rem] px-6 py-3.5 rounded-xl transition-all"
        style={{
          background: inCart ? "rgba(95,255,170,0.10)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${inCart ? "rgba(95,255,170,0.35)" : "rgba(255,255,255,0.15)"}`,
          color: inCart ? "#5fffaa" : "white",
        }}
      >
        <Icon name={inCart ? "check" : "shopping-cart"} size={16} strokeWidth={inCart ? 3 : 2} />
        {inCart ? "Đã có trong giỏ - Mở giỏ hàng" : "Thêm vào giỏ hàng"}
      </button>
      <div className="text-center text-[0.78rem]" style={{ color: "var(--ink-mute)" }}>
        Combo 2 sản phẩm chỉ 169k · Combo 3 chỉ 199k
      </div>
    </div>
  );
}
