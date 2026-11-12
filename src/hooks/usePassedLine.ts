"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/** True once the element's top edge is above `line` (fraction of the viewport height from the
 * top), false again when scrolled back below it. Scroll/rAF based rather than
 * IntersectionObserver so state never depends on how much of the element is visible — the
 * story sequences (PRD §7.5) need "has it passed this line", not "is it on screen".
 * Under reduced motion it is always true, so content renders in its final state. */
export function usePassedLine<T extends HTMLElement = HTMLDivElement>(line = 0.65) {
  const ref = useRef<T | null>(null);
  const [passed, setPassed] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      setPassed(node.getBoundingClientRect().top < window.innerHeight * line);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    const frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [line, reduced]);

  return { ref, passed: reduced || passed };
}
