import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: {
  currentPage: number;
  totalPages: number;
  baseUrl: string; // e.g. "/blog?category=tiktok&q=hello"
}) {
  if (totalPages <= 1) return null;

  function urlForPage(p: number): string {
    const url = new URL(baseUrl, "https://placeholder.local");
    if (p === 1) url.searchParams.delete("page");
    else url.searchParams.set("page", String(p));
    const qs = url.searchParams.toString();
    return qs ? `${url.pathname}?${qs}` : url.pathname;
  }

  // Build page list with ellipsis: 1 ... (cur-1) cur (cur+1) ... last
  const pages: (number | "...")[] = [];
  const showRange = 1;
  const start = Math.max(2, currentPage - showRange);
  const end = Math.min(totalPages - 1, currentPage + showRange);

  pages.push(1);
  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push("...");
  if (totalPages > 1) pages.push(totalPages);

  return (
    <nav aria-label="Phân trang" className="flex items-center justify-center gap-1.5 mt-12 flex-wrap">
      {currentPage > 1 && (
        <Link
          href={urlForPage(currentPage - 1)}
          className="px-3.5 py-2 rounded-lg text-[0.85rem] font-semibold transition-all"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.85)" }}
        >
          ← Trước
        </Link>
      )}

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`e${i}`} className="px-2 text-[0.85rem]" style={{ color: "rgba(255,255,255,0.4)" }}>...</span>
        ) : (
          <Link
            key={p}
            href={urlForPage(p)}
            className="min-w-[40px] h-10 flex items-center justify-center rounded-lg text-[0.88rem] font-semibold transition-all"
            style={{
              background: p === currentPage ? "rgba(20,110,245,0.20)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${p === currentPage ? "rgba(20,110,245,0.5)" : "rgba(255,255,255,0.08)"}`,
              color: p === currentPage ? "white" : "rgba(255,255,255,0.7)",
            }}
          >
            {p}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link
          href={urlForPage(currentPage + 1)}
          className="px-3.5 py-2 rounded-lg text-[0.85rem] font-semibold transition-all"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.85)" }}
        >
          Sau 
        </Link>
      )}
    </nav>
  );
}
