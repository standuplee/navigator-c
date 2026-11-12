"use client";

import type { ArticleDetail } from "@/types/content";
import type { RelatedItem } from "./blocks/RelatedCarousel";
import { ArticleBody } from "./blocks/ArticleBody";
import { ArticleChrome } from "./blocks/ArticleChrome";

/** /media/naverReportsDetail (PRD §7.9): article chrome + report download + related reports. */
export function ReportDetailView({ report, related }: { report: ArticleDetail & { tags: string[] }; related: RelatedItem[] }) {
  return (
    <ArticleChrome
      category={report.category}
      title={report.title}
      date={report.date}
      listHref="/media/naverReports"
      tags={report.tags}
      tagHrefBase="/media/naverReports?keyword="
      related={related}
    >
      <ArticleBody article={report} />
      <a href="#" className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-zinc-700">
        리포트 다운로드 <span aria-hidden="true">↓</span>
      </a>
    </ArticleChrome>
  );
}
