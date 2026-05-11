import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "Tạo tài khoản nguyenducquang.website - lưu giỏ hàng, tải lại file mãi mãi, theo dõi quiz history.",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden min-h-[80vh] flex items-center" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "purple", size: 500, top: "-20%", left: "-5%" },
            { variant: "blue", size: 420, bottom: "-30%", right: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-28 pb-16 md:pt-32 md:pb-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-center">
              {/* Left - pitch */}
              <div className="text-center lg:text-left">
                <div className="section-tag mx-auto lg:mx-0">Đăng ký miễn phí</div>
                <h1 className="t-h1 leading-[1.1] text-white mb-5">
                  Tạo tài khoản<br /><span className="grad-text">trong 30 giây.</span>
                </h1>
                <p className="t-body-lg max-w-[520px] mx-auto lg:mx-0 mb-6">
                  Đăng ký bằng Google hoặc Email. Không spam, không quảng cáo lằng nhằng - chỉ giữ lại đơn hàng và quiz history của bạn.
                </p>
                <ul className="flex flex-col gap-2 text-[0.92rem] max-w-[420px] mx-auto lg:mx-0" style={{ color: "var(--ink-soft)" }}>
                  <li className="flex items-start gap-2">
                    <span style={{ color: "#5fffaa" }}>✓</span>
                    <span>Hoàn toàn miễn phí - không cần thẻ tín dụng</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: "#5fffaa" }}>✓</span>
                    <span>Tải lại mọi file đã mua, không hết hạn 30 ngày</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: "#5fffaa" }}>✓</span>
                    <span>Nhận newsletter Marketing/Ecom hàng tuần (có thể huỷ bất cứ lúc nào)</span>
                  </li>
                </ul>
              </div>

              {/* Right - Clerk SignUp */}
              <div className="flex justify-center lg:justify-end">
                <SignUp
                  appearance={{
                    elements: {
                      rootBox: "w-full max-w-[420px]",
                      card: "bg-[rgba(255,255,255,0.025)] border border-[var(--line)] shadow-2xl",
                      header: "hidden",
                    },
                  }}
                  signInUrl="/sign-in"
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
