import type { SectionLandingContent } from "@/types/pageTemplates";
import { CtaBanner } from "./blocks/CtaBanner";
import { AnchorSection } from "./blocks/AnchorNav";
import { Reveal } from "./blocks/Reveal";
import { FeaturedList } from "./landing/FeaturedList";
import { StickyHero } from "./landing/StickyHero";
import { PageStackDomain } from "./landing/PageStack";

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
        <>
          <h2 className="mx-auto max-w-[1280px] px-gutter pt-20 text-page-title xl:pt-32">{content.body.title}</h2>
          <AnchorSection tone="dark" items={content.body.domains.map((domain) => ({ id: domain.id, label: domain.title }))}>
            {content.body.domains.map((domain) => (
              <PageStackDomain key={domain.id} domain={domain} />
            ))}
          </AnchorSection>
          {content.body.research && (
            <section className="mx-auto max-w-[1280px] px-gutter py-20 xl:py-32" aria-labelledby="research-heading">
              <h2 id="research-heading" className="text-section-title">{content.body.research.title}</h2>
              <ul className="mt-10 grid gap-6 md:grid-cols-2">
                {content.body.research.items.map((item) => (
                  <Reveal as="li" key={item.title} animate duration={0.6} ease="soft">
                    <a href={item.href ?? "#"} className="group block rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 transition-colors duration-200 hover:bg-white/10 xl:p-10">
                      <p className="text-xl font-bold xl:text-2xl">{item.title}</p>
                      <p className="mt-2 text-white/70">{item.text}</p>
                      <span aria-hidden="true" className="mt-6 inline-block motion-safe:can-hover:group-hover:animate-nudge-x">→</span>
                    </a>
                  </Reveal>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      <CtaBanner title={content.cta.title} description={content.cta.description} href={content.cta.href} ctaLabel={content.cta.ctaLabel} />
    </main>
  );
}
