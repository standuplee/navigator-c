"use client";

import { useState } from "react";
import type { FooterLinkGroup } from "@/types/mainTemplate";

/** Placeholder social channels — generic monograms, not any real platform's logo
 * (docs/HANDOFF.md rule 3: no brand assets). Swap for real channels per deployment. */
const socialLinks = [
  { label: "블로그", mark: "B", href: "#" },
  { label: "뉴스레터", mark: "N", href: "#" },
  { label: "커뮤니티", mark: "C", href: "#" },
];

/** Footer (docs/animations.md §7): desktop grid, mobile accordion (instant show/hide,
 * chevron rotates 200ms — the source has no height transition on the accordion either). */
export function SiteFooter({ brandName, groups }: { brandName: string; groups: FooterLinkGroup[] }) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 py-14">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="text-lg font-bold">{brandName}</p>

        <ul className="mt-8 hidden grid-cols-4 gap-8 md:grid">
          {groups.map((group) => (
            <li key={group.title}>
              <p className="text-sm font-semibold text-zinc-900">{group.title}</p>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-zinc-500 transition-colors duration-200 hover:text-zinc-900">{link.label}</a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <ul className="mt-8 md:hidden">
          {groups.map((group) => {
            const isOpen = openGroup === group.title;
            return (
              <li key={group.title} className="border-b border-zinc-200">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold"
                  aria-expanded={isOpen}
                  onClick={() => setOpenGroup(isOpen ? null : group.title)}
                >
                  {group.title}
                  <span className={`inline-block transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true">⌄</span>
                </button>
                {isOpen && (
                  <ul className="space-y-2 pb-4">
                    {group.links.map((link) => (
                      <li key={link.label}><a href={link.href} className="text-sm text-zinc-500">{link.label}</a></li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex items-center gap-3 border-t border-zinc-200 pt-8">
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

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
          <a href="/company/contact" className="hover:text-zinc-900">Contact</a>
          <a href="/company/partnership" className="hover:text-zinc-900">제휴 제안</a>
          <a href="#" className="hover:text-zinc-900">이용약관</a>
          <a href="#" className="hover:text-zinc-900">개인정보 처리방침</a>
          <span className="ml-auto">© {brandName}</span>
        </div>
      </div>
    </footer>
  );
}
