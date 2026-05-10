import { client } from "../../sanity/lib/client";

// ── Settings ──
export async function getSettings() {
  return client.fetch(`*[_type == "settings"][0]`);
}

// ── Posts ──
export async function getPosts(limit = 10) {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) [0...$limit] {
      _id, title, slug, excerpt, coverImage, category, readTime, publishedAt, featured
    }
  `, { limit });
}

export async function getPaginatedPosts({
  page = 1,
  perPage = 9,
  category,
  search,
}: { page?: number; perPage?: number; category?: string; search?: string }) {
  const filterParts = [`_type == "post"`];
  if (category && category !== "all") filterParts.push(`category == $category`);
  if (search && search.trim()) filterParts.push(`(title match $search || pt::text(body) match $search)`);
  const filter = filterParts.join(" && ");

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const [posts, total, categoryCounts] = await Promise.all([
    client.fetch(
      `*[${filter}] | order(publishedAt desc) [$start...$end] {
        _id, title, slug, excerpt, coverImage, category, readTime, publishedAt, featured
      }`,
      { category, search: search ? `${search}*` : undefined, start, end }
    ),
    client.fetch(`count(*[${filter}])`, { category, search: search ? `${search}*` : undefined }),
    client.fetch(`*[_type == "post" && defined(category)] {category}`),
  ]);

  // Build category counts
  const counts: Record<string, number> = {};
  (categoryCounts as any[]).forEach((p) => {
    if (!p.category) return;
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  return {
    posts,
    total,
    totalPages: Math.ceil(total / perPage),
    page,
    perPage,
    categoryCounts: counts,
  };
}

export async function getFeaturedPosts() {
  return client.fetch(`
    *[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
      _id, title, slug, excerpt, coverImage, category, readTime, publishedAt
    }
  `);
}

export async function getPost(slug: string) {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, coverImage, category, readTime, publishedAt, body,
      seoTitle, seoDescription
    }
  `, { slug });
}

// ── Comments ──
export async function getCommentsForPost(postId: string) {
  return client.fetch(`
    *[_type == "comment" && approved == true && post._ref == $postId] | order(createdAt asc) {
      _id, authorName, content, createdAt,
      "parentId": parent._ref
    }
  `, { postId });
}

export async function getRelatedPosts(category: string | undefined, currentSlug: string, limit = 4) {
  // Prefer same category; fall back to recent posts if none.
  return client.fetch(`
    *[_type == "post" && slug.current != $currentSlug && (
      ($category != null && category == $category) || $category == null
    )] | order(publishedAt desc) [0...$limit] {
      _id, title, slug, coverImage, category, readTime, publishedAt
    }
  `, { category: category || null, currentSlug, limit });
}

// ── Case Studies ──
export async function getCaseStudies() {
  return client.fetch(`
    *[_type == "caseStudy"] | order(order asc) {
      _id, title, slug, brand, coverImage, platforms, category, role,
      headline, headlineLabel, description, award, tags, featured
    }
  `);
}

export async function getCaseStudy(slug: string) {
  return client.fetch(`
    *[_type == "caseStudy" && slug.current == $slug][0] {
      _id, title, brand, coverImage, platforms, category, role,
      headline, headlineLabel, description, award, tags, body
    }
  `, { slug });
}

// ── Testimonials ──
export async function getTestimonials() {
  return client.fetch(`
    *[_type == "testimonial"] | order(order asc) {
      _id, name, role, company, avatar, content, rating
    }
  `);
}

// ── Brands ──
export async function getBrands() {
  return client.fetch(`
    *[_type == "brand" && featured == true] | order(order asc) {
      _id, name, logo, url
    }
  `);
}

// ── Timeline ──
export async function getTimeline() {
  return client.fetch(`
    *[_type == "timeline"] | order(order asc) {
      _id, year, title, description, current
    }
  `);
}
