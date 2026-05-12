"use client";
import { useState, FormEvent } from "react";

export default function NewsletterCTA({ source }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: source || "blog" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data?.error || "Có lỗi xảy ra");
        setState("error");
        return;
      }
      setState("success");
    } catch (e) {
      setErrorMsg("Không kết nối được server");
      setState("error");
    }
  }

  return (
    <div
      className="mt-10 rounded-2xl p-6 md:p-8"
      style={{
        background: "linear-gradient(135deg, rgba(95,255,170,0.08) 0%, rgba(20,110,245,0.10) 100%)",
        border: "1px solid rgba(95,255,170,0.22)",
      }}
    >
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: "#5fffaa" }}>
        Newsletter · 1 bài / tuần
      </div>
      <div className="text-[1.25rem] md:text-[1.4rem] font-bold mb-3 leading-tight text-white">
        Nhận insight mới nhất về Ads, P&L và Unit Economics ecom
      </div>
      <p className="text-[0.92rem] leading-[1.7] mb-5" style={{ color: "var(--st-72)" }}>
        Mỗi thứ 5 hàng tuần - 1 bài deep + 2-3 link đáng đọc. Không spam, huỷ bất cứ lúc nào.
      </p>

      {state === "success" ? (
        <div
          className="rounded-lg px-4 py-3 text-[0.92rem] font-medium"
          style={{ background: "rgba(95,255,170,0.12)", border: "1px solid rgba(95,255,170,0.35)", color: "#5fffaa" }}
        >
          Cảm ơn bạn đã đăng ký! Email đầu tiên sẽ đến trong vòng 7 ngày.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@cua-ban.com"
            required
            disabled={state === "loading"}
            className="flex-1 px-4 py-3 rounded-xl text-[0.95rem] outline-none transition-all"
            style={{ border: "1px solid var(--st-10)", background: "rgba(0,0,0,0.25)", color: "white" }}
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="px-6 py-3 rounded-xl text-[0.92rem] font-semibold text-white transition-all disabled:opacity-50"
            style={{ background: "var(--grad-primary)" }}
          >
            {state === "loading" ? "Đang gửi..." : "Đăng ký"}
          </button>
        </form>
      )}
      {state === "error" && (
        <div className="mt-2 text-[0.85rem]" style={{ color: "#ff8a8a" }}>
          {errorMsg}
        </div>
      )}
    </div>
  );
}
