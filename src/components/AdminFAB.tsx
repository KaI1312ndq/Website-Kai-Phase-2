import { cookies } from "next/headers";
import Link from "next/link";

const ADMIN_SECRET = process.env.SEED_SECRET || "kai-seed-2026";

/**
 * Floating admin button - only renders when admin_session cookie is present.
 * Server component reads cookie -> client never sees this for non-admins.
 */
export default async function AdminFAB() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (session !== ADMIN_SECRET) return null;

  return (
    <Link href="/admin/posts" title="Blog Admin" aria-label="Blog Admin"
      style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 9999,
        width: 52, height: 52, borderRadius: 14,
        background: "linear-gradient(135deg, #146ef5 0%, #7a3dff 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        textDecoration: "none",
        boxShadow: "0 8px 32px rgba(20,110,245,0.45), 0 2px 6px rgba(0,0,0,0.3)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        border: "1px solid rgba(255,255,255,0.15)",
        color: "#fff",
      }}
      className="admin-fab">
      {/* Pencil/edit SVG icon - no emoji */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
      <style>{`
        .admin-fab:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 12px 40px rgba(20,110,245,0.6), 0 4px 10px rgba(0,0,0,0.4); }
      `}</style>
    </Link>
  );
}
