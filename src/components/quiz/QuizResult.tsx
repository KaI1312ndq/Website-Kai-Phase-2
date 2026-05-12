"use client";
import Link from "next/link";
import type { QuizConfig, QuizArchetype } from "@/lib/quiz/types";
import ShareButtons from "@/components/blog/ShareButtons";
import Icon from "@/components/icons/Icon";

type Props = {
  config: QuizConfig;
  result: {
    archetype: QuizArchetype;
    /** Phong cách phụ - điểm cao nhì. Chỉ có cho leadership + career. */
    secondary?: QuizArchetype;
    secondaryScore?: number;
    topScore?: number;
    scores: Record<string, number>;
    ranked?: Array<{ id: string; score: number }>;
    dichotomies?: Array<{ a: string; b: string; aScore: number; bScore: number; aPct: number }>;
    /** Multi-score quizzes (EQ, BigFive, DarkTriad): dimension % map */
    dimensions?: Record<string, number>;
    /** EQ specific */
    totalScore?: number;
    totalPct?: number;
    /** Dark Triad specific */
    avgPct?: number;
    /** Enneagram wing */
    wing?: string;
    type?: string;
  };
  onRetake: () => void;
};

const DICH_LABELS: Record<string, string> = {
  E: "Hướng ngoại",
  I: "Hướng nội",
  S: "Giác quan",
  N: "Trực giác",
  T: "Lý trí",
  F: "Cảm xúc",
  J: "Nguyên tắc",
  P: "Linh hoạt",
};

