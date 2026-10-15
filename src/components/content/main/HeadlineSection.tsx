"use client";

import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { Autoplay, EffectFade, Pagination, A11y } from "swiper/modules";
import type { NewsCardItem, ShortcutCard } from "@/types/mainTemplate";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PlaceholderVisual } from "./PlaceholderVisual";

/** Headline carousel + shortcut card stack (docs/animations.md §2, §2-7).
 * autoplay 4000ms / speed 400ms / fade — values confirmed live against the
 * reference site's `swiper.params` (docs/progress.md "Chrome 라이브 검증"). */
export function HeadlineSection({ slides, shortcuts }: { slides: NewsCardItem[]; shortcuts: ShortcutCard[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<Swiper | null>(null);
  const [paused, setPaused] = useState(false);
  const [clock, setClock] = useState("00:00:00");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const tick = () => setClock(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Seoul", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date()));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const swiper = new Swiper(containerRef.current, {
      modules: [Autoplay, EffectFade, Pagination, A11y],
      loop: true,
      effect: "fade",
      fadeEffect: { crossFade: true },
      speed: 400,
      autoplay: reducedMotion ? false : { delay: 4000, disableOnInteraction: false },
      pagination: paginationRef.current
        ? { el: paginationRef.current, clickable: true, renderBullet: (index, cls) => `<button type="button" class="${cls}" aria-label="${index + 1}번째 슬라이드"><span class="bar"></span></button>` }
        : undefined,
      a11y: { enabled: true },
    });
    swiperRef.current = swiper;
    if (reducedMotion) setPaused(true);
    return () => swiper.destroy(true, true);
  }, [reducedMotion]);

  const togglePause = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    const next = !paused;
    setPaused(next);
    if (next) swiper.autoplay.stop();
    else swiper.autoplay.start();
  };

  return (
    <>
    <section className="grid min-w-0 gap-4 pt-28 md:grid-cols-[1fr_320px] md:pt-32" aria-label="헤드라인">
      <div className="min-w-0">
        <div className="mb-4 flex items-center justify-between text-sm text-zinc-500">
          <span>대한민국 {clock}</span>
        </div>
        <div className="relative overflow-hidden rounded-2xl">
          <div className="swiper" ref={containerRef}>
            <div className="swiper-wrapper">
              {slides.map((slide) => (
                <div className="swiper-slide" key={slide.id}>
                  <a href={slide.href} className="group relative block aspect-[16/10] overflow-hidden rounded-2xl">
                    <PlaceholderVisual
                      label="헤드라인 비주얼"
                      tone={slide.tone}
                      className="absolute inset-0 h-full w-full transition-transform duration-200 ease-[cubic-bezier(.33,1,.68,1)] min-[1024px]:group-hover:scale-105 motion-reduce:scale-100!"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                      <div className="mb-2 flex gap-2 text-xs font-medium text-white/80">
                        <span>{slide.category}</span>
                        <span>{slide.date}</span>
                      </div>
                      <p className="text-lg font-semibold leading-snug">{slide.title}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-4 left-6 z-10 flex items-center gap-3">
            <div ref={paginationRef} className="headline-pagination flex gap-1.5" />
            <button
              type="button"
              className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur"
              aria-pressed={paused}
              onClick={togglePause}
            >
              {paused ? "자동재생" : "자동멈춤"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {shortcuts.map((card) => (
          <a
            key={card.id}
            href={card.href}
            className={`flex-1 rounded-2xl p-5 transition-colors duration-200 ${
              card.tone === "dark" ? "bg-zinc-900 text-white hover:bg-zinc-800" : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
            }`}
          >
            <p className="text-xs font-medium opacity-70">{card.label}</p>
            <p className="mt-2 text-sm font-semibold leading-snug">{card.title}</p>
          </a>
        ))}
      </div>
    </section>
    <style>{`
      .headline-pagination .swiper-pagination-bullet { width: 12px; height: 4px; border-radius: 2px; background: rgba(255,255,255,.4); opacity: 1; display: inline-block; overflow: hidden; position: relative; transition: width .4s cubic-bezier(.33,1,.68,1); }
      .headline-pagination .swiper-pagination-bullet .bar { position: absolute; inset: 0; width: 0; background: #fff; }
      .headline-pagination .swiper-pagination-bullet-active { width: 40px; }
      .headline-pagination .swiper-pagination-bullet-active .bar { width: 100%; transition: width 4s linear; }
    `}</style>
    </>
  );
}
