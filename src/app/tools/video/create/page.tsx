import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import { getOrCreateVideoProfile } from "@/lib/video/profile";
import CreateVideoClient from "./CreateVideoClient";

export const metadata: Metadata = {
  title: "Tạo video mới - AI Video Studio",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function CreateVideoPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/tools/video/create");

  const profile = await getOrCreateVideoProfile(userId);

  return (
    <>
      <Navbar />
      <GradientBlobs blobs={[
        { variant: "purple", size: 420, top: "-20%", right: "-10%" },
      ]} />

      <main className="relative max-w-[900px] mx-auto px-4 md:px-8 pt-24 pb-12">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="t-display-sm text-white">Tạo video mới</h1>
            <p style={{ color: "var(--ink-soft)" }}>
              AI sẽ tự gen kịch bản + giọng đọc + animate. 5 phút có MP4 download.
            </p>
          </div>
          <div className="card-glass px-4 py-2">
            <span className="text-sm" style={{ color: "var(--ink-soft)" }}>Token còn:</span>{" "}
            <span className="font-bold grad-text">{profile.token_balance}</span>
          </div>
        </div>

        <CreateVideoClient tokenBalance={profile.token_balance} />
      </main>

      <Footer />
    </>
  );
}
