/**
 * Convert lightweight markdown into Sanity Portable Text blocks.
 * Supports:
 *   - "## " H2 / "### " H3 headings
 *   - "> " blockquote
 *   - "**bold**" inline marks
 *   - "![alt](url)" standalone-line images -> externalImage block
 *   - "[caption](!url)" - image with caption: `![alt|caption](url)`
 *   - Markdown table: header row + `|---|...|` divider + body rows -> tableBlock
 *   - Plain paragraphs (separated by blank line)
 * Bullets: prefix with "• " - paragraph block (schema doesn't have list type).
 */

type Span = { _type: "span"; _key: string; text: string; marks: string[] };

type LinkMarkDef = { _type: "link"; _key: string; href: string };

type TextBlock = {
  _type: "block";
  _key: string;
  style: "normal" | "h2" | "h3" | "blockquote";
  markDefs: LinkMarkDef[];
  children: Span[];
};

type ExternalImage = {
  _type: "externalImage";
  _key: string;
  url: string;
  alt: string;
  caption?: string;
  credit?: string;
};

type TableBlock = {
  _type: "tableBlock";
  _key: string;
  headers: string[];
  rows: Array<{ _type: "row"; _key: string; cells: string[] }>;
  caption?: string;
};

export type BlogBlock = TextBlock | ExternalImage | TableBlock;

/**
 * Parse inline markdown: **bold** + [text](url) links.
 * Returns spans + markDefs cho link references.
 * Link mark được generate _key unique trong block để Portable Text resolve.
 */
function parseInline(text: string, keyPrefix: string): { spans: Span[]; markDefs: LinkMarkDef[] } {
  const spans: Span[] = [];
  const markDefs: LinkMarkDef[] = [];
  // Combined regex: link OR bold. Link first so [**text**](url) treated as link.
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let i = 0;
  let linkIdx = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      spans.push({ _type: "span", _key: `${keyPrefix}s${i++}`, text: text.slice(last, m.index), marks: [] });
    }
    if (m[1] !== undefined && m[2] !== undefined) {
      // Link match: [text](url)
      const linkKey = `${keyPrefix}lnk${linkIdx++}`;
      markDefs.push({ _type: "link", _key: linkKey, href: m[2] });
      spans.push({ _type: "span", _key: `${keyPrefix}s${i++}`, text: m[1], marks: [linkKey] });
    } else if (m[3] !== undefined) {
      // Bold match: **text**
      spans.push({ _type: "span", _key: `${keyPrefix}s${i++}`, text: m[3], marks: ["strong"] });
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    spans.push({ _type: "span", _key: `${keyPrefix}s${i++}`, text: text.slice(last), marks: [] });
  }
  if (spans.length === 0) {
    spans.push({ _type: "span", _key: `${keyPrefix}s0`, text, marks: [] });
  }
  return { spans, markDefs };
}

/** Match standalone-line image syntax: ![alt](url) or ![alt|caption](url) or ![alt|caption|credit](url) */
const IMAGE_RE = /^!\[([^\]]*)\]\(([^)]+)\)$/;

/** Detect if a section is a markdown table - at least 2 lines, header + |--- divider */
function parseTable(section: string, key: string): TableBlock | null {
  const lines = section.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) return null;
  const headerLine = lines[0];
  const dividerLine = lines[1];
  // Header line must start + end with | and contain at least 1 pipe
  if (!headerLine.startsWith("|") || !headerLine.endsWith("|")) return null;
  // Divider line must be like |---|---|
  if (!/^\|(?:\s*:?-+:?\s*\|)+$/.test(dividerLine)) return null;

  const splitCells = (l: string) => l.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  const headers = splitCells(headerLine);
  const bodyLines = lines.slice(2);
  const rows = bodyLines
    .filter((l) => l.startsWith("|") && l.endsWith("|"))
    .map((l, i) => ({ _type: "row" as const, _key: `${key}r${i}`, cells: splitCells(l) }));

  if (rows.length === 0) return null;

  return {
    _type: "tableBlock",
    _key: key,
    headers,
    rows,
  };
}

function parseImage(section: string, key: string): ExternalImage | null {
  const trimmed = section.trim();
  const m = trimmed.match(IMAGE_RE);
  if (!m) return null;
  const altRaw = m[1] || "";
  const url = m[2] || "";
  if (!url) return null;
  // Allow "alt|caption|credit" inside [...]
  const altParts = altRaw.split("|").map((s) => s.trim());
  return {
    _type: "externalImage",
    _key: key,
    url,
    alt: altParts[0] || "",
    ...(altParts[1] ? { caption: altParts[1] } : {}),
    ...(altParts[2] ? { credit: altParts[2] } : {}),
  };
}

export function mdToBlocks(prefix: string, markdown: string): BlogBlock[] {
  const sections = markdown
    .trim()
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  return sections.map((sec, i) => {
    const key = `${prefix}${i}`;

    // Image first (single line)
    const img = parseImage(sec, key);
    if (img) return img;

    // Table next (multi-line)
    if (sec.includes("|") && sec.includes("\n")) {
      const tbl = parseTable(sec, key);
      if (tbl) return tbl;
    }

    // Heading / blockquote / paragraph
    let style: TextBlock["style"] = "normal";
    let text = sec;
    if (sec.startsWith("## ")) {
      style = "h2";
      text = sec.slice(3);
    } else if (sec.startsWith("### ")) {
      style = "h3";
      text = sec.slice(4);
    } else if (sec.startsWith("> ")) {
      style = "blockquote";
      text = sec.slice(2);
    }
    const { spans, markDefs } = parseInline(text, key);
    return {
      _type: "block",
      _key: key,
      style,
      markDefs,
      children: spans,
    } satisfies TextBlock;
  });
}
