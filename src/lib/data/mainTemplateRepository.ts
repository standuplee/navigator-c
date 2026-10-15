import * as mock from "@/features/main-template/data";

/** Repository boundary for the main page template (docs/content-model.md).
 * Components only import from here, never from features/main-template/data directly,
 * so the mock source can be swapped for a CMS-backed query later without touching UI. */
export async function getMainTemplateContent() {
  return {
    brandName: mock.brandName,
    navMenuItems: mock.navMenuItems,
    headlineSlides: mock.headlineSlides,
    shortcutCards: mock.shortcutCards,
    newsCards: mock.newsCards,
    promotionSlides: mock.promotionSlides,
    summaryPanels: mock.summaryPanels,
    partnerTabs: mock.partnerTabs,
    footerGroups: mock.footerGroups,
  };
}
