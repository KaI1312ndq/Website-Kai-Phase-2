"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { QuizConfig, KnowledgeQuestion } from "@/lib/quiz/types";
import Icon, { type IconName } from "@/components/icons/Icon";
import ShareButtons from "@/components/blog/ShareButtons";

type AnswerRecord = {
  picked: number;
  timedOut: boolean;
  correct: boolean;
};

type Tier = {
  id: "gold" | "silver" | "bronze";
  name: string;
  iconName: IconName;
  color: string;
  feedback: string;
};

const TIERS: Tier[] = [
  {
    id: "gold",
    name: "Vàng - Chuyên gia chỉ số",
    iconName: "trophy",
    color: "#ffd479",
    feedback: "Bạn nắm cực vững các metrics digital ads. Tự tin chạy campaign + tư vấn cho team. Tiếp tục học deep-dive: attribution model, MMP, incremental testing.",
  },
  {
    id: "silver",
    name: "Bạc - Vững nền tảng",
    iconName: "check",
    color: "#7da9ff",
    feedback: "Bạn nắm được phần lớn metrics cơ bản. Cần luyện thêm về benchmark thực tế VN + cách diagnose campaign khi có vấn đề. Đọc blog ROAS + Marketing Index để nâng level.",
  },
  {
    id: "bronze",
    name: "Đồng - Đang học",
    iconName: "book-open",
    color: "#a78bff",
    feedback: "Bạn đang ở giai đoạn học fundamentals. Tập trung học: ROAS, CPC, CPM, CTR, CIR, AOV trước. Đừng nản - phần lớn marketer chỉ thực sự nắm metrics sau 6-12 tháng làm việc thực tế.",
  },
];

function getTier(percent: number): Tier {
  if (percent >= 80) return TIERS[0];
  if (percent >= 50) return TIERS[1];
  return TIERS[2];
}

/** IQ test specific - 6 archetype levels theo IQ score chuẩn (mean=100, SD=15) */
type IQTier = { name: string; iconName: IconName; color: string; feedback: string };
const IQ_TIERS: Array<{ min: number; tier: IQTier }> = [
  { min: 130, tier: { name: "Tài năng", iconName: "trophy", color: "#ffd479", feedback: "IQ ≥ 130 - top 2% dân số. Bạn có khả năng nhận diện pattern + suy luận tổng hợp xuất sắc. Lưu ý: IQ cao không tự động dẫn tới success - cần kết hợp emotional intelligence, ý chí, và networking. Hãy tận dụng tốt thay vì coi như identity." } },
  { min: 115, tier: { name: "Nhạy bén", iconName: "trending-up", color: "#5fffaa", feedback: "IQ 115-130 - top 15% dân số (Superior). Khả năng học hỏi nhanh, xử lý thông tin phức tạp tốt. Phù hợp các role analyst, engineer, product, strategy. Tiếp tục thử thách bản thân với problems khó hơn." } },
  { min: 105, tier: { name: "Sắc bén", iconName: "check", color: "#7da9ff", feedback: "IQ 105-115 - trên trung bình. Bạn xử lý tốt các vấn đề logic + pattern. Đủ năng lực cho hầu hết role chuyên môn. Tập trung phát triển skill chuyên sâu sẽ thấy hiệu quả nhanh." } },
  { min: 95, tier: { name: "Cân bằng", iconName: "book-open", color: "#a78bff", feedback: "IQ 95-105 - trung bình (chiếm 50% dân số). IQ ở mức này không hề là điểm yếu - 80% career success đến từ chăm chỉ + EQ + chọn đúng môi trường, không phải IQ thuần. Tập trung vào kỹ năng cụ thể bạn yêu thích." } },
  { min: 85, tier: { name: "Học hỏi", iconName: "book-open", color: "#ffd479", feedback: "IQ 85-95 - dưới trung bình một chút. Đây có thể do bài test không phù hợp pattern bạn quen (vd câu visual matrix cần luyện), không phải năng lực thật. Học kỹ năng + practice nhiều hơn sẽ thấy improvement nhanh." } },
  { min: 0, tier: { name: "Khám phá", iconName: "book-open", color: "#ff5a72", feedback: "IQ < 85 - có thể do test này không phù hợp style tư duy của bạn, hoặc bạn làm vội. Test online KHÔNG chính xác như WAIS-IV lâm sàng - đừng tự gắn nhãn. Practice các loại câu hỏi này sẽ thấy điểm tăng đáng kể." } },
];

