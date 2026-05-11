import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { mdToBlocks } from "@/lib/blog/markdown";
import { GROUP_A_POSTS } from "@/lib/blog/group-a-content";
import { DRAFT_POSTS } from "@/lib/blog/groups-bcdef-drafts";
import { PSYCHOLOGY_POSTS } from "@/lib/blog/psychology-content";
import { TNCN_POSTS } from "@/lib/blog/tncn-cluster";

/**
 * Bulk seed 50 blog posts vào Sanity:
 *   - 10 bài Group A: nội dung viết hoàn thiện (ready to publish)
 *   - 40 bài Group B-F: title + excerpt + outline (Quảng viết tiếp trong studio)
 *
 * Idempotent - gọi lại không tạo trùng (createIfNotExists).
 *
 * Cách dùng:
 *   GET /api/seed-blog-bulk?secret=<SEED_SECRET>
 *
 * Sau khi seed:
 *   - Group A: vào /studio chỉ cần upload ảnh bìa, nội dung đã sẵn
 *   - Group B-F: vào /studio mở từng bài, đọc outline trong body, viết tiếp
 */

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");

  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized - pass ?secret=<SEED_SECRET>" }, { status: 401 });
  }

  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return NextResponse.json({ error: "Missing SANITY_API_WRITE_TOKEN" }, { status: 500 });

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId || projectId === "placeholder") {
    return NextResponse.json({ error: "Missing NEXT_PUBLIC_SANITY_PROJECT_ID" }, { status: 500 });
  }

  const client = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
  });

  const allPosts = [
    ...GROUP_A_POSTS.map((p) => ({ ...p, group: "A" })),
    ...DRAFT_POSTS.map((p) => ({ ...p, group: "B-F" })),
    ...PSYCHOLOGY_POSTS.map((p) => ({ ...p, group: "P" })),
    ...TNCN_POSTS.map((p) => ({ ...p, group: "T-TNCN" })),
  ];

  const results: { id: string; group: string; title: string; status: string }[] = [];

  for (const post of allPosts) {
    try {
      const body = mdToBlocks(post.id.replace(/[^a-zA-Z0-9]/g, "_") + "_", post.content);
      const doc = {
        _id: post.id,
        _type: "post",
        title: post.title,
        slug: { _type: "slug", current: post.slug },
        excerpt: post.excerpt,
        category: post.category,
        readTime: post.readTime,
        publishedAt: post.publishedAt,
        featured: post.featured,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        body,
      };
      await client.createIfNotExists(doc);
      results.push({ id: post.id, group: post.group, title: post.title, status: "created" });
    } catch (e) {
      results.push({
        id: post.id,
        group: post.group,
        title: post.title,
        status: `error: ${e instanceof Error ? e.message : String(e)}`,
      });
    }
  }

  const successCount = results.filter((r) => r.status === "created").length;
  const errorCount = results.filter((r) => r.status.startsWith("error")).length;

  return NextResponse.json({
    success: errorCount === 0,
    summary: {
      total: results.length,
      created: successCount,
      errors: errorCount,
      groupA: results.filter((r) => r.group === "A").length,
      groupBCDEF: results.filter((r) => r.group === "B-F").length,
    },
    results,
    note: "Vào /studio -> Blog/Insights để upload ảnh bìa cho Group A và viết tiếp Group B-F.",
  });
}
