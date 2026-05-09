import HomeClient from "./HomeClient";
import { getCaseStudies, getTestimonials, getTimeline } from "@/lib/queries";

export const revalidate = 60;

export default async function Page() {
  const [sanityCaseStudies, sanityTestimonials, sanityTimeline] = await Promise.all([
    getCaseStudies().catch(() => []),
    getTestimonials().catch(() => []),
    getTimeline().catch(() => []),
  ]);

  return (
    <HomeClient
      sanityCaseStudies={sanityCaseStudies}
      sanityTestimonials={sanityTestimonials}
      sanityTimeline={sanityTimeline}
    />
  );
}
