"use client";

import { useRef, useState } from "react";
import type { FeatureDetailContent } from "@/types/pageTemplates";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PlaceholderVisual } from "./main/PlaceholderVisual";

/** `feature-detail-with-related` template (docs/routes.md): dark full-bleed hero +
 * variant cards + external product links + a related-content carousel (manual
 * prev/next, no autoplay — matches what was observed on the source). Used by
 * /tech/hyperclovax (and siblings), /media/aiInNaver.
 * The carousel uses native scroll-snap instead of a JS-computed transform so the
 * number of visible cards adapts per breakpoint (1 on mobile, 2 on tablet, 3 on
 * desktop) without hardcoding a "cards per view" count. */
export function FeatureDetailPage({ content }: { content: FeatureDetailContent }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(content.related.length <= 1);
  const reducedMotion = useReducedMotion();

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4);
  };

  const scrollByPage = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <main className="pb-24">
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-zinc-900 px-5 text-center text-white">
        <PlaceholderVisual label="기술 히어로" tone="dark" className="absolute inset-0 h-full w-full opacity-50" />
        <div className="relative">
          <p className="text-sm font-medium text-white/70">{content.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">{content.title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/80">{content.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8" aria-labelledby="variants-heading">
        <h2 id="variants-heading" className="text-2xl font-bold">모델 라인업</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {content.variants.map((variant) => (
            <div key={variant.name} className="rounded-2xl border border-zinc-200 p-6">
              <p className="text-lg font-semibold">{variant.name}</p>
              <p className="mt-2 text-sm text-zinc-600">{variant.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8" aria-labelledby="products-heading">
        <h2 id="products-heading" className="text-2xl font-bold">연결되는 제품</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {content.products.map((product) => (
            <a key={product.title} href={product.href} target="_blank" rel="noopener" className="group rounded-2xl border border-zinc-200 p-6 transition-colors duration-200 hover:border-zinc-400">
              <p className="text-lg font-semibold">{product.title}</p>
              <p className="mt-2 text-sm text-zinc-600">{product.description}</p>
              <span className="mt-3 inline-block text-sm text-zinc-400 transition-colors duration-200 group-hover:text-zinc-900">바로가기 ↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 md:px-8" aria-labelledby="related-heading">
        <div className="flex items-center justify-between">
          <h2 id="related-heading" className="text-2xl font-bold">관련 콘텐츠</h2>
          <div className="flex gap-2">
            <button type="button" aria-label="이전 슬라이드" disabled={atStart} className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm disabled:opacity-30" onClick={() => scrollByPage(-1)}>←</button>
            <button type="button" aria-label="다음 슬라이드" disabled={atEnd} className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm disabled:opacity-30" onClick={() => scrollByPage(1)}>→</button>
          </div>
        </div>
        <div
          ref={trackRef}
          onScroll={updateEdges}
          className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {content.related.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="w-full shrink-0 snap-start overflow-hidden rounded-2xl border border-zinc-200 sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <PlaceholderVisual label="관련 콘텐츠" tone="light" className="absolute inset-0 h-full w-full" />
              </div>
              <div className="p-4">
                <time className="text-xs text-zinc-500">{item.date}</time>
                <p className="mt-1 text-sm font-semibold leading-snug">{item.title}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
