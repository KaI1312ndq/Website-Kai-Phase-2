import tiktok from "./tiktok.json";
import shopeeMall from "./shopee-mall.json";
import shopeeNonMall from "./shopee-non-mall.json";

/* ─── Types ─── */
export type TiktokRow = { g: string; l1: string; l2: string; l3: string; std: number; mall: number };
export type ShopeeRow = { l1: string; l2: string; l3: string; rate: number };

export const TIKTOK_ROWS = tiktok as TiktokRow[];
export const SHOPEE_MALL_ROWS = shopeeMall as ShopeeRow[];
export const SHOPEE_NONMALL_ROWS = shopeeNonMall as ShopeeRow[];

/* ─── Fallback rates (per spec) ─── */
export const TIKTOK_DEFAULT_STD = 12.5;
export const TIKTOK_DEFAULT_MALL = 15.5;
// Shopee không công bố default; dùng 17% (mid-range sau tăng 29/05/2026 - Beauty/Health đã 19-20%, Fashion 16-19%).
// Updated 14/05/2026: nâng từ 16.5 -> 17 để phản ánh thực tế ngành phổ biến sau tăng phí.
export const SHOPEE_DEFAULT_MALL = 17;
export const SHOPEE_DEFAULT_NONMALL = 10.5;

/* ─── Search across all levels (free-text) ─── */

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip Vietnamese diacritics
    .replace(/[đĐ]/g, "d")
    .trim();
}

function tokens(s: string): string[] {
  return normalize(s).split(/\s+/).filter(Boolean);
}

export type TiktokMatch = TiktokRow & { path: string };
export type ShopeeMatch = ShopeeRow & { path: string; mallRate: number; nonMallRate: number };

export function searchTiktok(q: string, limit = 30): TiktokMatch[] {
  const ts = tokens(q);
  if (!ts.length) return [];
  const out: TiktokMatch[] = [];
  for (const r of TIKTOK_ROWS) {
    const haystack = normalize([r.g, r.l1, r.l2, r.l3].filter(Boolean).join(" "));
    if (ts.every((t) => haystack.includes(t))) {
      out.push({ ...r, path: [r.g, r.l1, r.l2, r.l3].filter(Boolean).join(" › ") });
      if (out.length >= limit) break;
    }
  }
  return out;
}

export function searchShopee(q: string, limit = 30): ShopeeMatch[] {
  const ts = tokens(q);
  if (!ts.length) return [];
  // Combine Mall + NonMall rows so search hits both - dedupe by path
  const seen = new Set<string>();
  const all = [...SHOPEE_MALL_ROWS, ...SHOPEE_NONMALL_ROWS];
  const out: ShopeeMatch[] = [];
  for (const r of all) {
    const path = [r.l1, r.l2, r.l3].filter(Boolean).join(" › ");
    if (seen.has(path)) continue;
    const haystack = normalize([r.l1, r.l2, r.l3].filter(Boolean).join(" "));
    if (ts.every((t) => haystack.includes(t))) {
      seen.add(path);
      out.push({
        ...r,
        path,
        mallRate: shopeeMallRate(r.l1, r.l2, r.l3),
        nonMallRate: shopeeNonMallRate(r.l1, r.l2, r.l3),
      });
      if (out.length >= limit) break;
    }
  }
  return out;
}

/* ─── Cascading distinct option helpers ─── */

export function tiktokGroups(): string[] {
  return Array.from(new Set(TIKTOK_ROWS.map((r) => r.g))).sort();
}
export function tiktokLevel1(group: string): string[] {
  return Array.from(new Set(TIKTOK_ROWS.filter((r) => r.g === group).map((r) => r.l1))).sort();
}
export function tiktokLevel2(group: string, l1: string): string[] {
  return Array.from(new Set(TIKTOK_ROWS.filter((r) => r.g === group && r.l1 === l1).map((r) => r.l2).filter(Boolean))).sort();
}
export function tiktokLevel3(group: string, l1: string, l2: string): string[] {
  return Array.from(new Set(TIKTOK_ROWS.filter((r) => r.g === group && r.l1 === l1 && r.l2 === l2).map((r) => r.l3).filter(Boolean))).sort();
}

