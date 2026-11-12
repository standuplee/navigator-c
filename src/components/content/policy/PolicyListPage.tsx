"use client";

import type { PolicyContent } from "@/types/pageTemplates";
import { Pagination } from "../blocks/Pagination";
import { AnchorSection } from "../blocks/AnchorNav";

const PER_PAGE = 10;

/** /policy/privacy (PRD §7.11): section title (26/32px), version table — title | 공지일자
 * (213px) with 67px rows, newest first, linking to the detail — then URL pagination.
 * Below 768px each row stacks title over date. */
export function PolicyListPage({ content, page }: { content: PolicyContent; page: number }) {
  const total = Math.max(1, Math.ceil(content.versions.length / PER_PAGE));
  const current = Math.min(Math.max(1, page), total);
  const rows = content.versions.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <AnchorSection items={[{ id: "policy-list", label: content.title }]}>
    <main id="policy-list" className="mx-auto max-w-[1280px] px-gutter pb-24 pt-16 xl:pb-32 xl:pt-20">
      <h2 className="text-section-title">{content.listTitle}</h2>
      <table className="mt-8 w-full border-collapse text-left xl:mt-10">
        <caption className="sr-only">제목, 공지일자로 구성된 {content.listTitle}</caption>
        <thead className="hidden md:table-header-group">
          <tr className="h-[66px] border-y border-ink text-sm font-semibold text-zinc-600">
            <th scope="col" className="px-2 font-semibold">제목</th>
            <th scope="col" className="w-[213px] px-2 text-center font-semibold">공지일자</th>
          </tr>
        </thead>
        <tbody className="border-t border-ink md:border-t-0">
          {rows.map((row) => (
            <tr key={row.seq} className="group relative flex flex-col gap-1 border-b border-zinc-200 px-2 py-5 transition-colors duration-200 hover:bg-zinc-50 md:table-row md:p-0">
              <td className="md:h-[67px] md:px-2">
                <a href={`/privacy/${row.seq}`} className="text-base font-medium text-ink after:absolute after:inset-0 group-hover:underline md:text-lg">
                  {row.title}
                </a>
              </td>
              <td className="text-sm text-zinc-500 md:px-2 md:text-center md:text-base">{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {content.note && <p className="mt-3 text-sm text-zinc-500">{content.note}</p>}
      {total > 1 && (
        <div className="mt-12 flex justify-center">
          <Pagination current={current} total={total} hrefFor={(value) => `/privacy?page=${value}`} label="개인정보 처리방침 목록 페이지" />
        </div>
      )}
    </main>
    </AnchorSection>
  );
}
