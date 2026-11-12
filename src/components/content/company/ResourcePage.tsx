"use client";

import { useState } from "react";
import type { ResourceItem, ResourcePageContent, ResourceVisual } from "@/types/pageTemplates";
import { AnchorSection } from "../blocks/AnchorNav";
import { MediaSlot } from "../blocks/MediaSlot";
import { Reveal } from "../blocks/Reveal";
import { ConsentDialog } from "./ConsentDialog";

const downloadClass =
  "inline-flex h-10 items-center gap-2 rounded-full border border-zinc-300 px-5 text-sm font-semibold text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white";

function Visual({ visual, onDownload }: { visual: ResourceVisual; onDownload: (href: string) => void }) {
  switch (visual.kind) {
    case "tiles":
      return (
        <ul className="grid grid-cols-2 gap-4 xl:gap-8">
          {visual.tiles.map((tile, index) => (
            <li key={index} className={tile.wide ? "col-span-2" : ""}>
              <div
                className={`flex h-[160px] items-center justify-center rounded-2xl md:h-[240px] xl:h-[299px] ${
                  tile.tone === "dark" ? "bg-ink text-white" : tile.tone === "brand" ? "bg-zinc-700 text-white" : "bg-zinc-100 text-ink"
                }`}
              >
                <span className="text-lg font-bold tracking-tight md:text-2xl">LOGO</span>
              </div>
              <p className="mt-3 text-base font-semibold">{tile.label}</p>
              {tile.caption && <p className="text-sm text-zinc-500">{tile.caption}</p>}
            </li>
          ))}
          {visual.note && <li className="col-span-2 text-base leading-relaxed text-zinc-600">{visual.note}</li>}
        </ul>
      );
    case "swatches":
      return (
        <ul className="grid gap-4 md:grid-cols-2 xl:gap-8">
          {visual.swatches.map((swatch) => (
            <li
              key={swatch.hex}
              className={`flex h-[200px] flex-col justify-between rounded-2xl p-6 xl:h-[299px] xl:p-8 ${swatch.textTone === "light" ? "text-white" : "text-ink"}`}
              style={{ backgroundColor: swatch.hex }}
            >
              <p className="text-lg font-bold xl:text-xl">{swatch.name}</p>
              <dl className="grid grid-cols-[56px_1fr] gap-y-1 text-sm xl:text-base">
                <dt className="opacity-60">HEX</dt><dd>{swatch.hex}</dd>
                {swatch.rgb && (<><dt className="opacity-60">RGB</dt><dd>{swatch.rgb}</dd></>)}
                {swatch.cmyk && (<><dt className="opacity-60">CMYK</dt><dd>{swatch.cmyk}</dd></>)}
              </dl>
            </li>
          ))}
        </ul>
      );
    case "bans":
      return (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 xl:gap-x-8">
          {visual.items.map((item) => (
            <li key={item.caption}>
              <div className="relative flex h-[120px] items-center justify-center rounded-2xl bg-zinc-100 md:h-[180px] xl:h-[200px]">
                <span className="text-base font-bold text-zinc-400 md:text-xl">LOGO</span>
                <span aria-hidden="true" className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">✕</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 xl:text-base">{item.caption}</p>
            </li>
          ))}
        </ul>
      );
    case "photos":
      return (
        <ul className="grid gap-4 md:grid-cols-2 xl:gap-8">
          {visual.photos.map((photo) => (
            <li key={photo.alt} className="group">
              <div className="overflow-hidden rounded-2xl">
                <MediaSlot
                  src={photo.src}
                  alt={photo.alt}
                  label={photo.alt}
                  ratio="374/248"
                  mediaClassName="transition-transform duration-500 ease-smooth can-hover:group-hover:scale-105"
                />
              </div>
              {photo.downloadHref && (
                <button type="button" onClick={() => onDownload(photo.downloadHref!)} className="mt-3 text-sm font-semibold text-ink underline-offset-4 hover:underline">
                  다운로드<span className="sr-only"> {photo.alt}</span> ↓
                </button>
              )}
            </li>
          ))}
        </ul>
      );
  }
}

function Item({ item, onDownload }: { item: ResourceItem; onDownload: (href: string) => void }) {
  return (
    <Reveal id={item.id} className="grid scroll-mt-[calc(var(--header-h)+var(--anchor-nav-h))] gap-6 pb-16 lg:grid-cols-[404px_1fr] lg:gap-0 xl:pb-20">
      <div className="lg:sticky lg:top-[calc(var(--header-h)+var(--anchor-nav-h)+32px)] lg:self-start lg:pr-8">
        <h3 className="text-[22px] font-bold leading-snug xl:text-[26px]">{item.title}</h3>
        {item.subTitle && <p className="mt-4 text-base font-semibold">{item.subTitle}</p>}
        <p className="mt-4 text-base leading-relaxed text-zinc-600">{item.text}</p>
        {item.download && (
          <div className="mt-6">
            <button type="button" className={downloadClass} onClick={() => onDownload(item.download!.href)}>
              {item.download.label}
              <span aria-hidden="true">↓</span>
            </button>
          </div>
        )}
      </div>
      <div className="min-w-0">
        <Visual visual={item.visual} onDownload={onDownload} />
      </div>
    </Reveal>
  );
}

/** /company/brandGuide and /company/gallery (PRD §7.6): section band (32px title) then items
 * as title column (404px) | visual column (780px); the anchor bar lists every item. Every
 * download goes through the brand-guideline consent dialog first. */
export function ResourcePage({ content }: { content: ResourcePageContent }) {
  const [pending, setPending] = useState<string | null>(null);
  const items = content.sections.flatMap((section) => section.items);

  return (
    <main>
      <AnchorSection items={items.map((item) => ({ id: item.id, label: item.title }))}>
        {content.sections.map((section) => (
          <section key={section.id} aria-labelledby={`${section.id}-title`}>
            <div className="mx-auto max-w-[1280px] px-gutter pb-12 pt-16 xl:pb-24 xl:pt-24">
              <h2 id={`${section.id}-title`} className="text-section-title">{section.title}</h2>
            </div>
            <div className="mx-auto max-w-[1280px] px-gutter pb-8">
              {section.items.map((item) => (
                <Item key={item.id} item={item} onDownload={setPending} />
              ))}
            </div>
          </section>
        ))}
      </AnchorSection>
      <ConsentDialog consent={content.consent} href={pending} onClose={() => setPending(null)} />
    </main>
  );
}
