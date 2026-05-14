// AI Video Studio - presets + voice catalog
// 10 preset gallery dựa trên slide Canva user share + Yumvita brief.
// Mỗi preset có "smart defaults" cho 9 chiều brief - user vào Advanced mode mới cần override.

export interface FptVoice {
  id: string;
  label: string;
  region: "north" | "central" | "south";
  gender: "male" | "female";
  vibe: string;
  useCase: string;
}

export const FPT_VOICES: FptVoice[] = [
  { id: "leminh",    label: "Lê Minh - Nam Bắc trầm ấm",       region: "north",   gender: "male",   vibe: "Trầm ấm, doanh nhân",    useCase: "Tech, finance, course, luxury" },
  { id: "leminh_excited", label: "Lê Minh - Nam Bắc hào hứng", region: "north",   gender: "male",   vibe: "Hào hứng, năng động",    useCase: "Flash sale, hot deal" },
  { id: "banmai",    label: "Ban Mai - Nữ Bắc nhẹ nhàng",      region: "north",   gender: "female", vibe: "Nhẹ nhàng, đáng tin",    useCase: "Mỹ phẩm, mẹ bé, thời trang" },
  { id: "ngoclam",   label: "Ngọc Lam - Nữ Bắc giọng tin tức", region: "north",   gender: "female", vibe: "Tin tức, broadcast",     useCase: "News compilation, exposé" },
  { id: "thuminh",   label: "Thu Minh - Nữ Bắc trẻ trung",     region: "north",   gender: "female", vibe: "Trẻ trung, đời thường",  useCase: "Gen Z lifestyle, UGC" },
  { id: "linhsan",   label: "Linh San - Nữ Trung đồng cảm",    region: "central", gender: "female", vibe: "Đồng cảm, ấm áp",        useCase: "Y tế, giáo dục, gia đình" },
  { id: "minhquang", label: "Minh Quang - Nam Nam thân thiện", region: "south",   gender: "male",   vibe: "Thân thiện, gần gũi",    useCase: "Bất động sản, ô tô, B2C" },
  { id: "lannhi",    label: "Lan Nhi - Nữ Nam ngọt ngào",      region: "south",   gender: "female", vibe: "Ngọt ngào, mộc mạc",     useCase: "F&B, lifestyle, du lịch" },
];

/**
 * 10 video presets viral - dựa trên Canva deck user share.
 * Mỗi preset auto-fill 9 brief dimensions để user không phải điền thủ công.
 */
export interface VideoPreset {
  id: string;
  label: string;
  useCase: string;
  niche: string[];          // ngành nghề phù hợp
  needsLipSync: boolean;    // → cost regen 6/10 thay vì 4/8
  // smart defaults cho 9 brief dimensions
  defaults: {
    shotSize: ShotSize;
    cameraAngle: CameraAngle;
    cameraMotion: CameraMotion;
    lighting: Lighting;
    mcEmotion: McEmotion;
    voiceId: string;
    mcCharacter: McCharacter;
    wardrobe: Wardrobe;
    conceptHint: string;
  };
}

export type ShotSize = "wide" | "medium" | "close" | "extreme_close";
export type CameraAngle = "eye_level" | "low" | "high";
export type CameraMotion = "static" | "dolly_in" | "dolly_out" | "pan" | "orbit";
export type Lighting = "natural" | "cinematic" | "soft" | "high_contrast";
export type McEmotion = "happy" | "serious" | "empathy" | "surprise" | "confident";
export type McCharacter = "mc_f_01" | "mc_f_02" | "mc_m_01" | "mc_m_02" | "cartoon_3d" | "real_model" | "real_expert";
export type Wardrobe = "vest" | "blouse_white" | "tshirt" | "ao_dai" | "doctor" | "casual_home";

