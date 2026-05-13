import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import TopupForm from "./TopupForm";

export const metadata: Metadata = {
  title: "Nạp token - AI Video Studio",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function TopupPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/tools/video/topup");

  return (
    <>
      <Navbar />
      <GradientBlobs blobs={[
        { variant: "purple", size: 420, top: "-20%", right: "-10%" },
      ]} />

      <main className="relative max-w-[780px] mx-auto px-4 md:px-8 pt-24 pb-12">
        <h1 className="t-display-sm text-white mb-2">Nạp token</h1>
        <p className="mb-8" style={{ color: "var(--ink-soft)" }}>
          Chuyển khoản qua VietQR. Token được cộng tự động khi giao dịch hoàn tất.
        </p>

        <TopupForm />
      </main>

      <Footer />
    </>
  );
}
