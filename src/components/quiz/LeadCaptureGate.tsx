"use client";
import { useState } from "react";
import type { QuizConfig } from "@/lib/quiz/types";
import Icon from "@/components/icons/Icon";

type Props = {
  config: QuizConfig;
  result: any;
  onComplete: () => void;
};

export default function LeadCaptureGate({ config, result, onComplete }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Vui lòng nhập tên");
      return;
    }
    if (!email.trim() && !phone.trim()) {
      setError("Vui lòng nhập email hoặc số điện thoại");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/quiz-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizSlug: config.slug,
          quizName: config.name,
          resultType: result?.type || result?.archetype?.id,
          name,
          email: email.trim() || undefined,
          phone: phone.trim() || undefined,
          scores: result?.scores,
        }),
      });
      const data = await res.json();
      if (!res.ok && !data.ok) {
        setError(data.error || "Có lỗi, vui lòng thử lại");
      } else {
        onComplete();
      }
    } catch {
      setError("Lỗi kết nối, vui lòng thử lại");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-[640px] mx-auto rounded-2xl p-6 md:p-10" style={{ background: "var(--st-03)", border: "1px solid var(--line)" }}>
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
          style={{ background: `${config.color}18`, border: `1px solid ${config.color}55`, color: config.color }}
        >
          <Icon name="gift" size={32} strokeWidth={1.8} />
        </div>
        <h2 className="text-[1.5rem] md:text-[1.7rem] font-bold leading-tight text-white mb-3">
          Bài test đã hoàn thành!
        </h2>
        <p className="text-[0.95rem] leading-[1.7]" style={{ color: "var(--ink-soft)" }}>
          Để nhận <strong className="text-white">phân tích chi tiết tính cách</strong> của bạn - bao gồm điểm mạnh, điểm yếu, công việc phù hợp và cách phát triển - vui lòng để lại thông tin liên hệ.
        </p>
        <p className="text-[0.78rem] mt-3" style={{ color: "var(--st-45)" }}>
          Thông tin của bạn được bảo mật, không spam.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">
            Tên của bạn <span style={{ color: "#ff5a72" }}>*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg text-[0.95rem] outline-none"
            style={{ border: "1px solid var(--st-10)", background: "var(--st-03)", color: "var(--ink)" }}
            placeholder="Nguyễn Văn A"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-[0.95rem] outline-none"
              style={{ border: "1px solid var(--st-10)", background: "var(--st-03)", color: "var(--ink)" }}
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">
              Số điện thoại
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-[0.95rem] outline-none"
              style={{ border: "1px solid var(--st-10)", background: "var(--st-03)", color: "var(--ink)" }}
              placeholder="0xxx xxx xxx"
            />
          </div>
        </div>
        <div className="text-[0.75rem]" style={{ color: "var(--st-45)" }}>
          Cần ít nhất 1 trong 2: email hoặc số điện thoại.
        </div>

        {error && (
          <div className="rounded-lg px-4 py-2.5 text-[0.85rem]" style={{ background: "rgba(255,90,114,0.10)", border: "1px solid rgba(255,90,114,0.3)", color: "#ff5a72" }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 text-white font-bold text-[1rem] px-8 py-3.5 rounded-xl transition-transform hover:scale-[1.02] mt-2"
          style={{
            background: `linear-gradient(135deg, ${config.color} 0%, #7a3dff 100%)`,
            boxShadow: `0 8px 24px ${config.color}40`,
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? "Đang xử lý..." : <>Xem kết quả của tôi <span></span></>}
        </button>
      </form>
    </div>
  );
}
