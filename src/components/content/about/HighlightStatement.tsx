"use client";

import { usePassedLine } from "@/hooks/usePassedLine";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { CompassSlot } from "./CompassSlot";

/** Highlight statement over a sticky animation slot (PRD §7.5-2). When the section's top passes
 * 40% of the viewport the paragraph rises in (.8s sine) and its lines brighten from .2 to 1
 * one after another (.3s each). It stays shown below and reverses only when scrolled back above. */
export function HighlightStatement({ id, lead, statement }: { id: string; lead: string; statement: string }) {
  const progressRef = useScrollProgress<HTMLElement>({ start: 1 });
  const { ref, passed: inView } = usePassedLine<HTMLDivElement>(0.4);
  const lines = [lead, statement];

  return (
    <section ref={progressRef} id={id} aria-label={lead} className="relative h-svh scroll-mt-0 overflow-hidden">
      <CompassSlot className="absolute inset-0" />
      <div ref={ref} className="relative flex h-full items-center justify-center px-gutter">
        <p
          className={`flex flex-col items-center gap-4 text-center transition-[opacity,translate] duration-800 ease-sine xl:gap-6 ${inView ? "translate-y-0 opacity-100" : "-translate-y-[50px] opacity-0"}`}
        >
          {lines.map((line, index) => (
            <span
              key={index}
              style={{ transitionDelay: inView ? `${0.4 + index * 0.3}s` : "0s" }}
              className={`whitespace-pre-line font-semibold text-white transition-opacity duration-300 ease-in-out ${inView ? "opacity-100" : "opacity-20"} ${
                index === 0 ? "text-xl md:text-[26px] xl:text-[32px]" : "text-[32px] leading-tight md:text-5xl xl:text-[64px]"
              }`}
            >
              {line}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
