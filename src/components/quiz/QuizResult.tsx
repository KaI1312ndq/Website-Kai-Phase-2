"use client";
import Link from "next/link";
import type { QuizConfig, QuizArchetype } from "@/lib/quiz/types";
import ShareButtons from "@/components/blog/ShareButtons";

type Props = {
  config: QuizConfig;
  result: {
    archetype: QuizArchetype;
    scores: Record<string, number>;
    ranked?: Array<{ id: string; score: number }>;
    dichotomies?: Array<{ a: string; b: string; aScore: number; bScore: number; aPct: number }>;
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
  const { archetype } = result;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = `Tôi vừa làm "${config.name}" — kết quả: ${archetype.name}!`;

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
          Kết quả của bạn
        </div>
        <h1 className="text-[2rem] md:text-[2.6rem] font-extrabold leading-tight tracking-tight text-white mb-3">
          {archetype.name}
        </h1>
        <p className="text-[0.95rem] md:text-[1.05rem] font-semibold mb-2" style={{ color: archetype.color }}>
          {archetype.tagline}
        </p>
      </div>

      {/* MBTI dichotomy bars */}
      {result.dichotomies && (
        <div className="mt-6 rounded-2xl p-6 md:p-8" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
          <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>
            Phân tích 4 chiều
          </div>
          <div className="flex flex-col gap-5">
            {result.dichotomies.map((d) => {
              const aSelected = d.aPct >= 50;
              return (
                <div key={d.a + d.b}>
                  <div className="flex items-center justify-between text-[0.85rem] mb-2">
                    <span className={aSelected ? "font-bold text-white" : ""} style={{ color: aSelected ? "white" : "rgba(255,255,255,0.5)" }}>
                      {d.a} · {DICH_LABELS[d.a]}
                    </span>
                    <span className={!aSelected ? "font-bold text-white" : ""} style={{ color: !aSelected ? "white" : "rgba(255,255,255,0.5)" }}>
                      {DICH_LABELS[d.b]} · {d.b}
                    </span>
                  </div>
                  <div className="h-2 rounded-full relative overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div
                      className="absolute top-0 left-0 h-full transition-all duration-500"
                      style={{ width: `${d.aPct}%`, background: aSelected ? archetype.color : "rgba(255,255,255,0.3)" }}
                    />
                    <div
                      className="absolute top-0 right-0 h-full transition-all duration-500"
                      style={{ width: `${100 - d.aPct}%`, background: !aSelected ? archetype.color : "rgba(255,255,255,0.3)" }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[0.7rem] mt-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
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
      <div className="mt-6 rounded-2xl p-6 md:p-8" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
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
          <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: "#5fffaa" }}>
            ✓ Điểm mạnh
          </div>
          <ul className="flex flex-col gap-2 list-none">
            {archetype.strengths.map((s) => (
              <li key={s} className="text-[0.9rem] flex items-start gap-2" style={{ color: "rgba(255,255,255,0.9)" }}>
                <span style={{ color: "#5fffaa" }}>•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl p-6" style={{ background: "rgba(255,212,121,0.05)", border: "1px solid rgba(255,212,121,0.22)" }}>
          <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: "#ffd479" }}>
            ⚠ Cần lưu ý
          </div>
          <ul className="flex flex-col gap-2 list-none">
            {archetype.weaknesses.map((s) => (
              <li key={s} className="text-[0.9rem] flex items-start gap-2" style={{ color: "rgba(255,255,255,0.9)" }}>
                <span style={{ color: "#ffd479" }}>•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Context */}
      <div className="mt-6 rounded-2xl p-6 md:p-8" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
        <h2 className="text-[1.1rem] font-bold text-white mb-4">
          {config.scoringType === "leadership" ? "Phù hợp nhất với" : "Công việc phù hợp"}
        </h2>
        <div className="flex flex-wrap gap-2">
          {archetype.context.map((c) => (
            <span key={c} className="text-[0.85rem] px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.85)" }}>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Advice */}
      {archetype.advice && archetype.advice.length > 0 && (
        <div className="mt-6 rounded-2xl p-6 md:p-8" style={{ background: `${archetype.color}10`, border: `1px solid ${archetype.color}33` }}>
          <h2 className="text-[1.1rem] font-bold text-white mb-4">💡 Lời khuyên cân bằng</h2>
          <ul className="flex flex-col gap-2 list-none">
            {archetype.advice.map((a) => (
              <li key={a} className="text-[0.92rem] leading-[1.6] flex items-start gap-2.5" style={{ color: "var(--ink-soft)" }}>
                <span style={{ color: archetype.color }}>→</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Share */}
      <div className="mt-8">
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
        <p className="text-[0.92rem] leading-[1.6] mb-5" style={{ color: "rgba(255,255,255,0.75)" }}>
          Đọc thêm bài viết về Leadership, Career và phát triển bản thân trên blog của Quảng — chia sẻ thực tế từ kinh nghiệm 60+ project.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/blog" className="btn btn-primary">Xem blog →</Link>
          <Link href="/quiz" className="text-[0.88rem] font-semibold px-4 py-2.5 rounded-lg transition-all" style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}>
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
