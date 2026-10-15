"use client";

import type { ReactNode } from "react";
import type { ArticleDetail } from "@/types/content";
import { PlaceholderVisual } from "./main/PlaceholderVisual";

/** `article-detail` template (docs/routes.md): heading + body (placeholder images +
 * paragraphs) + share action. Used by /media/pressReleasesDetail. */
export function ArticleDetailPage({ article, onShare, children }: { article: ArticleDetail; onShare: () => void; children?: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <p className="text-sm font-medium text-zinc-500">{article.category}</p>
      <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{article.title}</h1>
      <div className="mt-4 flex items-center justify-between border-b border-zinc-200 pb-6">
        <time className="text-sm text-zinc-500">{article.date}</time>
        <button type="button" className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium hover:bg-zinc-50" onClick={onShare}>
          공유하기
        </button>
      </div>
      <div className="prose-content mt-8 space-y-6">
        <p className="text-right text-sm text-zinc-400">{article.publishedAt}</p>
        {article.images.map((image) => (
          <figure key={image.alt}>
            <PlaceholderVisual label={image.alt || "본문 이미지"} tone="light" className="aspect-[16/9] rounded-2xl" />
            {image.caption && <figcaption className="mt-2 text-center text-xs text-zinc-500">{image.caption}</figcaption>}
          </figure>
        ))}
        {article.paragraphs.map((paragraph, index) => (
          <p key={`${article.title}-${index}`} className="text-base leading-relaxed text-zinc-700">{paragraph}</p>
        ))}
      </div>
      {children}
    </article>
  );
}
