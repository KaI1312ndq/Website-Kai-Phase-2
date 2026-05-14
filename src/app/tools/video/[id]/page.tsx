import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import VideoDetailClient from "./VideoDetailClient";
import { TIER_LABELS } from "@/lib/video/pricing";
import { VIDEO_PRESETS } from "@/lib/video/voices";
import { PresetIcon } from "@/components/video/PresetIcon";

export const metadata: Metadata = {
  title: "Video chi tiết - AI Video Studio",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function VideoDetailPage({ params }: Props) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/tools/video/dashboard");

  const sb = getSupabaseAdmin();
  const { data: video } = await sb
    .from("videos")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();
  if (!video) notFound();

  const { data: scenes } = await sb
    .from("video_scenes")
    .select("*")
    .eq("video_id", id)
    .order("scene_idx", { ascending: true });

  const input = video.input_data ?? {};
  const preset = VIDEO_PRESETS.find((p) => p.id === video.preset_id);

  return (
    <>
      <Navbar />
      <GradientBlobs blobs={[{ variant: "purple", size: 420, top: "-20%", right: "-10%" }]} />

      <main className="relative max-w-[1200px] mx-auto px-4 md:px-8 pt-24 pb-12">
        <div className="mb-6">
          <Link href="/tools/video/dashboard" className="text-sm hover:underline" style={{ color: "var(--ink-soft)" }}>
            ← Quay lại Dashboard
          </Link>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            {preset && (
              <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                   style={{ background: "rgba(168,85,247,0.15)", color: "#a855f7" }}>
                <PresetIcon presetId={preset.id} size={26} />
              </div>
            )}
            <div>
              <h1 className="t-h2 text-white">{input.product_name ?? "Video không tên"}</h1>
              <div className="text-sm mt-1" style={{ color: "var(--ink-soft)" }}>
                {preset?.label ?? "Custom"} ·{" "}
                {TIER_LABELS[video.tier as "eco" | "standard" | "pro"]} · {video.duration}s · {video.token_cost} token
              </div>
            </div>
          </div>
        </div>

        <VideoDetailClient
          videoId={id}
          initialVideo={video}
          initialScenes={scenes ?? []}
        />
      </main>

      <Footer />
    </>
  );
}
