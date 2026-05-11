import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập vào tài khoản nguyenducquang.website — xem đơn hàng, tải lại file, theo dõi quiz history.",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden min-h-[80vh] flex items-center" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "blue", size: 500, top: "-20%", right: "-5%" },
            { variant: "purple", size: 420, bottom: "-30%", left: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-28 pb-16 md:pt-32 md:pb-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-center">
              {/* Left — pitch */}
              <div className="text-center lg:text-left">
                <div className="section-tag mx-auto lg:mx-0">Đăng nhập</div>
                <h1 className="t-h1 leading-[1.1] text-white mb-5">
                  Quay lại với<br /><span className="grad-text">tài khoản của bạn.</span>
                </h1>
                <p className="t-body-lg max-w-[520px] mx-auto lg:mx-0 mb-6">
                  Đăng nhập để xem đơn hàng cũ, tải lại file đã mua, lưu giỏ hàng và truy cập nhanh blog đã đánh dấu.
                </p>
                <ul className="flex flex-col gap-2 text-[0.92rem] max-w-[420px] mx-auto lg:mx-0" style={{ color: "var(--ink-soft)" }}>
                  <li className="flex items-start gap-2">
                    <span style={{ color: "#5fffaa" }}>✓</span>
                    <span>Xem lịch sử đơn + tải lại file mãi mãi (không hết hạn 30 ngày)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: "#5fffaa" }}>✓</span>
                    <span>Giỏ hàng sync giữa điện thoại + máy tính</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: "#5fffaa" }}>✓</span>
                    <span>Lưu kết quả quiz MBTI / Career để xem lại</span>
                  </li>
                </ul>
              </div>

              {/* Right — Clerk SignIn */}
              <div className="flex justify-center lg:justify-end">
                <SignIn
                  appearance={{
                    elements: {
                      rootBox: "w-full max-w-[420px]",
                      card: "bg-[rgba(255,255,255,0.025)] border border-[var(--line)] shadow-2xl",
                      header: "hidden",
                    },
                  }}
                  signUpUrl="/sign-up"
                  fallbackRedirectUrl="/account"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
