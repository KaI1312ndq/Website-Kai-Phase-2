import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import { isAdmin } from "@/lib/admin";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Admin · Leads",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

async function getAll() {
  const sb = getSupabaseAdmin();
  const [quizLeads, courseApps, newsletter] = await Promise.all([
    sb.from("quiz_leads").select("*").order("created_at", { ascending: false }).limit(200),
    sb.from("course_applications").select("*").order("created_at", { ascending: false }).limit(200),
    sb.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }).limit(500),
  ]);
  return {
    quizLeads: quizLeads.data || [],
    courseApps: courseApps.data || [],
    newsletter: newsletter.data || [],
  };
}

export default async function AdminLeadsPage() {
  if (!(await isAdmin())) redirect("/");
  const { quizLeads, courseApps, newsletter } = await getAll();

  return (
    <>
      <Navbar />
      <GradientBlobs blobs={[{ variant: "blue", size: 480, top: "-20%", right: "-5%" }, { variant: "purple", size: 400, bottom: "-30%", left: "-5%", delay: "2s" }]} />
      <main className="relative max-w-[1200px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <Link href="/account/admin" className="text-[0.8rem]" style={{ color: "#7da9ff" }}>&larr; Dashboard</Link>
        <h1 className="t-h2 text-white mt-2 mb-8">Leads</h1>

        {/* Quiz leads */}
        <section id="quiz" className="mb-12">
          <h2 className="text-[1.2rem] font-bold text-white mb-4">Quiz leads ({quizLeads.length})</h2>
          <DataTable
            cols={["Tên", "Email", "Phone", "Quiz", "Result", "Ngày"]}
            rows={quizLeads.map((l) => [
              String(l.name),
              String(l.email || "-"),
              String(l.phone || "-"),
              String(l.quiz_slug),
              String(l.result_type || "-"),
              new Date(String(l.created_at)).toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" }),
            ])}
          />
        </section>

        {/* Course apps */}
        <section id="courses" className="mb-12">
          <h2 className="text-[1.2rem] font-bold text-white mb-4">Course applications ({courseApps.length})</h2>
          <DataTable
            cols={["Tên", "Email", "Phone", "Course", "Status", "Ngày"]}
            rows={courseApps.map((a) => [
              String(a.name),
              String(a.email),
              String(a.phone || "-"),
              String(a.course_slug),
              String(a.status || "pending"),
              new Date(String(a.created_at)).toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" }),
            ])}
          />
        </section>

        {/* Newsletter */}
        <section id="newsletter">
          <h2 className="text-[1.2rem] font-bold text-white mb-4">Newsletter ({newsletter.length})</h2>
          <DataTable
            cols={["Email", "Source", "Subscribed", "Ngày"]}
            rows={newsletter.map((n) => [
              String(n.email),
              String(n.source || "-"),
              n.subscribed ? "✓" : "✗",
              new Date(String(n.created_at)).toLocaleDateString("vi-VN"),
            ])}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

function DataTable({ cols, rows }: { cols: string[]; rows: string[][] }) {
  if (rows.length === 0) {
    return <div className="p-6 rounded-xl border text-center" style={{ borderColor: "rgba(255,255,255,0.08)", color: "var(--ink-mute)" }}>Chưa có data.</div>;
  }
  return (
    <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <table className="w-full text-[0.85rem]">
        <thead style={{ background: "rgba(255,255,255,0.04)" }}>
          <tr>
            {cols.map((c) => (
              <th key={c} className="text-left px-4 py-3 font-semibold text-[0.78rem] uppercase tracking-wider" style={{ color: "var(--ink-mute)" }}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              {r.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-white text-[0.85rem]">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