export const VIDEO_PRESETS: VideoPreset[] = [
  {
    id: "mc_talking_head",
    label: "MC Ảo - Talking Head",
    useCase: "AI avatar nói thẳng camera - kiểu news anchor, course intro",
    niche: ["course", "finance", "tech", "news"],
    needsLipSync: true,
    defaults: {
      shotSize: "medium",
      cameraAngle: "eye_level",
      cameraMotion: "static",
      lighting: "cinematic",
      mcEmotion: "confident",
      voiceId: "leminh",
      mcCharacter: "mc_f_01",
      wardrobe: "vest",
      conceptHint: "Studio background hiện đại, MC đứng giữa, slogan/key number behind",
    },
  },
  {
    id: "reels_storytelling",
    label: "Reels triết lý + cảnh thiên nhiên",
    useCase: "Voice-over triết lý đè cảnh thiên nhiên epic - quotes brand (KHÔNG có người nói trên camera)",
    niche: ["self-help", "brand-storytelling", "quotes"],
    needsLipSync: false,  // voice-over đè B-roll, không thấy mồm
    defaults: {
      shotSize: "wide",
      cameraAngle: "low",
      cameraMotion: "dolly_in",
      lighting: "natural",
      mcEmotion: "serious",
      voiceId: "leminh",
      mcCharacter: "mc_m_01",
      wardrobe: "casual_home",
      conceptHint: "Cảnh núi mây, người đứng trên đỉnh, hoàng hôn cinematic",
    },
  },
  {
    id: "animation_explainer",
    label: "Animation 2D minh hoạ",
    useCase: "Nhân vật 2D + icon + transition - giải thích concept",
    niche: ["saas", "app", "finance", "education"],
    needsLipSync: true,  // nhân vật 2D nói chuyện
    defaults: {
      shotSize: "medium",
      cameraAngle: "eye_level",
      cameraMotion: "static",
      lighting: "soft",
      mcEmotion: "happy",
      voiceId: "banmai",
      mcCharacter: "cartoon_3d",
      wardrobe: "casual_home",
      conceptHint: "Background flat color, icon minh hoạ pop-in từ trên, text overlay lớn",
    },
  },
  {
    id: "news_compilation",
    label: "Tin tức tổng hợp (News-style)",
    useCase: "MC newsreader đọc tin + footage cuộn - news-jacking hot trends",
    niche: ["news-jacking", "social-hot", "trending"],
    needsLipSync: true,  // MC newsreader nói chuyện
    defaults: {
      shotSize: "wide",
      cameraAngle: "eye_level",
      cameraMotion: "pan",
      lighting: "high_contrast",
      mcEmotion: "serious",
      voiceId: "ngoclam",
      mcCharacter: "mc_f_02",
      wardrobe: "blouse_white",
      conceptHint: "Globe 3D + LIVE banner đỏ + city footage cắt nhanh, neon red glow",
    },
  },
  {
    id: "asmr_product",
    label: "ASMR cận cảnh sản phẩm",
    useCase: "Cận cảnh texture/sound sản phẩm - mỹ phẩm/F&B premium",
    niche: ["cosmetic", "skincare", "fnb-premium"],
    needsLipSync: false,
    defaults: {
      shotSize: "extreme_close",
      cameraAngle: "high",
      cameraMotion: "dolly_in",
      lighting: "soft",
      mcEmotion: "empathy",
      voiceId: "banmai",
      mcCharacter: "real_model",
      wardrobe: "casual_home",
      conceptHint: "Sản phẩm trên bàn marble, ánh sáng dịu, slow motion drops/swatch",
    },
  },
  {
    id: "fake_livestream",
    label: "Giả livestream bán hàng",
    useCase: "Layout livestream + sản phẩm hiện ra - flash sale ecom",
    niche: ["flash-sale", "ecom-hot-deal"],
    needsLipSync: true,
    defaults: {
      shotSize: "medium",
      cameraAngle: "eye_level",
      cameraMotion: "static",
      lighting: "high_contrast",
      mcEmotion: "happy",
      voiceId: "leminh_excited",
      mcCharacter: "mc_f_02",
      wardrobe: "tshirt",
      conceptHint: "Layout TikTok Live: counter mua, comment chạy, sản phẩm lung lay vào khung",
    },
  },
  {
    id: "cartoon_3d_character",
    label: "Nhân vật hoạt hình 3D",
    useCase: "Bất kỳ vật/người được nhân hoá 3D (như dạ dày/sản phẩm có mắt mũi) - Yumvita style",
    niche: ["healthy-food", "supplement", "kids-product", "any-anthropomorphized"],
    needsLipSync: true,  // nhân vật 3D nói chuyện cần lip sync
    defaults: {
      shotSize: "medium",
      cameraAngle: "eye_level",
      cameraMotion: "dolly_in",
      lighting: "cinematic",
      mcEmotion: "surprise",
      voiceId: "thuminh",
      mcCharacter: "cartoon_3d",
      wardrobe: "casual_home",
      conceptHint: "Nhân vật có tay chân, biểu cảm exaggerated, background siêu thực, neon overlay",
    },
  },
  {
    id: "real_beauty_model",
    label: "Model người thật cận cảnh",
    useCase: "Real model face cận cảnh - skincare/makeup tutorial",
    niche: ["skincare", "cosmetic", "makeup-tutorial"],
    needsLipSync: true,
    defaults: {
      shotSize: "extreme_close",
      cameraAngle: "eye_level",
      cameraMotion: "static",
      lighting: "soft",
      mcEmotion: "confident",
      voiceId: "banmai",
      mcCharacter: "real_model",
      wardrobe: "tshirt",
      conceptHint: "Mặt model close-up, ánh sáng beauty diffused, sản phẩm chạm vào da",
    },
  },
  {
    id: "real_expert_testimonial",
    label: "Người thật testimonial (chuyên gia + khách)",
    useCase: "Real bác sĩ/PT/chuyên gia + khách hàng thật - sức khoẻ/sữa/dược nhi",
    niche: ["healthcare", "milk", "supplement-pharma", "expert-led"],
    needsLipSync: true,
    defaults: {
      shotSize: "medium",
      cameraAngle: "eye_level",
      cameraMotion: "static",
      lighting: "soft",
      mcEmotion: "empathy",
      voiceId: "linhsan",
      mcCharacter: "real_expert",
      wardrobe: "doctor",
      conceptHint: "Phòng khám / phòng tư vấn, chuyên gia cầm sản phẩm giải thích, khách gật đầu",
    },
  },
  {
    id: "emotional_lifestyle_ad",
    label: "Quảng cáo cảm xúc đời thường",
    useCase: "Mẹ + con / gia đình - tình huống đời thường, emotional hook",
    niche: ["family", "baby", "kids", "household-care"],
    needsLipSync: true,
    defaults: {
      shotSize: "medium",
      cameraAngle: "eye_level",
      cameraMotion: "static",
      lighting: "natural",
      mcEmotion: "empathy",
      voiceId: "lannhi",
      mcCharacter: "real_model",
      wardrobe: "casual_home",
      conceptHint: "Nhà bếp/phòng khách ấm cúng, mẹ-con tương tác, sản phẩm xuất hiện tự nhiên",
    },
  },
];

