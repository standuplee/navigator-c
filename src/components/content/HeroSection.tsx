import Image from "next/image";
import type { HeroProps } from "@/types/components";

export function HeroSection({ eyebrow, title, description, image, cta }: HeroProps) {
  return <section className="content-hero"><div className="content-hero__copy">{eyebrow && <span>{eyebrow}</span>}<h1>{title}</h1>{description && <p>{description}</p>}{cta && <a href={cta.href}>{cta.label}</a>}</div>{image && <div className="content-hero__visual"><Image src={image.src} alt={image.alt ?? ""} fill sizes="(max-width: 768px) 100vw, 50vw" /></div>}</section>;
}
