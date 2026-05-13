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

export interface VideoInput {
  // product info
  product_name: string;
  product_description: string;
  target_audience?: string;
  cta?: string;
  // style
  style?: "modern" | "cinematic" | "playful" | "luxury" | "minimal";
  voice_id?: string;          // FPT.AI voice
  music_track?: string;       // pixabay track id
  // optional advanced
  scenes?: VideoScene[];      // pre-edited scenes
  brand_colors?: string[];
  logo_url?: string;
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
