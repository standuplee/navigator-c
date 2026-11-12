"use client";

import type { ServiceHero as ServiceHeroData } from "@/types/pageTemplates";
import { useInView } from "@/hooks/useInView";
import { MediaSlot } from "../blocks/MediaSlot";

/** Service detail hero (PRD §7.1).
 * - icon-grid: section 1421 / 1792 / 1575px whose content stays pinned for the first
 *   screen of scrolling (the reference pins it with a fixed layer; a sticky inner block
 *   gives the same hold-then-release). Product icons fly in from the left/right on entry.
 * - fullscreen: one screen tall image/video with the title on the lower left and a
 *   bouncing scroll cue. */
export function ServiceHero({ hero }: { hero: ServiceHeroData }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  if (hero.variant === "fullscreen") {
    return (
      <section className="relative flex h-svh min-h-[560px] items-end overflow-hidden bg-zinc-900 text-white">
        <MediaSlot kind={hero.media?.kind ?? "image"} src={hero.media?.src} label={`${hero.title} 히어로`} tone="dark" className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden="true" />
        <div ref={ref} className="relative mx-auto w-full max-w-[1920px] px-gutter pb-24 md:pb-28">
          <h1 className={`text-page-title transition-[opacity,transform] duration-800 ease-smooth ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>{hero.title}</h1>
          <p className={`mt-4 max-w-xl text-lg text-white/85 transition-[opacity,transform] delay-200 duration-800 ease-smooth md:text-xl ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            {hero.description}
          </p>
        </div>
        <span aria-hidden="true" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-2xl motion-safe:animate-nudge-down">↓</span>
      </section>
    );
  }

  const half = Math.ceil(hero.icons.length / 2);
  return (
    <section className="relative h-[1421px] md:h-[1792px] xl:h-[1575px]">
      <div ref={ref} className="sticky top-0 flex h-svh flex-col items-center justify-center px-gutter text-center">
        <h1 className="text-page-title text-ink">{hero.title}</h1>
        <p className="mt-5 max-w-xl text-lg text-zinc-500 md:text-xl xl:mt-6 xl:text-2xl">{hero.description}</p>
        <ul className="mt-10 flex items-center gap-3 xl:mt-14 xl:gap-4" aria-hidden="true">
          {hero.icons.map((label, index) => {
            const fromLeft = index < half;
            return (
              <li
                key={label}
                style={{ transitionDelay: inView ? `${index * 0.08}s` : "0s" }}
                className={`size-9 overflow-hidden rounded-xl transition-[opacity,transform] duration-800 ease-smooth md:size-14 md:rounded-2xl xl:size-[78px] ${
                  inView ? "translate-x-0 opacity-100" : fromLeft ? "-translate-x-12 opacity-0" : "translate-x-12 opacity-0"
                }`}
              >
                <MediaSlot label="" className="size-full" />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
