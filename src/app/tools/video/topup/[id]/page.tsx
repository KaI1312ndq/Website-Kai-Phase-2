import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { generateVietQRUrl } from "@/lib/video/bank";
import TopupStatusWatcher from "./TopupStatusWatcher";

export const metadata: Metadata = {
  title: "Thanh toán - AI Video Studio",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TopupQRPage({ params }: Props) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/tools/video/topup");

  const sb = getSupabaseAdmin();
  const { data: payment } = await sb
    .from("video_payments")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();

  if (!payment) notFound();

  // CRITICAL: must use PayOS virtual account (not real bank), or PayOS won't auto-confirm.
  const vaNumber = payment.payos_account_number;
  const vaName = payment.payos_account_name;
  const vaBin = payment.payos_bin;
  const hasVirtualAccount = Boolean(vaNumber && vaName && vaBin);

  const qrUrl = hasVirtualAccount
    ? generateVietQRUrl({
        bin: vaBin!,
        accountNumber: vaNumber!,
        accountName: vaName!,
        amountVnd: payment.amount_vnd,
        memo: payment.bank_memo ?? "",
      })
    : null;

  return (
    <>
      <Navbar />
      <GradientBlobs blobs={[{ variant: "purple", size: 420, top: "-20%", right: "-10%" }]} />

      <main className="relative max-w-[780px] mx-auto px-4 md:px-8 pt-24 pb-12">
        <h1 className="t-display-sm text-white mb-2">Quét QR để thanh toán</h1>
        <p className="mb-8" style={{ color: "var(--ink-soft)" }}>
          Token sẽ được cộng tự động trong vòng 30 giây sau khi chuyển khoản thành công.
        </p>

        <TopupStatusWatcher
          paymentId={payment.id}
          initialStatus={payment.status}
          tokensReceived={payment.tokens_received}
        />

        {!hasVirtualAccount && (
          <div className="card-glass p-4 mb-6" style={{ background: "rgba(239, 68, 68, 0.1)" }}>
            <div className="font-semibold text-red-400">⚠️ Giao dịch không có tài khoản nhận hợp lệ</div>
            <p className="text-sm mt-1" style={{ color: "var(--ink-soft)" }}>
              Có lỗi khi tạo thanh toán PayOS. Vui lòng quay lại trang nạp token và thử lại.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* QR */}
          <div className="card-glass p-5 text-center">
            {qrUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrUrl}
                alt="VietQR"
                className="w-full max-w-[320px] mx-auto rounded bg-white p-2"
              />
            )}
            {payment.checkout_url && (
              <a
                href={payment.checkout_url}
                target="_blank"
                rel="noopener"
                className="btn btn-primary mt-4 text-sm"
              >
                Mở trang PayOS để thanh toán →
              </a>
            )}
          </div>

          {/* Info */}
          <div className="card-glass p-5 space-y-3">
            <div className="rounded p-2 mb-2" style={{ background: "rgba(251, 191, 36, 0.1)" }}>
              <div className="text-xs font-semibold" style={{ color: "#fbbf24" }}>
                ⚠️ TÀI KHOẢN ẢO PAYOS - chuyển ĐÚNG vào đây
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--ink-soft)" }}>
                Không chuyển vào số tài khoản MB Bank cá nhân, hệ thống sẽ không tự nhận.
              </div>
            </div>
            <div>
              <div className="text-xs mb-1" style={{ color: "var(--ink-mute)" }}>Ngân hàng nhận</div>
              <div className="font-semibold text-white">
                {vaBin === "970422" ? "MB Bank" : `BIN ${vaBin}`}
              </div>
            </div>
            <div>
              <div className="text-xs mb-1" style={{ color: "var(--ink-mute)" }}>Số tài khoản ảo</div>
              <div className="font-semibold text-white font-mono text-lg">{vaNumber}</div>
            </div>
            <div>
              <div className="text-xs mb-1" style={{ color: "var(--ink-mute)" }}>Chủ tài khoản</div>
              <div className="font-semibold text-white">{vaName}</div>
            </div>
            <div className="pt-2 border-t" style={{ borderColor: "var(--st-15)" }}>
              <div className="text-xs mb-1" style={{ color: "var(--ink-mute)" }}>Số tiền</div>
              <div className="t-h3 grad-text font-bold">
                {payment.amount_vnd.toLocaleString("vi-VN")}đ
              </div>
            </div>
            <div>
              <div className="text-xs mb-1" style={{ color: "var(--ink-mute)" }}>Nội dung CK (BẮT BUỘC)</div>
              <div className="font-mono font-bold text-white p-2 rounded" style={{ background: "var(--st-08)" }}>
                {payment.bank_memo}
              </div>
              <div className="text-xs mt-2" style={{ color: "#fbbf24" }}>
                ⚠️ Phải nhập đúng nội dung này, nếu không token sẽ không được cộng tự động.
              </div>
            </div>
            <div className="pt-2 border-t" style={{ borderColor: "var(--st-15)" }}>
              <div className="text-xs mb-1" style={{ color: "var(--ink-mute)" }}>Token sẽ nhận</div>
              <div className="font-semibold text-white">
                {payment.tokens_received.toLocaleString("vi-VN")} token
                {payment.bonus_percent > 0 && (
                  <span className="grad-text text-sm ml-2">(+{payment.bonus_percent}% bonus)</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-center" style={{ color: "var(--ink-soft)" }}>
          Mã QR có hiệu lực 24 giờ. Nếu sau 1 phút token chưa được cộng,
          inbox Zalo 0868464658 kèm screenshot biên lai.
        </div>
      </main>

      <Footer />
    </>
  );
}
