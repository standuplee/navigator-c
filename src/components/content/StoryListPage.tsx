"use client";

import { useMemo, useState } from "react";
import type { Story, StoryCategory } from "@/types/story";
import { PlaceholderVisual } from "./main/PlaceholderVisual";

const CATEGORIES: ("All" | StoryCategory)[] = ["All", "Leader's View", "Culture", "Service", "People", "Tech", "Impact"];

/** `story-list` template (docs/routes.md): category tabs + search over a card grid. */
export function StoryListPage({ stories, initialQuery = "" }: { stories: Story[]; initialQuery?: string }) {
  const [category, setCategory] = useState<"All" | StoryCategory>("All");
  const [query, setQuery] = useState(initialQuery);
  const filtered = useMemo(
    () => stories.filter((story) => (category === "All" || story.category === category) && (!query || `${story.title} ${story.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()))),
    [stories, category, query]
  );

  return (
    <main className="mx-auto max-w-7xl px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <h1 className="text-4xl font-bold tracking-tight md:text-6xl">스토리</h1>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="스토리 카테고리" className="flex flex-wrap gap-2">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={category === item}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                category === item ? "bg-zinc-900 text-white" : "border border-zinc-200 text-zinc-600 hover:bg-zinc-100"
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <form role="search" onSubmit={(event) => event.preventDefault()}>
          <input aria-label="스토리 검색" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="스토리 내 검색" className="rounded-full border border-zinc-200 px-4 py-1.5 text-sm" />
        </form>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((story) => (
          <a key={story.seq} href={`/story/storyDetail?seq=${story.seq}`} className="group overflow-hidden rounded-2xl border border-zinc-200">
            <div className="relative aspect-[4/3] overflow-hidden">
              <PlaceholderVisual label="스토리 썸네일" tone="light" className="absolute inset-0 h-full w-full transition-transform duration-200 min-[1024px]:group-hover:scale-105 motion-reduce:scale-100!" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span>{story.category}</span>
                <time>{story.date}</time>
              </div>
              <p className="mt-2 text-base font-semibold leading-snug">{story.title}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {story.tags.map((tag) => <span key={tag} className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">{tag}</span>)}
              </div>
            </div>
          </a>
        ))}
      </div>
      {!filtered.length && <p className="mt-10 text-center text-zinc-500">검색 결과가 없습니다.</p>}
    </main>
  );
}
