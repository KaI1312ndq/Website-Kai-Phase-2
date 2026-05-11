"use client";
import Link from "next/link";
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

export default function ShopClient({ products }: { products: Product[] }) {
  const { items, has, toggle, pricing } = useCart();

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
      {items.length > 0 && pricing && (
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
          <Link
            href="/checkout"
            className="px-6 py-3 rounded-xl text-[0.95rem] font-bold text-white transition-all hover:scale-[1.02]"
            style={{ background: "var(--grad-primary)", boxShadow: "0 8px 24px rgba(20,110,245,0.4)" }}
          >
            Thanh toán 
          </Link>
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