export function tiktokRate(group: string, l1: string, l2: string, l3: string): { std: number; mall: number } {
  // Most specific match
  const exact = TIKTOK_ROWS.find((r) => r.g === group && r.l1 === l1 && r.l2 === l2 && r.l3 === l3);
  if (exact) return { std: exact.std, mall: exact.mall };
  const l2Match = TIKTOK_ROWS.find((r) => r.g === group && r.l1 === l1 && r.l2 === l2);
  if (l2Match) return { std: l2Match.std, mall: l2Match.mall };
  const l1Match = TIKTOK_ROWS.find((r) => r.g === group && r.l1 === l1);
  if (l1Match) return { std: l1Match.std, mall: l1Match.mall };
  return { std: TIKTOK_DEFAULT_STD, mall: TIKTOK_DEFAULT_MALL };
}

/* Shopee - Mall vs Non-Mall PDFs riêng -> chỉ cần ngành cấp 1/2/3 thống nhất */
export function shopeeLevel1(): string[] {
  return Array.from(new Set([...SHOPEE_MALL_ROWS, ...SHOPEE_NONMALL_ROWS].map((r) => r.l1))).sort();
}
export function shopeeLevel2(l1: string): string[] {
  return Array.from(new Set([...SHOPEE_MALL_ROWS, ...SHOPEE_NONMALL_ROWS].filter((r) => r.l1 === l1).map((r) => r.l2).filter(Boolean))).sort();
}
export function shopeeLevel3(l1: string, l2: string): string[] {
  return Array.from(new Set([...SHOPEE_MALL_ROWS, ...SHOPEE_NONMALL_ROWS].filter((r) => r.l1 === l1 && r.l2 === l2).map((r) => r.l3).filter(Boolean))).sort();
}
function shopeeLookup(rows: ShopeeRow[], l1: string, l2: string, l3: string, fallback: number): number {
  const exact = rows.find((r) => r.l1 === l1 && r.l2 === l2 && r.l3 === l3);
  if (exact) return exact.rate;
  const l2Match = rows.find((r) => r.l1 === l1 && r.l2 === l2);
  if (l2Match) return l2Match.rate;
  const l1Match = rows.find((r) => r.l1 === l1);
  if (l1Match) return l1Match.rate;
  return fallback;
}
export function shopeeMallRate(l1: string, l2: string, l3: string): number {
  return shopeeLookup(SHOPEE_MALL_ROWS, l1, l2, l3, SHOPEE_DEFAULT_MALL);
}
export function shopeeNonMallRate(l1: string, l2: string, l3: string): number {
  return shopeeLookup(SHOPEE_NONMALL_ROWS, l1, l2, l3, SHOPEE_DEFAULT_NONMALL);
}

/* ─── Compute ─── */

export type ExtraCost = {
  id: string;
  label: string;
  mode: "percent" | "flat";
  value: number; // % (0-100) or VNĐ
};

export type CalcInput = {
  price: number;
  cogs: number;
  sellerVoucherPct: number; // % seller giảm
  shippingBuyer: number;    // VND - Phí vận chuyển buyer phải trả (tham gia base phí giao dịch)
  commissionRate: number;   // % phí hoa hồng nền tảng (theo platform/mall)
  txnRate: number;          // % phí giao dịch - TikTok 6, Shopee 6
  perOrderFee: number;      // VND - TikTok 3000 / Shopee 3000
  voucherExtra?: { rate: number; cap?: number };
  voucherExtraPlus?: { rate: number; cap?: number };
  piShip?: number;          // VND - Shopee 1.600đ
  sfr?: number;             // VND - TikTok 1.620đ (bồi hoàn vận chuyển)
  /**
   * Shopee Duy trì hiển thị (DVHT) - áp dụng từ 29/05/2026.
   * Cơ chế tự nạp tiền cho DVHT từ doanh thu mỗi đơn.
   * Mặc định 1% (tiêu chuẩn), seller có thể chỉnh 1-50% (linh hoạt).
   */
  duyTriHienThiRate?: number; // % (1-50)
  extraCosts: ExtraCost[];
};

export type CalcResult = {
  revenueGross: number;
  sellerVoucher: number;
  netRevenue: number;
  txnBase: number;        // Cơ sở tính phí giao dịch (price + ship - sellerVoucher - bankPromo)
  commission: number;
  txn: number;
  perOrder: number;
  voucherExtra: number;
  voucherExtraPlus: number;
  piShip: number;
  sfr: number;
  duyTriHienThi: number;  // Shopee DVHT - trích tự động theo % từ doanh thu
  totalPlatformFee: number;
  extras: { label: string; amount: number }[];
  totalExtras: number;
  cogs: number;
  profit: number;
  marginPct: number;
};

