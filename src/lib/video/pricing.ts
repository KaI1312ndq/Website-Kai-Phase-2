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

/**
 * Pricing matrix v2 (2026-05-14) - Strategy B Hybrid Anthropic + FPT.
 *
 * Cost breakdown 1 video Std 20s (6 cảnh ~3.3s/cảnh) với lip-sync:
 * - Anthropic Claude Haiku script    : ~50đ
 * - Anthropic Vision image analysis  : ~125đ
 * - fal.ai Kling 3.0 Std (6×3.3s)    : ~14.500đ ($0.029/s)
 * - fal.ai Hedra lip sync (6 scenes) : ~12.500đ ($0.10/scene, optional)
 * - FPT.AI VITs TTS (6×~200 chars)   : ~300đ
 * - FPT.AI Whisper STT (auto-caption): ~100đ
 * - FFmpeg compose (local)           : 0đ
 * Total: ~27.500đ với lip-sync, ~15.000đ B-roll only
 *
 * Pro tier dùng Kling 3.0 Pro ($0.058/s) = ~2x cost.
 * Eco tier = Kling Std nhưng slow queue → bán rẻ hơn Std.
 *
 * Target margin: 30-40% (sau khi gỡ free credit).
 */
export const PRICING_MATRIX: Record<VideoTier, Partial<Record<VideoDuration, number>>> = {
  eco: {
    20: 30,
    25: 40,
  },
  standard: {
    15: 35,
    20: 45,
    25: 55,
    30: 65,
  },
  pro: {
    15: 80,
    20: 100,
    25: 120,
    30: 140,
  },
};

export function getVideoTokenCost(tier: VideoTier, duration: VideoDuration): number | null {
  const cost = PRICING_MATRIX[tier]?.[duration];
  return typeof cost === "number" ? cost : null;
}

/**
 * Cost to regenerate a single scene (5s clip).
 *
 * Std (Kling 3.0 Std, 5s):   5 × 725đ = 3.625đ → sell 5 token (margin 28%)
 * Std + lip-sync (Hedra):    3.625đ + 2.500đ = 6.125đ → sell 8 token (margin 24%)
 * Pro (Kling 3.0 Pro, 5s):   5 × 1.450đ = 7.250đ → sell 10 token (margin 28%)
 * Pro + lip-sync:            7.250đ + 2.500đ = 9.750đ → sell 13 token (margin 25%)
 */
export const SCENE_REGEN_COST: Record<VideoTier, { standard: number; lipsync: number }> = {
  eco:      { standard: 5,  lipsync: 8  },
  standard: { standard: 5,  lipsync: 8  },
  pro:      { standard: 10, lipsync: 13 },
};

export function getSceneRegenCost(tier: VideoTier, isLipSync: boolean): number {
  const t = SCENE_REGEN_COST[tier] ?? SCENE_REGEN_COST.standard;
  return isLipSync ? t.lipsync : t.standard;
}

/** Legacy export - kept for older code paths */
export function getClipRegenCost(tier: VideoTier): number {
  return getSceneRegenCost(tier, false);
}

export const SCENES_PER_VIDEO = 6;

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
