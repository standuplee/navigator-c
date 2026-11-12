"use client";

import type { AboutStoryContent } from "@/types/pageTemplates";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { MediaSlot } from "../blocks/MediaSlot";
import { Reveal } from "../blocks/Reveal";

/** Closing info (reference `.info`): full-bleed image (480 / 600 / 960px) that settles from
 * scale 1.3 to 1 as it scrolls in, then the wordmark and a label | value list. */
export function AboutInfo({ info }: { info: AboutStoryContent["info"] }) {
  const ref = useScrollProgress<HTMLDivElement>({ start: 1 });
  return (
    <section aria-label="개요">
      <div ref={ref} className="relative h-[480px] overflow-hidden md:h-[600px] xl:h-[960px]">
        <div className="absolute inset-0 motion-safe:[transform:scale(calc(1.3_-_var(--progress,0)_*_0.3))] motion-safe:will-change-transform">
          <MediaSlot src={info.image} alt="" label="공동체 사진" tone="dark" className="absolute inset-0" />
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] px-gutter pb-24 pt-10 xl:px-10 xl:pb-32 xl:pt-10">
        <Reveal>
          <p className="text-2xl font-black tracking-tight text-white">{info.logoText}</p>
        </Reveal>
        <dl className="mt-12 border-t border-white/20 xl:mt-[200px]">
          {info.items.map((item) => (
            <Reveal key={item.label} className="grid gap-1 border-b border-white/20 py-4 md:grid-cols-[200px_1fr] md:gap-6 xl:grid-cols-[400px_1fr] xl:py-5">
              <dt className="text-sm font-semibold text-white/60 xl:text-base">{item.label}</dt>
              <dd className="text-base text-white xl:text-lg">{item.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
