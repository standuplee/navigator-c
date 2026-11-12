"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export type AnchorItem = { id: string; label: string };

/** In-page section navigation with progress bar (PRD §6.4).
 *
 * Wrap the sections it controls: `<AnchorSection items={…}>{sections with matching ids}</AnchorSection>`.
 * - Sticky bar (56px) right under the header; when the header hides on scroll-down the bar
 *   slides up to the top (top .4s smooth ease), following the reference.
 * - Active link = section crossing the viewport's middle line (IntersectionObserver).
 * - Progress bar = scroll progress through the whole wrapped area (CSS --progress, width .2s).
 * - Click scrolls so the section starts just under the bar, then moves focus to its heading.
 * - Below 768px the bar shows the current section and opens the full list as a dropdown.
 * The bar scrolls away naturally at the end of the wrapper (sticky is bounded by it). */
export function AnchorSection({ items, children, tone = "light", label = "페이지 내 이동" }: { items: AnchorItem[]; children: ReactNode; tone?: "light" | "dark"; label?: string }) {
  const rootRef = useScrollProgress<HTMLDivElement>();
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const dark = tone === "dark";

  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter((node): node is HTMLElement => !!node);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  // Keep the active link visible in the horizontally scrolling list without moving the page.
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`[data-anchor="${active}"]`);
    if (!list || !link) return;
    list.scrollTo({ left: link.offsetLeft - list.clientWidth / 2 + link.clientWidth / 2, behavior: reduced ? "auto" : "smooth" });
  }, [active, reduced]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const go = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    setOpen(false);
    const barHeight = 56;
    const top = target.getBoundingClientRect().top + window.scrollY - barHeight;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    const heading = target.querySelector<HTMLElement>("h2, h3") ?? target;
    if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  };

  const activeLabel = items.find((item) => item.id === active)?.label ?? items[0]?.label;
  const bar = dark ? "bg-ink-dark-bg/95 text-white shadow-[0_1px_0_0_rgb(255_255_255/0.1)]" : "bg-white/95 text-ink shadow-[0_1px_0_0_rgb(228_228_231)]";
  const muted = dark ? "text-white/50 hover:text-white" : "text-zinc-500 hover:text-ink";
  const current = dark ? "font-bold text-white" : "font-bold text-ink";

  return (
    <div ref={rootRef} data-anchor-root className="relative">
      <nav
        aria-label={label}
        className={`sticky top-[var(--header-h)] z-30 h-14 backdrop-blur transition-[top] duration-400 ease-smooth scroll-down:top-0 ${bar}`}
      >
        <div className="absolute inset-x-0 top-0 h-0.5" aria-hidden="true">
          <div className={`h-full w-[calc(var(--progress,0)*100%)] transition-[width] duration-200 ${dark ? "bg-white" : "bg-ink"}`} />
        </div>

        {/* >=768: horizontal list */}
        <ul ref={listRef} className="mx-auto hidden h-full max-w-[1920px] items-center gap-8 overflow-x-auto px-gutter [scrollbar-width:none] md:flex [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                data-anchor={item.id}
                aria-current={active === item.id ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  go(item.id);
                }}
                className={`whitespace-nowrap text-base transition-colors duration-200 ease-smooth ${active === item.id ? current : muted}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* <768: current section + dropdown */}
        <div className="flex h-full items-center px-gutter md:hidden">
          <button type="button" aria-expanded={open} aria-controls="anchor-nav-list" onClick={() => setOpen((value) => !value)} className={`flex w-full items-center justify-between text-base ${current}`}>
            {activeLabel}
            <span aria-hidden="true" className={`inline-block transition-transform duration-200 ease-smooth ${open ? "rotate-180" : ""}`}>⌄</span>
          </button>
        </div>
        <div
          className={`absolute inset-x-0 top-full h-screen bg-black/40 transition-opacity duration-200 md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
        <ul
          id="anchor-nav-list"
          hidden={!open}
          className={`absolute inset-x-0 top-full px-gutter pb-4 md:hidden ${dark ? "bg-ink-dark-bg" : "bg-white"}`}
        >
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  go(item.id);
                }}
                className={`block py-3 text-base ${active === item.id ? current : muted}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {children}
    </div>
  );
}
