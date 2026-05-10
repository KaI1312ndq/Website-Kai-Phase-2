"use client";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { slugify } from "@/lib/blog/headings";

/**
 * Wrap PortableText with custom h2/h3 components that emit deterministic IDs
 * matching what `extractHeadings` generates (so TOC anchors work).
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
  };

  return <PortableText value={value} components={components} />;
}
