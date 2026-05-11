import type { MetadataRoute } from "next";
import { getPosts, getCaseStudies } from "@/lib/queries";
import { QUIZZES, getQuizArchetypes } from "@/lib/quiz/compute";
import { PILLARS } from "@/lib/pillars/config";

// Force ISR with hourly refresh — keeps sitemap fast and reliable for crawlers
export const revalidate = 3600;
export const dynamic = "force-static";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.nguyenducquang.website").replace(/\/$/, "");

async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await Promise.race([
      fn(),
      new Promise<T>((_, reject) => setTimeout(() => reject(new Error("timeout")), 5000)),
    ]);
  } catch {
    return fallback;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await safeFetch(() => getPosts(100), [] as any[]);
  const caseStudies = await safeFetch(() => getCaseStudies(), [] as any[]);

  const postUrls = (posts || []).map((p: any) => ({
    url: `${baseUrl}/blog/${p.slug.current}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const caseStudyUrls = (caseStudies || [])
    .filter((cs: any) => cs?.slug?.current)
    .map((cs: any) => ({
      url: `${baseUrl}/case-study/${cs.slug.current}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/ecom-foundation`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/tools/tinh-phi-san`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/tools/roas-calculator`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.88 },
    { url: `${baseUrl}/tools/pnl-ecom`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.86 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/quiz`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.82 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    // Pillar hub pages (high SEO priority — backbone of cluster strategy)
    ...PILLARS.map((p) => ({
      url: `${baseUrl}/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.92,
    })),
    ...QUIZZES.map((q) => ({
      url: `${baseUrl}/quiz/${q.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.78,
    })),
    // Each archetype result page is its own SEO landing
    ...QUIZZES.flatMap((q) =>
      getQuizArchetypes(q.slug).map((a) => ({
        url: `${baseUrl}/quiz/${q.slug}/result/${a.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    ),
    ...caseStudyUrls,
    ...postUrls,
  ];
}
