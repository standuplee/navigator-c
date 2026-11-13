"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { NavMenuItem } from "@/types/mainTemplate";
import { MobileNav } from "./MobileNav";
import { BrandLogo } from "./BrandLogo";

export type HeaderTheme = "white" | "transparent" | "dark" | "transparent-dark";

/** Per-theme classes. `transparent` turns white once the page scrolls (scrolled: variant,
 * driven by ScrollState) — used on the about page and article detail pages. `dark` is the
 * tech section look; `transparent-dark` (about story) stays white-on-dark and only gains a
 * translucent dark bar once scrolled (PRD §4.7, §6.1). */
const THEMES: Record<HeaderTheme, { bar: string; text: string; hover: string; panelOffset: string }> = {
  white: {
    bar: "bg-white shadow-[0_1px_0_0_rgb(228_228_231)]",
    text: "text-ink",
    hover: "hover:bg-zinc-100 focus-visible:bg-zinc-100",
    panelOffset: "",
  },
  transparent: {
    bar: "bg-transparent scrolled:bg-white/95 scrolled:shadow-[0_1px_0_0_rgb(228_228_231)] scrolled:backdrop-blur",
    text: "text-ink",
    hover: "hover:bg-zinc-900/5 focus-visible:bg-zinc-900/5",
    panelOffset: "",
  },
  dark: {
    bar: "bg-ink-dark-bg shadow-[0_1px_0_0_rgb(255_255_255/0.1)]",
    text: "text-white",
    hover: "hover:bg-white/10 focus-visible:bg-white/10",
    panelOffset: "",
  },
  "transparent-dark": {
    bar: "bg-transparent scrolled:bg-ink-dark-bg/90 scrolled:shadow-[0_1px_0_0_rgb(255_255_255/0.1)] scrolled:backdrop-blur",
    text: "text-white",
    hover: "hover:bg-white/10 focus-visible:bg-white/10",
    panelOffset: "",
  },
};

/** Site header (docs/PRD-navercorp-ui-parity.md §6.1).
 * - Height 48 / 48 / 64 (xl). The main page starts at 100px on desktop and shrinks to 64px
 *   once scrolled.
 * - Sub pages hide the header while scrolling down and bring it back on scroll-up
 *   (translateY, .4s smooth ease). The main page never hides it.
 * - Desktop mega menu from 1024px; below that a hamburger opens the full-screen menu.
 * Mega menu / search timings follow docs/animations.md §1. */
export function SiteHeader({
  brandName,
  navItems,
  theme = "white",
  variant = "sub",
}: {
  brandName: string;
  navItems: NavMenuItem[];
  theme?: HeaderTheme;
  variant?: "main" | "sub";
}) {
  const t = THEMES[theme];
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState<"KR" | "EN">("KR");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const lock = mobileOpen || searchOpen;
    document.documentElement.classList.toggle("overflow-hidden", lock);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [mobileOpen, searchOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setSearchOpen(false);
      setMobileOpen(false);
      setLangOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const hideOnScroll = variant === "sub" && !mobileOpen && !searchOpen;
  const height = variant === "main" ? "h-12 xl:h-[100px] xl:scrolled:h-16" : "h-12 xl:h-16";

  return (
    <>
      <header
        data-header-theme={theme}
        className={`fixed inset-x-0 top-0 z-40 transition-[transform,background-color,box-shadow] duration-400 ease-smooth ${t.bar} ${
          hideOnScroll ? "scroll-down:-translate-y-full" : ""
        }`}
      >
        <div className={`mx-auto flex max-w-[1920px] items-center justify-between px-gutter transition-[height] duration-400 ease-smooth ${height}`}>
          <Link href="/" className="flex items-center">
            <BrandLogo brandName={brandName} />
          </Link>

          <nav className="hidden lg:block" aria-label="주요 메뉴">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.label} className="group relative">
                  <a href={item.href} className={`block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${t.text} ${t.hover}`}>
                    {item.label}
                  </a>
                  <div
                    className="invisible absolute left-1/2 top-full w-60 -translate-x-1/2 translate-y-1 rounded-2xl border border-zinc-200 bg-white p-3 opacity-0 shadow-lg transition-all duration-400 ease-menu group-hover:visible group-hover:translate-y-2 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-2 group-focus-within:opacity-100"
                    role="menu"
                  >
                    {/* docs/animations.md 1-4/1-6: panel frame opens on its own timing while the
                       intro label and each link cascade in with their own delay. */}
                    <p className="px-3 pb-2 text-xs font-medium text-zinc-400 opacity-0 transition-opacity duration-200 delay-0 group-hover:opacity-100 group-hover:delay-300 group-focus-within:opacity-100 group-focus-within:delay-300">
                      {item.label}
                    </p>
                    {item.children.map((child, childIndex) => (
                      <a
                        key={child.label}
                        href={child.href}
                        role="menuitem"
                        style={{ transitionDelay: `${childIndex * 40}ms` }}
                        className="block -translate-y-1 rounded-lg px-3 py-2 text-sm text-zinc-600 opacity-0 transition-[opacity,transform,background-color] duration-200 ease-menu hover:bg-zinc-100 hover:text-zinc-900 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <div className="relative hidden lg:block">
              <button
                type="button"
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${t.text} ${t.hover}`}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((value) => !value)}
              >
                {lang}
              </button>
              {langOpen && (
                <ul role="listbox" className="absolute right-0 top-full mt-2 w-20 rounded-xl border border-zinc-200 bg-white p-1 text-ink shadow-lg">
                  {(["KR", "EN"] as const).map((option) => (
                    <li key={option}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={lang === option}
                        className="w-full rounded-lg px-3 py-1.5 text-left text-sm hover:bg-zinc-100"
                        onClick={() => {
                          setLang(option);
                          setLangOpen(false);
                        }}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              type="button"
              aria-label="검색 열기"
              className={`grid size-10 place-items-center rounded-full transition-colors duration-200 ${t.text} ${t.hover}`}
              onClick={() => setSearchOpen(true)}
            >
              <span aria-hidden="true">⌕</span>
            </button>

            <button
              ref={menuButtonRef}
              type="button"
              aria-label="전체 메뉴 열기"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className={`grid size-10 place-items-center rounded-full transition-colors duration-200 lg:hidden ${t.text} ${t.hover}`}
              onClick={() => setMobileOpen(true)}
            >
              <span aria-hidden="true">☰</span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-x-0 top-0 z-50 origin-top bg-white text-ink shadow-xl transition-transform duration-400 ease-menu ${
          searchOpen ? "translate-y-0 delay-200" : "-translate-y-full"
        }`}
        role="search"
        inert={!searchOpen}
      >
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-6">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="사이트 내 검색"
            aria-label="사이트 내 검색"
            className="w-full border-b border-zinc-300 bg-transparent py-2 text-lg outline-none focus:border-zinc-900"
          />
          <button type="button" className="text-sm text-zinc-500 hover:text-zinc-900" onClick={() => searchInputRef.current && (searchInputRef.current.value = "")}>
            지우기
          </button>
          <button type="button" className="text-sm font-medium text-zinc-700 hover:text-zinc-900" aria-label="검색 닫기" onClick={() => setSearchOpen(false)}>
            닫기
          </button>
        </div>
      </div>

      <MobileNav
        open={mobileOpen}
        onClose={() => {
          setMobileOpen(false);
          menuButtonRef.current?.focus();
        }}
        navItems={navItems}
        brandName={brandName}
        lang={lang}
        onLangChange={setLang}
      />
    </>
  );
}
