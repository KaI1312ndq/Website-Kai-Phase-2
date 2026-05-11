"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import type { QuizConfig, QuizQuestion, QuizArchetype } from "@/lib/quiz/types";
import { computeLeadershipResult, computeMBTIResult, computeCareerResult } from "@/lib/quiz/compute";
import { trackEvent } from "@/lib/track";
import QuizResult from "./QuizResult";
import LeadCaptureGate from "./LeadCaptureGate";
import Icon, { type IconName } from "@/components/icons/Icon";

const STORAGE_KEY = (slug: string) => `quiz:progress:${slug}`;

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
  const [hasResumable, setHasResumable] = useState(false);
  const restoreCheckedRef = useRef(false);

  // Restore from localStorage on mount
  useEffect(() => {
    if (restoreCheckedRef.current) return;
    restoreCheckedRef.current = true;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY(config.slug));
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data && data.answers && Object.keys(data.answers).length > 0 && data.phase === "running") {
        setHasResumable(true);
      }
    } catch {}
  }, [config.slug]);

  // Persist progress
  useEffect(() => {
    if (phase !== "running" && phase !== "intro") return;
    try {
      if (phase === "running") {
        window.localStorage.setItem(STORAGE_KEY(config.slug), JSON.stringify({
          answers, currentIdx, phase, savedAt: Date.now(),
        }));
      }
    } catch {}
  }, [answers, currentIdx, phase, config.slug]);

  // Warn before leaving during quiz
  useEffect(() => {
    if (phase !== "running") return;
    const beforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [phase]);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIdx];
  const progress = totalQuestions > 0 ? ((currentIdx + (phase === "result" || phase === "gate" ? 1 : 0)) / totalQuestions) * 100 : 0;

  const result = useMemo(() => {
    if (Object.keys(answers).length === 0) return null;
    if (config.scoringType === "leadership") {
      const r = computeLeadershipResult(answers);
      const archetype = archetypes.find((a) => a.id === r.topId);
      // Secondary = next-highest archetype, only meaningful if it has score > 0 AND ≠ top
      const secondaryEntry = r.ranked.find((x) => x.id !== r.topId && x.score > 0);
      const secondary = secondaryEntry ? archetypes.find((a) => a.id === secondaryEntry.id) : undefined;
      const secondaryScore = secondaryEntry?.score;
      const topScore = r.ranked[0]?.score;
      return { archetype, secondary, secondaryScore, topScore, scores: r.scores, ranked: r.ranked, type: r.topId };
    } else if (config.scoringType === "career") {
      const r = computeCareerResult(answers);
      const archetype = archetypes.find((a) => a.id === r.topId);
      const secondaryEntry = r.ranked.find((x) => x.id !== r.topId && x.score > 0);
      const secondary = secondaryEntry ? archetypes.find((a) => a.id === secondaryEntry.id) : undefined;
      const secondaryScore = secondaryEntry?.score;
      const topScore = r.ranked[0]?.score;
      return { archetype, secondary, secondaryScore, topScore, scores: r.scores, ranked: r.ranked, type: r.topId };
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
    setHasResumable(false);
    try { window.localStorage.removeItem(STORAGE_KEY(config.slug)); } catch {}
    trackEvent("quiz_started", { quiz_slug: config.slug, quiz_name: config.name });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleResume() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY(config.slug));
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data && data.answers && typeof data.currentIdx === "number") {
        setAnswers(data.answers);
        setCurrentIdx(data.currentIdx);
        setPhase("running");
        setHasResumable(false);
        trackEvent("quiz_resumed", { quiz_slug: config.slug, from_question: data.currentIdx + 1 });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {}
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
      // Last question - clear progress, go to gate or result
      try { window.localStorage.removeItem(STORAGE_KEY(config.slug)); } catch {}
      trackEvent("quiz_completed", {
        quiz_slug: config.slug,
        quiz_name: config.name,
        gated: config.gateResult,
      });
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
    trackEvent("quiz_lead_captured", {
      quiz_slug: config.slug,
      quiz_name: config.name,
      result_type: result?.archetype?.id,
    });
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
      {/* Progress bar - only during running */}
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
        <IntroScreen config={config} onStart={handleStart} onResume={hasResumable ? handleResume : undefined} />
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
          <button onClick={handleRetake} className="btn btn-primary mt-4">Làm lại </button>
        </div>
      )}
    </div>
  );
}

/* ─── Intro screen ─── */
const QUIZ_BENEFITS: Record<string, string[]> = {
  "phong-cach-lanh-dao": [
    "Biết phong cách lãnh đạo tự nhiên của mình trong 6 phong cách kinh điển",
    "Hiểu điểm mạnh + điểm yếu của phong cách đó để phát triển hiệu quả",
    "Lời khuyên cụ thể khi nào nên dùng phong cách khác (linh hoạt theo bối cảnh)",
    "Career path + môi trường phù hợp với phong cách của bạn",
  ],
  "mbti": [
    "Kết quả 1 trong 16 kiểu tính cách MBTI chuẩn quốc tế",
    "Phân tích 4 chiều E/I, S/N, T/F, J/P theo % cụ thể",
    "Mô tả chi tiết: Bạn là ai, điểm mạnh, điểm yếu, lưu ý cá nhân",
    "Career options + lời khuyên phát triển dài hạn",
  ],
  "huong-nghiep-marketing": [
    "Xác định 1 trong 5 archetype career: Creator / Analyst / Communicator / Builder / Operator",
    "Danh sách 5-7 role cụ thể phù hợp + range lương tham khảo VN",
    "Skills cần học để vào nghề + lộ trình junior  senior",
    "Lời khuyên cá nhân hoá từ kinh nghiệm 60+ project Ecom",
  ],
};

