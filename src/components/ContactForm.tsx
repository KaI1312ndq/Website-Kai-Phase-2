"use client";
import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

const Ic = ({ d, w = 16, color = "#7da9ff" }: { d: React.ReactNode; w?: number; color?: string }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

const IconCap = () => <Ic d={<><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>} />;
const IconBriefcase = () => <Ic d={<><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></>} />;
const IconBars = () => <Ic d={<><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>} />;
const IconSparkle = () => <Ic d={<><path d="M12 3v18M3 12h18" /><path d="M5.5 5.5l13 13M18.5 5.5l-13 13" /></>} />;
const IconLock = () => <Ic d={<><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></>} w={13} color="rgba(255,255,255,0.5)" />;
const IconLaptop = () => <Ic d={<><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></>} />;
const IconMonitor = () => <Ic d={<><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></>} />;
const IconUserCircle = () => <Ic d={<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M6.6 18a6 6 0 0110.8 0" /></>} />;

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

  const inputClass = "w-full px-4 py-3 rounded-lg text-[0.95rem] outline-none transition-all border";
  const inputStyle = {
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.03)",
    color: "white",
    fontFamily: "inherit",
  } as const;

  if (state === "success") {
    return (
      <div className="rounded-2xl p-10 text-center" style={{ background: "linear-gradient(180deg, rgba(20,40,90,0.5), rgba(8,16,43,0.85))", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 24px 60px rgba(5,10,31,0.55)" }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "var(--grad-primary)" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-[1.25rem] font-bold mb-2 tracking-tight text-white">Đã nhận thông tin!</h3>
        <p className="text-[0.92rem] leading-[1.7]" style={{ color: "rgba(255,255,255,0.7)" }}>Mình sẽ liên hệ trong vòng 24 giờ qua email hoặc Zalo.</p>
      </div>
    );
  }

  const interests = [
    { val: "course", label: "Khoá học\nOffline", icon: <IconLaptop /> },
    { val: "consulting", label: "Tư vấn\n1-1", icon: <IconUserCircle /> },
    { val: "project", label: "Dự án\nFreelance", icon: <IconMonitor /> },
  ];
  const whoOptions = [
    { val: "student", label: "Sinh viên", icon: <IconCap /> },
    { val: "fresher", label: "Mới đi làm", icon: <IconBriefcase /> },
    { val: "marketer", label: "Marketing", icon: <IconBars /> },
    { val: "other", label: "Khác", icon: <IconSparkle /> },
  ];

  return (
    <div className="rounded-2xl p-7 md:p-8" style={{ background: "linear-gradient(180deg, rgba(20,40,90,0.5), rgba(8,16,43,0.85))", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 24px 60px rgba(5,10,31,0.55)" }}>
      <div className="flex flex-col gap-5">
        <div>
          <label className="block text-[0.8rem] font-semibold mb-1.5 text-white">Họ và tên <span className="grad-text">*</span></label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Nguyễn Văn A" className={inputClass} style={inputStyle} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.8rem] font-semibold mb-1.5 text-white">Email <span className="grad-text">*</span></label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@gmail.com" className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className="block text-[0.8rem] font-semibold mb-1.5 text-white">Zalo / SĐT <span className="grad-text">*</span></label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="0912 345 678" className={inputClass} style={inputStyle} />
          </div>
        </div>
        <div>
          <label className="block text-[0.8rem] font-semibold mb-2 text-white">Bạn quan tâm đến?</label>
          <div className="grid grid-cols-3 gap-2">
            {interests.map((opt) => {
              const active = form.interest === opt.val;
              return (
                <button key={opt.val} onClick={() => setForm(p => ({ ...p, interest: opt.val }))}
                  className="flex flex-col items-center gap-2 py-3.5 px-2 rounded-lg text-[0.78rem] font-semibold transition-all border whitespace-pre-line leading-snug"
                  style={{
                    borderColor: active ? "#146ef5" : "rgba(255,255,255,0.10)",
                    background: active ? "rgba(20,110,245,0.12)" : "rgba(255,255,255,0.02)",
                    color: active ? "#9bb6ff" : "rgba(255,255,255,0.65)",
                  }}>
                  {opt.icon}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="block text-[0.8rem] font-semibold mb-2 text-white">Bạn là ai?</label>
          <div className="grid grid-cols-2 gap-2">
            {whoOptions.map((opt) => {
              const active = form.who === opt.val;
              return (
                <button key={opt.val} onClick={() => setForm(p => ({ ...p, who: opt.val }))}
                  className="inline-flex items-center gap-2.5 py-3 px-3 rounded-lg text-[0.85rem] font-medium text-left transition-all border"
                  style={{
                    borderColor: active ? "#146ef5" : "rgba(255,255,255,0.10)",
                    background: active ? "rgba(20,110,245,0.12)" : "rgba(255,255,255,0.02)",
                    color: active ? "#9bb6ff" : "rgba(255,255,255,0.65)",
                  }}>
                  {opt.icon}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="block text-[0.8rem] font-semibold mb-1.5 text-white">Lời nhắn <span className="font-normal" style={{ color: "rgba(255,255,255,0.5)" }}>(không bắt buộc)</span></label>
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Bạn muốn học gì, đang gặp vấn đề gì..." rows={3} className={inputClass} style={{ ...inputStyle, resize: "none" }} />
        </div>
        <button onClick={handleSubmit} disabled={state === "loading" || !form.name || !form.email || !form.phone}
          className="btn btn-primary w-full justify-center py-3.5 text-[0.95rem] font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
          {state === "loading" ? "Đang gửi..." : <>Gửi thông tin <span className="arrow">→</span></>}
        </button>
        {state === "error" && <p className="text-center text-[0.82rem]" style={{ color: "#ee1d36" }}>Có lỗi. Vui lòng nhắn Zalo hoặc Email trực tiếp.</p>}
        <p className="text-center text-[0.78rem] inline-flex items-center justify-center gap-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
          <IconLock />
          Thông tin của bạn được bảo mật hoàn toàn
        </p>
      </div>
    </div>
  );
}
