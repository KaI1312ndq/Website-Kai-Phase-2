"use client";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { slugify } from "@/lib/blog/headings";

/**
 * Wrap PortableText with custom block components:
 * - h2 / h3 emit deterministic IDs cho TOC anchor
 * - tableBlock  render HTML <table> với border + zebra stripes
 * - externalImage  render <figure> với <img> + caption + credit
 */
export default function PortableTextWithIds({ value }: { value: any }) {
  // Track occurrence count per slug to disambiguate duplicates (matches extractHeadings logic)
  const seen = new Map<string, number>();

  const components: PortableTextComponents = {
    block: {
      h2: ({ children, value }: any) => {
        const text = (value?.children || []).map((c: any) => c.text).join("").trim();
        let id = slugify(text);
        const count = seen.get(id) || 0;
        seen.set(id, count + 1);
        if (count > 0) id = `${id}-${count + 1}`;
        return <h2 id={id} className="scroll-mt-24">{children}</h2>;
      },
      h3: ({ children, value }: any) => {
        const text = (value?.children || []).map((c: any) => c.text).join("").trim();
        let id = slugify(text);
        const count = seen.get(id) || 0;
        seen.set(id, count + 1);
        if (count > 0) id = `${id}-${count + 1}`;
        return <h3 id={id} className="scroll-mt-24">{children}</h3>;
      },
    },
    types: {
      tableBlock: ({ value }: any) => {
        const headers: string[] = Array.isArray(value?.headers) ? value.headers : [];
        const rows: Array<{ cells: string[] }> = Array.isArray(value?.rows) ? value.rows : [];
        if (rows.length === 0) return null;
        return (
          <figure className="my-7 overflow-x-auto rounded-xl border" style={{ borderColor: "var(--line)", background: "rgba(255,255,255,0.025)" }}>
            <table className="w-full text-[0.92rem] border-collapse">
              {headers.length > 0 && (
                <thead>
                  <tr style={{ background: "rgba(20,110,245,0.10)" }}>
                    {headers.map((h, i) => (
                      <th key={i} className="text-left px-4 py-3 font-semibold text-white" style={{ borderBottom: "1px solid rgba(20,110,245,0.25)" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} style={{ background: ri % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    {(Array.isArray(row.cells) ? row.cells : []).map((cell, ci) => (
                      <td key={ci} className="px-4 py-2.5 align-top" style={{ color: ci === 0 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.82)" }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {value?.caption && (
              <figcaption className="px-4 py-2.5 text-[0.78rem] italic" style={{ color: "var(--ink-mute)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
      externalImage: ({ value }: any) => {
        if (!value?.url) return null;
        return (
          <figure className="my-7">
            <div className="rounded-xl overflow-hidden" style={{ background: "var(--grad-primary-soft)", border: "1px solid var(--line)" }}>
              <img
                src={value.url}
                alt={value.alt || ""}
                loading="lazy"
                className="w-full h-auto block"
                style={{ aspectRatio: "16/9", objectFit: "cover" }}
              />
            </div>
            {(value.caption || value.credit) && (
              <figcaption className="mt-2 text-[0.82rem] italic flex items-center justify-between gap-3 flex-wrap" style={{ color: "var(--ink-mute)" }}>
                {value.caption && <span>{value.caption}</span>}
                {value.credit && <span className="text-[0.72rem]">{value.credit}</span>}
              </figcaption>
            )}
          </figure>
        );
      },
    },
  };

  return <PortableText value={value} components={components} />;
}
