"use client";

import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { Autoplay, Pagination, A11y } from "swiper/modules";
import type { PromotionSlide } from "@/types/mainTemplate";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PlaceholderVisual } from "./PlaceholderVisual";

/** Promotion carousel (docs/animations.md §4): slide transition + background-color
 * crossfade, both 400ms, autoplay 4000ms — confirmed live against the reference site. */
export function PromotionCarousel({ slides }: { slides: PromotionSlide[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<Swiper | null>(null);
  const [paused, setPaused] = useState(false);
  const [activeColor, setActiveColor] = useState(slides[0]?.backgroundColor ?? "#ffffff");
  const [activeTone, setActiveTone] = useState<"light" | "dark">(slides[0]?.tone ?? "light");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;
    const sync = (s: Swiper) => {
      const slide = slides[s.realIndex];
      if (!slide) return;
      setActiveColor(slide.backgroundColor);
      setActiveTone(slide.tone);
    };
    const swiper = new Swiper(containerRef.current, {
      modules: [Autoplay, Pagination, A11y],
      loop: true,
      speed: 400,
      autoplay: reducedMotion ? false : { delay: 4000, disableOnInteraction: false },
      pagination: paginationRef.current ? { el: paginationRef.current, clickable: true } : undefined,
      a11y: { enabled: true },
      on: { init: sync, slideChange: sync },
    });
    swiperRef.current = swiper;
    if (reducedMotion) setPaused(true);
    return () => swiper.destroy(true, true);
  }, [reducedMotion, slides]);

  const togglePause = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    const next = !paused;
    setPaused(next);
    if (next) swiper.autoplay.stop();
    else swiper.autoplay.start();
  };

  return (
    <section
      className="rounded-3xl py-16 transition-colors duration-[400ms] ease-[cubic-bezier(.33,1,.68,1)]"
      style={{ backgroundColor: activeColor }}
      aria-label="프로모션"
    >
      <div className="swiper" ref={containerRef}>
        <div className="swiper-wrapper">
          {slides.map((slide) => (
            <div className="swiper-slide" key={slide.id}>
              <div className="mx-auto grid max-w-5xl items-center gap-8 px-6 md:grid-cols-2">
                <PlaceholderVisual label="프로모션 비주얼" tone={slide.tone} className="aspect-[4/3] rounded-2xl" />
                <div className={`transition-colors duration-[400ms] ease-[cubic-bezier(.33,1,.68,1)] ${slide.tone === "dark" ? "text-white" : "text-zinc-900"}`}>
                  <p className="text-2xl font-bold leading-snug md:text-3xl">{slide.title}</p>
                  <p className={`mt-3 text-sm md:text-base ${slide.tone === "dark" ? "text-white/70" : "text-zinc-600"}`}>{slide.description}</p>
                  <a
                    href={slide.href}
                    target="_blank"
                    rel="noopener"
                    className={`mt-6 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline ${slide.tone === "dark" ? "text-white" : "text-zinc-900"}`}
                  >
                    {slide.ctaLabel} →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        <div ref={paginationRef} className={`promo-pagination flex gap-1.5 ${activeTone === "dark" ? "promo-pagination--dark" : ""}`} />
        <button
          type="button"
          className={`rounded-full px-3 py-1 text-xs font-medium ${activeTone === "dark" ? "bg-white/15 text-white" : "bg-zinc-900/10 text-zinc-900"}`}
          aria-pressed={paused}
          onClick={togglePause}
        >
          {paused ? "자동재생" : "자동멈춤"}
        </button>
      </div>
      <style>{`
        .promo-pagination .swiper-pagination-bullet { width: 8px; height: 8px; border-radius: 9999px; background: rgba(0,0,0,.25); opacity: 1; transition: background-color .2s; }
        .promo-pagination .swiper-pagination-bullet-active { background: rgba(0,0,0,.8); }
        .promo-pagination--dark .swiper-pagination-bullet { background: rgba(255,255,255,.35); }
        .promo-pagination--dark .swiper-pagination-bullet-active { background: #fff; }
      `}</style>
    </section>
  );
}
