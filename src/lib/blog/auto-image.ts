/**
 * Auto-inject inline Unsplash image cho post thiếu image trong body.
 * Curate Unsplash URL theo category để tone-mood phù hợp.
 * Inject 1 hero image (sau intro paragraph đầu) + 1 mid-body image (giữa bài).
 */

/** Unsplash images curate theo category. Mỗi cat có 3-4 URL để random distribute. */
const CATEGORY_IMAGES: Record<string, string[]> = {
  "tmdt-co-ban": [
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80", // package delivery
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80", // online shop
    "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=1600&q=80", // boxes
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=80", // money
  ],
  "tam-ly-mindset": [
    "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1600&q=80", // mind brain
    "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1600&q=80",
    "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=1600&q=80", // person thinking
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80", // meeting
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=80", // team work
  ],
  "thue-cong-cu": [
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80", // calculator
    "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1600&q=80", // tax forms
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80", // analytics
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80", // documents
  ],
  // default fallback - generic professional
  default: [
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
  ],
};

/** Hash string -> stable int for deterministic image pick per post ID */
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function pickImage(category: string, postId: string, slotIdx: number): string {
  const pool = CATEGORY_IMAGES[category] || CATEGORY_IMAGES.default;
  const h = hashString(postId + slotIdx);
  return pool[h % pool.length];
}

/**
 * Inject Unsplash images vào markdown body nếu post chưa có image.
 * - Sau title H1/excerpt (sau paragraph đầu): hero image
 * - Trước H2 thứ 3-4 (giữa bài): mid image
 *
 * Idempotent: nếu body đã có ![ thì skip (không double-inject).
 */
export function injectAutoImages(opts: { postId: string; category: string; markdown: string }): string {
  const { postId, category, markdown } = opts;

  // Skip nếu đã có image syntax
  if (/!\[/.test(markdown)) return markdown;

  const sections = markdown.split(/\n\s*\n/);
  if (sections.length < 3) return markdown;

  const heroImg = pickImage(category, postId, 0);
  const altHero = `${category} illustration`;

  // Inject hero: chèn sau section đầu tiên (intro paragraph hoặc heading)
  const heroBlock = `![${altHero}](${heroImg})`;

  // Find H2 index ~ middle of body
  const h2Indexes = sections
    .map((s, i) => (s.startsWith("## ") ? i : -1))
    .filter((i) => i >= 0);
  const midH2Idx = h2Indexes.length >= 4 ? h2Indexes[Math.floor(h2Indexes.length / 2)] : -1;

  const midImg = pickImage(category, postId, 1);
  const midBlock = `![${category} detail](${midImg})`;

  const result: string[] = [];
  for (let i = 0; i < sections.length; i++) {
    result.push(sections[i]);
    // Insert hero after 1st section (typically intro paragraph)
    if (i === 0) result.push(heroBlock);
    // Insert mid image before middle H2
    if (i === midH2Idx - 1 && midH2Idx > 0) result.push(midBlock);
  }
  return result.join("\n\n");
}
