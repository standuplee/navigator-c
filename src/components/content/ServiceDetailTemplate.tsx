import type { ServiceDetailContent } from "@/types/pageTemplates";
import { CtaBanner } from "./blocks/CtaBanner";
import { RelatedCarousel } from "./blocks/RelatedCarousel";
import { ServiceHero } from "./service/ServiceHero";
import { StickyVisualProducts } from "./service/StickyVisualProducts";
import { StackedProducts } from "./service/StackedProducts";
import { GrowTogetherSection } from "./service/GrowTogetherSection";

/** `service-detail` v2 template (docs/PRD-navercorp-ui-parity.md §7.1).
 * Hero (icon-grid | fullscreen) → anchor-nav product sections (sticky-visual | stacked)
 * → optional "함께 성장하는" block → optional CTA banner → related-content carousel.
 * Every part is driven by the data shape so CMS edits (adding/removing products, images,
 * detail services) never need template changes. */
export function ServiceDetailTemplate({ content }: { content: ServiceDetailContent }) {
  return (
    <main>
      <ServiceHero hero={content.hero} />
      <div className="relative z-10 bg-white">
        {content.layout === "sticky-visual" ? <StickyVisualProducts products={content.products} /> : <StackedProducts products={content.products} />}
        {content.growTogether && <GrowTogetherSection data={content.growTogether} />}
        {content.cta && <CtaBanner title={content.cta.title} description={content.cta.description} href={content.cta.href} ctaLabel={content.cta.ctaLabel} />}
        <RelatedCarousel items={content.related} />
      </div>
    </main>
  );
}
