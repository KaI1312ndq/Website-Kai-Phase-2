"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

type Tag = { tag: string; count: number };

const COLLAPSED_LIMIT = 8;

export default function TagCloud({
  tags,
  currentTag,
}: {
  tags: Tag[];
  currentTag: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [expanded, setExpanded] = useState(false);

  if (!tags.length) return null;

  function selectTag(tag: string | undefined) {
    const params = new URLSearchParams(searchParams.toString());
    if (!tag) params.delete("tag");
    else params.set("tag", tag);
    params.delete("page");
    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `/blog?${qs}` : "/blog");
    });
  }

  const visible = expanded ? tags : tags.slice(0, COLLAPSED_LIMIT);
  const hidden = tags.length - visible.length;
  const maxCount = Math.max(...tags.map((t) => t.count), 1);

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] mr-1" style={{ color: "rgba(255,255,255,0.45)" }}>
          Hashtag:
        </span>
        {currentTag && (
          <button
            onClick={() => selectTag(undefined)}
            className="text-[0.78rem] font-medium px-2.5 py-1 rounded-md transition-all hover:bg-white/10"
            style={{ background: "rgba(20,110,245,0.18)", border: "1px solid rgba(20,110,245,0.45)", color: "white" }}
          >
            #{currentTag} <span style={{ opacity: 0.6, marginLeft: 4 }}>×</span>
          </button>
        )}
        {visible.map((t) => {
          const isActive = currentTag === t.tag;
          if (isActive) return null;
          // Size scaling by frequency
          const sizeRatio = t.count / maxCount;
          const fontSize = 0.72 + sizeRatio * 0.16;
          return (
            <button
              key={t.tag}
              onClick={() => selectTag(t.tag)}
              className="font-medium px-2.5 py-1 rounded-md transition-all hover:bg-white/10"
              style={{
                fontSize: `${fontSize}rem`,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              #{t.tag}
              <span className="ml-1" style={{ opacity: 0.45, fontSize: "0.7rem" }}>{t.count}</span>
            </button>
          );
        })}
        {!expanded && hidden > 0 && (
          <button
            onClick={() => setExpanded(true)}
            className="text-[0.78rem] font-medium px-2.5 py-1 rounded-md transition-all hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.55)" }}
          >
            +{hidden} hashtag khác
          </button>
        )}
      </div>
    </div>
  );
}
