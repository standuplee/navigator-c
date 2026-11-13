/** One-time seed: load the existing mock content (stories, news, every page collection and
 * global — see scripts/seedContent.ts) into Payload so the
 * switch from mock-returning repositories to Payload-backed ones doesn't start
 * from an empty admin. Idempotent — skips any `seq` that already exists.
 * Run with: npm run seed (with the dev server started at least once — it owns the schema;
 * this script only writes content and never pushes schema changes, see payload.config.ts).
 *
 * npm run seed -- --reset deletes every document in the content collections below and
 * overwrites the globals, then seeds again — for replacing old demo content. Users and the
 * media library are never touched. */
import { getPayload } from "payload";
import { storyList, findStoryDetail } from "../src/features/main-template/stories";
import { pressReleaseList, getPressRelease } from "../src/features/main-template/pressReleases";
import { markdownToLexical, paragraphsToLexical } from "../src/lib/payload/lexical";
import { missingSamples, sampleMediaId, seedContent } from "./seedContent";

function dottedDateToISO(dotted: string): string {
  const [y, m, d] = dotted.split(".").map(Number);
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1)).toISOString();
}

async function run() {
  // Must be set before the config module is evaluated, hence the dynamic import.
  process.env.PAYLOAD_DB_PUSH = "false";
  const { default: config } = await import("../payload.config");
  const payload = await getPayload({ config });

  const reset = process.argv.includes("--reset");
  if (reset) {
    const collections = [
      "stories", "press-releases", "events", "landing-pages", "service-pages", "activity-pages",
      "recommendations", "history-entries", "resource-pages", "policies",
    ] as const;
    for (const collection of collections) {
      const { docs } = await payload.delete({ collection, where: { id: { exists: true } } });
      console.log(`[reset] ${collection}: deleted ${docs.length}`);
    }
  }

  let storiesCreated = 0;
  for (const story of storyList) {
    const existing = await payload.find({ collection: "stories", where: { seq: { equals: story.seq } }, limit: 1 });
    if (existing.docs.length) continue;
    const detail = findStoryDetail(story.seq);
    await payload.create({
      collection: "stories",
      data: {
        title: story.title,
        seq: story.seq,
        category: story.category,
        tags: story.tags,
        publishedAt: dottedDateToISO(story.date),
        thumbnail: story.image ? ((await sampleMediaId(payload, story.image)) as never) : undefined,
        // Payload's generated richText field type wants exact literal keys on every
        // node; our hand-built JSON is structurally correct (verified against a live
        // document earlier) but TS can't prove it here — narrow cast, seed-script-only.
        body: markdownToLexical(detail.markdown) as never,
        _status: "published",
      },
    });
    storiesCreated += 1;
  }

  let pressReleasesCreated = 0;
  for (const item of pressReleaseList) {
    const existing = await payload.find({ collection: "press-releases", where: { seq: { equals: item.id } }, limit: 1 });
    if (existing.docs.length) continue;
    const article = getPressRelease(item.id);
    await payload.create({
      collection: "press-releases",
      data: {
        title: item.title,
        seq: item.id,
        category: item.category,
        tags: item.tags ?? [],
        publishedAt: dottedDateToISO(item.date),
        thumbnail: item.image ? ((await sampleMediaId(payload, item.image)) as never) : undefined,
        body: paragraphsToLexical(article.paragraphs) as never,
        _status: "published",
      },
    });
    pressReleasesCreated += 1;
  }

  const pages = await seedContent(payload, { reset });
  const counts = pages.reduce<Record<string, number>>((acc, name) => ({ ...acc, [name]: (acc[name] ?? 0) + 1 }), {});
  console.log(`Page content: ${Object.entries(counts).map(([name, count]) => `${name} +${count}`).join(", ") || "nothing new"}.`);
  console.log(`Seed complete — stories: +${storiesCreated} (skipped ${storyList.length - storiesCreated} existing), press releases: +${pressReleasesCreated} (skipped ${pressReleaseList.length - pressReleasesCreated} existing).`);
  if (missingSamples.size) {
    console.warn(`${missingSamples.size} sample photos are missing in public/sample — run: python3 scripts/download-navigators-assets.py, then npm run seed -- --reset`);
  }
  process.exit(0);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