// === Brief dimension labels for Advanced mode ===
export const SHOT_SIZES: { id: ShotSize; label: string; desc: string }[] = [
  { id: "wide",          label: "Toàn cảnh",   desc: "Wide shot - thấy toàn thân + bối cảnh rộng" },
  { id: "medium",        label: "Trung cảnh",  desc: "Medium shot - từ thắt lưng trở lên, hợp đối thoại" },
  { id: "close",         label: "Cận cảnh",    desc: "Close-up - mặt + ngực, nhấn cảm xúc" },
  { id: "extreme_close", label: "Đặc tả",      desc: "ECU - chỉ mắt/miệng/chi tiết sản phẩm" },
];

export const CAMERA_ANGLES: { id: CameraAngle; label: string; desc: string }[] = [
  { id: "eye_level", label: "Ngang tầm mắt", desc: "Bình đẳng, thân thiện (dùng 90% case)" },
  { id: "low",       label: "Góc thấp",      desc: "Hướng lên - quyền lực, to lớn" },
  { id: "high",      label: "Góc cao",       desc: "Hướng xuống - khiêm tốn / POV xuống sản phẩm" },
];

export const CAMERA_MOTIONS: { id: CameraMotion; label: string; desc: string }[] = [
  { id: "static",    label: "Đứng yên",  desc: "Không di chuyển - hợp talking head" },
  { id: "dolly_in",  label: "Tiến lại",  desc: "Tiến gần - tăng kịch tính, focus" },
  { id: "dolly_out", label: "Lùi xa",    desc: "Lùi ra - reveal bối cảnh rộng" },
  { id: "pan",       label: "Lia ngang", desc: "Quét ngang - showcase đa sản phẩm" },
  { id: "orbit",     label: "Vòng quanh", desc: "Quay 360 quanh chủ thể - showcase 3D" },
];

