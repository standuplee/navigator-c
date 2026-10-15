"use client";

import { useEffect, useState } from "react";
import type { ServiceDetailContent } from "@/types/pageTemplates";
import { PlaceholderVisual } from "./main/PlaceholderVisual";

/** `service-detail` template (docs/routes.md): hero + intro block + repeated
 * alternating content sections, with a scroll-progress indicator.
 * Used by /service/search, /advertisement, /commerce, /map. */
export function ServiceDetailTemplate({ content }: { content: ServiceDetailContent }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <main className="pb-24">
      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-zinc-100" aria-hidden="true">
        <div className="h-full bg-zinc-900 transition-[width] duration-100" style={{ width: `${progress * 100}%` }} />
      </div>

      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-zinc-900 px-5 text-center text-white">
        <PlaceholderVisual label="서비스 히어로" tone="dark" className="absolute inset-0 h-full w-full opacity-60" />
        <div className="relative">
          <p className="text-sm font-medium text-white/70">{content.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">{content.title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/80">{content.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8">
        <h2 className="text-2xl font-bold">{content.introTitle}</h2>
        <p className="mt-4 text-zinc-600">{content.introDescription}</p>
      </section>

      <div className="mx-auto max-w-5xl space-y-24 px-5 md:px-8">
        {content.sections.map((section, index) => (
          <article key={section.title} className={`grid items-center gap-10 md:grid-cols-2 ${index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <PlaceholderVisual label="섹션 비주얼" tone="light" className="aspect-[4/3] rounded-3xl" />
            <div>
              <span className="text-sm font-semibold text-zinc-400">0{index + 1}</span>
              <h3 className="mt-2 text-2xl font-bold">{section.title}</h3>
              <p className="mt-3 text-zinc-600">{section.body}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
