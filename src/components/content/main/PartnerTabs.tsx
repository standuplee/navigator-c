"use client";

import { useRef, useState } from "react";
import type { PartnerTabGroup } from "@/types/mainTemplate";

/** "함께 성장하는" (PRD §7.11, measured 792 / 613 / 650 tall): pill tabs (105×40, 14px; active
 * ink, others tinted) over six link cards per tab — 1 / 3 / 3 columns, 70 / 121 / 136px tall,
 * 20px labels. ARIA tab pattern: Left/Right move focus and selection. */
export function PartnerTabs({ groups, title = "함께 성장하는 파트너" }: { groups: PartnerTabGroup[]; title?: string }) {
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
    <section aria-labelledby="partner-heading" className="mx-auto max-w-[1280px] px-gutter py-20 md:py-24">
      <h2 id="partner-heading" className="text-[26px] font-semibold text-ink xl:text-[32px]">{title}</h2>
      <div role="tablist" aria-label={`${title} 분류`} className="mt-8 flex gap-2 md:mt-12 md:gap-4" onKeyDown={onKeyDown}>
        {groups.map((group, index) => (
          <button
            key={group.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`partner-tab-${group.id}`}
            aria-controls={`partner-panel-${group.id}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            className={`h-10 rounded-full px-5 text-sm transition-colors duration-200 ease-smooth ${
              active === index ? "bg-ink text-white" : "bg-[#f2f4f5] text-ink hover:bg-zinc-200"
            }`}
            onClick={() => setActive(index)}
          >
            {group.label}
          </button>
        ))}
      </div>
      {groups.map((group, index) => (
        <ul
          key={group.id}
          role="tabpanel"
          id={`partner-panel-${group.id}`}
          aria-labelledby={`partner-tab-${group.id}`}
          hidden={active !== index}
          className={`mt-8 gap-4 md:grid-cols-3 md:gap-6 ${active === index ? "grid" : "hidden"}`}
        >
          {group.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="group flex h-[70px] items-center justify-between rounded-lg bg-[#f2f4f5] px-5 text-lg font-semibold text-ink transition-colors duration-200 hover:bg-zinc-200 md:h-[121px] md:items-start md:py-5 xl:h-[136px] xl:p-6 xl:text-xl"
              >
                {link.label}
                <span aria-hidden="true" className="text-base motion-safe:can-hover:group-hover:animate-nudge-x md:self-end">↗</span>
              </a>
            </li>
          ))}
        </ul>
      ))}
    </section>
  );
}
