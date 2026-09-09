import type { ElementType, ReactNode } from "react";

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^\)]+\))/g).map((part, i) => {
    if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={i}>{part.slice(1, -1)}</em>;
    const link = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
    return link ? <a key={i} href={link[2]}>{link[1]}</a> : part;
  });
}

export function MarkdownRenderer({ markdown }: { markdown: string }) {
  const blocks = markdown.trim().split(/\n{2,}/);
  return <div className="markdown-content">{blocks.map((block, index) => {
    const lines = block.split("\n");
    if (/^#{1,4} /.test(lines[0])) { const level = Math.min(4, lines[0].match(/^#+/)![0].length); const Heading = `h${level}` as ElementType; return <Heading key={index}>{inline(lines[0].replace(/^#{1,4} /, ""))}</Heading>; }
    if (lines[0].startsWith("> ")) return <blockquote key={index}>{inline(lines.join("\n").replace(/^> /, ""))}</blockquote>;
    if (lines.every((line) => /^[-*] /.test(line))) return <ul key={index}>{lines.map((line) => <li key={line}>{inline(line.replace(/^[-*] /, ""))}</li>)}</ul>;
    return <p key={index}>{inline(lines.join(" "))}</p>;
  })}</div>;
}
