import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import Icon from "@/components/icons/Icon";
import { getOrderByDownloadToken } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Tải file - Đơn hàng",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function DownloadPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await getOrderByDownloadToken(token).catch(() => null);
  if (!order) notFound();

  const isPaid = order.paymentStatus === "paid";
  const isDelivered = order.deliveryStatus === "delivered";
  const expired = order.downloadExpiresAt && new Date(order.downloadExpiresAt) < new Date();

  if (!isPaid || !isDelivered) {
    return (
      <>
        <Navbar />
        <main>
          <ErrorState
            title="Đơn hàng chưa sẵn sàng"
            message="File chưa được giao. Vui lòng kiểm tra trạng thái đơn hàng hoặc liên hệ hỗ trợ."
            action={{ href: `/shop/order/${order.orderNumber}`, text: "Xem trạng thái đơn" }}
          />
        </main>
        <Footer />
      </>
    );
  }

  if (expired) {
    return (
      <>
        <Navbar />
        <main>
          <ErrorState
            title="Link tải đã hết hạn"
            message={`Link này đã hết hạn vào ${new Date(order.downloadExpiresAt!).toLocaleDateString("vi-VN")}. Liên hệ Quảng để gia hạn.`}
            action={{ href: "https://zalo.me/0868464658", text: "Liên hệ Zalo Quảng", external: true }}
          />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "blue", size: 500, top: "-20%", right: "-5%" },
            { variant: "purple", size: 420, bottom: "-30%", left: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[920px] mx-auto px-6 md:px-10 pt-32 pb-16 md:pt-36 md:pb-20 text-center">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6"
              style={{ background: "rgba(95,255,170,0.15)", border: "1px solid rgba(95,255,170,0.4)", color: "#5fffaa" }}
            >
              <Icon name="check" size={40} strokeWidth={2.5} />
            </div>
            <div className="section-tag mx-auto" style={{ borderColor: "rgba(95,255,170,0.4)", color: "#5fffaa", background: "rgba(95,255,170,0.08)" }}>
              Đơn {order.orderNumber} · Đã thanh toán
            </div>
            <h1 className="t-h1 leading-[1.1] text-white max-w-[820px] mx-auto mb-3">
              Cảm ơn {order.customer.name.split(" ").pop()}!<br /><span className="grad-text">File đã sẵn sàng.</span>
            </h1>
            <p className="t-body-lg max-w-[640px] mx-auto" style={{ color: "var(--ink-soft)" }}>
              Click nút bên dưới để tải file. Link còn hiệu lực đến <strong className="text-white">{new Date(order.downloadExpiresAt!).toLocaleDateString("vi-VN")}</strong>.
            </p>
          </div>
        </section>

        <section className="relative">
          <div className="max-w-[820px] mx-auto px-6 md:px-10 py-12 md:py-16">
            <div className="flex flex-col gap-4 mb-8">
              {order.files.map((f: any, i: number) => (
                <div key={i} className="rounded-xl p-5 flex items-center justify-between gap-4 flex-wrap" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(125,169,255,0.12)", border: "1px solid rgba(125,169,255,0.3)", color: "#7da9ff" }}>
                      <Icon name="book-open" size={22} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[0.95rem] font-bold text-white truncate">{f.title}</div>
                      <div className="text-[0.78rem] truncate" style={{ color: "var(--ink-mute)" }}>
                        {f.masterFileName || "Tải file"}
                      </div>
                    </div>
                  </div>
                  {f.masterFileUrl ? (
                    <a
                      href={f.masterFileUrl}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="inline-flex items-center gap-2 text-white font-bold text-[0.88rem] px-4 py-2.5 rounded-lg transition-all hover:scale-[1.02]"
                      style={{ background: "var(--grad-primary)", boxShadow: "0 6px 20px rgba(20,110,245,0.35)" }}
                    >
                      Tải file <Icon name="arrow-right" size={14} />
                    </a>
                  ) : (
                    <span className="text-[0.85rem] px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,90,114,0.10)", color: "#ff5a72" }}>
                      File đang được upload
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Tips */}
            <div className="rounded-xl p-5 mb-6" style={{ background: "rgba(255,212,121,0.06)", border: "1px solid rgba(255,212,121,0.22)" }}>
              <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "#ffd479" }}>
                Quan trọng
              </div>
              <ul className="flex flex-col gap-1.5 text-[0.85rem]" style={{ color: "var(--st-85)" }}>
                <li className="flex items-start gap-2"><Icon name="check" size={12} color="#ffd479" strokeWidth={3} /><span>Lưu file về máy ngay để dùng lâu dài (link có thời hạn)</span></li>
                <li className="flex items-start gap-2"><Icon name="check" size={12} color="#ffd479" strokeWidth={3} /><span>Bookmark trang này - quay lại tải lại bất kỳ lúc nào (đến {new Date(order.downloadExpiresAt!).toLocaleDateString("vi-VN")})</span></li>
                <li className="flex items-start gap-2"><Icon name="check" size={12} color="#ffd479" strokeWidth={3} /><span>Link cũng đã được gửi vào email {order.customer.email}</span></li>
              </ul>
            </div>

            <div className="text-center text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>
              Có vấn đề tải file? Nhắn Zalo <a href="https://zalo.me/0868464658" className="underline" style={{ color: "#7da9ff" }}>0868464658</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ErrorState({ title, message, action }: { title: string; message: string; action?: { href: string; text: string; external?: boolean } }) {
  return (
    <section className="relative overflow-hidden min-h-[80vh] flex items-center" style={{ borderColor: "var(--line)" }}>
      <div className="grid-pattern" />
      <GradientBlobs blobs={[
        { variant: "blue", size: 500, top: "-20%", right: "-5%" },
        { variant: "purple", size: 420, bottom: "-30%", left: "-5%", delay: "2s" },
      ]} />
      <div className="relative max-w-[600px] mx-auto px-6 md:px-10 py-20 md:py-28 w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5" style={{ background: "rgba(255,90,114,0.12)", border: "1px solid rgba(255,90,114,0.3)", color: "#ff5a72" }}>
          <Icon name="alert-triangle" size={32} />
        </div>
        <h1 className="text-[1.6rem] font-bold text-white mb-3">{title}</h1>
        <p className="text-[1rem] mb-7" style={{ color: "var(--ink-soft)" }}>{message}</p>
        {action && (
          action.external ? (
            <a href={action.href} target="_blank" rel="noreferrer" className="btn btn-primary">{action.text} </a>
          ) : (
            <Link href={action.href} className="btn btn-primary">{action.text} </Link>
          )
        )}
      </div>
    </section>
  );
}
