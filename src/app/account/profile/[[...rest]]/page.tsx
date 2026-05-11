"use client";
import Link from "next/link";
import { UserProfile } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden">
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "purple", size: 500, top: "-15%", left: "-5%" },
            { variant: "blue", size: 420, bottom: "-30%", right: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-28 pb-16 md:pt-32 md:pb-20">
            <div className="flex items-center gap-2 text-[0.82rem] mb-4" style={{ color: "var(--ink-mute)" }}>
              <Link href="/account" className="hover:text-white transition-colors">Tài khoản</Link>
              <span>/</span>
              <span className="text-white">Hồ sơ</span>
            </div>
            <h1 className="t-h1 leading-[1.1] text-white mb-3">
              Hồ sơ <span className="grad-text">cá nhân.</span>
            </h1>
            <p className="t-body-lg max-w-[600px] mb-10" style={{ color: "var(--ink-soft)" }}>
              Cập nhật tên, ảnh đại diện, email, số điện thoại + đổi mật khẩu ở đây. Thông tin dùng để tự động điền khi checkout.
            </p>

            <div className="flex justify-center">
              <UserProfile
                path="/account/profile"
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    cardBox: "w-full max-w-none shadow-2xl",
                    card: "bg-[rgba(255,255,255,0.025)] border border-[var(--line)]",
                    navbar: "bg-transparent border-r border-[var(--line)]",
                    pageScrollBox: "bg-transparent",
                  },
                }}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
