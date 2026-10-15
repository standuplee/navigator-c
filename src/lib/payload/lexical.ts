/** Minimal Lexical <-> markdown/plain-text conversion. Not a general-purpose
 * converter — just enough to round-trip this project's placeholder content
 * (paragraphs, headings, bold/italic emphasis, bullet lists, blockquotes) so the
 * seed script can write into Payload's richText field, and the repositories can
 * read it back into the exact string shapes src/types/story.ts and
 * src/types/content.ts already expect (no component changes needed). */

const BOLD = 1;
const ITALIC = 2;

type LexicalTextNode = { type: "text"; text: string; format?: number };
type LexicalElementNode = { type: string; tag?: string; children?: LexicalNode[] };
type LexicalNode = LexicalTextNode | LexicalElementNode;
type LexicalDoc = { root?: { children?: LexicalNode[] } };
type LexicalJSON = { root: Record<string, unknown> };

function isTextNode(node: LexicalNode): node is LexicalTextNode {
  return node.type === "text";
}

function textNode(text: string, format = 0): Record<string, unknown> {
  return { type: "text", version: 1, text, format, detail: 0, mode: "normal", style: "" };
}
function elementNode(type: string, children: Record<string, unknown>[], extra: Record<string, unknown> = {}): Record<string, unknown> {
  return { type, version: 1, children, direction: "ltr", format: "", indent: 0, ...extra };
}

function inlineFromMarkdown(text: string) {
  return text
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith("**")) return textNode(part.slice(2, -2), BOLD);
      if (part.startsWith("*")) return textNode(part.slice(1, -1), ITALIC);
      return textNode(part);
    });
}

function inlineToMarkdown(children: LexicalNode[] = []): string {
  return children
    .map((node) => {
      if (!isTextNode(node)) return "";
      const format = node.format ?? 0;
      let text = node.text;
      if (format & BOLD) text = `**${text}**`;
      if (format & ITALIC) text = `*${text}*`;
      return text;
    })
    .join("");
}

/** Markdown string -> Lexical JSON (seed-script-only; admin edits go through the real editor). */
export function markdownToLexical(markdown: string): LexicalJSON {
  const blocks = markdown.trim().split(/\n{2,}/);
  const children = blocks.map((block) => {
    const lines = block.split("\n");
    const heading = lines[0].match(/^(#{1,4})\s+(.*)$/);
    if (heading) return elementNode("heading", inlineFromMarkdown(heading[2]), { tag: `h${heading[1].length}` });
    if (lines[0].startsWith("> ")) return elementNode("quote", inlineFromMarkdown(lines.map((l) => l.replace(/^> /, "")).join(" ")));
    if (lines.every((l) => /^[-*]\s+/.test(l))) {
      const items = lines.map((l) => elementNode("listitem", inlineFromMarkdown(l.replace(/^[-*]\s+/, "")), { value: 1 }));
      return elementNode("list", items, { listType: "bullet", tag: "ul", start: 1 });
    }
    return elementNode("paragraph", inlineFromMarkdown(lines.join(" ")), { textFormat: 0, textStyle: "" });
  });
  return { root: elementNode("root", children) };
}

/** Plain paragraphs -> Lexical JSON (no inline formatting — matches ArticleDetail.paragraphs). */
export function paragraphsToLexical(paragraphs: string[]): LexicalJSON {
  const children = paragraphs.map((p) => elementNode("paragraph", [textNode(p)], { textFormat: 0, textStyle: "" }));
  return { root: elementNode("root", children) };
}

/** Lexical JSON -> markdown string (mirrors MarkdownRenderer's supported subset). */
export function lexicalToMarkdown(doc: unknown): string {
  const children = (doc as LexicalDoc)?.root?.children ?? [];
  const blocks: string[] = [];
  for (const node of children) {
    const el = node as LexicalElementNode;
    if (el.type === "heading") {
      const level = el.tag ? Number(el.tag.replace("h", "")) : 2;
      blocks.push(`${"#".repeat(Math.min(4, level) || 2)} ${inlineToMarkdown(el.children)}`);
    } else if (el.type === "quote") {
      blocks.push(`> ${inlineToMarkdown(el.children)}`);
    } else if (el.type === "list") {
      blocks.push((el.children ?? []).map((li) => `- ${inlineToMarkdown((li as LexicalElementNode).children)}`).join("\n"));
    } else if (el.type === "paragraph") {
      const text = inlineToMarkdown(el.children);
      if (text.trim()) blocks.push(text);
    }
  }
  return blocks.join("\n\n");
}

/** Lexical JSON -> plain paragraph strings (formatting stripped — matches ArticleDetail.paragraphs). */
export function lexicalToParagraphs(doc: unknown): string[] {
  const children = (doc as LexicalDoc)?.root?.children ?? [];
  return children
    .map((node) => inlineToMarkdown((node as LexicalElementNode).children).trim())
    .filter(Boolean);
}