function IntroScreen({ config, onStart, onResume }: { config: QuizConfig; onStart: () => void; onResume?: () => void }) {
  const benefits = QUIZ_BENEFITS[config.slug] || [];

  return (
    <div className="max-w-[820px] mx-auto">
      {/* Resume banner */}
      {onResume && (
        <div className="mb-6 rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap" style={{ background: "rgba(255,212,121,0.08)", border: "1px solid rgba(255,212,121,0.32)" }}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,212,121,0.15)", color: "#ffd479" }}>
              <Icon name="hourglass" size={20} />
            </div>
            <div>
              <div className="text-[0.95rem] font-bold text-white mb-1">Bạn đang làm dở bài này</div>
              <div className="text-[0.82rem]" style={{ color: "rgba(255,255,255,0.7)" }}>Tiếp tục từ chỗ đã dừng hay bắt đầu lại?</div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onResume}
              className="px-4 py-2 rounded-lg text-[0.85rem] font-bold text-white transition-all"
              style={{ background: "var(--grad-primary)" }}
            >
              Tiếp tục 
            </button>
            <button
              onClick={onStart}
              className="px-4 py-2 rounded-lg text-[0.85rem] font-semibold transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.85)" }}
            >
              Làm lại
            </button>
          </div>
        </div>
      )}

      <div className="rounded-2xl p-8 md:p-12 text-center" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
        <div
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-5"
          style={{ background: `${config.color}18`, border: `1px solid ${config.color}55`, color: config.color }}
        >
          <Icon name={config.iconName as IconName} size={40} strokeWidth={1.8} />
        </div>
        <h1 className="t-h2 leading-tight text-white mb-4">{config.name}</h1>
        <p className="text-[1rem] leading-[1.7] max-w-[680px] mx-auto mb-8" style={{ color: "var(--ink-soft)" }}>
          {config.longDescription}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 max-w-[520px] mx-auto mb-8">
          <div className="rounded-xl py-3 px-3" style={{ background: "rgba(255,255,255,0.04)" }}>
            <div className="text-[0.66rem] font-bold uppercase tracking-[0.13em]" style={{ color: "rgba(255,255,255,0.45)" }}>Số câu</div>
            <div className="text-[1.4rem] font-bold mt-1" style={{ color: config.color }}>{config.questionCount}</div>
          </div>
          <div className="rounded-xl py-3 px-3" style={{ background: "rgba(255,255,255,0.04)" }}>
            <div className="text-[0.66rem] font-bold uppercase tracking-[0.13em]" style={{ color: "rgba(255,255,255,0.45)" }}>Thời gian</div>
            <div className="text-[1.4rem] font-bold mt-1" style={{ color: config.color }}>~{config.estimatedMinutes}p</div>
          </div>
          <div className="rounded-xl py-3 px-3" style={{ background: "rgba(255,255,255,0.04)" }}>
            <div className="text-[0.66rem] font-bold uppercase tracking-[0.13em]" style={{ color: "rgba(255,255,255,0.45)" }}>Phí</div>
            <div className="text-[1.4rem] font-bold mt-1" style={{ color: "#5fffaa" }}>Free</div>
          </div>
        </div>

        {/* Benefits */}
        {benefits.length > 0 && (
          <div className="mb-8 text-left max-w-[600px] mx-auto rounded-xl p-5" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3 text-center" style={{ color: config.color }}>
              Bạn sẽ nhận được
            </div>
            <ul className="flex flex-col gap-2.5 list-none">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[0.9rem] leading-[1.55]" style={{ color: "rgba(255,255,255,0.85)" }}>
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ background: `${config.color}30`, color: config.color }}>
                    <Icon name="check" size={12} strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 text-white font-bold text-[1rem] px-8 py-3.5 rounded-xl transition-transform hover:scale-[1.03]"
          style={{ background: `linear-gradient(135deg, ${config.color} 0%, #7a3dff 100%)`, boxShadow: `0 8px 24px ${config.color}40` }}
        >
          Bắt đầu test ngay <span></span>
        </button>

        <p className="text-[0.78rem] mt-6 inline-flex items-center justify-center gap-1.5 flex-wrap" style={{ color: "rgba(255,255,255,0.4)" }}>
          <span>Không cần đăng ký · Kết quả ngay sau khi hoàn thành{config.gateResult && " · Cần email/sđt"}</span>
          <span className="hidden sm:inline">·</span>
          <span className="inline-flex items-center gap-1">
            <Icon name="zap" size={12} />
            Tiến độ tự động lưu, refresh không mất bài
          </span>
        </p>
      </div>
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
