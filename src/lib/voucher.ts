export type Voucher = {
  _id: string;
  code: string;
  displayName?: string;
  description?: string;
  type: "percent" | "fixed";
  value: number;
  visibility: "public" | "hidden";
  active: boolean;
  expiresAt?: string;
  maxUses?: number;
  usedCount?: number;
  minOrderValue?: number;
};

export type VoucherCheck =
  | { ok: true; discount: number; finalTotal: number; isFree: boolean; voucher: Voucher }
  | { ok: false; error: string };

export function validateVoucher(v: Voucher | null | undefined, subtotal: number): VoucherCheck {
  if (!v) return { ok: false, error: "Mã không tồn tại" };
  if (!v.active) return { ok: false, error: "Mã không còn hoạt động" };
  if (v.expiresAt && new Date(v.expiresAt).getTime() < Date.now()) {
    return { ok: false, error: "Mã đã hết hạn" };
  }
  if (typeof v.maxUses === "number" && (v.usedCount || 0) >= v.maxUses) {
    return { ok: false, error: "Mã đã hết lượt sử dụng" };
  }
  if (typeof v.minOrderValue === "number" && subtotal < v.minOrderValue) {
    return {
      ok: false,
      error: `Đơn tối thiểu ${v.minOrderValue.toLocaleString("vi-VN")}đ để dùng mã này`,
    };
  }
  let discount = 0;
  if (v.type === "percent") {
    discount = Math.floor((subtotal * (v.value || 0)) / 100);
  } else {
    discount = Math.min(Math.max(0, v.value || 0), subtotal);
  }
  discount = Math.max(0, Math.min(discount, subtotal));
  const finalTotal = Math.max(0, subtotal - discount);
  return { ok: true, discount, finalTotal, isFree: finalTotal === 0, voucher: v };
}

export function normalizeCode(input: string): string {
  return input.trim().toUpperCase();
}
