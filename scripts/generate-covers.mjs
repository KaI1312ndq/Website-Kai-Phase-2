/**
 * Generate AI cover images for blog posts missing covers.
 *
 * Setup:
 *   1. OPENAI_API_KEY must be in .env.local (gitignored)
 *   2. Production must be deployed with admin auth working
 *
 * Usage:
 *   node scripts/generate-covers.mjs              # generate for ALL missing covers
 *   node scripts/generate-covers.mjs --limit=10   # only first 10
 *   node scripts/generate-covers.mjs --dry-run    # show prompts only, no generation
 *   node scripts/generate-covers.mjs --id=blog-xxx # single post by id
 *
 * Cost: ~$0.042 per image (gpt-image-1 medium 1024x1024)
 *        ~$0.011 per image (gpt-image-1 low) - use --quality=low to fit $3 budget for all 106
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Load .env.local
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");
const env = {};
try {
  const content = readFileSync(envPath, "utf-8");
  content.split("\n").forEach(line => {
    const m = line.match(/^([A-Z_]+)=(.+)$/);
    if (m) env[m[1]] = m[2].trim();
  });
} catch {}

const OPENAI_KEY = process.env.OPENAI_API_KEY || env.OPENAI_API_KEY;
const ADMIN_SECRET = process.env.SEED_SECRET || env.SEED_SECRET || "kai-seed-2026";
const SITE = process.env.SITE_URL || "https://www.nguyenducquang.website";

if (!OPENAI_KEY) {
  console.error("Missing OPENAI_API_KEY in .env.local");
  process.exit(1);
}

// ─── CLI args ───
const args = Object.fromEntries(process.argv.slice(2).map(a => {
  const [k, v] = a.replace(/^--/, "").split("=");
  return [k, v ?? true];
}));

/* ═══════════════════════════════════════════════════════════════
   PROMPT BUILDER - chỉn chu theo title + category + tags
══════════════════════════════════════════════════════════════════ */

// Visuals avoid anything that prompts AI to render readable text:
// no "form", "label", "currency symbol $", "interface with text", "dashboard with numbers" etc.
const CATEGORY_VISUALS = {
  "unit-economics": "stacked golden coin towers of varying heights, abstract upward trending shapes, geometric pie slice fragments, scale balancing two glowing orbs, no readable elements",
  "performance": "concentric target rings with arrow embedded in center, abstract ascending step formations, glowing trajectory curve sweeping upward, layered translucent panels with bar-shaped accents only",
  "tiktok": "vertical phone-shaped silhouette with play triangle in center, neon pink and cyan ring of light, abstract sound-wave ripples emanating outward, stacked vertical frame outlines",
  "shopee": "geometric shopping bag silhouette with orange ribbon handles, abstract cube product shapes floating, simple price tag outline shape, no logos no text",
  "ecom": "isometric storefront facade with window panels, stacked package cube shapes with directional arrow accents, abstract browser window outline shape with no content",
  "career": "ascending staircase silhouette in profile, person figure climbing upward, abstract glowing summit at top, trajectory arc rising diagonally",
  "psychology": "human head profile silhouette with glowing brain shape inside, abstract neural connection lines, four-quadrant grid pattern, thought-cloud silhouettes",
  "thue-cong-cu": "stacked golden coin columns, abstract document shape outline (blank, no lines suggesting text), calculator silhouette with blank display panel, percentage swirl pattern",
  "tmdt-co-ban": "open book silhouette with abstract glowing pages, stacked building blocks forming foundation, lightbulb with glow rays, simple checkmark shape",
  "team-leadership": "three abstract person figures connected by glowing lines, prominent crown or chess king silhouette at center, organizational tree outline, handshake silhouette",
  "ads-scaling": "rocket silhouette launching diagonally upward with abstract smoke trail forming bar shapes, multiplier curve sweeping up, glowing growth arrow",
  "mua-vu-sale": "festive ribbon banner shape, abstract gift box silhouettes stacked, calendar grid pattern (blank cells, no dates), confetti particles, percentage swirl shape",
  "case-study-data": "magnifying glass silhouette over abstract bar chart and pie chart shapes (no numbers), layered analytics panels with geometric shapes, investigation concept",
  "tam-ly-mindset": "glowing lightbulb with brain silhouette inside, mountain peak silhouette with flag, ascending arrow through clouds, transformation spiral",
  mindset: "lightbulb with glowing brain shape inside, motivation symbols, transformation spiral pattern, clarity radiating rays",
  leadership: "abstract chess piece silhouettes in strategic formation, beacon tower with light rays, compass rose shape, leader figure with team silhouettes",
};

