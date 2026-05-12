"use client";
import { useEffect, useState } from "react";
import Icon from "@/components/icons/Icon";

type Props = {
  resourceId: string;
  resourceTitle: string;
  buttonLabel: string;
  buttonColor: string;
  /** If set, after successful submit user gets redirected to this URL (file download). Otherwise show thank-you state. */
  downloadUrl?: string;
};

export default function ResourceLeadGate({ resourceId, resourceTitle, buttonLabel, buttonColor, downloadUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.includes("@")) {
      setError("Vui lòng nhập tên và email hợp lệ");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      // Reuse quiz-leads endpoint with resource-<id> slug - Quảng filter trong Sanity Studio
      const res = await fetch("/api/quiz-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizSlug: `resource-${resourceId}`,
          quizName: `Resource: ${resourceTitle}`,
          resultType: resourceId,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          scores: {},
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Có lỗi xảy ra, thử lại sau");
        setSubmitting(false);
        return;
      }
      setDone(true);
      if (downloadUrl) {
        setTimeout(() => { window.open(downloadUrl, "_blank"); }, 600);
      }
    } catch {
      setError("Lỗi kết nối, vui lòng thử lại");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-[0.85rem] font-bold px-4 py-2.5 rounded-lg"
        style={{ background: `${buttonColor}15`, border: `1px solid ${buttonColor}50`, color: buttonColor }}
      >
        {buttonLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ background: "rgba(5,10,31,0.85)", backdropFilter: "blur(8px)" }} onClick={() => setOpen(false)}>
          <div className="rounded-2xl max-w-[440px] w-full p-7" style={{ background: "var(--db-95)", border: "1px solid var(--line)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-1" style={{ color: buttonColor }}>Tài liệu miễn phí</div>
                <h2 className="text-[1.15rem] font-bold text-white leading-tight">{resourceTitle}</h2>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--st-06)", color: "var(--st-70)" }} aria-label="Đóng">
                <Icon name="x" size={16} />
              </button>
            </div>

            {done ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(95,255,170,0.15)", color: "#5fffaa", border: "1px solid rgba(95,255,170,0.4)" }}>
                  <Icon name="check" size={26} strokeWidth={3} />
                </div>
                <h3 className="text-[1.05rem] font-bold text-white mb-2">Đã gửi rồi!</h3>
                <p className="text-[0.88rem] leading-snug" style={{ color: "var(--ink-soft)" }}>
                  {downloadUrl
                    ? "File đang được tải về. Nếu trình duyệt chặn, click nút bên dưới."
                    : "Quảng sẽ gửi link tải vào email khi tài liệu sẵn sàng."}
                </p>
                {downloadUrl && (
                  <a href={downloadUrl} target="_blank" rel="noreferrer" className="inline-block mt-4 px-5 py-2.5 rounded-lg text-[0.88rem] font-semibold text-white" style={{ background: "var(--grad-primary)" }}>
                    Tải lại file 
                  </a>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <p className="text-[0.85rem] mb-1" style={{ color: "var(--ink-soft)" }}>
                  Nhập tên + email để nhận tài liệu. Quảng KHÔNG spam - chỉ gửi tài liệu Quảng nghĩ thật sự có giá trị.
                </p>
                <div>
                  <label className="block text-[0.78rem] font-semibold mb-1 text-white">Tên *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-lg outline-none"
                    style={{ border: "1px solid var(--st-10)", background: "var(--st-03)", color: "var(--ink)" }}
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="block text-[0.78rem] font-semibold mb-1 text-white">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-lg outline-none"
                    style={{ border: "1px solid var(--st-10)", background: "var(--st-03)", color: "var(--ink)" }}
                    placeholder="email@example.com"
                  />
                </div>
                {error && (
                  <div className="rounded-lg px-3 py-2 text-[0.82rem]" style={{ background: "rgba(255,90,114,0.10)", border: "1px solid rgba(255,90,114,0.3)", color: "#ff5a72" }}>{error}</div>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="text-white font-bold text-[0.95rem] px-6 py-3 rounded-xl transition-all"
                  style={{ background: "var(--grad-primary)", boxShadow: "0 6px 18px rgba(20,110,245,0.35)", opacity: submitting ? 0.6 : 1 }}
                >
                  {submitting ? "Đang gửi..." : downloadUrl ? "Nhận tài liệu " : "Đăng ký nhận sớm "}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
