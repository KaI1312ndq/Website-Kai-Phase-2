/**
 * Extract Q&A pairs from Sanity Portable Text body for FAQPage schema.org markup.
 *
 * Heuristics:
 *   - H2/H3 ending with "?" -> Question
 *   - Following 1-3 paragraphs -> Answer (joined)
 *   - Min 2 Q&A pairs to emit FAQPage schema (Google requirement)
 */

type FAQ = { question: string; answer: string };

function blockText(block: any): string {
  if (block?._type !== "block") return "";
  return (block.children || [])
    .filter((c: any) => c?._type === "span")
    .map((c: any) => c.text)
    .join("")
    .trim();
}

export function extractFAQs(body: any[]): FAQ[] {
  if (!Array.isArray(body)) return [];

  const faqs: FAQ[] = [];

  for (let i = 0; i < body.length; i++) {
    const block = body[i];
    if (block?._type !== "block") continue;
    if (block.style !== "h2" && block.style !== "h3") continue;

    const heading = blockText(block);
    if (!heading.endsWith("?")) continue;

    // Collect following paragraphs until next heading
    const answerParts: string[] = [];
    for (let j = i + 1; j < body.length; j++) {
      const next = body[j];
      if (next?._type !== "block") break;
      if (next.style === "h2" || next.style === "h3") break;
      if (next.style !== "normal" && next.style !== "blockquote") continue;
      const text = blockText(next);
      if (text) answerParts.push(text);
      // Take max 3 paragraphs as answer
      if (answerParts.length >= 3) break;
    }

    if (answerParts.length === 0) continue;
    const answer = answerParts.join(" ").slice(0, 1000);

    faqs.push({ question: heading, answer });
  }

  return faqs;
}

export function buildFAQPageSchema(faqs: FAQ[]) {
  if (faqs.length < 2) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}
