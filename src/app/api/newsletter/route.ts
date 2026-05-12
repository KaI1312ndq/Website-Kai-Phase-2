import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").trim().toLowerCase();
    const source = String(body?.source || "").slice(0, 200);

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Email không hợp lệ" }, { status: 400 });
    }

    const sb = getSupabaseAdmin();
    const { error } = await sb
      .from("newsletter_subscribers")
      .upsert(
        { email, source, subscribed: true },
        { onConflict: "email", ignoreDuplicates: false },
      );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, stored: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
