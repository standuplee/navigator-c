import type { NewsCardItem } from "@/types/mainTemplate";
import { MediaSlot } from "../blocks/MediaSlot";

/** Card heights measured on the reference grid at 379px card width, by position (index 1–2
 * are its text cards). Image cards keep these as aspect ratios at every width; positions past
 * the list wrap around. */
const IMAGE_HEIGHTS = [473, 0, 0, 333, 473, 386, 437, 386, 434, 404, 437, 473, 473, 417, 424];
const imageHeight = (index: number) => IMAGE_HEIGHTS[index % IMAGE_HEIGHTS.length] || 430;

/** Column placement as on the reference: cards are dealt across the columns in order
 * (card i → column i mod n), so the newest items run across the top row and each column
 * keeps its own uneven rhythm. */
function toColumns(items: NewsCardItem[], count: number) {
  return Array.from({ length: count }, (_, column) => items.map((_, index) => index).filter((index) => index % count === column));
}

function NewsCard({ item, index }: { item: NewsCardItem; index: number }) {
  if (item.kind === "text") {
    return (
      <a href={item.href} className="flex h-[112px] flex-col justify-between rounded-lg bg-[#f2f4f5] p-5 text-ink transition-colors duration-200 hover:bg-zinc-200 xl:h-[134px] xl:p-6">
        <span className="flex gap-3 text-xs text-zinc-500">
          <span>{item.category}</span>
          {item.date ? <span>{item.date}</span> : null}
        </span>
        <span className="mt-3 line-clamp-2 text-base font-semibold leading-snug xl:text-xl">{item.title}</span>
      </a>
    );
  }
  return (
    <a href={item.href} className="group relative block overflow-hidden rounded-lg" style={{ aspectRatio: `379/${imageHeight(index)}` }}>
      <MediaSlot
        src={item.image}
        alt=""
        label="소식 썸네일"
        className="absolute inset-0"
        mediaClassName="transition-transform duration-200 ease-smooth can-hover:group-hover:scale-[1.08]"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent p-5 pt-16 text-white xl:p-6 xl:pt-20">
        <p className="flex gap-3 text-xs text-white/80">
          <span>{item.category}</span>
          {item.date ? <span>{item.date}</span> : null}
        </p>
        <p className="mt-2 line-clamp-2 text-lg font-semibold leading-snug xl:text-xl">{item.title}</p>
        {item.tags && item.tags.length > 0 && (
          <p className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/20 px-2 py-0.5 text-xs backdrop-blur">{tag}</span>
            ))}
          </p>
        )}
      </div>
    </a>
  );
}

/** Main news grid (PRD §7.11, reference 1820 / 3516 / 2634 tall): wordmark-height title band
 * (95 / 45 / 62px), then 15 cards — mobile the first 5 stacked with 20px gaps, tablet 2 and
 * desktop 3 masonry columns (cards 354 / 379px + 20 / 24px gutters). The three layouts are
 * rendered once each and toggled with display, so only one is ever in the accessibility tree.
 * Two "전체보기" buttons close the section. */
export function NewsMasonryGrid({ items, links }: { items: NewsCardItem[]; links: { label: string; href: string }[] }) {
  const tablet = toColumns(items, 2);
  const desktop = toColumns(items, 3);
  return (
    <section aria-labelledby="news-heading" className="mx-auto max-w-[1280px] px-gutter py-20 xl:py-24">
      <h2 id="news-heading" className="flex h-[95px] items-center justify-center text-[40px] font-black tracking-tight text-ink md:h-[45px] xl:h-[62px] xl:text-5xl">
        NEWS &amp; STORY
      </h2>
      <ul className="mt-12 flex flex-col gap-5 md:hidden">
        {items.slice(0, 5).map((item, index) => (
          <li key={item.id}>
            <NewsCard item={item} index={index} />
          </li>
        ))}
      </ul>
      {[
        { columns: tablet, className: "hidden md:flex xl:hidden -mx-2.5", cell: "p-2.5" },
        { columns: desktop, className: "hidden xl:flex -mx-3", cell: "p-3" },
      ].map((layout) => (
        <div key={layout.columns.length} className={`mt-9 items-start ${layout.className}`}>
          {layout.columns.map((indexes, column) => (
            <ul key={column} className="flex min-w-0 flex-1 flex-col">
              {indexes.map((index) => (
                <li key={items[index].id} className={layout.cell}>
                  <NewsCard item={items[index]} index={index} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      ))}
      <div className="mt-12 flex justify-center gap-2 md:gap-5 xl:mt-16 xl:gap-4">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-ink px-4 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-85 xl:w-[216px] xl:flex-none"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
