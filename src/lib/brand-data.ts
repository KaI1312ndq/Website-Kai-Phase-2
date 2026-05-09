import { BAD_GOD, XIAOMI, ECOVACS, TEFAL } from "./brand-logos";

export type BrandEntry = {
  name: string;
  logoBase64?: string;
  /** Stable id used as Sanity _id when seeding */
  seedId: string;
};

/**
 * Default brand list. Used as:
 * - Fallback for BrandsCarousel when Sanity is empty.
 * - Source for /api/seed-sanity to upload logos + create brand docs.
 *
 * Để giữ idempotent với batch seed cũ, các seedId của 24 brand đầu tiên
 * (4 logos + 20 text-only ban đầu) phải khớp đúng với đợt seed trước.
 * Các brand mới thêm vào dùng seedId tự sinh (slug từ tên).
 */
export const DEFAULT_BRANDS: BrandEntry[] = [
  // 4 brands with logos (preserved seedIds)
  { name: "The Bad God", logoBase64: BAD_GOD, seedId: "brand-thebadgod" },
  { name: "Xiaomi", logoBase64: XIAOMI, seedId: "brand-xiaomi" },
  { name: "Ecovacs", logoBase64: ECOVACS, seedId: "brand-ecovacs" },
  { name: "Tefal", logoBase64: TEFAL, seedId: "brand-tefal" },

  // 20 text-only brands originally seeded — keep old seedIds
  { name: "L'Occitane", seedId: "brand-loccitane" },
  { name: "Vitabiotics", seedId: "brand-vitabiotics" },
  { name: "Pregnacare", seedId: "brand-pregnacare" },
  { name: "Yumvita", seedId: "brand-yumvita" },
  { name: "KeyShu", seedId: "brand-keyshu" },
  { name: "Traphaco", seedId: "brand-traphaco" },
  { name: "Yves Rocher", seedId: "brand-yvesrocher" },
  { name: "Eubos", seedId: "brand-eubos" },
  { name: "Nucos", seedId: "brand-nucos" },
  { name: "Tsubaki", seedId: "brand-tsubaki" },
  { name: "Pierre Cardin", seedId: "brand-pierrecardin" },
  { name: "Meracine", seedId: "brand-meracine" },
  { name: "Cozy", seedId: "brand-cozy" },
  { name: "Fujifilm Instax", seedId: "brand-fujifilm" },
  { name: "Astalift", seedId: "brand-astalift" },
  { name: "Karmart", seedId: "brand-karmart" },
  { name: "Hitachi", seedId: "brand-hitachi" },
  { name: "Ladofoods", seedId: "brand-ladofoods" },
  { name: "Nature's Way", seedId: "brand-naturesway" },
  { name: "Pigeon", seedId: "brand-pigeon" },

  // New brands — added per Quảng's list (deduped against above)
  { name: "82X", seedId: "brand-82x" },
  { name: "Babe", seedId: "brand-babe" },
  { name: "Baniphar", seedId: "brand-baniphar" },
  { name: "Cindy Bloom", seedId: "brand-cindy-bloom" },
  { name: "Ekseption", seedId: "brand-ekseption" },
  { name: "Elprairie", seedId: "brand-elprairie" },
  { name: "Lipit", seedId: "brand-lipit" },
  { name: "MATSUKIYO", seedId: "brand-matsukiyo" },
  { name: "Nabizam", seedId: "brand-nabizam" },
  { name: "Royal Ausnz", seedId: "brand-royal-ausnz" },
  { name: "Intimate", seedId: "brand-intimate" },
  { name: "Kutieskin Mama", seedId: "brand-kutieskin-mama" },
  { name: "L'Occitane Việt Nam", seedId: "brand-l-occitane-viet-nam" },
  { name: "SCC Saigon Cosmetics", seedId: "brand-scc-saigon-cosmetics" },
  { name: "Hoarient", seedId: "brand-hoarient" },
  { name: "Bye Bye Blemish", seedId: "brand-bye-bye-blemish" },
  { name: "4PM", seedId: "brand-4pm" },
  { name: "Fresh", seedId: "brand-fresh" },
  { name: "Mine", seedId: "brand-mine" },
  { name: "Cozy HCM", seedId: "brand-cozy-hcm" },
  { name: "HLA Garment Vietnam", seedId: "brand-hla-garment-vietnam" },
  { name: "EUPC", seedId: "brand-eupc" },
  { name: "Baegayul", seedId: "brand-baegayul" },
  { name: "FontActiv", seedId: "brand-fontactiv" },
  { name: "Docilee", seedId: "brand-docilee" },
  { name: "Cathy Doll", seedId: "brand-cathy-doll" },
  { name: "Revision", seedId: "brand-revision" },
  { name: "CM24", seedId: "brand-cm24" },
  { name: "Venus", seedId: "brand-venus" },
  { name: "UpBeauty", seedId: "brand-upbeauty" },
  { name: "Blissberry", seedId: "brand-blissberry" },
  { name: "Natural Care", seedId: "brand-natural-care" },
  { name: "Face republic", seedId: "brand-face-republic" },
  { name: "Lasy VN", seedId: "brand-lasy-vn" },
  { name: "Rejuran", seedId: "brand-rejuran" },
  { name: "Herbal Care", seedId: "brand-herbal-care" },
  { name: "pHCare", seedId: "brand-phcare" },
  { name: "GREE", seedId: "brand-gree" },
  { name: "Keyshu_Philippines", seedId: "brand-keyshu-philippines" },
  { name: "The Vigo", seedId: "brand-the-vigo" },
  { name: "DOJI VIETNAM", seedId: "brand-doji-vietnam" },
  { name: "Nativis", seedId: "brand-nativis" },
  { name: "TM Clean", seedId: "brand-tm-clean" },
  { name: "HDT", seedId: "brand-hdt" },
  { name: "ORGALIFE", seedId: "brand-orgalife" },
  { name: "Đài Linh", seedId: "brand-dai-linh" },
  { name: "Ipek", seedId: "brand-ipek" },
  { name: "Verites", seedId: "brand-verites" },
  { name: "Etsuko", seedId: "brand-etsuko" },
  { name: "Lemond", seedId: "brand-lemond" },
  { name: "Roborock", seedId: "brand-roborock" },
  { name: "CHAANG", seedId: "brand-chaang" },
  { name: "Kenno", seedId: "brand-kenno" },
  { name: "Kaizen", seedId: "brand-kaizen" },
  { name: "Safe", seedId: "brand-safe" },
  { name: "Rataplan", seedId: "brand-rataplan" },
  { name: "Farason", seedId: "brand-farason" },
  { name: "Bebino", seedId: "brand-bebino" },
  { name: "Biomed", seedId: "brand-biomed" },
  { name: "Splat", seedId: "brand-splat" },
  { name: "Dược Tín Phong", seedId: "brand-duoc-tin-phong" },
];

/** Slice a list into N evenly distributed rows (round-robin) */
export function distributeToRows<T>(items: T[], rows: number): T[][] {
  const buckets: T[][] = Array.from({ length: rows }, () => []);
  items.forEach((item, i) => buckets[i % rows].push(item));
  return buckets;
}
