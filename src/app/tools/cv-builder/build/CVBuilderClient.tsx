"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { EMPTY_CV } from "@/lib/cv/types";
import type { CVData, CVTemplate, QuotaStatus, AIFeedback } from "@/lib/cv/types";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

type Props = {
  initialDraft: { id: string; data: CVData; template: string; ai_feedback: unknown } | null;
  initialQuota: QuotaStatus;
};

export default function CVBuilderClient({ initialDraft, initialQuota }: Props) {
  const [cvId, setCvId] = useState<string | null>(initialDraft?.id || null);
  const [data, setData] = useState<CVData>(() => initialDraft?.data || EMPTY_CV);
  const [template, setTemplate] = useState<CVTemplate>((initialDraft?.template as CVTemplate) || "ats");
  const [quota, setQuota] = useState<QuotaStatus>(initialQuota);
  const [feedback, setFeedback] = useState<AIFeedback | null>(
    (initialDraft?.ai_feedback as AIFeedback | null) || null,
  );

  const [activeSection, setActiveSection] = useState<string>("personal");
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  // Auto-save 2s after change
  useEffect(() => {
    const t = setTimeout(() => save(), 2000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, template]);

  async function save() {
    setSaving(true);
    try {
      const r = await fetch("/api/cv/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: cvId, data, template }),
      });
      const json = await r.json();
      if (json.ok && json.id && !cvId) setCvId(json.id);
    } catch {}
    setSaving(false);
  }

  async function refreshQuota() {
    try {
      const r = await fetch("/api/cv/quota");
      const json = await r.json();
      if (json.freeDownloadsRemaining !== undefined) setQuota(json);
    } catch {}
  }

  async function downloadPdf() {
    if (!data.personal.fullName) {
      setMsg({ ok: false, text: "Vui lòng nhập họ tên trước khi tải" });
      return;
    }
    setDownloading(true);
    setMsg(null);
    try {
      const r = await fetch("/api/cv/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, template, cvId }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        setMsg({ ok: false, text: j.error || "Lỗi tải PDF" });
        setDownloading(false);
        return;
      }
      const wm = r.headers.get("X-CV-Watermark") === "true";
      const remaining = parseInt(r.headers.get("X-CV-Free-Remaining") || "0", 10);
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(data.personal.fullName || "CV").replace(/[^a-zA-Z0-9_-]+/g, "-")}-CV.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      await refreshQuota();
      if (wm) {
        setMsg({ ok: false, text: "Đã tải PDF có watermark - upgrade Pro 49k để bỏ watermark vĩnh viễn" });
      } else {
        setMsg({ ok: true, text: `✓ Đã tải! Còn ${remaining} lượt free.` });
      }
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Lỗi mạng" });
    } finally {
      setDownloading(false);
    }
  }

  async function aiAnalyze() {
    if (quota.aiFeedbackRemaining <= 0) {
      setMsg({ ok: false, text: "Hết lượt AI feedback. Upgrade Pro 49k để dùng thêm." });
      return;
    }
    setAnalyzing(true);
    setMsg(null);
    try {
      const r = await fetch("/api/cv/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, cvId }),
      });
      const json = await r.json();
      if (r.ok) {
        setFeedback(json.feedback);
        await refreshQuota();
        setMsg({ ok: true, text: "✓ AI đã phân tích xong - xem ở tab Feedback" });
        setActiveSection("feedback");
      } else {
        setMsg({ ok: false, text: json.error || "Lỗi AI" });
      }
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Lỗi mạng" });
    } finally {
      setAnalyzing(false);
    }
  }

  // Section update helpers
  const update = useCallback(<K extends keyof CVData>(key: K, value: CVData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
  }, []);

  const sections = [
    { id: "personal", label: "1. Thông tin" },
    { id: "experience", label: "2. Kinh nghiệm" },
    { id: "education", label: "3. Học vấn" },
    { id: "skills", label: "4. Skills" },
    { id: "optional", label: "5. Mở rộng" },
    { id: "feedback", label: "AI Feedback", badge: feedback ? "✓" : undefined },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      {/* Left sidebar */}
      <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
        <div>
          <Link href="/tools/cv-builder" className="text-[0.78rem] hover:underline" style={{ color: "#7da9ff" }}>
            ← Về landing
          </Link>
          <h1 className="t-h3 text-white mt-2">CV Builder</h1>
        </div>

        <QuotaBadge quota={quota} />

        <nav className="space-y-0.5">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className="w-full text-left px-3 py-2 rounded-md text-[0.88rem] transition flex items-center justify-between"
              style={{
                background: activeSection === s.id ? "var(--st-08)" : "transparent",
                color: activeSection === s.id ? "var(--ink)" : "var(--ink-mute)",
                fontWeight: activeSection === s.id ? 600 : 500,
              }}
            >
              <span>{s.label}</span>
              {s.badge && <span className="text-[0.7rem]" style={{ color: "#5fffaa" }}>{s.badge}</span>}
            </button>
          ))}
        </nav>

        <div className="pt-3 border-t space-y-2" style={{ borderColor: "var(--st-06)" }}>
          <div className="text-[0.72rem]" style={{ color: "var(--ink-faint)" }}>
            Template
          </div>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value as CVTemplate)}
            className="input-dark"
          >
            <option value="ats">ATS - 1 cột plain</option>
            <option value="visual">Visual - header gradient</option>
            <option value="hybrid">Hybrid - balanced</option>
          </select>
        </div>

        <div className="pt-3 border-t space-y-2" style={{ borderColor: "var(--st-06)" }}>
          <button
            onClick={aiAnalyze}
            disabled={analyzing || quota.aiFeedbackRemaining <= 0}
            className="w-full px-4 py-2 rounded-md text-[0.85rem] font-semibold disabled:opacity-50"
            style={{ background: "var(--st-08)", color: "var(--ink)" }}
          >
            {analyzing ? "AI đang đọc..." : `AI Feedback (còn ${quota.aiFeedbackRemaining})`}
          </button>
          <button
            onClick={downloadPdf}
            disabled={downloading}
            className="w-full px-4 py-2.5 rounded-md text-[0.9rem] font-bold text-white disabled:opacity-50"
            style={{ background: "var(--grad-primary)" }}
          >
            {downloading ? "Đang tạo PDF..." : "Tải PDF"}
          </button>
          {quota.freeDownloadsRemaining <= 0 && !quota.isPro && (
            <Link href="/tools/cv-builder/upgrade" className="block text-center text-[0.78rem] font-semibold pt-1" style={{ color: "#ffd479" }}>
              Hết lượt - Upgrade Pro 49k →
            </Link>
          )}
          <div className="text-[0.7rem] text-center" style={{ color: "var(--ink-faint)" }}>
            {saving ? "Đang lưu..." : "Đã lưu draft tự động"}
          </div>
        </div>

        {msg && (
          <div className="text-[0.8rem] p-3 rounded-md" style={{
            background: msg.ok ? "rgba(95,255,170,0.10)" : "rgba(255,212,121,0.10)",
            color: msg.ok ? "#5fffaa" : "#ffd479",
            border: `1px solid ${msg.ok ? "rgba(95,255,170,0.25)" : "rgba(255,212,121,0.25)"}`,
          }}>
            {msg.text}
          </div>
        )}
      </aside>

      {/* Content */}
      <div className="min-w-0">
        {activeSection === "personal" && <PersonalSection data={data} update={update} />}
        {activeSection === "experience" && <ExperienceSection data={data} update={update} />}
        {activeSection === "education" && <EducationSection data={data} update={update} />}
        {activeSection === "skills" && <SkillsSection data={data} update={update} />}
        {activeSection === "optional" && <OptionalSection data={data} update={update} />}
        {activeSection === "feedback" && <FeedbackSection feedback={feedback} onAnalyze={aiAnalyze} analyzing={analyzing} />}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Reusable form bits
