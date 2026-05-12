"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import type { QuizConfig, KnowledgeQuestion } from "@/lib/quiz/types";
import { trackEvent } from "@/lib/track";
import Icon, { type IconName } from "@/components/icons/Icon";
import KnowledgeQuizResult from "./KnowledgeQuizResult";

const STORAGE_KEY = (slug: string) => `knowledgequiz:progress:${slug}`;

type AnswerRecord = {
  picked: number; // -1 = timeout, 0..3 = chosen index
  timedOut: boolean;
  correct: boolean;
};

type Phase = "intro" | "running" | "result";

const COLORS = {
  correct: "#5fffaa",
  wrong: "#ff5a72",
  streak: "#ffd479",
  timerNormal: "#7da9ff",
  timerWarn: "#ffd479",
  timerDanger: "#ff5a72",
};

export default function KnowledgeQuizRunner({
  config,
  questions,
}: {
  config: QuizConfig;
  questions: KnowledgeQuestion[];
}) {
  const SECONDS_PER_Q = config.secondsPerQuestion ?? 30;
  const total = questions.length;

  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerRecord>>({});
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_Q);
  const [pickedThisQ, setPickedThisQ] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const advanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQ = questions[currentIdx];
  const correctCount = Object.values(answers).filter((a) => a.correct).length;
  const wrongCount = Object.values(answers).filter((a) => !a.correct).length;

  // Restore from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY(config.slug));
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data?.phase === "running" && data?.answers && Object.keys(data.answers).length > 0) {
        // Just show resume option in intro - don't auto-restore
      }
    } catch {}
  }, [config.slug]);

  // Persist progress
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (phase === "running") {
      try {
        window.localStorage.setItem(
          STORAGE_KEY(config.slug),
          JSON.stringify({ answers, currentIdx, phase, streak, bestStreak, savedAt: Date.now() })
        );
      } catch {}
    } else if (phase === "result") {
      try { window.localStorage.removeItem(STORAGE_KEY(config.slug)); } catch {}
    }
  }, [answers, currentIdx, phase, streak, bestStreak, config.slug]);

  // Timer countdown
  useEffect(() => {
    if (phase !== "running") return;
    if (pickedThisQ !== null) return; // stop when answered
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, pickedThisQ, phase]);

  // Exit guards (close tab, refresh, browser back button, in-app navigation)
  useEffect(() => {
    if (phase !== "running") return;

    // Guard 1: Close tab / refresh / external navigation
    const beforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", beforeUnload);

    // Guard 2: Browser back/forward button (popstate)
    // Push a sentinel state - when user clicks back, popstate fires.
    // Show confirm dialog. If they cancel, push state back to lock them in.
    window.history.pushState({ quizGuard: true }, "", window.location.href);

    const onPopState = () => {
      const ok = window.confirm(
        "Bạn đang làm dở bài test. Rời trang sẽ mất tiến độ câu hiện tại. Bạn có chắc muốn thoát?"
      );
      if (!ok) {
        // Re-push to keep them on page
        window.history.pushState({ quizGuard: true }, "", window.location.href);
      } else {
        // Allow exit - let next back navigation through
        window.removeEventListener("popstate", onPopState);
        window.history.back();
      }
    };
    window.addEventListener("popstate", onPopState);

    // Guard 3: Click on internal links - intercept and confirm
    const onLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a") as HTMLAnchorElement | null;
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;
      // Only guard internal nav, allow same-anchor # links
      if (href.startsWith("#") || target.target === "_blank") return;
      // Allow if the href is the current path (no actual nav)
      if (href === window.location.pathname) return;
      const ok = window.confirm(
        "Rời khỏi trang sẽ mất tiến độ bài test. Bạn có chắc?"
      );
      if (!ok) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener("click", onLinkClick, true);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("click", onLinkClick, true);
    };
  }, [phase]);

  // Cleanup advance timer
  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  function handleStart() {
    setPhase("running");
    setCurrentIdx(0);
    setAnswers({});
    setTimeLeft(SECONDS_PER_Q);
    setPickedThisQ(null);
    setStreak(0);
    setBestStreak(0);
    trackEvent("quiz_started", { quiz_slug: config.slug, quiz_name: config.name, format: "knowledge" });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePick(idx: number) {
    if (pickedThisQ !== null) return;
    const isCorrect = idx === currentQ.ans;
    setPickedThisQ(idx);
    setAnswers((a) => ({
      ...a,
      [currentQ.id]: { picked: idx, timedOut: false, correct: isCorrect },
    }));
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
    } else {
      setStreak(0);
    }
    advanceTimerRef.current = setTimeout(() => goNext(), isCorrect ? 1500 : 3000);
  }

  function handleTimeout() {
    setPickedThisQ(-1);
    setAnswers((a) => ({
      ...a,
      [currentQ.id]: { picked: -1, timedOut: true, correct: false },
    }));
    setStreak(0);
    advanceTimerRef.current = setTimeout(() => goNext(), 2500);
  }

  function handleSkipWait() {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    goNext();
  }

  function goNext() {
    if (currentIdx >= total - 1) {
      // Done
      const finalCorrect = Object.values({
        ...answers,
        [currentQ.id]: answers[currentQ.id] || { picked: -1, timedOut: true, correct: false },
      }).filter((a) => a.correct).length;
      trackEvent("quiz_completed", {
        quiz_slug: config.slug,
        format: "knowledge",
        score: finalCorrect,
        total,
        percent: Math.round((finalCorrect / total) * 100),
      });
      setPhase("result");
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCurrentIdx((i) => i + 1);
      setPickedThisQ(null);
      setTimeLeft(SECONDS_PER_Q);
    }
  }

  function handleRetake() {
    setPhase("intro");
    setCurrentIdx(0);
    setAnswers({});
    setStreak(0);
    setBestStreak(0);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── INTRO ──
  if (phase === "intro") {
    return <IntroScreen config={config} totalQuestions={total} secondsPerQ={SECONDS_PER_Q} onStart={handleStart} />;
  }

  // ── RESULT ──
  if (phase === "result") {
    return (
      <KnowledgeQuizResult
        config={config}
        questions={questions}
        answers={answers}
        bestStreak={bestStreak}
        onRetake={handleRetake}
      />
    );
  }

  // ── RUNNING ──
  return (
    <div className="max-w-[820px] mx-auto">
      {/* Top bar */}
      <TopBar
        currentIdx={currentIdx}
        total={total}
        timeLeft={timeLeft}
        secondsPerQ={SECONDS_PER_Q}
        correctCount={correctCount}
        wrongCount={wrongCount}
        streak={streak}
      />

      {/* Question card */}
      <QuestionCard
        question={currentQ}
        questionNumber={currentIdx + 1}
        total={total}
        pickedThisQ={pickedThisQ}
        onPick={handlePick}
        color={config.color}
        onSkipWait={pickedThisQ !== null ? handleSkipWait : undefined}
      />

      {/* Anti-cheat banner */}
      <div className="mt-5 rounded-lg px-4 py-2.5 text-[0.78rem] flex items-center gap-2" style={{ background: "rgba(255,212,121,0.08)", border: "1px solid rgba(255,212,121,0.25)", color: "var(--st-70)" }}>
        <Icon name="info" size={14} color="#ffd479" />
        <span>Bài đang chấm điểm - tránh đóng tab hoặc rời trang giữa chừng. Tiến độ tự động lưu.</span>
      </div>
    </div>
  );
}

