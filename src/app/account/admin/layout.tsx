import { Suspense } from "react";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import { isAdmin } from "@/lib/admin";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect("/");

  return (
    <>
      <Navbar />
      <GradientBlobs blobs={[
        { variant: "blue", size: 480, top: "-20%", right: "-5%" },
        { variant: "purple", size: 400, bottom: "-30%", left: "-5%", delay: "2s" },
      ]} />
      <main className="relative max-w-[1400px] mx-auto px-4 md:px-8 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
          <Suspense fallback={<div className="lg:sticky lg:top-24 h-[400px]" />}>
            <AdminSidebar />
          </Suspense>
          <div className="min-w-0">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
