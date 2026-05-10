export type ROASInput = {
  price: number;
  cogs: number;
  platformFeePct: number;
  operatingPct: number;
  targetMarginPct: number;
};

export type ROASRow = {
  roas: number;
  adSpendPerOrder: number;
  profitPerOrder: number;
  marginPct: number;
  status: "loss" | "thin" | "good";
};

export type ROASResult = {
  grossMarginPct: number;
  availablePct: number;
  breakEvenROAS: number | null;
  targetROAS: number | null;
  isViable: boolean;
  isTargetViable: boolean;
  table: ROASRow[];
};

const TABLE_ROAS = [2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20, 25, 30];

export function computeROAS(input: ROASInput): ROASResult {
  const { price, cogs, platformFeePct, operatingPct, targetMarginPct } = input;

  if (price <= 0) {
    return {
      grossMarginPct: 0,
      availablePct: 0,
      breakEvenROAS: null,
      targetROAS: null,
      isViable: false,
      isTargetViable: false,
      table: [],
    };
  }

  const grossMarginPct = ((price - Math.max(0, cogs)) / price) * 100;
  const availablePct = grossMarginPct - platformFeePct - operatingPct;

  const isViable = availablePct > 0.01;
  const isTargetViable = availablePct - targetMarginPct > 0.01;

  const breakEvenROAS = isViable ? 100 / availablePct : null;
  const targetROAS = isTargetViable ? 100 / (availablePct - targetMarginPct) : null;

  const table: ROASRow[] = TABLE_ROAS.map((roas) => {
    const adSpendPerOrder = price / roas;
    const profitPerOrder =
      price -
      cogs -
      (price * platformFeePct) / 100 -
      (price * operatingPct) / 100 -
      adSpendPerOrder;
    const marginPct = (profitPerOrder / price) * 100;

    let status: ROASRow["status"];
    if (marginPct < 0) {
      status = "loss";
    } else if (targetMarginPct > 0 && marginPct >= targetMarginPct) {
      status = "good";
    } else {
      status = "thin";
    }

    return { roas, adSpendPerOrder, profitPerOrder, marginPct, status };
  });

  return {
    grossMarginPct,
    availablePct,
    breakEvenROAS,
    targetROAS,
    isViable,
    isTargetViable,
    table,
  };
}

export function fmtVND(n: number): string {
  return new Intl.NumberFormat("vi-VN").format(Math.round(n));
}

export function fmtPct(n: number, decimals = 1): string {
  return n.toFixed(decimals) + "%";
}
