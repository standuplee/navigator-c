import type { ElementType, ReactNode } from "react";

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^\)]+\))/g).map((part, i) => {
    if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={i}>{part.slice(1, -1)}</em>;
    const link = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
    return link ? <a key={i} href={link[2]}>{link[1]}</a> : part;
  });
}

/** Tiny markdown-ish renderer for story bodies (docs/DATABASE_PLAN.md keeps the
 * Markdown source authoritative). No external deps. */
export function MarkdownRenderer({ markdown }: { markdown: string }) {
  const blocks = markdown.trim().split(/\n{2,}/);
  return (
    <div className="space-y-4 text-base leading-relaxed text-zinc-700 [&_a]:text-zinc-900 [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-zinc-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-zinc-900 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-zinc-900 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-zinc-900 [&_li]:ml-1 [&_ul]:list-disc [&_ul]:pl-5">
      {blocks.map((block, index) => {
        const lines = block.split("\n");
        if (/^#{1,4} /.test(lines[0])) {
          const level = Math.min(4, lines[0].match(/^#+/)![0].length);
          const Heading = `h${level}` as ElementType;
          return <Heading key={index}>{inline(lines[0].replace(/^#{1,4} /, ""))}</Heading>;
        }
        if (lines[0].startsWith("> ")) return <blockquote key={index}>{inline(lines.join("\n").replace(/^> /, ""))}</blockquote>;
        if (lines.every((line) => /^[-*] /.test(line))) return <ul key={index}>{lines.map((line) => <li key={line}>{inline(line.replace(/^[-*] /, ""))}</li>)}</ul>;
        return <p key={index}>{inline(lines.join(" "))}</p>;
      })}
    </div>
  );
}
