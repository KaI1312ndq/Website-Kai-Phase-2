import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

/**
 * Daily cron: generate + publish 10 new blog posts via OpenAI.
 *
 * Trigger: Vercel cron at 6 AM Vietnam (23:00 UTC previous day)
 * Auth: Vercel adds `Authorization: Bearer <CRON_SECRET>` automatically
 *
 * Env vars required:
 *   - OPENAI_API_KEY
 *   - SANITY_API_WRITE_TOKEN
 *   - CRON_SECRET (for auth)
 *   - SEED_SECRET (for IndexNow callback)
 *   - AUTO_BLOG_ENABLED = "true" (kill switch)
 */

export const maxDuration = 300; // 5 min
export const dynamic = "force-dynamic";

const POSTS_PER_RUN = 10;
const SITE = "https://www.nguyenducquang.website";

const VALID_CATEGORIES = [
  "unit-economics", "performance", "tiktok", "shopee", "ecom", "career",
  "psychology", "thue-cong-cu", "tmdt-co-ban", "team-leadership",
  "tam-ly-mindset", "ads-scaling", "mua-vu-sale", "case-study-data",
];

function uid() { return Math.random().toString(36).slice(2, 10); }

function autoSlug(t: string) {
  return t.toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a").replace(/[èéẹẻẽêềếệểễ]/g, "e")
    .replace(/[ìíịỉĩ]/g, "i").replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
    .replace(/[ùúụủũưừứựửữ]/g, "u").replace(/[ỳýỵỷỹ]/g, "y")
    .replace(/đ/g, "d").replace(/[^a-z0-9\s-]/g, "").trim()
    .replace(/\s+/g, "-").slice(0, 80);
}

/* ───── OpenAI helpers ───── */

async function callOpenAI(apiKey: string, body: object): Promise<any> {
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`OpenAI ${r.status}: ${(await r.text()).slice(0, 300)}`);
  return r.json();
}

type Topic = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
};

async function brainstormTopics(apiKey: string, existing: { slug: string; title: string }[]): Promise<Topic[]> {
  const existingList = existing.map(p => `- ${p.title}`).join("\n").slice(0, 8000);

  const prompt = `Bạn là content strategist của blog ecom Vietnam.

ĐÃ CÓ ${existing.length} bài (chỉ liệt kê 1 phần):
${existingList}

Hãy generate ${POSTS_PER_RUN} bài blog MỚI cho seller TMĐT Việt Nam. Mỗi bài phải:
- Không trùng góc nhìn với bài đã có
- Title SEO-friendly, có từ khoá rõ (Shopee, TikTok Shop, P&L, ROAS, phí sàn, etc)
- Cung cấp giá trị cụ thể (số liệu VNĐ, %, framework, case study)
- Đa dạng category (mix): ${VALID_CATEGORIES.join(", ")}

Output CHỈ là JSON array (không markdown, không text khác), mỗi item:
{
  "title": "...",
  "slug": "slug-da-co-dau-tieng-viet-bo-dau",
  "excerpt": "1-2 câu hook",
  "category": "1 trong các category trên",
  "tags": ["tag1","tag2","tag3"]
}`;

  const res = await callOpenAI(apiKey, {
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.9,
  });

  const content = res.choices[0].message.content;
  const parsed = JSON.parse(content);
  // Accept either array directly or { topics: [...] }
  const arr: Topic[] = Array.isArray(parsed) ? parsed : (parsed.topics || parsed.items || parsed.posts || []);
  if (arr.length === 0) throw new Error("OpenAI returned empty topics");

  // Sanitize + dedup against existing
  const existingSlugs = new Set(existing.map(e => e.slug));
  return arr
    .filter(t => t.title && t.slug && t.category)
    .map(t => ({
      ...t,
      slug: autoSlug(t.slug || t.title),
      category: VALID_CATEGORIES.includes(t.category) ? t.category : "ecom",
      tags: Array.isArray(t.tags) ? t.tags.slice(0, 8) : [],
    }))
    .filter(t => !existingSlugs.has(t.slug))
    .slice(0, POSTS_PER_RUN);
}

async function generateBody(apiKey: string, topic: Topic): Promise<string> {
  const prompt = `Viết bài blog tiếng Việt cho topic:
Title: ${topic.title}
Category: ${topic.category}
Excerpt: ${topic.excerpt}

Style guide:
- Voice: thực chiến, ngôn ngữ tự nhiên kiểu founder/marketer chia sẻ kinh nghiệm
- Độ dài: 1200-1800 từ tiếng Việt
- Format markdown-like:
  - ## cho heading H2 (5-8 H2 sections)
  - ### cho H3 sub-section
  - > cho blockquote nhấn mạnh
  - **text** cho bold
  - Dòng trống ngăn cách đoạn
- Có ít nhất 3-5 số liệu cụ thể (giá VNĐ, %, tỷ lệ)
- Có ít nhất 1 ví dụ thực tế với số tiền cụ thể
- Có "3 lỗi phổ biến" hoặc "checklist" để actionable
- KẾT LUẬN ngắn gọn, không dùng "tóm lại" hay "nhìn chung"
- TUYỆT ĐỐI KHÔNG dùng em-dash (—) hoặc Unicode arrow (→). Dùng "-" và "->" thay thế
- TUYỆT ĐỐI không mention bạn là AI

Output CHỈ là body content (không có title vì đã có ở field riêng). Bắt đầu bằng 1 đoạn mở đầu, sau đó vào ## section đầu tiên.`;

  const res = await callOpenAI(apiKey, {
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });
  return res.choices[0].message.content as string;
}

