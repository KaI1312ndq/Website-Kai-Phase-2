// PayOS client - https://payos.vn/docs
// Used for VietQR payment with auto-confirm via webhook HMAC signature.

import crypto from "crypto";

const PAYOS_BASE = "https://api-merchant.payos.vn";

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function clientId() { return env("PAYOS_CLIENT_ID"); }
function apiKey()   { return env("PAYOS_API_KEY"); }
function checksumKey() { return env("PAYOS_CHECKSUM_KEY"); }

export interface PayOSItem {
  name: string;
  quantity: number;
  price: number;  // VND
}

export interface CreatePaymentLinkInput {
  orderCode: number;       // PayOS requires int64; we derive from payment UUID
  amount: number;          // VND
  description: string;     // memo (max 25 chars, no diacritics ideal)
  cancelUrl: string;
  returnUrl: string;
  items?: PayOSItem[];
  buyerName?: string;
  buyerEmail?: string;
  expiredAt?: number;      // unix seconds
}

export interface CreatePaymentLinkResponse {
  code: string;            // "00" = success
  desc: string;
  data?: {
    bin: string;
    accountNumber: string;
    accountName: string;
    amount: number;
    description: string;
    orderCode: number;
    currency: string;
    paymentLinkId: string;
    status: string;
    checkoutUrl: string;
    qrCode: string;        // QR data string (can render via vietqr or use checkoutUrl)
  };
  signature?: string;
}

/**
 * Recursively sort object keys alphabetically.
 * Arrays preserve order but their object elements are sorted.
 * Per PayOS spec: https://payos.vn/docs/tich-hop-webhook/kiem-tra-du-lieu-voi-signature/
 */
function deepSortObj<T>(input: T): T {
  if (Array.isArray(input)) {
    return input.map((item) => deepSortObj(item)) as unknown as T;
  }
  if (input !== null && typeof input === "object") {
    const sorted: Record<string, unknown> = {};
    for (const key of Object.keys(input as Record<string, unknown>).sort()) {
      sorted[key] = deepSortObj((input as Record<string, unknown>)[key]);
    }
    return sorted as unknown as T;
  }
  return input;
}

/**
 * Build PayOS signature payload from data object.
 * Format: key1=value1&key2=value2 (keys sorted ASC alphabetically).
 * Null/undefined -> empty string.
 * Arrays/objects -> JSON.stringify after deep-sort.
 * No URL encoding (webhooks/payment-requests differ from Payouts API).
 */
function buildSignaturePayload(obj: Record<string, unknown>): string {
  const sorted = deepSortObj(obj);
  const keys = Object.keys(sorted as Record<string, unknown>);
  return keys.map((k) => {
    const v = (sorted as Record<string, unknown>)[k];
    if (v === null || v === undefined) return `${k}=`;
    if (Array.isArray(v) || (typeof v === "object")) return `${k}=${JSON.stringify(v)}`;
    return `${k}=${v}`;
  }).join("&");
}

function hmacSha256(payload: string, key: string): string {
  return crypto.createHmac("sha256", key).update(payload).digest("hex");
}

/** Create a PayOS payment link. The user is redirected to checkoutUrl, or render QR locally. */
export async function createPaymentLink(input: CreatePaymentLinkInput): Promise<CreatePaymentLinkResponse> {
  // PayOS signature for createPaymentLink uses these fields:
  // amount, cancelUrl, description, orderCode, returnUrl
  const sigPayload = `amount=${input.amount}&cancelUrl=${input.cancelUrl}&description=${input.description}&orderCode=${input.orderCode}&returnUrl=${input.returnUrl}`;
  const signature = hmacSha256(sigPayload, checksumKey());

  const body = {
    orderCode: input.orderCode,
    amount: input.amount,
    description: input.description,
    cancelUrl: input.cancelUrl,
    returnUrl: input.returnUrl,
    items: input.items,
    buyerName: input.buyerName,
    buyerEmail: input.buyerEmail,
    expiredAt: input.expiredAt,
    signature,
  };

  const res = await fetch(`${PAYOS_BASE}/v2/payment-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-client-id": clientId(),
      "x-api-key": apiKey(),
    },
    body: JSON.stringify(body),
  });

  return res.json();
}

/** Get payment info from PayOS. Used for fallback polling if webhook misses. */
export async function getPaymentInfo(orderCode: number): Promise<{
  code: string;
  desc: string;
  data?: {
    id: string;
    orderCode: number;
    amount: number;
    amountPaid: number;
    amountRemaining: number;
    status: "PENDING" | "PAID" | "PROCESSING" | "CANCELLED" | "EXPIRED";
    createdAt: string;
    transactions: Array<{
      reference: string;
      amount: number;
      accountNumber: string;
      description: string;
      transactionDateTime: string;
      counterAccountBankId: string | null;
      counterAccountBankName: string | null;
      counterAccountName: string | null;
      counterAccountNumber: string | null;
    }>;
  };
}> {
  const res = await fetch(`${PAYOS_BASE}/v2/payment-requests/${orderCode}`, {
    headers: {
      "x-client-id": clientId(),
      "x-api-key": apiKey(),
    },
  });
  return res.json();
}

/** Cancel a pending payment. */
export async function cancelPaymentLink(orderCode: number, reason?: string): Promise<unknown> {
  const res = await fetch(`${PAYOS_BASE}/v2/payment-requests/${orderCode}/cancel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-client-id": clientId(),
      "x-api-key": apiKey(),
    },
    body: JSON.stringify({ cancellationReason: reason ?? "User cancelled" }),
  });
  return res.json();
}

/** Verify webhook signature. PayOS sends { code, desc, success, data, signature } */
export interface PayOSWebhookBody {
  code: string;
  desc: string;
  success: boolean;
  data: {
    orderCode: number;
    amount: number;
    description: string;
    accountNumber: string;
    reference: string;
    transactionDateTime: string;
    paymentLinkId: string;
    code: string;
    desc: string;
    counterAccountBankId?: string | null;
    counterAccountBankName?: string | null;
    counterAccountName?: string | null;
    counterAccountNumber?: string | null;
    virtualAccountName?: string | null;
    virtualAccountNumber?: string | null;
    currency?: string;
  };
  signature: string;
}

export function verifyWebhookSignature(body: PayOSWebhookBody): boolean {
  const payload = buildSignaturePayload(body.data);
  const expected = hmacSha256(payload, checksumKey());
  return expected === body.signature;
}

/** Convert payment UUID to int64 orderCode for PayOS (uses first 13 hex chars). */
export function paymentIdToOrderCode(paymentId: string): number {
  const hex = paymentId.replace(/-/g, "").slice(0, 13);
  return parseInt(hex, 16);
}
