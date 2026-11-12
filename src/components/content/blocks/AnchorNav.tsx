"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export type AnchorItem = { id: string; label: string };

/** In-page section bar with reading progress (PRD §6.4, measured on the reference).
 *
 * Wrap the sections it controls: `<AnchorSection items={…}>{sections with matching ids}</AnchorSection>`.
 * - Takes no layout space: a zero-height sticky holder at the top of the wrapper carries a 48px
 *   bar that only appears (opacity .2s soft) once the wrapper's top has passed the viewport top,
 *   and fades out again before the wrapper ends. It sits under the header and moves to the top
 *   when the header hides on scroll-down (top .4s smooth).
 * - Bar: white / rgb(10,13,18) at 80% with a 48px backdrop blur, 1px bottom rule, 3px progress
 *   line on top (orange #ff5f00, white on dark; width .2s ease) for the whole wrapper.
 * - One item ("single", most sub pages): just the page / section name (20px). Several items:
 *   optional page `title` (20px) then the section links (14px; current 600 + ink, others
 *   gray-500 / gray-400 on dark; colour .2s). Below 768px the current section (18px) opens the
 *   full list as a dropdown (42px rows).
 * - Active link = section crossing the viewport's middle line. Clicking scrolls the section to
 *   just under the bar and focuses its heading. */
export function AnchorSection({
  items,
  children,
  title,
  tone = "light",
  label = "페이지 내 이동",
}: {
  items: AnchorItem[];
  children: ReactNode;
  title?: string;
  tone?: "light" | "dark";
  label?: string;
}) {
  const rootRef = useScrollProgress<HTMLDivElement>();
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const reduced = useReducedMotion();
  const dark = tone === "dark";
  const single = items.length <= 1;

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

  // Show the bar only while the wrapper spans the viewport top.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = root.getBoundingClientRect();
      setShown(rect.top < 1 && rect.bottom > 96);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [rootRef]);
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
    const barHeight = 48;
    const top = target.getBoundingClientRect().top + window.scrollY - barHeight;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    const heading = target.querySelector<HTMLElement>("h2, h3") ?? target;
    if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  };

  const activeLabel = items.find((item) => item.id === active)?.label ?? items[0]?.label;
  const bar = dark ? "border-white/10 bg-[rgb(10_13_18/0.8)] text-white" : "border-[#e9eaeb] bg-white/80 text-ink";
  const muted = dark ? "font-normal text-[#a4a7ae] hover:text-white" : "font-normal text-[#717680] hover:text-ink";
  const current = dark ? "font-semibold text-white" : "font-semibold text-ink";
  const link = (item: AnchorItem, className: string) => (
    <a
      href={`#${item.id}`}
      data-anchor={item.id}
      aria-current={active === item.id ? "true" : undefined}
      onClick={(event) => {
        event.preventDefault();
        go(item.id);
      }}
      className={`${className} transition-colors duration-200 ease-smooth ${active === item.id ? current : muted}`}
    >
      {item.label}
    </a>
  );

  return (
    <div ref={rootRef} data-anchor-root className="relative">
      <div className="sticky top-[var(--header-h)] z-30 h-0 transition-[top] duration-400 ease-smooth scroll-down:top-0">
        <nav
          aria-label={label}
          aria-hidden={!shown}
          inert={!shown}
          className={`absolute inset-x-0 top-0 h-12 border-b backdrop-blur-[48px] transition-[opacity,visibility] duration-200 ease-smooth-soft ${shown ? "visible opacity-100" : "invisible opacity-0"} ${bar}`}
        >
          <div className="absolute inset-x-0 top-0 h-[3px]" aria-hidden="true">
            <div className={`h-full w-[calc(var(--progress,0)*100%)] transition-[width] duration-200 ease-[ease] ${dark ? "bg-white" : "bg-[#ff5f00]"}`} />
          </div>

          {/* >=768: page / section name, then the links */}
          <div className="mx-auto hidden h-full max-w-[1280px] items-center gap-8 px-gutter md:flex">
            {(single || title) && <p className="shrink-0 text-xl font-semibold">{single ? items[0]?.label : title}</p>}
            {!single && (
              <ul ref={listRef} className="flex h-full min-w-0 items-center gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {items.map((item) => (
                  <li key={item.id} className="shrink-0">
                    {link(item, "whitespace-nowrap text-sm")}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* <768: current section, full list in a dropdown */}
          <div className="flex h-full items-center px-gutter md:hidden">
            {single ? (
              <p className="text-lg font-semibold">{items[0]?.label}</p>
            ) : (
              <button type="button" aria-expanded={open} aria-controls="anchor-nav-list" onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between text-lg font-semibold">
                {activeLabel}
                <span aria-hidden="true" className={`inline-block transition-transform duration-200 ease-smooth ${open ? "rotate-180" : ""}`}>⌄</span>
              </button>
            )}
          </div>
          {!single && (
            <>
              <div
                className={`absolute inset-x-0 top-full h-screen bg-black/40 transition-opacity duration-200 md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
                aria-hidden="true"
                onClick={() => setOpen(false)}
              />
              <ul id="anchor-nav-list" hidden={!open} className={`absolute inset-x-0 top-full px-gutter pb-2 md:hidden ${dark ? "bg-ink-dark-bg" : "bg-white"}`}>
                {items.map((item) => (
                  <li key={item.id}>{link(item, "flex h-[42px] items-center text-sm")}</li>
                ))}
              </ul>
            </>
          )}
        </nav>
      </div>
      {children}
    </div>
  );
}