function buildPrompt(post) {
  const visual = CATEGORY_VISUALS[post.category] || "abstract business concept with geometric shapes, layered translucent panels, glowing accents, no readable elements";

  // Strong prompt without article title (titles often confuse model into rendering them as text)
  return `A minimalist modern flat vector illustration for the cover of an editorial blog post.

Subject matter to depict purely through symbols and shapes: ${visual}.

Art direction:
- Editorial illustration style, comparable to high-end tech publication covers (Stripe, Linear, Notion, Figma)
- Clean flat vector design with crisp geometric shapes and smooth gradients
- Dark mode aesthetic with deep navy background (#0a1438 to #181828 gradient)
- Color palette: electric blue (#146ef5), soft cyan glow (#7da9ff), purple accent (#7a3dff), warm coral highlight (#ff7a59 sparingly)
- Subtle ambient glow on focal element, soft long shadows for layered depth
- Balanced asymmetric composition with breathing room and negative space
- Premium minimal aesthetic - sophisticated, never cluttered

ABSOLUTE STRICT CONSTRAINTS (this is critical):
- ZERO text, ZERO letters, ZERO digits, ZERO numbers, ZERO punctuation
- NO labels, NO captions, NO UI text, NO data values shown
- NO logos, NO watermarks, NO brand marks
- NO readable symbols of any kind
- If a calculator/dashboard/document is shown, its screen/face must be COMPLETELY BLANK (solid color or subtle pattern only)
- If currency or percentage is implied, use abstract coins or curve shapes, never the symbols themselves
- Lines suggesting text on documents are FORBIDDEN - documents are solid blank shapes

Avoid: photorealistic, painted, hand-drawn sketch style, cluttered composition, generic stock imagery, 3D render, lens flares, light mode/white background.`;
}

/* ═══════════════════════════════════════════════════════════════
   API calls
══════════════════════════════════════════════════════════════════ */

const MODEL = args.model || "gpt-image-1";
const QUALITY = args.quality || "medium"; // low | medium | high
const SIZE = args.size || "1536x1024";    // 1024x1024 | 1536x1024 (landscape) | 1024x1536
// Pricing (gpt-image-1):
// 1024x1024: low=$0.011 medium=$0.042 high=$0.167
// 1536x1024: low=$0.016 medium=$0.063 high=$0.25
const COST_TABLE = {
  "1024x1024": { low: 0.011, medium: 0.042, high: 0.167 },
  "1536x1024": { low: 0.016, medium: 0.063, high: 0.25 },
  "1024x1536": { low: 0.016, medium: 0.063, high: 0.25 },
};
const COST_PER_IMG = COST_TABLE[SIZE]?.[QUALITY] || 0.063;

async function generateImage(prompt) {
  const reqBody = { model: MODEL, prompt: prompt.slice(0, 4000), size: SIZE, quality: QUALITY, n: 1 };
  if (process.env.DEBUG) console.log("\n   [DEBUG req]", JSON.stringify({ ...reqBody, prompt: reqBody.prompt.slice(0,50)+"..." }));
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { "Authorization": `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI ${res.status}: ${err.slice(0, 200)}`);
  }
  const data = await res.json();
  const item = data.data[0];
  if (item.b64_json) {
    const buf = Buffer.from(item.b64_json, "base64");
    if (process.env.DEBUG) console.log(`   [DEBUG resp] b64 buffer size: ${buf.length} bytes`);
    return buf;
  }
  if (item.url) {
    const imgRes = await fetch(item.url);
    if (!imgRes.ok) throw new Error(`Download image failed: ${imgRes.status}`);
    const buf = Buffer.from(await imgRes.arrayBuffer());
    if (process.env.DEBUG) console.log(`   [DEBUG resp] url buffer size: ${buf.length} bytes`);
    return buf;
  }
  throw new Error("OpenAI returned neither url nor b64_json");
}

