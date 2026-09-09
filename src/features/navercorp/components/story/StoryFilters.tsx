"use client";

import type { StoryCategory } from "@/types/story";

export const storyCategories: ("All" | StoryCategory)[] = ["All", "Leader's View", "Culture", "Service", "People", "Tech", "Impact"];
export function StoryFilters({ category, query, onCategory, onQuery }: { category: string; query: string; onCategory: (value: string) => void; onQuery: (value: string) => void }) {
  return <div className="story-filters"><div className="story-categories" role="tablist" aria-label="스토리 카테고리">{storyCategories.map((item) => <button key={item} type="button" role="tab" aria-selected={category === item} className={category === item ? "is-active" : ""} onClick={() => onCategory(item)}>{item}</button>)}</div><form className="story-search" role="search" onSubmit={(event) => event.preventDefault()}><input aria-label="스토리 검색" value={query} onChange={(event) => onQuery(event.target.value)} placeholder="스토리 내 검색" /><button type="submit" aria-label="검색">⌕</button></form></div>;
}
