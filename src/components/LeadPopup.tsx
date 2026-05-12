"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CohortStatus from "@/components/CohortStatus";
import { trackEvent } from "@/lib/track";

const STORAGE_KEY = "ndq.leadPopup.shown";

type State = "idle" | "loading" | "success" | "error";

export default function LeadPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<State>("idle");
  const [form, setForm] = useState({ name: "", email: "" });
  const triggered = useRef(false);

  // Skip on /ecom-foundation (đã ở trang sales rồi) + studio + blog post detail
  const skipPath = pathname?.startsWith("/ecom-foundation") || pathname?.startsWith("/studio") || pathname?.startsWith("/blog/") || pathname?.startsWith("/tools");

  useEffect(() => {
    if (skipPath) return;

    // Đã dismiss trong session này
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {}

    function show() {
      if (triggered.current) return;
      triggered.current = true;
      setOpen(true);
      trackEvent("lead_popup_shown");
    }

    // Desktop - exit intent (chuột rời cửa sổ phía trên)
    function onMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) show();
    }

    // Mobile + desktop - scroll past 70%
    function onScroll() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && window.scrollY / docHeight >= 0.7) show();
    }

    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [skipPath]);

  function close(reason: "x" | "backdrop" | "submitted") {
    setOpen(false);
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}
    if (reason !== "submitted") trackEvent("lead_popup_dismissed", { reason });
  }

  async function submit(e: React.MouseEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setState("loading");

    const payload = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
      subject: `[Lead Popup] Tư vấn 15p - ${form.name}`,
      from_name: `Lead Popup · ${form.name}`,
      botcheck: "",
      Source: "Lead capture popup",
      "Họ tên": form.name,
      Email: form.email,
      "Yêu cầu": "Quảng tư vấn miễn phí 15 phút về Foundation Ecommerce",
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({} as any));
      if (res.ok && data?.success) {
        trackEvent("lead_popup_submitted", { source: "popup" });
        setState("success");
        setTimeout(() => close("submitted"), 3500);
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (skipPath) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(5,10,31,0.65)", backdropFilter: "blur(8px)" }}
          onClick={() => close("backdrop")}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-full max-w-[460px] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(180deg, var(--dg-70) 0%, var(--db-95) 100%)",
              border: "1px solid rgba(74,214,255,0.30)",
              boxShadow: "0 30px 80px rgba(5,10,31,0.7), 0 1px 0 var(--st-08) inset",
            }}
          >
            {/* Glow blob */}
            <div className="absolute -top-20 -right-16 w-60 h-60 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(74,214,255,0.35), transparent 65%)", filter: "blur(30px)" }} />

            {/* Close */}
            <button
              onClick={() => close("x")}
              aria-label="Đóng"
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-md flex items-center justify-center transition-colors"
              style={{ background: "var(--st-06)", border: "1px solid var(--st-10)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--st-70)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {state === "success" ? (
              <div className="p-8 text-center relative">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "var(--grad-primary)" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-[1.2rem] font-bold mb-2 text-white tracking-tight">Đã nhận thông tin!</h3>
                <p className="text-[0.9rem] leading-[1.65]" style={{ color: "var(--st-70)" }}>
                  Mình sẽ liên hệ trong <strong className="text-white">24 giờ</strong> để đặt lịch tư vấn 15 phút qua Zalo.
                </p>
              </div>
            ) : (
              <div className="p-7 md:p-8 relative">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md mb-4" style={{ background: "rgba(74,214,255,0.12)", border: "1px solid rgba(74,214,255,0.3)" }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4ad6ff" }} />
                  <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em]" style={{ color: "#7ee2ff" }}>Tư vấn miễn phí · Khoá 1</span>
                </div>

                <h3 className="text-[1.55rem] font-bold mb-3 text-white tracking-tight leading-tight">
                  Đang cân nhắc khoá học?<br />
                  <span className="grad-text">Để mình tư vấn 15 phút.</span>
                </h3>

                <p className="text-[0.92rem] leading-[1.65] mb-5" style={{ color: "var(--st-70)" }}>
                  Để lại email - mình sẽ inbox Zalo để đặt lịch quick meet 15 phút. 2 bên cùng đánh giá phù hợp trước khi quyết định gì.
                </p>

                {/* Cohort status */}
                <div className="mb-5">
                  <CohortStatus variant="compact" />
                </div>

                <div className="flex flex-col gap-3">
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Họ và tên"
                    className="w-full px-4 py-3 rounded-lg text-[0.95rem] outline-none border"
                    style={{ border: "1px solid var(--st-10)", background: "var(--st-03)", color: "white", fontFamily: "inherit" }}
                  />
                  <input
                    value={form.email}
                    type="email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="email@gmail.com"
                    className="w-full px-4 py-3 rounded-lg text-[0.95rem] outline-none border"
                    style={{ border: "1px solid var(--st-10)", background: "var(--st-03)", color: "white", fontFamily: "inherit" }}
                  />
                  <button
                    onClick={submit}
                    disabled={state === "loading" || !form.name || !form.email}
                    className="btn btn-primary w-full justify-center py-3 text-[0.92rem] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {state === "loading" ? "Đang gửi..." : <>Đăng ký tư vấn 15 phút</>}
                  </button>
                  {state === "error" && (
                    <p className="text-center text-[0.78rem]" style={{ color: "#ee1d36" }}>
                      Có lỗi. <Link href="https://zalo.me/0868464658" target="_blank" className="underline">Inbox Zalo trực tiếp</Link>
                    </p>
                  )}
                </div>

                <p className="text-center text-[0.72rem] mt-4" style={{ color: "var(--st-40)" }}>
                  Apply không phải nộp tiền - quick meet rồi mới quyết.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