async function fetchMissingCovers() {
  const r = await fetch(`${SITE}/api/admin/posts`, {
    headers: { cookie: `admin_session=${ADMIN_SECRET}` },
  });
  if (!r.ok) throw new Error(`Fetch posts failed: ${r.status}`);
  const all = await r.json();
  return all.filter(p => !p.coverUrl && p.title);
}

async function uploadCover(imageBuf, postId, filename) {
  const form = new FormData();
  const blob = new Blob([imageBuf], { type: "image/png" });
  form.append("file", blob, filename);
  form.append("postId", postId);
  const r = await fetch(`${SITE}/api/admin/upload`, {
    method: "POST",
    body: form,
    headers: { cookie: `admin_session=${ADMIN_SECRET}` },
  });
  if (!r.ok) throw new Error(`Upload failed: ${r.status} - ${(await r.text()).slice(0, 200)}`);
  return r.json();
}

/* ═══════════════════════════════════════════════════════════════
   Main
══════════════════════════════════════════════════════════════════ */

async function main() {
  console.log("\n🎨 AI Cover Generator");
  console.log("══════════════════════════════════════════════════════════");
  console.log(`Site:    ${SITE}`);
  console.log(`Model:   ${MODEL} · quality=${QUALITY} · size=${SIZE} · ~$${COST_PER_IMG}/img`);
  console.log(`Auth:    cookie admin_session=${ADMIN_SECRET.slice(0,4)}...`);

  console.log("\nFetching posts missing covers...");
  let posts = await fetchMissingCovers();
  console.log(`Found ${posts.length} posts without cover image.`);

  if (args.id) posts = posts.filter(p => p._id === args.id);
  if (args.limit) posts = posts.slice(0, parseInt(args.limit));

  // Prioritize: featured first, then most recent
  posts.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  if (posts.length === 0) { console.log("Nothing to do."); return; }

  const estimatedCost = (posts.length * COST_PER_IMG).toFixed(2);
  console.log(`\nWill process ${posts.length} posts. Estimated cost: $${estimatedCost}`);
  if (args["dry-run"]) {
    console.log("\n[DRY RUN] First 3 prompts:\n");
    posts.slice(0, 3).forEach(p => {
      console.log(`── ${p.title} (${p.category})`);
      console.log(buildPrompt(p));
      console.log("");
    });
    return;
  }

  console.log("Starting generation in 3 seconds... Ctrl+C to abort\n");
  await new Promise(r => setTimeout(r, 3000));

  let done = 0, failed = 0;
  const startTime = Date.now();

  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    const prefix = `[${i+1}/${posts.length}]`;
    process.stdout.write(`${prefix} ${p.title.slice(0, 70)}... `);

    try {
      const prompt = buildPrompt(p);
      const img = await generateImage(prompt);
      await uploadCover(img, p._id, `${p.slug?.current || p._id}.png`);
      done++;
      console.log(`✓ done`);
    } catch (err) {
      failed++;
      console.log(`✗ FAILED: ${err.message.slice(0, 100)}`);
    }

    // Brief delay to respect rate limits (5/min for DALL-E 3)
    if (i < posts.length - 1) await new Promise(r => setTimeout(r, 1500));
  }

  const elapsed = Math.round((Date.now() - startTime) / 1000);
  console.log("\n══════════════════════════════════════════════════════════");
  console.log(`✓ ${done} done · ✗ ${failed} failed · ${elapsed}s · ~$${(done * COST_PER_IMG).toFixed(2)}`);
}

main().catch(e => { console.error("\nFATAL:", e); process.exit(1); });