// ─────────────────────────────────────────────────────────────

function Card({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5 md:p-6 mb-4" style={{ background: "var(--st-03)", border: "1px solid var(--st-08)" }}>
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-[1.1rem] font-bold text-white">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="block text-[0.72rem] uppercase tracking-wider font-semibold mb-1.5" style={{ color: "var(--ink-mute)" }}>{label}</span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="input-dark" />;
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className="input-dark" rows={3} />;
}

function QuotaBadge({ quota }: { quota: QuotaStatus }) {
  if (quota.isPro) {
    return (
      <div className="rounded-md px-3 py-2 text-[0.78rem]" style={{ background: "rgba(95,255,170,0.10)", border: "1px solid rgba(95,255,170,0.25)" }}>
        <div className="font-bold" style={{ color: "#5fffaa" }}>Pro lifetime</div>
        <div style={{ color: "var(--ink-mute)" }}>Unlimited downloads</div>
      </div>
    );
  }
  return (
    <div className="rounded-md px-3 py-2 text-[0.78rem]" style={{ background: "var(--st-04)", border: "1px solid var(--st-10)" }}>
      <div className="font-bold text-white">Free</div>
      <div style={{ color: "var(--ink-mute)" }}>
        Còn {quota.freeDownloadsRemaining}/3 lượt tải · {quota.aiFeedbackRemaining} AI feedback
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Sections
// ─────────────────────────────────────────────────────────────

function PersonalSection({ data, update }: { data: CVData; update: <K extends keyof CVData>(k: K, v: CVData[K]) => void }) {
  const p = data.personal;
  const set = (key: keyof CVData["personal"], val: string) => update("personal", { ...p, [key]: val });

  return (
    <>
      <Card title="Thông tin cá nhân">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Họ và tên *"><Input value={p.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Nguyễn Đức Quảng" /></Field>
          <Field label="Tagline (1 dòng)"><Input value={p.tagline} onChange={(e) => set("tagline", e.target.value)} placeholder="Performance Marketer · 3 năm exp · TikTok Ads" /></Field>
          <Field label="Email *"><Input type="email" value={p.email} onChange={(e) => set("email", e.target.value)} placeholder="quang@gmail.com" /></Field>
          <Field label="SĐT *"><Input value={p.phone} onChange={(e) => set("phone", e.target.value)} placeholder="0868464658" /></Field>
          <Field label="Địa điểm"><Input value={p.location || ""} onChange={(e) => set("location", e.target.value)} placeholder="Hà Nội" /></Field>
          <Field label="LinkedIn URL"><Input value={p.linkedinUrl || ""} onChange={(e) => set("linkedinUrl", e.target.value)} placeholder="linkedin.com/in/..." /></Field>
          <Field label="Portfolio URL" full><Input value={p.portfolioUrl || ""} onChange={(e) => set("portfolioUrl", e.target.value)} placeholder="nguyenducquang.website" /></Field>
        </div>
      </Card>
      <Card title="Summary (optional)">
        <Field label="2-3 câu intro về background">
          <Textarea value={data.summary || ""} onChange={(e) => update("summary", e.target.value)} placeholder="Performance Marketer 3 năm tại UpBase + The Bad God. Chuyên TikTok Shop + Shopee Mall. Quản lý team 5 người, ngân sách 10 tỷ/tháng, ROAS 6.2x." rows={4} />
        </Field>
      </Card>
    </>
  );
}

function ExperienceSection({ data, update }: { data: CVData; update: <K extends keyof CVData>(k: K, v: CVData[K]) => void }) {
  const list = data.experience;
  const upd = (id: string, patch: Partial<CVData["experience"][number]>) => {
    update("experience", list.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  };
  const add = () => update("experience", [...list, { id: uid(), role: "", company: "", startDate: "", endDate: "", bullets: [""] }]);
  const remove = (id: string) => update("experience", list.filter((x) => x.id !== id));

  return (
    <>
      {list.length === 0 && (
        <div className="rounded-2xl p-8 text-center" style={{ background: "var(--st-03)", border: "1px dashed var(--st-12)" }}>
          <p className="text-[0.92rem] mb-3" style={{ color: "var(--ink-mute)" }}>Chưa có kinh nghiệm nào</p>
          <button onClick={add} className="btn btn-primary text-[0.85rem]">+ Thêm kinh nghiệm đầu tiên</button>
        </div>
      )}
      {list.map((e) => (
        <Card
          key={e.id}
          title={e.role || "Kinh nghiệm mới"}
          action={
            <button onClick={() => remove(e.id)} className="text-[0.78rem] font-semibold" style={{ color: "#ff5a72" }}>Xóa</button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Field label="Vị trí *"><Input value={e.role} onChange={(ev) => upd(e.id, { role: ev.target.value })} placeholder="Performance Marketer" /></Field>
            <Field label="Công ty *"><Input value={e.company} onChange={(ev) => upd(e.id, { company: ev.target.value })} placeholder="UpBase Vietnam" /></Field>
            <Field label="Địa điểm"><Input value={e.location || ""} onChange={(ev) => upd(e.id, { location: ev.target.value })} placeholder="Hà Nội" /></Field>
            <Field label="Khoảng thời gian">
              <div className="flex gap-2">
                <Input value={e.startDate} onChange={(ev) => upd(e.id, { startDate: ev.target.value })} placeholder="01/2023" />
                <Input value={e.endDate} onChange={(ev) => upd(e.id, { endDate: ev.target.value })} placeholder="present" />
              </div>
            </Field>
          </div>
          <div className="space-y-2">
            <span className="block text-[0.72rem] uppercase tracking-wider font-semibold" style={{ color: "var(--ink-mute)" }}>Bullets (mỗi dòng 1 bullet, thêm số liệu cụ thể)</span>
            {e.bullets.map((b, i) => (
              <div key={i} className="flex gap-2">
                <Textarea value={b} onChange={(ev) => upd(e.id, { bullets: e.bullets.map((x, j) => (j === i ? ev.target.value : x)) })} placeholder="Quản lý team 5 người, ngân sách 10 tỷ/tháng, ROAS 6.2x" rows={2} />
                <button onClick={() => upd(e.id, { bullets: e.bullets.filter((_, j) => j !== i) })} className="text-[0.78rem] px-2" style={{ color: "var(--ink-faint)" }}>×</button>
              </div>
            ))}
            <button onClick={() => upd(e.id, { bullets: [...e.bullets, ""] })} className="text-[0.82rem] font-semibold" style={{ color: "#7da9ff" }}>+ Thêm bullet</button>
          </div>
        </Card>
      ))}
      {list.length > 0 && (
        <button onClick={add} className="btn btn-ghost w-full">+ Thêm kinh nghiệm khác</button>
      )}
    </>
  );
}

function EducationSection({ data, update }: { data: CVData; update: <K extends keyof CVData>(k: K, v: CVData[K]) => void }) {
  const list = data.education;
  const upd = (id: string, patch: Partial<CVData["education"][number]>) => {
    update("education", list.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  };
  const add = () => update("education", [...list, { id: uid(), school: "", degree: "", startDate: "", endDate: "" }]);
  const remove = (id: string) => update("education", list.filter((x) => x.id !== id));

  return (
    <>
      {list.length === 0 && (
        <div className="rounded-2xl p-8 text-center" style={{ background: "var(--st-03)", border: "1px dashed var(--st-12)" }}>
          <button onClick={add} className="btn btn-primary text-[0.85rem]">+ Thêm học vấn</button>
        </div>
      )}
      {list.map((e) => (
        <Card key={e.id} title={e.school || "Học vấn"} action={
          <button onClick={() => remove(e.id)} className="text-[0.78rem] font-semibold" style={{ color: "#ff5a72" }}>Xóa</button>
        }>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Trường *"><Input value={e.school} onChange={(ev) => upd(e.id, { school: ev.target.value })} placeholder="ĐH FPT Greenwich" /></Field>
            <Field label="Bằng *"><Input value={e.degree} onChange={(ev) => upd(e.id, { degree: ev.target.value })} placeholder="Cử nhân" /></Field>
            <Field label="Ngành"><Input value={e.field || ""} onChange={(ev) => upd(e.id, { field: ev.target.value })} placeholder="Digital Marketing" /></Field>
            <Field label="GPA"><Input value={e.gpa || ""} onChange={(ev) => upd(e.id, { gpa: ev.target.value })} placeholder="3.6/4.0" /></Field>
            <Field label="Khoảng thời gian">
              <div className="flex gap-2">
                <Input value={e.startDate} onChange={(ev) => upd(e.id, { startDate: ev.target.value })} placeholder="09/2018" />
                <Input value={e.endDate} onChange={(ev) => upd(e.id, { endDate: ev.target.value })} placeholder="06/2022" />
              </div>
            </Field>
            <Field label="Activities / Awards" full>
              <Textarea value={e.activities || ""} onChange={(ev) => upd(e.id, { activities: ev.target.value })} placeholder="CLB Marketing trường, giải nhì cuộc thi case study 2021" />
            </Field>
          </div>
        </Card>
      ))}
      {list.length > 0 && <button onClick={add} className="btn btn-ghost w-full">+ Thêm học vấn khác</button>}
    </>
  );
}

function SkillsSection({ data, update }: { data: CVData; update: <K extends keyof CVData>(k: K, v: CVData[K]) => void }) {
  const s = data.skills;
  const set = <K extends keyof CVData["skills"]>(key: K, val: CVData["skills"][K]) => update("skills", { ...s, [key]: val });
  const addLang = () => set("languages", [...s.languages, { name: "", level: "" }]);
  const removeLang = (i: number) => set("languages", s.languages.filter((_, j) => j !== i));

  const tagsInput = (arr: string[], setter: (a: string[]) => void) => {
    return (
      <Textarea
        value={arr.join("\n")}
        onChange={(e) => setter(e.target.value.split("\n").map((x) => x.trim()).filter(Boolean))}
        placeholder="Mỗi dòng 1 skill"
        rows={5}
      />
    );
  };

  return (
    <>
      <Card title="Hard skills (tool, platform, framework)">
        <Field label="Mỗi dòng 1 skill - vd: TikTok Ads Manager">
          {tagsInput(s.hard, (a) => set("hard", a))}
        </Field>
      </Card>
      <Card title="Soft skills">
        <Field label="Mỗi dòng 1 skill - vd: Team management">
          {tagsInput(s.soft, (a) => set("soft", a))}
        </Field>
      </Card>
      <Card title="Ngôn ngữ">
        <div className="space-y-2">
          {s.languages.map((l, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <Input value={l.name} onChange={(e) => set("languages", s.languages.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} placeholder="Tiếng Anh" />
              <Input value={l.level} onChange={(e) => set("languages", s.languages.map((x, j) => (j === i ? { ...x, level: e.target.value } : x)))} placeholder="TOEIC 850" />
              <button onClick={() => removeLang(i)} className="px-2 text-[0.85rem]" style={{ color: "var(--ink-faint)" }}>×</button>
            </div>
          ))}
          <button onClick={addLang} className="text-[0.82rem] font-semibold" style={{ color: "#7da9ff" }}>+ Thêm ngôn ngữ</button>
        </div>
      </Card>
    </>
  );
}

function OptionalSection({ data, update }: { data: CVData; update: <K extends keyof CVData>(k: K, v: CVData[K]) => void }) {
  const projects = data.projects || [];
  const certs = data.certifications || [];

  const updProj = (id: string, patch: Partial<NonNullable<CVData["projects"]>[number]>) => {
    update("projects", projects.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  };
  const addProj = () => update("projects", [...projects, { id: uid(), name: "", description: "" }]);
  const remProj = (id: string) => update("projects", projects.filter((x) => x.id !== id));

  const updCert = (id: string, patch: Partial<NonNullable<CVData["certifications"]>[number]>) => {
    update("certifications", certs.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  };
  const addCert = () => update("certifications", [...certs, { id: uid(), name: "", issuer: "", date: "" }]);
  const remCert = (id: string) => update("certifications", certs.filter((x) => x.id !== id));

  return (
    <>
      <Card title="Projects / Portfolio">
        {projects.length === 0 && <p className="text-[0.85rem] mb-3" style={{ color: "var(--ink-faint)" }}>Optional - showcase side project nếu có</p>}
        {projects.map((p) => (
          <div key={p.id} className="border-t pt-3 mt-3" style={{ borderColor: "var(--st-06)" }}>
            <div className="flex justify-end mb-2">
              <button onClick={() => remProj(p.id)} className="text-[0.78rem]" style={{ color: "#ff5a72" }}>Xóa</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Tên project"><Input value={p.name} onChange={(e) => updProj(p.id, { name: e.target.value })} /></Field>
              <Field label="Tech / Tools"><Input value={p.tech || ""} onChange={(e) => updProj(p.id, { tech: e.target.value })} /></Field>
              <Field label="URL"><Input value={p.url || ""} onChange={(e) => updProj(p.id, { url: e.target.value })} /></Field>
              <Field label="Mô tả" full><Textarea value={p.description} onChange={(e) => updProj(p.id, { description: e.target.value })} rows={2} /></Field>
            </div>
          </div>
        ))}
        <button onClick={addProj} className="text-[0.82rem] font-semibold mt-3" style={{ color: "#7da9ff" }}>+ Thêm project</button>
      </Card>

      <Card title="Chứng chỉ">
        {certs.length === 0 && <p className="text-[0.85rem] mb-3" style={{ color: "var(--ink-faint)" }}>Optional - Meta Blueprint, Google Ads, etc.</p>}
        {certs.map((c) => (
          <div key={c.id} className="border-t pt-3 mt-3" style={{ borderColor: "var(--st-06)" }}>
            <div className="flex justify-end mb-2">
              <button onClick={() => remCert(c.id)} className="text-[0.78rem]" style={{ color: "#ff5a72" }}>Xóa</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Tên cert"><Input value={c.name} onChange={(e) => updCert(c.id, { name: e.target.value })} placeholder="Meta Certified Buyer" /></Field>
              <Field label="Issuer"><Input value={c.issuer} onChange={(e) => updCert(c.id, { issuer: e.target.value })} placeholder="Meta" /></Field>
              <Field label="Date"><Input value={c.date} onChange={(e) => updCert(c.id, { date: e.target.value })} placeholder="12/2024" /></Field>
            </div>
          </div>
        ))}
        <button onClick={addCert} className="text-[0.82rem] font-semibold mt-3" style={{ color: "#7da9ff" }}>+ Thêm chứng chỉ</button>
      </Card>
    </>
  );
}

function FeedbackSection({ feedback, onAnalyze, analyzing }: { feedback: AIFeedback | null; onAnalyze: () => void; analyzing: boolean }) {
  if (!feedback) {
    return (
      <Card title="AI Feedback">
        <p className="text-[0.92rem] mb-4" style={{ color: "var(--ink-mute)" }}>
          AI sẽ đọc CV của bạn theo lens recruiter Marketing/Ecom VN và đưa ra điểm mạnh, yếu, và gợi ý sửa từng bullet.
          Bạn TỰ sửa - không có auto-rewrite để giữ giọng riêng.
        </p>
        <button onClick={onAnalyze} disabled={analyzing} className="btn btn-primary disabled:opacity-50">
          {analyzing ? "AI đang phân tích..." : "Bắt đầu phân tích"}
        </button>
      </Card>
    );
  }

  const scoreColor = feedback.atsScore >= 8 ? "#5fffaa" : feedback.atsScore >= 5 ? "#ffd479" : "#ff5a72";

  return (
    <>
      <Card title="ATS Score" action={
        <button onClick={onAnalyze} disabled={analyzing} className="text-[0.78rem] font-semibold" style={{ color: "#7da9ff" }}>
          {analyzing ? "..." : "Phân tích lại"}
        </button>
      }>
        <div className="flex items-baseline gap-3">
          <div className="text-[3rem] font-bold leading-none" style={{ color: scoreColor }}>{feedback.atsScore}</div>
          <div className="text-[1.2rem] font-bold" style={{ color: "var(--ink-mute)" }}>/10</div>
        </div>
        <p className="text-[0.82rem] mt-2" style={{ color: "var(--ink-mute)" }}>
          Generated: {new Date(feedback.generatedAt).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
        </p>
      </Card>

      <Card title="Điểm mạnh">
        <ul className="space-y-2">
          {feedback.strengths.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-[0.92rem]" style={{ color: "var(--ink-soft)" }}>
              <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 text-[0.7rem] font-bold" style={{ background: "rgba(95,255,170,0.18)", color: "#5fffaa" }}>✓</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Điểm yếu cần fix">
        <ul className="space-y-2">
          {feedback.weaknesses.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-[0.92rem]" style={{ color: "var(--ink-soft)" }}>
              <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 text-[0.7rem] font-bold" style={{ background: "rgba(255,90,114,0.18)", color: "#ff5a72" }}>!</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title={`Gợi ý cụ thể (${feedback.suggestions.length})`}>
        <ul className="space-y-3">
          {feedback.suggestions.map((s, i) => (
            <li key={i} className="rounded-lg p-3" style={{ background: "var(--st-04)", border: "1px solid var(--st-08)" }}>
              <div className="text-[0.72rem] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#7da9ff" }}>{s.section}</div>
              {s.original && (
                <div className="text-[0.85rem] mb-2 italic" style={{ color: "var(--ink-faint)" }}>
                  Original: &quot;{s.original}&quot;
                </div>
              )}
              <div className="text-[0.92rem]" style={{ color: "var(--ink-soft)" }}>
                <strong style={{ color: "var(--ink)" }}>Gợi ý:</strong> {s.tip}
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
