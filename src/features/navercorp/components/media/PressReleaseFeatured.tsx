"use client";

import Image from "next/image";
import { useState } from "react";
import type { PressRelease } from "@/types/pressRelease";

export function PressReleaseFeatured({ items }: { items: PressRelease[] }) {
  const featured = items.slice(0, 9);
  const [index, setIndex] = useState(0);
  if (!featured.length) return null;
  const item = featured[index];
  return <section className="press-release-featured" aria-label="주요 보도자료">
    <div className="press-release-featured__copy"><span>주요 보도자료</span><strong>{String(index + 1).padStart(2, "0")}</strong></div>
    <a className="press-release-featured__card" href={`/media/pressReleasesDetail?seq=${item.seq}`}>
      <div className="press-release-featured__visual">{item.image ? <Image src={item.image} alt="" fill sizes="(max-width: 768px) 100vw, 55vw" /> : null}</div>
      <div className="press-release-featured__body"><time>{item.date}</time><h2>{item.title}</h2><span>{item.tags?.join(" · ") ?? "NAVER"}</span></div>
    </a>
    <div className="press-release-featured__controls"><button type="button" aria-label="이전 배너" disabled={index === 0} onClick={() => setIndex((value) => Math.max(0, value - 1))}>이전</button><button type="button" aria-label="다음 배너" disabled={index === featured.length - 1} onClick={() => setIndex((value) => Math.min(featured.length - 1, value + 1))}>다음</button></div>
  </section>;
}
