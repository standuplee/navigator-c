import { ContentCard } from "./ContentCard";
import type { CardItem } from "@/types/components";

export function RelatedContent({ items }: { items: CardItem[] }) {
  return <section className="content-related"><h2>연관 콘텐츠</h2><div className="content-related__grid">{items.map((item) => <ContentCard key={item.id} item={item} />)}</div></section>;
}
