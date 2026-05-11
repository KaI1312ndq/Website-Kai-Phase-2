"use client";
import { useEffect, useState } from "react";

/**
 * Trạng thái khoá học thay cho Countdown ticker.
 *
 * Logic dự kiến tháng khai giảng:
 *   - Hardcoded TARGET_MONTH (vd "2026-07")
 *   - Nếu tháng hiện tại đã qua TARGET_MONTH  tự đẩy sang tháng kế tiếp
 *   - Nếu tháng hiện tại == TARGET_MONTH  vẫn show TARGET_MONTH
 *
 * Sửa TARGET_MONTH để cập nhật mục tiêu khai giảng.
 */
const TARGET_MONTH = "2026-07"; // YYYY-MM - khoá 1 dự kiến

function viMonthLabel(d: Date) {
  return `T${d.getMonth() + 1}/${d.getFullYear()}`;
}

function effectiveStartMonth() {
  const [y, m] = TARGET_MONTH.split("-").map(Number);
  const target = new Date(y, m - 1, 1);
  const now = new Date();
  // Nếu tháng hiện tại đã qua TARGET  đẩy sang tháng kế tiếp
  if (now.getFullYear() > target.getFullYear() || (now.getFullYear() === target.getFullYear() && now.getMonth() > target.getMonth())) {
    return new Date(now.getFullYear(), now.getMonth() + 1, 1);
  }
  return target;
}

export default function CohortStatus({ variant = "default" }: { variant?: "default" | "compact" | "inline" }) {
  const [month, setMonth] = useState<string>("");
  const [nextMonth, setNextMonth] = useState<string>("");

  useEffect(() => {
    const m = effectiveStartMonth();
    setMonth(viMonthLabel(m));
    const next = new Date(m.getFullYear(), m.getMonth() + 1, 1);
    setNextMonth(viMonthLabel(next));
  }, []);

  if (variant === "inline") {
    return (
      <span className="inline-flex items-center gap-2 text-[0.78rem]" style={{ color: "rgba(255,255,255,0.7)" }}>
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#5fffaa" }} />
        Đang nhận application · khai giảng dự kiến <strong className="text-white">{month || "T7/2026"}</strong>
      </span>
    );
  }

  if (variant === "compact") {
    return (
      <div className="rounded-lg p-3 flex items-center gap-3" style={{ background: "rgba(0,215,34,0.08)", border: "1px solid rgba(0,215,34,0.22)" }}>
        <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: "#5fffaa" }} />
        <div className="flex-1 min-w-0">
          <div className="text-[0.62rem] font-bold uppercase tracking-[0.14em]" style={{ color: "#5fffaa" }}>Đang nhận application</div>
          <div className="text-[0.78rem] mt-0.5" style={{ color: "rgba(255,255,255,0.78)" }}>
            Khai giảng <strong className="text-white">{month || "T7/2026"}</strong> · 7–10 PM ngoài giờ hành chính
          </div>
        </div>
      </div>
    );
  }

  // default - full status card
  return (
    <div className="rounded-xl p-4 md:p-5" style={{ background: "rgba(20,40,90,0.45)", border: "1px solid rgba(74,214,255,0.25)" }}>
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#5fffaa" }} />
        <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em]" style={{ color: "#5fffaa" }}>Đang nhận application · Khoá 1</span>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <span className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: "rgba(20,110,245,0.12)", border: "1px solid rgba(20,110,245,0.2)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7da9ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
          </span>
          <div>
            <div className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] mb-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Lịch học</div>
            <div className="text-[0.88rem] font-semibold text-white">7 – 10 PM · ngoài giờ hành chính</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: "rgba(74,214,255,0.12)", border: "1px solid rgba(74,214,255,0.25)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ad6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </span>
          <div>
            <div className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] mb-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Khai giảng</div>
            <div className="text-[0.88rem] font-semibold text-white">
              Dự kiến <span className="grad-text">{month || "T7/2026"}</span>
            </div>
            <div className="text-[0.74rem] mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
              Đủ 5 học viên sẽ đóng nhận đơn
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: "rgba(122,61,255,0.12)", border: "1px solid rgba(122,61,255,0.25)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </span>
          <div>
            <div className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] mb-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Khoá tiếp theo</div>
            <div className="text-[0.88rem] font-semibold text-white">
              {nextMonth || "T8/2026"} <span className="font-normal" style={{ color: "rgba(255,255,255,0.55)" }}>(đợt sau hàng tháng)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
