"use client";

import { useMemo, useState } from "react";
import type { Story } from "@/types/story";
import { StoryCard } from "./StoryCard";
import { StoryFilters } from "./StoryFilters";

export function StoryGrid({ stories, initialQuery = "" }: { stories: Story[]; initialQuery?: string }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState(initialQuery);
  const filtered = useMemo(() => stories.filter((story) => (category === "All" || story.category === category) && (!query || `${story.title} ${story.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()))), [stories, category, query]);
  return <section className="story-library"><StoryFilters category={category} query={query} onCategory={setCategory} onQuery={setQuery} /><div className="story-grid">{filtered.map((story) => <StoryCard key={story.seq} story={story} />)}</div>{filtered.length === 0 && <p className="story-empty">검색 결과가 없습니다.</p>}</section>;
}
