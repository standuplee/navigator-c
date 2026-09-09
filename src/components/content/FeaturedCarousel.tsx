"use client";

import { useState } from "react";
import { ContentCard } from "./ContentCard";
import type { CardItem } from "@/types/components";

export function FeaturedCarousel({ items, visible = 3 }: { items: CardItem[]; visible?: number }) {
  const [offset, setOffset] = useState(0); const max = Math.max(0, items.length - visible);
  return <section className="content-featured-carousel"><div className="content-featured-carousel__track">{items.slice(offset, offset + visible).map((item) => <ContentCard key={item.id} item={item} />)}</div><div className="content-featured-carousel__controls"><button type="button" disabled={offset === 0} onClick={() => setOffset((v) => Math.max(0, v - 1))}>이전</button><button type="button" disabled={offset === max} onClick={() => setOffset((v) => Math.min(max, v + 1))}>다음</button></div></section>;
}
