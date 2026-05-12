import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Save CV draft (upsert by user).
 *   POST /api/cv/save  body: { id?, data, template }
 */
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Cần đăng nhập" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const id = body?.id as string | undefined;
  const data = body?.data;
  const template = body?.template || "ats";

  if (!data) return NextResponse.json({ error: "Thiếu data" }, { status: 400 });

  const sb = getSupabaseAdmin();

  if (id) {
    const { error } = await sb
      .from("cv_drafts")
      .update({ data, template })
      .eq("id", id)
      .eq("user_id", userId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, id });
  }

  const { data: inserted, error } = await sb
    .from("cv_drafts")
    .insert({ user_id: userId, data, template })
    .select("id")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, id: inserted.id });
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Cần đăng nhập" }, { status: 401 });
  const sb = getSupabaseAdmin();
  const { data } = await sb
    .from("cv_drafts")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return NextResponse.json({ draft: data });
}
