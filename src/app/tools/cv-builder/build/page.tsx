import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import CVBuilderClient from "./CVBuilderClient";
import { getQuotaStatus } from "@/lib/cv/quota";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { CVData } from "@/lib/cv/types";

export const metadata: Metadata = {
  title: "Build CV - CV Builder",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function CVBuildPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/tools/cv-builder/build");

  // Load existing draft (most recent)
  const sb = getSupabaseAdmin();
  const { data: draft } = await sb
    .from("cv_drafts")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const quota = await getQuotaStatus(userId);

  return (
    <>
      <Navbar />
      <GradientBlobs blobs={[
        { variant: "blue", size: 420, top: "-20%", right: "-10%" },
      ]} />
      <main className="relative max-w-[1400px] mx-auto px-4 md:px-8 pt-24 pb-12">
        <CVBuilderClient
          initialDraft={draft as { id: string; data: CVData; template: string; ai_feedback: unknown } | null}
          initialQuota={quota}
        />
      </main>
      <Footer />
    </>
  );
}
