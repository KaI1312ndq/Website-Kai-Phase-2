import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import { isAdmin } from "@/lib/admin";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Admin · Users",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  if (!(await isAdmin())) redirect("/");
  const sb = getSupabaseAdmin();
  const { data: users } = await sb
    .from("users")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  return (
    <>
      <Navbar />
      <GradientBlobs blobs={[{ variant: "blue", size: 480, top: "-20%", right: "-5%" }, { variant: "purple", size: 400, bottom: "-30%", left: "-5%", delay: "2s" }]} />
      <main className="relative max-w-[1200px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <Link href="/account/admin" className="text-[0.8rem]" style={{ color: "#7da9ff" }}>&larr; Dashboard</Link>
        <h1 className="t-h2 text-white mt-2 mb-8">Users ({(users || []).length})</h1>

        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <table className="w-full text-[0.85rem]">
            <thead style={{ background: "rgba(255,255,255,0.04)" }}>
              <tr>
                <Th>Tên</Th><Th>Email</Th><Th>Phone</Th><Th>Role</Th><Th>School</Th><Th>Ngày join</Th>
              </tr>
            </thead>
            <tbody>
              {(users || []).map((u) => (
                <tr key={u.id as string} className="border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <Td>{String(u.name || "(no name)")}</Td>
                  <Td className="font-mono text-[0.78rem]">{String(u.email)}</Td>
                  <Td>{String(u.phone || "-")}</Td>
                  <Td>{String(u.role || "student")}</Td>
                  <Td>{String(u.school || "-")}</Td>
                  <Td className="text-[0.75rem] text-white/60">
                    {new Date(u.created_at as string).toLocaleDateString("vi-VN")}
                  </Td>
                </tr>
              ))}
              {(!users || users.length === 0) && (
                <tr><td colSpan={6} className="px-4 py-12 text-center" style={{ color: "var(--ink-mute)" }}>Chưa có user nào.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left px-4 py-3 font-semibold text-[0.78rem] uppercase tracking-wider" style={{ color: "var(--ink-mute)" }}>{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 text-white ${className}`}>{children}</td>;
}
