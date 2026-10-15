import type { SimpleTableListContent } from "@/types/pageTemplates";

/** `simple-table-list` template (docs/routes.md): plain date/title rows, no
 * filter or pagination. Used by /media/mediaEvents. */
export function SimpleTableListPage({ content }: { content: SimpleTableListContent }) {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{content.title}</h1>
      <ul className="mt-12 divide-y divide-zinc-200 border-y border-zinc-200">
        {content.rows.map((row) => {
          const Row = row.href ? "a" : "div";
          return (
            <li key={`${row.date}-${row.title}`}>
              <Row
                href={row.href}
                className={`flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:gap-6 ${row.href ? "transition-colors duration-200 hover:bg-zinc-50" : ""}`}
              >
                <time className="w-28 shrink-0 text-sm text-zinc-500">{row.date}</time>
                <span className="font-medium">{row.title}</span>
              </Row>
            </li>
          );
        })}
      </ul>
      {!content.rows.length && <p className="mt-10 text-center text-zinc-500">예정된 행사가 없습니다.</p>}
    </main>
  );
}
