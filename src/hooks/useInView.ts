"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

type Options = {
  /** Keep the "in view" state once reached (reference reveals don't replay). Default true. */
  once?: boolean;
  rootMargin?: string;
  threshold?: number | number[];
};

/** IntersectionObserver-based visibility for reveal animations (PRD §4.2).
 * With prefers-reduced-motion the element is treated as visible immediately so
 * content renders in its final state without any entrance motion. */
export function useInView<T extends Element = HTMLDivElement>({ once = true, rootMargin = "0px 0px -10% 0px", threshold = 0.15 }: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setInView(true));
      return () => window.cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold, reduced]);

  return { ref, inView: reduced || inView };
}
