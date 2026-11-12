"use client";

import type { ServiceDetailContent } from "@/types/pageTemplates";
import { PlaceholderVisual } from "./main/PlaceholderVisual";
import { AnchorSection } from "./blocks/AnchorNav";
import { Reveal } from "./blocks/Reveal";

/** `service-detail` template (docs/routes.md): hero + intro block + repeated
 * alternating content sections under the shared anchor nav (PRD §6.4).
 * Used by /service/search, /advertisement, /commerce, /map. */
export function ServiceDetailTemplate({ content }: { content: ServiceDetailContent }) {
  const anchors = content.sections.map((section, index) => ({ id: `service-section-${index + 1}`, label: section.title }));

  return (
    <main className="pb-24">
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-zinc-900 px-5 text-center text-white">
        <PlaceholderVisual label="서비스 히어로" tone="dark" className="absolute inset-0 h-full w-full opacity-60" />
        <div className="relative">
          <p className="text-sm font-medium text-white/70">{content.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">{content.title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/80">{content.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8">
        <h2 className="text-2xl font-bold">{content.introTitle}</h2>
        <p className="mt-4 text-zinc-600">{content.introDescription}</p>
      </section>

      <AnchorSection items={anchors}>
        <div className="mx-auto max-w-5xl space-y-24 px-gutter pt-16">
          {content.sections.map((section, index) => (
            <Reveal
              as="article"
              key={section.title}
              id={anchors[index].id}
              className={`grid scroll-mt-14 items-center gap-10 md:grid-cols-2 ${index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <PlaceholderVisual label="섹션 비주얼" tone="light" className="aspect-[4/3] rounded-3xl" />
              <div>
                <span className="text-sm font-semibold text-zinc-400">0{index + 1}</span>
                <h2 className="mt-2 text-section-title">{section.title}</h2>
                <p className="mt-3 text-zinc-600">{section.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </AnchorSection>
    </main>
  );
}
