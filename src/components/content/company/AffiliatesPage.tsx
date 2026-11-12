import type { AffiliatesContent } from "@/types/pageTemplates";
import { MediaSlot } from "../blocks/MediaSlot";
import { Reveal } from "../blocks/Reveal";

/** /company/affiliates (PRD §7.6): one affiliate per row on every screen size — 592×388
 * visual left, content right (title 32px desktop, 16px text, dark "바로가기" button);
 * stacked on mobile; 160px between rows on desktop. */
export function AffiliatesPage({ content }: { content: AffiliatesContent }) {
  return (
    <main className="mx-auto max-w-[1280px] px-gutter py-16 xl:py-24">
      <ul className="flex flex-col gap-16 md:gap-24 xl:gap-40">
        {content.items.map((item) => (
          <Reveal as="li" key={item.name} className="grid gap-8 md:grid-cols-2 md:items-center md:gap-10 xl:gap-0">
            <MediaSlot src={item.image?.src} label={item.image?.label ?? item.name} ratio="592/388" className="rounded-3xl" />
            <div className="xl:pl-16">
              <h2 className="text-card-title xl:text-[32px] xl:leading-snug">
                {item.name}
                <span className="block text-zinc-500">{item.tagline}</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-zinc-600">{item.description}</p>
              <a
                href={item.href}
                target="_blank"
                rel="noopener"
                className="group mt-8 inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-zinc-700"
              >
                바로가기 <span aria-hidden="true" className="inline-block transition-transform duration-200 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                <span className="sr-only">(새 창)</span>
              </a>
            </div>
          </Reveal>
        ))}
      </ul>
    </main>
  );
}
