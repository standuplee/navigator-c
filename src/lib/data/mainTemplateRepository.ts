import * as mock from "@/features/main-template/data";
import type { FooterLinkGroup, NavMenuItem, NewsCardItem, PartnerTabGroup, PromotionSlide, ShortcutCard, SummaryPanel } from "@/types/mainTemplate";
import { clean, readGlobal } from "@/lib/payload/read";

/** Repository boundary for the main page and the site chrome (header menu, footer).
 * Globals main-page / navigation / site-settings, each section falling back to the
 * placeholder module while empty. */

type MainPageDoc = {
  headlineSlides?: NewsCardItem[];
  shortcutCards?: ShortcutCard[];
  newsCards?: NewsCardItem[];
  promotionSlides?: PromotionSlide[];
  summaryPanels?: SummaryPanel[];
  partnerTabs?: PartnerTabGroup[];
};

const orMock = <T,>(value: T[] | undefined, fallback: T[]) => (value && value.length ? value : fallback);

export async function getSiteChrome(): Promise<{ brandName: string; navMenuItems: NavMenuItem[]; footerGroups: FooterLinkGroup[] }> {
  const [brandName, navMenuItems] = await Promise.all([
    readGlobal("site-settings", (doc) => (doc.brandName as string) || null, mock.brandName),
    readGlobal(
      "navigation",
      (doc) => {
        const menu = clean<NavMenuItem[] | undefined>(doc.menu);
        return menu?.length ? menu.map((item) => ({ ...item, children: item.children ?? [] })) : null;
      },
      mock.navMenuItems,
    ),
  ]);
  const footerGroups = navMenuItems.map((item) => ({ title: item.label, links: item.children.map(({ label, href }) => ({ label, href })) }));
  return { brandName, navMenuItems, footerGroups };
}

export async function getMainTemplateContent() {
  const [chrome, page] = await Promise.all([getSiteChrome(), readGlobal<MainPageDoc>("main-page", (doc) => clean<MainPageDoc>(doc), {})]);
  return {
    ...chrome,
    headlineSlides: orMock(page.headlineSlides, mock.headlineSlides),
    shortcutCards: orMock(page.shortcutCards, mock.shortcutCards),
    newsCards: orMock(page.newsCards, mock.newsCards),
    promotionSlides: orMock(page.promotionSlides, mock.promotionSlides),
    summaryPanels: orMock(page.summaryPanels, mock.summaryPanels),
    partnerTabs: orMock(page.partnerTabs, mock.partnerTabs),
  };
}
