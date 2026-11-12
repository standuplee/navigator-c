"use client";

import { useEffect, useRef } from "react";

type Options = {
  /** Where progress 0 starts, as a fraction of the viewport height measured from the top.
   * 0 = element top reaches the viewport top (default, for sticky bars / reading progress). */
  start?: number;
  /** CSS custom property written on the element. Default "--progress". */
  property?: string;
  /** Optional callback with the clamped 0–1 value (avoid setState every frame). */
  onProgress?: (value: number) => void;
};

/** Scroll progress of an element through the viewport, written as a CSS variable
 * (PRD §4.3). Used by the anchor-nav progress bar, article reading progress, and
 * scroll-linked hero/story sequences. One rAF per scroll frame, no React re-render. */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>({ start = 0, property = "--progress", onProgress }: Options = {}) {
  const ref = useRef<T | null>(null);
  const callback = useRef(onProgress);
  useEffect(() => {
    callback.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      const startLine = viewport * start;
      const total = rect.height - (viewport - startLine);
      const passed = startLine - rect.top;
      const value = total <= 0 ? (passed >= 0 ? 1 : 0) : Math.min(1, Math.max(0, passed / total));
      node.style.setProperty(property, value.toFixed(4));
      callback.current?.(value);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [start, property]);

  return ref;
}
