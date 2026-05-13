// FPT.AI TTS v5 voices - https://docs.fpt.ai/

export interface FptVoice {
  id: string;
  label: string;
  region: "north" | "central" | "south";
  gender: "male" | "female";
  useCase: string;
}

export const FPT_VOICES: FptVoice[] = [
  { id: "banmai",   label: "Ban Mai", region: "north", gender: "female", useCase: "Mỹ phẩm, mẹ bé, thời trang" },
  { id: "lannhi",   label: "Lan Nhi", region: "south", gender: "female", useCase: "F&B, lifestyle, du lịch" },
  { id: "linhsan",  label: "Linh San", region: "central", gender: "female", useCase: "Y tế, giáo dục, gia đình" },
  { id: "leminh",   label: "Lê Minh", region: "north", gender: "male",   useCase: "Tech, finance, luxury" },
  { id: "minhquang",label: "Minh Quang", region: "south", gender: "male", useCase: "Bất động sản, ô tô" },
  { id: "myan",     label: "Mỹ An", region: "central", gender: "female", useCase: "Quê hương, ẩm thực miền Trung" },
  { id: "ngoclam",  label: "Ngọc Lam", region: "north", gender: "female", useCase: "Tin tức, broadcast" },
  { id: "thuminh",  label: "Thu Minh", region: "north", gender: "female", useCase: "Trẻ trung, đời thường" },
];

export const VIDEO_STYLES = [
  { id: "ugc",        label: "UGC review",     desc: "Phong cách người dùng tự quay - tin cậy, gần gũi. Hợp mỹ phẩm/F&B/skincare" },
  { id: "demo",       label: "Demo sản phẩm",  desc: "Cận cảnh sản phẩm, show feature/cách dùng. Hợp tech/gia dụng/đồ gia đình" },
  { id: "before_after", label: "Before/After", desc: "So sánh trước-sau - mạnh cho làm đẹp/sức khoẻ/giảm cân" },
  { id: "trendy",     label: "Trendy/Hot trend", desc: "Bắt trend TikTok - meme, transition, music. Hợp thời trang/giới trẻ" },
  { id: "punchy",     label: "Punchy ads",     desc: "Cắt nhanh, energy cao, hook mạnh - hợp flash sale/khuyến mãi" },
  { id: "cinematic",  label: "Cinematic",      desc: "Slow motion, đẹp ngắm - hợp luxury/cao cấp/F&B premium" },
] as const;

export const VIDEO_PLATFORMS = [
  { id: "tiktok",  label: "TikTok",       desc: "9:16 dọc, hook 0-3s mạnh, music trending" },
  { id: "shopee",  label: "Shopee Video", desc: "9:16 dọc, focus sản phẩm + giá + CTA mua" },
  { id: "reels",   label: "FB/IG Reels",  desc: "9:16 dọc, lifestyle, brand-friendly hơn TikTok" },
] as const;
