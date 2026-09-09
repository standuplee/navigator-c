import { ContentCard } from "./ContentCard";
import type { CardItem } from "@/types/components";

export function CardGallery({ items, columns = 3 }: { items: CardItem[]; columns?: 1 | 2 | 3 | 4 }) {
  return <section className={`content-card-gallery content-card-gallery--${columns}`}>{items.map((item) => <ContentCard key={item.id} item={item} />)}</section>;
}
