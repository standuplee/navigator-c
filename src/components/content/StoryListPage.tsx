"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Story, StoryCategory } from "@/types/story";
import { Carousel, CarouselArrows } from "./blocks/Carousel";
import { MediaSlot } from "./blocks/MediaSlot";
import { Pagination } from "./blocks/Pagination";
import { AnchorSection } from "./blocks/AnchorNav";

const PAGE_SIZE = 12;
const CATEGORIES: ("전체" | StoryCategory)[] = ["전체", "Leader's View", "Culture", "Service", "People", "Tech", "Impact"];

export type StoryListQuery = { category?: string; keyword?: string; page?: string };

const detailHref = (story: Story) => `/testimony/${story.seq}`;

/** `story-list` v2 (docs/PRD-navercorp-ui-parity.md §7.8).
 * - Recommended stories: 740×493 cards on desktop (335×414 mobile) in the `recommend`
 *   carousel; the following slides peek at 60% opacity; arrows under the slider.
 * - Category chips (free-mode row, 60 / 50px tall) + 240×44 search.
 * - Card grid 1 / 2 / 3 columns, 12 per page, URL state (?category= ?keyword= ?page=),
 *   desktop-only image zoom to 1.05. */
export function StoryListPage({ stories, query = {} }: { stories: Story[]; query?: StoryListQuery }) {
  const router = useRouter();
  const pathname = usePathname();
  const [draft, setDraft] = useState(query.keyword ?? "");
  const category = query.category ?? "";
  const keyword = query.keyword ?? "";
  const page = Math.max(1, Number(query.page) || 1);

  const filtered = useMemo(
    () =>
      stories.filter(
        (story) =>
          (!category || story.category === category) &&
          (!keyword || `${story.title} ${story.tags.join(" ")}`.toLowerCase().includes(keyword.toLowerCase())),
      ),
    [stories, category, keyword],
  );
  const total = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const build = (next: StoryListQuery) => {
    const params = new URLSearchParams();
    Object.entries({ category, keyword, ...next }).forEach(([key, value]) => value && params.set(key, String(value)));
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };
  const go = (next: StoryListQuery) => router.replace(build({ ...next, page: undefined }), { scroll: false });

  return (
    <main className="pb-16">
      {stories.length > 0 && (
        <section aria-label="추천 스토리" className="mx-auto max-w-[1280px] overflow-hidden px-gutter pb-16 xl:pb-20">
          <Carousel
            preset="recommend"
            label="추천 스토리"
            className="[&_.swiper]:!overflow-visible"
            slideClassName="!w-[335px] md:!w-[560px] xl:!w-[740px] transition-opacity duration-200 [&:not(.swiper-slide-active)]:opacity-60"
            arrowsAfter
            renderArrows={(api) => <CarouselArrows api={api} className="mt-6 justify-end" />}
          >
            {stories.slice(0, 10).map((story) => (
              <a key={story.seq} href={detailHref(story)} className="group block overflow-hidden rounded-3xl bg-zinc-100">
                <MediaSlot label={story.category} className="aspect-[4/3] md:aspect-[740/353]" mediaClassName="transition-transform duration-200 ease-smooth can-hover:group-hover:scale-105" />
                <div className="flex h-[163px] flex-col p-5 md:h-[150px] xl:h-[140px] xl:p-6">
                  <p className="text-sm text-zinc-500">{story.category}</p>
                  <p className="mt-2 line-clamp-2 text-base font-bold leading-snug xl:text-xl">{story.title}</p>
                </div>
              </a>
            ))}
          </Carousel>
        </section>
      )}

      <AnchorSection items={[{ id: "story-list", label: "스토리" }]}>
      <section id="story-list" aria-label="스토리 목록" className="mx-auto max-w-[1280px] px-gutter">
        <div className="flex flex-col-reverse gap-4 border-b border-zinc-200 md:flex-row md:items-center md:justify-between">
          <nav aria-label="스토리 분류" className="-mx-gutter overflow-x-auto px-gutter [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
            <ul className="flex h-[50px] items-center gap-6 md:h-[60px]">
              {CATEGORIES.map((item) => {
                const value = item === "전체" ? "" : item;
                const active = category === value;
                return (
                  <li key={item} className="shrink-0">
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => go({ category: value })}
                      className={`relative h-[50px] whitespace-nowrap text-base transition-colors duration-200 md:h-[60px] md:text-lg ${
                        active ? "font-bold text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-ink" : "text-zinc-500 hover:text-ink"
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
          <form
            role="search"
            className="flex h-11 w-full items-center rounded-lg bg-zinc-100 pl-4 md:w-[240px]"
            onSubmit={(event) => {
              event.preventDefault();
              go({ keyword: draft.trim() });
            }}
          >
            <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="스토리 검색" aria-label="스토리 검색" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
            <button type="submit" aria-label="검색" className="grid size-9 place-items-center">
              <span aria-hidden="true">⌕</span>
            </button>
          </form>
        </div>

        {keyword && (
          <p className="pt-6 text-sm text-zinc-600">
            ‘{keyword}’ 검색 결과 {filtered.length}건 <a href={build({ keyword: "" })} className="ml-2 underline">전체 보기</a>
          </p>
        )}

        {visible.length ? (
          <ul className="grid gap-6 pt-10 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((story) => (
              <li key={story.seq} className="group flex flex-col overflow-hidden rounded-lg">
                <a href={detailHref(story)} tabIndex={-1} aria-hidden="true" className="block overflow-hidden">
                  <MediaSlot label={story.category} ratio="379/252" mediaClassName="transition-transform duration-200 ease-smooth can-hover:group-hover:scale-105" />
                </a>
                <div className="flex flex-1 flex-col bg-[#f2f4f5] p-5 transition-colors duration-200 ease-in-out-strong can-hover:group-hover:bg-[#e9eaeb] xl:p-6">
                  <p className="flex gap-2 text-xs">
                    <span>{story.category}</span>
                    <time>{story.date}</time>
                  </p>
                  <a href={detailHref(story)} className="mt-2 line-clamp-2 text-base leading-[1.67] xl:text-lg">{story.title}</a>
                  {story.tags.length > 0 && (
                    <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                      {story.tags.map((tag) => (
                        <li key={tag}>
                          <a
                            href={build({ keyword: tag, category: "" })}
                            className="inline-flex h-7 items-center rounded px-2 text-xs bg-black/5 transition-colors duration-200 ease-in-out-strong hover:bg-black/10"
                          >
                            {tag}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-24 text-center text-zinc-500">검색 결과가 없습니다.</p>
        )}

        <Pagination current={Math.min(page, total)} total={total} hrefFor={(value) => build({ page: String(value) })} />
      </section>
      </AnchorSection>
    </main>
  );
}
