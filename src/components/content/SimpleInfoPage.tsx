import type { SimpleInfoContent } from "@/types/pageTemplates";

/** `simple-info` template (docs/routes.md): static sections, no list/filter/
 * pagination. Used by /company/contact, /company/brandGuide, /company/affiliates,
 * /company/partnership. */
export function SimpleInfoPage({ content }: { content: SimpleInfoContent }) {
  return (
    <main className="mx-auto max-w-4xl px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{content.title}</h1>
      {content.intro && <p className="mt-5 max-w-xl text-zinc-600">{content.intro}</p>}

      <div className="mt-16 space-y-16">
        {content.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-bold">{section.heading}</h2>
            {section.body && <p className="mt-3 text-zinc-600">{section.body}</p>}
            {section.cards && (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {section.cards.map((card) => (
                  <div key={card.title} className="rounded-2xl border border-zinc-200 p-5">
                    <p className="font-semibold">{card.title}</p>
                    <p className="mt-1 text-sm text-zinc-600">{card.description}</p>
                  </div>
                ))}
              </div>
            )}
            {section.links && (
              <div className="mt-5 flex flex-wrap gap-3">
                {section.links.map((link) => (
                  <a key={link.label} href={link.href} className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50">
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
