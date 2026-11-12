import { getPayload } from "payload";
import config from "@payload-config";
import type { NewsCardItem } from "@/types/mainTemplate";
import type { ArticleDetail } from "@/types/content";
import { lexicalToParagraphs } from "@/lib/payload/lexical";
import { pressReleaseList as fallbackList, getPressRelease as fallbackGet } from "@/features/main-template/pressReleases";
import { mediaEvents } from "@/features/main-template/mediaEvents";
import { naverReportsList } from "@/features/main-template/naverReports";

/** Repository boundary for /media/*. Press releases are Payload-backed (docs/progress.md
 * "방침 변경: Payload CMS 실제 설치"); mediaEvents/naverReports stay mock-only for now
 * (not yet promoted to CMS collections — see docs/content-model.md). */

type PressReleaseDoc = {
  title: string;
  seq: string;
  category?: string | null;
  tags?: string[] | null;
  publishedAt: string;
  thumbnail?: { url?: string } | string | number | null;
  body?: unknown;
};

function toDottedDate(iso: string): string {
  const date = new Date(iso);
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}

function toNewsCardItem(doc: PressReleaseDoc): NewsCardItem {
  return {
    id: doc.seq,
    category: doc.category || "보도자료",
    date: toDottedDate(doc.publishedAt),
    title: doc.title,
    tags: doc.tags ?? [],
    href: `/media/pressReleasesDetail?seq=${doc.seq}`,
    tone: "light",
  };
}

export async function getPressReleaseList(): Promise<NewsCardItem[]> {
  const payload = await getPayload({ config });
  const result = await payload.find({ collection: "press-releases", draft: false, sort: "-publishedAt", limit: 100 });
  if (!result.docs.length) return fallbackList;
  return result.docs.map((doc) => toNewsCardItem(doc as PressReleaseDoc));
}

export async function getPressRelease(seq?: string): Promise<ArticleDetail> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "press-releases",
    draft: false,
    where: seq ? { seq: { equals: seq } } : undefined,
    sort: "-publishedAt",
    limit: 1,
  });
  const doc = result.docs[0] as PressReleaseDoc | undefined;
  if (!doc) return fallbackGet(seq);
  const dotted = toDottedDate(doc.publishedAt);
  return {
    category: doc.category || "보도자료",
    title: doc.title,
    date: dotted,
    publishedAt: dotted,
    images: [{ src: "", alt: `${doc.title} 대표 이미지`, caption: "" }],
    paragraphs: lexicalToParagraphs(doc.body),
  };
}

export async function getMediaEvents() {
  return mediaEvents;
}

export async function getNaverReportsList() {
  return naverReportsList;
}

/** Report detail (PRD §7.9). Mock: builds a neutral article from the list entry until
 * reports move to the CMS. */
export async function getNaverReport(seq?: string): Promise<ArticleDetail & { tags: string[] }> {
  const item = naverReportsList.find((report) => report.id === seq) ?? naverReportsList[0];
  return {
    category: item.category,
    title: item.title,
    date: item.date,
    publishedAt: item.date,
    tags: item.tags ?? [],
    images: [{ src: "", alt: "리포트 표지", caption: "" }],
    paragraphs: [
      "리포트의 배경과 목적을 소개하는 첫 문단 자리입니다.",
      "주요 발견과 수치를 요약하는 문단 자리입니다. 실제 리포트 내용은 어드민에서 입력합니다.",
      "리포트 원문은 아래 다운로드 버튼으로 내려받을 수 있습니다.",
    ],
  };
}
