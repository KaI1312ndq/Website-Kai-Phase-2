import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import RemoveBgClient from "./RemoveBgClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tách nền ảnh AI miễn phí",
  description: "Tách nền ảnh sản phẩm Shopee/TikTok bằng AI - 100% trên trình duyệt.",
  alternates: { canonical: "/tools/tach-nen-anh" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="relative" style={{ background: "var(--bg-base)" }}>
        <GradientBlobs />
        <section className="relative pt-24 pb-8 md:pt-32 md:pb-12">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <div className="section-tag">Tools · Image AI</div>
            <h1 className="t-h1 mb-5 text-white">
              Tách nền ảnh sản phẩm AI - <span className="grad-text">5 giây, miễn phí</span>
            </h1>
            <p className="t-body-lg max-w-[720px] mb-5">
              Tách nền ảnh sản phẩm cho Shopee, TikTok Shop bằng AI. Không cần đăng ký,
              không watermark, ảnh không upload lên server - 100% xử lý trên trình duyệt của bạn.
            </p>
          </div>
        </section>
        <section className="relative">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-10 md:py-14">
            <RemoveBgClient />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
