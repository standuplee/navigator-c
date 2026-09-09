import type { TimelineItem } from "@/types/components";

export function Timeline({ items }: { items: TimelineItem[] }) {
  return <ol className="content-timeline">{items.map((item) => <li key={`${item.year}-${item.title}`}><time>{item.year}</time><div><h3>{item.title}</h3>{item.description && <p>{item.description}</p>}</div></li>)}</ol>;
}
