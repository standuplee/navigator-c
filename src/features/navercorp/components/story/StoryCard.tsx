import Image from "next/image";
import type { Story } from "@/types/story";

export function StoryCard({ story }: { story: Story }) {
  return <article className="story-card"><a className="story-card__link" href={`/story/storyDetail?seq=${story.seq}`}><div className="story-card__visual"><Image src={story.image} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw" /></div><div className="story-card__body"><div className="story-card__meta"><span>{story.category}</span><time>{story.date}</time></div><h2>{story.title}</h2></div></a><div className="story-card__tags">{story.tags.map((tag) => <a key={tag} href={`/story?keyword=${encodeURIComponent(tag)}`}>{tag}</a>)}</div></article>;
}
