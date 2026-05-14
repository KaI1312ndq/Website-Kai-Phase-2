import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const ADMIN_SECRET = process.env.SEED_SECRET || "kai-seed-2026";

function isAuthed(req: NextRequest) {
  return req.cookies.get("admin_session")?.value === ADMIN_SECRET;
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file") as File | null;
  const postId = form.get("postId") as string | null;

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    token: process.env.SANITY_API_WRITE_TOKEN,
    apiVersion: "2024-01-01",
    useCdn: false,
  });

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const asset = await client.assets.upload("image", buffer, {
      filename: file.name,
      contentType: file.type,
    });

    if (postId) {
      await client.patch(postId).set({
        coverImage: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
      }).commit();
    }

    return NextResponse.json({
      ok: true,
      assetId: asset._id,
      url: asset.url,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
