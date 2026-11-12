"use client";

/** URL-based pagination (PRD §6.12): 40px prev/next and page buttons, the current page filled,
 * a window of five pages with "…" and the last page (reference layout). Links, not buttons,
 * so pages are shareable and the browser back button works. */
export function Pagination({ current, total, hrefFor, label = "페이지" }: { current: number; total: number; hrefFor: (page: number) => string; label?: string }) {
  if (total <= 1) return null;
  const start = Math.max(1, Math.min(current - 2, total - 4));
  const end = Math.min(total, start + 4);
  const pages = Array.from({ length: end - start + 1 }, (_, index) => start + index);
  const cell = "grid size-10 place-items-center rounded-full text-sm transition-colors duration-200 md:text-base";
  return (
    <nav aria-label={label} className="flex items-center justify-center gap-2 py-12 xl:py-12">
      <a
        href={current > 1 ? hrefFor(current - 1) : undefined}
        aria-disabled={current <= 1}
        aria-label="이전 페이지"
        className={`${cell} border border-zinc-300 ${current <= 1 ? "pointer-events-none opacity-30" : "hover:bg-zinc-100"}`}
      >
        <span aria-hidden="true">‹</span>
      </a>
      <ul className="flex items-center gap-1 md:gap-4">
        {pages.map((page) => (
          <li key={page}>
            <a href={hrefFor(page)} aria-current={page === current ? "page" : undefined} className={`${cell} ${page === current ? "bg-ink font-bold text-white" : "hover:bg-zinc-100"}`}>
              {page}
            </a>
          </li>
        ))}
        {end < total && (
          <>
            <li aria-hidden="true" className="grid size-10 place-items-center text-zinc-400">…</li>
            <li>
              <a href={hrefFor(total)} className={`${cell} hover:bg-zinc-100`}>{total}</a>
            </li>
          </>
        )}
      </ul>
      <a
        href={current < total ? hrefFor(current + 1) : undefined}
        aria-disabled={current >= total}
        aria-label="다음 페이지"
        className={`${cell} border border-zinc-300 ${current >= total ? "pointer-events-none opacity-30" : "hover:bg-zinc-100"}`}
      >
        <span aria-hidden="true">›</span>
      </a>
    </nav>
  );
}
