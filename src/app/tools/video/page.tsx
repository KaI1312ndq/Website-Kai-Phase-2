import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import { PRICING_MATRIX, TIER_DESCRIPTIONS, TIER_LABELS, WELCOME_BONUS_TOKENS, BONUS_TIERS } from "@/lib/video/pricing";

export const metadata: Metadata = {
  title: "AI Video Studio - Tạo video ads TikTok/Shopee 15-30s từ prompt",
  description: "Tool tạo video ads AI tiếng Việt cho TikTok/Shopee/Facebook. Pay-per-use token, không subscription. Tặng 40 token miễn phí khi đăng ký.",
  keywords: ["ai video", "tạo video ads", "video tiktok ads", "ai video tiếng việt"],
  alternates: { canonical: "/tools/video" },
};

const FAQ = [
  {
    q: "1 token đáng giá bao nhiêu?",
    a: "1 token = 1.000đ. Bạn nạp tiền vào tài khoản, tool tự quy đổi token. Nạp càng nhiều bonus càng cao: 500k +10%, 1M +20%, 5M +30%.",
  },
  {
    q: "Tặng 40 token khi đăng ký, tạo được video gì?",
    a: "Đủ tạo 1 video Standard 30s (40 token) hoặc 1 video Eco 25s (30 token) + dư 10 token để regen 1 clip Standard (15 token).",
  },
  {
    q: "Token có hết hạn không?",
    a: "KHÔNG. Token không hết hạn. Bạn nạp 1 lần dùng vĩnh viễn.",
  },
  {
    q: "Video bị lỗi có refund không?",
    a: "Có. Nếu worker render fail sau 3 lần retry, tool tự refund 100% token vào tài khoản bạn (trong cùng transaction).",
  },
  {
    q: "Khác Canva/CapCut AI thế nào?",
    a: "Canva/CapCut focus visual editing thủ công. Tool này: nhập prompt structure (sản phẩm + audience + CTA) → AI tự gen kịch bản + voiceover tiếng Việt + animate. Tập trung quảng cáo VN, không cần kéo thả.",
  },
  {
    q: "Voice tiếng Việt nghe có tự nhiên không?",
    a: "Dùng FPT.AI TTS v5 - giọng banmai (Bắc nữ), linhsan (Nam nữ), leminh (Bắc nam). Chất lượng cao, có cảm xúc, đã dùng trong các broadcast lớn.",
  },
];

const DURATIONS = [15, 20, 25, 30] as const;

