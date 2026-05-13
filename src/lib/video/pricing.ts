// AI Video Studio - pricing logic
// 1 token = 1.000 VND. Flexible topup amount + tier bonus.

import type { VideoTier, VideoDuration } from "./types";

export const TOKEN_VND = 1000;
export const MIN_TOPUP_VND = 50_000;
export const MAX_TOPUP_VND = 50_000_000;
export const WELCOME_BONUS_TOKENS = 40;

export interface BonusTier {
  minVnd: number;
  bonusPercent: number;
  label: string;
}

export const BONUS_TIERS: BonusTier[] = [
  { minVnd: 5_000_000, bonusPercent: 30, label: "Mega" },
  { minVnd: 1_000_000, bonusPercent: 20, label: "Power" },
  { minVnd: 500_000,   bonusPercent: 10, label: "Plus" },
  { minVnd: 50_000,    bonusPercent: 0,  label: "Starter" },
];

/** Compute tokens received for a given VND amount (includes bonus). */
export function computeTokensForTopup(amountVnd: number): {
  baseTokens: number;
  bonusTokens: number;
  totalTokens: number;
  bonusPercent: number;
} {
  if (amountVnd < MIN_TOPUP_VND) {
    return { baseTokens: 0, bonusTokens: 0, totalTokens: 0, bonusPercent: 0 };
  }
  const tier = BONUS_TIERS.find((t) => amountVnd >= t.minVnd);
  const bonusPercent = tier?.bonusPercent ?? 0;
  const baseTokens = Math.floor(amountVnd / TOKEN_VND);
  const bonusTokens = Math.floor((baseTokens * bonusPercent) / 100);
  return {
    baseTokens,
    bonusTokens,
    totalTokens: baseTokens + bonusTokens,
    bonusPercent,
  };
}

/** Pricing matrix per Brief section 3.3 */
export const PRICING_MATRIX: Record<VideoTier, Partial<Record<VideoDuration, number>>> = {
  eco: {
    20: 25,
    25: 30,
  },
  standard: {
    15: 25,
    20: 30,
    25: 35,
    30: 40,
  },
  pro: {
    15: 60,
    20: 75,
    25: 90,
    30: 100,
  },
};

export function getVideoTokenCost(tier: VideoTier, duration: VideoDuration): number | null {
  const cost = PRICING_MATRIX[tier]?.[duration];
  return typeof cost === "number" ? cost : null;
}

/** Cost to regenerate a single clip */
export function getClipRegenCost(tier: VideoTier): number {
  return tier === "pro" ? 30 : 15;
}

export const TIER_LABELS: Record<VideoTier, string> = {
  eco: "Eco",
  standard: "Standard",
  pro: "Pro",
};

export const TIER_DESCRIPTIONS: Record<VideoTier, string> = {
  eco: "Kling 3.0 Std - hàng đợi thường (5-10 phút)",
  standard: "Kling 3.0 Std - hàng đợi ưu tiên (~2-3 phút)",
  pro: "Kling 3.0 Pro - chất lượng cao nhất, ưu tiên cao nhất",
};
