"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

const VARIANTS = {
  "fade-up": "translate-y-10 opacity-0",
  fade: "opacity-0",
  "fade-left": "translate-x-10 opacity-0",
} as const;

/** Scroll reveal (PRD §4.2): starts hidden, settles once it enters the viewport.
 * Default .6s with the smooth ease used across the reference; delay in seconds for stagger.
 * Under reduced motion useInView reports visible immediately, so content is never hidden. */
export function Reveal({
  as: Tag = "div",
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.6,
  className = "",
  id,
}: {
  as?: ElementType;
  id?: string;
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const style: CSSProperties = { transitionDuration: `${duration}s`, transitionDelay: inView ? `${delay}s` : "0s" };
  return (
    <Tag
      ref={ref}
      id={id}
      data-inview={inView ? "true" : "false"}
      style={style}
      className={`transition-[opacity,transform] ease-smooth ${inView ? "translate-x-0 translate-y-0 opacity-100" : VARIANTS[variant]} ${className}`}
    >
      {children}
    </Tag>
  );
}
