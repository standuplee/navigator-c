"use client";

import type { FeatureDetailContent } from "@/types/pageTemplates";
import { PlaceholderVisual } from "./main/PlaceholderVisual";
import { RelatedCarousel } from "./blocks/RelatedCarousel";

/** `feature-detail-with-related` template (docs/routes.md): dark full-bleed hero +
 * variant cards + external product links + the shared related-content carousel
 * (blocks/RelatedCarousel, PRD §6.5). Used by /tech/hyperclovax (and siblings), /media/aiInNaver.
 * Full tech-detail rebuild (video hero, anchor nav, dark theme) is PRD stage 4. */
export function FeatureDetailPage({ content }: { content: FeatureDetailContent }) {
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

      <RelatedCarousel
        items={content.related.map((item) => ({ id: item.id, title: item.title, href: item.href, date: item.date, category: item.category }))}
      />
    </main>
  );
}
