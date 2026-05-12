import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Admin · Leads",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

type SearchParams = { tab?: string; q?: string; from?: string; to?: string; quiz?: string };

async function fetchLeads(sp: SearchParams) {
  const sb = getSupabaseAdmin();
  let qb = sb.from("quiz_leads").select("*").order("created_at", { ascending: false }).limit(300);
  if (sp.q && sp.q.trim()) {
    const q = sp.q.trim().replace(/[%,]/g, "");
    qb = qb.or(`name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%`);
  }
  if (sp.quiz) qb = qb.eq("quiz_slug", sp.quiz);
  if (sp.from) qb = qb.gte("created_at", new Date(sp.from).toISOString());
  if (sp.to) {
    const to = new Date(sp.to); to.setHours(23, 59, 59, 999);
    qb = qb.lte("created_at", to.toISOString());
  }
  return (await qb).data || [];
}

async function fetchCourseApps(sp: SearchParams) {
  const sb = getSupabaseAdmin();
  let qb = sb.from("course_applications").select("*").order("created_at", { ascending: false }).limit(300);
  if (sp.q && sp.q.trim()) {
    const q = sp.q.trim().replace(/[%,]/g, "");
    qb = qb.or(`name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%`);
  }
  if (sp.from) qb = qb.gte("created_at", new Date(sp.from).toISOString());
  if (sp.to) {
    const to = new Date(sp.to); to.setHours(23, 59, 59, 999);
    qb = qb.lte("created_at", to.toISOString());
  }
  return (await qb).data || [];
}

async function fetchNewsletter(sp: SearchParams) {
  const sb = getSupabaseAdmin();
  let qb = sb.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }).limit(500);
  if (sp.q && sp.q.trim()) {
    const q = sp.q.trim().replace(/[%,]/g, "");
    qb = qb.ilike("email", `%${q}%`);
  }
  return (await qb).data || [];
}

async function fetchQuizSlugs() {
  const sb = getSupabaseAdmin();
  const { data } = await sb.from("quiz_leads").select("quiz_slug");
  const set = new Set<string>((data || []).map((d) => String(d.quiz_slug)));
  return Array.from(set).sort();
}

export default async function AdminLeadsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const tab = sp.tab || "quiz";

  const [quizLeads, courseApps, newsletter, quizSlugs] = await Promise.all([
    tab === "quiz" ? fetchLeads(sp) : Promise.resolve([]),
    tab === "courses" ? fetchCourseApps(sp) : Promise.resolve([]),
    tab === "newsletter" ? fetchNewsletter(sp) : Promise.resolve([]),
    tab === "quiz" ? fetchQuizSlugs() : Promise.resolve([] as string[]),
  ]);

  const tabs = [
    { id: "quiz", label: "Quiz leads" },
    { id: "courses", label: "Course applications" },
    { id: "newsletter", label: "Newsletter" },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="t-h2 text-white mb-1">Leads</h1>
        <p className="text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>
          Capture lead từ quiz, course apply, newsletter signup.
        </p>
      </header>

      {/* Tab nav */}
      <div className="flex gap-1 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <Link
              key={t.id}
              href={`/account/admin/leads?tab=${t.id}`}
              className="px-4 py-2.5 text-[0.88rem] font-semibold border-b-2"
              style={{
                color: active ? "#ffffff" : "var(--ink-mute)",
                borderColor: active ? "#7da9ff" : "transparent",
              }}
            >
              {t.label}
            </Link>
          );
        })}
      </div>

      {tab === "quiz" && (
        <>
          <FilterBar action="/account/admin/leads" hidden={[{ name: "tab", value: "quiz" }]}>
            <Field label="Tìm kiếm (tên / email / phone)">
              <input name="q" defaultValue={sp.q || ""} placeholder="..." className="input-dark" />
            </Field>
            <Field label="Quiz">
              <select name="quiz" defaultValue={sp.quiz || ""} className="input-dark">
                <option value="">Tất cả</option>
                {quizSlugs.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Từ ngày"><input type="date" name="from" defaultValue={sp.from || ""} className="input-dark" /></Field>
            <Field label="Đến ngày"><input type="date" name="to" defaultValue={sp.to || ""} className="input-dark" /></Field>
          </FilterBar>

          <DataTable
            count={quizLeads.length}
            cols={["Họ tên", "Email", "Phone", "Quiz", "Kết quả", "Ngày"]}
            rows={quizLeads.map((l) => [
              String(l.name),
              String(l.email || "-"),
              String(l.phone || "-"),
              String(l.quiz_slug),
              String(l.result_type || "-"),
              formatDate(l.created_at),
            ])}
          />
        </>
      )}

      {tab === "courses" && (
        <>
          <FilterBar action="/account/admin/leads" hidden={[{ name: "tab", value: "courses" }]}>
            <Field label="Tìm kiếm"><input name="q" defaultValue={sp.q || ""} placeholder="Tên / email / phone..." className="input-dark" /></Field>
            <Field label="Từ ngày"><input type="date" name="from" defaultValue={sp.from || ""} className="input-dark" /></Field>
            <Field label="Đến ngày"><input type="date" name="to" defaultValue={sp.to || ""} className="input-dark" /></Field>
          </FilterBar>

          <DataTable
            count={courseApps.length}
            cols={["Họ tên", "Email", "Phone", "Khoá", "Mục tiêu", "Status", "Ngày"]}
            rows={courseApps.map((a) => [
              String(a.name),
              String(a.email),
              String(a.phone || "-"),
              String(a.course_slug),
              truncate(String(a.motivation || "-"), 60),
              String(a.status || "pending"),
              formatDate(a.created_at),
            ])}
          />
        </>
      )}

      {tab === "newsletter" && (
        <>
          <FilterBar action="/account/admin/leads" hidden={[{ name: "tab", value: "newsletter" }]}>
            <Field label="Tìm email"><input name="q" defaultValue={sp.q || ""} placeholder="..." className="input-dark" /></Field>
          </FilterBar>

          <DataTable
            count={newsletter.length}
            cols={["Email", "Source", "Trạng thái", "Tags", "Ngày đăng ký"]}
            rows={newsletter.map((n) => [
              String(n.email),
              String(n.source || "-"),
              n.subscribed ? "Active" : "Unsubscribed",
              Array.isArray(n.tags) ? n.tags.join(", ") : "-",
              formatDate(n.created_at),
            ])}
          />
        </>
      )}
    </div>
  );
}