function getIQTier(iqScore: number): IQTier {
  for (const { min, tier } of IQ_TIERS) {
    if (iqScore >= min) return tier;
  }
  return IQ_TIERS[IQ_TIERS.length - 1].tier;
}

/** Map số câu đúng -> IQ score chuẩn (linear interpolation theo 6 bins) */
function correctToIQ(correct: number): number {
  if (correct <= 5) return Math.round(70 + (correct / 5) * 15);
  if (correct <= 12) return Math.round(85 + ((correct - 5) / 7) * 10);
  if (correct <= 18) return Math.round(95 + ((correct - 12) / 6) * 10);
  if (correct <= 23) return Math.round(105 + ((correct - 18) / 5) * 10);
  if (correct <= 27) return Math.round(115 + ((correct - 23) / 4) * 15);
  return Math.round(130 + ((correct - 27) / 3) * 15);
}

export default function KnowledgeQuizResult({
  config,
  questions,
  answers,
  bestStreak,
  onRetake,
}: {
  config: QuizConfig;
  questions: KnowledgeQuestion[];
  answers: Record<number, AnswerRecord>;
  bestStreak: number;
  onRetake: () => void;
}) {
  const total = questions.length;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;
  const wrongCount = total - correctCount;
  const percent = Math.round((correctCount / total) * 100);
  const isIQ = config.slug === "test-iq";
  const iqScore = isIQ ? correctToIQ(correctCount) : 0;
  const tier = isIQ ? { id: "gold" as const, ...getIQTier(iqScore) } : getTier(percent);
  const [reviewMode, setReviewMode] = useState(false);

  // Save best score to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const key = `knowledgequiz:best:${config.slug}`;
      const prev = window.localStorage.getItem(key);
      const prevScore = prev ? parseInt(prev, 10) : 0;
      if (correctCount > prevScore) {
        window.localStorage.setItem(key, String(correctCount));
      }
    } catch {}
  }, [config.slug, correctCount]);

  const shareTitle = `Tôi vừa làm "${config.name}" - đạt ${correctCount}/${total} (${percent}%) - tier ${tier.name}!`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="max-w-[820px] mx-auto">
      {/* Hero result card */}
      <div
        className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden mb-7"
        style={{
          background: `linear-gradient(135deg, ${tier.color}18 0%, rgba(122,61,255,0.10) 100%)`,
          border: `1px solid ${tier.color}55`,
        }}
      >
        <div
          className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-5 qz-bounce-in"
          style={{ background: `${tier.color}25`, border: `1px solid ${tier.color}66`, color: tier.color }}
        >
          <Icon name={tier.iconName} size={48} strokeWidth={1.5} />
        </div>

        <div className="text-[0.7rem] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: tier.color }}>
          {isIQ ? "IQ Archetype" : "Tier kết quả"}
        </div>
        <h1 className="text-[2rem] md:text-[2.6rem] font-extrabold leading-tight tracking-tight text-white mb-4">
          {tier.name}
        </h1>

        {/* Score display */}
        {isIQ ? (
          <>
            <div className="flex items-baseline justify-center gap-3 mb-2">
              <span className="text-[3.5rem] md:text-[5rem] font-extrabold leading-none tabular-nums" style={{ color: tier.color }}>
                {iqScore}
              </span>
              <span className="text-[1.3rem] font-bold" style={{ color: "var(--st-50)" }}>
                IQ
              </span>
            </div>
            <div className="text-[0.92rem] font-semibold mb-2" style={{ color: tier.color }}>
              {correctCount}/{total} câu đúng · chuẩn quốc tế mean=100, SD=15
            </div>
          </>
        ) : (
          <>
            <div className="flex items-baseline justify-center gap-3 mb-2">
              <span className="text-[3rem] md:text-[4rem] font-extrabold leading-none tabular-nums" style={{ color: tier.color }}>
                {correctCount}
              </span>
              <span className="text-[1.5rem] font-bold" style={{ color: "var(--st-50)" }}>
                / {total}
              </span>
            </div>
            <div className="text-[1.05rem] font-semibold mb-5" style={{ color: tier.color }}>
              {percent}%
            </div>
          </>
        )}

        <p className="text-[0.95rem] leading-[1.7] max-w-[600px] mx-auto" style={{ color: "var(--st-85)" }}>
          {tier.feedback}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-7">
        <StatCard label="Đúng" value={correctCount} color="#5fffaa" icon="check" />
        <StatCard label="Sai" value={wrongCount} color="#ff5a72" icon="x-circle" />
        <StatCard label="Streak cao nhất" value={bestStreak} color="#ffd479" icon="fire" />
        <StatCard label="Tỷ lệ đúng" value={`${percent}%`} color={tier.color} icon="trending-up" />
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
        <button
          onClick={onRetake}
          className="inline-flex items-center gap-2 text-white font-bold text-[0.95rem] px-6 py-3 rounded-xl transition-all hover:scale-[1.03]"
          style={{ background: `linear-gradient(135deg, ${tier.color} 0%, #7a3dff 100%)`, boxShadow: `0 6px 20px ${tier.color}40` }}
        >
          <Icon name="refresh" size={16} />
          Làm lại bài test
        </button>
        <button
          onClick={() => setReviewMode((r) => !r)}
          className="inline-flex items-center gap-2 text-[0.95rem] font-semibold px-5 py-3 rounded-xl transition-all"
          style={{ background: "var(--st-04)", border: "1px solid var(--st-10)", color: "var(--ink)" }}
        >
          <Icon name="book-open" size={16} />
          {reviewMode ? "Ẩn review" : "Xem lại tất cả câu"}
        </button>
      </div>

      {/* Share */}
      <div className="mb-8">
        <ShareButtons url={shareUrl} title={shareTitle} />
      </div>

      {/* Review mode - show all questions with answers */}
      {reviewMode && (
        <div className="rounded-2xl p-6 md:p-8 mb-8" style={{ background: "var(--st-03)", border: "1px solid var(--line)" }}>
          <h2 className="text-[1.2rem] font-bold text-white mb-5">Review {total} câu</h2>
          <div className="flex flex-col gap-5">
            {questions.map((q, qIdx) => {
              const answer = answers[q.id];
              const isCorrect = answer?.correct;
              const timedOut = answer?.timedOut;
              return (
                <div key={q.id} className="rounded-xl p-5" style={{ background: "var(--st-03)", border: `1px solid ${isCorrect ? "rgba(95,255,170,0.3)" : "rgba(255,90,114,0.3)"}` }}>
                  <div className="flex items-start gap-3 mb-3">
                    <span
                      className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[0.78rem] font-bold"
                      style={{ background: isCorrect ? "#5fffaa" : "#ff5a72", color: isCorrect ? "#0a1438" : "white" }}
                    >
                      {qIdx + 1}
                    </span>
                    <h3 className="text-[0.95rem] font-bold text-white leading-snug flex-1">{q.q}</h3>
                  </div>
                  <div className="flex flex-col gap-1.5 ml-10 mb-3">
                    {q.opts.map((opt, oIdx) => {
                      const isPicked = oIdx === answer?.picked;
                      const isCorrectOpt = oIdx === q.ans;
                      return (
                        <div
                          key={oIdx}
                          className="flex items-start gap-2 px-3 py-2 rounded-lg text-[0.85rem]"
                          style={{
                            background: isCorrectOpt ? "rgba(95,255,170,0.08)" : isPicked ? "rgba(255,90,114,0.08)" : "transparent",
                            border: isCorrectOpt ? "1px solid rgba(95,255,170,0.3)" : isPicked ? "1px solid rgba(255,90,114,0.3)" : "1px solid transparent",
                          }}
                        >
                          <span className="font-bold flex-shrink-0" style={{ color: isCorrectOpt ? "#5fffaa" : isPicked ? "#ff5a72" : "var(--st-50)" }}>
                            {String.fromCharCode(65 + oIdx)}.
                          </span>
                          <span style={{ color: isCorrectOpt ? "white" : "var(--st-70)" }}>{opt}</span>
                          {isCorrectOpt && <Icon name="check" size={14} color="#5fffaa" strokeWidth={3} />}
                          {isPicked && !isCorrectOpt && <Icon name="x-circle" size={14} color="#ff5a72" />}
                        </div>
                      );
                    })}
                  </div>
                  {timedOut && (
                    <div className="ml-10 mb-2 text-[0.78rem]" style={{ color: "#ffd479" }}>
                      <Icon name="clock" size={12} /> Hết giờ
                    </div>
                  )}
                  <div className="ml-10 text-[0.85rem] leading-[1.6] rounded-lg px-3 py-2" style={{ background: "rgba(125,169,255,0.06)", border: "1px solid rgba(125,169,255,0.15)", color: "var(--st-85)" }}>
                    <Icon name="info" size={12} color="#7da9ff" /> {q.explain}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Course CTA */}
      <div className="rounded-2xl p-6 md:p-8" style={{ background: "linear-gradient(135deg, rgba(20,110,245,0.12) 0%, rgba(122,61,255,0.10) 100%)", border: "1px solid rgba(20,110,245,0.28)" }}>
        <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: "#7da9ff" }}>
          Học sâu hơn
        </div>
        <h3 className="text-[1.2rem] font-bold leading-tight text-white mb-3">
          Muốn nắm vững metrics + áp dụng thực chiến?
        </h3>
        <p className="text-[0.92rem] leading-[1.6] mb-5" style={{ color: "var(--st-70)" }}>
          Đọc thêm blog Marketing Index - benchmarks ROAS/CPA thực tế VN từ 60+ project. Hoặc dùng ROAS Calculator để tính break-even cho shop của bạn.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/index" className="btn btn-primary">Vào Marketing Index</Link>
          <Link href="/tools/roas-calculator" className="text-[0.88rem] font-semibold px-4 py-2.5 rounded-lg transition-all" style={{ border: "1px solid var(--st-15)", color: "var(--st-85)" }}>
            ROAS Calculator
          </Link>
          <Link href="/quiz" className="text-[0.88rem] font-semibold px-4 py-2.5 rounded-lg transition-all" style={{ border: "1px solid var(--st-15)", color: "var(--st-85)" }}>
            Test khác
          </Link>
        </div>
      </div>

      <style jsx>{`
        .qz-bounce-in {
          animation: qz-bounce-anim 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes qz-bounce-anim {
          0% { opacity: 0; transform: scale(0); }
          60% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

function StatCard({ label, value, color, icon }: { label: string; value: number | string; color: string; icon: IconName }) {
  return (
    <div className="rounded-xl p-4" style={{ background: "var(--st-03)", border: `1px solid ${color}25` }}>
      <div className="flex items-center gap-1.5 text-[0.66rem] font-bold uppercase tracking-[0.13em] mb-1.5" style={{ color: "var(--st-50)" }}>
        <Icon name={icon} size={11} color={color} />
        <span>{label}</span>
      </div>
      <div className="text-[1.5rem] font-extrabold tabular-nums" style={{ color }}>
        {value}
      </div>
    </div>
  );
}
