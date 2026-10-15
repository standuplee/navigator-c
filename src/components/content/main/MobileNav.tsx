"use client";

import { useState } from "react";
import type { NavMenuItem } from "@/types/mainTemplate";

/** Mobile drawer: slides in from the right (docs/animations.md 1-7), nested groups
 * toggle open/closed instantly (1-8 — the source has no height transition there either). */
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

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`fixed inset-y-0 right-0 z-50 w-[85vw] max-w-sm bg-white shadow-xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="모바일 메뉴"
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <span className="font-bold">{brandName}</span>
          <div className="flex items-center gap-3">
            <button type="button" className="text-sm font-medium text-zinc-600" onClick={() => onLangChange(lang === "KR" ? "EN" : "KR")}>
              {lang}
            </button>
            <button type="button" aria-label="메뉴 닫기" className="rounded-full p-2 hover:bg-zinc-100" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>
        <ul className="overflow-y-auto px-2 py-2">
          {navItems.map((item) => {
            const isOpen = openGroup === item.label;
            return (
              <li key={item.label} className="border-b border-zinc-100 last:border-none">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-3 py-3 text-left text-base font-medium"
                  aria-expanded={isOpen}
                  onClick={() => setOpenGroup(isOpen ? null : item.label)}
                >
                  {item.label}
                  <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <ul className="pb-2 pl-3">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a href={child.href} className="block px-3 py-2 text-sm text-zinc-600" onClick={onClose}>
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
    </>
  );
}
