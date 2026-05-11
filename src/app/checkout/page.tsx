import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Thanh toán",
  description: "Hoàn tất đơn hàng — nhập thông tin nhận file và áp dụng voucher (nếu có).",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden">
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "blue", size: 480, top: "-20%", right: "-5%" },
            { variant: "purple", size: 400, bottom: "-30%", left: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-28 pb-16 md:pt-32 md:pb-20">
            <div className="section-tag">Thanh toán</div>
            <h1 className="t-h1 leading-[1.1] text-white mb-3">
              Hoàn tất <span className="grad-text">đơn hàng.</span>
            </h1>
            <p className="t-body-lg max-w-[600px] mb-10" style={{ color: "var(--ink-soft)" }}>
              Kiểm tra giỏ hàng, áp dụng voucher (nếu có) và điền thông tin nhận file. Đã đăng nhập? Email + tên + SĐT sẽ tự điền.
            </p>
            <Suspense fallback={null}>
              <CheckoutClient />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
