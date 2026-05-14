import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const ADMIN_SECRET = process.env.SEED_SECRET || "kai-seed-2026";

function getClient() {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    token: process.env.SANITY_API_WRITE_TOKEN,
    apiVersion: "2024-01-01",
    useCdn: false,
  });
}

function isAuthed(req: NextRequest) {
  const cookie = req.cookies.get("admin_session")?.value;
  const header = req.headers.get("x-admin-secret");
  return cookie === ADMIN_SECRET || header === ADMIN_SECRET;
}

// GET all posts (lightweight - no body)
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = getClient();
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, category, featured, featuredOrder,
      publishedAt, tags, excerpt, readTime,
      "hasBody": defined(body) && length(body) > 0,
      "hasCover": defined(coverImage)
    }
  `);
  return NextResponse.json(posts);
}

// PATCH - update one or multiple posts
export async function PATCH(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const client = getClient();

  // Bulk: { ids: string[], patch: object }
  if (Array.isArray(body.ids)) {
    const results = await Promise.allSettled(
      body.ids.map((id: string) => client.patch(id).set(body.patch).commit())
    );
    return NextResponse.json({ updated: body.ids.length, results: results.map(r => r.status) });
  }

  // Single: { id: string, patch: object }
  if (body.id && body.patch) {
    await client.patch(body.id).set(body.patch).commit();
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Invalid body" }, { status: 400 });
}

// DELETE - one or multiple posts
export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const client = getClient();

  const ids: string[] = Array.isArray(body.ids) ? body.ids : [body.id];
  await Promise.allSettled(ids.map(id => client.delete(id)));
  return NextResponse.json({ deleted: ids.length });
}

// POST - create new post
export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const client = getClient();

  const slug = body.title
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim().replace(/\s+/g, "-")
    .slice(0, 80);

  const doc = {
    _type: "post",
    title: body.title,
    slug: { _type: "slug", current: body.slug || slug },
    excerpt: body.excerpt || "",
    category: body.category || "ecom",
    tags: body.tags || [],
    featured: body.featured || false,
    publishedAt: new Date().toISOString(),
    body: [],
  };

  const created = await client.create(doc);
  return NextResponse.json({ ok: true, id: created._id, slug: doc.slug.current });
}
