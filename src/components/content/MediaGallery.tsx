import Image from "next/image";
import type { ImageSource } from "@/types/components";

export function MediaGallery({ items }: { items: ImageSource[] }) {
  return <div className="content-media-gallery">{items.map((item) => <figure key={item.src}><Image src={item.src} alt={item.alt ?? ""} width={1600} height={900} /><figcaption>{item.caption}</figcaption></figure>)}</div>;
}
