import { getPayload } from "payload";
import config from "@payload-config";
import type { NewsCardItem } from "@/types/mainTemplate";
import type { ArticleDetail } from "@/types/content";
import { lexicalToParagraphs } from "@/lib/payload/lexical";
import { readAll } from "@/lib/payload/read";
import { pressReleaseList as fallbackList, getPressRelease as fallbackGet } from "@/features/main-template/pressReleases";
import { mediaEvents } from "@/features/main-template/mediaEvents";
import { naverReportsList } from "@/features/main-template/naverReports";
import { aiServiceCategories, aiServiceList, buildingAiList } from "@/features/main-template/aiInNaver";

/** Repository boundary for /news (소식, Payload press-releases), /news/schedule (Payload
 * events) and the reserve /media/* report and AI pages (placeholder modules only). */

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
    href: `/news/${doc.seq}`,
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

type EventDoc = { title: string; seq: string; date: string; displayDate?: string | null; place?: string | null; body?: unknown };

/** /news/schedule rows — collection "events" (newest first), placeholder rows while empty. */
export async function getMediaEvents() {
  return readAll(
    "events",
    (docs) => ({
      title: mediaEvents.title,
      rows: (docs as unknown as EventDoc[]).map((doc) => ({ date: doc.displayDate || toDottedDate(doc.date), title: doc.title, href: `/news/schedule/${doc.seq}` })),
    }),
    mediaEvents,
    "-date",
  );
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

/** Generic article built from a list entry — mock detail for events and AI articles until
 * they move to the CMS (same shape as press releases). */
function mockArticle(item: { category: string; title: string; date: string; tags?: string[] }): ArticleDetail & { tags: string[] } {
  return {
    category: item.category,
    title: item.title,
    date: item.date,
    publishedAt: item.date,
    tags: item.tags ?? [],
    images: [{ src: "", alt: "본문 이미지", caption: "" }],
    paragraphs: [
      "본문 첫 문단 자리입니다. 실제 내용은 어드민에서 입력합니다.",
      "두 번째 문단 자리입니다. 일정, 장소, 참여 방법 같은 세부 정보를 적습니다.",
    ],
  };
}

export async function getMediaEvent(seq?: string): Promise<ArticleDetail & { tags: string[] }> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({ collection: "events", where: seq ? { seq: { equals: seq } } : undefined, sort: "-date", limit: 1 });
    const doc = result.docs[0] as unknown as EventDoc | undefined;
    if (doc) {
      const date = doc.displayDate || toDottedDate(doc.date);
      const paragraphs = lexicalToParagraphs(doc.body);
      return {
        category: "모임 일정",
        title: doc.title,
        date,
        publishedAt: doc.date,
        tags: [],
        images: [],
        paragraphs: doc.place ? [`장소: ${doc.place}`, ...paragraphs] : paragraphs,
      };
    }
  } catch {
    // fall through to the placeholder row
  }
  const rows = mediaEvents.rows;
  const row = rows.find((entry) => entry.href?.endsWith(`/${seq}`)) ?? rows[0];
  return mockArticle({ category: "모임 일정", title: row.title, date: row.date });
}

export async function getAiInNaver() {
  return { categories: aiServiceCategories, services: aiServiceList, building: buildingAiList };
}

export async function getAiArticle(kind: "service" | "building", seq?: string) {
  const list = kind === "service" ? aiServiceList : buildingAiList;
  const item = list.find((entry) => entry.id === seq) ?? list[0];
  return { article: mockArticle(item), related: list.filter((entry) => entry.id !== item.id).slice(0, 6) };
}
