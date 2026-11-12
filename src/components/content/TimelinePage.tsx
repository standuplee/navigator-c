"use client";

import { useState } from "react";
import type { TimelineContent } from "@/types/pageTemplates";
import { TabAreaButtons } from "./main/TabArea";

/** `timeline-list` template (docs/routes.md): tabs switch between year-by-year
 * event lists. Used by /company/history. */
export function TimelinePage({ content }: { content: TimelineContent }) {
  const [activeTab, setActiveTab] = useState(0);
  const tab = content.tabs[activeTab];

  return (
    <>
      {content.tabs.length > 1 && (
        <TabAreaButtons
          items={content.tabs.map((t) => t.label)}
          activeIndex={activeTab}
          onSelect={setActiveTab}
          label="연혁 구분"
          idPrefix="history-tab"
        />
      )}
      <main id="history-tab-panel" role={content.tabs.length > 1 ? "tabpanel" : undefined} className="mx-auto max-w-3xl px-gutter pb-24 pt-12 md:pt-16">
      <ol className="space-y-8 border-l-2 border-zinc-200 pl-8">
        {tab.events.map((event) => (
          <li key={`${event.year}-${event.title}`}>
            <span className="text-sm font-semibold text-zinc-400">{event.year}</span>
            <p className="mt-1 text-lg font-semibold">{event.title}</p>
            {event.description && <p className="mt-1 text-sm text-zinc-600">{event.description}</p>}
          </li>
        ))}
      </ol>
      </main>
    </>
  );
}
