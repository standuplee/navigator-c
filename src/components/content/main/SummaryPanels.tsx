"use client";

import { useState } from "react";
import type { SummaryPanel } from "@/types/mainTemplate";
import { MediaSlot } from "../blocks/MediaSlot";

/** "주요 서비스와 기술 요약" (PRD §7.11, docs/animations.md §5; measured 847 / 1261 / 757 tall).
 * - desktop: three panels in a row, 475px tall; the open one grows to 781 : 177 against the others
 *   (flex-grow, .6s soft ease) and shows a 380px visual | coloured info half
 * - mobile/tablet: an accordion — open panel 503 / 809px, closed ones 70 / 94px bars
 * Panels open on click, focus or (desktop) hover. Each panel's header is a real button with
 * aria-expanded + aria-controls; the "자세히 보기" link fades in after the panel has opened. */
export function SummaryPanels({ panels }: { panels: SummaryPanel[] }) {
  const [active, setActive] = useState(0);

  return (
    <section aria-labelledby="summary-heading" className="mx-auto max-w-[1280px] px-gutter pb-5 pt-20 md:py-20 xl:py-24">
      <h2 id="summary-heading" className="text-[26px] font-semibold text-ink xl:text-[32px]">주요 서비스와 기술 요약</h2>
      <div className="mt-8 flex flex-col gap-4 md:gap-5 xl:mt-12 xl:h-[475px] xl:flex-row xl:gap-6">
        {panels.map((panel, index) => {
          const open = active === index;
          const dark = panel.tone !== "light";
          const panelId = `summary-panel-${panel.id}`;
          return (
            <div
              key={panel.id}
              onMouseEnter={() => window.matchMedia("(hover: hover) and (min-width: 1280px)").matches && setActive(index)}
              className={`relative overflow-hidden rounded-lg bg-zinc-800 transition-[flex-grow,height] duration-600 ease-smooth-soft xl:h-full xl:basis-0 ${
                open ? "h-[503px] md:h-[809px] xl:grow-[781]" : "h-[70px] md:h-[94px] xl:grow-[177]"
              }`}
            >
              <MediaSlot
                src={panel.image}
                alt=""
                label={`${panel.label} 비주얼`}
                tone="dark"
                className={`absolute inset-x-0 top-0 transition-transform duration-600 ease-smooth-soft xl:bottom-0 xl:right-auto xl:w-[380px] ${open ? "bottom-[220px] scale-100 md:bottom-[260px] xl:bottom-0" : "bottom-0 scale-110"}`}
              />
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className={`absolute inset-x-0 top-0 z-10 flex h-[70px] items-center px-5 text-left text-base font-semibold text-white md:h-[94px] md:px-6 xl:h-auto xl:pt-6 ${open ? "xl:inset-0" : "xl:inset-0 xl:items-start"}`}
                >
                  <span className={`transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}>{panel.label}</span>
                </button>
              </h3>
              <div
                id={panelId}
                aria-hidden={!open}
                className={`absolute inset-x-0 bottom-0 flex h-[220px] flex-col p-5 transition-opacity duration-300 md:h-[260px] md:p-6 xl:inset-y-0 xl:left-[380px] xl:right-0 xl:h-auto ${
                  open ? "opacity-100 delay-300" : "pointer-events-none opacity-0"
                } ${dark ? "text-white" : "text-ink"}`}
                style={{ backgroundColor: panel.color }}
              >
                <p className="text-base font-semibold">{panel.label}</p>
                <p className="mt-6 text-xl font-semibold leading-snug md:text-[26px] xl:mt-12">
                  {panel.title}
                  {panel.titleEn && (
                    <>
                      <br />
                      <span className="font-medium">{panel.titleEn}</span>
                    </>
                  )}
                </p>
                <p className={`mt-3 line-clamp-3 text-base leading-relaxed xl:mt-5 xl:text-lg ${dark ? "text-white/80" : "text-ink/80"}`}>{panel.description}</p>
                <a
                  href={panel.href}
                  tabIndex={open ? 0 : -1}
                  aria-label={`${panel.label} 자세히 보기`}
                  className={`ml-auto mt-auto grid size-9 place-items-center rounded-full transition-opacity duration-300 ${open ? "opacity-100 delay-600" : "opacity-0"} ${dark ? "bg-white text-ink" : "bg-ink text-white"}`}
                >
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
