import type { NewsCardItem } from "@/types/mainTemplate";
import { PlaceholderVisual } from "./PlaceholderVisual";

/** News cards (docs/animations.md §3). The source uses a JS-packed masonry layout
 * (variable row heights, no interaction). CSS multi-column masonry reproduces that
 * packed, uneven-height look without JS — closer to the source than a uniform grid,
 * and the browser balances column heights on its own (`column-fill: balance`).
 * Thumbnail aspect ratio alternates by index to give columns real height variance.
 * Mobile caps at 5 visible cards, matching the confirmed `:nth-child(6)~{display:none}` rule. */
const THUMBNAIL_RATIOS = ["aspect-[16/9]", "aspect-[4/3]", "aspect-square", "aspect-[16/9]"];

export function NewsMasonryGrid({ items, moreHref }: { items: NewsCardItem[]; moreHref: string }) {
  return (
    <section className="py-20" aria-labelledby="news-heading">
      <h2 id="news-heading" className="text-2xl font-bold tracking-tight">최근 소식</h2>
      <div className="mt-8 columns-1 gap-4 md:columns-2 lg:columns-3">
        {items.map((item, index) => (
          <a
            key={item.id}
            href={item.href}
            className={`group mb-4 block break-inside-avoid overflow-hidden rounded-2xl border border-zinc-200 ${index >= 5 ? "max-[767px]:hidden" : ""}`}
          >
            <div className={`relative overflow-hidden ${THUMBNAIL_RATIOS[index % THUMBNAIL_RATIOS.length]}`}>
              <PlaceholderVisual
                label="뉴스 썸네일"
                tone="light"
                className="absolute inset-0 h-full w-full transition-transform duration-200 ease-[cubic-bezier(.33,1,.68,1)] min-[1024px]:group-hover:scale-[1.08] motion-reduce:scale-100!"
              />
            </div>
            <div className="p-5 transition-colors duration-200 group-hover:bg-zinc-50">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span>{item.category}</span>
                <span>{item.date}</span>
              </div>
              <p className="mt-2 text-base font-semibold leading-snug text-zinc-900">{item.title}</p>
              {item.tags && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
      <div className="mt-8">
        <a href={moreHref} className="inline-flex items-center rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium hover:bg-zinc-50">
          전체보기
        </a>
      </div>
    </section>
  );
}