export default function QuizResult({ config, result, onRetake }: Props) {
  const { archetype, secondary, secondaryScore, topScore } = result;
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = baseUrl ? `${baseUrl}/quiz/${config.slug}/result/${archetype.id}` : "";
  const shareTitle = secondary
    ? `Tôi vừa làm "${config.name}" - chính: ${archetype.name}, phụ: ${secondary.name}!`
    : `Tôi vừa làm "${config.name}" - kết quả: ${archetype.name}!`;

  // % mix giữa chính + phụ (chỉ khi có secondary)
  const mixTotal = (topScore || 0) + (secondaryScore || 0);
  const primaryPct = mixTotal > 0 ? Math.round(((topScore || 0) / mixTotal) * 100) : 100;
  const secondaryPct = mixTotal > 0 ? 100 - primaryPct : 0;

  return (
    <div className="max-w-[860px] mx-auto">
      {/* Hero result card */}
      <div
        className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${archetype.color}18 0%, rgba(122,61,255,0.10) 100%)`,
          border: `1px solid ${archetype.color}55`,
        }}
      >
        <div className="text-[0.7rem] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: archetype.color }}>
          {secondary ? "Phong cách chính" : "Kết quả của bạn"}
        </div>
        <h1 className="text-[2rem] md:text-[2.6rem] font-extrabold leading-tight tracking-tight text-white mb-3">
          {archetype.name}
        </h1>
        <p className="text-[0.95rem] md:text-[1.05rem] font-semibold mb-2" style={{ color: archetype.color }}>
          {archetype.tagline}
        </p>
        {secondary && (
          <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.78rem]" style={{ background: "var(--st-06)", border: "1px solid var(--st-12)", color: "var(--st-85)" }}>
            <span style={{ color: archetype.color }}>{primaryPct}%</span>
            <span style={{ color: "var(--st-40)" }}>·</span>
            <span style={{ color: secondary.color }}>{secondaryPct}% {secondary.name}</span>
          </div>
        )}
      </div>

      {/* Secondary style - phong cách phụ */}
      {secondary && (
        <div
          className="mt-6 rounded-2xl p-6 md:p-7"
          style={{
            background: `linear-gradient(135deg, ${secondary.color}10 0%, var(--st-03) 100%)`,
            border: `1px solid ${secondary.color}33`,
          }}
        >
          <div className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: secondary.color }}>
            <Icon name="sparkles" size={14} />
            <span>Phong cách phụ - bạn mix thêm</span>
          </div>
          <div className="flex items-baseline gap-3 mb-3 flex-wrap">
            <h3 className="text-[1.4rem] md:text-[1.6rem] font-extrabold text-white">{secondary.name}</h3>
            <span className="text-[0.85rem] font-semibold" style={{ color: secondary.color }}>{secondary.tagline}</span>
          </div>
          {secondary.description?.[0] && (
            <p className="text-[0.92rem] leading-[1.7] mb-4" style={{ color: "var(--ink-soft)" }}>
              {secondary.description[0]}
            </p>
          )}
          {Array.isArray(secondary.strengths) && secondary.strengths.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {secondary.strengths.slice(0, 4).map((s) => (
                <span key={s} className="text-[0.8rem] px-2.5 py-1 rounded-md" style={{ background: `${secondary.color}15`, border: `1px solid ${secondary.color}33`, color: "var(--st-90)" }}>
                  ✓ {s}
                </span>
              ))}
            </div>
          )}
          <Link
            href={`/quiz/${config.slug}/result/${secondary.id}`}
            className="inline-flex items-center gap-1.5 text-[0.85rem] font-semibold"
            style={{ color: secondary.color }}
          >
            Xem chi tiết phong cách phụ 
          </Link>
        </div>
      )}

      {/* Multi-score dimension bars (EQ, BigFive, DarkTriad) */}
      {result.dimensions && config.dimensionLabels && (
        <div className="mt-6 rounded-2xl p-6 md:p-8" style={{ background: "var(--st-03)", border: "1px solid var(--line)" }}>
          <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-5" style={{ color: "var(--st-55)" }}>
            {result.totalScore !== undefined
              ? `Tổng điểm EQ: ${result.totalScore}/160`
              : result.avgPct !== undefined
              ? `Trung bình: ${result.avgPct}%`
              : "Phân tích chi tiết"}
          </div>
          <div className="flex flex-col gap-5">
            {Object.entries(result.dimensions).map(([dimKey, pct]) => {
              const label = config.dimensionLabels?.[dimKey] || dimKey;
              return (
                <div key={dimKey}>
                  <div className="flex items-center justify-between text-[0.92rem] mb-2">
                    <span className="font-semibold text-white">{label}</span>
                    <span className="font-bold" style={{ color: archetype.color }}>{pct}%</span>
                  </div>
                  <div className="h-3 rounded-full relative overflow-hidden" style={{ background: "var(--st-06)" }}>
                    <div
                      className="absolute top-0 left-0 h-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${archetype.color}, ${archetype.color}cc)` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Enneagram wing display */}
      {result.wing && (
        <div className="mt-6 rounded-2xl p-6" style={{ background: "var(--st-03)", border: "1px solid var(--line)" }}>
          <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: "var(--st-55)" }}>
            Wing (Cánh) của bạn
          </div>
          <div className="text-[1.1rem] font-bold text-white">
            Type {result.type}w{result.wing}
          </div>
          <p className="text-[0.88rem] mt-2" style={{ color: "var(--ink-soft)" }}>
            Wing là type liền kề chiếm điểm cao thứ 2 - định nghĩa nuance trong type chính của bạn.
          </p>
        </div>
      )}

      {/* MBTI dichotomy bars */}
      {result.dichotomies && (
        <div className="mt-6 rounded-2xl p-6 md:p-8" style={{ background: "var(--st-03)", border: "1px solid var(--line)" }}>
          <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-5" style={{ color: "var(--st-55)" }}>
            Phân tích 4 chiều
          </div>
          <div className="flex flex-col gap-5">
            {result.dichotomies.map((d) => {
              const aSelected = d.aPct >= 50;
              return (
                <div key={d.a + d.b}>
                  <div className="flex items-center justify-between text-[0.85rem] mb-2">
                    <span className={aSelected ? "font-bold text-white" : ""} style={{ color: aSelected ? "white" : "var(--st-50)" }}>
                      {d.a} · {DICH_LABELS[d.a]}
                    </span>
                    <span className={!aSelected ? "font-bold text-white" : ""} style={{ color: !aSelected ? "white" : "var(--st-50)" }}>
                      {DICH_LABELS[d.b]} · {d.b}
                    </span>
                  </div>
                  <div className="h-2 rounded-full relative overflow-hidden" style={{ background: "var(--st-06)" }}>
                    <div
                      className="absolute top-0 left-0 h-full transition-all duration-500"
                      style={{ width: `${d.aPct}%`, background: aSelected ? archetype.color : "var(--st-30)" }}
                    />
                    <div
                      className="absolute top-0 right-0 h-full transition-all duration-500"
                      style={{ width: `${100 - d.aPct}%`, background: !aSelected ? archetype.color : "var(--st-30)" }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[0.7rem] mt-1.5" style={{ color: "var(--st-50)" }}>
                    <span>{Math.round(d.aPct)}%</span>
                    <span>{Math.round(100 - d.aPct)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Description */}
      <div className="mt-6 rounded-2xl p-6 md:p-8" style={{ background: "var(--st-03)", border: "1px solid var(--line)" }}>
        <h2 className="text-[1.2rem] font-bold text-white mb-4">Bạn là ai?</h2>
        <div className="flex flex-col gap-3">
          {archetype.description.map((p, i) => (
            <p key={i} className="text-[0.95rem] leading-[1.75]" style={{ color: "var(--ink-soft)" }}>{p}</p>
          ))}
        </div>
      </div>

      {/* Strengths + Weaknesses grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-2xl p-6" style={{ background: "rgba(95,255,170,0.05)", border: "1px solid rgba(95,255,170,0.2)" }}>
          <div className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: "#5fffaa" }}>
            <Icon name="check" size={14} strokeWidth={2.5} />
            <span>Điểm mạnh</span>
          </div>
          <ul className="flex flex-col gap-2 list-none">
            {archetype.strengths.map((s) => (
              <li key={s} className="text-[0.9rem] flex items-start gap-2" style={{ color: "var(--st-90)" }}>
                <span style={{ color: "#5fffaa" }}>•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl p-6" style={{ background: "rgba(255,212,121,0.05)", border: "1px solid rgba(255,212,121,0.22)" }}>
          <div className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: "#ffd479" }}>
            <Icon name="alert-triangle" size={14} />
            <span>Cần lưu ý</span>
          </div>
          <ul className="flex flex-col gap-2 list-none">
            {archetype.weaknesses.map((s) => (
              <li key={s} className="text-[0.9rem] flex items-start gap-2" style={{ color: "var(--st-90)" }}>
                <span style={{ color: "#ffd479" }}>•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Context */}
      <div className="mt-6 rounded-2xl p-6 md:p-8" style={{ background: "var(--st-03)", border: "1px solid var(--line)" }}>
        <h2 className="text-[1.1rem] font-bold text-white mb-4">
          {config.scoringType === "leadership" ? "Phù hợp nhất với" : "Công việc phù hợp"}
        </h2>
        <div className="flex flex-wrap gap-2">
          {archetype.context.map((c) => (
            <span key={c} className="text-[0.85rem] px-3 py-1.5 rounded-lg" style={{ background: "var(--st-04)", border: "1px solid var(--st-08)", color: "var(--st-85)" }}>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Advice */}
      {archetype.advice && archetype.advice.length > 0 && (
        <div className="mt-6 rounded-2xl p-6 md:p-8" style={{ background: `${archetype.color}10`, border: `1px solid ${archetype.color}33` }}>
          <h2 className="flex items-center gap-2 text-[1.1rem] font-bold text-white mb-4">
            <Icon name="lightbulb" size={20} color={archetype.color} />
            <span>Lời khuyên cân bằng</span>
          </h2>
          <ul className="flex flex-col gap-2 list-none">
            {archetype.advice.map((a) => (
              <li key={a} className="text-[0.92rem] leading-[1.6] flex items-start gap-2.5" style={{ color: "var(--ink-soft)" }}>
                <span style={{ color: archetype.color }}></span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Follow both styles */}
      {secondary && (
        <div className="mt-8 rounded-2xl p-6" style={{ background: "var(--st-03)", border: "1px solid var(--line)" }}>
          <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: "var(--st-55)" }}>
            Follow cả 2 phong cách
          </div>
          <p className="text-[0.9rem] mb-4 leading-[1.6]" style={{ color: "var(--ink-soft)" }}>
            Bạn không thuần 1 phong cách - kết hợp <strong style={{ color: archetype.color }}>{archetype.name}</strong> ({primaryPct}%) với <strong style={{ color: secondary.color }}>{secondary.name}</strong> ({secondaryPct}%). Đọc kỹ cả 2 để hiểu hết điểm mạnh + điểm cần lưu ý:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href={`/quiz/${config.slug}/result/${archetype.id}`}
              className="rounded-xl p-4 flex flex-col gap-1 transition-transform hover:-translate-y-0.5"
              style={{ background: `${archetype.color}12`, border: `1px solid ${archetype.color}40` }}
            >
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em]" style={{ color: archetype.color }}>Chính · {primaryPct}%</span>
              <span className="text-[1rem] font-bold text-white">{archetype.name}</span>
              <span className="text-[0.78rem]" style={{ color: "var(--ink-mute)" }}>Xem chi tiết </span>
            </Link>
            <Link
              href={`/quiz/${config.slug}/result/${secondary.id}`}
              className="rounded-xl p-4 flex flex-col gap-1 transition-transform hover:-translate-y-0.5"
              style={{ background: `${secondary.color}12`, border: `1px solid ${secondary.color}40` }}
            >
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em]" style={{ color: secondary.color }}>Phụ · {secondaryPct}%</span>
              <span className="text-[1rem] font-bold text-white">{secondary.name}</span>
              <span className="text-[0.78rem]" style={{ color: "var(--ink-mute)" }}>Xem chi tiết </span>
            </Link>
          </div>
        </div>
      )}

      {/* Share */}
      <div className="mt-8">
        {!secondary && (
          <div className="text-[0.78rem] mb-3 inline-flex items-center gap-2" style={{ color: "var(--st-50)" }}>
            <Icon name="link" size={13} />
            <span>Trang chi tiết: <Link href={`/quiz/${config.slug}/result/${archetype.id}`} className="underline" style={{ color: archetype.color }}>{`/quiz/${config.slug}/result/${archetype.id}`}</Link></span>
          </div>
        )}
        <ShareButtons url={shareUrl} title={shareTitle} />
      </div>

      {/* CTA + Retake */}
      <div className="mt-8 rounded-2xl p-6 md:p-8" style={{ background: "linear-gradient(135deg, rgba(20,110,245,0.12) 0%, rgba(122,61,255,0.10) 100%)", border: "1px solid rgba(20,110,245,0.28)" }}>
        <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: "#7da9ff" }}>
          Đọc thêm
        </div>
        <h3 className="text-[1.2rem] font-bold leading-tight text-white mb-3">
          Muốn hiểu sâu hơn về tư duy lãnh đạo và phát triển sự nghiệp?
        </h3>
        <p className="text-[0.92rem] leading-[1.6] mb-5" style={{ color: "var(--st-70)" }}>
          Đọc thêm bài viết về Leadership, Career và phát triển bản thân trên blog của Quảng - chia sẻ thực tế từ kinh nghiệm 60+ project.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/blog" className="btn btn-primary">Xem blog </Link>
          <Link href="/quiz" className="text-[0.88rem] font-semibold px-4 py-2.5 rounded-lg transition-all" style={{ border: "1px solid var(--st-15)", color: "var(--st-85)" }}>
            Quiz khác
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onRetake}
          className="text-[0.88rem] font-semibold transition-colors hover:text-white"
          style={{ color: "var(--ink-mute)" }}
        >
          ↻ Làm lại bài test
        </button>
      </div>
    </div>
  );
}
