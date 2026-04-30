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

  const inputClass = "w-full px-4 py-3 rounded-xl text-[0.9rem] outline-none transition-all border focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
  const inputStyle = { border: "1.5px solid var(--border)", background: "white", color: "var(--text)", fontFamily: "inherit" };

  if (state === "success") {
    return (
      <div className="bg-white rounded-2xl p-10 text-center shadow-sm" style={{ border: "1px solid var(--border)" }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "var(--blue-sky)" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 className="text-[1.2rem] font-bold mb-2">Đã nhận thông tin!</h3>
        <p className="text-[0.88rem] leading-[1.7]" style={{ color: "var(--muted)" }}>Mình sẽ liên hệ trong vòng 24 giờ qua email hoặc Zalo.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm" style={{ border: "1px solid var(--border)" }}>
      <div className="flex flex-col gap-5">
        <div>
          <label className="block text-[0.8rem] font-semibold mb-1.5">Họ và tên <span style={{ color: "var(--blue)" }}>*</span></label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Nguyễn Văn A" className={inputClass} style={inputStyle}/>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.8rem] font-semibold mb-1.5">Email <span style={{ color: "var(--blue)" }}>*</span></label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@gmail.com" className={inputClass} style={inputStyle}/>
          </div>
          <div>
            <label className="block text-[0.8rem] font-semibold mb-1.5">Zalo / SĐT <span style={{ color: "var(--blue)" }}>*</span></label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="0912 345 678" className={inputClass} style={inputStyle}/>
          </div>
        </div>
        <div>
          <label className="block text-[0.8rem] font-semibold mb-2">Bạn quan tâm đến?</label>
          <div className="grid grid-cols-3 gap-2">
            {[{ val: "offline", label: "Khoá học\nOffline" }, { val: "online", label: "Khoá học\nOnline" }, { val: "consulting", label: "Tư vấn\n1-1" }].map((opt) => (
              <button key={opt.val} onClick={() => setForm(p => ({ ...p, interest: opt.val }))}
                className="py-3 px-2 rounded-xl text-[0.8rem] font-semibold text-center transition-all border-[1.5px] whitespace-pre-line leading-snug"
                style={{ borderColor: form.interest === opt.val ? "var(--blue)" : "var(--border)", background: form.interest === opt.val ? "var(--blue-sky)" : "white", color: form.interest === opt.val ? "var(--blue)" : "var(--muted)" }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-[0.8rem] font-semibold mb-2">Bạn là ai?</label>
          <div className="grid grid-cols-2 gap-2">
            {[{ val: "student", label: "🎓 Sinh viên" }, { val: "fresher", label: "💼 Mới đi làm" }, { val: "marketer", label: "📊 Đang làm Marketing" }, { val: "other", label: "✨ Khác" }].map((opt) => (
              <button key={opt.val} onClick={() => setForm(p => ({ ...p, who: opt.val }))}
                className="py-2.5 px-3 rounded-xl text-[0.82rem] font-medium text-left transition-all border-[1.5px]"
                style={{ borderColor: form.who === opt.val ? "var(--blue)" : "var(--border)", background: form.who === opt.val ? "var(--blue-sky)" : "white", color: form.who === opt.val ? "var(--blue)" : "var(--muted)" }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-[0.8rem] font-semibold mb-1.5">Lời nhắn <span className="font-normal" style={{ color: "var(--muted)" }}>(không bắt buộc)</span></label>
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Bạn muốn học gì, đang gặp vấn đề gì..." rows={3} className={inputClass} style={{ ...inputStyle, resize: "none" }}/>
        </div>
        <button onClick={handleSubmit} disabled={state === "loading" || !form.name || !form.email || !form.phone}
          className="w-full py-3.5 rounded-xl font-bold text-[0.95rem] text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: "var(--blue)" }}>
          {state === "loading" ? "Đang gửi..." : "Gửi thông tin →"}
        </button>
        {state === "error" && <p className="text-center text-[0.82rem]" style={{ color: "#EF4444" }}>Có lỗi. Vui lòng nhắn Zalo hoặc Email trực tiếp.</p>}
        <p className="text-center text-[0.75rem]" style={{ color: "var(--muted)" }}>🔒 Thông tin của bạn được bảo mật hoàn toàn</p>
      </div>
    </div>
  );
}
