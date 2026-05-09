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
 */
export const DEFAULT_BRANDS: BrandEntry[] = [
  // With logos
  { name: "The Bad God", logoBase64: BAD_GOD, seedId: "brand-thebadgod" },
  { name: "Xiaomi", logoBase64: XIAOMI, seedId: "brand-xiaomi" },
  { name: "Ecovacs", logoBase64: ECOVACS, seedId: "brand-ecovacs" },
  { name: "Tefal", logoBase64: TEFAL, seedId: "brand-tefal" },
  // Text-only (Quảng có thể upload logo qua Studio sau)
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
];

/** Slice a list into N evenly distributed rows (round-robin) */
export function distributeToRows<T>(items: T[], rows: number): T[][] {
  const buckets: T[][] = Array.from({ length: rows }, () => []);
  items.forEach((item, i) => buckets[i % rows].push(item));
  return buckets;
}
