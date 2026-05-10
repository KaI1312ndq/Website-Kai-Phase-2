/**
 * Convert lightweight markdown content into Sanity Portable Text blocks.
 * Supports:
 *   - "## " H2 heading
 *   - "### " H3 heading
 *   - "> " blockquote
 *   - "**bold**" inline marks
 *   - Plain paragraphs separated by blank lines
 * Bullets: prefix with "• " — rendered as normal blocks (schema doesn't have list type).
 */

type Span = { _type: "span"; _key: string; text: string; marks: string[] };

type Block = {
  _type: "block";
  _key: string;
  style: "normal" | "h2" | "h3" | "blockquote";
  markDefs: never[];
  children: Span[];
};

function parseInline(text: string, keyPrefix: string): Span[] {
  const spans: Span[] = [];
  const re = /\*\*([^*]+)\*\*/g;
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      spans.push({ _type: "span", _key: `${keyPrefix}s${i++}`, text: text.slice(last, m.index), marks: [] });
    }
    spans.push({ _type: "span", _key: `${keyPrefix}s${i++}`, text: m[1], marks: ["strong"] });
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    spans.push({ _type: "span", _key: `${keyPrefix}s${i++}`, text: text.slice(last), marks: [] });
  }
  if (spans.length === 0) {
    spans.push({ _type: "span", _key: `${keyPrefix}s0`, text, marks: [] });
  }
  return spans;
}

export function mdToBlocks(prefix: string, markdown: string): Block[] {
  const sections = markdown
    .trim()
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  return sections.map((sec, i) => {
    const key = `${prefix}${i}`;
    let style: Block["style"] = "normal";
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
    return {
      _type: "block",
      _key: key,
      style,
      markDefs: [],
      children: parseInline(text, key),
    };
  });
}
