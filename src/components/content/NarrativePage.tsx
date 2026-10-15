import type { NarrativeContent } from "@/types/pageTemplates";
import { ScrollReveal } from "./ScrollReveal";

/** `narrative-scrollytelling` template (docs/routes.md): hero + chronology chapters
 * revealed on scroll + stats + a company-facts table. Used by /company/about. */
export function NarrativePage({ content }: { content: NarrativeContent }) {
  return (
    <main className="pb-24">
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-5 pt-16 text-center md:px-8">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">{content.heroTitle}</h1>
        <p className="mx-auto mt-5 max-w-xl text-zinc-600">{content.heroDescription}</p>
      </section>

      <div className="mx-auto max-w-3xl space-y-20 px-5 py-16 md:px-8">
        {content.chapters.map((chapter, index) => (
          <ScrollReveal key={chapter.era}>
            <article className="border-l-2 border-zinc-200 pl-8">
              <span className="text-sm font-semibold text-zinc-400">{chapter.era}</span>
              <h2 className="mt-2 text-2xl font-bold">{chapter.title}</h2>
              <p className="mt-3 text-zinc-600">{chapter.description}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="mx-auto max-w-5xl px-5 md:px-8">
        <section className="grid grid-cols-2 gap-8 rounded-3xl bg-zinc-900 p-10 text-white md:grid-cols-4">
          {content.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold md:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </section>
      </ScrollReveal>

      <ScrollReveal className="mx-auto mt-16 max-w-3xl px-5 md:px-8">
        <section aria-labelledby="facts-heading">
          <h2 id="facts-heading" className="text-2xl font-bold">회사 정보</h2>
          <dl className="mt-6 divide-y divide-zinc-200 border-y border-zinc-200">
            {content.facts.map((fact) => (
              <div key={fact.label} className="flex justify-between gap-4 py-3 text-sm">
                <dt className="text-zinc-500">{fact.label}</dt>
                <dd className="font-medium text-zinc-900">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </ScrollReveal>
    </main>
  );
}
