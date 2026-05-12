"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, FormEvent } from "react";

type CategoryOption = { value: string; label: string; count: number };

export default function BlogFilterBar({
  categories,
  currentCategory,
  currentSearch,
}: {
  categories: CategoryOption[];
  currentCategory: string;
  currentSearch: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(currentSearch);
  const [, startTransition] = useTransition();

  function navigate(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (!v || v === "all") params.delete(k);
      else params.set(k, v);
    });
    // Reset to page 1 when filters change
    params.delete("page");
    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `/blog?${qs}` : "/blog");
    });
  }

  function onSearchSubmit(e: FormEvent) {
    e.preventDefault();
    navigate({ q: search.trim() || undefined });
  }

  return (
    <div className="flex flex-col gap-5 mb-12">
      {/* Search bar */}
      <form onSubmit={onSearchSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--st-40)" }}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm bài viết theo từ khoá..."
            className="w-full pl-11 pr-4 py-3 rounded-xl text-[0.95rem] outline-none transition-all"
            style={{ border: "1px solid var(--st-10)", background: "var(--st-03)", color: "var(--ink)" }}
          />
          {search && (
            <button
              type="button"
              onClick={() => { setSearch(""); navigate({ q: undefined }); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.78rem] px-2 py-1 rounded-md transition-all"
              style={{ background: "var(--st-05)", color: "var(--st-70)" }}
            >
              Xoá
            </button>
          )}
        </div>
        <button type="submit" className="px-6 py-3 rounded-xl text-[0.9rem] font-semibold text-white transition-all" style={{ background: "var(--grad-primary)" }}>
          Tìm
        </button>
      </form>

      {/* Category chips */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] mr-1" style={{ color: "var(--st-45)" }}>Chủ đề:</span>
        {categories.map((c) => {
          const isActive = currentCategory === c.value;
          return (
            <button
              key={c.value}
              onClick={() => navigate({ category: c.value })}
              className="px-3.5 py-1.5 rounded-full text-[0.82rem] font-semibold transition-all"
              style={{
                background: isActive ? "rgba(20,110,245,0.20)" : "var(--st-04)",
                border: `1px solid ${isActive ? "rgba(20,110,245,0.5)" : "var(--st-08)"}`,
                color: isActive ? "white" : "var(--st-70)",
              }}
            >
              {c.label}
              {c.count > 0 && (
                <span className="ml-1.5 text-[0.72rem]" style={{ color: isActive ? "var(--st-65)" : "var(--st-40)" }}>
                  {c.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
