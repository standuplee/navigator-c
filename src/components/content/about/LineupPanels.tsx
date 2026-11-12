"use client";

import type { AboutLineupItem, AboutLineupPanel } from "@/types/pageTemplates";
import { usePassedLine } from "@/hooks/usePassedLine";
import { MediaSlot } from "../blocks/MediaSlot";
import { Reveal } from "../blocks/Reveal";

/** One lineup row: dim (.2) until its top passes 65% of the viewport, then lit (.3s). Rows
 * stay lit after scrolling past and dim again only when scrolled back below the line, so the
 * sequence reverses (PRD §7.5-3). */
function LineupRow({ item, feature = false, image }: { item: AboutLineupItem; feature?: boolean; image?: string }) {
  const { ref, passed: inView } = usePassedLine<HTMLLIElement>(0.65);
  return (
    <li ref={ref} className={`transition-opacity duration-300 ease-in-out ${inView ? "opacity-100" : "opacity-20"}`}>
      {feature ? (
        <div className="relative flex min-h-[132px] items-center overflow-hidden rounded-2xl p-4 xl:px-5">
          <MediaSlot src={image} alt="" label={item.title} tone="dark" className="absolute inset-0" />
          <p className="relative flex max-w-[250px] flex-col gap-1">
            <span className="text-sm font-bold text-white/70">{item.year}</span>
            <strong className="text-[22px] font-bold leading-snug text-white">{item.title}</strong>
            <span className="text-[15px] leading-snug text-white/80">{item.description}</span>
          </p>
        </div>
      ) : (
        <div className="flex min-h-[74px] items-center justify-between gap-4 px-4 xl:px-5">
          <p className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-white/60">{item.year}</span>
            <strong className="text-[22px] font-bold leading-snug text-white">{item.title}</strong>
            <span className="text-[15px] leading-snug text-white/70">{item.description}</span>
          </p>
          <span aria-hidden="true" className="size-12 shrink-0 rounded-2xl bg-white/10 xl:size-16" />
        </div>
      )}
    </li>
  );
}

/** 다시 chapter (reference `.sticky-section`): per panel a label + 26–32px title, then the
 * visual (730px, desktop only) beside the lineup list (462px) whose rows light up in turn. */
export function LineupPanels({ panels }: { panels: AboutLineupPanel[] }) {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-28 px-gutter xl:gap-44 xl:px-[60px]">
      {panels.map((panel) => (
        <section key={panel.label} aria-label={panel.label}>
          <Reveal>
            <p className="text-base font-medium tracking-wide text-white/60">{panel.label}</p>
            <h3 className="mt-3 whitespace-pre-line text-[26px] font-bold leading-tight text-white xl:text-[32px]">{panel.title}</h3>
          </Reveal>
          <div className="mt-10 lg:mt-20 lg:flex lg:items-start lg:justify-between lg:gap-12">
            <div className="hidden w-full max-w-[730px] lg:block">
              <MediaSlot src={panel.image} alt="" label={panel.label} tone="dark" ratio="730/702" className="rounded-3xl" />
            </div>
            <ul className="flex w-full flex-col gap-6 lg:max-w-[462px] xl:gap-[35px]">
              {panel.items.map((item) => (
                <LineupRow key={`${item.year}-${item.title}`} item={item} />
              ))}
              {panel.feature && <LineupRow item={panel.feature} image={panel.feature.image} feature />}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
