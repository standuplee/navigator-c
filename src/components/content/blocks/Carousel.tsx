"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Autoplay, EffectFade, FreeMode, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Carousel presets measured from the reference (PRD §4.4, appendix B). */
export const CAROUSEL_PRESETS = {
  headline: { effect: "fade", speed: 400, autoplay: 4000, loop: true, perView: 1, gap: 0, bullets: true, arrows: false },
  promo: { effect: "slide", speed: 400, autoplay: 4000, loop: true, perView: 1, gap: 0, bullets: true, arrows: false },
  "inline-images": { effect: "slide", speed: 300, autoplay: 2000, loop: true, perView: 1, gap: 0, bullets: false, arrows: false },
  "feature-fade": { effect: "fade", speed: 300, autoplay: 0, loop: false, perView: 1, gap: 0, bullets: true, arrows: false },
  cards: { effect: "slide", speed: 400, autoplay: 0, loop: false, perView: "auto", gap: 24, bullets: false, arrows: true },
  story: { effect: "slide", speed: 500, autoplay: 0, loop: false, perView: "auto", gap: 20, bullets: false, arrows: true },
  recommend: { effect: "slide", speed: 400, autoplay: 0, loop: false, perView: 1, gap: 24, bullets: false, arrows: true },
  banner: { effect: "slide", speed: 400, autoplay: 0, loop: false, perView: "auto", gap: 24, bullets: false, arrows: true },
  "free-list": { effect: "slide", speed: 300, autoplay: 0, loop: false, perView: "auto", gap: 0, bullets: false, arrows: false },
} as const;

export type CarouselPreset = keyof typeof CAROUSEL_PRESETS;

export type CarouselApi = {
  prev: () => void;
  next: () => void;
  isBeginning: boolean;
  isEnd: boolean;
};

/** Swiper wrapper with the measured presets (PRD §4.4).
 * - Autoplay presets get a pause/resume toggle (aria-pressed) and bullet progress bars whose
 *   fill runs for exactly the autoplay delay; autoplay stops off-screen and under reduced motion.
 * - Arrow presets expose prev/next through `renderArrows` so pages can place them next to the
 *   section title (the reference puts them on the heading row). Disabled edge buttons fade to .2.
 * - Gap becomes 32px from 1600px.
 * Each child becomes one slide; pass `slideClassName` to size "auto" slides. */
