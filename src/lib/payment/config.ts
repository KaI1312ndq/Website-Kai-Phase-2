/**
 * Payment config — Bank transfer (VietQR / Napas247).
 * Quảng đổi info ở đây nếu muốn dùng tk khác.
 */

export const BANK_CONFIG = {
  bankCode: "970407", // BIN code Techcombank cho VietQR
  bankShort: "TCB",
  bankName: "Techcombank",
  accountNumber: "9808131203",
  accountName: "NGUYEN DUC QUANG",
};

/**
 * Pricing rules — bundle discount.
 * 1 sản phẩm: 99k mỗi
 * Bundle 2: 169k tổng (-29k)
 * Bundle 3: 199k tổng (-98k)
 */
export const BUNDLE_PRICING: Record<number, number> = {
  1: 99_000,
  2: 169_000,
  3: 199_000,
};

export function calculatePrice(itemCount: number): { subtotal: number; total: number; discount: number } {
  const itemPrice = 99_000;
  const subtotal = itemCount * itemPrice;
  const total = BUNDLE_PRICING[itemCount] ?? subtotal;
  const discount = subtotal - total;
  return { subtotal, total, discount };
}

/**
 * Generate VietQR image URL — auto-fill amount + memo, scan to pay.
 * Reference: https://vietqr.io/danh-sach-api
 */
export function generateVietQRUrl({
  amount,
  memo,
  template = "compact2",
}: {
  amount: number;
  memo: string;
  template?: "compact" | "compact2" | "qr_only" | "print";
}): string {
  const params = new URLSearchParams({
    amount: String(amount),
    addInfo: memo,
    accountName: BANK_CONFIG.accountName,
  });
  return `https://img.vietqr.io/image/${BANK_CONFIG.bankCode}-${BANK_CONFIG.accountNumber}-${template}.png?${params.toString()}`;
}

/**
 * Generate order number — random 6-char alphanumeric uppercase.
 * Format: MUA-XXXXXX (memo for bank transfer)
 */
export function generateOrderNumber(): string {
  const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ23456789"; // exclude confusing 0/O/I/1
  let id = "";
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return `MUA-${id}`;
}

/**
 * Generate download token — random 32-char.
 */
export function generateDownloadToken(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
  for (let i = 0; i < 32; i++) token += chars[Math.floor(Math.random() * chars.length)];
  return token;
}
