import Image from "next/image";
import type { BannerProps } from "@/types/components";
import { cn } from "@/lib/utils";

export function Banner({ title, description, image, href, tone = "light" }: BannerProps) {
  const toneClass = { light: "bg-zinc-100 text-zinc-900", dark: "bg-slate-950 text-white", green: "bg-emerald-500 text-white" }[tone];
  const content = <><div className="relative z-10 max-w-xl"><h2 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h2>{description && <p className="mt-3 leading-7 opacity-80">{description}</p>}</div>{image && <Image src={image.src} alt={image.alt ?? ""} fill sizes="100vw" className="object-cover" />}</>;
  return href ? <a className={cn("relative flex min-h-64 items-center overflow-hidden p-8 md:p-12", toneClass)} href={href}>{content}</a> : <section className={cn("relative flex min-h-64 items-center overflow-hidden p-8 md:p-12", toneClass)}>{content}</section>;
}
