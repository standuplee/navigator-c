/** Page title band (docs/PRD-navercorp-ui-parity.md §6.2).
 * - large:   228 / 268 / 336px — company pages, service directory, events, policy
 * - compact: 180 / 220 / 280px — media and story list pages
 * Heights include the fixed header area; the title sits on the band's bottom edge. */
export function PageTitle({ title, size = "large", description }: { title: string; size?: "large" | "compact"; description?: string }) {
  const height = size === "large" ? "min-h-[228px] md:min-h-[268px] xl:min-h-[336px]" : "min-h-[180px] md:min-h-[220px] xl:min-h-[280px]";
  return (
    <div className={`mx-auto flex max-w-[1920px] flex-col justify-end px-gutter pb-8 pt-[calc(var(--header-h)+24px)] md:pb-10 xl:pb-14 ${height}`}>
      <h1 className="text-page-title text-ink">{title}</h1>
      {description && <p className="mt-3 max-w-3xl text-base text-zinc-600 md:text-lg">{description}</p>}
    </div>
  );
}
