import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Admin · Comments",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

type SearchParams = { q?: string; approved?: string };

async function fetchComments(sp: SearchParams) {
  const sb = getSupabaseAdmin();
  let qb = sb.from("comments").select("*").order("created_at", { ascending: false }).limit(300);
  if (sp.approved === "yes") qb = qb.eq("approved", true);
  else if (sp.approved === "no") qb = qb.eq("approved", false);
  if (sp.q && sp.q.trim()) {
    const q = sp.q.trim().replace(/[%,]/g, "");
    qb = qb.or(`body.ilike.%${q}%,guest_name.ilike.%${q}%,guest_email.ilike.%${q}%`);
  }
  return (await qb).data || [];
}

export default async function AdminCommentsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const comments = await fetchComments(sp);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="t-h2 text-white mb-1">Comments</h1>
        <p className="text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>
          Bình luận trên blog. Có thể approve/unapprove qua Supabase Studio.
        </p>
      </header>

      <form method="get" action="/account/admin/comments" className="rounded-xl border p-4 space-y-3" style={{ background: "rgba(8,16,43,0.55)", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <label className="block">
            <span className="block text-[0.72rem] uppercase tracking-wider font-medium mb-1.5" style={{ color: "var(--ink-mute)" }}>Tìm kiếm</span>
            <input name="q" defaultValue={sp.q || ""} placeholder="Nội dung / tên / email..." className="input-dark" />
          </label>
          <label className="block">
            <span className="block text-[0.72rem] uppercase tracking-wider font-medium mb-1.5" style={{ color: "var(--ink-mute)" }}>Trạng thái duyệt</span>
            <select name="approved" defaultValue={sp.approved || ""} className="input-dark">
              <option value="">Tất cả</option>
              <option value="yes">Đã duyệt</option>
              <option value="no">Chờ duyệt</option>
            </select>
          </label>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-md text-[0.85rem] font-semibold text-white" style={{ background: "var(--grad-primary)" }}>Áp dụng</button>
          <Link href="/account/admin/comments" className="px-4 py-2 rounded-md text-[0.85rem] font-medium text-white/80 border" style={{ borderColor: "rgba(255,255,255,0.15)" }}>Reset</Link>
        </div>
      </form>

      <div className="text-[0.78rem]" style={{ color: "var(--ink-mute)" }}>Hiển thị {comments.length} comment</div>

      <div className="space-y-3">
        {comments.length === 0 ? (
          <div className="rounded-xl border px-6 py-12 text-center text-[0.9rem]" style={{ borderColor: "rgba(255,255,255,0.08)", color: "var(--ink-mute)" }}>
            Không có comment nào khớp filter.
          </div>
        ) : (
          comments.map((c) => (
            <div key={c.id as string} className="rounded-xl border p-4" style={{ background: "rgba(8,16,43,0.5)", borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-[0.92rem]">{String(c.guest_name || "User")}</span>
                  {c.guest_email && <span className="text-[0.74rem]" style={{ color: "var(--ink-mute)" }}>· {String(c.guest_email)}</span>}
                  <span className="px-2 py-0.5 rounded text-[0.68rem] font-semibold" style={{
                    background: c.approved ? "rgba(95,255,170,0.13)" : "rgba(255,212,121,0.13)",
                    color: c.approved ? "#5fffaa" : "#ffd479",
                  }}>
                    {c.approved ? "Đã duyệt" : "Chờ duyệt"}
                  </span>
                </div>
                <span className="text-[0.72rem]" style={{ color: "var(--ink-mute)" }}>
                  {new Date(c.created_at as string).toLocaleString("vi-VN")}
                </span>
              </div>
              <div className="text-[0.9rem] text-white/85 whitespace-pre-line mb-2">{String(c.body)}</div>
              <div className="text-[0.7rem] font-mono" style={{ color: "var(--ink-mute)" }}>
                Post: {String(c.post_sanity_id)}
                {c.parent_id ? <> · Reply to {String(c.parent_id).slice(0, 8)}</> : null}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
