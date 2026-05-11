export type PnLInput = {
  // Volume
  orders: number;
  aov: number;
  returnRatePct: number;

  // Per-order
  cogs: number;
  commissionPct: number;        // hoa hồng % (theo ngành)
  transactionPct: number;       // phí giao dịch % (TikTok/Shopee mặc định 6%)
  voucherSellerPct: number;
  perOrderProcessingFee: number; // phí cơ sở hạ tầng / đơn (TikTok & Shopee mặc định 3.000đ)
  buyerShippingPerOrder: number; // phí ship buyer trả TB / đơn - dùng để tính phí giao dịch chuẩn hơn

  // Monthly fixed
  adsMonthly: number;
  staffMonthly: number;
  warehouseMonthly: number;
  marketingOtherMonthly: number;
  otherMonthly: number;
};

export type PnLLine = {
  label: string;
  amount: number;
  pctOfNet: number;
  isSubtotal?: boolean;
  isFinal?: boolean;
  hint?: string;
};

export type PnLResult = {
  grossRevenue: number;
  netRevenue: number;
  realizedRevenue: number;
  cogsTotal: number;
  grossProfit: number;
  grossMarginPct: number;
  commissionTotal: number;
  transactionTotal: number;
  processingFeeTotal: number;
  platformFeesTotal: number;
  contributionMargin: number;
  contributionMarginPct: number;
  adsTotal: number;
  marketingProfit: number;
  opsTotal: number;
  operatingProfit: number;
  operatingMarginPct: number;
  cpa: number;
  roas: number;
  profitPerOrder: number;
  lines: PnLLine[];
};

