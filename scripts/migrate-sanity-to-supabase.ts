/**
 * One-shot migration: Sanity user-data -> Supabase.
 *
 * Usage:
 *   tsx scripts/migrate-sanity-to-supabase.ts --dry-run         (default - chỉ preview)
 *   tsx scripts/migrate-sanity-to-supabase.ts --apply           (thực sự insert)
 *   tsx scripts/migrate-sanity-to-supabase.ts --apply --only=orders,comments
 *
 * Env cần có (.env.local hoặc export inline):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN       (read token cũng OK, dùng để đọc)
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient as createSanityClient } from "@sanity/client";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const ONLY = args.find((a) => a.startsWith("--only="))?.split("=")[1]?.split(",") ?? null;

const sanity = createSanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Thiếu SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY trong .env.local");
  process.exit(1);
}
const sb = createSupabaseClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });

function shouldRun(name: string) {
  if (!ONLY) return true;
  return ONLY.includes(name);
}

async function migrateNewsletter() {
  if (!shouldRun("newsletter")) return;
  const docs = await sanity.fetch(
    `*[_type == "newsletterSubscriber"]{ email, source, subscribedAt, unsubscribed }`,
  );
  console.log(`[newsletter] Sanity: ${docs.length} subscribers`);
  if (!APPLY || docs.length === 0) return;

  const rows = docs.map((d: any) => ({
    email: String(d.email).toLowerCase(),
    source: d.source || null,
    subscribed: !d.unsubscribed,
    created_at: d.subscribedAt || new Date().toISOString(),
  }));
  const { error, count } = await sb
    .from("newsletter_subscribers")
    .upsert(rows, { onConflict: "email", count: "exact" });
  console.log(`[newsletter] -> Supabase: ${error ? `ERR ${error.message}` : `OK ${count} rows`}`);
}

async function migrateQuizLeads() {
  if (!shouldRun("quiz-leads")) return;
  const docs = await sanity.fetch(
    `*[_type == "quizLead"]{ quizSlug, quizName, resultType, name, email, phone, scoresJson, createdAt, ipHash }`,
  );
  console.log(`[quiz-leads] Sanity: ${docs.length} leads`);
  if (!APPLY || docs.length === 0) return;

  const rows = docs.map((d: any) => {
    let scores: unknown = null;
    if (typeof d.scoresJson === "string") {
      try {
        scores = JSON.parse(d.scoresJson);
      } catch {}
    }
    return {
      name: d.name,
      email: d.email ? String(d.email).toLowerCase() : null,
      phone: d.phone || null,
      quiz_slug: d.quizSlug,
      quiz_name: d.quizName || null,
      result_type: d.resultType || null,
      scores,
      ip_hash: d.ipHash || null,
      created_at: d.createdAt || new Date().toISOString(),
    };
  });
  const { error } = await sb.from("quiz_leads").insert(rows);
  console.log(`[quiz-leads] -> Supabase: ${error ? `ERR ${error.message}` : `OK ${rows.length} rows`}`);
}

async function migrateComments() {
  if (!shouldRun("comments")) return;
  const docs = await sanity.fetch(
    `*[_type == "comment"]{ _id, "postId": post._ref, "parentId": parent._ref, authorName, authorEmail, content, approved, createdAt }`,
  );
  console.log(`[comments] Sanity: ${docs.length} comments`);
  if (!APPLY || docs.length === 0) return;

  // 2-pass: insert parents first (no parent_id), then children with parent_id mapping.
  // Map old Sanity _id -> new Supabase uuid.
  const idMap = new Map<string, string>();
  const parents = docs.filter((d: any) => !d.parentId);
  const children = docs.filter((d: any) => d.parentId);

  for (const c of parents) {
    const { data, error } = await sb
      .from("comments")
      .insert({
        post_sanity_id: c.postId,
        guest_name: c.authorName,
        guest_email: c.authorEmail || null,
        body: c.content,
        approved: !!c.approved,
        created_at: c.createdAt || new Date().toISOString(),
      })
      .select("id")
      .single();
    if (error) console.warn(`[comments] parent ${c._id} ERR ${error.message}`);
    else idMap.set(c._id, data.id);
  }

  for (const c of children) {
    const parentNewId = idMap.get(c.parentId);
    const { error } = await sb.from("comments").insert({
      post_sanity_id: c.postId,
      parent_id: parentNewId || null,
      guest_name: c.authorName,
      guest_email: c.authorEmail || null,
      body: c.content,
      approved: !!c.approved,
      created_at: c.createdAt || new Date().toISOString(),
    });
    if (error) console.warn(`[comments] child ${c._id} ERR ${error.message}`);
  }
  console.log(`[comments] -> Supabase: OK ${parents.length} parents + ${children.length} children`);
}

async function migrateOrders() {
  if (!shouldRun("orders")) return;
  const docs = await sanity.fetch(
    `*[_type == "order"]{
      _id, orderNumber, clerkUserId, customer, items[]{ "productId": product._ref, title, price },
      subtotal, discount, total, voucherCode, voucherDiscount,
      paymentStatus, deliveryStatus, downloadToken, downloadExpiresAt, resendEmailId,
      createdAt, paidAt, deliveredAt,
      emailDelivered, emailOpened, emailOpenedAt, emailClicked, emailClickedAt, emailBounced
    }`,
  );
  console.log(`[orders] Sanity: ${docs.length} orders`);
  if (!APPLY || docs.length === 0) return;

  let okCount = 0;
  for (const o of docs) {
    const { data: orderInserted, error: oe } = await sb
      .from("orders")
      .upsert(
        {
          order_number: o.orderNumber,
          user_id: o.clerkUserId || null,
          customer_name: o.customer?.name || "Unknown",
          customer_email: String(o.customer?.email || "").toLowerCase(),
          customer_phone: o.customer?.phone || null,
          subtotal: o.subtotal || 0,
          discount: o.discount || 0,
          total: o.total || 0,
          voucher_code: o.voucherCode || null,
          voucher_discount: o.voucherDiscount || 0,
          payment_status: o.paymentStatus || "unpaid",
          delivery_status: o.deliveryStatus || "pending",
          status: o.paymentStatus === "paid" ? "paid" : "pending",
          download_token: o.downloadToken || null,
          download_expires_at: o.downloadExpiresAt || null,
          resend_email_id: o.resendEmailId || null,
          email_delivered: !!o.emailDelivered,
          email_opened: !!o.emailOpened,
          email_opened_at: o.emailOpenedAt || null,
          email_clicked: !!o.emailClicked,
          email_clicked_at: o.emailClickedAt || null,
          email_bounced: !!o.emailBounced,
          created_at: o.createdAt || new Date().toISOString(),
          paid_at: o.paidAt || null,
          delivered_at: o.deliveredAt || null,
        },
        { onConflict: "order_number" },
      )
      .select("id")
      .single();
    if (oe || !orderInserted) {
      console.warn(`[orders] ${o.orderNumber} ERR ${oe?.message}`);
      continue;
    }

    if (Array.isArray(o.items) && o.items.length > 0) {
      // Clear old items for idempotency
      await sb.from("order_items").delete().eq("order_id", orderInserted.id);
      const { error: ie } = await sb.from("order_items").insert(
        o.items.map((it: any) => ({
          order_id: orderInserted.id,
          product_sanity_id: it.productId,
          title_snapshot: it.title,
          price_snapshot: it.price || 0,
          qty: 1,
        })),
      );
      if (ie) console.warn(`[orders] items ${o.orderNumber} ERR ${ie.message}`);
    }
    okCount++;
  }
  console.log(`[orders] -> Supabase: OK ${okCount}/${docs.length}`);
}

async function migrateCarts() {
  if (!shouldRun("carts")) return;
  const docs = await sanity.fetch(
    `*[_type == "userCart"]{ clerkUserId, items, updatedAt }`,
  );
  console.log(`[carts] Sanity: ${docs.length} carts`);
  if (!APPLY || docs.length === 0) return;

  const rows = docs
    .filter((d: any) => d.clerkUserId)
    .map((d: any) => ({
      user_id: d.clerkUserId,
      items: d.items || [],
      updated_at: d.updatedAt || new Date().toISOString(),
    }));
  const { error } = await sb.from("carts").upsert(rows, { onConflict: "user_id" });
  console.log(`[carts] -> Supabase: ${error ? `ERR ${error.message}` : `OK ${rows.length} rows`}`);
}

async function migrateProductReviews() {
  if (!shouldRun("product-reviews")) return;
  const docs = await sanity.fetch(
    `*[_type == "productReview"]{ "productId": product._ref, clerkUserId, rating, content, approved, createdAt }`,
  );
  console.log(`[product-reviews] Sanity: ${docs.length} reviews`);
  if (!APPLY || docs.length === 0) return;

  const rows = docs.map((d: any) => ({
    product_sanity_id: d.productId,
    user_id: d.clerkUserId || null,
    rating: Math.min(5, Math.max(1, Number(d.rating) || 5)),
    body: d.content || null,
    approved: !!d.approved,
    created_at: d.createdAt || new Date().toISOString(),
  }));
  const { error } = await sb.from("product_reviews").insert(rows);
  console.log(`[product-reviews] -> Supabase: ${error ? `ERR ${error.message}` : `OK ${rows.length} rows`}`);
}

async function main() {
  console.log(`Mode: ${APPLY ? "APPLY (real writes)" : "DRY-RUN (preview only)"}`);
  if (ONLY) console.log(`Only: ${ONLY.join(", ")}`);

  await migrateNewsletter();
  await migrateQuizLeads();
  await migrateComments();
  await migrateOrders();
  await migrateCarts();
  await migrateProductReviews();

  console.log("\nDone.");
  if (!APPLY) console.log("Re-run with --apply để thực sự insert.");
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
