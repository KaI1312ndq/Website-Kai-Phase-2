/**
 * Thuế TNCN Việt Nam - compute pure function.
 * Áp dụng cho thu nhập từ tiền lương, tiền công.
 *
 * 2025: 7 bậc thuế (Luật cũ), giảm trừ bản thân 11M, người phụ thuộc 4.4M.
 * 2026: 5 bậc thuế (Nghị quyết 110/2025/UBTVQH15), giảm trừ 15.5M / 6.2M.
 */

export type TaxYear = 2025 | 2026;

export type TaxBracket = {
  /** Mức trên của bậc (inclusive). Bậc cuối dùng Infinity. */
  upTo: number;
  rate: number;
};

export type TaxYearConfig = {
  personalDeduction: number;
  dependentDeduction: number;
  brackets: TaxBracket[];
};

export const TAX_CONFIG: Record<TaxYear, TaxYearConfig> = {
  2025: {
    personalDeduction: 11_000_000,
    dependentDeduction: 4_400_000,
    brackets: [
      { upTo: 5_000_000, rate: 0.05 },
      { upTo: 10_000_000, rate: 0.10 },
      { upTo: 18_000_000, rate: 0.15 },
      { upTo: 32_000_000, rate: 0.20 },
      { upTo: 52_000_000, rate: 0.25 },
      { upTo: 80_000_000, rate: 0.30 },
      { upTo: Infinity, rate: 0.35 },
    ],
  },
  2026: {
    personalDeduction: 15_500_000,
    dependentDeduction: 6_200_000,
    brackets: [
      { upTo: 10_000_000, rate: 0.05 },
      { upTo: 30_000_000, rate: 0.10 },
      { upTo: 60_000_000, rate: 0.20 },
      { upTo: 100_000_000, rate: 0.30 },
      { upTo: Infinity, rate: 0.35 },
    ],
  },
};

// Lương cơ sở 2026 (giữ 2.34M như 2025 - chưa có thay đổi chính thức)
const BASE_SALARY = 2_340_000;
const INSURANCE_CAP_BHXH_BHYT = BASE_SALARY * 20; // 46.8M
// Lương tối thiểu vùng I 2025 - cap BHTN
const MIN_REGIONAL_WAGE = 4_960_000;
const INSURANCE_CAP_BHTN = MIN_REGIONAL_WAGE * 20; // 99.2M

export function computeInsurance(salaryBase: number): {
  bhxh: number;
  bhyt: number;
  bhtn: number;
  total: number;
} {
  const baseHealthSocial = Math.min(Math.max(0, salaryBase), INSURANCE_CAP_BHXH_BHYT);
  const baseUnemployment = Math.min(Math.max(0, salaryBase), INSURANCE_CAP_BHTN);
  const bhxh = Math.round(baseHealthSocial * 0.08);
  const bhyt = Math.round(baseHealthSocial * 0.015);
  const bhtn = Math.round(baseUnemployment * 0.01);
  return { bhxh, bhyt, bhtn, total: bhxh + bhyt + bhtn };
}

export type TaxBracketDetail = {
  rate: number;
  /** Số tiền thu nhập rơi vào bậc này */
  amount: number;
  /** Thuế tính ở bậc */
  tax: number;
  /** "0–10M" hoặc "Trên 100M" - UI label */
  rangeLabel: string;
};

export type TaxBreakdown = {
  year: TaxYear;
  gross: number;
  insurance: number;
  afterInsurance: number;
  deductionPersonal: number;
  deductionDependents: number;
  totalDeduction: number;
  taxableIncome: number;
  brackets: TaxBracketDetail[];
  totalTax: number;
  net: number;
};

function formatInt(n: number): string {
  return n.toLocaleString("vi-VN");
}

export function computeTax(params: {
  gross: number;
  /** Lương đóng bảo hiểm - mặc định = gross. Set khi đóng BH trên 1 mức khác lương thực nhận. */
  insuranceBase?: number;
  dependents?: number;
  hasInsurance?: boolean;
  year: TaxYear;
}): TaxBreakdown {
  const gross = Math.max(0, params.gross);
  const dependents = Math.max(0, Math.floor(params.dependents ?? 0));
  const hasInsurance = params.hasInsurance ?? true;
  const insuranceBase = Math.max(0, params.insuranceBase ?? gross);
  const cfg = TAX_CONFIG[params.year];

  const insurance = hasInsurance ? computeInsurance(insuranceBase).total : 0;
  const afterInsurance = Math.max(0, gross - insurance);

  const deductionPersonal = cfg.personalDeduction;
  const deductionDependents = dependents * cfg.dependentDeduction;
  const totalDeduction = deductionPersonal + deductionDependents;

  const taxableIncome = Math.max(0, afterInsurance - totalDeduction);

  // Áp biểu lũy tiến từng phần
  const brackets: TaxBracketDetail[] = [];
  let totalTax = 0;
  let remaining = taxableIncome;
  let lastUpTo = 0;

  for (const b of cfg.brackets) {
    if (remaining <= 0) break;
    const bracketSize = b.upTo === Infinity ? remaining : b.upTo - lastUpTo;
    const amount = Math.min(remaining, bracketSize);
    const tax = amount * b.rate;
    const rangeLabel = b.upTo === Infinity
      ? `Trên ${formatInt(lastUpTo)}`
      : lastUpTo === 0
        ? `Đến ${formatInt(b.upTo)}`
        : `${formatInt(lastUpTo)} – ${formatInt(b.upTo)}`;
    brackets.push({ rate: b.rate, amount, tax, rangeLabel });
    totalTax += tax;
    remaining -= amount;
    lastUpTo = b.upTo;
  }
  totalTax = Math.round(totalTax);

  return {
    year: params.year,
    gross,
    insurance,
    afterInsurance,
    deductionPersonal,
    deductionDependents,
    totalDeduction,
    taxableIncome,
    brackets,
    totalTax,
    net: gross - insurance - totalTax,
  };
}

/** So sánh 2 năm - return delta savings 2026 vs 2025 (positive = 2026 đỡ thuế hơn) */
export function compareYears(input: { gross: number; insuranceBase?: number; dependents?: number; hasInsurance?: boolean }) {
  const r2025 = computeTax({ ...input, year: 2025 });
  const r2026 = computeTax({ ...input, year: 2026 });
  return {
    y2025: r2025,
    y2026: r2026,
    taxDelta: r2025.totalTax - r2026.totalTax, // positive = tiết kiệm khi sang 2026
    netDelta: r2026.net - r2025.net,
    annualTaxDelta: (r2025.totalTax - r2026.totalTax) * 12,
    annualNetDelta: (r2026.net - r2025.net) * 12,
  };
}
