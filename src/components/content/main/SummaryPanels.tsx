"use client";

import { useState } from "react";
import type { SummaryPanel } from "@/types/mainTemplate";
import { PlaceholderVisual } from "./PlaceholderVisual";

/** Expanding panel summary (docs/animations.md §5): width/opacity transition at
 * 600ms cubic-bezier(.25,1,.5,1), with the CTA link appearing only after the panel
 * has finished expanding (same delay as the panel transition). */
export function SummaryPanels({ panels }: { panels: SummaryPanel[] }) {
  const [active, setActive] = useState(0);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActive(index); }
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      setActive((index + (event.key === "ArrowRight" ? 1 : panels.length - 1)) % panels.length);
    }
  };

  return (
    <section className="py-20" aria-labelledby="summary-heading">
      <h2 id="summary-heading" className="text-2xl font-bold tracking-tight">주요 제품과 기술 요약</h2>
      <div className="mt-8 flex h-[420px] gap-2 overflow-hidden rounded-3xl">
        {panels.map((panel, index) => {
          const isActive = active === index;
          return (
            <div
              key={panel.id}
              role="region"
              aria-expanded={isActive}
              tabIndex={0}
              style={{ width: isActive ? "70%" : "30%" }}
              className="relative cursor-pointer overflow-hidden bg-zinc-900 transition-[width] duration-[600ms] ease-[cubic-bezier(.25,1,.5,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <PlaceholderVisual
                label="제품·기술 비주얼"
                tone="dark"
                className={`absolute inset-0 h-full w-full transition-transform duration-[600ms] ease-[cubic-bezier(.25,1,.5,1)] ${
                  isActive ? "scale-100" : "scale-[1.15]"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <p
                className={`absolute left-6 top-6 text-sm font-medium text-white transition-opacity duration-300 ease-[cubic-bezier(.25,1,.5,1)] ${
                  isActive ? "opacity-100" : "opacity-70"
                }`}
              >
                {panel.label}
              </p>
              <div className="absolute inset-x-6 bottom-6 text-white">
                <p
                  className={`font-bold leading-snug transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(.25,1,.5,1)] ${
                    isActive ? "translate-y-0 text-2xl opacity-100" : "translate-y-2 text-base opacity-80"
                  }`}
                >
                  {panel.title}
                </p>
                {isActive && (
                  <>
                    <p className="mt-2 max-w-md text-sm text-white/80">{panel.description}</p>
                    <a
                      href={panel.href}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white motion-safe:[animation:fadeIn_200ms_ease-out_600ms_both] motion-reduce:opacity-100"
                    >
                      자세히 보기 →
                    </a>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </section>
  );
}