export function Carousel({
  preset,
  children,
  label,
  slideClassName = "",
  className = "",
  onSlideChange,
  renderArrows,
  arrowsAfter = false,
  controlsClassName = "mt-4",
  controlsTone = "light",
}: {
  preset: CarouselPreset;
  children: ReactNode;
  label: string;
  slideClassName?: string;
  className?: string;
  onSlideChange?: (index: number) => void;
  renderArrows?: (api: CarouselApi) => ReactNode;
  /** Render the arrows under the slides (reference media banners) instead of above. */
  arrowsAfter?: boolean;
  /** Classes for the bullets + pause row (default: in flow under the slides). Pass absolute
   * positioning to overlay it, as the main headline / promo do. */
  controlsClassName?: string;
  /** "dark" = white controls for dark backgrounds. */
  controlsTone?: "light" | "dark";
}) {
  const config = CAROUSEL_PRESETS[preset];
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ isBeginning: true, isEnd: false });
  const [paused, setPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const slides = Children.toArray(children);
  const autoplayOn = config.autoplay > 0 && !reduced;
  const playing = autoplayOn && !paused && onScreen;

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !autoplayOn) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, [autoplayOn]);

  useEffect(() => {
    if (!swiper?.autoplay) return;
    if (playing) swiper.autoplay.start();
    else swiper.autoplay.stop();
  }, [swiper, playing]);

  const api: CarouselApi = {
    prev: () => swiper?.slidePrev(),
    next: () => swiper?.slideNext(),
    isBeginning: edges.isBeginning,
    isEnd: edges.isEnd,
  };

  return (
    <div ref={rootRef} className={className} role="region" aria-roledescription="carousel" aria-label={label}>
      {!arrowsAfter && renderArrows?.(api)}
      <Swiper
        modules={[A11y, Autoplay, EffectFade, FreeMode, Keyboard]}
        effect={config.effect}
        fadeEffect={config.effect === "fade" ? { crossFade: true } : undefined}
        speed={reduced ? 0 : config.speed}
        loop={config.loop && slides.length > 1}
        slidesPerView={config.perView}
        spaceBetween={config.gap}
        breakpoints={config.gap ? { 1600: { spaceBetween: 32 } } : undefined}
        freeMode={preset === "free-list"}
        keyboard={{ enabled: true, onlyInViewport: true }}
        a11y={{ prevSlideMessage: "이전 슬라이드", nextSlideMessage: "다음 슬라이드", slideLabelMessage: "{{index}} / {{slidesLength}}" }}
        autoplay={config.autoplay ? { delay: config.autoplay, disableOnInteraction: false } : false}
        onSwiper={(instance) => {
          setSwiper(instance);
          setEdges({ isBeginning: instance.isBeginning, isEnd: instance.isEnd });
          if (!autoplayOn) instance.autoplay?.stop();
        }}
        onSlideChange={(instance) => {
          setActive(instance.realIndex);
          onSlideChange?.(instance.realIndex);
        }}
        onProgress={(instance) => setEdges({ isBeginning: instance.isBeginning, isEnd: instance.isEnd })}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className={slideClassName}>
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
      {arrowsAfter && renderArrows?.(api)}

      {(config.bullets || autoplayOn) && slides.length > 1 && (
        <div className={`z-10 flex items-center gap-3 ${controlsClassName}`}>
          {config.bullets && (
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`${index + 1}번 슬라이드 보기`}
                  aria-current={index === active ? "true" : undefined}
                  onClick={() => (config.loop ? swiper?.slideToLoop(index) : swiper?.slideTo(index))}
                  className={`relative h-1 overflow-hidden rounded-full transition-[width] duration-200 ease-smooth ${controlsTone === "dark" ? "bg-white/30" : "bg-zinc-300"} ${index === active ? "w-10" : "w-4"}`}
                >
                  {index === active && (
                    <span
                      key={`${active}-${playing}`}
                      className={`absolute inset-0 origin-left ${controlsTone === "dark" ? "bg-white" : "bg-zinc-900"}`}
                      style={playing ? { animation: `carousel-progress ${config.autoplay}ms linear forwards` } : undefined}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
          {autoplayOn && (
            <button
              type="button"
              aria-pressed={paused}
              aria-label={paused ? "자동 재생 시작" : "자동 재생 멈춤"}
              onClick={() => setPaused((value) => !value)}
              className={`grid size-8 place-items-center rounded-full text-xs transition-colors duration-200 ${controlsTone === "dark" ? "text-white hover:bg-white/15" : "text-zinc-600 hover:bg-zinc-100"}`}
            >
              <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/** Prev/next pair styled like the reference's heading-row arrows (PRD §6.5). */
export function CarouselArrows({ api, tone = "light", className = "" }: { api: CarouselApi; tone?: "light" | "dark"; className?: string }) {
  const base =
    tone === "dark"
      ? "border-white/30 text-white hover:bg-white/10"
      : "border-zinc-300 text-ink hover:bg-zinc-100";
  return (
    <div className={`flex gap-2 ${className}`}>
      <button type="button" aria-label="이전" onClick={api.prev} disabled={api.isBeginning} className={`grid size-10 place-items-center rounded-full border transition-[background-color,opacity] duration-200 ease-smooth disabled:opacity-20 ${base}`}>
        <span aria-hidden="true">←</span>
      </button>
      <button type="button" aria-label="다음" onClick={api.next} disabled={api.isEnd} className={`grid size-10 place-items-center rounded-full border transition-[background-color,opacity] duration-200 ease-smooth disabled:opacity-20 ${base}`}>
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
