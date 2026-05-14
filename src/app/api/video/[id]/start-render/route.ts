import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

/**
 * After user approves the AI-generated scripts (and optionally edits them),
 * this endpoint flips all scenes from 'script_ready' → 'pending' which
 * triggers the render pipeline.
 *
 * Phase 3.5 MOCK: mock pipeline picks up 'pending' and advances scenes.
 * Phase 4 REAL: this endpoint will submit Kling jobs to fal.ai in parallel.
 *
 * No additional token charge - user already paid full cost at create time.
 */
export async function POST(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sb = getSupabaseAdmin();

  // Atomic flip via RPC (also validates ownership + script presence)
  const { data, error } = await sb.rpc("approve_all_scripts_and_start_render", {
    p_video_id: id,
    p_user_id: userId,
  });

  if (error) {
    if (error.message?.includes("NOT_OWNER")) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }
    if (error.message?.includes("SCRIPT_MISSING")) {
      return NextResponse.json({ error: "Một số cảnh chưa có script. Vui lòng kiểm tra." }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, scenes_flipped: data });
}