/* ───── Markdown → Portable Text ───── */

function textToBlocks(text: string): any[] {
  const lines = text.split("\n");
  const blocks: any[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    let style: "normal" | "h2" | "h3" | "blockquote" = "normal";
    let content = line;
    if (line.startsWith("## ")) { style = "h2"; content = line.slice(3); }
    else if (line.startsWith("### ")) { style = "h3"; content = line.slice(4); }
    else if (line.startsWith("> ")) { style = "blockquote"; content = line.slice(2); }
    else if (line.startsWith("# ")) { style = "h2"; content = line.slice(2); }

    // Parse **bold** segments
    const parts = content.split(/(\*\*[^*]+\*\*)/g);
    const children = parts.filter(Boolean).map(p => {
      if (p.startsWith("**") && p.endsWith("**")) {
        return { _type: "span", _key: uid(), text: p.slice(2, -2), marks: ["strong"] };
      }
      return { _type: "span", _key: uid(), text: p, marks: [] };
    });
    if (children.length === 0) children.push({ _type: "span", _key: uid(), text: content, marks: [] });

    blocks.push({ _type: "block", _key: uid(), style, markDefs: [], children });
  }
  return blocks;
}

/* ───── Main handler ───── */

export async function GET(req: NextRequest) {
  // Auth: Vercel cron sets Authorization: Bearer <CRON_SECRET>
  // Also allow manual trigger with ?secret=
  const authHeader = req.headers.get("authorization");
  const secretParam = req.nextUrl.searchParams.get("secret");
  const cronSecret = process.env.CRON_SECRET || process.env.SEED_SECRET;
  const isAuthed =
    authHeader === `Bearer ${cronSecret}` ||
    secretParam === cronSecret;
  if (!isAuthed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Kill switch
  if (process.env.AUTO_BLOG_ENABLED !== "true") {
    return NextResponse.json({ skipped: true, reason: "AUTO_BLOG_ENABLED is not 'true'" });
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) return NextResponse.json({ error: "OPENAI_API_KEY missing" }, { status: 500 });

  const sanity = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    token: process.env.SANITY_API_WRITE_TOKEN,
    apiVersion: "2024-01-01",
    useCdn: false,
  });

  const startedAt = new Date().toISOString();
  const results: any[] = [];

  try {
    // 1. Fetch existing
    const existing = await sanity.fetch(`*[_type == "post"]{ "slug": slug.current, title }`);

    // 2. Brainstorm topics
    const topics = await brainstormTopics(openaiKey, existing);
    if (topics.length === 0) {
      return NextResponse.json({ generated: 0, error: "No new topics generated" });
    }

    // 3. Generate + publish each
    for (const topic of topics) {
      try {
        const body = await generateBody(openaiKey, topic);
        const blocks = textToBlocks(body);

        // Validate
        if (blocks.length < 3) {
          results.push({ status: "skip", slug: topic.slug, reason: "body too short" });
          continue;
        }

        const id = `blog-${topic.slug}`;
        await sanity.createIfNotExists({
          _id: id,
          _type: "post",
          title: topic.title,
          slug: { _type: "slug", current: topic.slug },
          excerpt: topic.excerpt,
          category: topic.category,
          tags: topic.tags,
          featured: false,
          publishedAt: new Date().toISOString(),
          body: blocks,
        } as any);

        results.push({ status: "ok", slug: topic.slug, title: topic.title, blocks: blocks.length });
      } catch (err: any) {
        results.push({ status: "error", slug: topic.slug, error: err.message?.slice(0, 200) });
      }
    }

    // 4. Submit to IndexNow
    const okSlugs = results.filter(r => r.status === "ok").map(r => `${SITE}/blog/${r.slug}`);
    if (okSlugs.length > 0 && process.env.SEED_SECRET) {
      try {
        await fetch(`${SITE}/api/notify-google?secret=${process.env.SEED_SECRET}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ urls: okSlugs }),
        });
      } catch {}
    }

    return NextResponse.json({
      startedAt,
      finishedAt: new Date().toISOString(),
      generated: results.filter(r => r.status === "ok").length,
      failed: results.filter(r => r.status === "error").length,
      skipped: results.filter(r => r.status === "skip").length,
      results,
    });
  } catch (err: any) {
    return NextResponse.json({
      error: err.message?.slice(0, 500),
      results,
    }, { status: 500 });
  }
}
