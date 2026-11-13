/** Loads the placeholder page content into the new collections / globals so the admin
 * starts from the current site instead of empty forms. Idempotent: documents that already
 * exist (same slug / seq) and globals that were already saved are left alone — unless the
 * seed runs with --reset (see scripts/seedPayload.ts).
 * Called from scripts/seedPayload.ts (npm run seed). */
import fs from "node:fs";
import path from "node:path";
import type { Payload } from "payload";
import * as main from "../src/features/main-template/data";
import { aboutStory } from "../src/features/main-template/aboutStory";
import { timeline } from "../src/features/main-template/timeline";
import { affiliates, contact, partnership } from "../src/features/main-template/companyInfo";
import { brandGuide, gallery } from "../src/features/main-template/brandResources";
import { serviceDetails } from "../src/features/main-template/serviceDetail";
import { techDetails } from "../src/features/main-template/techDetail";
import { sectionLandings } from "../src/features/main-template/sectionLanding";
import { serviceDirectory } from "../src/features/main-template/serviceDirectory";
import { mediaEvents } from "../src/features/main-template/mediaEvents";
import { privacyPolicy } from "../src/features/main-template/policy";
import type { ResourcePageContent } from "../src/types/pageTemplates";

const UPLOAD_KEYS = new Set(["src", "image", "poster", "video"]);

const mediaIds = new Map<string, number | string>();

/** Uploads a sample photo (`/sample/…` under public/) to the media library once — reusing a
 * file that is already there — and returns its id; undefined when the file is missing
 * (scripts/download-navigators-assets.py not run yet). */
export async function sampleMediaId(payload: Payload, publicPath: string): Promise<number | string | undefined> {
  const cached = mediaIds.get(publicPath);
  if (cached !== undefined) return cached;
  const filename = path.basename(publicPath);
  const filePath = path.resolve(process.cwd(), "public", publicPath.replace(/^\//, ""));
  if (!fs.existsSync(filePath)) {
    missingSamples.add(publicPath);
    return undefined;
  }
  try {
    const existing = await payload.find({ collection: "media", where: { filename: { equals: filename } }, limit: 1 });
    const id = existing.docs[0]?.id ?? (await payload.create({ collection: "media", data: { alt: filename.replace(/\.\w+$/, "") }, filePath })).id;
    mediaIds.set(publicPath, id);
    return id;
  } catch (error) {
    console.warn(`[seed] media ${publicPath} skipped:`, error instanceof Error ? error.message : error);
    return undefined;
  }
}

export const missingSamples = new Set<string>();

/** Replaces sample photo paths in upload slots with media ids (see sampleMediaId). */
async function withMedia<T>(payload: Payload, value: T): Promise<T> {
  const walk = async (input: unknown): Promise<unknown> => {
    if (Array.isArray(input)) return Promise.all(input.map(walk));
    if (!input || typeof input !== "object") return input;
    const out: Record<string, unknown> = {};
    for (const [key, raw] of Object.entries(input as Record<string, unknown>)) {
      out[key] = UPLOAD_KEYS.has(key) && typeof raw === "string" && raw.startsWith("/sample/") ? await sampleMediaId(payload, raw) : await walk(raw);
    }
    return out;
  };
  return (await walk(value)) as T;
}

/** Content type → Payload data: `id` → `anchor`, upload slots (plain strings in the mock)
 * dropped. Unions are converted by the callers (they know which key is the discriminator). */
function toDoc<T>(value: T): T {
  const walk = (input: unknown): unknown => {
    if (Array.isArray(input)) return input.map(walk);
    if (!input || typeof input !== "object") return input;
    const out: Record<string, unknown> = {};
    for (const [key, raw] of Object.entries(input as Record<string, unknown>)) {
      // Sample photos stay (withMedia uploads them); other plain strings in upload slots are dropped.
      if (UPLOAD_KEYS.has(key) && (raw === undefined || (typeof raw === "string" && !raw.startsWith("/sample/")))) continue;
      out[key === "id" ? "anchor" : key] = walk(raw);
    }
    return out;
  };
  return walk(value) as T;
}

/** `{ [key]: value, ...rest }` → `{ blockType: value, ...rest }` */
function block<T extends Record<string, unknown>>(value: T, key: string) {
  const { [key]: type, ...rest } = value;
  return { blockType: type, ...rest };
}

const dotted = (value: string) => {
  const [y, m, d] = value.split(".").map(Number);
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1)).toISOString();
};

/** One failing document (e.g. a validation error) is reported and skipped, not fatal. */
async function once(payload: Payload, collection: string, where: Record<string, unknown>, data: unknown, log: string[]) {
  try {
    const existing = await payload.find({ collection: collection as never, where: where as never, limit: 1 });
    if (existing.docs.length) return;
    await payload.create({ collection: collection as never, data: (await withMedia(payload, data)) as never });
    log.push(collection);
  } catch (error) {
    console.warn(`[seed] ${collection} ${JSON.stringify(where)} skipped:`, error instanceof Error ? error.message : error);
  }
}

