import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Resend webhook endpoint - track email events (delivered / opened / clicked / bounced).
 *
 * Setup ở Resend Dashboard:
 *   - Webhooks -> Add Endpoint
 *   - URL: https://www.nguyenducquang.website/api/webhooks/resend
 *   - Events: email.delivered, email.opened, email.clicked, email.bounced
 *   - Copy "Signing Secret" (format whsec_...) -> add Vercel env RESEND_WEBHOOK_SECRET
 *
 * Verify signature theo chuẩn Svix:
 *   - Headers: svix-id, svix-timestamp, svix-signature
 *   - Payload to sign: `${id}.${timestamp}.${body}`
 *   - HMAC-SHA256 với secret (base64-decode sau khi strip 'whsec_')
 *   - Compare base64(hmac) với signatures trong header (space-separated, prefix "v1,")
 */

function verifySignature(body: string, headers: Headers): boolean {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) return false; // misconfigured

  const id = headers.get("svix-id");
  const timestamp = headers.get("svix-timestamp");
  const signatureHeader = headers.get("svix-signature");
  if (!id || !timestamp || !signatureHeader) return false;

  // Replay protection - reject events older than 5 min
  const ts = parseInt(timestamp, 10);
  if (isNaN(ts) || Math.abs(Date.now() / 1000 - ts) > 5 * 60) return false;

  // Strip 'whsec_' prefix, decode base64
  const secretClean = secret.startsWith("whsec_") ? secret.slice(6) : secret;
  let keyBuffer: Buffer;
  try {
    keyBuffer = Buffer.from(secretClean, "base64");
  } catch {
    return false;
  }

  const toSign = `${id}.${timestamp}.${body}`;
  const expectedSig = createHmac("sha256", keyBuffer).update(toSign).digest("base64");

  // Header format: "v1,base64sig v1,anotherSig ..."
  const signatures = signatureHeader.split(" ").map((s) => s.split(",")[1]).filter(Boolean);
  for (const sig of signatures) {
    try {
      const a = Buffer.from(sig);
      const b = Buffer.from(expectedSig);
      if (a.length === b.length && timingSafeEqual(a, b)) return true;
    } catch {}
  }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    if (!verifySignature(rawBody, req.headers)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    const type = event?.type as string | undefined;
    const emailId = event?.data?.email_id as string | undefined;

    if (!type || !emailId) {
      return NextResponse.json({ ok: true, skipped: "missing type or email_id" });
    }

    const sb = getSupabaseAdmin();
    const { data: order } = await sb
      .from("orders")
      .select("id, order_number")
      .eq("resend_email_id", emailId)
      .maybeSingle();

    if (!order) {
      return NextResponse.json({ ok: true, skipped: "order not found" });
    }

    const now = new Date().toISOString();
    const patches: Record<string, unknown> = {};

    switch (type) {
      case "email.delivered":
        patches.email_delivered = true;
        break;
      case "email.opened":
        patches.email_opened = true;
        patches.email_opened_at = now;
        break;
      case "email.clicked":
        patches.email_clicked = true;
        patches.email_clicked_at = now;
        break;
      case "email.bounced":
        patches.email_bounced = true;
        patches.delivery_status = "failed";
        break;
    }

    if (Object.keys(patches).length > 0) {
      await sb.from("orders").update(patches).eq("id", order.id as string);
    }

    return NextResponse.json({ ok: true, orderNumber: order.order_number, event: type });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unknown" }, { status: 500 });
  }
}
