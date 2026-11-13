"use client";

import { useEffect, useRef, useState } from "react";
import type { NavMenuItem } from "@/types/mainTemplate";
import { BrandLogo } from "./BrandLogo";

/** Full-screen menu for mobile and tablet (<1024px), docs/PRD-navercorp-ui-parity.md §6.1.
 * Slides in from the right (.3s ease-out, docs/animations.md 1-7). Groups expand instantly
 * (1-8 — the reference has no height transition either). Focus is trapped while open and the
 * page behind is inert; Escape is handled by SiteHeader. */
export function MobileNav({
  open,
  onClose,
  navItems,
  brandName,
  lang,
  onLangChange,
}: {
  open: boolean;
  onClose: () => void;
  navItems: NavMenuItem[];
  brandName: string;
  lang: "KR" | "EN";
  onLangChange: (lang: "KR" | "EN") => void;
}) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div
      id="mobile-nav"
      ref={panelRef}
      className={`fixed inset-0 z-50 flex flex-col bg-white text-ink transition-transform duration-300 ease-out lg:hidden ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="전체 메뉴"
      inert={!open}
    >
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-zinc-200 px-gutter">
        <BrandLogo brandName={brandName} className="h-6" />
        <div className="flex items-center gap-1">
          <button type="button" className="rounded-full px-3 py-1.5 text-sm font-medium text-zinc-600 hover:bg-zinc-100" onClick={() => onLangChange(lang === "KR" ? "EN" : "KR")}>
            {lang}
          </button>
          <button ref={closeRef} type="button" aria-label="전체 메뉴 닫기" className="grid size-10 place-items-center rounded-full hover:bg-zinc-100" onClick={onClose}>
            <span aria-hidden="true">✕</span>
          </button>
        </div>
      </div>
      <ul className="flex-1 overflow-y-auto px-gutter py-4">
        {navItems.map((item) => {
          const isOpen = openGroup === item.label;
          return (
            <li key={item.label} className="border-b border-zinc-100 last:border-none">
              <button
                type="button"
                className="flex w-full items-center justify-between py-4 text-left text-xl font-bold"
                aria-expanded={isOpen}
                onClick={() => setOpenGroup(isOpen ? null : item.label)}
              >
                {item.label}
                <span aria-hidden="true" className={`inline-block text-base transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>⌄</span>
              </button>
              {isOpen && (
                <ul className="pb-4">
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <a href={child.href} className="block py-2 text-base text-zinc-600 hover:text-ink" onClick={onClose}>
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
