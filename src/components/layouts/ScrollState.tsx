"use client";

import { useEffect } from "react";

/** Single global scroll listener (docs/PRD-navercorp-ui-parity.md §4.1).
 * Writes scroll state onto <html> so components react through CSS variants
 * (`scrolled:`, `scroll-down:`, `scroll-up:`) instead of each adding its own
 * listener and re-rendering every frame.
 *
 * - data-scrolled="true"  once the page has moved from the very top
 * - data-scroll-dir       "down" | "up"; only flips after a 4px move (no jitter)
 *                         and stays "up" within the first HIDE_AFTER px so the
 *                         header never hides while the page is near the top. */
const DIRECTION_THRESHOLD = 4;
const HIDE_AFTER = 80;

export function ScrollState() {
  useEffect(() => {
    const root = document.documentElement;
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = Math.max(0, window.scrollY);
      root.dataset.scrolled = y > 0 ? "true" : "false";
      if (y <= HIDE_AFTER) {
        root.dataset.scrollDir = "up";
        lastY = y;
        return;
      }
      const delta = y - lastY;
      if (Math.abs(delta) >= DIRECTION_THRESHOLD) {
        root.dataset.scrollDir = delta > 0 ? "down" : "up";
        lastY = y;
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      delete root.dataset.scrolled;
      delete root.dataset.scrollDir;
    };
  }, []);

  return null;
}
