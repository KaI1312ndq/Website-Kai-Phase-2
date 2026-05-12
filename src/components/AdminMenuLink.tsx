"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const ADMIN_EMAILS = new Set<string>([
  "qforwork13@gmail.com",
  "quangkenno13122003@gmail.com",
]);

export default function AdminMenuLink({ mobile = false }: { mobile?: boolean }) {
  const { user, isLoaded } = useUser();
  if (!isLoaded || !user) return null;
  const emails = (user.emailAddresses || []).map((e) => e.emailAddress.toLowerCase());
  const isAdmin = emails.some((e) => ADMIN_EMAILS.has(e));
  if (!isAdmin) return null;

  if (mobile) {
    return (
      <Link
        href="/account/admin"
        className="block px-4 py-3 text-[0.95rem] font-semibold text-white border-t"
        style={{ borderColor: "var(--st-08)", background: "rgba(122,169,255,0.08)" }}
      >
        Admin Dashboard
      </Link>
    );
  }

  return (
    <Link
      href="/account/admin"
      className="hidden md:inline-flex items-center px-3 py-1.5 rounded-md text-[0.78rem] font-semibold border transition"
      style={{
        background: "rgba(122,169,255,0.10)",
        borderColor: "rgba(122,169,255,0.35)",
        color: "#7da9ff",
      }}
    >
      Admin
    </Link>
  );
}