export const LIGHTINGS: { id: Lighting; label: string; desc: string }[] = [
  { id: "natural",       label: "Tự nhiên",      desc: "Ánh sáng ban ngày, daily look" },
  { id: "cinematic",     label: "Studio điện ảnh", desc: "3-point lighting, premium" },
  { id: "soft",          label: "Dịu nhẹ",       desc: "Diffused, beauty style" },
  { id: "high_contrast", label: "Tương phản cao", desc: "Bóng đổ mạnh, drama/news" },
];

export const MC_EMOTIONS: { id: McEmotion; label: string; desc: string }[] = [
  { id: "happy",     label: "Vui vẻ / Cười",  desc: "Năng lượng cao, hợp UGC" },
  { id: "serious",   label: "Nghiêm túc",     desc: "Tin tức, finance, course" },
  { id: "empathy",   label: "Đồng cảm",       desc: "Sức khoẻ, mẹ bé, testimonial" },
  { id: "surprise",  label: "Ngạc nhiên",     desc: "Hook, drama, reveal" },
  { id: "confident", label: "Tự tin",         desc: "Sản phẩm tự kể, luxury" },
];

export const MC_CHARACTERS: { id: McCharacter; label: string; desc: string }[] = [
  { id: "mc_f_01",     label: "MC Nữ 01 - Tóc dài Á",        desc: "Vibe Á Đông, truyền thống" },
  { id: "mc_f_02",     label: "MC Nữ 02 - Tóc ngắn hiện đại", desc: "Vibe hiện đại, Gen Z" },
  { id: "mc_m_01",     label: "MC Nam 01 - Doanh nhân",       desc: "Vibe finance/business" },
  { id: "mc_m_02",     label: "MC Nam 02 - Trẻ trung",        desc: "Vibe lifestyle/Gen Z" },
  { id: "cartoon_3d",  label: "Nhân vật hoạt hình 3D",       desc: "Sản phẩm/vật/bộ phận có biểu cảm" },
  { id: "real_model",  label: "Model người thật",            desc: "Real face beauty/lifestyle" },
  { id: "real_expert", label: "Chuyên gia thật",             desc: "Bác sĩ / PT / coach testimonial" },
];

/**
 * Flow templates - cách kể chuyện qua 6 cảnh.
 * User có thể chọn 1 flow hoặc Custom để rename labels.
 */
export interface VideoFlow {
  id: string;
  label: string;
  desc: string;
  vibe: string;
  scenes: string[];           // 6 scene labels
  scriptHints: string[];       // gợi ý script cho mỗi cảnh (AI sẽ adapt)
}

