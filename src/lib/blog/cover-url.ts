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

export function buildCoverUrl({ sanityUrl, title, category, width: _w, height: _h }: CoverArgs): string {
  if (sanityUrl) return sanityUrl;
  // Always render at 16:9 (1200x675) regardless of card display size.
  // CSS object-cover handles cropping per card aspect ratio.
  // Single PNG cached and reused for all card sizes → fewer Vercel function invocations.
  const params = new URLSearchParams({
    title: title.slice(0, 140),
    category: (category || "default").toLowerCase(),
    w: "1200",
    h: "675",
  });
  return `/api/blog-cover?${params.toString()}`;
}
