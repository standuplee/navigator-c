"use client";

import { useState } from "react";
import type { StoryDetail } from "@/types/story";
import { MarkdownRenderer } from "./MarkdownRenderer";

/** `story-detail` template (docs/routes.md): heading + markdown body + tags + share. */
export function StoryDetailTemplate({ story }: { story: StoryDetail }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <p className="text-sm font-medium text-zinc-500">{story.category}</p>
      <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{story.title}</h1>
      <div className="mt-4 flex items-center justify-between border-b border-zinc-200 pb-6">
        <time className="text-sm text-zinc-500">{story.date}</time>
        <button type="button" className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium hover:bg-zinc-50" onClick={share}>
          공유하기
        </button>
      </div>
      <div className="mt-8">
        <MarkdownRenderer markdown={story.markdown} />
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {story.tags.map((tag) => (
          <a key={tag} href={`/story?keyword=${encodeURIComponent(tag)}`} className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-600 hover:bg-zinc-200">
            {tag}
          </a>
        ))}
      </div>
      <a href="/story" className="mt-10 inline-flex items-center text-sm font-medium text-zinc-700 hover:text-zinc-900">← 목록으로</a>
      {copied && <p role="status" className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-zinc-900 px-4 py-2 text-sm text-white">링크를 복사했습니다.</p>}
    </article>
  );
}
