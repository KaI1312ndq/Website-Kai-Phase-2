export type PnLInput = {
  // Volume
  orders: number;            // số đơn hoàn thành / tháng
  aov: number;               // giá trị trung bình / đơn (VND)
  returnRatePct: number;     // tỷ lệ hoàn hàng % (đơn đã giao nhưng buyer hoàn)

  // Per-order costs
  cogs: number;              // giá vốn / đơn
  platformFeePct: number;    // tổng phí sàn % (commission + transaction)
  voucherSellerPct: number;  // % voucher seller chi
  perOrderProcessingFee: number; // phí xử lý đơn cố định (3.000đ TikTok)
  shippingPerOrder: number;  // phí ship seller chịu / đơn (0 nếu buyer trả hết)

  // Monthly fixed costs
  adsMonthly: number;        // ngân sách ads / tháng
  staffMonthly: number;      // nhân sự / tháng
  warehouseMonthly: number;  // kho + ops cố định / tháng
  marketingOtherMonthly: number; // KOC, influencer, photoshoot, samples
  otherMonthly: number;      // chi khác
};

export type PnLLine = {
  label: string;
  amount: number;
  pctOfNet: number;          // % so với net revenue
  isSubtotal?: boolean;
  isFinal?: boolean;
  hint?: string;
};

export type PnLResult = {
  grossRevenue: number;
  netRevenue: number;          // sau hoàn hàng
  realizedRevenue: number;     // sau voucher seller (số tiền thực thu trước khi sàn trừ phí)
  cogsTotal: number;
  grossProfit: number;
  grossMarginPct: number;
  platformFeesTotal: number;
  shippingTotal: number;
  contributionMargin: number;  // sau phí sàn + ship
  contributionMarginPct: number;
  adsTotal: number;
  marketingProfit: number;     // sau ads
  opsTotal: number;            // staff + warehouse + marketing other + other
  operatingProfit: number;     // EBITDA
  operatingMarginPct: number;
  // ROAS / unit economics
  cpa: number;                 // ads spend / số đơn ròng (sau hoàn)
  roas: number;                // doanh thu thực thu / ads
  profitPerOrder: number;
  // Lines for table
  lines: PnLLine[];
};

export function computePnL(input: PnLInput): PnLResult {
  const {
    orders, aov, returnRatePct,
    cogs, platformFeePct, voucherSellerPct, perOrderProcessingFee, shippingPerOrder,
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

  // Platform fees apply on realized revenue base + per-order processing
  const platformPctFee = realizedRevenue * (Math.max(0, platformFeePct) / 100);
  const processingFeeTotal = netOrders * Math.max(0, perOrderProcessingFee);
  const platformFeesTotal = platformPctFee + processingFeeTotal;

  const shippingTotal = netOrders * Math.max(0, shippingPerOrder);

  const contributionMargin = grossProfit - platformFeesTotal - shippingTotal;
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

  const lines: PnLLine[] = [
    { label: "Doanh thu gross (GMV)", amount: grossRevenue, pctOfNet: pct(grossRevenue), hint: `${safeOrders.toLocaleString("vi-VN")} đơn × ${Math.round(safeAov).toLocaleString("vi-VN")}đ` },
    { label: "(-) Hoàn hàng / huỷ", amount: -returns, pctOfNet: -pct(returns), hint: `${returnRatePct}% GMV` },
    { label: "= Net Revenue", amount: netRevenue, pctOfNet: 100, isSubtotal: true },
    { label: "(-) Voucher seller", amount: -voucherSellerTotal, pctOfNet: -pct(voucherSellerTotal), hint: `${voucherSellerPct}% net` },
    { label: "(-) Giá vốn (COGS)", amount: -cogsTotal, pctOfNet: -pct(cogsTotal), hint: `${Math.round(cogs).toLocaleString("vi-VN")}đ × ${Math.round(netOrders).toLocaleString("vi-VN")} đơn` },
    { label: "= Gross Profit", amount: grossProfit, pctOfNet: grossMarginPct, isSubtotal: true },
    { label: "(-) Phí sàn (HH + GD + xử lý)", amount: -platformFeesTotal, pctOfNet: -pct(platformFeesTotal), hint: `${platformFeePct}% + ${perOrderProcessingFee}đ/đơn` },
    { label: "(-) Ship seller chịu", amount: -shippingTotal, pctOfNet: -pct(shippingTotal), hint: shippingPerOrder > 0 ? `${shippingPerOrder.toLocaleString("vi-VN")}đ/đơn` : "0đ/đơn" },
    { label: "= Contribution Margin", amount: contributionMargin, pctOfNet: contributionMarginPct, isSubtotal: true },
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
    platformFeesTotal, shippingTotal,
    contributionMargin, contributionMarginPct,
    adsTotal, marketingProfit,
    opsTotal, operatingProfit, operatingMarginPct,
    cpa, roas, profitPerOrder,
    lines,
  };
}

export function fmtVND(n: number): string {
  const abs = Math.abs(Math.round(n));
  const formatted = new Intl.NumberFormat("vi-VN").format(abs);
  return n < 0 ? `-${formatted}` : formatted;
}

export function fmtPct(n: number, decimals = 1): string {
  return n.toFixed(decimals) + "%";
}
