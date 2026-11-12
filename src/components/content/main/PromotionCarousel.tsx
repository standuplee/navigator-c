"use client";

import { useState } from "react";
import type { PromotionSlide } from "@/types/mainTemplate";
import { Carousel } from "../blocks/Carousel";
import { MediaSlot } from "../blocks/MediaSlot";

/** Promotion band (PRD §7.11, measured 718 / 532 / 675 tall, 5 slides): full-bleed band whose
 * background crossfades to each slide's colour (400ms). Desktop: text (32px title, 18px desc,
 * "자세히 보기") | 576×324 visual; tablet the same at half widths; mobile visual on top.
 * Bullets + pause sit under the text on tablet/desktop and centred 80px above the band bottom on mobile. Offsets from the reference: content starts
 * 80 / 80 / 96px down, controls at +606 / +324 / +447, band 718 / 532 / 675 tall.
 * State only changes from Swiper's slide-change callback, never inside an effect. */
export function PromotionCarousel({ slides }: { slides: PromotionSlide[] }) {
  const [active, setActive] = useState(0);
  const current = slides[active] ?? slides[0];
  const dark = current?.tone === "dark";

  return (
    <section
      aria-label="프로모션"
      className="transition-colors duration-[400ms] ease-smooth"
      style={{ backgroundColor: current?.backgroundColor }}
    >
      <Carousel
        preset="promo"
        label="프로모션"
        className="relative"
        onSlideChange={setActive}
        controlsTone={dark ? "dark" : "light"}
        controlsClassName="absolute inset-x-0 bottom-20 justify-center md:right-auto md:left-[max(var(--page-gutter),calc((100%-1280px)/2+var(--page-gutter)))] md:bottom-44 md:justify-start xl:bottom-[196px]"
      >
        {slides.map((slide) => {
          const slideDark = slide.tone === "dark";
          return (
            <div key={slide.id} className="mx-auto grid max-w-[1280px] gap-6 px-gutter pb-[264px] pt-20 md:grid-cols-2 md:items-start md:gap-7 md:pb-44 md:pt-20 xl:gap-8 xl:pb-48 xl:pt-24">
              <div className="overflow-hidden rounded-lg md:order-2 xl:ml-auto xl:w-[576px]">
                <MediaSlot src={slide.image} alt="" label="프로모션 비주얼" tone={slideDark ? "dark" : "light"} ratio="16/9" />
              </div>
              <div className={`min-h-[162px] md:order-1 md:min-h-[276px] xl:min-h-[387px] ${slideDark ? "text-white" : "text-ink"}`}>
                <p className="text-[26px] font-semibold leading-tight xl:text-[32px]">{slide.title}</p>
                <p className={`mt-4 text-base leading-relaxed xl:mt-6 xl:text-lg ${slideDark ? "text-white/70" : "text-zinc-600"}`}>{slide.description}</p>
                <a href={slide.href} className="group mt-6 inline-flex items-center gap-1 text-base font-semibold underline-offset-4 hover:underline xl:mt-8">
                  {slide.ctaLabel}
                  <span aria-hidden="true" className="motion-safe:can-hover:group-hover:animate-nudge-x">›</span>
                </a>
              </div>
            </div>
          );
        })}
      </Carousel>
    </section>
  );
}
