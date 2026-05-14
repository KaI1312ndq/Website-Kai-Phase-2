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

// GET all posts (lightweight)
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = getClient();
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, category, featured, featuredOrder,
      publishedAt, _updatedAt, tags, excerpt, readTime,
      "hasBody": defined(body) && length(body) > 0,
      "wordCount": length(pt::text(body)),
      "coverUrl": coverImage.asset->url
    }
  `);
  return NextResponse.json(posts);
}

export async function PATCH(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const client = getClient();

  if (Array.isArray(body.ids)) {
    const results = await Promise.allSettled(
      body.ids.map((id: string) => client.patch(id).set(body.patch).commit())
    );
    return NextResponse.json({ updated: body.ids.length, results: results.map(r => r.status) });
  }
  if (body.id && body.patch) {
    await client.patch(body.id).set(body.patch).commit();
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Invalid body" }, { status: 400 });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const client = getClient();
  const ids: string[] = Array.isArray(body.ids) ? body.ids : [body.id];
  await Promise.allSettled(ids.map(id => client.delete(id)));
  return NextResponse.json({ deleted: ids.length });
}

function autoSlug(t: string) {
  return t.toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a").replace(/[èéẹẻẽêềếệểễ]/g, "e")
    .replace(/[ìíịỉĩ]/g, "i").replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
    .replace(/[ùúụủũưừứựửữ]/g, "u").replace(/[ỳýỵỷỹ]/g, "y")
    .replace(/đ/g, "d").replace(/[^a-z0-9\s-]/g, "").trim()
    .replace(/\s+/g, "-").slice(0, 80);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const client = getClient();

  // DUPLICATE existing post
  if (body.action === "duplicate" && body.sourceId) {
    const src = await client.fetch(`*[_id == $id][0]`, { id: body.sourceId });
    if (!src) return NextResponse.json({ error: "Source not found" }, { status: 404 });
    const newTitle = `${src.title} (Bản sao)`;
    const newSlug = `${src.slug?.current || autoSlug(src.title)}-copy-${Date.now().toString(36)}`;
    const { _id, _createdAt, _updatedAt, _rev, ...rest } = src;
    const doc = {
      ...rest,
      _type: "post",
      title: newTitle,
      slug: { _type: "slug", current: newSlug },
      featured: false,
      publishedAt: new Date().toISOString(),
    };
    const created = await client.create(doc);
    return NextResponse.json({ ok: true, id: created._id });
  }

  // CREATE new
  const slug = body.slug || autoSlug(body.title);
  const doc = {
    _type: "post",
    title: body.title,
    slug: { _type: "slug", current: slug },
    excerpt: body.excerpt || "",
    category: body.category || "ecom",
    tags: body.tags || [],
    featured: body.featured || false,
    publishedAt: new Date().toISOString(),
    body: [],
  };
  const created = await client.create(doc);
  return NextResponse.json({ ok: true, id: created._id, slug });
}
