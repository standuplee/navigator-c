/** Payload document → frontend content shape. Pure (no Payload import) so scripts and
 * tests can use it; read.ts re-exports it for the repositories. */
const SKIP = new Set(["id", "createdAt", "updatedAt", "globalType", "_status", "blockName", "slug", "directory"]);

function isUpload(value: Record<string, unknown>) {
  return typeof value.url === "string" && ("filename" in value || "mimeType" in value);
}

/** Payload document → frontend content shape (see src/payload/fields.ts conventions).
 * `unionKey` names the discriminator a `blocks` field's `blockType` becomes. */
export function clean<T>(value: unknown, unionKey = "kind"): T {
  const walk = (input: unknown): unknown => {
    if (input === null || input === undefined) return undefined;
    if (Array.isArray(input)) return input.map(walk);
    if (typeof input !== "object") return input;
    const record = input as Record<string, unknown>;
    if (isUpload(record)) return record.url;
    const out: Record<string, unknown> = {};
    for (const [key, raw] of Object.entries(record)) {
      if (SKIP.has(key)) continue;
      const next = walk(raw);
      if (next === undefined) continue;
      if (key === "blockType") out[unionKey] = next;
      else if (key === "anchor") out.id = next;
      else out[key] = next;
    }
    return out;
  };
  return walk(value) as T;
}

/** Optional groups come back as empty objects; treat "no required text" as absent. */
export function present<T extends object>(group: T | undefined, key: keyof T): T | undefined {
  return group && group[key] ? group : undefined;
}
