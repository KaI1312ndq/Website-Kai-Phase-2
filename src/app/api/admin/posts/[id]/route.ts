import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const ADMIN_SECRET = process.env.SEED_SECRET || "kai-seed-2026";

function isAuthed(req: NextRequest) {
  return req.cookies.get("admin_session")?.value === ADMIN_SECRET;
}

/**
 * GET full single post including body.
 * Used by the admin editor to load body content when opening a post.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    token: process.env.SANITY_API_WRITE_TOKEN,
    apiVersion: "2024-01-01",
    useCdn: false,
  });

  const post = await client.fetch(`
    *[_id == $id][0] {
      _id, title, slug, category, featured, featuredOrder,
      publishedAt, _updatedAt, tags, excerpt, readTime, body,
      "coverUrl": coverImage.asset->url
    }
  `, { id });

  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}
