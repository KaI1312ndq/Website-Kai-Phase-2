import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Clerk webhook -> sync user vào Supabase.
 *
 * Setup ở Clerk Dashboard:
 *   - Webhooks -> Add Endpoint -> URL: https://www.nguyenducquang.website/api/webhooks/clerk
 *   - Events: user.created, user.updated, user.deleted
 *   - Copy Signing Secret vào env var CLERK_WEBHOOK_SECRET
 */

type ClerkUserEvent = {
  type: "user.created" | "user.updated" | "user.deleted";
  data: {
    id: string;
    email_addresses?: Array<{ email_address: string; id: string }>;
    primary_email_address_id?: string;
    first_name?: string | null;
    last_name?: string | null;
    image_url?: string;
    phone_numbers?: Array<{ phone_number: string }>;
    public_metadata?: Record<string, unknown>;
  };
};

export async function POST(req: NextRequest) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CLERK_WEBHOOK_SECRET not set" }, { status: 500 });
  }

  const svixId = req.headers.get("svix-id");
  const svixTimestamp = req.headers.get("svix-timestamp");
  const svixSignature = req.headers.get("svix-signature");
  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const payload = await req.text();
  let event: ClerkUserEvent;
  try {
    event = new Webhook(secret).verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkUserEvent;
  } catch (e) {
    return NextResponse.json({ error: "Invalid signature", detail: String(e) }, { status: 401 });
  }

  const sb = getSupabaseAdmin();

  if (event.type === "user.deleted") {
    await sb.from("users").delete().eq("id", event.data.id);
    return NextResponse.json({ ok: true, action: "deleted" });
  }

  const u = event.data;
  const primaryEmail =
    u.email_addresses?.find((e) => e.id === u.primary_email_address_id)?.email_address ||
    u.email_addresses?.[0]?.email_address;
  if (!primaryEmail) {
    return NextResponse.json({ error: "User missing email" }, { status: 400 });
  }

  const fullName = [u.first_name, u.last_name].filter(Boolean).join(" ").trim() || null;
  const phone = u.phone_numbers?.[0]?.phone_number || null;

  const { error } = await sb.from("users").upsert(
    {
      id: u.id,
      email: primaryEmail.toLowerCase(),
      name: fullName,
      phone,
      avatar_url: u.image_url || null,
      metadata: (u.public_metadata as Record<string, unknown>) || {},
    },
    { onConflict: "id" },
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Grant 40-token welcome bonus on first user.created (idempotent via RPC).
  if (event.type === "user.created") {
    try {
      await sb.rpc("grant_video_welcome_bonus", { p_user_id: u.id });
    } catch (e) {
      // Don't fail the webhook if bonus grant fails - profile can be created on first visit.
      console.warn("[clerk-webhook] welcome bonus grant failed", e);
    }
  }

  return NextResponse.json({ ok: true, action: event.type });
}
