"use client";

import type { TechDetailContent, TechSection } from "@/types/pageTemplates";
import { AnchorSection } from "./blocks/AnchorNav";
import { Carousel, CarouselArrows } from "./blocks/Carousel";
import { CtaBanner } from "./blocks/CtaBanner";
import { MediaSlot } from "./blocks/MediaSlot";
import { RelatedCarousel } from "./blocks/RelatedCarousel";
import { Reveal } from "./blocks/Reveal";

/** `tech-detail` template (docs/PRD-navercorp-ui-parity.md §7.3) — dark theme throughout.
 * Header: page title (40/48/64) + grey key copy (26/26/32) + video card (1184×507 desktop,
 * full-bleed 3:2 on mobile). Body: anchor-nav sections; each has a headline row
 * (title | description), optional wide visual / card carousel, then image-left / text-right
 * rows (592×473 desktop, 364×288 tablet, stacked on mobile; row title 32 / 20 / 20). */
export function TechDetailPage({ content }: { content: TechDetailContent }) {
  return (
    <main className="bg-ink-dark-bg text-white">
      <header className="mx-auto max-w-[1280px] px-gutter pb-16 pt-[calc(var(--header-h)+56px)] md:pb-20 xl:pb-28 xl:pt-[calc(var(--header-h)+96px)]">
        <Reveal>
          <h1 className="text-page-title">{content.title}</h1>
          <p className="mt-4 text-[26px] font-bold leading-snug text-[rgb(113_118_128)] xl:text-[32px]">{content.keycopy}</p>
        </Reveal>
        <Reveal delay={0.2} className="-mx-gutter mt-10 md:mx-0 xl:mt-14">
          <MediaSlot
            kind={content.heroMedia?.kind ?? "video"}
            src={content.heroMedia?.src}
            label={content.heroMedia?.label ?? `${content.title} 영상`}
            tone="dark"
            className="aspect-[3/2] md:aspect-[1184/507] md:rounded-3xl"
          />
        </Reveal>
      </header>

      <AnchorSection tone="dark" items={content.sections.map((section) => ({ id: section.id, label: section.title }))}>
        {content.sections.map((section) => (
          <TechSectionBlock key={section.id} section={section} />
        ))}
      </AnchorSection>

      {content.cta && <CtaBanner variant="card" title={content.cta.title} description={content.cta.description} href={content.cta.href} ctaLabel={content.cta.ctaLabel} external />}
      <RelatedCarousel items={content.related} tone="dark" />
    </main>
  );
}

function TechSectionBlock({ section }: { section: TechSection }) {
  return (
    <section id={section.id} className="py-16 md:py-20 xl:py-28">
      <div className="mx-auto max-w-[1280px] px-gutter">
        <Reveal className="grid gap-4 lg:grid-cols-2 lg:gap-12">
          <h2 className="text-section-title">{section.title}</h2>
          {section.description && <p className="text-base leading-relaxed text-white/70 md:text-lg">{section.description}</p>}
        </Reveal>

        {section.wideImages && section.wideImages.length > 0 && (
          <div className="-mx-gutter mt-10 md:mx-0">
            {section.wideImages.length > 1 ? (
              <Carousel preset="inline-images" label={`${section.title} 이미지`}>
                {section.wideImages.map((image, index) => (
                  <MediaSlot key={index} src={image.src} label={image.label ?? section.title} tone="dark" className="aspect-[3/2] md:aspect-[1184/395] md:rounded-3xl" />
                ))}
              </Carousel>
            ) : (
              <MediaSlot src={section.wideImages[0].src} label={section.wideImages[0].label ?? section.title} tone="dark" className="aspect-[3/2] md:aspect-[1184/395] md:rounded-3xl" />
            )}
          </div>
        )}

        {section.cards && section.cards.length > 0 && (
          <Carousel
            preset="cards"
            label={`${section.title} 목록`}
            className="mt-10"
            slideClassName="!w-[260px] md:!w-[300px] xl:!w-[345px]"
            renderArrows={(api) => <CarouselArrows api={api} tone="dark" className="mb-6 justify-end" />}
          >
            {section.cards.map((card) => (
              <div key={card.title} className="flex h-[300px] flex-col justify-between rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 xl:h-[360px]">
                <MediaSlot label="" tone="dark" className="size-14 rounded-2xl" />
                <div>
                  <p className="text-xl font-bold xl:text-2xl">{card.title}</p>
                  <p className="mt-2 text-sm text-white/60 md:text-base">{card.description}</p>
                </div>
              </div>
            ))}
          </Carousel>
        )}

        {section.items.length > 0 && (
          <ul className="mt-12 flex flex-col gap-12 md:gap-10 xl:mt-16 xl:gap-16">
            {section.items.map((item) => (
              <Reveal as="li" key={item.title} className="grid gap-6 md:grid-cols-[364px_1fr] md:items-center md:gap-10 xl:grid-cols-[592px_1fr] xl:gap-16">
                <MediaSlot src={item.image?.src} label={item.image?.label ?? item.title} tone="dark" className="aspect-[592/473] rounded-3xl" />
                <div>
                  <h3 className="text-xl font-bold xl:text-[32px] xl:leading-tight">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-white/70 xl:mt-5 xl:text-lg">{item.description}</p>
                  {item.links && item.links.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {item.links.map((link) => (
                        <li key={link.label}>
                          <a href={link.href} className="inline-flex h-9 items-center rounded-full border border-white/30 px-4 text-sm transition-colors duration-200 hover:bg-white/10">
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
