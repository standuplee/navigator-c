"use client";

import type { ReactNode } from "react";
import type { ArticleDetail } from "@/types/content";

export function ArticleDetailPage({ article, onShare, children }: { article: ArticleDetail; onShare: () => void; children?: ReactNode }) {
  return <>
    <section className="board-view-header black">
      <div className="data-inner">
        <div className="cate"><span className="cate-txt">{article.category}</span></div>
        <div className="title"><h2>{article.title}</h2></div>
        <div className="options"><span className="date">{article.date}</span><button className="btn-share" type="button" aria-label="공유하기" onClick={onShare}>공유하기</button></div>
      </div>
    </section>
    <section className="board-view-body">
      <article className="board-view-detail">
        <div className="board-view-data">
          <h3>{article.title}</h3><p className="article-date">{article.publishedAt}</p>
          {article.images.map((image) => <figure key={image.src}><img src={image.src} alt={image.alt} /><figcaption>{image.caption}</figcaption></figure>)}
          {article.paragraphs.map((paragraph, index) => <p key={`${article.title}-${index}`}>{paragraph}</p>)}
        </div>
        {children}
      </article>
    </section>
  </>;
}
