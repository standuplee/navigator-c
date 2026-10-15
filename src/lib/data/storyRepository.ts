import { getPayload } from "payload";
import config from "@payload-config";
import type { Story, StoryDetail } from "@/types/story";
import { lexicalToMarkdown } from "@/lib/payload/lexical";
import { storyList as fallbackList, findStoryDetail as fallbackDetail } from "@/features/main-template/stories";

/** Repository boundary for /story pages — now backed by Payload (docs/progress.md
 * "방침 변경: Payload CMS 실제 설치"). Falls back to the mock module only if the
 * DB has nothing yet (e.g. before `npm run seed` has been run). */

type StoryDoc = {
  title: string;
  seq: string;
  category: Story["category"];
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

function mapStory(doc: StoryDoc): Story {
  return {
    seq: doc.seq,
    category: doc.category,
    date: toDottedDate(doc.publishedAt),
    title: doc.title,
    tags: doc.tags ?? [],
    image: typeof doc.thumbnail === "object" && doc.thumbnail?.url ? doc.thumbnail.url : "",
  };
}

export async function getStoryList(): Promise<Story[]> {
  const payload = await getPayload({ config });
  const result = await payload.find({ collection: "stories", draft: false, sort: "-publishedAt", limit: 100 });
  if (!result.docs.length) return fallbackList;
  return result.docs.map((doc) => mapStory(doc as StoryDoc));
}

export async function getStoryDetail(seq?: string): Promise<StoryDetail> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "stories",
    draft: false,
    where: seq ? { seq: { equals: seq } } : undefined,
    sort: "-publishedAt",
    limit: 1,
  });
  const doc = result.docs[0] as StoryDoc | undefined;
  if (!doc) return fallbackDetail(seq);
  return { ...mapStory(doc), markdown: lexicalToMarkdown(doc.body) };
}
