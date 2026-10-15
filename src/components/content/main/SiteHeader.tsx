"use client";

import { useEffect, useRef, useState } from "react";
import type { NavMenuItem } from "@/types/mainTemplate";
import { MobileNav } from "./MobileNav";

/** Brand-neutral header: fixed bar, hover/focus mega menu, search overlay, mobile drawer.
 * Reproduces docs/animations.md §1 timings but rewritten for this stack (CSS transitions +
 * React state) instead of the original's selector-driven DOM scripting. */
export function SiteHeader({ brandName, navItems, overDarkHero = false }: { brandName: string; navItems: NavMenuItem[]; overDarkHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const light = overDarkHero && !scrolled;
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState<"KR" | "EN">("KR");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", mobileOpen);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [mobileOpen]);

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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-[400ms] ease-[cubic-bezier(.15,0,.15,1)] ${
          scrolled ? "bg-white/95 backdrop-blur border-b border-zinc-200" : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="/main" className={`text-lg font-bold tracking-tight transition-colors duration-[400ms] ${light ? "text-white" : "text-zinc-900"}`}>{brandName}</a>

          <nav className="hidden md:block" aria-label="주요 메뉴">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.label} className="group relative">
                  <a
                    href={item.href}
                    className={`block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:bg-zinc-100/20 ${
                      light ? "text-white hover:bg-white/15" : "text-zinc-800 hover:bg-zinc-100"
                    }`}
                  >
                    {item.label}
                  </a>
                  <div
                    className="invisible absolute left-1/2 top-full w-60 -translate-x-1/2 translate-y-1 rounded-2xl border border-zinc-200 bg-white p-3 opacity-0 shadow-lg transition-all duration-[400ms] ease-[cubic-bezier(.59,.01,.28,1)] group-hover:visible group-hover:translate-y-2 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-2 group-focus-within:opacity-100"
                    role="menu"
                  >
                    {/* Mirrors docs/animations.md 1-4/1-6: the panel frame opens on its own
                       timing while the intro label and each link cascade in with their own
                       delay, instead of one flat fade (own values, not copied from the source). */}
                    <p
                      className="px-3 pb-2 text-xs font-medium text-zinc-400 opacity-0 transition-opacity duration-200 delay-0 group-hover:opacity-100 group-hover:delay-[300ms] group-focus-within:opacity-100 group-focus-within:delay-[300ms]"
                    >
                      {item.label}
                    </p>
                    {item.children.map((child, childIndex) => (
                      <a
                        key={child.label}
                        href={child.href}
                        role="menuitem"
                        style={{ transitionDelay: `${childIndex * 40}ms` }}
                        className="block -translate-y-1 rounded-lg px-3 py-2 text-sm text-zinc-600 opacity-0 transition-[opacity,transform,background-color] duration-200 ease-[cubic-bezier(.59,.01,.28,1)] hover:bg-zinc-100 hover:text-zinc-900 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <button
                type="button"
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${light ? "text-white hover:bg-white/15" : "text-zinc-700 hover:bg-zinc-100"}`}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((value) => !value)}
              >
                {lang}
              </button>
              {langOpen && (
                <ul role="listbox" className="absolute right-0 top-full mt-2 w-20 rounded-xl border border-zinc-200 bg-white p-1 shadow-lg">
                  {(["KR", "EN"] as const).map((option) => (
                    <li key={option}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={lang === option}
                        className="w-full rounded-lg px-3 py-1.5 text-left text-sm hover:bg-zinc-100"
                        onClick={() => { setLang(option); setLangOpen(false); }}
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
              className={`rounded-full p-2 transition-colors duration-200 ${light ? "text-white hover:bg-white/15" : "text-zinc-700 hover:bg-zinc-100"}`}
              onClick={() => setSearchOpen(true)}
            >
              ⌕
            </button>

            <button
              type="button"
              aria-label="메뉴 열기"
              aria-expanded={mobileOpen}
              className={`rounded-full p-2 transition-colors duration-200 md:hidden ${light ? "text-white hover:bg-white/15" : "text-zinc-700 hover:bg-zinc-100"}`}
              onClick={() => setMobileOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-x-0 top-0 z-50 origin-top bg-white shadow-xl transition-transform duration-[400ms] ease-[cubic-bezier(.59,.01,.28,1)] ${
          searchOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        role="search"
      >
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-6">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="사이트 내 검색"
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

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} navItems={navItems} brandName={brandName} lang={lang} onLangChange={setLang} />
    </>
  );
}
