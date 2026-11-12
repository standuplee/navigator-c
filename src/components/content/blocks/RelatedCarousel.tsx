"use client";

import { Carousel, CarouselArrows } from "./Carousel";
import { MediaSlot } from "./MediaSlot";

export type RelatedItem = { id: string; title: string; href: string; date?: string; category?: string; image?: string };

/** "연관 콘텐츠" (PRD §6.5, measured on the reference): section 637 / 641 / 714px, cards
 * 287 / 292 / 345px wide with 24px gaps inside the 1280 container, prev/next on the heading row.
 * Card = 8px-rounded clip: 3:2 image over a fixed-height text box (186 / 186 / 202px, 20/24px
 * padding, gray-100 or gray-900) holding category · date (12px) and a two-line title (14/16px).
 * Desktop hover: image 1.08 (.2s smooth) and the box darkens to gray-200 / gray-800
 * (.2s in-out). */
export function RelatedCarousel({ items, title = "연관 콘텐츠", tone = "light" }: { items: RelatedItem[]; title?: string; tone?: "light" | "dark" }) {
  if (!items.length) return null;
  const dark = tone === "dark";
  return (
    <section
      aria-labelledby="related-heading"
      className={`flex min-h-[637px] flex-col justify-center overflow-hidden py-16 md:min-h-[641px] xl:min-h-[714px] ${dark ? "bg-ink-dark-bg text-white" : "bg-white text-ink"}`}
    >
      <Carousel
        preset="cards"
        label={title}
        className="mx-auto w-full max-w-[1280px] px-gutter [&_.swiper]:!overflow-visible"
        slideClassName="!w-[287px] md:!w-[292px] xl:!w-[345px]"
        renderArrows={(api) => (
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 id="related-heading" className="text-section-title">{title}</h2>
            <CarouselArrows api={api} tone={tone} />
          </div>
        )}
      >
        {items.map((item) => (
          <a key={item.id} href={item.href} className="group block overflow-hidden rounded-lg">
            <MediaSlot
              src={item.image}
              label="관련 콘텐츠"
              tone={dark ? "dark" : "light"}
              ratio="3/2"
              mediaClassName="transition-transform duration-200 ease-smooth can-hover:group-hover:scale-[1.08]"
            />
            <div
              className={`flex h-[186px] flex-col gap-3.5 p-5 transition-colors duration-200 ease-in-out-strong xl:h-[202px] xl:p-6 ${
                dark ? "bg-[#1a1d24] can-hover:group-hover:bg-[#252b37]" : "bg-[#f2f4f5] can-hover:group-hover:bg-[#e9eaeb]"
              }`}
            >
              <p className="flex gap-2 text-xs">
                {item.category && <span>{item.category}</span>}
                {item.date && <time>{item.date}</time>}
              </p>
              <p className="line-clamp-2 text-sm leading-[1.6] xl:text-base">{item.title}</p>
            </div>
          </a>
        ))}
      </Carousel>
    </section>
  );
}
