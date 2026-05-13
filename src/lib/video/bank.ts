// VietQR helpers. PayOS provides virtual accounts per payment - we render QR pointing at those.

/** Real owner bank info (display only - DO NOT transfer here for PayOS auto-confirm). */
export const BANK_INFO = {
  bankId: "MB",
  bankCode: "970422",
  accountNumber: "0868464658",
  accountName: "NGUYEN DUC QUANG",
  bankNameVi: "Ngân hàng MB Bank",
} as const;

/** Map PayOS BIN code (6-digit, e.g. "970422") to VietQR short code (e.g. "MB"). */
const BIN_TO_VIETQR: Record<string, string> = {
  "970422": "MB",
  "970436": "VCB",
  "970418": "BIDV",
  "970415": "VTB",
  "970407": "TCB",
  "970432": "VPB",
  "970416": "ACB",
  "970448": "OCB",
  "970423": "TPB",
  "970403": "STB",
  "970454": "VCCB",
  "970419": "NCB",
  "970438": "BVB",
  "970426": "MSB",
  "970437": "HDB",
  "970429": "SCB",
  "970441": "VIB",
};

/** Generate a VietQR image URL pointing at a specific account (e.g. PayOS virtual account). */
export function generateVietQRUrl(opts: {
  bin?: string;              // PayOS BIN code (preferred)
  bankId?: string;            // Or VietQR short id (fallback)
  accountNumber: string;
  accountName: string;
  amountVnd: number;
  memo: string;
  template?: "compact" | "compact2" | "qr_only" | "print";
}): string {
  const template = opts.template ?? "compact2";
  const shortId = opts.bankId
    ?? (opts.bin ? BIN_TO_VIETQR[opts.bin] : undefined)
    ?? BANK_INFO.bankId;
  const params = new URLSearchParams({
    amount: String(opts.amountVnd),
    addInfo: opts.memo,
    accountName: opts.accountName,
  });
  return `https://img.vietqr.io/image/${shortId}-${opts.accountNumber}-${template}.png?${params.toString()}`;
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
