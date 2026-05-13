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

/**
 * 4 format chủ đạo từ brief Yumvita - phù hợp TikTok ads ecom.
 * Mỗi format định ai là người kể chuyện và góc nhìn nội dung.
 */
export const VIDEO_FORMATS = [
  {
    id: "dialog",
    label: "Đối thoại Sản phẩm ↔ Người dùng",
    desc: "Sản phẩm hoạt hình 'chỉnh' người dùng. Cà khịa thói quen ăn uống. Mạnh nhất cho ecom thực phẩm/skincare.",
  },
  {
    id: "monologue",
    label: "Độc thoại Sản phẩm tự kể",
    desc: '"Tôi là [sản phẩm] đây..." - sản phẩm tự kể nguồn gốc, thành phần, USP theo ngôi thứ nhất.',
  },
  {
    id: "drama",
    label: "Drama: các sản phẩm đấu nhau",
    desc: "VD: snack dầu mỡ vs sản phẩm bạn. Tạo conflict + winner rõ ràng - hợp so sánh competitor.",
  },
  {
    id: "body_pain",
    label: "Pain point cơ thể",
    desc: "Bộ phận cơ thể (dạ dày/não/da) cameo than phiền. Hook bằng cảm xúc cơ thể, mạnh cho healthy/sức khoẻ.",
  },
] as const;

/**
 * Nhân vật chính trong video (theo brief Yumvita).
 * AI sẽ adapt script + visual theo character được chọn.
 */
export const CHARACTER_TYPES = [
  {
    id: "product",
    label: "Sản phẩm hoạt hình",
    desc: "Sản phẩm có tay chân, biểu cảm. Giữ nguyên bao bì + màu thật. 'Có cá tính', biết mình giá trị.",
  },
  {
    id: "user_persona",
    label: "Cô gái/chàng trai đại diện user",
    desc: "Gen Z hiện đại, relatable. 'Nạn nhân' của lifestyle: đói chiều, sợ béo, stress. Đặt vấn đề.",
  },
  {
    id: "body_part",
    label: "Bộ phận cơ thể hoạt hình",
    desc: "Dạ dày/não/da/eo bụng... đại diện than phiền. Meme-able, biểu cảm exaggerated.",
  },
  {
    id: "duo",
    label: "Sản phẩm + Người dùng (2 nhân vật)",
    desc: "Đối thoại 2 chiều: sản phẩm chỉnh người dùng. Phù hợp format đối thoại.",
  },
] as const;

/**
 * Tone giọng - cũng ảnh hưởng prompt script + cách AI viết.
 */
export const VIDEO_TONES = [
  {
    id: "sharp_sarcastic",
    label: "Thẳng thắn + xéo",
    desc: "'Ăn thế này thì mụn là đúng.' Cà khịa nhẹ, dứt khoát. Hợp pain point + drama.",
  },
  {
    id: "friendly_funny",
    label: "Vui tươi, kể chuyện",
    desc: "Như nói chuyện với bạn thân. Hài nhẹ không lố. Hợp UGC review + lifestyle.",
  },
  {
    id: "confident_proud",
    label: "Tự tin, không khiêm tốn",
    desc: "'Tôi healthy thật, không phải tự khen.' Hợp sản phẩm tự kể (độc thoại).",
  },
  {
    id: "urgent_punchy",
    label: "Gấp gáp, punchy",
    desc: "Cắt nhanh, nhấn từ khóa, energy cao. Hợp flash sale, khuyến mãi giới hạn.",
  },
] as const;
