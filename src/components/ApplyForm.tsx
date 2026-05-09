"use client";
import { useState } from "react";

type State = "idle" | "loading" | "success" | "error";

const Ic = ({ d, w = 16, color = "#7da9ff" }: { d: React.ReactNode; w?: number; color?: string }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const IconCap = () => <Ic d={<><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>} />;
const IconBriefcase = () => <Ic d={<><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></>} />;
const IconBars = () => <Ic d={<><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>} />;
const IconSparkle = () => <Ic d={<><path d="M12 3v18M3 12h18" /></>} />;

const stages = [
  { val: "student", label: "Sinh viên", icon: <IconCap /> },
  { val: "fresher", label: "Mới đi làm", icon: <IconBriefcase /> },
  { val: "marketer", label: "Đang làm Marketing", icon: <IconBars /> },
  { val: "other", label: "Khác", icon: <IconSparkle /> },
];

const slots = [
  { val: "morning", label: "Sáng\n9–11h" },
  { val: "afternoon", label: "Chiều\n14–16h" },
  { val: "evening", label: "Tối\n19–21h" },
];

export default function ApplyForm() {
  const [state, setState] = useState<State>("idle");
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    stage: "", goal: "", hasLaptop: "", commit: "", slot: "",
  });

  const handle = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;
    setState("loading");
    try {
      const res = await fetch("/api/course-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
      <div className="rounded-2xl p-10 text-center" style={{ background: "linear-gradient(180deg, rgba(20,40,90,0.5), rgba(8,16,43,0.85))", border: "1px solid rgba(74,214,255,0.35)", boxShadow: "0 24px 60px rgba(20,110,245,0.25)" }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "var(--grad-primary)" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h3 className="text-[1.4rem] font-bold mb-3 tracking-tight text-white">Đã nhận application!</h3>
        <p className="text-[0.95rem] leading-[1.7] mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>
          Mình sẽ review và liên hệ qua Zalo trong <strong className="text-white">24 giờ</strong> để đặt lịch quick meet 15 phút.
        </p>
        <p className="text-[0.85rem]" style={{ color: "rgba(255,255,255,0.5)" }}>
          Nếu gấp, có thể inbox Zalo trực tiếp: <a href="https://zalo.me/0868464658" target="_blank" rel="noreferrer" className="underline grad-text font-semibold">0868 464 658</a>
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-7 md:p-8" style={{ background: "linear-gradient(180deg, rgba(20,40,90,0.5), rgba(8,16,43,0.85))", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 24px 60px rgba(5,10,31,0.55)" }}>
      <div className="flex flex-col gap-5">
        <div>
          <label className="block text-[0.8rem] font-semibold mb-1.5 text-white">Họ và tên <span className="grad-text">*</span></label>
          <input value={form.name} onChange={(e) => handle("name", e.target.value)} placeholder="Nguyễn Văn A" className={inputClass} style={inputStyle} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.8rem] font-semibold mb-1.5 text-white">Email <span className="grad-text">*</span></label>
            <input type="email" value={form.email} onChange={(e) => handle("email", e.target.value)} placeholder="email@gmail.com" className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className="block text-[0.8rem] font-semibold mb-1.5 text-white">Zalo / SĐT <span className="grad-text">*</span></label>
            <input value={form.phone} onChange={(e) => handle("phone", e.target.value)} placeholder="0912 345 678" className={inputClass} style={inputStyle} />
          </div>
        </div>
        <div>
          <label className="block text-[0.8rem] font-semibold mb-2 text-white">Bạn đang ở giai đoạn nào?</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {stages.map((s) => {
              const active = form.stage === s.val;
              return (
                <button key={s.val} onClick={() => handle("stage", s.val)}
                  className="inline-flex items-center gap-2 py-3 px-3 rounded-lg text-[0.82rem] font-medium text-left transition-all border"
                  style={{
                    borderColor: active ? "#146ef5" : "rgba(255,255,255,0.10)",
                    background: active ? "rgba(20,110,245,0.12)" : "rgba(255,255,255,0.02)",
                    color: active ? "#9bb6ff" : "rgba(255,255,255,0.65)",
                  }}>
                  {s.icon}<span>{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="block text-[0.8rem] font-semibold mb-1.5 text-white">Mục tiêu sau khoá là gì?</label>
          <textarea value={form.goal} onChange={(e) => handle("goal", e.target.value)} placeholder="Vd: Vào được team Ecom của 1 brand cụ thể, hoặc tự vận hành gian hàng riêng..." rows={3} className={inputClass} style={{ ...inputStyle, resize: "none" }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.8rem] font-semibold mb-2 text-white">Có laptop + biết Excel cơ bản?</label>
            <div className="grid grid-cols-2 gap-2">
              {[{ v: "yes", l: "Có" }, { v: "no", l: "Chưa" }].map((o) => {
                const a = form.hasLaptop === o.v;
                return (
                  <button key={o.v} onClick={() => handle("hasLaptop", o.v)}
                    className="py-2.5 rounded-lg text-[0.85rem] font-medium transition-all border"
                    style={{
                      borderColor: a ? "#146ef5" : "rgba(255,255,255,0.10)",
                      background: a ? "rgba(20,110,245,0.12)" : "rgba(255,255,255,0.02)",
                      color: a ? "#9bb6ff" : "rgba(255,255,255,0.65)",
                    }}>{o.l}</button>
                );
              })}
            </div>
          </div>
          <div>
            <label className="block text-[0.8rem] font-semibold mb-2 text-white">Cam kết tham dự đầy đủ 12 buổi?</label>
            <div className="grid grid-cols-3 gap-2">
              {[{ v: "yes", l: "Có" }, { v: "try", l: "Sẽ cố" }, { v: "no", l: "Chưa" }].map((o) => {
                const a = form.commit === o.v;
                return (
                  <button key={o.v} onClick={() => handle("commit", o.v)}
                    className="py-2.5 rounded-lg text-[0.85rem] font-medium transition-all border"
                    style={{
                      borderColor: a ? "#146ef5" : "rgba(255,255,255,0.10)",
                      background: a ? "rgba(20,110,245,0.12)" : "rgba(255,255,255,0.02)",
                      color: a ? "#9bb6ff" : "rgba(255,255,255,0.65)",
                    }}>{o.l}</button>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <label className="block text-[0.8rem] font-semibold mb-2 text-white">Slot quick meet 15 phút phù hợp</label>
          <div className="grid grid-cols-3 gap-2">
            {slots.map((s) => {
              const a = form.slot === s.val;
              return (
                <button key={s.val} onClick={() => handle("slot", s.val)}
                  className="py-3 rounded-lg text-[0.82rem] font-medium transition-all border whitespace-pre-line leading-snug text-center"
                  style={{
                    borderColor: a ? "#146ef5" : "rgba(255,255,255,0.10)",
                    background: a ? "rgba(20,110,245,0.12)" : "rgba(255,255,255,0.02)",
                    color: a ? "#9bb6ff" : "rgba(255,255,255,0.65)",
                  }}>{s.label}</button>
              );
            })}
          </div>
        </div>
        <button onClick={submit} disabled={state === "loading" || !form.name || !form.email || !form.phone}
          className="btn btn-primary w-full justify-center py-3.5 text-[0.95rem] font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
          {state === "loading" ? "Đang gửi..." : <>Gửi application <span className="arrow">→</span></>}
        </button>
        {state === "error" && <p className="text-center text-[0.82rem]" style={{ color: "#ee1d36" }}>Có lỗi. Vui lòng inbox Zalo hoặc Email trực tiếp.</p>}
        <p className="text-center text-[0.78rem]" style={{ color: "rgba(255,255,255,0.5)" }}>
          Application không phải nộp tiền — sẽ có quick meet 15 phút trước khi 2 bên xác nhận.
        </p>
      </div>
    </div>
  );
}