/* ─── Intro Screen ─── */
function IntroScreen({
  config,
  totalQuestions,
  secondsPerQ,
  onStart,
}: {
  config: QuizConfig;
  totalQuestions: number;
  secondsPerQ: number;
  onStart: () => void;
}) {
  return (
    <div className="max-w-[820px] mx-auto rounded-2xl p-8 md:p-12 text-center" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
      <div
        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-5"
        style={{ background: `${config.color}18`, border: `1px solid ${config.color}55`, color: config.color }}
      >
        <Icon name={config.iconName as IconName} size={40} strokeWidth={1.8} />
      </div>
      <h1 className="t-h2 leading-tight text-white mb-4">{config.name}</h1>
      <p className="text-[1rem] leading-[1.7] max-w-[680px] mx-auto mb-7" style={{ color: "var(--ink-soft)" }}>
        {config.longDescription}
      </p>

      <div className="grid grid-cols-3 gap-3 max-w-[520px] mx-auto mb-7">
        <Stat label="Số câu" value={`${totalQuestions}`} color={config.color} />
        <Stat label="Mỗi câu" value={`${secondsPerQ}s`} color={config.color} />
        <Stat label="Tổng" value={`~${Math.ceil((totalQuestions * secondsPerQ) / 60)}p`} color={config.color} />
      </div>

      <div className="text-left max-w-[600px] mx-auto rounded-xl p-5 mb-7" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--st-08)" }}>
        <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3 text-center" style={{ color: config.color }}>
          Quy tắc bài test
        </div>
        <ul className="flex flex-col gap-2 text-[0.88rem]" style={{ color: "var(--st-85)" }}>
          <li className="flex items-start gap-2"><Icon name="clock" size={14} color={config.color} /><span>Mỗi câu có {secondsPerQ} giây để chọn - hết giờ tự đánh sai</span></li>
          <li className="flex items-start gap-2"><Icon name="check" size={14} color="#5fffaa" /><span>Sau khi chọn: hiện đáp án đúng + giải thích, tự chuyển câu</span></li>
          <li className="flex items-start gap-2"><Icon name="alert-triangle" size={14} color="#ffd479" /><span>Đã chọn rồi không sửa được - chọn cẩn thận</span></li>
          <li className="flex items-start gap-2"><Icon name="trophy" size={14} color="#ffd479" /><span>Cuối bài có tier Vàng (≥80%), Bạc (≥50%), Đồng</span></li>
        </ul>
      </div>

      <button
        onClick={onStart}
        className="inline-flex items-center gap-2 text-white font-bold text-[1rem] px-8 py-3.5 rounded-xl transition-transform hover:scale-[1.03]"
        style={{ background: `linear-gradient(135deg, ${config.color} 0%, #7a3dff 100%)`, boxShadow: `0 8px 24px ${config.color}40` }}
      >
        Bắt đầu test ngay <Icon name="arrow-right" size={18} />
      </button>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl py-3 px-3" style={{ background: "var(--st-04)" }}>
      <div className="text-[0.66rem] font-bold uppercase tracking-[0.13em]" style={{ color: "var(--st-45)" }}>{label}</div>
      <div className="text-[1.4rem] font-bold mt-1" style={{ color }}>{value}</div>
    </div>
  );
}