export default function VideoLanding() {
  return (
    <>
      <Navbar />
      <GradientBlobs blobs={[
        { variant: "purple", size: 540, top: "-20%", right: "-5%" },
        { variant: "blue", size: 380, bottom: "10%", left: "-8%", delay: "2s" },
      ]} />

      <main className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-28 pb-16 md:pt-32 md:pb-24">
        {/* Hero */}
        <header className="text-center mb-14">
          <div className="section-tag mb-3">AI Video Studio · Beta · Pay-per-use</div>
          <h1 className="t-display mb-5 max-w-[900px] mx-auto text-white">
            Tạo video ads TikTok/Shopee bằng AI <span className="grad-text">trong 5 phút</span>
          </h1>
          <p className="t-body-lg max-w-[680px] mx-auto mb-7" style={{ color: "var(--ink-soft)" }}>
            Nhập tên sản phẩm + audience → AI tự gen kịch bản, giọng đọc tiếng Việt, animate clip 15-30s.
            Nạp token, dùng bao nhiêu trả bấy nhiêu. Tặng {WELCOME_BONUS_TOKENS} token miễn phí khi đăng ký.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/tools/video/dashboard" className="btn btn-primary text-[1.05rem]">
              Bắt đầu - nhận {WELCOME_BONUS_TOKENS} token miễn phí
            </Link>
            <Link href="#pricing" className="btn btn-ghost">
              Xem bảng giá
            </Link>
          </div>
        </header>

        {/* USP */}
        <section className="grid md:grid-cols-3 gap-5 mb-16">
          {[
            { title: "AI gen kịch bản tiếng Việt", body: "Claude Haiku viết script ads chuẩn hook-pain-product-CTA. Không cần biết copywriting." },
            { title: "Voice tự nhiên FPT.AI", body: "3 giọng Bắc/Nam, có cảm xúc. Test thử trước khi tốn token." },
            { title: "Pay-per-use, không subscription", body: "Token không hết hạn. Nạp nhiều bonus cao. Video lỗi refund 100%." },
          ].map((u) => (
            <div key={u.title} className="rounded-2xl border-2 p-6" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}>
              <h3 className="t-h4 mb-2 text-white">{u.title}</h3>
              <p className="t-body" style={{ color: "var(--ink-soft)" }}>{u.body}</p>
            </div>
          ))}
        </section>

        {/* Pricing matrix */}
        <section id="pricing" className="mb-16">
          <h2 className="t-display-sm mb-2 text-center text-white">Bảng giá theo tier × thời lượng</h2>
          <p className="text-center mb-8" style={{ color: "var(--ink-soft)" }}>
            1 token = 1.000đ. Chọn tier + duration phù hợp ngân sách.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 t-h5 text-white">Tier</th>
                  {DURATIONS.map((d) => (
                    <th key={d} className="p-3 t-h5 text-white text-center">{d}s</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(["eco", "standard", "pro"] as const).map((tier) => (
                  <tr key={tier} className="border-t" style={{ borderColor: "var(--st-08)" }}>
                    <td className="p-3 align-top">
                      <div className="font-semibold text-white">{TIER_LABELS[tier]}</div>
                      <div className="text-sm" style={{ color: "var(--ink-soft)" }}>
                        {TIER_DESCRIPTIONS[tier]}
                      </div>
                    </td>
                    {DURATIONS.map((d) => {
                      const cost = PRICING_MATRIX[tier]?.[d];
                      return (
                        <td key={d} className="p-3 text-center align-top">
                          {cost ? (
                            <>
                              <div className="font-semibold text-white">{cost} token</div>
                              <div className="text-xs" style={{ color: "var(--ink-soft)" }}>
                                {(cost * 1000).toLocaleString("vi-VN")}đ
                              </div>
                            </>
                          ) : (
                            <span style={{ color: "var(--ink-mute)" }}>-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm mt-4 text-center" style={{ color: "var(--ink-soft)" }}>
            Regen 1 clip: Standard 15 token · Pro 30 token. Video fail → refund 100%.
          </p>
        </section>

        {/* Topup bonus tiers */}
        <section className="mb-16">
          <h2 className="t-display-sm mb-6 text-center text-white">Nạp càng nhiều, bonus càng cao</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BONUS_TIERS.slice().reverse().map((t) => (
              <div key={t.label} className="rounded-2xl border-2 p-5 text-center" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}>
                <div className="t-h4 text-white mb-1">{t.label}</div>
                <div className="text-sm mb-3" style={{ color: "var(--ink-soft)" }}>
                  Từ {(t.minVnd / 1000).toLocaleString("vi-VN")}k
                </div>
                <div className="grad-text t-h2 font-bold">
                  {t.bonusPercent > 0 ? `+${t.bonusPercent}%` : "0%"}
                </div>
                <div className="text-xs mt-2" style={{ color: "var(--ink-mute)" }}>
                  {t.bonusPercent > 0 ? "bonus token" : "không bonus"}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-[780px] mx-auto">
          <h2 className="t-display-sm mb-6 text-center text-white">Câu hỏi thường gặp</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} className="rounded-2xl border-2 p-5" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}>
                <summary className="cursor-pointer font-semibold text-white">{f.q}</summary>
                <p className="mt-3" style={{ color: "var(--ink-soft)" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mt-16">
          <Link href="/tools/video/dashboard" className="btn btn-primary text-[1.05rem]">
            Nhận {WELCOME_BONUS_TOKENS} token miễn phí - tạo video đầu tiên
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
