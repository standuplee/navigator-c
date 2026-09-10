import Image from "next/image";
import type { CardItem } from "@/types/components";
import { cn } from "@/lib/utils";

export function ContentCard({ item }: { item: CardItem }) {
  const body = <>{item.image && <div className="relative aspect-[16/9] overflow-hidden"><Image src={item.image.src} alt={item.image.alt ?? ""} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-105" /></div>}<div className="min-h-48 p-6">{item.eyebrow && <span className="text-sm text-zinc-500">{item.eyebrow}</span>}<h3 className="mt-2 text-xl font-semibold tracking-tight">{item.title}</h3>{item.description && <p className="mt-3 leading-7 text-zinc-600">{item.description}</p>}{item.tags?.length ? <div className="mt-5 flex flex-wrap gap-1.5">{item.tags.map((tag) => <span className="rounded bg-zinc-200 px-2 py-1 text-xs text-zinc-600" key={tag}>{tag}</span>)}</div> : null}</div></>;
  const className = cn("group block overflow-hidden rounded-lg bg-zinc-100 text-inherit transition-transform duration-200 hover:-translate-y-1", !item.image && "min-h-48");
  return item.href ? <a className={className} href={item.href}>{body}</a> : <article className={className}>{body}</article>;
}
