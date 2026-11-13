import { getPayload } from "payload";
import config from "@payload-config";
import type { NewsCardItem } from "@/types/mainTemplate";
import type { ArticleDetail } from "@/types/content";
import { lexicalToParagraphs } from "@/lib/payload/lexical";
import { readAll } from "@/lib/payload/read";
import { pressReleaseList as fallbackList, getPressRelease as fallbackGet } from "@/features/main-template/pressReleases";
import { mediaEvents } from "@/features/main-template/mediaEvents";
import { naverReportsList } from "@/features/main-template/naverReports";
import { sampleFor } from "@/features/main-template/sampleImages";
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
    category: doc.category || "소식",
    date: toDottedDate(doc.publishedAt),
    title: doc.title,
    tags: doc.tags ?? [],
    href: `/news/${doc.seq}`,
    tone: "light",
    image: typeof doc.thumbnail === "object" && doc.thumbnail?.url ? doc.thumbnail.url : undefined,
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
    category: doc.category || "소식",
    title: doc.title,
    date: dotted,
    publishedAt: dotted,
    images: [{ src: typeof doc.thumbnail === "object" && doc.thumbnail?.url ? doc.thumbnail.url : "", alt: `${doc.title} 대표 이미지`, caption: "" }],
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
    images: [{ src: item.image ?? "", alt: "리포트 표지", caption: "" }],
    paragraphs: [
      "이 기간 동안 함께한 모임과 사람들, 그리고 하나님께서 하신 일을 정리한 보고입니다.",
      "주일교제와 은혜의 샘 참석, 개인교제와 훈련 프로그램 참여, 새로 함께하게 된 형제자매들의 이야기를 담았습니다.",
      "보고서 전문은 아래 다운로드 버튼으로 내려받을 수 있습니다.",
    ],
  };
}

/** Generic article built from a list entry — mock detail for events and AI articles until
 * they move to the CMS (same shape as press releases). */
function mockArticle(item: { category: string; title: string; date: string; tags?: string[]; image?: string }): ArticleDetail & { tags: string[] } {
  return {
    category: item.category,
    title: item.title,
    date: item.date,
    publishedAt: item.date,
    tags: item.tags ?? [],
    images: [{ src: item.image || sampleFor(`${item.title} ${item.category}`), alt: "본문 이미지", caption: "" }],
    paragraphs: [
      "오늘 본문을 천천히 두 번 읽고, 마음에 머문 한 구절을 적어 보았습니다.",
      "그 말씀이 오늘 나의 하루와 어떻게 이어지는지 묵상하고, 짧은 기도로 마무리합니다. 함께 나누고 싶은 묵상은 주일교제 그룹 시간에 이야기해 주세요.",
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
