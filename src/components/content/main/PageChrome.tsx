import type { ReactNode } from "react";
import { getMainTemplateContent } from "@/lib/data/mainTemplateRepository";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

/** Shared header/footer shell for every brand-neutral page template
 * (docs/routes.md). Keeps nav/footer data fetching in one place.
 * Pass `overDarkHero` when the page's own hero is full-bleed and dark right
 * under the fixed header (e.g. `service-detail`), so header text stays readable. */
export async function PageChrome({ children, overDarkHero = false }: { children: ReactNode; overDarkHero?: boolean }) {
  const content = await getMainTemplateContent();
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-white">
        본문 바로가기
      </a>
      <SiteHeader brandName={content.brandName} navItems={content.navMenuItems} overDarkHero={overDarkHero} />
      <div id="content">{children}</div>
      <SiteFooter brandName={content.brandName} groups={content.footerGroups} />
    </div>
  );
}
