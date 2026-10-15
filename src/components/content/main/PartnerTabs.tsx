"use client";

import { useRef, useState } from "react";
import type { PartnerTabGroup } from "@/types/mainTemplate";

/** ARIA tab pattern (docs/animations.md §6): ArrowLeft/Right moves focus+selection. */
export function PartnerTabs({ groups }: { groups: PartnerTabGroup[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = (active + (event.key === "ArrowRight" ? 1 : groups.length - 1)) % groups.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="py-20" aria-labelledby="partner-heading">
      <h2 id="partner-heading" className="text-2xl font-bold tracking-tight">함께 성장하는 파트너</h2>
      <div role="tablist" aria-label="파트너 지원 분류" className="mt-6 inline-flex gap-1 rounded-full bg-zinc-100 p-1" onKeyDown={onKeyDown}>
        {groups.map((group, index) => (
          <button
            key={group.id}
            ref={(el) => { tabRefs.current[index] = el; }}
            type="button"
            role="tab"
            id={`partner-tab-${group.id}`}
            aria-controls={`partner-panel-${group.id}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ease-[cubic-bezier(.33,1,.68,1)] ${
              active === index ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-200"
            }`}
            onClick={() => setActive(index)}
          >
            {group.label}
          </button>
        ))}
      </div>
      {groups.map((group, index) => (
        <div
          key={group.id}
          role="tabpanel"
          id={`partner-panel-${group.id}`}
          aria-labelledby={`partner-tab-${group.id}`}
          hidden={active !== index}
          className="mt-6 flex flex-wrap gap-3"
        >
          {group.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors duration-200 hover:bg-zinc-100"
            >
              {link.label}
            </a>
          ))}
        </div>
      ))}
    </section>
  );
}
