import type { TimelineItem } from "@/types/components";

export function Timeline({ items }: { items: TimelineItem[] }) {
  return <ol className="m-0 list-none p-0">{items.map((item) => <li className="grid grid-cols-[80px_1fr] gap-6 border-b border-zinc-200 py-6 md:grid-cols-[120px_1fr]" key={`${item.year}-${item.title}`}><time className="font-semibold">{item.year}</time><div><h3 className="m-0 font-semibold">{item.title}</h3>{item.description && <p className="mt-2 text-zinc-600">{item.description}</p>}</div></li>)}</ol>;
}
