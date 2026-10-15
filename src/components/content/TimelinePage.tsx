"use client";

import { useState } from "react";
import type { TimelineContent } from "@/types/pageTemplates";

/** `timeline-list` template (docs/routes.md): tabs switch between year-by-year
 * event lists. Used by /company/history. */
export function TimelinePage({ content }: { content: TimelineContent }) {
  const [activeTab, setActiveTab] = useState(0);
  const tab = content.tabs[activeTab];

  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{content.title}</h1>

      {content.tabs.length > 1 && (
        <div role="tablist" className="mt-10 inline-flex gap-1 rounded-full bg-zinc-100 p-1">
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

      <ol className="mt-10 space-y-8 border-l-2 border-zinc-200 pl-8">
        {tab.events.map((event) => (
          <li key={`${event.year}-${event.title}`}>
            <span className="text-sm font-semibold text-zinc-400">{event.year}</span>
            <p className="mt-1 text-lg font-semibold">{event.title}</p>
            {event.description && <p className="mt-1 text-sm text-zinc-600">{event.description}</p>}
          </li>
        ))}
      </ol>
    </main>
  );
}
