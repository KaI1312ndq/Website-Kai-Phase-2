import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const ADMIN_SECRET = process.env.SEED_SECRET || "kai-seed-2026";

function isAuthed(req: NextRequest) {
  return req.cookies.get("admin_session")?.value === ADMIN_SECRET;
}

const CATEGORY_VISUALS: Record<string, string> = {
  "unit-economics": "stacked golden coin towers of varying heights, abstract upward trending shapes, geometric pie slice fragments, scale balancing two glowing orbs, no readable elements",
  "performance": "concentric target rings with arrow embedded in center, abstract ascending step formations, glowing trajectory curve sweeping upward, layered translucent panels with bar-shaped accents only",
  "tiktok": "vertical phone-shaped silhouette with play triangle in center, neon pink and cyan ring of light, abstract sound-wave ripples emanating outward, stacked vertical frame outlines",
  "shopee": "geometric shopping bag silhouette with orange ribbon handles, abstract cube product shapes floating, simple price tag outline shape, no logos no text",
  "ecom": "isometric storefront facade with window panels, stacked package cube shapes with directional arrow accents, abstract browser window outline shape with no content",
  "career": "ascending staircase silhouette in profile, person figure climbing upward, abstract glowing summit at top, trajectory arc rising diagonally",
  "psychology": "human head profile silhouette with glowing brain shape inside, abstract neural connection lines, four-quadrant grid pattern, thought-cloud silhouettes",
  "thue-cong-cu": "stacked golden coin columns, abstract document shape outline blank no lines, calculator silhouette with blank display panel, percentage swirl pattern",
  "tmdt-co-ban": "open book silhouette with abstract glowing pages, stacked building blocks forming foundation, lightbulb with glow rays, simple checkmark shape",
  "team-leadership": "three abstract person figures connected by glowing lines, prominent crown silhouette at center, organizational tree outline, handshake silhouette",
  "ads-scaling": "rocket silhouette launching diagonally upward with abstract smoke trail, multiplier curve sweeping up, glowing growth arrow",
  "mua-vu-sale": "festive ribbon banner shape, abstract gift box silhouettes stacked, calendar grid pattern blank cells, confetti particles, percentage swirl shape",
  "case-study-data": "magnifying glass silhouette over abstract bar and pie chart shapes, layered analytics panels with geometric shapes, investigation concept",
  "tam-ly-mindset": "glowing lightbulb with brain silhouette inside, mountain peak silhouette with flag, ascending arrow through clouds, transformation spiral",
  mindset: "lightbulb with glowing brain shape inside, motivation symbols, transformation spiral pattern, clarity radiating rays",
  leadership: "abstract chess piece silhouettes in strategic formation, beacon tower with light rays, compass rose shape, leader figure with team silhouettes",
};

function buildPrompt(category: string, customVisual?: string) {
  const visual = customVisual || CATEGORY_VISUALS[category] || "abstract business concept with geometric shapes, layered translucent panels, glowing accents, no readable elements";
  return `A minimalist modern flat vector illustration for the cover of an editorial blog post.

Subject matter to depict purely through symbols and shapes: ${visual}.

Art direction:
- Editorial illustration style, comparable to high-end tech publication covers (Stripe, Linear, Notion, Figma)
- Clean flat vector design with crisp geometric shapes and smooth gradients
- Color palette: electric blue (#146ef5), soft cyan (#7da9ff), navy accents, warm coral highlight (#ff7a59)
- Subtle ambient glow on focal element, soft long shadows for layered depth
- Balanced asymmetric composition with breathing room and negative space
- Premium minimal aesthetic - sophisticated, never cluttered

ABSOLUTE STRICT CONSTRAINTS:
- ZERO text, ZERO letters, ZERO digits, ZERO numbers, ZERO punctuation
- NO labels, NO captions, NO UI text, NO data values
- NO logos, NO watermarks, NO brand marks
- If a calculator/dashboard/document appears, its screen/face must be COMPLETELY BLANK
- Lines suggesting text on documents are FORBIDDEN

Avoid: photorealistic, painted, hand-drawn sketch, cluttered composition, generic stock imagery, 3D render.`;
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) return NextResponse.json({ error: "OPENAI_API_KEY not set in Vercel env" }, { status: 500 });

  const body = await req.json();
  const { postId, customVisual, quality = "medium" } = body;
  if (!postId) return NextResponse.json({ error: "postId required" }, { status: 400 });

  const sanity = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    token: process.env.SANITY_API_WRITE_TOKEN,
    apiVersion: "2024-01-01",
    useCdn: false,
  });

  const post = await sanity.fetch(`*[_id == $id][0]{ title, category }`, { id: postId });
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  try {
    // Generate image
    const prompt = buildPrompt(post.category, customVisual);
    const genRes = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-image-1", prompt: prompt.slice(0, 4000), size: "1024x1024", quality, n: 1 }),
    });
    if (!genRes.ok) throw new Error(`OpenAI: ${(await genRes.text()).slice(0, 300)}`);
    const data = await genRes.json();
    const item = data.data[0];

    let buffer: Buffer;
    if (item.b64_json) buffer = Buffer.from(item.b64_json, "base64");
    else if (item.url) {
      const imgRes = await fetch(item.url);
      buffer = Buffer.from(await imgRes.arrayBuffer());
    } else throw new Error("No image data");

    // Upload to Sanity assets
    const asset = await sanity.assets.upload("image", buffer, {
      filename: `${postId}.png`,
      contentType: "image/png",
    });

    // Patch post coverImage
    await sanity.patch(postId).set({
      coverImage: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    }).commit();

    return NextResponse.json({ ok: true, url: asset.url, assetId: asset._id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
