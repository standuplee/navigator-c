"use client";

import { useState } from "react";
import type { TimelineContent, TimelineEvent } from "@/types/pageTemplates";
import { TabAreaButtons } from "./main/TabArea";
import { Reveal } from "./blocks/Reveal";
import { AnchorSection } from "./blocks/AnchorNav";

function groupByYear(events: TimelineEvent[]) {
  const groups: { year: string; events: TimelineEvent[] }[] = [];
  for (const event of events) {
    const last = groups[groups.length - 1];
    if (last && last.year === event.year) last.events.push(event);
    else groups.push({ year: event.year, events: [event] });
  }
  return groups;
}

/** /company/history (PRD §7.6). In-page tabs (주요 연혁 / 수상 내역) switch the panel; each panel
 * is a 32px section title then year groups: year column (403px, 26px bold) | rows of
 * month (120px) + title (16–18px). Rows fade up as they enter. Below 1024px the year sits
 * above its rows. */
export function TimelinePage({ content }: { content: TimelineContent }) {
  const [activeTab, setActiveTab] = useState(0);
  const tab = content.tabs[activeTab];
  const groups = groupByYear(tab.events);

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
      <AnchorSection items={[{ id: "history-tab-panel", label: tab.label }]}>
      <main
        id="history-tab-panel"
        role={content.tabs.length > 1 ? "tabpanel" : undefined}
        className="mx-auto max-w-[1280px] px-gutter pb-24 pt-16 xl:pb-40 xl:pt-24"
      >
        <h2 className="text-section-title">{tab.label}</h2>
        <ol key={tab.id} className="mt-10 flex flex-col xl:mt-16">
          {groups.map((group) => (
            <Reveal
              as="li"
              key={group.year}
              className="grid gap-4 border-t border-zinc-200 py-8 lg:grid-cols-[403px_1fr] lg:gap-0 xl:py-12"
            >
              <p className="text-[22px] font-bold leading-tight md:text-[26px]">{group.year}</p>
              <ul className="flex flex-col gap-5 xl:gap-6">
                {group.events.map((event) => (
                  <li key={`${event.month}-${event.title}`} className="grid grid-cols-[72px_1fr] gap-2 md:grid-cols-[120px_1fr]">
                    <span className="text-base font-semibold text-zinc-500">{event.month ?? ""}</span>
                    <div>
                      <p className="text-base leading-relaxed text-ink xl:text-lg">{event.title}</p>
                      {event.description && <p className="mt-1 text-sm leading-relaxed text-zinc-500 xl:text-base">{event.description}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </main>
      </AnchorSection>
    </>
  );
}
