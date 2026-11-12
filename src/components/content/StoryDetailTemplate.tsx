"use client";

import type { StoryDetail } from "@/types/story";
import type { RelatedItem } from "./blocks/RelatedCarousel";
import { ArticleChrome } from "./blocks/ArticleChrome";
import { MarkdownRenderer } from "./MarkdownRenderer";

/** `story-detail` (PRD §7.9): shared article chrome with hero image, markdown body,
 * keyword chips linking back to the filtered list, and related stories. */
export function StoryDetailTemplate({ story, related = [] }: { story: StoryDetail; related?: RelatedItem[] }) {
  return (
    <ArticleChrome
      category={story.category}
      title={story.title}
      date={story.date}
      hero={{ label: "대표 이미지" }}
      listHref="/story"
      tags={story.tags}
      tagHrefBase="/story?keyword="
      related={related}
    >
      <MarkdownRenderer markdown={story.markdown} />
    </ArticleChrome>
  );
}
