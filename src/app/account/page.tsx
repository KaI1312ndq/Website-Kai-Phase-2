import type { Metadata } from "next";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import Icon from "@/components/icons/Icon";

export const metadata: Metadata = {
  title: "Tài khoản của tôi",
  description: "Quản lý đơn hàng, file đã mua và profile của bạn.",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const name = user?.firstName || user?.username || user?.emailAddresses[0]?.emailAddress.split("@")[0] || "bạn";

  const cards = [
    { href: "/account/orders", icon: "shopping-cart" as const, title: "Đơn hàng của tôi", desc: "Xem lịch sử đơn + tải lại file đã mua" },
    { href: "/quiz", icon: "test-tube" as const, title: "Lịch sử Test", desc: "Xem lại kết quả MBTI, Career, Leadership..." },
    { href: "/shop", icon: "tool" as const, title: "Tiếp tục mua sắm", desc: "Xem các template, bundle mới nhất tại Shop" },
  ];

  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden">
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "blue", size: 500, top: "-15%", right: "-5%" },
            { variant: "purple", size: 420, bottom: "-30%", left: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-28 pb-16 md:pt-32 md:pb-20">
            <div className="section-tag">Tài khoản</div>
            <h1 className="t-h1 leading-[1.1] text-white mb-3">
              Chào <span className="grad-text">{name}.</span>
            </h1>
            <p className="t-body-lg max-w-[600px] mb-10" style={{ color: "var(--ink-soft)" }}>
              Đây là khu vực cá nhân của bạn. Quản lý đơn hàng, tải lại file đã mua và xem lại lịch sử quiz.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {cards.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="group rounded-2xl p-6 transition-all hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid var(--line)",
                  }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(20,110,245,0.12)", border: "1px solid rgba(20,110,245,0.22)", color: "#7da9ff" }}>
                    <Icon name={c.icon} size={20} />
                  </div>
                  <h3 className="text-[1.05rem] font-semibold text-white mb-1.5">{c.title}</h3>
                  <p className="text-[0.88rem] leading-snug" style={{ color: "var(--ink-soft)" }}>{c.desc}</p>
                  <div className="mt-4 text-[0.82rem] font-semibold" style={{ color: "#7da9ff" }}>
                    Mở →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