/* ─── Top Bar (progress + timer + stats) ─── */
function TopBar({
  currentIdx, total, timeLeft, secondsPerQ, correctCount, wrongCount, streak,
}: {
  currentIdx: number;
  total: number;
  timeLeft: number;
  secondsPerQ: number;
  correctCount: number;
  wrongCount: number;
  streak: number;
}) {
  const progress = ((currentIdx) / total) * 100;
  const timerColor = timeLeft <= 5 ? COLORS.timerDanger : timeLeft <= 10 ? COLORS.timerWarn : COLORS.timerNormal;
  const timerProgress = (timeLeft / secondsPerQ) * 100;

  return (
    <div className="sticky top-[80px] z-40 mb-6 rounded-2xl p-4 backdrop-blur-md" style={{ background: "rgba(8,16,43,0.80)", border: "1px solid var(--st-10)" }}>
      {/* Progress bar */}
      <div className="rounded-full overflow-hidden h-1.5 mb-3" style={{ background: "var(--st-06)" }}>
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${progress}%`, background: "linear-gradient(90deg, #22d3ee, #7a3dff)" }}
        />
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Question counter */}
        <div className="text-[0.85rem] font-semibold" style={{ color: "var(--ink-soft)" }}>
          Câu <strong className="text-white">{currentIdx + 1}</strong> / {total}
        </div>

        {/* Timer ring */}
        <div className="relative flex items-center gap-2">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="var(--st-08)" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15" fill="none"
                stroke={timerColor} strokeWidth="3" strokeLinecap="round"
                strokeDasharray={`${(timerProgress / 100) * 94.25} 94.25`}
                style={{ transition: "stroke-dasharray 1s linear, stroke 0.3s" }}
              />
            </svg>
            <span className="text-[0.85rem] font-bold tabular-nums" style={{ color: timerColor, animation: timeLeft <= 5 ? "qz-pulse 0.6s alternate infinite" : "none" }}>
              {timeLeft}
            </span>
          </div>
        </div>

        {/* Stats chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <Chip icon="check" color={COLORS.correct} value={correctCount} label="Đúng" />
          <Chip icon="x-circle" color={COLORS.wrong} value={wrongCount} label="Sai" />
          {streak >= 2 && (
            <Chip icon="fire" color={COLORS.streak} value={streak} label="Streak" glow />
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes qz-pulse {
          from { transform: scale(1); }
          to { transform: scale(1.12); }
        }
      `}</style>
    </div>
  );
}

