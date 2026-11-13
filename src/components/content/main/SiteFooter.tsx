"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FooterLinkGroup } from "@/types/mainTemplate";
import { BrandLogo } from "./BrandLogo";

/** Placeholder social channels — generic monograms, not any real platform's logo
 * (docs/HANDOFF.md rule 3: no brand assets). Swap for real channels per deployment. */
const socialLinks = [
  { label: "블로그", mark: "B", href: "#" },
  { label: "뉴스레터", mark: "N", href: "#" },
  { label: "커뮤니티", mark: "C", href: "#" },
];

/** Placeholder related sites for the "family site" disclosure. */
const familySites = [
  { label: "관련 사이트 1", href: "#" },
  { label: "관련 사이트 2", href: "#" },
  { label: "관련 사이트 3", href: "#" },
];

/** Footer (docs/PRD-navercorp-ui-parity.md §6.10). The reference keeps every link group
 * expanded on mobile too (no accordion) — 2 columns on mobile, 4 from tablet — and has a
 * single "family site" disclosure whose chevron rotates in 200ms. */
export function SiteFooter({ brandName, groups }: { brandName: string; groups: FooterLinkGroup[] }) {
  const [familyOpen, setFamilyOpen] = useState(false);
  const familyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!familyOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFamilyOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      if (familyRef.current && !familyRef.current.contains(event.target as Node)) setFamilyOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, [familyOpen]);

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 pb-12 pt-12 md:pt-16">
      <div className="mx-auto max-w-[1920px] px-gutter">
        <BrandLogo brandName={brandName} className="h-7 xl:h-8" />

        <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-8">
          {groups.map((group) => (
            <li key={group.title}>
              <p className="text-sm font-semibold text-zinc-900">{group.title}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-zinc-500 transition-colors duration-200 hover:text-zinc-900">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 pt-8">
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-zinc-200 text-xs font-semibold"
              >
                {/* docs/animations.md 7-4: two stacked layers crossfade via opacity, 200ms. */}
                <span className="absolute inset-0 flex items-center justify-center bg-zinc-100 text-zinc-600 opacity-100 transition-opacity duration-200 group-hover:opacity-0">{social.mark}</span>
                <span className="absolute inset-0 flex items-center justify-center bg-zinc-900 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">{social.mark}</span>
              </a>
            ))}
          </div>

          <div ref={familyRef} className="relative">
            <button
              type="button"
              aria-expanded={familyOpen}
              aria-controls="footer-family-sites"
              className="flex h-10 min-w-44 items-center justify-between gap-6 rounded-md border border-zinc-300 bg-white px-4 text-sm text-zinc-700 transition-colors duration-200 hover:border-zinc-500"
              onClick={() => setFamilyOpen((value) => !value)}
            >
              패밀리 사이트
              <span aria-hidden="true" className={`inline-block transition-transform duration-200 ${familyOpen ? "rotate-180" : ""}`}>⌄</span>
            </button>
            {familyOpen && (
              <ul id="footer-family-sites" className="absolute bottom-full right-0 mb-2 w-full min-w-44 rounded-md border border-zinc-200 bg-white py-2 shadow-lg">
                {familySites.map((site) => (
                  <li key={site.label}>
                    <a href={site.href} className="block px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900">
                      {site.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
          <a href="/about/contact" className="transition-colors duration-200 hover:text-zinc-900">Contact</a>
          <Link href="/faq" className="transition-colors duration-200 hover:text-zinc-900">자주 묻는 질문</Link>
          <a href="#" className="transition-colors duration-200 hover:text-zinc-900">이용약관</a>
          <Link href="/privacy" className="font-semibold text-zinc-700 transition-colors duration-200 hover:text-zinc-900">개인정보 처리방침</Link>
          <span className="w-full md:ml-auto md:w-auto">© {brandName}</span>
        </div>
      </div>
    </footer>
  );
}
