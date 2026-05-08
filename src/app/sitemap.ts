import { MetadataRoute } from "next";
import { getPosts } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
  let posts: any[] = [];
  try { posts = await getPosts(100); } catch {}

  const postUrls = posts.map((p: any) => ({
    url: `${baseUrl}/blog/${p.slug.current}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...postUrls,
  ];
}
