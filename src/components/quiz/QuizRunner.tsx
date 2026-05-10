"use client";
import { useState, useMemo, useEffect } from "react";
import type { QuizConfig, QuizQuestion, QuizArchetype } from "@/lib/quiz/types";
import { computeLeadershipResult, computeMBTIResult } from "@/lib/quiz/compute";
import QuizResult from "./QuizResult";
import LeadCaptureGate from "./LeadCaptureGate";

type Props = {
  config: QuizConfig;
  questions: QuizQuestion[];
  archetypes: QuizArchetype[];
};

type Phase = "intro" | "running" | "gate" | "result";

export default function QuizRunner({ config, questions, archetypes }: Props) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIdx];
  const progress = totalQuestions > 0 ? ((currentIdx + (phase === "result" || phase === "gate" ? 1 : 0)) / totalQuestions) * 100 : 0;

  const result = useMemo(() => {
    if (Object.keys(answers).length === 0) return null;
    if (config.scoringType === "leadership") {
      const r = computeLeadershipResult(answers);
      const archetype = archetypes.find((a) => a.id === r.topId);
      return { archetype, scores: r.scores, ranked: r.ranked };
    } else {
      const r = computeMBTIResult(answers);
      const archetype = archetypes.find((a) => a.id === r.type);
      return { archetype, scores: r.scores, dichotomies: r.dichotomies, type: r.type };
    }
  }, [answers, archetypes, config.scoringType]);

  function handleStart() {
    setPhase("running");
    setCurrentIdx(0);
    setAnswers({});
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleAnswer(optionKey: string) {
    const newAnswers = { ...answers, [currentQuestion.id]: optionKey };
    setAnswers(newAnswers);

    if (currentIdx < totalQuestions - 1) {
      // Smooth transition delay
      setTimeout(() => {
        setCurrentIdx(currentIdx + 1);
        if (typeof window !== "undefined") {
          const el = document.getElementById("quiz-question-card");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 220);
    } else {
      // Last question — go to gate or result
      setTimeout(() => {
        setPhase(config.gateResult ? "gate" : "result");
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 300);
    }
  }

  function handleBack() {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  }

  function handleGateComplete() {
    setPhase("result");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleRetake() {
    setPhase("intro");
    setCurrentIdx(0);
    setAnswers({});
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="relative">
      {/* Progress bar — only during running */}
      {phase === "running" && (
        <div className="sticky top-[80px] z-40 mb-6 -mx-4">
          <div className="rounded-full overflow-hidden h-1.5" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div
              className="h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${config.color}, #7a3dff)` }}
            />
          </div>
          <div className="text-center mt-2 text-[0.78rem]" style={{ color: "var(--ink-mute)" }}>
            Câu {currentIdx + 1} / {totalQuestions}
          </div>
        </div>
      )}

      {phase === "intro" && (
        <IntroScreen config={config} onStart={handleStart} />
      )}

      {phase === "running" && currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          questionIndex={currentIdx}
          totalQuestions={totalQuestions}
          selectedKey={answers[currentQuestion.id]}
          onAnswer={handleAnswer}
          onBack={currentIdx > 0 ? handleBack : undefined}
          color={config.color}
        />
      )}

      {phase === "gate" && result && (
        <LeadCaptureGate
          config={config}
          result={result}
          onComplete={handleGateComplete}
        />
      )}

      {phase === "result" && result && result.archetype && (
        <QuizResult
          config={config}
          result={result as any}
          onRetake={handleRetake}
        />
      )}

      {phase === "result" && result && !result.archetype && (
        <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(255,90,114,0.08)", border: "1px solid rgba(255,90,114,0.3)" }}>
          <div className="text-[1.1rem] font-bold text-white mb-2">Có lỗi khi tính kết quả</div>
          <p className="text-[0.9rem]" style={{ color: "var(--ink-mute)" }}>Vui lòng làm lại bài test.</p>
          <button onClick={handleRetake} className="btn btn-primary mt-4">Làm lại →</button>
        </div>
      )}
    </div>
  );
}

/* ─── Intro screen ─── */
function IntroScreen({ config, onStart }: { config: QuizConfig; onStart: () => void }) {
  return (
    <div className="rounded-2xl p-8 md:p-12 text-center max-w-[820px] mx-auto" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
      <div className="text-[3.5rem] mb-4">{config.emoji}</div>
      <h1 className="t-h2 leading-tight text-white mb-4">{config.name}</h1>
      <p className="text-[1rem] leading-[1.7] max-w-[640px] mx-auto mb-8" style={{ color: "var(--ink-soft)" }}>
        {config.longDescription}
      </p>

      <div className="grid grid-cols-3 gap-4 max-w-[480px] mx-auto mb-8">
        <div className="rounded-xl py-3 px-4" style={{ background: "rgba(255,255,255,0.03)" }}>
          <div className="text-[0.66rem] font-bold uppercase tracking-[0.13em]" style={{ color: "rgba(255,255,255,0.45)" }}>Số câu</div>
          <div className="text-[1.4rem] font-bold mt-1" style={{ color: config.color }}>{config.questionCount}</div>
        </div>
        <div className="rounded-xl py-3 px-4" style={{ background: "rgba(255,255,255,0.03)" }}>
          <div className="text-[0.66rem] font-bold uppercase tracking-[0.13em]" style={{ color: "rgba(255,255,255,0.45)" }}>Thời gian</div>
          <div className="text-[1.4rem] font-bold mt-1" style={{ color: config.color }}>~{config.estimatedMinutes}p</div>
        </div>
        <div className="rounded-xl py-3 px-4" style={{ background: "rgba(255,255,255,0.03)" }}>
          <div className="text-[0.66rem] font-bold uppercase tracking-[0.13em]" style={{ color: "rgba(255,255,255,0.45)" }}>Phí</div>
          <div className="text-[1.4rem] font-bold mt-1" style={{ color: "#5fffaa" }}>Free</div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="inline-flex items-center gap-2 text-white font-bold text-[1rem] px-8 py-3.5 rounded-xl transition-transform hover:scale-[1.03]"
        style={{ background: `linear-gradient(135deg, ${config.color} 0%, #7a3dff 100%)`, boxShadow: `0 8px 24px ${config.color}40` }}
      >
        Bắt đầu test ngay <span>→</span>
      </button>

      <p className="text-[0.78rem] mt-6" style={{ color: "rgba(255,255,255,0.4)" }}>
        Không cần đăng ký · Kết quả ngay sau khi hoàn thành
        {config.gateResult && " · Cần email/sđt để nhận kết quả chi tiết"}
      </p>
    </div>
  );
}

/* ─── Question card ─── */
function QuestionCard({
  question, questionIndex, totalQuestions, selectedKey, onAnswer, onBack, color,
}: {
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  selectedKey: string | undefined;
  onAnswer: (key: string) => void;
  onBack?: () => void;
  color: string;
}) {
  const [animKey, setAnimKey] = useState(question.id);
  useEffect(() => {
    setAnimKey(question.id);
  }, [question.id]);

  return (
    <div id="quiz-question-card" className="max-w-[820px] mx-auto">
      <div
        key={animKey}
        className="rounded-2xl p-6 md:p-10 quiz-card-enter"
        style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}
      >
        <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color }}>
          Câu {questionIndex + 1} / {totalQuestions}
        </div>
        <h2 className="text-[1.25rem] md:text-[1.5rem] font-bold leading-snug text-white mb-7">
          {question.text}
        </h2>

        <div className="flex flex-col gap-3">
          {question.options.map((opt, i) => {
            const isSelected = selectedKey === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => onAnswer(opt.key)}
                className="text-left rounded-xl px-4 md:px-5 py-3.5 md:py-4 transition-all hover:scale-[1.01]"
                style={{
                  background: isSelected ? `${color}28` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isSelected ? color : "rgba(255,255,255,0.08)"}`,
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                }}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <span
                    className="w-7 h-7 md:w-8 md:h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[0.85rem] font-bold transition-colors"
                    style={{
                      background: isSelected ? color : "rgba(255,255,255,0.06)",
                      color: isSelected ? "white" : "rgba(255,255,255,0.7)",
                      border: isSelected ? "none" : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {opt.key}
                  </span>
                  <span className="text-[0.92rem] md:text-[0.96rem] leading-[1.55] flex-1 pt-0.5" style={{ color: isSelected ? "white" : "rgba(255,255,255,0.85)" }}>
                    {opt.text}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {onBack && (
          <div className="mt-7 pt-5 border-t" style={{ borderColor: "var(--line)" }}>
            <button
              onClick={onBack}
              className="text-[0.85rem] font-semibold transition-colors hover:text-white"
              style={{ color: "var(--ink-mute)" }}
            >
              ← Câu trước
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .quiz-card-enter {
          animation: quizFadeIn 320ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @keyframes quizFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
