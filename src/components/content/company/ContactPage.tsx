import type { ContactContent } from "@/types/pageTemplates";
import { MediaSlot } from "../blocks/MediaSlot";
import { Reveal } from "../blocks/Reveal";
import { InfoCards } from "./InfoCards";
import { AnchorSection } from "../blocks/AnchorNav";

/** /company/contact (PRD §7.6): each group is title (403px column, 32px) | entries
 * (name | Korean + English address + tel), HQ followed by a full-bleed 480px map slot,
 * then the support cards. */
export function ContactPage({ content }: { content: ContactContent }) {
  return (
    <AnchorSection
      title={content.title}
      items={[...content.groups.map((group, index) => ({ id: `contact-${index}`, label: group.title })), { id: "contact-support", label: content.support.title }]}
    >
    <main className="pb-16 xl:pb-24">
      {content.groups.map((group, index) => (
        <section key={group.title} id={`contact-${index}`} className="pt-16 xl:pt-24">
          <Reveal className="mx-auto grid max-w-[1280px] gap-6 px-gutter lg:grid-cols-[403px_1fr]">
            <h2 className="text-section-title">{group.title}</h2>
            <dl className="flex flex-col">
              {group.entries.map((entry) => (
                <div key={entry.name} className="grid gap-2 border-b border-zinc-200 py-6 first:pt-0 md:grid-cols-[199px_1fr] last:border-none">
                  <dt className="text-lg font-bold">{entry.name}</dt>
                  <dd className="text-base leading-relaxed text-zinc-600">
                    <p>{entry.address}</p>
                    {entry.addressEn && <p className="text-zinc-400">{entry.addressEn}</p>}
                    {entry.tel && (
                      <a href={`tel:${entry.tel.replace(/[^0-9+]/g, "")}`} className="mt-1 inline-block text-ink hover:underline">
                        TEL {entry.tel}
                      </a>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          {group.map && <MediaSlot label="지도" className="mt-12 h-[280px] md:h-[400px] xl:h-[480px]" />}
        </section>
      ))}

      <section id="contact-support" className="mx-auto max-w-[1280px] px-gutter pt-16 xl:pt-24">
        <h2 className="text-section-title">{content.support.title}</h2>
        <div className="mt-8 xl:mt-12">
          <InfoCards cards={content.support.cards} />
        </div>
      </section>
    </main>
    </AnchorSection>
  );
}
