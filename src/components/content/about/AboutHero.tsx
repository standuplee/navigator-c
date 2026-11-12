"use client";

import { MediaSlot } from "../blocks/MediaSlot";

/** Story opener (PRD §7.5-1): full-viewport muted video (placeholder until uploaded) with a
 * single centred line that fades in, and a bouncing arrow that jumps to the next section. */
export function AboutHero({ text, video, poster, nextId }: { text: string; video?: string; poster?: string; nextId: string }) {
  return (
    <section aria-label="소개" className="relative h-svh overflow-hidden">
      <MediaSlot kind="video" src={video} poster={poster} tone="dark" label="소개 영상" className="absolute inset-0" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-ink-dark-bg" />
      <p className="absolute inset-x-0 top-[44%] px-gutter text-center text-lg font-semibold text-white motion-safe:animate-[fade-in_1s_var(--ease-sine)_both] md:text-xl">
        {text}
      </p>
      <a
        href={`#${nextId}`}
        className="absolute bottom-8 left-1/2 grid h-12 w-11 -translate-x-1/2 place-items-center text-2xl text-white xl:bottom-12"
      >
        <span aria-hidden="true" className="motion-safe:animate-nudge-down">↓</span>
        <span className="sr-only">다음 섹션으로 이동</span>
      </a>
    </section>
  );
}
