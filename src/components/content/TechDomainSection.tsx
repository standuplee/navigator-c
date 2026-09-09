import type { CardItem } from "@/types/components";

export function TechDomainSection({ title, description, items, href }: { title: string; description: string; items: CardItem[]; href?: string }) {
  return <section className="content-tech-domain"><header><h2>{title}</h2><p>{description}</p>{href && <a href={href}>자세히 보기</a>}</header><div className="content-tech-domain__items">{items.map((item) => <article key={item.id}><span>{item.eyebrow}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>;
}
