import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Per-user cart sync (Supabase carts table, JSONB items).
 *   GET  /api/cart  -> { items }
 *   POST /api/cart  body: { items } -> upsert
 * Requires Clerk auth - guest dùng localStorage only.
 */

const MAX_ITEMS = 10;

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ items: [] });

  try {
    const sb = getSupabaseAdmin();
    const { data } = await sb
      .from("carts")
      .select("items")
      .eq("user_id", userId)
      .maybeSingle();
    return NextResponse.json({ items: Array.isArray(data?.items) ? data.items : [] });
  } catch {
    return NextResponse.json({ items: [] });
  }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const raw = Array.isArray(body?.items) ? body.items : [];
  if (raw.length > MAX_ITEMS) {
    return NextResponse.json({ ok: false, error: "too_many_items" }, { status: 400 });
  }

  const items = raw
    .filter(
      (i: any) =>
        i && typeof i.id === "string" && typeof i.title === "string" && typeof i.price === "number",
    )
    .map((i: any) => ({
      id: String(i.id),
      slug: typeof i.slug === "string" ? i.slug : "",
      title: String(i.title).slice(0, 200),
      price: Number(i.price),
      ...(typeof i.image === "string" ? { image: i.image } : {}),
    }));

  try {
    const sb = getSupabaseAdmin();
    const { error } = await sb
      .from("carts")
      .upsert({ user_id: userId, items, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, count: items.length });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "unknown" },
      { status: 500 },
    );
  }
}
