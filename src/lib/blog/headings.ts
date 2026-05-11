/**
 * Extract H2/H3 headings from Sanity PortableText body for TOC generation.
 * Each heading gets a deterministic slug ID so client-side TOC can scroll to it.
 */

export type Heading = {
  id: string;
  text: string;
  level: 2 | 3;
};

/** Vietnamese-aware slug - lowercase, strip diacritics, hyphenate. */
export function slugify(text: string, fallback = "section"): string {
  const cleaned = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
  return cleaned || fallback;
}

export function extractHeadings(body: any[]): Heading[] {
  if (!Array.isArray(body)) return [];
  const headings: Heading[] = [];
  const seen = new Map<string, number>();

  for (const block of body) {
    if (block?._type !== "block") continue;
    const style = block.style;
    if (style !== "h2" && style !== "h3") continue;
    const text = (block.children || [])
      .filter((c: any) => c?._type === "span")
      .map((c: any) => c.text)
      .join("")
      .trim();
    if (!text) continue;

    let id = slugify(text);
    const count = seen.get(id) || 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count + 1}`;

    headings.push({ id, text, level: style === "h2" ? 2 : 3 });
  }
  return headings;
}

/** Pass-through used by PortableText to derive same IDs for H2/H3 in render. */
export function makeHeadingId(text: string, occurrenceMap: Map<string, number>): string {
  let id = slugify(text);
  const count = occurrenceMap.get(id) || 0;
  occurrenceMap.set(id, count + 1);
  if (count > 0) id = `${id}-${count + 1}`;
  return id;
}
