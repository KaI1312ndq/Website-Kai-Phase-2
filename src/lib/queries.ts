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
  tag,
}: { page?: number; perPage?: number; category?: string; search?: string; tag?: string }) {
  const filterParts = [`_type == "post"`];
  if (category && category !== "all") filterParts.push(`category == $category`);
  if (tag) filterParts.push(`$tag in tags`);
  if (search && search.trim()) filterParts.push(`(title match $search || pt::text(body) match $search)`);
  const filter = filterParts.join(" && ");

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const params: Record<string, any> = { start, end };
  if (category && category !== "all") params.category = category;
  if (tag) params.tag = tag;
  if (search && search.trim()) params.search = `${search}*`;

  const [posts, total, categoryCounts] = await Promise.all([
    client.fetch(
      `*[${filter}] | order(publishedAt desc) [$start...$end] {
        _id, title, slug, excerpt, coverImage, category, readTime, publishedAt, featured, tags
      }`,
      params
    ),
    client.fetch(`count(*[${filter}])`, params),
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

export async function getPostsByCategories(categories: string[], limit = 30) {
  if (!categories || categories.length === 0) return [];
  return client.fetch(`
    *[_type == "post" && category in $categories] | order(publishedAt desc) [0...$limit] {
      _id, title, slug, excerpt, coverImage, category, readTime, publishedAt, featured, tags
    }
  `, { categories, limit });
}

export async function getPopularTags(limit = 12) {
  const posts = await client.fetch(`*[_type == "post" && defined(tags)] { tags }`);
  const counts: Record<string, number> = {};
  for (const p of posts as any[]) {
    if (!Array.isArray(p.tags)) continue;
    for (const t of p.tags) {
      if (typeof t === "string" && t.trim()) {
        const norm = t.trim();
        counts[norm] = (counts[norm] || 0) + 1;
      }
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count }));
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
      _id, title, slug, excerpt, coverImage, category, readTime, publishedAt, updatedAt, body,
      seoTitle, seoDescription, tags
    }
  `, { slug });
}

// ── Shop ──
export async function getActiveProducts() {
  return client.fetch(`
    *[_type == "product" && active == true] | order(order asc) {
      _id, title, slug, shortDescription, longDescription, bullets, price, category,
      coverImage, mockupImages,
      "previewFileUrl": previewFile.asset->url,
      "hasMasterFile": defined(masterFile)
    }
  `);
}

export async function getProductBySlug(slug: string) {
  return client.fetch(`
    *[_type == "product" && slug.current == $slug && active == true][0] {
      _id, title, slug, shortDescription, longDescription, bullets, price, category,
      coverImage, mockupImages,
      "previewFileUrl": previewFile.asset->url,
      "reviews": *[_type == "productReview" && references(^._id)] | order(featured desc, date desc) [0...10] {
        _id, reviewerName, reviewerRole, reviewerAvatar, rating, content, verified, featured, date
      },
      "relatedProducts": *[_type == "product" && active == true && _id != ^._id] | order(order asc) [0...4] {
        _id, title, slug, shortDescription, price, coverImage, category
      }
    }
  `, { slug });
}

export async function getAllProductSlugs() {
  return client.fetch(`*[_type == "product" && active == true].slug.current`);
}

export async function getOrderByNumber(orderNumber: string) {
  return client.fetch(`
    *[_type == "order" && orderNumber == $orderNumber][0] {
      _id, orderNumber, customer, items, subtotal, discount, total,
      voucherCode, voucherDiscount,
      paymentStatus, deliveryStatus, downloadToken, downloadExpiresAt,
      createdAt, paidAt, deliveredAt
    }
  `, { orderNumber });
}

// ── Vouchers ──
export async function getVoucherByCode(code: string) {
  return client.fetch(`
    *[_type == "voucher" && upper(code) == $code][0] {
      _id, code, displayName, description, type, value, visibility, active,
      expiresAt, maxUses, usedCount, minOrderValue
    }
  `, { code: code.toUpperCase() });
}

export async function getPublicVouchers() {
  const now = new Date().toISOString();
  return client.fetch(`
    *[_type == "voucher" && active == true && visibility == "public"
      && (!defined(expiresAt) || expiresAt > $now)
      && (!defined(maxUses) || coalesce(usedCount, 0) < maxUses)
    ] | order(value desc) [0...6] {
      _id, code, displayName, description, type, value, minOrderValue, expiresAt
    }
  `, { now });
}

export async function getOrdersForUser({ clerkUserId, email }: { clerkUserId?: string | null; email?: string | null }) {
  // Match by Clerk userId (preferred - set on orders placed while signed in)
  // OR by lowercased email (catches orders placed as guest before signing in)
  return client.fetch(`
    *[_type == "order" && (
      ($cuid != null && clerkUserId == $cuid) ||
      ($em != null && customer.email == $em)
    )] | order(createdAt desc) {
      _id, orderNumber, customer, items, subtotal, discount, total,
      paymentStatus, deliveryStatus, downloadToken, downloadExpiresAt,
      createdAt, paidAt, deliveredAt
    }
  `, { cuid: clerkUserId || null, em: email ? email.toLowerCase() : null });
}

export async function getOrderByDownloadToken(downloadToken: string) {
  return client.fetch(`
    *[_type == "order" && downloadToken == $downloadToken][0] {
      _id, orderNumber, customer, items, paymentStatus, deliveryStatus,
      downloadExpiresAt,
      "files": items[]{
        title,
        "masterFileUrl": product->masterFile.asset->url,
        "masterFileName": product->masterFile.asset->originalFilename
      }
    }
  `, { downloadToken });
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

export async function getMostReadPosts(limit = 5) {
  return client.fetch(`
    *[_type == "post" && coalesce(viewCount, 0) > 0] | order(coalesce(viewCount, 0) desc) [0...$limit] {
      _id, title, slug, category, readTime, viewCount
    }
  `, { limit });
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
