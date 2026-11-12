import { getPayload, type CollectionSlug, type GlobalSlug } from "payload";
import config from "@payload-config";

export { clean, present } from "./clean";

/** Read helpers for the Payload-backed repositories.
 *
 * Every repository keeps its mock module as the fallback: an empty collection, a global
 * nobody has saved yet, or a DB error renders the placeholder content instead of a broken
 * page — the same pattern as storyRepository. */

export async function payloadClient() {
  return getPayload({ config });
}

export async function readGlobal<T>(slug: GlobalSlug, map: (doc: Record<string, unknown>) => T | null, fallback: T): Promise<T> {
  try {
    const payload = await payloadClient();
    const doc = (await payload.findGlobal({ slug, depth: 2 })) as unknown as Record<string, unknown>;
    if (!doc || !doc.updatedAt) return fallback;
    return map(doc) ?? fallback;
  } catch {
    return fallback;
  }
}

export async function readBySlug<T>(collection: CollectionSlug, slug: string, map: (doc: Record<string, unknown>) => T | null, fallback: T): Promise<T> {
  try {
    const payload = await payloadClient();
    const result = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, depth: 2 });
    const doc = result.docs[0] as unknown as Record<string, unknown> | undefined;
    return doc ? (map(doc) ?? fallback) : fallback;
  } catch {
    return fallback;
  }
}

export async function readAll<T>(collection: CollectionSlug, map: (docs: Record<string, unknown>[]) => T | null, fallback: T, sort = "order"): Promise<T> {
  try {
    const payload = await payloadClient();
    const result = await payload.find({ collection, limit: 500, depth: 2, sort });
    if (!result.docs.length) return fallback;
    return map(result.docs as unknown as Record<string, unknown>[]) ?? fallback;
  } catch {
    return fallback;
  }
}
