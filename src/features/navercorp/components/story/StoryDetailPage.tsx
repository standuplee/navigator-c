"use client";

import { useState } from "react";
import { SiteShell } from "@/components/layouts/SiteShell";
import { MobileNavigation } from "../main/main-c98712e4/MobileNavigation";
import { SiteFooter } from "../main/main-c98712e4/SiteFooter";
import { SiteHeader } from "../main/main-c98712e4/SiteHeader";
import type { StoryDetail } from "@/types/story";
import { MarkdownRenderer } from "./MarkdownRenderer";

export function StoryDetailPage({ story }: { story: StoryDetail }) {
  const [copied, setCopied] = useState(false);
  const share = async () => { try { await navigator.clipboard.writeText(window.location.href); setCopied(true); window.setTimeout(() => setCopied(false), 1600); } catch {} };
  return <SiteShell className="navercorp story-detail-page" header={<SiteHeader />} navigation={<MobileNavigation />} footer={<SiteFooter />}><main id="content"><div className="story-detail"><header className="story-detail__header"><span>{story.category}</span><h1>{story.title}</h1><div><time>{story.date}</time><button type="button" onClick={share}>공유하기</button></div></header><article className="story-detail__article"><MarkdownRenderer markdown={story.markdown} /></article><div className="story-detail__tags">{story.tags.map((tag) => <a key={tag} href={`/story?keyword=${encodeURIComponent(tag)}`}>{tag}</a>)}</div><a className="story-detail__back" href="/story">목록보기</a>{copied && <p role="status">링크를 복사했습니다.</p>}</div></main></SiteShell>;
}
