import { cookies } from "next/headers";
import Link from "next/link";

const ADMIN_SECRET = process.env.SEED_SECRET || "kai-seed-2026";

/**
 * Floating admin button - only shows when admin_session cookie is present.
 * Sits at bottom-right, fixed position, above everything else.
 */
export default async function AdminFAB() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (session !== ADMIN_SECRET) return null;

  return (
    <Link
      href="/admin/posts"
      title="Blog Admin (Ctrl+Shift+A)"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        width: 52,
        height: 52,
        borderRadius: 14,
        background: "linear-gradient(135deg, #146ef5 0%, #7a3dff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
        textDecoration: "none",
        boxShadow: "0 8px 32px rgba(20,110,245,0.45), 0 2px 6px rgba(0,0,0,0.3)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        border: "1px solid rgba(255,255,255,0.15)",
      }}
      className="admin-fab"
    >
      <span style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}>✍️</span>
      <style>{`
        .admin-fab:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 12px 40px rgba(20,110,245,0.6), 0 4px 10px rgba(0,0,0,0.4); }
      `}</style>
    </Link>
  );
}