function formatDate(d: unknown) {
  return new Date(String(d)).toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" });
}
function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n) + "..." : s;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[0.72rem] uppercase tracking-wider font-medium mb-1.5" style={{ color: "var(--ink-mute)" }}>{label}</span>
      {children}
    </label>
  );
}

function FilterBar({ action, hidden = [], children }: { action: string; hidden?: Array<{ name: string; value: string }>; children: React.ReactNode }) {
  return (
    <form method="get" action={action} className="rounded-xl border p-4 space-y-3" style={{ background: "rgba(8,16,43,0.55)", borderColor: "rgba(255,255,255,0.08)" }}>
      {hidden.map((h) => <input key={h.name} type="hidden" name={h.name} value={h.value} />)}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">{children}</div>
      <div className="flex gap-2">
        <button className="px-4 py-2 rounded-md text-[0.85rem] font-semibold text-white" style={{ background: "var(--grad-primary)" }}>Áp dụng</button>
        <Link href={action + (hidden[0] ? `?${hidden[0].name}=${hidden[0].value}` : "")} className="px-4 py-2 rounded-md text-[0.85rem] font-medium text-white/80 border" style={{ borderColor: "rgba(255,255,255,0.15)" }}>Reset</Link>
      </div>
    </form>
  );
}

function DataTable({ cols, rows, count }: { cols: string[]; rows: string[][]; count: number }) {
  return (
    <>
      <div className="text-[0.78rem]" style={{ color: "var(--ink-mute)" }}>Hiển thị {count} record</div>
      {rows.length === 0 ? (
        <div className="rounded-xl border px-6 py-12 text-center text-[0.9rem]" style={{ borderColor: "rgba(255,255,255,0.08)", color: "var(--ink-mute)" }}>
          Không có data khớp filter.
        </div>
      ) : (
        <div className="rounded-xl border overflow-x-auto" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <table className="w-full text-[0.85rem]">
            <thead style={{ background: "rgba(255,255,255,0.04)" }}>
              <tr>
                {cols.map((c) => (
                  <th key={c} className="text-left px-4 py-3 font-semibold text-[0.74rem] uppercase tracking-wider whitespace-nowrap" style={{ color: "var(--ink-mute)" }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t hover:bg-white/[0.02]" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  {r.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-white align-top">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
