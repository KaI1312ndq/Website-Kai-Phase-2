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

// ── Orders (Supabase) ──
export type OrderShape = {
  _id: string;
  orderNumber: string;
  customer: { name: string; email: string; phone: string };
  items: Array<{ _key: string; product: { _ref: string }; title: string; price: number }>;
  subtotal: number;
  discount: number;
  total: number;
  voucherCode: string | null;
  voucherDiscount: number;
  paymentStatus: string;
  deliveryStatus: string;
  downloadToken: string | null;
  downloadExpiresAt: string | null;
  createdAt: string;
  paidAt: string | null;
  deliveredAt: string | null;
};

function rowToOrder(o: Record<string, unknown>, items: Array<Record<string, unknown>> = []): OrderShape | null {
  if (!o) return null;
  return {
    _id: String(o.id),
    orderNumber: String(o.order_number),
    customer: {
      name: String(o.customer_name || ""),
      email: String(o.customer_email || ""),
      phone: String(o.customer_phone || ""),
    },
    items: items.map((it) => ({
      _key: String(it.id),
      product: { _ref: String(it.product_sanity_id) },
      title: String(it.title_snapshot),
      price: Number(it.price_snapshot),
    })),
    subtotal: Number(o.subtotal || 0),
    discount: Number(o.discount || 0),
    total: Number(o.total || 0),
    voucherCode: o.voucher_code ? String(o.voucher_code) : null,
    voucherDiscount: Number(o.voucher_discount || 0),
    paymentStatus: String(o.payment_status || "unpaid"),
    deliveryStatus: String(o.delivery_status || "pending"),
    downloadToken: o.download_token ? String(o.download_token) : null,
    downloadExpiresAt: o.download_expires_at ? String(o.download_expires_at) : null,
    createdAt: String(o.created_at),
    paidAt: o.paid_at ? String(o.paid_at) : null,
    deliveredAt: o.delivered_at ? String(o.delivered_at) : null,
  };
}

export async function getOrderByNumber(orderNumber: string) {
  const { getSupabaseAdmin } = await import("@/lib/supabase/admin");
  const sb = getSupabaseAdmin();
  const { data: order } = await sb
    .from("orders")
    .select("*")
    .eq("order_number", orderNumber)
    .maybeSingle();
  if (!order) return null;
  const { data: items } = await sb
    .from("order_items")
    .select("id, product_sanity_id, title_snapshot, price_snapshot, qty")
    .eq("order_id", order.id as string);
  return rowToOrder(order, items || []);
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
  const { getSupabaseAdmin } = await import("@/lib/supabase/admin");
  const sb = getSupabaseAdmin();
  // Match by Clerk userId hoặc lowercased email (catch guest orders)
  let query = sb.from("orders").select("*").order("created_at", { ascending: false });
  if (clerkUserId && email) {
    query = query.or(`user_id.eq.${clerkUserId},customer_email.eq.${email.toLowerCase()}`);
  } else if (clerkUserId) {
    query = query.eq("user_id", clerkUserId);
  } else if (email) {
    query = query.eq("customer_email", email.toLowerCase());
  } else {
    return [];
  }
  const { data: orders } = await query;
  if (!orders || orders.length === 0) return [];

  const orderIds = orders.map((o) => o.id as string);
  const { data: items } = await sb
    .from("order_items")
    .select("id, order_id, product_sanity_id, title_snapshot, price_snapshot, qty")
    .in("order_id", orderIds);

  return orders.map((o) =>
    rowToOrder(
      o,
      (items || []).filter((it) => it.order_id === o.id),
    ),
  );
}

export async function getOrderByDownloadToken(downloadToken: string) {
  const { getSupabaseAdmin } = await import("@/lib/supabase/admin");
  const sb = getSupabaseAdmin();
  const { data: order } = await sb
    .from("orders")
    .select("*")
    .eq("download_token", downloadToken)
    .maybeSingle();
  if (!order) return null;

  const { data: items } = await sb
    .from("order_items")
    .select("product_sanity_id, title_snapshot")
    .eq("order_id", order.id as string);

  // Fetch master file URLs từ Sanity (products still ở Sanity)
  const productIds = (items || []).map((it) => it.product_sanity_id);
  let files: Array<{ title: string; masterFileUrl?: string; masterFileName?: string }> = [];
  if (productIds.length > 0) {
    const products = (await client.fetch(
      `*[_type == "product" && _id in $ids] {
        _id,
        "masterFileUrl": masterFile.asset->url,
        "masterFileName": masterFile.asset->originalFilename
      }`,
      { ids: productIds },
    )) as Array<{ _id: string; masterFileUrl?: string; masterFileName?: string }>;
    files = (items || []).map((it) => {
      const p = products.find((pp) => pp._id === it.product_sanity_id);
      return {
        title: String(it.title_snapshot),
        masterFileUrl: p?.masterFileUrl,
        masterFileName: p?.masterFileName,
      };
    });
  }

  return {
    _id: order.id,
    orderNumber: order.order_number,
    customer: { name: order.customer_name, email: order.customer_email, phone: order.customer_phone },
    items: (items || []).map((it) => ({ title: it.title_snapshot })),
    paymentStatus: order.payment_status,
    deliveryStatus: order.delivery_status,
    downloadExpiresAt: order.download_expires_at,
    files,
  };
}

// ── Comments (Supabase) ──
export async function getCommentsForPost(postId: string) {
  const { getSupabaseAdmin } = await import("@/lib/supabase/admin");
  const sb = getSupabaseAdmin();
  const { data } = await sb
    .from("comments")
    .select("id, guest_name, user_id, body, created_at, parent_id")
    .eq("post_sanity_id", postId)
    .eq("approved", true)
    .order("created_at", { ascending: true });
  return (data || []).map((c: any) => ({
    _id: c.id,
    authorName: c.guest_name || "User",
    content: c.body,
    createdAt: c.created_at,
    parentId: c.parent_id,
  }));
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
