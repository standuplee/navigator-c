"use client";

import { useMemo, useState } from "react";
import type { NewsCardItem } from "@/types/mainTemplate";
import { PlaceholderVisual } from "./main/PlaceholderVisual";

const PAGE_SIZE = 8;

/** `content-list-filter-pagination` template (docs/routes.md): heading + featured
 * carousel + year/month filter + search + paginated card grid.
 * Used by /media/pressReleases (and reusable for /media/naverReports later). */
export function ContentListPage({ title, items, initialQuery = "" }: { title: string; items: NewsCardItem[]; initialQuery?: string }) {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [year, setYear] = useState("전체 연도");
  const [month, setMonth] = useState("전체 월");
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(1);

  const years = useMemo(() => Array.from(new Set(items.map((item) => item.date.slice(0, 4)))).sort().reverse(), [items]);
  const filtered = useMemo(
    () =>
      items.filter(
        (item) =>
          (!query || item.title.toLowerCase().includes(query.toLowerCase()) || item.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))) &&
          (year === "전체 연도" || item.date.startsWith(year)) &&
          (month === "전체 월" || item.date.slice(5, 7) === month)
      ),
    [items, query, year, month]
  );
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const featured = items.slice(0, 6);
  const current = featured[featuredIndex];

  return (
    <main className="mx-auto max-w-7xl px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{title}</h1>

      {current && (
        <section className="mt-12 grid items-stretch gap-6 md:grid-cols-[96px_1fr_72px]" aria-label="주요 소식">
          <div className="hidden flex-col justify-between md:flex">
            <span className="text-sm font-medium text-zinc-500">주요 소식</span>
            <strong className="text-3xl font-bold text-zinc-300">{String(featuredIndex + 1).padStart(2, "0")}</strong>
          </div>
          <a href={current.href} className="group relative block aspect-[16/7] overflow-hidden rounded-3xl">
            <PlaceholderVisual label="주요 소식 비주얼" tone={current.tone} className="absolute inset-0 h-full w-full transition-transform duration-200 min-[1024px]:group-hover:scale-105 motion-reduce:scale-100!" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <time className="text-sm text-white/80">{current.date}</time>
              <p className="mt-1 text-xl font-semibold leading-snug">{current.title}</p>
            </div>
          </a>
          <div className="flex gap-2 md:flex-col md:justify-center">
            <button type="button" aria-label="이전 소식" disabled={featuredIndex === 0} className="flex-1 rounded-full border border-zinc-200 py-2 text-sm disabled:opacity-30" onClick={() => setFeaturedIndex((value) => Math.max(0, value - 1))}>↑</button>
            <button type="button" aria-label="다음 소식" disabled={featuredIndex === featured.length - 1} className="flex-1 rounded-full border border-zinc-200 py-2 text-sm disabled:opacity-30" onClick={() => setFeaturedIndex((value) => Math.min(featured.length - 1, value + 1))}>↓</button>
          </div>
        </section>
      )}

      <div className="mt-16 flex flex-wrap items-center gap-3 border-y border-zinc-200 py-4">
        <select aria-label="연도" value={year} onChange={(event) => { setYear(event.target.value); setPage(1); }} className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm">
          <option>전체 연도</option>
          {years.map((y) => <option key={y}>{y}</option>)}
        </select>
        <select aria-label="월" value={month} onChange={(event) => { setMonth(event.target.value); setPage(1); }} disabled={year === "전체 연도"} className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm disabled:opacity-40">
          <option>전체 월</option>
          {Array.from({ length: 12 }, (_, i) => <option key={i}>{String(i + 1).padStart(2, "0")}</option>)}
        </select>
        <form role="search" className="ml-auto flex items-center gap-2" onSubmit={(event) => event.preventDefault()}>
          <input aria-label="검색" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="검색" className="rounded-full border border-zinc-200 px-4 py-1.5 text-sm" />
        </form>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {visible.map((item) => (
          <a key={item.id} href={item.href} className="group overflow-hidden rounded-2xl border border-zinc-200">
            <div className="relative aspect-[4/3] overflow-hidden">
              <PlaceholderVisual label="썸네일" tone="light" className="absolute inset-0 h-full w-full transition-transform duration-200 min-[1024px]:group-hover:scale-105 motion-reduce:scale-100!" />
            </div>
            <div className="p-4">
              <time className="text-xs text-zinc-500">{item.date}</time>
              <p className="mt-1 text-sm font-semibold leading-snug">{item.title}</p>
            </div>
          </a>
        ))}
      </div>
      {!visible.length && <p className="mt-8 text-center text-zinc-500">검색 결과가 없습니다.</p>}

      <nav aria-label="페이지네이션" className="mt-10 flex justify-center gap-1">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i + 1}
            type="button"
            aria-current={page === i + 1 ? "page" : undefined}
            className={`h-9 w-9 rounded-full text-sm font-medium ${page === i + 1 ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100"}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </nav>
    </main>
  );
}