/** Set by `npm run seed -- --reset`: saved globals are overwritten with the current content. */
let overwriteGlobals = false;

async function globalOnce(payload: Payload, slug: string, data: unknown, log: string[]) {
  try {
    const current = (await payload.findGlobal({ slug: slug as never })) as { updatedAt?: string };
    if (current?.updatedAt && !overwriteGlobals) return;
    await payload.updateGlobal({ slug: slug as never, data: (await withMedia(payload, data)) as never });
    log.push(`global:${slug}`);
  } catch (error) {
    console.warn(`[seed] global ${slug} skipped:`, error instanceof Error ? error.message : error);
  }
}

function resourceDoc(page: ResourcePageContent, slug: string) {
  return {
    slug,
    ...toDoc({
      title: page.title,
      consent: page.consent,
      sections: page.sections.map((section) => ({
        ...section,
        items: section.items.map((item) => ({ ...item, visual: [block(item.visual as Record<string, unknown>, "kind")] })),
      })),
    }),
  };
}

export async function seedContent(payload: Payload, { reset = false }: { reset?: boolean } = {}) {
  const log: string[] = [];
  overwriteGlobals = reset;

  for (const [slug, content] of Object.entries(sectionLandings)) {
    await once(payload, "landing-pages", { slug: { equals: slug } }, { slug, ...toDoc({ ...content, body: [block(content.body as Record<string, unknown>, "type")] }) }, log);
  }
  for (const [slug, content] of Object.entries(serviceDetails)) {
    await once(payload, "service-pages", { slug: { equals: slug } }, { slug, ...toDoc({ ...content, hero: [block(content.hero as Record<string, unknown>, "variant")] }) }, log);
  }
  for (const [slug, content] of Object.entries(techDetails)) {
    await once(payload, "activity-pages", { slug: { equals: slug } }, { slug, ...toDoc(content) }, log);
  }
  for (const [index, item] of affiliates.items.entries()) {
    await once(payload, "recommendations", { name: { equals: item.name } }, { ...toDoc(item), order: index }, log);
  }
  for (const tab of timeline.tabs) {
    for (const [index, event] of tab.events.entries()) {
      await once(payload, "history-entries", { and: [{ tab: { equals: tab.id } }, { title: { equals: event.title } }] }, { tab: tab.id, ...event, order: index }, log);
    }
  }
  await once(payload, "resource-pages", { slug: { equals: "tools" } }, resourceDoc(brandGuide, "tools"), log);
  await once(payload, "resource-pages", { slug: { equals: "gallery" } }, resourceDoc(gallery, "gallery"), log);
  for (const row of mediaEvents.rows) {
    const seq = row.href?.split("/").pop() ?? row.title;
    // Recurring meetings carry free text ("매주 주일 오후 2:30") — kept as the display date.
    const isDate = /^\d{4}\.\d{2}\.\d{2}$/.test(row.date);
    await once(payload, "events", { seq: { equals: seq } }, { title: row.title, seq, date: isDate ? dotted(row.date) : new Date().toISOString(), displayDate: isDate ? undefined : row.date }, log);
  }
  for (const version of privacyPolicy.versions) {
    await once(
      payload,
      "policies",
      { seq: { equals: version.seq } },
      {
        seq: version.seq,
        title: version.title,
        date: dotted(version.date),
        blocks: version.blocks.map((item) => (item.type === "table" ? { blockType: "table", columns: item.columns, rows: item.rows.map((cells) => ({ cells })) } : block(item as Record<string, unknown>, "type"))),
      },
      log,
    );
  }

  await globalOnce(
    payload,
    "main-page",
    toDoc({
      headlineSlides: main.headlineSlides,
      shortcutCards: main.shortcutCards,
      newsCards: main.newsCards,
      promotionSlides: main.promotionSlides,
      summaryPanels: main.summaryPanels,
      partnerTabs: main.partnerTabs,
    }),
    log,
  );
  await globalOnce(payload, "about-page", toDoc({ ...aboutStory, chapters: aboutStory.chapters.map((chapter) => block(chapter as unknown as Record<string, unknown>, "kind")) }), log);
  await globalOnce(payload, "history-page", toDoc({ title: timeline.title, tabs: timeline.tabs.map(({ id, label }) => ({ id, label })) }), log);
  await globalOnce(payload, "contact-page", toDoc(contact), log);
  await globalOnce(payload, "faq-page", toDoc(partnership), log);
  await globalOnce(payload, "directory-page", { title: serviceDirectory.title, categories: serviceDirectory.categories, extraItems: serviceDirectory.items }, log);
  await globalOnce(payload, "navigation", { menu: main.navMenuItems }, log);
  await globalOnce(payload, "site-settings", { brandName: main.brandName }, log);

  return log;
}
