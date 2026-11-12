"use client";

import type { ArticleDetail } from "@/types/content";
import { ArticleChrome } from "./blocks/ArticleChrome";
import { ArticleBody } from "./blocks/ArticleBody";

/** /media/pressReleasesDetail — shared article chrome (PRD §6.9), no related carousel (as reference). */
export function PressReleaseDetailView({ article }: { article: ArticleDetail }) {
  return (
    <ArticleChrome category={article.category} title={article.title} date={article.date} listHref="/news">
      <ArticleBody article={article} />
    </ArticleChrome>
  );
}
