"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export type TabAreaItem = { label: string; href: string };

/** Page-switching tab bar under the title band (docs/PRD-navercorp-ui-parity.md §6.3).
 * 61 / 61 / 63px tall with a bottom rule. Link tabs (they change route), so this is a
 * <nav> with aria-current rather than an ARIA tablist. On narrow screens the row scrolls
 * horizontally and keeps the active tab in view.
 *
 * `TabAreaButtons` below renders the same look for in-page tabs (state switch, real tablist). */
export function TabArea({ items, label = "페이지 탭" }: { items: TabAreaItem[]; label?: string }) {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[aria-current="page"]')?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [pathname]);

  return (
    <nav aria-label={label} className="border-b border-zinc-200">
      <ul ref={listRef} className="mx-auto flex h-[61px] max-w-[1920px] gap-8 overflow-x-auto px-gutter [scrollbar-width:none] xl:h-[63px] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href} className="flex shrink-0">
              <a
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex items-center whitespace-nowrap text-base transition-colors duration-200 md:text-lg ${
                  active ? "font-bold text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-ink" : "text-zinc-500 hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function TabAreaButtons({
  items,
  activeIndex,
  onSelect,
  label = "탭",
  idPrefix = "tab",
}: {
  items: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
  label?: string;
  idPrefix?: string;
}) {
  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowRight" ? 1 : -1) + items.length) % items.length;
    onSelect(next);
    document.getElementById(`${idPrefix}-${next}`)?.focus();
  };
  return (
    <div className="border-b border-zinc-200">
      <div role="tablist" aria-label={label} className="mx-auto flex h-[61px] max-w-[1920px] gap-8 overflow-x-auto px-gutter [scrollbar-width:none] xl:h-[63px] [&::-webkit-scrollbar]:hidden">
        {items.map((item, index) => {
          const active = index === activeIndex;
          return (
            <button
              key={item}
              id={`${idPrefix}-${index}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`${idPrefix}-panel`}
              tabIndex={active ? 0 : -1}
              onClick={() => onSelect(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`relative flex shrink-0 items-center whitespace-nowrap text-base transition-colors duration-200 md:text-lg ${
                active ? "font-bold text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-ink" : "text-zinc-500 hover:text-ink"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
