"use client";

import { useState } from "react";
import { ArticleDetailPage } from "./ArticleDetailPage";
import type { ArticleDetail } from "@/types/content";

export function PressReleaseDetailView({ article }: { article: ArticleDetail }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  return (
    <ArticleDetailPage article={article} onShare={share}>
      <div className="mt-10 flex items-center justify-between border-t border-zinc-200 pt-6">
        <a href="/media/pressReleases" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">← 목록으로</a>
      </div>
      {copied && <p role="status" className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-zinc-900 px-4 py-2 text-sm text-white">링크를 복사했습니다.</p>}
    </ArticleDetailPage>
  );
}
