"use client";

import { useEffect, useState } from "react";
import type { NewsCardItem, ShortcutCard } from "@/types/mainTemplate";
import { Carousel } from "../blocks/Carousel";
import { MediaSlot } from "../blocks/MediaSlot";

const timeFormat = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Seoul", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

/** Seoul clock (reference `.main-timer`, 20px). Starts blank on the server and fills in after
 * mount, so the markup never mismatches; ticks once a second. */
function SeoulClock() {
  const [parts, setParts] = useState<string[] | null>(null);
  useEffect(() => {
    const tick = () => setParts(timeFormat.format(new Date()).split(":"));
    const first = window.setTimeout(tick, 0);
    const timer = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, []);
  return (
    <p className="flex items-center gap-4 text-base text-ink md:text-xl">
      <strong className="font-normal">대한민국</strong>
      <span className="tabular-nums" aria-label={parts ? `서울 현재 시각 ${parts.join("시 ")}초` : undefined}>
        {(parts ?? ["--", "--", "--"]).join(" : ")}
      </span>
    </p>
  );
}

/** Main headline (PRD §7.11, measured 1016 / 718 / 638 tall):
 * - desktop: 782×521 fade carousel | three 378×158 shortcut cards stacked (24px gaps)
 * - tablet: 3:2 carousel full width, the three cards in a row below
 * - mobile: full-bleed carousel (375×415), cards stacked
 * Text sits on the image's lower part (32 / 26 / 16px); progress bullets + pause sit at the
 * bottom-right of the card (headline preset: fade 400ms, autoplay 4000ms). */
export function HeadlineSection({ slides, shortcuts }: { slides: NewsCardItem[]; shortcuts: ShortcutCard[] }) {
  return (
    <section aria-label="헤드라인" className="mx-auto max-w-[1280px] px-gutter pb-8 pt-5 md:pt-8 xl:pt-7">
      <SeoulClock />
      <div className="mt-4 grid gap-4 md:gap-5 xl:mt-7 xl:grid-cols-[minmax(0,782px)_minmax(0,378px)] xl:justify-between xl:gap-6">
        <Carousel
          preset="headline"
          label="헤드라인"
          className="relative -mx-gutter overflow-hidden md:mx-0 md:rounded-lg"
          controlsTone="dark"
          controlsClassName="absolute bottom-5 right-5 md:bottom-8 md:right-8 xl:bottom-12 xl:right-12"
        >
          {slides.map((slide) => (
            <a key={slide.id} href={slide.href} className="group relative block aspect-[375/415] overflow-hidden md:aspect-[3/2]">
              <MediaSlot
                src={slide.image}
                alt=""
                label="헤드라인 비주얼"
                tone="dark"
                className="absolute inset-0"
                mediaClassName="transition-transform duration-200 ease-smooth can-hover:group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 pb-16 pt-24 text-white md:px-8 md:pb-20 xl:px-12 xl:pb-12">
                <p className="flex gap-3 text-sm text-white/80 xl:text-base">
                  <span>{slide.category}</span>
                  <span>{slide.date}</span>
                </p>
                <p className="mt-2 line-clamp-3 max-w-[494px] text-base font-semibold leading-snug md:mt-4 md:text-[26px] xl:text-[32px]">{slide.title}</p>
              </div>
            </a>
          ))}
        </Carousel>

        <ul className="grid gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-1 xl:gap-6">
          {shortcuts.map((card) => (
            <li key={card.id}>
              <a
                href={card.href}
                className="group flex h-[130px] flex-col justify-between rounded-lg bg-[#f2f4f5] p-5 text-ink transition-colors duration-200 hover:bg-zinc-200 md:h-[125px] xl:h-[158px] xl:p-6"
              >
                <span className="text-sm text-zinc-500 xl:text-base">{card.label}</span>
                <span className="text-base font-semibold leading-snug xl:text-xl">{card.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
