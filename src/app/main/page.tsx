import { SiteHeader } from "@/components/content/main/SiteHeader";
import { HeadlineSection } from "@/components/content/main/HeadlineSection";
import { NewsMasonryGrid } from "@/components/content/main/NewsMasonryGrid";
import { PromotionCarousel } from "@/components/content/main/PromotionCarousel";
import { SummaryPanels } from "@/components/content/main/SummaryPanels";
import { PartnerTabs } from "@/components/content/main/PartnerTabs";
import { SiteFooter } from "@/components/content/main/SiteFooter";
import { getMainTemplateContent } from "@/lib/data/mainTemplateRepository";

export const metadata = { title: "NOVA — Main" };

/** Brand-neutral main page rebuild (docs/HANDOFF.md). The previous NAVER-faithful
 * clone under src/features/navercorp/components/main/main-c98712e4 is kept as
 * read-only reference material (docs/research/.../BEHAVIORS.md, docs/animations.md)
 * and is no longer wired into this route. */
export default async function MainPage() {
  const content = await getMainTemplateContent();
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-white">
        본문 바로가기
      </a>
      <SiteHeader brandName={content.brandName} navItems={content.navMenuItems} />
      <main id="content" className="mx-auto max-w-7xl px-5 md:px-8">
        <HeadlineSection slides={content.headlineSlides} shortcuts={content.shortcutCards} />
        <NewsMasonryGrid items={content.newsCards} moreHref="/media/pressReleases" />
        <PromotionCarousel slides={content.promotionSlides} />
        <SummaryPanels panels={content.summaryPanels} />
        <PartnerTabs groups={content.partnerTabs} />
      </main>
      <SiteFooter brandName={content.brandName} groups={content.footerGroups} />
    </div>
  );
}
