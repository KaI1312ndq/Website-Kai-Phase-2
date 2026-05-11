import Icon from "@/components/icons/Icon";
import { getPublicVouchers } from "@/lib/queries";
import VoucherApplyButton from "./VoucherApplyButton";
import type { CartItem } from "@/components/cart/CartContext";

type V = {
  _id: string;
  code: string;
  displayName?: string;
  description?: string;
  type: "percent" | "fixed";
  value: number;
  minOrderValue?: number;
  expiresAt?: string;
};

function valueLabel(v: V) {
  return v.type === "percent" ? `−${v.value}%` : `−${(v.value || 0).toLocaleString("vi-VN")}đ`;
}

function expiresLabel(v: V) {
  if (!v.expiresAt) return null;
  const date = new Date(v.expiresAt);
  return `Đến ${date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })}`;
}

export default async function PublicVouchers({ product }: { product?: CartItem } = {}) {
  const vouchers = (await getPublicVouchers()) as V[] | null;
  const list = Array.isArray(vouchers) ? vouchers : [];
  if (list.length === 0) return null;

  return (
    <div className="rounded-2xl p-5" style={{ background: "rgba(255,212,121,0.05)", border: "1px solid rgba(255,212,121,0.25)" }}>
      <div className="flex items-center gap-2 mb-3">
        <Icon name="gift" size={16} color="#ffd479" />
        <span className="text-[0.78rem] font-bold uppercase tracking-[0.14em]" style={{ color: "#ffd479" }}>
          Voucher có thể dùng
        </span>
      </div>
      <ul className="flex flex-col gap-2 list-none">
        {list.map((v) => (
          <li
            key={v._id}
            className="flex items-center justify-between gap-3 p-3 rounded-lg"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.15)" }}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[0.85rem] font-bold font-mono text-white">{v.code}</span>
                <span className="text-[0.78rem] font-bold px-2 py-0.5 rounded" style={{ background: "rgba(255,212,121,0.15)", color: "#ffd479" }}>
                  {valueLabel(v)}
                </span>
                {v.type === "percent" && v.value === 100 && (
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] px-1.5 py-0.5 rounded" style={{ background: "rgba(95,255,170,0.18)", color: "#5fffaa" }}>
                    FREE
                  </span>
                )}
              </div>
              {(v.displayName || v.description) && (
                <div className="text-[0.78rem] mt-1 leading-snug" style={{ color: "var(--ink-mute)" }}>
                  {v.displayName || v.description}
                </div>
              )}
              <div className="flex gap-3 text-[0.7rem] mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                {typeof v.minOrderValue === "number" && v.minOrderValue > 0 && (
                  <span>Đơn từ {v.minOrderValue.toLocaleString("vi-VN")}đ</span>
                )}
                {expiresLabel(v) && <span>{expiresLabel(v)}</span>}
              </div>
            </div>
            <VoucherApplyButton code={v.code} product={product} />
          </li>
        ))}
      </ul>
      <div className="mt-2 text-[0.7rem]" style={{ color: "rgba(255,255,255,0.4)" }}>
        Nhập mã ở bước checkout — có thể dùng cùng với combo giảm giá.
      </div>
    </div>
  );
}
