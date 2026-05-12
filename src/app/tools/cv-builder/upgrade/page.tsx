import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import { CV_PRICING, getQuotaStatus } from "@/lib/cv/quota";
import UpgradeClient from "./UpgradeClient";

export const metadata: Metadata = {
  title: "Upgrade Pro - CV Builder",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const BANK = {
  bank: "MB Bank",
  account: "0868464658",
  name: "NGUYEN DUC QUANG",
};

export default async function UpgradePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/tools/cv-builder/upgrade");

  const user = await currentUser();
  const quota = await getQuotaStatus(userId);
  const email = user?.emailAddresses?.[0]?.emailAddress || "";

  if (quota.isPro) {
    return (
      <>
        <Navbar />
        <GradientBlobs blobs={[{ variant: "blue", size: 420, top: "-15%", right: "-5%" }]} />
        <main className="relative max-w-[800px] mx-auto px-6 pt-28 pb-16">
          <div className="rounded-2xl p-8 text-center" style={{ background: "var(--grad-primary-soft)", border: "1px solid var(--st-12)" }}>
            <div className="text-[3rem] mb-3">✓</div>
            <h1 className="t-h2 text-white mb-3">Bạn đã là Pro</h1>
            <p className="text-[0.95rem] mb-5" style={{ color: "var(--ink-soft)" }}>
              Unlimited downloads + AI feedback. Cảm ơn bạn đã ủng hộ!
            </p>
            <Link href="/tools/cv-builder/build" className="btn btn-primary">Tiếp tục tạo CV</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Order ref includes user_id prefix để admin nhận diện
  const orderRef = `CV-${userId.slice(-8).toUpperCase()}`;
  const transferContent = `${orderRef} CV PRO`;
  const qrUrl = `https://img.vietqr.io/image/${encodeURIComponent("MB")}-${BANK.account}-compact2.png?amount=${CV_PRICING.proPriceVND}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(BANK.name)}`;

  return (
    <>
      <Navbar />
      <GradientBlobs blobs={[{ variant: "blue", size: 420, top: "-15%", right: "-5%" }]} />
      <main className="relative max-w-[1000px] mx-auto px-6 md:px-10 pt-28 pb-16">
        <Link href="/tools/cv-builder/build" className="text-[0.82rem] hover:underline" style={{ color: "#7da9ff" }}>
          ← Quay lại CV Builder
        </Link>
        <h1 className="t-h2 text-white mt-3 mb-2">Upgrade Pro - 49.000đ</h1>
        <p className="text-[0.95rem] mb-8" style={{ color: "var(--ink-soft)" }}>
          1 lần mua - dùng vĩnh viễn. Unlimited download + AI feedback 50 lần/tháng.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* QR + bank */}
          <div className="rounded-2xl p-6" style={{ background: "var(--st-04)", border: "1px solid var(--st-10)" }}>
            <h2 className="text-[1.05rem] font-bold text-white mb-4">Chuyển khoản VietQR</h2>
            <div className="aspect-square rounded-xl bg-white p-4 mb-4 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrUrl} alt="VietQR" className="max-w-full max-h-full" />
            </div>
            <div className="space-y-2 text-[0.88rem]">
              <Row label="Ngân hàng" value={BANK.bank} />
              <Row label="Số TK" value={BANK.account} copy />
              <Row label="Tên TK" value={BANK.name} />
              <Row label="Số tiền" value={`${CV_PRICING.proPriceVND.toLocaleString("vi-VN")}đ`} highlight />
              <Row label="Nội dung CK" value={transferContent} copy />
            </div>
          </div>

          {/* Confirm flow */}
          <div className="rounded-2xl p-6" style={{ background: "var(--st-04)", border: "1px solid var(--st-10)" }}>
            <h2 className="text-[1.05rem] font-bold text-white mb-4">3 bước</h2>
            <ol className="space-y-4 text-[0.92rem]">
              <Step n={1} title="Scan QR + chuyển khoản">
                Số tiền 49.000đ, nội dung như trên (rất quan trọng để admin nhận diện)
              </Step>
              <Step n={2} title="Bấm 'Xác nhận đã chuyển' bên dưới">
                Hệ thống tạo đơn pending, admin check trong 1-24h
              </Step>
              <Step n={3} title="Đợi email xác nhận">
                Sau khi admin confirm, Pro được bật ngay. Inbox Zalo 0868464658 nếu cần gấp.
              </Step>
            </ol>

            <div className="mt-6 pt-5 border-t" style={{ borderColor: "var(--st-08)" }}>
              <UpgradeClient userEmail={email} orderRef={orderRef} />
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl p-5 text-[0.85rem]" style={{ background: "var(--st-03)", border: "1px solid var(--st-08)", color: "var(--ink-mute)" }}>
          <strong className="text-white">Hoàn tiền 100% trong 7 ngày</strong> nếu không hài lòng. Inbox Zalo <a href="https://zalo.me/0868464658" className="underline" style={{ color: "#7da9ff" }}>0868464658</a>.
        </div>
      </main>
      <Footer />
    </>
  );
}

function Row({ label, value, copy, highlight }: { label: string; value: string; copy?: boolean; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <span style={{ color: "var(--ink-mute)" }}>{label}</span>
      <span className={highlight ? "text-[1.05rem] font-bold" : "font-mono"} style={{ color: highlight ? "#5fffaa" : "var(--ink)" }}>
        {value}
      </span>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-[0.85rem]" style={{ background: "var(--grad-primary)", color: "white" }}>{n}</span>
      <div>
        <div className="font-semibold text-white mb-1">{title}</div>
        <div className="text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>{children}</div>
      </div>
    </li>
  );
}
