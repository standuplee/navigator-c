"use client";

import type { AboutTimelineCard } from "@/types/pageTemplates";
import { Carousel, CarouselArrows } from "../blocks/Carousel";
import { MediaSlot } from "../blocks/MediaSlot";

/** 처음 chapter (reference `.beginning-swiper`): free-width cards 275 / 275 / 325px, 20px gap,
 * text block (year 16, title 26–32, desc 18) over a square image; arrows centred below. */
export function TimelineCards({ cards, label }: { cards: AboutTimelineCard[]; label: string }) {
  return (
    <div className="overflow-hidden px-gutter xl:px-[100px] [&_.swiper]:!overflow-visible">
      <Carousel
        preset="story"
        label={label}
        slideClassName="!w-[275px] xl:!w-[325px]"
        arrowsAfter
        renderArrows={(api) => <CarouselArrows api={api} tone="dark" className="mt-8 justify-center xl:mt-10" />}
      >
        {cards.map((card) => (
          <article key={`${card.year}-${card.title}`} className="flex flex-col">
            <div className="flex h-[200px] flex-col justify-between px-4 py-4 xl:h-[260px] xl:px-5 xl:py-5">
              <div>
                <span className="text-base font-semibold text-white/60">{card.year}</span>
                <h3 className="mt-3 text-[26px] font-bold leading-tight text-white xl:text-[32px]">{card.title}</h3>
              </div>
              <p className="whitespace-pre-line text-base leading-relaxed text-white/80 xl:text-lg">{card.description}</p>
            </div>
            <MediaSlot src={card.image} alt={card.title} label={card.title} tone="dark" ratio="1/1" className="rounded-2xl" />
          </article>
        ))}
      </Carousel>
    </div>
  );
}
