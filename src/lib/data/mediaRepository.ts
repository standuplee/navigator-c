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
