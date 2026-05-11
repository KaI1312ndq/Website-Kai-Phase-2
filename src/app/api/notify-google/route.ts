import { NextRequest, NextResponse } from "next/server";

/**
 * Notify Google when a new URL is published — uses IndexNow protocol (free, no auth).
 * Bing/Yandex/Seznam fetch from IndexNow → faster crawl than waiting for sitemap re-fetch.
 *
 * Setup steps:
 * 1. Generate a key (any random string), set ENV `INDEXNOW_KEY`
 * 2. Create file `public/<INDEXNOW_KEY>.txt` with content = key (verify ownership)
 * 3. Call this endpoint when publishing new URL:
 *    POST /api/notify-google?secret=<SEED_SECRET>
 *    { urls: ["https://www.nguyenducquang.website/blog/abc"] }
 *
 * Reference: https://www.indexnow.org/documentation
 *
 * NOTE: Google's official Indexing API only allows JobPosting + LiveStream URLs.
 * For general URLs, IndexNow (Bing) is the equivalent free alternative.
 * Submitting to Bing IndexNow ALSO speeds up Google indirectly via referral signals.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nguyenducquang.website";

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const secret = url.searchParams.get("secret");
    if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const key = process.env.INDEXNOW_KEY;
    if (!key) {
      return NextResponse.json({
        error: "Missing INDEXNOW_KEY env. Generate any random string, set in Vercel env, and create public/<key>.txt with same string.",
      }, { status: 500 });
    }

    const body = await req.json();
    const urls = Array.isArray(body?.urls) ? body.urls : [];
    if (urls.length === 0 || urls.length > 10000) {
      return NextResponse.json({ error: "urls must be a non-empty array (max 10000)" }, { status: 400 });
    }

    // Validate all URLs are from our domain
    const host = new URL(SITE_URL).hostname;
    const invalidUrls = urls.filter((u: any) => {
      try {
        return new URL(u).hostname !== host;
      } catch {
        return true;
      }
    });
    if (invalidUrls.length > 0) {
      return NextResponse.json({ error: `URLs not from ${host}: ${invalidUrls.join(", ")}` }, { status: 400 });
    }

    const indexNowPayload = {
      host,
      key,
      keyLocation: `${SITE_URL}/${key}.txt`,
      urlList: urls,
    };

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(indexNowPayload),
    });

    return NextResponse.json({
      ok: res.ok,
      indexnow_status: res.status,
      submitted: urls.length,
      message: res.ok
        ? "URLs submitted to IndexNow (Bing/Yandex). Google will pick up via referral signals."
        : `IndexNow returned ${res.status} — check key file at ${SITE_URL}/${key}.txt`,
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unknown error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    info: "POST /api/notify-google?secret=<SEED_SECRET> with { urls: [...] }",
    setup: {
      step1: "Generate random INDEXNOW_KEY, add to Vercel env",
      step2: `Create public/<INDEXNOW_KEY>.txt with content = same key, deploy`,
      step3: "Call POST endpoint when publishing new content",
    },
    indexnow_key_file_check: process.env.INDEXNOW_KEY
      ? `${SITE_URL}/${process.env.INDEXNOW_KEY}.txt`
      : "INDEXNOW_KEY not set",
  });
}
