"use client";

import { useState } from "react";
import type { SectionLandingContent } from "@/types/pageTemplates";
import { PlaceholderVisual } from "./main/PlaceholderVisual";

/** `section-landing` template (docs/routes.md): hero + intro statement + tabbed
 * feature card grid + closing CTA. Used by /service/featuredServices, /tech/innovation. */
export function SectionLandingPage({ content }: { content: SectionLandingContent }) {
  const [activeTab, setActiveTab] = useState(0);
  const tab = content.tabs[activeTab];

  return (
    <main className="pb-24 pt-28 md:pt-32">
      <section className="mx-auto max-w-5xl px-5 text-center md:px-8">
        <p className="text-sm font-medium text-zinc-500">{content.heroEyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">{content.heroTitle}</h1>
      </section>

      <section className="mx-auto mt-24 max-w-3xl px-5 text-center md:px-8">
        <p className="text-sm font-medium text-zinc-500">{content.introEyebrow}</p>
        <h2 className="mt-3 text-3xl font-bold">{content.introTitle}</h2>
        <p className="mt-4 text-zinc-600">{content.introDescription}</p>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8" aria-labelledby="landing-cards-heading">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 id="landing-cards-heading" className="text-2xl font-bold">주요 {tab.label}</h2>
          {content.tabs.length > 1 && (
            <div role="tablist" className="inline-flex gap-1 rounded-full bg-zinc-100 p-1">
              {content.tabs.map((t, index) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === index}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                    activeTab === index ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-200"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {tab.cards.map((card) => (
            <a key={card.no} href={card.href} className="group overflow-hidden rounded-2xl border border-zinc-200">
              <div className="relative aspect-[16/9] overflow-hidden">
                <PlaceholderVisual label={`${card.category} 비주얼`} tone="light" className="absolute inset-0 h-full w-full transition-transform duration-200 ease-[cubic-bezier(.33,1,.68,1)] min-[1024px]:group-hover:scale-105 motion-reduce:scale-100!" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-700">{card.no}</span>
              </div>
              <div className="p-6">
                <p className="text-xs font-medium text-zinc-500">{card.category}</p>
                <p className="mt-2 text-lg font-semibold leading-snug">{card.title}</p>
                <p className="mt-2 text-sm text-zinc-600">{card.text}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-3xl px-5 text-center md:px-8">
        <h2 className="text-2xl font-bold">{content.ctaTitle}</h2>
        <p className="mt-3 text-zinc-600">{content.ctaDescription}</p>
        <a href={content.ctaHref} className="mt-6 inline-flex items-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800">
          전체 서비스 보러가기
        </a>
      </section>
    </main>
  );
}
