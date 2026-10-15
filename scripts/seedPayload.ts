/** One-time seed: load the existing mock Stories/PressReleases into Payload so the
 * switch from mock-returning repositories to Payload-backed ones doesn't start
 * from an empty admin. Idempotent — skips any `seq` that already exists.
 * Run with: npm run seed */
import { getPayload } from "payload";
import config from "../payload.config";
import { storyList, findStoryDetail } from "../src/features/main-template/stories";
import { pressReleaseList, getPressRelease } from "../src/features/main-template/pressReleases";
import { markdownToLexical, paragraphsToLexical } from "../src/lib/payload/lexical";

function dottedDateToISO(dotted: string): string {
  const [y, m, d] = dotted.split(".").map(Number);
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1)).toISOString();
}

async function run() {
  const payload = await getPayload({ config });

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
        body: paragraphsToLexical(article.paragraphs) as never,
        _status: "published",
      },
    });
    pressReleasesCreated += 1;
  }

  console.log(`Seed complete — stories: +${storiesCreated} (skipped ${storyList.length - storiesCreated} existing), press releases: +${pressReleasesCreated} (skipped ${pressReleaseList.length - pressReleasesCreated} existing).`);
  process.exit(0);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
