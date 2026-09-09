"use client";

import { useState } from "react";
import type { CardItem } from "@/types/components";

export function TickerCarousel({ items }: { items: CardItem[] }) {
  const [index, setIndex] = useState(0); const item = items[index];
  if (!item) return null;
  return <section className="content-ticker"><div><span>{item.eyebrow}</span><strong>{item.title}</strong>{item.description && <p>{item.description}</p>}</div><div className="content-ticker__controls"><button type="button" disabled={index === 0} onClick={() => setIndex((v) => Math.max(0, v - 1))}>이전</button><span>{index + 1} / {items.length}</span><button type="button" disabled={index === items.length - 1} onClick={() => setIndex((v) => Math.min(items.length - 1, v + 1))}>다음</button></div></section>;
}
