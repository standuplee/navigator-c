"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PlaceholderVisual } from "../main/PlaceholderVisual";

/** Image / video slot with a fixed aspect ratio (PRD §4.5). Reserves layout space up front
 * (no CLS). Without a source it renders the neutral placeholder (HANDOFF rule 3: no brand
 * assets), so templates can reproduce the reference's visual rhythm before real photos exist.
 * Videos autoplay muted only while on screen and never under reduced motion (poster only). */
export function MediaSlot({
  kind = "image",
  src,
  poster,
  alt = "",
  label = "이미지",
  tone = "light",
  ratio,
  className = "",
  mediaClassName = "",
}: {
  kind?: "image" | "video";
  src?: string;
  poster?: string;
  alt?: string;
  label?: string;
  tone?: "light" | "dark";
  /** CSS aspect-ratio, e.g. "16/9". Omit when the parent sets the size. */
  ratio?: string;
  className?: string;
  /** Extra classes for the inner media (e.g. hover zoom). */
  mediaClassName?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduced) {
      video.pause();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => undefined);
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  const style = ratio ? { aspectRatio: ratio } : undefined;
  // `relative` would override a caller's `absolute`/`fixed` (same property, later in the
  // generated CSS), collapsing the slot to 0px — only add it when no position is given.
  const positioned = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className);

  return (
    <div className={`${positioned ? "" : "relative "}overflow-hidden ${className}`} style={style}>
      {!src && <PlaceholderVisual label={label} tone={tone} className={`absolute inset-0 h-full w-full ${mediaClassName}`} />}
      {src && kind === "image" && (
        // eslint-disable-next-line @next/next/no-img-element -- sources may be CMS/remote; next/image config comes with the content stage
        <img src={src} alt={alt} className={`absolute inset-0 h-full w-full object-cover ${mediaClassName}`} loading="lazy" />
      )}
      {src && kind === "video" && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden={alt ? undefined : true}
          aria-label={alt || undefined}
          className={`absolute inset-0 h-full w-full object-cover ${mediaClassName}`}
        />
      )}
    </div>
  );
}
