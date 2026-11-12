import type { SimpleTableListContent } from "@/types/pageTemplates";

/** `simple-table-list` (PRD §7.10, /media/mediaEvents): section title (32px) and a two-column
 * table — title | date — with 67px rows; whole row links to the event detail. */
export function SimpleTableListPage({ content }: { content: SimpleTableListContent }) {
  return (
    <main className="mx-auto max-w-[1280px] px-gutter pb-24 pt-16 xl:pt-20">
      <h2 className="text-section-title">{content.title}</h2>
      {content.rows.length ? (
        <div className="mt-10" role="table" aria-label={content.title}>
          <div role="row" className="hidden h-[66px] items-center border-y border-ink text-sm font-semibold text-zinc-600 md:flex">
            <span role="columnheader" className="flex-1 px-2">제목</span>
            <span role="columnheader" className="w-[208px] px-2 text-center">날짜</span>
          </div>
          <ul role="rowgroup" className="border-t border-ink md:border-t-0">
            {content.rows.map((row) => {
              const Row = row.href ? "a" : "div";
              return (
                <li key={`${row.date}-${row.title}`} role="row" className="border-b border-zinc-200">
                  <Row href={row.href} className={`flex min-h-[67px] flex-col justify-center gap-1 px-2 py-4 md:flex-row md:items-center md:gap-0 ${row.href ? "group transition-colors duration-200 hover:bg-zinc-50" : ""}`}>
                    <span role="cell" className="flex-1 font-medium group-hover:underline md:text-lg">{row.title}</span>
                    <time role="cell" className="text-sm text-zinc-500 md:w-[208px] md:text-center md:text-base">{row.date}</time>
                  </Row>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p className="mt-10 text-center text-zinc-500">예정된 행사가 없습니다.</p>
      )}
    </main>
  );
}
