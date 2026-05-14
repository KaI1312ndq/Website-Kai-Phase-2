// AI Video Studio - shared types

export type VideoTier = "eco" | "standard" | "pro";
export type VideoDuration = 15 | 20 | 25 | 30;

export type VideoStatus =
  | "pending"
  | "scripting"
  | "imaging"
  | "animating"
  | "composing"
  | "completed"
  | "failed"
  | "refunded"
  | "cancelled";

export type PaymentStatus = "pending" | "completed" | "failed" | "expired" | "cancelled";
export type PaymentMethod = "bank" | "momo";
export type TokenTxType = "topup" | "spend" | "refund" | "bonus" | "adjust";

export interface VideoProfile {
  user_id: string;
  token_balance: number;
  total_spent_vnd: number;
  total_videos_created: number;
  welcome_bonus_granted: boolean;
  created_at: string;
  updated_at: string;
}

export interface VideoTokenTransaction {
  id: string;
  user_id: string;
  type: TokenTxType;
  amount: number;
  balance_after: number;
  reference_id: string | null;
  note: string | null;
  created_at: string;
}

export interface VideoPayment {
  id: string;
  user_id: string;
  amount_vnd: number;
  tokens_received: number;
  bonus_percent: number;
  method: PaymentMethod;
  status: PaymentStatus;
  bank_memo: string | null;
  casso_tx_id: string | null;
  momo_request_id: string | null;
  created_at: string;
  paid_at: string | null;
  expires_at: string;
}

export type VideoPlatform = "tiktok" | "shopee" | "reels";

export interface VideoInput {
  // preset (auto-fills 9 brief dimensions if user uses Quick mode)
  preset_id?: string;
  platform?: VideoPlatform;

  // product (Quick mode mandatory)
  product_name: string;
  product_description: string;
  cta?: string;

  // optional ecom
  target_audience?: string;
  price_vnd?: number;
  promo?: string;
  social_proof?: string;

  // Advanced overrides (9 brief dimensions)
  shot_size?: string;
  camera_angle?: string;
  camera_motion?: string;
  lighting?: string;
  mc_emotion?: string;
  voice_id?: string;
  mc_character?: string;
  wardrobe?: string;
  concept?: string;

  // misc
  music_track?: string;
  brand_colors?: string[];
  logo_url?: string;
}

export interface VideoSceneRow {
  id: string;
  video_id: string;
  scene_idx: number;
  label: string | null;
  script_text: string | null;
  visual_prompt: string | null;
  voiceover_text: string | null;
  duration_sec: number;
  status: "pending" | "rendering" | "completed" | "failed" | "approved";
  approved_by_user: boolean;
  is_lipsync: boolean;
  output_url: string | null;
  thumbnail_url: string | null;
  voice_url: string | null;
  regen_count: number;
  cost_token: number;
  created_at: string;
  updated_at: string;
}

export interface VideoScene {
  idx: number;
  duration: number;            // seconds
  prompt: string;              // image prompt
  voiceover_text: string;      // TTS text
  camera_motion?: string;      // for Kling
}

export interface Video {
  id: string;
  user_id: string;
  input_data: VideoInput;
  duration: VideoDuration;
  tier: VideoTier;
  token_cost: number;
  avatar_id: string | null;
  is_draft: boolean;
  queue_priority: number;
  status: VideoStatus;
  status_message: string | null;
  progress_percent: number;
  output_url: string | null;
  thumbnail_url: string | null;
  watermark: boolean;
  error_message: string | null;
  retry_count: number;
  failed_step: string | null;
  script_text: string | null;
  voice_id: string | null;
  music_track: string | null;
  created_at: string;
  updated_at: string;
  started_at: string | null;
  completed_at: string | null;
}
