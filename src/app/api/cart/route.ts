import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { auth } from "@clerk/nextjs/server";

/**
 * Per-user cart sync.
 *   GET  /api/cart  → { items: CartItem[] }   (empty if no doc)
 *   POST /api/cart  body: { items: CartItem[] }  → upsert
 * Requires Clerk auth — guests use localStorage only.
 */

const MAX_ITEMS = 10;

function getSanity() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!token || !projectId || projectId === "placeholder") return null;
  return createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
  });
}

function docId(userId: string) {
  // Stable, deterministic doc id per user — safe characters only
  return `userCart.${userId.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ items: [] });

  const sanity = getSanity();
  if (!sanity) return NextResponse.json({ items: [] });

  try {
    const doc = await sanity.fetch(`*[_type == "userCart" && clerkUserId == $uid][0]{ items }`, { uid: userId });
    return NextResponse.json({ items: Array.isArray(doc?.items) ? doc.items : [] });
  } catch {
    return NextResponse.json({ items: [] });
  }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const sanity = getSanity();
  if (!sanity) return NextResponse.json({ ok: false, error: "sanity_unconfigured" }, { status: 500 });

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 }); }

  const raw = Array.isArray(body?.items) ? body.items : [];
  if (raw.length > MAX_ITEMS) return NextResponse.json({ ok: false, error: "too_many_items" }, { status: 400 });

  const items = raw
    .filter((i: any) => i && typeof i.id === "string" && typeof i.title === "string" && typeof i.price === "number")
    .map((i: any, idx: number) => ({
      _key: `${i.id}_${idx}`,
      id: String(i.id),
      slug: typeof i.slug === "string" ? i.slug : "",
      title: String(i.title).slice(0, 200),
      price: Number(i.price),
      ...(typeof i.image === "string" ? { image: i.image } : {}),
    }));

  try {
    await sanity.createOrReplace({
      _id: docId(userId),
      _type: "userCart",
      clerkUserId: userId,
      items,
      updatedAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true, count: items.length });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "unknown" }, { status: 500 });
  }
}
