import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import VideoStatusWatcher from "./VideoStatusWatcher";
import { TIER_LABELS } from "@/lib/video/pricing";

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

  const input = video.input_data ?? {};

  return (
    <>
      <Navbar />
      <GradientBlobs blobs={[{ variant: "purple", size: 420, top: "-20%", right: "-10%" }]} />

      <main className="relative max-w-[1000px] mx-auto px-4 md:px-8 pt-24 pb-12">
        <div className="mb-6">
          <Link href="/tools/video/dashboard" className="text-sm hover:underline" style={{ color: "var(--ink-soft)" }}>
            ← Quay lại Dashboard
          </Link>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Main */}
          <div className="space-y-6">
            <div>
              <h1 className="t-h2 text-white">{input.product_name ?? "Video không tên"}</h1>
              <div className="text-sm mt-1" style={{ color: "var(--ink-soft)" }}>
                {TIER_LABELS[video.tier as "eco" | "standard" | "pro"]} · {video.duration}s · {video.token_cost} token
              </div>
            </div>

            {/* Status watcher (client) - polls until completed/failed */}
            <VideoStatusWatcher
              videoId={video.id}
              initialStatus={video.status}
              initialProgress={video.progress_percent ?? 0}
              initialMessage={video.status_message}
              initialOutputUrl={video.output_url}
              initialThumbnail={video.thumbnail_url}
              initialError={video.error_message}
              tokenCost={video.token_cost}
              watermark={video.watermark}
            />
          </div>

          {/* Sidebar */}
          <aside className="rounded-2xl border-2 p-5 space-y-3 h-fit" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.10)" }}>
            <h3 className="t-h4 text-white mb-2">Thông tin đầu vào</h3>

            <InfoField label="Sản phẩm" value={input.product_name} primary />
            <InfoField label="Mô tả" value={input.product_description} />
            {input.target_audience && <InfoField label="Khách hàng" value={input.target_audience} />}
            {input.cta && <InfoField label="CTA" value={input.cta} />}
            <InfoField label="Phong cách" value={input.style} />
            <InfoField label="Giọng đọc" value={input.voice_id} />
            <InfoField label="Tạo lúc" value={new Date(video.created_at).toLocaleString("vi-VN")} />
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}

function InfoField({ label, value, primary }: { label: string; value: string; primary?: boolean }) {
  return (
    <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="text-[11px] uppercase tracking-wider font-semibold mb-1" style={{ color: "var(--ink-mute)" }}>
        {label}
      </div>
      <div className={`text-sm leading-relaxed ${primary ? "font-semibold text-white" : ""}`}
           style={{ color: primary ? undefined : "var(--ink-soft)" }}>
        {value}
      </div>
    </div>
  );
}
