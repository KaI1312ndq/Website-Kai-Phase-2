import HomeClient from "./HomeClient";
import { getCaseStudies, getTestimonials, getTimeline, getBrands } from "@/lib/queries";

export const revalidate = 60;

export default async function Page() {
  const [sanityCaseStudies, sanityTestimonials, sanityTimeline, sanityBrands] = await Promise.all([
    getCaseStudies().catch(() => []),
    getTestimonials().catch(() => []),
    getTimeline().catch(() => []),
    getBrands().catch(() => []),
  ]);

  return (
    <HomeClient
      sanityCaseStudies={sanityCaseStudies}
      sanityTestimonials={sanityTestimonials}
      sanityTimeline={sanityTimeline}
      sanityBrands={sanityBrands}
    />
  );
}