export const VIDEO_FLOWS: VideoFlow[] = [
  {
    id: "aida_classic",
    label: "AIDA cổ điển",
    desc: "Hook → Pain → Product → Proof → Price → CTA. Format chuẩn ads ecom.",
    vibe: "Trực tiếp, dễ hiểu, conversion cao",
    scenes: ["Hook", "Pain point", "Product intro", "Proof", "Price & promo", "CTA"],
    scriptHints: [
      "Câu hook giật, dừng scroll",
      "Vấn đề người xem đang gặp",
      "Giới thiệu sản phẩm + USP chính",
      "Bằng chứng / testimonial / số liệu",
      "Giá + khuyến mãi đang chạy",
      "Call-to-action mua hàng",
    ],
  },
  {
    id: "storytelling",
    label: "Kể chuyện",
    desc: "Setup → Conflict → Twist → Solution → Result → CTA. Hợp brand storytelling.",
    vibe: "Cảm xúc, có cốt truyện, branding mạnh",
    scenes: ["Setup", "Conflict", "Twist", "Solution", "Result", "CTA"],
    scriptHints: [
      "Bối cảnh nhân vật chính",
      "Vấn đề / mâu thuẫn xuất hiện",
      "Bước ngoặt bất ngờ",
      "Giải pháp = sản phẩm",
      "Kết quả sau khi dùng",
      "Mời người xem trải nghiệm",
    ],
  },
  {
    id: "drama_reveal",
    label: "Drama / Reveal",
    desc: "Mystery → Tension → Reveal → Explain → Result → CTA. Hợp viral hook mạnh.",
    vibe: "Bí ẩn, tò mò, retention cao",
    scenes: ["Mystery", "Tension", "Reveal", "Explain", "Result", "CTA"],
    scriptHints: [
      "Hé lộ điều bất ngờ - 'Bạn biết là...?'",
      "Tăng dần kịch tính",
      "Tiết lộ sự thật / sản phẩm",
      "Giải thích tại sao",
      "Cho thấy kết quả thật",
      "Mời mua / follow",
    ],
  },
  {
    id: "testimonial_heavy",
    label: "Testimonial nặng",
    desc: "Hook → User 1 → Product → User 2 → User 3 → CTA. Trust-builder cho healthcare / sữa.",
    vibe: "Tin cậy, social proof mạnh",
    scenes: ["Hook", "Khách hàng 1", "Sản phẩm", "Khách hàng 2", "Khách hàng 3", "CTA"],
    scriptHints: [
      "Câu hỏi gây tò mò",
      "Khách hàng đầu kể trải nghiệm",
      "Giới thiệu sản phẩm",
      "Khách hàng thứ 2 - case khác",
      "Khách hàng thứ 3 - case khác nữa",
      "CTA mạnh + đa dạng người dùng",
    ],
  },
  {
    id: "list_tips",
    label: "List / Tips",
    desc: "Hook → Tip 1 → Tip 2 → Tip 3 → Sản phẩm → CTA. Hợp educational ads.",
    vibe: "Hữu ích, lưu lại để xem sau, share cao",
    scenes: ["Hook", "Tip 1", "Tip 2", "Tip 3", "Sản phẩm hỗ trợ", "CTA"],
    scriptHints: [
      "'X điều bạn cần biết về...'",
      "Tip đầu - cụ thể, dễ áp dụng",
      "Tip 2 - khác hẳn tip 1",
      "Tip 3 - hoặc tip nâng cao",
      "Sản phẩm giúp làm các tip dễ hơn",
      "CTA mua / follow để xem thêm",
    ],
  },
  {
    id: "compare",
    label: "So sánh",
    desc: "Hook → Cách cũ → Vấn đề → Cách mới → Lợi ích → CTA. Hợp pitch khác biệt vs competitor.",
    vibe: "Rõ ràng đối lập, dễ chốt",
    scenes: ["Hook", "Cách cũ", "Vấn đề", "Cách mới", "Lợi ích", "CTA"],
    scriptHints: [
      "'Bạn có biết tại sao...?'",
      "Cách thông thường mọi người làm",
      "Vấn đề của cách đó",
      "Cách mới = sản phẩm",
      "Lợi ích cụ thể đo được",
      "Mời thử / mua ngay",
    ],
  },
  {
    id: "custom",
    label: "Custom (tự đặt tên)",
    desc: "Tự đặt tên 6 cảnh theo ý mình. Phù hợp brand có format riêng.",
    vibe: "Linh hoạt tối đa",
    scenes: ["Cảnh 1", "Cảnh 2", "Cảnh 3", "Cảnh 4", "Cảnh 5", "Cảnh 6"],
    scriptHints: ["", "", "", "", "", ""],
  },
];

export const WARDROBES: { id: Wardrobe; label: string; desc: string }[] = [
  { id: "vest",         label: "Vest công sở",     desc: "Xanh/Đen - business, news" },
  { id: "blouse_white", label: "Áo sơ mi trắng",   desc: "Trang trọng, professional" },
  { id: "tshirt",       label: "Áo phông",         desc: "Năng động, casual" },
  { id: "ao_dai",       label: "Áo dài",           desc: "Truyền thống, lễ hội" },
  { id: "doctor",       label: "Đồ bác sĩ",        desc: "Blouse trắng - chuyên gia" },
  { id: "casual_home",  label: "Đồ ở nhà",         desc: "Thoải mái - UGC/lifestyle" },
];
