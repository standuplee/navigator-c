import { ContentCard } from "./ContentCard";
import type { CardItem } from "@/types/components";
import { cn } from "@/lib/utils";

export function CardGallery({ items, columns = 3 }: { items: CardItem[]; columns?: 1 | 2 | 3 | 4 }) {
  return <section className={cn("grid gap-6", columns === 1 && "grid-cols-1", columns === 2 && "grid-cols-1 md:grid-cols-2", columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3", columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4")}>{items.map((item) => <ContentCard key={item.id} item={item} />)}</section>;
}
