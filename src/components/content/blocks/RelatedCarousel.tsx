"use client";

import { Carousel, CarouselArrows } from "./Carousel";
import { MediaSlot } from "./MediaSlot";

export type RelatedItem = { id: string; title: string; href: string; date?: string; category?: string; image?: string };

/** "연관 콘텐츠" (PRD §6.5): section 637 / 641 / 714px, auto-width cards with prev/next on the
 * heading row, card image zooms to 1.08 on desktop hover only. Used at the bottom of service,
 * tech, story and report detail pages. */
export function RelatedCarousel({ items, title = "연관 콘텐츠", tone = "light" }: { items: RelatedItem[]; title?: string; tone?: "light" | "dark" }) {
  if (!items.length) return null;
  const dark = tone === "dark";
  return (
    <section
      aria-labelledby="related-heading"
      className={`flex min-h-[637px] flex-col justify-center py-16 md:min-h-[641px] xl:min-h-[714px] ${dark ? "bg-ink-dark-bg text-white" : "bg-white text-ink"}`}
    >
      <Carousel
        preset="cards"
        label={title}
        className="mx-auto w-full max-w-[1920px] px-gutter"
        slideClassName="!w-[280px] md:!w-[320px] xl:!w-[384px]"
        renderArrows={(api) => (
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 id="related-heading" className="text-section-title">{title}</h2>
            <CarouselArrows api={api} tone={tone} />
          </div>
        )}
      >
        {items.map((item) => (
          <a key={item.id} href={item.href} className="group block">
            <MediaSlot
              src={item.image}
              label="관련 콘텐츠"
              tone={dark ? "dark" : "light"}
              ratio="4/3"
              className="rounded-2xl"
              mediaClassName="transition-transform duration-200 ease-smooth can-hover:group-hover:scale-[1.08]"
            />
            <div className="pt-5">
              {item.category && <p className={`text-sm ${dark ? "text-white/60" : "text-zinc-500"}`}>{item.category}</p>}
              <p className="mt-1 line-clamp-2 text-lg font-semibold leading-snug can-hover:group-hover:underline">{item.title}</p>
              {item.date && <time className={`mt-3 block text-sm ${dark ? "text-white/50" : "text-zinc-400"}`}>{item.date}</time>}
            </div>
          </a>
        ))}
      </Carousel>
    </section>
  );
}
