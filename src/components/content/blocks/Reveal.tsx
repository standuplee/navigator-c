"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

const VARIANTS = {
  "fade-up": "translate-y-10 opacity-0",
  fade: "opacity-0",
  "fade-left": "translate-x-10 opacity-0",
} as const;

const EASES = {
  sine: "ease-sine",
  smooth: "ease-smooth",
  soft: "ease-smooth-soft",
} as const;

/** Scroll reveal wrapper (PRD §4.2).
 *
 * Static by default: measured against the reference, its sub pages (services, tech details,
 * media, company info) render their blocks without entrance motion — only the about story and
 * the landing vision copy fade in. Pass `animate` where the reference animates; the defaults
 * are the about story's values (1s, sine ease) and `delay`, `duration`, `ease` override them.
 * Under reduced motion useInView reports visible immediately, so content is never hidden. */
export function Reveal({
  as: Tag = "div",
  children,
  animate = false,
  variant = "fade-up",
  delay = 0,
  duration = 1,
  ease = "sine",
  className = "",
  id,
}: {
  as?: ElementType;
  id?: string;
  children: ReactNode;
  animate?: boolean;
  variant?: keyof typeof VARIANTS;
  delay?: number;
  duration?: number;
  ease?: keyof typeof EASES;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  if (!animate) {
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }
  const style: CSSProperties = { transitionDuration: `${duration}s`, transitionDelay: inView ? `${delay}s` : "0s" };
  return (
    <Tag
      ref={ref}
      id={id}
      data-inview={inView ? "true" : "false"}
      style={style}
      className={`transition-[opacity,transform] ${EASES[ease]} ${inView ? "translate-x-0 translate-y-0 opacity-100" : VARIANTS[variant]} ${className}`}
    >
      {children}
    </Tag>
  );
}
