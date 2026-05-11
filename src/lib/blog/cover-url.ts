/**
 * Build cover image URL for a blog post.
 * Prefer Sanity coverImage if present; otherwise use dynamic /api/blog-cover route.
 *
 * Width/height args control desired size — dynamic route honors them with bounds.
 */

export type CoverArgs = {
  /** Sanity image asset URL (already built via urlFor) */
  sanityUrl?: string;
  title: string;
  category?: string;
  width?: number;
  height?: number;
};

export function buildCoverUrl({ sanityUrl, title, category, width = 1600, height = 900 }: CoverArgs): string {
  if (sanityUrl) return sanityUrl;
  const params = new URLSearchParams({
    title: title.slice(0, 140),
    category: (category || "default").toLowerCase(),
    w: String(width),
    h: String(height),
  });
  return `/api/blog-cover?${params.toString()}`;
}
