import { MetadataRoute } from "next";
import { getPosts, getCaseStudies } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nguyenducquang.website";

  let posts: any[] = [];
  let caseStudies: any[] = [];
  try { posts = await getPosts(100); } catch {}
  try { caseStudies = await getCaseStudies(); } catch {}

  const postUrls = posts.map((p: any) => ({
    url: `${baseUrl}/blog/${p.slug.current}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const caseStudyUrls = caseStudies
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
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/tools/tinh-phi-san`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ...caseStudyUrls,
    ...postUrls,
  ];
}
