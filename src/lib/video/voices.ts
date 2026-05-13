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
  { id: "modern",    label: "Hiện đại", desc: "Clean, minimal, animation mượt - tech/SaaS/finance" },
  { id: "cinematic", label: "Điện ảnh", desc: "Tone tối, camera move cinematic - luxury/luxury/automotive" },
  { id: "playful",   label: "Vui tươi", desc: "Màu sắc rực rỡ, motion energetic - F&B/lifestyle/giới trẻ" },
  { id: "luxury",    label: "Sang trọng", desc: "Vàng đen, slow motion - cao cấp, premium" },
  { id: "minimal",   label: "Tối giản", desc: "Trắng đen, typography lớn - quotes, branding" },
] as const;
