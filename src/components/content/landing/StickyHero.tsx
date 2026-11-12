"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MediaSlot } from "../blocks/MediaSlot";

/** Tile layout measured on the reference (1440×900): left %, top in viewport heights, and how
 * fast each tile travels relative to the scroll (1 = with the page). */
const TILES = [
  { left: 20, top: 10, speed: 0.99 },
  { left: 74, top: 15, speed: 1.2 },
  { left: 5, top: 60, speed: 1.23 },
  { left: 88, top: 80, speed: 1.19 },
  { left: 19, top: 120, speed: 1.17 },
  { left: 71, top: 140, speed: 1.19 },
  { left: 8, top: 200, speed: 1.18 },
  { left: 77, top: 220, speed: 1.15 },
];

/** Landing sticky hero (docs/PRD-navercorp-ui-parity.md §7.2).
 * Section 2030 / 2560 / 2925px with a one-screen sticky stage:
 * - Title in two steps: initially line 1 sits 50% low and line 2 is hidden; once the stage has
 *   been scrolled ~45% of a screen, both lines rise into place and line 2 fades in (`enter`);
 *   scrolling back reverses it. Line 1's second phrase trails by .2s.
 * - Eight image tiles drift upward faster than the page (per-tile speed), passing the title.
 * - A "next content" arrow at the bottom jumps past the hero.
 * Reduced motion: final title state, tiles static. */
export function StickyHero({ line1, line2, tiles = 8, theme = "light" }: { line1: [string, string]; line2: string; tiles?: number; theme?: "light" | "dark" }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const reduced = useReducedMotion();
  const dark = theme === "dark";

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = Math.max(0, Math.min(section.offsetHeight, -section.getBoundingClientRect().top));
      stage.style.setProperty("--hero-y", `${y}px`);
      setEntered(y > window.innerHeight * 0.45);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  const on = reduced || entered;
  const line = "inline-block transition-[opacity,transform] duration-800 ease-copy";

  const next = () => {
    const section = sectionRef.current;
    if (!section) return;
    window.scrollTo({ top: section.offsetTop + section.offsetHeight - 56, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section ref={sectionRef} data-state={on ? "enter" : "ready"} className={`relative h-[2030px] md:h-[2560px] xl:h-[2925px] ${dark ? "bg-ink-dark-bg text-white" : "bg-white text-ink"}`}>
      <div ref={stageRef} className="sticky top-0 h-svh overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0">
          {TILES.slice(0, tiles).map((tile, index) => (
            <div
              key={index}
              className="absolute w-20 transition-transform duration-[1600ms] ease-drift md:w-28 xl:w-36"
              style={{
                left: `${tile.left}%`,
                top: `${tile.top}svh`,
                transform: reduced ? undefined : `translate3d(0, calc(var(--hero-y, 0px) * -${tile.speed}), 0)`,
              }}
            >
              <MediaSlot label="" tone={dark ? "dark" : "light"} ratio="144/179" className="rounded-2xl" />
            </div>
          ))}
        </div>

        <div className="relative flex h-full items-center justify-center px-gutter text-center">
          <h1 className="text-page-title">
            <span className="block">
              <span className={`${line} ${on ? "translate-y-0" : "translate-y-1/2"}`}>{line1[0]}</span>{" "}
              <span className={`${line} ${on ? "translate-y-0" : "translate-y-1/2"}`} style={{ transitionDelay: on ? "0s" : "0.2s" }}>
                {line1[1]}
              </span>
            </span>
            <span className={`block ${line} ${on ? "translate-y-0 opacity-100" : "translate-y-1/2 opacity-0"}`}>{line2}</span>
          </h1>
        </div>

        <button
          type="button"
          onClick={next}
          className={`absolute bottom-8 left-1/2 grid size-12 -translate-x-1/2 place-items-center rounded-full border transition-colors duration-200 ${dark ? "border-white/30 hover:bg-white/10" : "border-zinc-300 hover:bg-zinc-100"}`}
        >
          <span aria-hidden="true" className="motion-safe:animate-nudge-down">↓</span>
          <span className="sr-only">다음 콘텐츠로 이동</span>
        </button>
      </div>
    </section>
  );
}
