"use client";

import { useMemo, useState } from "react";
import type { ServiceDirectoryContent } from "@/types/pageTemplates";

/** `service-directory` template (docs/routes.md): category tabs + A-Z sort toggle
 * over a flat link grid. Used by /service/all. */
export function ServiceDirectoryPage({ content }: { content: ServiceDirectoryContent }) {
  const [category, setCategory] = useState("전체");
  const [sortAlpha, setSortAlpha] = useState(false);

  const items = useMemo(() => {
    const filtered = category === "전체" ? content.items : content.items.filter((item) => item.category === category);
    return sortAlpha ? [...filtered].sort((a, b) => a.name.localeCompare(b.name, "ko")) : filtered;
  }, [content.items, category, sortAlpha]);

  return (
    <main className="mx-auto max-w-7xl px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{content.title}</h1>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-4">
        <div role="tablist" aria-label="서비스 카테고리" className="flex flex-wrap gap-2">
          {["전체", ...content.categories].map((item) => (
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
        <button
          type="button"
          aria-pressed={sortAlpha}
          className="rounded-full border border-zinc-200 px-4 py-1.5 text-sm font-medium text-zinc-600 hover:bg-zinc-100"
          onClick={() => setSortAlpha((value) => !value)}
        >
          {sortAlpha ? "기본 순서로" : "가나다순 정렬"}
        </button>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className="block rounded-xl border border-zinc-200 px-4 py-3 text-sm font-medium transition-colors duration-200 hover:border-zinc-400 hover:bg-zinc-50"
            >
              {item.name}
              <span className="mt-1 block text-xs font-normal text-zinc-400">{item.category}</span>
            </a>
          </li>
        ))}
      </ul>
      {!items.length && <p className="mt-10 text-center text-zinc-500">해당 카테고리에 서비스가 없습니다.</p>}
    </main>
  );
}
