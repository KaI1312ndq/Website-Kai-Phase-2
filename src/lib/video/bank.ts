// VietQR + Casso bank payment helpers.

export const BANK_INFO = {
  bankId: "MB",                  // MB Bank
  bankCode: "970422",            // VietQR bank code
  accountNumber: "0868464658",
  accountName: "NGUYEN DUC QUANG",
  bankNameVi: "Ngân hàng MB Bank",
} as const;

/** Generate a VietQR image URL via img.vietqr.io (no auth needed). */
export function generateVietQRUrl(opts: {
  amountVnd: number;
  memo: string;
  template?: "compact" | "compact2" | "qr_only" | "print";
}): string {
  const template = opts.template ?? "compact2";
  const params = new URLSearchParams({
    amount: String(opts.amountVnd),
    addInfo: opts.memo,
    accountName: BANK_INFO.accountName,
  });
  return `https://img.vietqr.io/image/${BANK_INFO.bankId}-${BANK_INFO.accountNumber}-${template}.png?${params.toString()}`;
}

/** Memo format that Casso webhook will look for. Must be unique + short. */
export function buildBankMemo(paymentId: string): string {
  // First 8 chars of payment UUID, uppercase, prefix VID for filtering
  const short = paymentId.replace(/-/g, "").slice(0, 8).toUpperCase();
  return `VID${short}`;
}

export function extractPaymentIdFromMemo(memo: string): string | null {
  const match = memo.toUpperCase().match(/VID([A-F0-9]{8})/);
  return match?.[1] ?? null;
}
