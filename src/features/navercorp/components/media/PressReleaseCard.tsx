import Image from "next/image";
import type { PressRelease } from "@/types/pressRelease";

export function PressReleaseCard({ item }: { item: PressRelease }) {
  return <article className="press-release-card"><a href={`/media/pressReleasesDetail?seq=${item.seq}`}>
    <div className="press-release-card__visual">{item.image && <Image src={item.image} alt="" width={640} height={360} />}</div>
    <div className="press-release-card__body"><div className="press-release-card__meta"><span>{item.category ?? "보도자료"}</span><time>{item.date}</time></div><h2>{item.title}</h2>{item.tags?.length ? <div className="press-release-card__tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div> : null}</div>
  </a></article>;
}
