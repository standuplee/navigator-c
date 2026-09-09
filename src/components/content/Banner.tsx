import Image from "next/image";
import type { BannerProps } from "@/types/components";

export function Banner({ title, description, image, href, tone = "light" }: BannerProps) {
  const content = <><div className="content-banner__copy"><h2>{title}</h2>{description && <p>{description}</p>}</div>{image && <Image src={image.src} alt={image.alt ?? ""} fill sizes="100vw" />}</>;
  return href ? <a className={`content-banner content-banner--${tone}`} href={href}>{content}</a> : <section className={`content-banner content-banner--${tone}`}>{content}</section>;
}
