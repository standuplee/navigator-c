import type { PartnershipContent } from "@/types/pageTemplates";
import { Reveal } from "../blocks/Reveal";
import { InfoCards } from "./InfoCards";
import { AnchorSection } from "../blocks/AnchorNav";

/** /company/partnership (PRD §7.6): per section a 32px title + 20px description, then
 * 379×204 cards in 1 / 2 / 3 columns; a single contact button at the end (the reference's
 * apply / status flows are out of scope). */
export function PartnershipPage({ content }: { content: PartnershipContent }) {
  return (
    <AnchorSection title={content.title} items={content.sections.map((section, index) => ({ id: `partnership-${index}`, label: section.title }))}>
    <main className="mx-auto max-w-[1280px] px-gutter pb-16 xl:pb-24">
      {content.sections.map((section, index) => (
        <section key={section.title} id={`partnership-${index}`} className="pt-16 xl:pt-24">
          <Reveal>
            <h2 className="max-w-xl text-section-title">{section.title}</h2>
            <p className="mt-3 text-lg text-zinc-600 xl:text-xl">{section.description}</p>
          </Reveal>
          <div className="mt-10 xl:mt-14">
            <InfoCards cards={section.cards} tall />
          </div>
        </section>
      ))}
      {content.cta && (
        <div className="mt-14 flex justify-center">
          <a href={content.cta.href} className="inline-flex h-12 min-w-[216px] items-center justify-center rounded-full bg-ink px-8 text-sm font-semibold text-white transition-colors duration-200 hover:bg-zinc-700">
            {content.cta.label}
          </a>
        </div>
      )}
    </main>
    </AnchorSection>
  );
}