export function compute(i: CalcInput): CalcResult {
  const sellerVoucher = i.price * (i.sellerVoucherPct / 100);
  const netRevenue = i.price - sellerVoucher; // Doanh thu thực seller nhận được từ sàn

  // Phí hoa hồng - tính trên giá sau seller voucher (theo CT chính thức TikTok)
  const commission = netRevenue * (i.commissionRate / 100);

  // Phí giao dịch - tính trên (giá gốc + ship buyer trả - seller voucher)
  // Theo CT chính thức Shopee/TikTok 2026
  const txnBase = Math.max(0, i.price + (i.shippingBuyer || 0) - sellerVoucher);
  const txn = txnBase * (i.txnRate / 100);

  const perOrder = i.perOrderFee;

  let voucherExtra = 0;
  if (i.voucherExtra) {
    const raw = i.price * (i.voucherExtra.rate / 100);
    voucherExtra = i.voucherExtra.cap ? Math.min(raw, i.voucherExtra.cap) : raw;
  }
  let voucherExtraPlus = 0;
  if (i.voucherExtraPlus) {
    const raw = i.price * (i.voucherExtraPlus.rate / 100);
    voucherExtraPlus = i.voucherExtraPlus.cap ? Math.min(raw, i.voucherExtraPlus.cap) : raw;
  }
  const piShip = i.piShip ?? 0;
  const sfr = i.sfr ?? 0;

  // Duy trì hiển thị (Shopee, từ 29/05/2026) - tự nạp 1% mặc định (linh hoạt 1-50%)
  // Tính trên doanh thu thực (net revenue) - sau seller voucher
  const dvhtRate = i.duyTriHienThiRate ?? 0;
  const duyTriHienThi = netRevenue * (dvhtRate / 100);

  const totalPlatformFee = commission + txn + perOrder + voucherExtra + voucherExtraPlus + piShip + sfr + duyTriHienThi;

  const extras = i.extraCosts.map((c) => ({
    label: c.label,
    amount: c.mode === "percent" ? netRevenue * (c.value / 100) : c.value,
  }));
  const totalExtras = extras.reduce((s, e) => s + e.amount, 0);

  const profit = netRevenue - totalPlatformFee - totalExtras - i.cogs;
  const marginPct = i.price > 0 ? (profit / i.price) * 100 : 0;

  return {
    revenueGross: i.price,
    sellerVoucher,
    netRevenue,
    txnBase,
    commission,
    txn,
    perOrder,
    voucherExtra,
    voucherExtraPlus,
    piShip,
    sfr,
    duyTriHienThi,
    totalPlatformFee,
    extras,
    totalExtras,
    cogs: i.cogs,
    profit,
    marginPct,
  };
}

export const PLATFORM_CONFIG = {
  tiktokNonMall: {
    label: "TikTok Shop · Non-Mall",
    short: "TT Non-Mall",
    color: "#000000",
    accent: "#ff3358",
    txnRate: 6,
    perOrderFee: 3000,
    voucherExtraOptions: { rate: 4, cap: 50000 },
    voucherExtraPlusOptions: { rate: 5.5, cap: 80000 },
    sfr: 1620,
  },
  tiktokMall: {
    label: "TikTok Shop · Mall",
    short: "TT Mall",
    color: "#000000",
    accent: "#ff3358",
    txnRate: 6,
    perOrderFee: 3000,
    voucherExtraOptions: { rate: 4, cap: 50000 },
    voucherExtraPlusOptions: { rate: 5.5, cap: 80000 },
    sfr: 1620,
  },
  shopeeNonMall: {
    label: "Shopee · Non-Mall",
    short: "Shopee Non-Mall",
    color: "#EE4D2D",
    accent: "#EE4D2D",
    txnRate: 6,
    perOrderFee: 3000,
    voucherExtraOptions: { rate: 5.5, cap: 50000 }, // updated 23/05/2026: 4% -> 5.5%
    piShip: 2700, // updated 23/05/2026: 1620 -> 2700
    duyTriHienThiDefault: 1, // % - DVHT tiêu chuẩn từ 29/05/2026
  },
  shopeeMall: {
    label: "Shopee · Mall",
    short: "Shopee Mall",
    color: "#EE4D2D",
    accent: "#EE4D2D",
    txnRate: 6,
    perOrderFee: 3000,
    voucherExtraOptions: { rate: 5.5, cap: 50000 }, // updated 23/05/2026: 4% -> 5.5%
    piShip: 2700, // updated 23/05/2026: 1620 -> 2700
    duyTriHienThiDefault: 1, // % - DVHT tiêu chuẩn từ 29/05/2026
  },
} as const;

export type PlatformKey = keyof typeof PLATFORM_CONFIG;

export function fmt(n: number) {
  return Math.round(n).toLocaleString("vi-VN");
}
