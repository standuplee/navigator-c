"use client";

import { useState } from "react";
import { ArticleDetailPage } from "@/components/content/ArticleDetailPage";
import { SiteShell } from "@/components/layouts/SiteShell";
import type { ArticleDetail } from "@/types/content";
import { MobileNavigation } from "../main/main-c98712e4/MobileNavigation";
import { SiteFooter } from "../main/main-c98712e4/SiteFooter";
import { SiteHeader } from "../main/main-c98712e4/SiteHeader";

export function PressReleaseDetail({ article }: { article: ArticleDetail }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { setCopied(false); }
  };
  return <SiteShell className="navercorp media-detail" header={<SiteHeader />} navigation={<MobileNavigation />} footer={<SiteFooter />}>
    <main id="content"><div className="container">
      <ArticleDetailPage article={article} onShare={share}>
        <div className="board-view-ui">
          <div className="left"><button className="btn-basic" type="button" onClick={() => navigator.clipboard?.writeText(article.title)}>텍스트 복사</button></div>
          <div className="right"><a className="btn-basic" href="/media/pressReleases">목록보기</a></div>
        </div>
        {copied && <p className="share-toast" role="status">링크를 복사했습니다.</p>}
      </ArticleDetailPage>
    </div></main>
  </SiteShell>;
}
