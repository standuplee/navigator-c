import Image from "next/image";
import type { HeroProps } from "@/types/components";

export function HeroSection({ eyebrow, title, description, image, cta }: HeroProps) {
  return <section className="grid min-h-[520px] grid-cols-1 bg-zinc-100 md:grid-cols-2"><div className="flex flex-col justify-center p-8 md:p-16 lg:p-28">{eyebrow && <span className="text-sm text-zinc-500">{eyebrow}</span>}<h1 className="my-3 text-5xl font-semibold tracking-tight md:text-7xl">{title}</h1>{description && <p className="max-w-xl leading-7 text-zinc-600">{description}</p>}{cta && <a className="mt-7 font-semibold" href={cta.href}>{cta.label}</a>}</div>{image && <div className="relative min-h-72 overflow-hidden"><Image src={image.src} alt={image.alt ?? ""} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div>}</section>;
}
