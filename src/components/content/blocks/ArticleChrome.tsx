"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { MediaSlot } from "./MediaSlot";
import { RelatedCarousel, type RelatedItem } from "./RelatedCarousel";

/** Shared detail-page chrome (docs/PRD-navercorp-ui-parity.md §6.9), used by every article-like
 * detail (press releases, reports, events, AI articles, stories, policies).
 * - Title block in a 780px column: category, title (26 / 26 / 48), date + share.
 * - Hero image 982×655 on desktop, full-bleed 3:2 on mobile.
 * - Scroll-title bar: once the title block has scrolled away it pins to the top while scrolling
 *   down (opacity .4s) and gets out of the way on scroll-up when the site header returns.
 *   Holds a back-to-list button, the title and a reading-progress bar.
 * - Body in the same 780px column, then keyword chips, the list button and optional related cards. */
export function ArticleChrome({
  category,
  title,
  date,
  hero,
  listHref,
  listLabel = "목록",
  tags,
  tagHrefBase,
  related,
  children,
}: {
  category: string;
  title: string;
  date: string;
  hero?: { src?: string; label?: string };
  listHref: string;
  listLabel?: string;
  tags?: string[];
  /** e.g. "/story?keyword=" — the tag is appended URL-encoded. */
  tagHrefBase?: string;
  related?: RelatedItem[];
  children: ReactNode;
}) {
  const rootRef = useScrollProgress<HTMLDivElement>();
  const headerRef = useRef<HTMLDivElement>(null);
  const [pastTitle, setPastTitle] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const node = headerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setPastTitle(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(id);
  }, [toast]);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setToast("링크를 복사했습니다.");
    } catch {
      /* user dismissed the share sheet */
    }
  };

  return (
    <div ref={rootRef}>
      <div
        className={`fixed inset-x-0 top-0 z-30 bg-white/95 shadow-[0_1px_0_0_rgb(228_228_231)] backdrop-blur transition-[opacity,transform] duration-400 ease-smooth-soft ${
          pastTitle ? "-translate-y-full opacity-0 scroll-down:translate-y-0 scroll-down:opacity-100" : "pointer-events-none -translate-y-full opacity-0"
        }`}
        aria-hidden={!pastTitle}
      >
        <div className="mx-auto flex h-12 max-w-[1280px] items-center gap-4 px-gutter xl:h-14">
          <a href={listHref} className="grid size-8 shrink-0 place-items-center rounded-full hover:bg-zinc-100" aria-label={`${listLabel}으로 돌아가기`} tabIndex={pastTitle ? 0 : -1}>
            <span aria-hidden="true">←</span>
          </a>
          <p className="truncate text-sm font-semibold md:text-base">{title}</p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-0.5" aria-hidden="true">
          <div className="h-full w-[calc(var(--progress,0)*100%)] bg-ink transition-[width] duration-200" />
        </div>
      </div>

      <article>
        <header ref={headerRef} className="mx-auto max-w-[780px] px-gutter pb-10 pt-[calc(var(--header-h)+32px)] md:px-0 xl:pb-10 xl:pt-[calc(var(--header-h)+64px)]">
          <p className="text-sm font-medium text-zinc-500">{category}</p>
          <h1 className="mt-5 text-article-title">{title}</h1>
          <div className="mt-8 flex items-center justify-between xl:mt-10">
            <time className="text-sm text-zinc-500">{date}</time>
            <button type="button" onClick={share} aria-label="공유하기" className="grid size-9 place-items-center rounded-full border border-zinc-300 transition-colors duration-200 hover:bg-zinc-100">
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </header>

        {hero && (
          <div className="mx-auto max-w-[982px] md:px-gutter xl:px-0">
            <MediaSlot src={hero.src} label={hero.label ?? "대표 이미지"} className="aspect-[3/2] md:rounded-2xl" />
          </div>
        )}

        <div className="mx-auto max-w-[780px] px-gutter pb-20 pt-12 md:px-0 xl:pb-28 xl:pt-24">
          {children}

          {tags && tags.length > 0 && (
            <ul className="mt-16 flex flex-wrap gap-2 border-t border-zinc-200 pt-8" aria-label="키워드">
              {tags.map((tag) => (
                <li key={tag}>
                  <a
                    href={tagHrefBase ? `${tagHrefBase}${encodeURIComponent(tag)}` : "#"}
                    className="inline-flex h-9 items-center rounded-full bg-zinc-100 px-4 text-sm text-zinc-600 transition-colors duration-200 hover:bg-zinc-200"
                  >
                    #{tag}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12 flex justify-center">
            <a href={listHref} className="inline-flex h-12 min-w-40 items-center justify-center rounded-full border border-ink px-8 text-sm font-semibold transition-colors duration-200 hover:bg-ink hover:text-white">
              {listLabel}
            </a>
          </div>
        </div>
      </article>

      {related && related.length > 0 && <RelatedCarousel items={related} />}

      {toast && (
        <p role="status" className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm text-white">
          {toast}
        </p>
      )}
    </div>
  );
}
