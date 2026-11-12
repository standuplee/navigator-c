import type { ReactNode } from "react";
import { getSiteChrome } from "@/lib/data/mainTemplateRepository";
import { ScrollState } from "@/components/layouts/ScrollState";
import { SiteHeader, type HeaderTheme } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { PageTitle } from "./PageTitle";
import { TabArea, type TabAreaItem } from "./TabArea";

/** Shared page shell (docs/PRD-navercorp-ui-parity.md §5): header, optional title band and
 * tab bar, footer, plus the single global scroll-state listener.
 *
 * - headerTheme: "white" (default) | "transparent" (about, article details) | "dark" (tech)
 * - title:       renders the title band; templates on such pages don't render their own h1
 * - tabs:        renders the page-switching tab bar under the title band */
export async function PageChrome({
  children,
  headerTheme = "white",
  title,
  titleSize = "large",
  titleDescription,
  tabs,
}: {
  children: ReactNode;
  headerTheme?: HeaderTheme;
  title?: string;
  titleSize?: "large" | "compact";
  titleDescription?: string;
  tabs?: TabAreaItem[];
}) {
  const content = await getSiteChrome();
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <ScrollState />
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-white">
        본문 바로가기
      </a>
      <SiteHeader brandName={content.brandName} navItems={content.navMenuItems} theme={headerTheme} />
      <div id="content">
        {title && <PageTitle title={title} size={titleSize} description={titleDescription} />}
        {tabs && tabs.length > 0 && <TabArea items={tabs} />}
        {children}
      </div>
      <SiteFooter brandName={content.brandName} groups={content.footerGroups} />
    </div>
  );
}
