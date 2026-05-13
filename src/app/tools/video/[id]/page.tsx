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
          <aside className="card-glass p-5 space-y-4 h-fit">
            <h3 className="t-h4 text-white">Thông tin đầu vào</h3>

            <div>
              <div className="text-xs mb-1" style={{ color: "var(--ink-mute)" }}>Sản phẩm</div>
              <div className="text-sm text-white">{input.product_name}</div>
            </div>

            <div>
              <div className="text-xs mb-1" style={{ color: "var(--ink-mute)" }}>Mô tả</div>
              <div className="text-sm" style={{ color: "var(--ink-soft)" }}>{input.product_description}</div>
            </div>

            {input.target_audience && (
              <div>
                <div className="text-xs mb-1" style={{ color: "var(--ink-mute)" }}>Khách hàng</div>
                <div className="text-sm" style={{ color: "var(--ink-soft)" }}>{input.target_audience}</div>
              </div>
            )}

            {input.cta && (
              <div>
                <div className="text-xs mb-1" style={{ color: "var(--ink-mute)" }}>CTA</div>
                <div className="text-sm" style={{ color: "var(--ink-soft)" }}>{input.cta}</div>
              </div>
            )}

            <div className="pt-2 border-t" style={{ borderColor: "var(--st-08)" }}>
              <div className="text-xs mb-1" style={{ color: "var(--ink-mute)" }}>Phong cách</div>
              <div className="text-sm text-white">{input.style}</div>
            </div>

            <div>
              <div className="text-xs mb-1" style={{ color: "var(--ink-mute)" }}>Giọng đọc</div>
              <div className="text-sm text-white">{input.voice_id}</div>
            </div>

            <div className="pt-2 border-t" style={{ borderColor: "var(--st-08)" }}>
              <div className="text-xs mb-1" style={{ color: "var(--ink-mute)" }}>Tạo lúc</div>
              <div className="text-sm" style={{ color: "var(--ink-soft)" }}>
                {new Date(video.created_at).toLocaleString("vi-VN")}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
