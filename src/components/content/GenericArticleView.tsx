"use client";

import type { ArticleDetail } from "@/types/content";
import type { RelatedItem } from "./blocks/RelatedCarousel";
import { ArticleBody } from "./blocks/ArticleBody";
import { ArticleChrome } from "./blocks/ArticleChrome";

/** Article detail on the shared chrome for event and AI articles (PRD §7.9). */
export function GenericArticleView({
  article,
  listHref,
  tagHrefBase,
  related,
}: {
  article: ArticleDetail & { tags?: string[] };
  listHref: string;
  tagHrefBase?: string;
  related?: RelatedItem[];
}) {
  return (
    <ArticleChrome category={article.category} title={article.title} date={article.date} listHref={listHref} tags={article.tags} tagHrefBase={tagHrefBase} related={related}>
      <ArticleBody article={article} />
    </ArticleChrome>
  );
}
