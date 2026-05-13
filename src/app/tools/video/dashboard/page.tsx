import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import { getOrCreateVideoProfile, getRecentTransactions } from "@/lib/video/profile";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Dashboard - AI Video Studio",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  pending: "Chờ xử lý",
  scripting: "Đang viết kịch bản",
  imaging: "Đang tạo hình ảnh",
  animating: "Đang animate",
  composing: "Đang ghép clip",
  completed: "Hoàn tất",
  failed: "Lỗi",
  refunded: "Đã hoàn token",
  cancelled: "Đã huỷ",
};

const STATUS_COLOR: Record<string, string> = {
  completed: "text-green-400",
  failed: "text-red-400",
  refunded: "text-amber-400",
  cancelled: "text-gray-400",
};

export default async function VideoDashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/tools/video/dashboard");

  const profile = await getOrCreateVideoProfile(userId);
  const transactions = await getRecentTransactions(userId, 10);

  const sb = getSupabaseAdmin();
  const { data: videos } = await sb
    .from("videos")
    .select("id, tier, duration, status, status_message, progress_percent, thumbnail_url, created_at, token_cost")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <>
      <Navbar />
      <GradientBlobs blobs={[
        { variant: "purple", size: 420, top: "-20%", right: "-10%" },
      ]} />

      <main className="relative max-w-[1100px] mx-auto px-4 md:px-8 pt-24 pb-12">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="t-display-sm text-white">AI Video Studio</h1>
            <p style={{ color: "var(--ink-soft)" }}>Dashboard quản lý token + video</p>
          </div>
          <div className="flex gap-2">
            <Link href="/tools/video/create" className="btn btn-primary">Tạo video mới</Link>
            <Link href="/tools/video/topup" className="btn btn-ghost">Nạp token</Link>
          </div>
        </div>

        {/* Balance */}
        <section className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="rounded-2xl border-2 p-6" style={{ background: "rgba(168,85,247,0.06)", borderColor: "rgba(168,85,247,0.25)" }}>
            <div className="text-sm mb-1" style={{ color: "var(--ink-soft)" }}>Token hiện có</div>
            <div className="t-h1 grad-text font-bold">{profile.token_balance.toLocaleString("vi-VN")}</div>
            <div className="text-xs mt-1" style={{ color: "var(--ink-mute)" }}>
              ≈ {(profile.token_balance * 1000).toLocaleString("vi-VN")}đ
            </div>
          </div>
          <div className="rounded-2xl border-2 p-6" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}>
            <div className="text-sm mb-1" style={{ color: "var(--ink-soft)" }}>Tổng đã nạp</div>
            <div className="t-h2 text-white font-bold">
              {profile.total_spent_vnd.toLocaleString("vi-VN")}đ
            </div>
          </div>
          <div className="rounded-2xl border-2 p-6" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}>
            <div className="text-sm mb-1" style={{ color: "var(--ink-soft)" }}>Video đã tạo</div>
            <div className="t-h2 text-white font-bold">{profile.total_videos_created}</div>
          </div>
        </section>

        {/* Videos */}
        <section className="mb-10">
          <h2 className="t-h3 mb-4 text-white">Video gần đây</h2>
          {!videos || videos.length === 0 ? (
            <div className="rounded-2xl border-2 p-8 text-center" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}>
              <p className="mb-4" style={{ color: "var(--ink-soft)" }}>
                Chưa có video nào. Tạo video đầu tiên với {profile.token_balance} token đang có.
              </p>
              <Link href="/tools/video/create" className="btn btn-primary">Tạo video đầu tiên</Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((v) => (
                <Link
                  key={v.id}
                  href={`/tools/video/${v.id}`}
                  className="rounded-2xl border-2 p-4 block hover:scale-[1.02] transition-transform"
                  style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}
                >
                  {v.thumbnail_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={v.thumbnail_url} alt="" className="w-full aspect-video object-cover rounded mb-3" />
                  ) : (
                    <div className="w-full aspect-video rounded mb-3 flex items-center justify-center"
                         style={{ background: "var(--st-08)", color: "var(--ink-mute)" }}>
                      {v.status === "completed" ? "✓" : "..."}
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-white">{v.tier.toUpperCase()} · {v.duration}s</span>
                    <span className={STATUS_COLOR[v.status] ?? "text-white"}>
                      {STATUS_LABEL[v.status] ?? v.status}
                    </span>
                  </div>
                  <div className="text-xs mt-1" style={{ color: "var(--ink-mute)" }}>
                    {v.token_cost} token · {new Date(v.created_at).toLocaleDateString("vi-VN")}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Transactions */}
        <section>
          <h2 className="t-h3 mb-4 text-white">Lịch sử token</h2>
          {transactions.length === 0 ? (
            <p style={{ color: "var(--ink-soft)" }}>Chưa có giao dịch.</p>
          ) : (
            <div className="rounded-2xl border-2 p-2 overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm" style={{ color: "var(--ink-soft)" }}>
                    <th className="p-3">Thời gian</th>
                    <th className="p-3">Loại</th>
                    <th className="p-3">Ghi chú</th>
                    <th className="p-3 text-right">Số token</th>
                    <th className="p-3 text-right">Số dư sau</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id} className="border-t" style={{ borderColor: "var(--st-08)" }}>
                      <td className="p-3 text-sm" style={{ color: "var(--ink-soft)" }}>
                        {new Date(t.created_at).toLocaleString("vi-VN")}
                      </td>
                      <td className="p-3 text-sm text-white">{t.type}</td>
                      <td className="p-3 text-sm" style={{ color: "var(--ink-soft)" }}>{t.note}</td>
                      <td className={`p-3 text-sm text-right font-semibold ${t.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                        {t.amount > 0 ? "+" : ""}{t.amount}
                      </td>
                      <td className="p-3 text-sm text-right text-white">{t.balance_after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
