import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

/** Mark scene as approved by user. Free. */
export async function POST(_req: NextRequest, ctx: { params: Promise<{ id: string; sceneIdx: string }> }) {
  const { id, sceneIdx } = await ctx.params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sb = getSupabaseAdmin();
  const { data: video } = await sb
    .from("videos")
    .select("id, user_id")
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();
  if (!video) return NextResponse.json({ error: "Video not found" }, { status: 404 });

  const { error } = await sb
    .from("video_scenes")
    .update({ approved_by_user: true, status: "approved" })
    .eq("video_id", id)
    .eq("scene_idx", Number(sceneIdx));
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
