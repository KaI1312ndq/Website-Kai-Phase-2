import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Admin · Users",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

type SearchParams = { q?: string; role?: string };

async function fetchUsers(sp: SearchParams) {
  const sb = getSupabaseAdmin();
  let qb = sb.from("users").select("*").order("created_at", { ascending: false }).limit(500);
  if (sp.q && sp.q.trim()) {
    const q = sp.q.trim().replace(/[%,]/g, "");
    qb = qb.or(`name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%`);
  }
  if (sp.role) qb = qb.eq("role", sp.role);
  return (await qb).data || [];
}

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const users = await fetchUsers(sp);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="t-h2 text-white mb-1">Users</h1>
        <p className="text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>
          User đã đăng ký qua Clerk - sync tự động qua webhook.
        </p>
      </header>

      <form method="get" action="/account/admin/users" className="rounded-xl border p-4 space-y-3" style={{ background: "rgba(8,16,43,0.55)", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <label className="block">
            <span className="block text-[0.72rem] uppercase tracking-wider font-medium mb-1.5" style={{ color: "var(--ink-mute)" }}>Tìm kiếm</span>
            <input name="q" defaultValue={sp.q || ""} placeholder="Tên / email / phone..." className="input-dark" />
          </label>
          <label className="block">
            <span className="block text-[0.72rem] uppercase tracking-wider font-medium mb-1.5" style={{ color: "var(--ink-mute)" }}>Role</span>
            <select name="role" defaultValue={sp.role || ""} className="input-dark">
              <option value="">Tất cả</option>
              <option value="student">Student</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </label>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-md text-[0.85rem] font-semibold text-white" style={{ background: "var(--grad-primary)" }}>Áp dụng</button>
          <Link href="/account/admin/users" className="px-4 py-2 rounded-md text-[0.85rem] font-medium text-white/80 border" style={{ borderColor: "rgba(255,255,255,0.15)" }}>Reset</Link>
        </div>
      </form>

      <div className="text-[0.78rem]" style={{ color: "var(--ink-mute)" }}>Hiển thị {users.length} user</div>

      <div className="rounded-xl border overflow-x-auto" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <table className="w-full text-[0.85rem]">
          <thead style={{ background: "rgba(255,255,255,0.04)" }}>
            <tr>
              <Th>Họ tên</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Role</Th>
              <Th>School</Th>
              <Th>Industry</Th>
              <Th>Clerk ID</Th>
              <Th>Ngày tạo</Th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id as string} className="border-t hover:bg-white/[0.02]" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <Td className="text-white font-medium">{String(u.name || "(no name)")}</Td>
                <Td className="font-mono text-[0.78rem] text-white">{String(u.email)}</Td>
                <Td className="text-white">{String(u.phone || "-")}</Td>
                <Td><RoleBadge role={String(u.role || "student")} /></Td>
                <Td className="text-white">{String(u.school || "-")}</Td>
                <Td className="text-white">{String(u.industry || "-")}</Td>
                <Td className="font-mono text-[0.7rem] text-white/40">{String(u.id).slice(0, 14)}...</Td>
                <Td className="text-[0.74rem] text-white/60 whitespace-nowrap">
                  {new Date(u.created_at as string).toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
                </Td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-12 text-center text-[0.9rem]" style={{ color: "var(--ink-mute)" }}>Không có user nào khớp filter.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left px-4 py-3 font-semibold text-[0.74rem] uppercase tracking-wider whitespace-nowrap" style={{ color: "var(--ink-mute)" }}>{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}

function RoleBadge({ role }: { role: string }) {
  const map: Record<string, string> = { admin: "#ff5a72", manager: "#ffd479", student: "#7da9ff" };
  const color = map[role] || "#7da9ff";
  return <span className="px-2 py-0.5 rounded text-[0.7rem] font-semibold whitespace-nowrap" style={{ background: `${color}22`, color }}>{role}</span>;
}