function Chip({
  icon, color, value, label, glow,
}: {
  icon: IconName;
  color: string;
  value: number;
  label: string;
  glow?: boolean;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[0.78rem] font-bold px-2.5 py-1.5 rounded-lg"
      style={{
        background: `${color}15`,
        border: `1px solid ${color}40`,
        color,
        boxShadow: glow ? `0 0 14px ${color}55` : undefined,
      }}
    >
      <Icon name={icon} size={13} />
      <span className="tabular-nums">{value}</span>
      <span className="hidden sm:inline opacity-70 font-semibold">· {label}</span>
    </span>
  );
}

/* ─── Question Card ─── */
function QuestionCard({
  question, questionNumber, total, pickedThisQ, onPick, color, onSkipWait,
}: {
  question: KnowledgeQuestion;
  questionNumber: number;
  total: number;
  pickedThisQ: number | null;
  onPick: (idx: number) => void;
  color: string;
  onSkipWait?: () => void;
}) {
  const hasPicked = pickedThisQ !== null;
  const timedOut = pickedThisQ === -1;

  return (
    <div key={question.id} className="rounded-2xl p-6 md:p-8 quiz-card-enter" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color }}>
        Câu {questionNumber} / {total}
      </div>
      <h2 className="text-[1.15rem] md:text-[1.3rem] font-bold leading-snug text-white mb-6">
        {question.q}
      </h2>

      <div className="flex flex-col gap-2.5">
        {question.opts.map((opt, idx) => {
          const isCorrect = idx === question.ans;
          const isPicked = idx === pickedThisQ;
          const showAsCorrect = hasPicked && isCorrect;
          const showAsWrong = hasPicked && isPicked && !isCorrect;

          let bg = "var(--st-03)";
          let border = "var(--st-08)";
          let textColor = "var(--st-85)";
          let badgeBg = "var(--st-06)";
          let badgeColor = "var(--st-70)";
          let icon = null;

          if (showAsCorrect) {
            bg = "rgba(95,255,170,0.10)";
            border = COLORS.correct;
            textColor = "white";
            badgeBg = COLORS.correct;
            badgeColor = "#0a1438";
            icon = <Icon name="check" size={16} color={COLORS.correct} strokeWidth={3} />;
          } else if (showAsWrong) {
            bg = "rgba(255,90,114,0.10)";
            border = COLORS.wrong;
            textColor = "white";
            badgeBg = COLORS.wrong;
            badgeColor = "white";
            icon = <Icon name="x-circle" size={16} color={COLORS.wrong} />;
          }

          const animClass = showAsCorrect ? "qz-pop" : showAsWrong ? "qz-shake" : "";

          return (
            <button
              key={idx}
              onClick={() => onPick(idx)}
              disabled={hasPicked}
              className={`text-left rounded-xl px-4 md:px-5 py-3.5 md:py-4 transition-all ${animClass} ${hasPicked ? "cursor-default" : "hover:translate-x-[3px]"}`}
              style={{ background: bg, border: `1.5px solid ${border}` }}
            >
              <div className="flex items-start gap-3 md:gap-4">
                <span
                  className="w-7 h-7 md:w-8 md:h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[0.85rem] font-bold transition-all"
                  style={{ background: badgeBg, color: badgeColor }}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-[0.92rem] md:text-[0.96rem] leading-[1.55] flex-1 pt-0.5" style={{ color: textColor }}>
                  {opt}
                </span>
                {icon && <span className="flex-shrink-0 mt-1">{icon}</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback banner */}
      {hasPicked && (
        <div
          className="mt-5 rounded-xl px-5 py-4"
          style={{
            background: timedOut
              ? "rgba(255,212,121,0.08)"
              : pickedThisQ === question.ans
                ? "rgba(95,255,170,0.08)"
                : "rgba(255,90,114,0.08)",
            border: `1px solid ${timedOut ? "rgba(255,212,121,0.3)" : pickedThisQ === question.ans ? "rgba(95,255,170,0.3)" : "rgba(255,90,114,0.3)"}`,
          }}
        >
          <div className="flex items-start gap-2.5">
            <Icon
              name={timedOut ? "clock" : pickedThisQ === question.ans ? "check" : "x-circle"}
              size={16}
              color={timedOut ? "#ffd479" : pickedThisQ === question.ans ? COLORS.correct : COLORS.wrong}
            />
            <div className="flex-1">
              <div className="text-[0.85rem] font-bold mb-1" style={{ color: timedOut ? "#ffd479" : pickedThisQ === question.ans ? COLORS.correct : COLORS.wrong }}>
                {timedOut ? "Hết giờ" : pickedThisQ === question.ans ? "Chính xác!" : "Sai rồi"}
                {!timedOut && pickedThisQ !== question.ans && (
                  <span className="font-normal" style={{ color: "var(--st-70)" }}> - đáp án đúng là <strong style={{ color: COLORS.correct }}>{String.fromCharCode(65 + question.ans)}</strong></span>
                )}
              </div>
              <div className="text-[0.88rem] leading-[1.6]" style={{ color: "var(--st-85)" }}>
                {question.explain}
              </div>
            </div>
          </div>
          {onSkipWait && (
            <div className="mt-3 flex justify-end">
              <button
                onClick={onSkipWait}
                className="text-[0.78rem] font-semibold px-3 py-1.5 rounded-md transition-all"
                style={{ background: "var(--st-05)", border: "1px solid var(--st-10)", color: "var(--st-85)" }}
              >
                Bỏ qua chờ <Icon name="arrow-right" size={12} />
              </button>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .quiz-card-enter {
          animation: qz-card-in 320ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @keyframes qz-card-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .qz-pop {
          animation: qz-pop-anim 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @keyframes qz-pop-anim {
          0% { transform: scale(1); }
          50% { transform: scale(1.025); }
          100% { transform: scale(1); }
        }
        .qz-shake {
          animation: qz-shake-anim 0.4s ease-in-out;
        }
        @keyframes qz-shake-anim {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-7px); }
          75% { transform: translateX(7px); }
        }
      `}</style>
    </div>
  );
}
