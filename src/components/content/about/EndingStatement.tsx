"use client";

import { useCallback, useState } from "react";
import type { AboutStoryContent } from "@/types/pageTemplates";
import { usePassedLine } from "@/hooks/usePassedLine";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/** Closing statement (PRD §7.5-2 `is-extended`): a 200svh track with a sticky stage. The
 * sentence rises in, then halfway down the track the middle word leaves upward (-110px) and
 * the extended phrase comes up from +110px (.8s sine). Reverses on scroll-up. Under reduced
 * motion the full sentence is shown statically. */
export function EndingStatement({ ending }: { ending: AboutStoryContent["ending"] }) {
  const reduced = useReducedMotion();
  const [extended, setExtended] = useState(false);
  const onProgress = useCallback((value: number) => setExtended(value > 0.4), []);
  const trackRef = useScrollProgress<HTMLElement>({ onProgress });
  const { ref, passed: inView } = usePassedLine<HTMLDivElement>(0.5);
  const text = "font-bold leading-tight text-[40px] md:text-5xl xl:text-[64px]";

  if (reduced) {
    return (
      <section className="flex min-h-svh items-center justify-center px-gutter py-24 text-center">
        <p className={`${text} text-white`}>
          {ending.lead} {ending.before},<br />
          {ending.after}
          <br />
          <em className="not-italic text-accent">{ending.highlight}</em>
          <br />
          {ending.tail}
        </p>
      </section>
    );
  }

  const move = "transition-[opacity,translate] duration-800 ease-sine";
  return (
    <section ref={trackRef} aria-label={`${ending.lead} ${ending.before} ${ending.tail}`} className="relative h-[200svh]">
      <div ref={ref} className="sticky top-0 flex h-svh items-center justify-center overflow-hidden px-gutter">
        <p className={`flex flex-col items-center text-center text-white ${text} ${move} ${inView ? "translate-y-0 opacity-100" : "translate-y-[50px] opacity-0"}`}>
          <span>{ending.lead}</span>
          <span className="grid place-items-center">
            <span className={`[grid-area:1/1] ${move} ${extended ? "-translate-y-[110px] opacity-0" : "translate-y-0 opacity-100"}`}>{ending.before}</span>
            <span aria-hidden={!extended} className={`[grid-area:1/1] ${move} ${extended ? "translate-y-0 opacity-100" : "translate-y-[110px] opacity-0"}`}>
              {ending.after}
              <br />
              <em className="not-italic text-accent">{ending.highlight}</em>
            </span>
          </span>
          <span>{ending.tail}</span>
        </p>
      </div>
    </section>
  );
}
