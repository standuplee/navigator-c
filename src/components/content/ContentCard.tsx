import Image from "next/image";
import type { CardItem } from "@/types/components";

export function ContentCard({ item }: { item: CardItem }) {
  const body = <>{item.image && <div className="content-card__visual"><Image src={item.image.src} alt={item.image.alt ?? ""} fill sizes="(max-width: 768px) 100vw, 33vw" /></div>}<div className="content-card__body">{item.eyebrow && <span>{item.eyebrow}</span>}<h3>{item.title}</h3>{item.description && <p>{item.description}</p>}{item.tags?.length ? <div className="content-card__tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div> : null}</div></>;
  return item.href ? <a className="content-card" href={item.href}>{body}</a> : <article className="content-card">{body}</article>;
}
