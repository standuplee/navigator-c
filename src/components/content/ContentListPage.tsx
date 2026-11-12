"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { NewsCardItem } from "@/types/mainTemplate";
import { Carousel, CarouselArrows } from "./blocks/Carousel";
import { MediaSlot } from "./blocks/MediaSlot";
import { Pagination } from "./blocks/Pagination";

const PAGE_SIZE = 12;

export type ContentListQuery = { keyword?: string; page?: string; year?: string; month?: string };
export type QuickLink = { title: string; text: string; href: string };

/** `content-list` v2 (docs/PRD-navercorp-ui-parity.md §7.7) — /media/pressReleases, /media/naverReports.
 * - Featured banner: up to nine cards (379×492 desktop / 276 wide mobile) with arrows below.
 * - Sticky filter bar: year + month selects (20px / 18px), search box (238×44, full width on mobile).
 * - One-column list on every screen size: date | title (20px) | 278×186 thumbnail on desktop,
 *   date + title only on mobile; rows separated by rules; desktop-only thumbnail zoom.
 * - URL state: ?keyword= ?year= ?month= ?page= (shareable, back-button friendly).
 * - Optional quick links (three cards). */
export function ContentListPage({
  title,
  items,
  query = {},
  searchPlaceholder,
  quickLinks,
}: {
  title: string;
  items: NewsCardItem[];
  query?: ContentListQuery;
  searchPlaceholder?: string;
  quickLinks?: QuickLink[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [draft, setDraft] = useState(query.keyword ?? "");
  const keyword = query.keyword ?? "";
  const year = query.year ?? "";
  const month = query.month ?? "";
  const page = Math.max(1, Number(query.page) || 1);

  const years = useMemo(() => Array.from(new Set(items.map((item) => item.date.slice(0, 4)))).sort().reverse(), [items]);
  const filtered = useMemo(
    () =>
      items.filter((item) => {
        if (year && !item.date.startsWith(year)) return false;
        if (month && item.date.slice(5, 7) !== month.padStart(2, "0")) return false;
        if (keyword && !`${item.title} ${(item.tags ?? []).join(" ")}`.toLowerCase().includes(keyword.toLowerCase())) return false;
        return true;
      }),
    [items, year, month, keyword],
  );
  const total = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const build = (next: ContentListQuery) => {
    const params = new URLSearchParams();
    const merged = { keyword, year, month, ...next };
    Object.entries(merged).forEach(([key, value]) => value && params.set(key, String(value)));
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };
  const go = (next: ContentListQuery) => router.replace(build({ ...next, page: undefined }), { scroll: false });

  const select = "appearance-none bg-transparent pr-6 text-lg font-bold text-ink outline-offset-4 md:text-xl";

  return (
    <main className="pb-16" aria-label={title}>
      {items.length > 0 && (
        <section aria-label="주요 소식" className="mx-auto max-w-[1280px] px-gutter pb-16 xl:pb-20">
          <Carousel
            preset="banner"
            label={`${title} 주요 소식`}
            slideClassName="!w-[276px] md:!w-[320px] xl:!w-[379px]"
            arrowsAfter
            renderArrows={(api) => <CarouselArrows api={api} className="mt-6 justify-end" />}
          >
            {items.slice(0, 9).map((item) => (
              <a key={item.id} href={item.href} className="group block overflow-hidden rounded-2xl bg-zinc-100">
                <MediaSlot label={item.category} ratio="379/252" mediaClassName="transition-transform duration-200 ease-smooth can-hover:group-hover:scale-[1.08]" />
                <div className="flex h-[220px] flex-col p-5 xl:h-[240px] xl:p-6">
                  <time className="text-xs text-zinc-500">{item.date}</time>
                  <p className="mt-2 line-clamp-3 text-base font-bold leading-snug xl:text-lg">{item.title}</p>
                  {item.tags && item.tags.length > 0 && (
                    <p className="mt-auto flex flex-wrap gap-x-3 text-sm text-zinc-500">
                      {item.tags.map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </Carousel>
        </section>
      )}

      <section className="mx-auto max-w-[1280px] px-gutter" aria-label={`${title} 목록`}>
        <div className="sticky top-[var(--header-h)] z-20 flex flex-col gap-3 border-b border-ink bg-white py-3 transition-[top] duration-400 ease-smooth scroll-down:top-0 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <label className="relative">
              <span className="sr-only">연도</span>
              <select className={select} value={year} onChange={(event) => go({ year: event.target.value, month: event.target.value ? month : "" })}>
                <option value="">전체 연도</option>
                {years.map((value) => (
                  <option key={value} value={value}>{value}년</option>
                ))}
              </select>
              <span aria-hidden="true" className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-sm">⌄</span>
            </label>
            <label className="relative">
              <span className="sr-only">월</span>
              <select className={select} value={month} onChange={(event) => go({ month: event.target.value })}>
                <option value="">전체 월</option>
                {Array.from({ length: 12 }, (_, index) => String(index + 1)).map((value) => (
                  <option key={value} value={value}>{value}월</option>
                ))}
              </select>
              <span aria-hidden="true" className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-sm">⌄</span>
            </label>
          </div>
          <form
            role="search"
            className="flex h-11 w-full items-center rounded-lg bg-zinc-100 pl-4 md:w-[238px]"
            onSubmit={(event) => {
              event.preventDefault();
              go({ keyword: draft.trim() });
            }}
          >
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={searchPlaceholder ?? `${title} 검색`}
              aria-label={searchPlaceholder ?? `${title} 검색`}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
            <button type="submit" aria-label="검색" className="grid size-9 place-items-center">
              <span aria-hidden="true">⌕</span>
            </button>
          </form>
        </div>

        {keyword && (
          <p className="pt-6 text-sm text-zinc-600">
            ‘{keyword}’ 검색 결과 {filtered.length}건{" "}
            <a href={build({ keyword: "" })} className="ml-2 underline">전체 보기</a>
          </p>
        )}

        {visible.length ? (
          <ul>
            {visible.map((item) => (
              <li key={item.id} className="border-b border-zinc-200">
                <a href={item.href} className="group flex min-h-[144px] items-center gap-6 py-5 md:min-h-[200px] xl:min-h-[250px] xl:gap-8 xl:py-8">
                  <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-row md:gap-8">
                    <time className="shrink-0 text-sm text-zinc-500 md:w-40 md:text-base xl:w-52">{item.date}</time>
                    <p className="line-clamp-2 text-base font-bold leading-snug group-hover:underline md:text-lg xl:max-w-[480px] xl:text-xl">{item.title}</p>
                  </div>
                  <MediaSlot label={item.category} className="hidden aspect-[278/186] w-[200px] shrink-0 rounded-xl md:block xl:w-[278px]" mediaClassName="transition-transform duration-200 ease-smooth can-hover:group-hover:scale-[1.08]" />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-24 text-center text-zinc-500">검색 결과가 없습니다.</p>
        )}

        <Pagination current={Math.min(page, total)} total={total} hrefFor={(value) => build({ page: String(value) })} />
      </section>

      {quickLinks && quickLinks.length > 0 && (
        <section aria-label="바로가기" className="mx-auto max-w-[1280px] px-gutter py-10">
          <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
            {quickLinks.map((link) => (
              <li key={link.title}>
                <a href={link.href} className="group flex h-[160px] flex-col justify-between rounded-2xl bg-zinc-100 p-6 transition-colors duration-200 hover:bg-zinc-200 xl:h-[192px] xl:p-8">
                  <div>
                    <p className="text-lg font-bold xl:text-xl">{link.title}</p>
                    <p className="mt-1 text-sm text-zinc-600">{link.text}</p>
                  </div>
                  <span aria-hidden="true" className="self-end motion-safe:can-hover:group-hover:animate-nudge-x">→</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
