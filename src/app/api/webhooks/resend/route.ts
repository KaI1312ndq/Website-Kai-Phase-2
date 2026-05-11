import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { createHmac, timingSafeEqual } from "crypto";

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

    const token = process.env.SANITY_API_WRITE_TOKEN;
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!token || !projectId) {
      return NextResponse.json({ error: "Sanity not configured" }, { status: 500 });
    }

    const sanity = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      token,
      useCdn: false,
    });

    // Find order by resendEmailId
    const order = await sanity.fetch(
      `*[_type == "order" && resendEmailId == $emailId][0] { _id, orderNumber }`,
      { emailId }
    );

    if (!order) {
      // Email not tied to any order - ignore (might be a different email sent via Resend)
      return NextResponse.json({ ok: true, skipped: "order not found" });
    }

    const now = new Date().toISOString();
    const patches: Record<string, any> = {};

    switch (type) {
      case "email.delivered":
        patches.emailDelivered = true;
        break;
      case "email.opened":
        patches.emailOpened = true;
        patches.emailOpenedAt = now;
        break;
      case "email.clicked":
        patches.emailClicked = true;
        patches.emailClickedAt = now;
        break;
      case "email.bounced":
        patches.emailBounced = true;
        patches.deliveryStatus = "failed";
        break;
    }

    if (Object.keys(patches).length > 0) {
      await sanity.patch(order._id).set(patches).commit();
    }

    return NextResponse.json({ ok: true, orderNumber: order.orderNumber, event: type });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unknown" }, { status: 500 });
  }
}
