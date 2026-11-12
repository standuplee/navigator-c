"use client";

import type { AboutCardGroup } from "@/types/pageTemplates";
import { Carousel, CarouselArrows } from "../blocks/Carousel";
import { MediaSlot } from "../blocks/MediaSlot";
import { Reveal } from "../blocks/Reveal";

/** 끝까지 chapter (reference `.finish-swiper`): each group has its title + description with the
 * arrows on the right, then image cards 280×385 / 350×472 with the text over the top edge.
 * The heading fades up (1s sine, .5s delay) and the card row slides in from the right
 * (.7s, .5s delay), as the reference finish-swiper. */
export function CardGroups({ groups }: { groups: AboutCardGroup[] }) {
  return (
    <div className="flex flex-col gap-24 xl:gap-[140px]">
      {groups.map((group) => (
        <Carousel
          key={group.title}
          preset="story"
          label={group.title}
          className="overflow-hidden [&_.swiper]:!overflow-visible [&_.swiper]:mx-[var(--page-gutter)] xl:[&_.swiper]:mx-[60px]"
          slideClassName="!w-[280px] xl:!w-[350px]"
          renderArrows={(api) => (
            <div className="mx-auto mb-8 flex max-w-[1440px] items-end justify-between gap-6 px-gutter xl:mb-6 xl:px-[60px]">
              <Reveal animate delay={0.5}>
                <h3 className="text-[26px] font-bold leading-tight text-white xl:text-[32px]">{group.title}</h3>
                <p className="mt-2 text-base text-white/70 xl:text-lg">{group.description}</p>
              </Reveal>
              <CarouselArrows api={api} tone="dark" className="hidden shrink-0 md:flex" />
            </div>
          )}
        >
          {group.cards.map((card) => (
            <Reveal key={card.title} animate variant="fade-left" duration={0.7} delay={0.5} className="relative h-[385px] overflow-hidden rounded-2xl xl:h-[472px]">
              <MediaSlot src={card.image} alt="" label={card.title} tone="dark" className="absolute inset-0" />
              <div className="relative p-6 xl:p-[30px]">
                <p className="whitespace-pre-line text-base text-white/80 xl:text-lg">{card.eyebrow}</p>
                <p className="mt-1 text-[24px] font-bold leading-tight text-white xl:text-[32px]">{card.title}</p>
              </div>
            </Reveal>
          ))}
        </Carousel>
      ))}
    </div>
  );
}
