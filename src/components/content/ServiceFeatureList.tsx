import type { CardItem } from "@/types/components";

export function ServiceFeatureList({ items }: { items: CardItem[] }) {
  return <ol className="content-service-feature-list">{items.map((item, index) => <li key={item.id}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3>{item.eyebrow && <small>{item.eyebrow}</small>}{item.description && <p>{item.description}</p>}{item.href && <a href={item.href}>자세히 보기</a>}</li>)}</ol>;
}
