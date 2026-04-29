import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "var(--dark)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      className="px-12 py-7 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-[0.78rem]" style={{ color: "rgba(255,255,255,0.25)" }}>
        © 2026 Nguyễn Đức Quảng. All rights reserved.
      </p>
      <div className="flex gap-6">
        {[
          { label: "LinkedIn", href: "https://www.linkedin.com/in/duc-quang-nguyen-b7495223a/" },
          { label: "Blog", href: "/blog" },
          { label: "Email", href: "mailto:qforwork13@gmail.com" },
        ].map((l) => (
          <a key={l.href} href={l.href}
            className="text-[0.78rem] transition-colors hover:text-blue-300"
            style={{ color: "rgba(255,255,255,0.3)" }}>
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
