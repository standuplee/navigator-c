import type { SectionLandingContent } from "@/types/pageTemplates";
import { CtaBanner } from "./blocks/CtaBanner";
import { MediaSlot } from "./blocks/MediaSlot";
import { Reveal } from "./blocks/Reveal";
import { FeaturedList } from "./landing/FeaturedList";
import { StickyHero } from "./landing/StickyHero";

/** `section-landing` v2 (docs/PRD-navercorp-ui-parity.md §7.2): sticky two-step hero with
 * parallax tiles → featured list (services) or domain stack (tech) → CTA banner.
 * Used by /service/featuredServices (light) and /tech/innovation (dark). */
export function SectionLandingPage({ content }: { content: SectionLandingContent }) {
  const dark = content.theme === "dark";
  return (
    <main className={dark ? "bg-ink-dark-bg text-white" : "bg-white text-ink"}>
      <StickyHero line1={content.hero.line1} line2={content.hero.line2} tiles={content.hero.tiles} theme={content.theme} />

      {content.body.type === "featured" ? (
        <FeaturedList items={content.body.items} />
      ) : (
        // Interim domain list; replaced by the page-stack interaction (PRD §7.4, stage 4-3).
        <div className="mx-auto max-w-[1280px] px-gutter py-16 xl:py-24">
          <h2 className="text-page-title">{content.body.title}</h2>
          {content.body.domains.map((domain) => (
            <Reveal key={domain.id} className="mt-16 grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-section-title">{domain.title}</h3>
                <p className="mt-3 text-white/70">{domain.description}</p>
              </div>
              <MediaSlot kind={domain.media?.kind} src={domain.media?.src} label={domain.media?.label ?? domain.title} tone="dark" ratio="16/9" className="rounded-3xl" />
            </Reveal>
          ))}
        </div>
      )}

      <CtaBanner title={content.cta.title} description={content.cta.description} href={content.cta.href} ctaLabel={content.cta.ctaLabel} />
    </main>
  );
}
