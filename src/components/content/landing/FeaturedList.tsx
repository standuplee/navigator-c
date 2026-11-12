import type { LandingFeaturedItem } from "@/types/pageTemplates";
import { MediaSlot } from "../blocks/MediaSlot";
import { Reveal } from "../blocks/Reveal";

/** Featured items after the landing hero (reference /service/featuredServices: four items,
 * one column, each with a video; text stays pinned beside the video on desktop). */
export function FeaturedList({ items }: { items: LandingFeaturedItem[] }) {
  return (
    <div className="mx-auto max-w-[1280px] px-gutter py-16 xl:py-24">
      {items.map((item, index) => (
        <section key={item.id} id={item.id} className="grid gap-8 border-b border-zinc-100 py-16 last:border-none lg:grid-cols-2 lg:gap-16 xl:py-24">
          <div>
            <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+48px)]">
              <p className="text-sm font-semibold text-zinc-400">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 text-section-title">{item.title}</h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-600 md:text-lg">{item.text}</p>
              {item.href && (
                <a href={item.href} className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                  자세히 보기
                  <span aria-hidden="true" className="inline-block motion-safe:can-hover:group-hover:animate-nudge-x">→</span>
                </a>
              )}
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <MediaSlot kind={item.media?.kind ?? "video"} src={item.media?.src} label={item.media?.label ?? item.title} ratio="4/5" className="rounded-3xl" />
          </Reveal>
        </section>
      ))}
    </div>
  );
}
