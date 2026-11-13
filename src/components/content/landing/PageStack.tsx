"use client";

import { useEffect, useRef, useState } from "react";
import type { LandingStackDomain } from "@/types/pageTemplates";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MediaSlot } from "../blocks/MediaSlot";
import { Reveal } from "../blocks/Reveal";

/** One domain of the tech page-stack (docs/PRD-navercorp-ui-parity.md §7.4).
 * Intro (title + description), then a 375svh track with a one-screen sticky stage holding the
 * domain's point items. Every further screen of scrolling collapses the top item into a 56px
 * title bar (info lifts so the scaled title sits in the bar — the reference lifts 80px from a
 * taller info block; title scales to .625, height animates — 1.06s stack ease), and
 * the next item slides up. The last item never collapses. The stage sits under the header
 * while it is visible and moves to the top when the header hides on scroll-down.
 * The stack only runs from 1024px, as on the reference; below that (and under reduced
 * motion) the items are a plain expanded list — mobile visual 335×419 over the text (row
 * 746px), tablet 266×333 beside vertically centred text (row 462px). */
export function PageStackDomain({ domain }: { domain: LandingStackDomain }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(0);
  const reduced = useReducedMotion();
  const count = domain.points.length;

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      if (!window.matchMedia("(min-width: 1024px)").matches) {
        setCollapsed(0);
        return;
      }
      const y = -track.getBoundingClientRect().top;
      const step = window.innerHeight;
      setCollapsed(Math.max(0, Math.min(count - 1, Math.floor(y / step))));
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
  }, [count, reduced]);

  return (
    <section id={domain.id} className="pt-20 xl:pt-32">
      <Reveal className="mx-auto max-w-[1280px] px-gutter pb-12 xl:pb-20">
        <h3 className="text-section-title">{domain.title}</h3>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">{domain.description}</p>
      </Reveal>

      <div ref={trackRef} className={reduced ? "" : "lg:relative lg:h-[375svh]"}>
        <div
          className={
            reduced
              ? ""
              : "lg:sticky lg:top-[calc(var(--header-h)+48px)] lg:h-[calc(100svh-48px)] lg:overflow-hidden lg:transition-[top] lg:duration-400 lg:ease-smooth lg:scroll-down:top-12"
          }
        >
          <ol className="mx-auto max-w-[1280px] px-gutter">
            {domain.points.map((point, index) => {
              const hidden = !reduced && index < collapsed;
              return (
                <li
                  key={point.title}
                  aria-current={!reduced && index === collapsed ? "step" : undefined}
                  className={`overflow-hidden border-t border-white/15 pb-14 pt-[108px] transition-[height] duration-[1060ms] ease-stack md:pb-16 md:pt-16 ${
                    reduced ? "lg:pb-10 lg:pt-0" : hidden ? "lg:h-14 lg:p-0" : "lg:h-[600px] lg:p-0 xl:h-[607px]"
                  }`}
                >
                  <div className="grid gap-6 md:grid-cols-[328px_1fr] md:items-center md:gap-[30px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start lg:gap-10 lg:pt-4 xl:grid-cols-[477px_1fr] xl:gap-16">
                    <div
                      className={`order-2 origin-top-left transition-[transform] duration-[1060ms] ease-stack ${hidden ? "-translate-y-6" : "translate-y-0"}`}
                    >
                      <p className={`text-sm font-semibold text-white/50 transition-opacity duration-[1060ms] ease-stack ${hidden ? "opacity-0" : "opacity-100"}`}>{String(index + 1).padStart(2, "0")}</p>
                      <p className={`mt-1 origin-left text-[26px] font-bold transition-[scale] duration-[1060ms] ease-stack xl:text-[32px] ${hidden ? "scale-[.625]" : "scale-100"}`}>
                        {point.title}
                      </p>
                      <p className={`mt-3 text-base text-white/70 transition-opacity duration-[1060ms] ease-stack xl:text-lg ${hidden ? "opacity-0" : "opacity-100"}`}>{point.text}</p>
                    </div>
                    <MediaSlot
                      kind={domain.media?.kind}
                      src={domain.media?.src}
                      label={`${domain.title} · ${point.title}`}
                      tone="dark"
                      className={`order-1 aspect-[335/419] rounded-3xl transition-opacity duration-[1060ms] ease-stack md:ml-auto md:aspect-auto md:h-[333px] md:w-[266px] lg:ml-0 lg:aspect-[477/447] lg:h-auto lg:w-auto ${hidden ? "opacity-0" : "opacity-100"}`}
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
