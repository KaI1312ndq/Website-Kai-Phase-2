import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").trim().toLowerCase();
    const source = String(body?.source || "").slice(0, 200);

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Email không hợp lệ" }, { status: 400 });
    }

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const token = process.env.SANITY_API_WRITE_TOKEN;
    if (!projectId || projectId === "placeholder" || !token) {
      return NextResponse.json({ ok: true, stored: false });
    }

    const client = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      token,
      useCdn: false,
    });

    const id = `newsletter-${email.replace(/[^a-zA-Z0-9]/g, "_")}`;
    await client.createOrReplace({
      _id: id,
      _type: "newsletterSubscriber",
      email,
      source,
      subscribedAt: new Date().toISOString(),
      unsubscribed: false,
    });

    return NextResponse.json({ ok: true, stored: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