export function computePnL(input: PnLInput): PnLResult {
  const {
    orders, aov, returnRatePct,
    cogs, commissionPct, transactionPct, voucherSellerPct, perOrderProcessingFee, buyerShippingPerOrder,
    adsMonthly, staffMonthly, warehouseMonthly, marketingOtherMonthly, otherMonthly,
  } = input;

  const safeOrders = Math.max(0, orders);
  const safeAov = Math.max(0, aov);
  const grossRevenue = safeOrders * safeAov;
  const returns = grossRevenue * (Math.max(0, returnRatePct) / 100);
  const netRevenue = grossRevenue - returns;
  const netOrders = safeOrders * (1 - Math.max(0, returnRatePct) / 100);

  const voucherSellerTotal = netRevenue * (Math.max(0, voucherSellerPct) / 100);
  const realizedRevenue = netRevenue - voucherSellerTotal;

  const cogsTotal = netOrders * Math.max(0, cogs);
  const grossProfit = realizedRevenue - cogsTotal;
  const grossMarginPct = netRevenue > 0 ? (grossProfit / netRevenue) * 100 : 0;

  // Commission applies to realized revenue (price - voucher) - based on category
  const commissionTotal = realizedRevenue * (Math.max(0, commissionPct) / 100);

  // Transaction fee 6% on (Net Revenue + Buyer Shipping - Voucher Seller) per TikTok/Shopee formula
  const buyerShippingTotal = netOrders * Math.max(0, buyerShippingPerOrder);
  const transactionBase = realizedRevenue + buyerShippingTotal;
  const transactionTotal = transactionBase * (Math.max(0, transactionPct) / 100);

  const processingFeeTotal = netOrders * Math.max(0, perOrderProcessingFee);
  const platformFeesTotal = commissionTotal + transactionTotal + processingFeeTotal;

  const contributionMargin = grossProfit - platformFeesTotal;
  const contributionMarginPct = netRevenue > 0 ? (contributionMargin / netRevenue) * 100 : 0;

  const adsTotal = Math.max(0, adsMonthly);
  const marketingProfit = contributionMargin - adsTotal;

  const opsTotal =
    Math.max(0, staffMonthly) +
    Math.max(0, warehouseMonthly) +
    Math.max(0, marketingOtherMonthly) +
    Math.max(0, otherMonthly);
  const operatingProfit = marketingProfit - opsTotal;
  const operatingMarginPct = netRevenue > 0 ? (operatingProfit / netRevenue) * 100 : 0;

  const cpa = netOrders > 0 ? adsTotal / netOrders : 0;
  const roas = adsTotal > 0 ? realizedRevenue / adsTotal : 0;
  const profitPerOrder = netOrders > 0 ? operatingProfit / netOrders : 0;

  const pct = (n: number) => (netRevenue > 0 ? (n / netRevenue) * 100 : 0);

  const totalPlatformPct = netRevenue > 0 ? (platformFeesTotal / netRevenue) * 100 : 0;

  const lines: PnLLine[] = [
    { label: "Doanh thu gross (GMV)", amount: grossRevenue, pctOfNet: pct(grossRevenue), hint: `${safeOrders.toLocaleString("vi-VN")} đơn × ${Math.round(safeAov).toLocaleString("vi-VN")}đ` },
    { label: "(-) Hoàn hàng / huỷ", amount: -returns, pctOfNet: -pct(returns), hint: `${returnRatePct}% GMV` },
    { label: "= Net Revenue", amount: netRevenue, pctOfNet: 100, isSubtotal: true },
    { label: "(-) Voucher seller", amount: -voucherSellerTotal, pctOfNet: -pct(voucherSellerTotal), hint: `${voucherSellerPct}% net` },
    { label: "(-) Giá vốn (COGS)", amount: -cogsTotal, pctOfNet: -pct(cogsTotal), hint: `${Math.round(cogs).toLocaleString("vi-VN")}đ × ${Math.round(netOrders).toLocaleString("vi-VN")} đơn` },
    { label: "= Gross Profit", amount: grossProfit, pctOfNet: grossMarginPct, isSubtotal: true },
    { label: "(-) Hoa hồng sàn", amount: -commissionTotal, pctOfNet: -pct(commissionTotal), hint: `${commissionPct}% × Net Revenue (sau voucher)` },
    { label: "(-) Phí giao dịch", amount: -transactionTotal, pctOfNet: -pct(transactionTotal), hint: buyerShippingPerOrder > 0 ? `${transactionPct}% × (Net + ship buyer trả ${buyerShippingPerOrder.toLocaleString("vi-VN")}đ/đơn)` : `${transactionPct}% × Net Revenue` },
    { label: "(-) Phí cơ sở hạ tầng", amount: -processingFeeTotal, pctOfNet: -pct(processingFeeTotal), hint: `${perOrderProcessingFee.toLocaleString("vi-VN")}đ/đơn` },
    { label: "= Contribution Margin", amount: contributionMargin, pctOfNet: contributionMarginPct, isSubtotal: true, hint: `Tổng phí sàn: ${totalPlatformPct.toFixed(1)}% Net Revenue` },
    { label: "(-) Ads spend", amount: -adsTotal, pctOfNet: -pct(adsTotal), hint: roas > 0 ? `ROAS ${roas.toFixed(1)}x` : undefined },
    { label: "= Marketing Profit", amount: marketingProfit, pctOfNet: pct(marketingProfit), isSubtotal: true },
    { label: "(-) Nhân sự", amount: -staffMonthly, pctOfNet: -pct(staffMonthly) },
    { label: "(-) Kho + logistics cố định", amount: -warehouseMonthly, pctOfNet: -pct(warehouseMonthly) },
    { label: "(-) Marketing khác (KOC, content)", amount: -marketingOtherMonthly, pctOfNet: -pct(marketingOtherMonthly) },
    { label: "(-) Chi khác", amount: -otherMonthly, pctOfNet: -pct(otherMonthly) },
    { label: "= Operating Profit (EBITDA)", amount: operatingProfit, pctOfNet: operatingMarginPct, isFinal: true },
  ];

  return {
    grossRevenue, netRevenue, realizedRevenue,
    cogsTotal, grossProfit, grossMarginPct,
    commissionTotal, transactionTotal, processingFeeTotal, platformFeesTotal,
    contributionMargin, contributionMarginPct,
    adsTotal, marketingProfit,
    opsTotal, operatingProfit, operatingMarginPct,
    cpa, roas, profitPerOrder,
    lines,
  };
}

// Helper: compute Net Revenue without running full P&L
export function computeNetRevenue(orders: number, aov: number, returnRatePct: number): number {
  const gross = Math.max(0, orders) * Math.max(0, aov);
  return gross * (1 - Math.max(0, returnRatePct) / 100);
}

export function fmtVND(n: number): string {
  const abs = Math.abs(Math.round(n));
  const formatted = new Intl.NumberFormat("vi-VN").format(abs);
  return n < 0 ? `-${formatted}` : formatted;
}

/** Compact format for headline cards: 266.000.000 -> "266tr", 1.500.000.000 -> "1,5 tỷ" */
export function fmtVNDCompact(n: number): string {
  const abs = Math.abs(n);
  let str: string;
  if (abs >= 1_000_000_000) {
    const v = n / 1_000_000_000;
    str = (Math.abs(v) >= 10 ? v.toFixed(1) : v.toFixed(2)).replace(".", ",").replace(/,?0+$/, "") + " tỷ";
  } else if (abs >= 1_000_000) {
    const v = Math.round(n / 1_000_000);
    str = v.toLocaleString("vi-VN") + "tr";
  } else if (abs >= 1_000) {
    const v = Math.round(n / 1_000);
    str = v.toLocaleString("vi-VN") + "k";
  } else {
    str = Math.round(n).toLocaleString("vi-VN");
  }
  return str;
}

export function fmtPct(n: number, decimals = 1): string {
  return n.toFixed(decimals) + "%";
}
