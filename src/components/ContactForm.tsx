"use client";
import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", interest: "", who: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: form.interest }),
      });
      if (res.ok) setState("success");
      else setState("error");
    } catch { setState("error"); }
  };

  const inputClass = "w-full px-4 py-3 rounded-wf text-[0.95rem] outline-none transition-all border focus:border-wf-blue focus:ring-2";
  const inputStyle = { border: "1px solid var(--border)", background: "white", color: "var(--ink)", fontFamily: "inherit" } as const;

  if (state === "success") {
    return (
      <div className="bg-white rounded-wf-md p-10 text-center" style={{ border: "1px solid var(--border)", boxShadow: "var(--shadow-soft)" }}>
        <div className="w-16 h-16 rounded-wf-md flex items-center justify-center mx-auto mb-5" style={{ background: "var(--grad-primary)" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 className="text-[1.25rem] font-semibold mb-2 tracking-tight">Đã nhận thông tin!</h3>
        <p className="text-[0.92rem] leading-[1.7] text-gray-600">Mình sẽ liên hệ trong vòng 24 giờ qua email hoặc Zalo.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-wf-md p-7 md:p-8" style={{ border: "1px solid var(--border)", boxShadow: "var(--shadow-soft)" }}>
      <div className="flex flex-col gap-5">
        <div>
          <label className="block text-[0.8rem] font-semibold mb-1.5">Họ và tên <span className="grad-text">*</span></label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Nguyễn Văn A" className={inputClass} style={inputStyle}/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.8rem] font-semibold mb-1.5">Email <span className="grad-text">*</span></label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@gmail.com" className={inputClass} style={inputStyle}/>
          </div>
          <div>
            <label className="block text-[0.8rem] font-semibold mb-1.5">Zalo / SĐT <span className="grad-text">*</span></label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="0912 345 678" className={inputClass} style={inputStyle}/>
          </div>
        </div>
        <div>
          <label className="block text-[0.8rem] font-semibold mb-2">Bạn quan tâm đến?</label>
          <div className="grid grid-cols-3 gap-2">
            {[{ val: "offline", label: "Khoá học\nOffline" }, { val: "online", label: "Khoá học\nOnline" }, { val: "consulting", label: "Tư vấn\n1-1" }].map((opt) => {
              const active = form.interest === opt.val;
              return (
                <button key={opt.val} onClick={() => setForm(p => ({ ...p, interest: opt.val }))}
                  className="py-3 px-2 rounded-wf text-[0.82rem] font-semibold text-center transition-all border whitespace-pre-line leading-snug"
                  style={{
                    borderColor: active ? "var(--wf-blue)" : "var(--border)",
                    background: active ? "rgba(20,110,245,0.06)" : "white",
                    color: active ? "var(--wf-blue)" : "var(--gray-700)",
                  }}>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="block text-[0.8rem] font-semibold mb-2">Bạn là ai?</label>
          <div className="grid grid-cols-2 gap-2">
            {[{ val: "student", label: "🎓 Sinh viên" }, { val: "fresher", label: "💼 Mới đi làm" }, { val: "marketer", label: "📊 Marketing" }, { val: "other", label: "✨ Khác" }].map((opt) => {
              const active = form.who === opt.val;
              return (
                <button key={opt.val} onClick={() => setForm(p => ({ ...p, who: opt.val }))}
                  className="py-2.5 px-3 rounded-wf text-[0.85rem] font-medium text-left transition-all border"
                  style={{
                    borderColor: active ? "var(--wf-blue)" : "var(--border)",
                    background: active ? "rgba(20,110,245,0.06)" : "white",
                    color: active ? "var(--wf-blue)" : "var(--gray-700)",
                  }}>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="block text-[0.8rem] font-semibold mb-1.5">Lời nhắn <span className="font-normal text-gray-500">(không bắt buộc)</span></label>
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Bạn muốn học gì, đang gặp vấn đề gì..." rows={3} className={inputClass} style={{ ...inputStyle, resize: "none" }}/>
        </div>
        <button onClick={handleSubmit} disabled={state === "loading" || !form.name || !form.email || !form.phone}
          className="btn btn-primary w-full justify-center py-3.5 text-[0.95rem] font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
          {state === "loading" ? "Đang gửi..." : <>Gửi thông tin <span className="arrow">→</span></>}
        </button>
        {state === "error" && <p className="text-center text-[0.82rem] text-wf-red">Có lỗi. Vui lòng nhắn Zalo hoặc Email trực tiếp.</p>}
        <p className="text-center text-[0.78rem] text-gray-500">🔒 Thông tin của bạn được bảo mật hoàn toàn</p>
      </div>
    </div>
  );
}
