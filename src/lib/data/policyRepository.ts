import type { PolicyBlock, PolicyContent, PolicyVersion } from "@/types/pageTemplates";
import { privacyPolicy } from "@/features/main-template/policy";
import { clean, readAll } from "@/lib/payload/read";

/** Repository boundary for /privacy — collection "policies" (newest first), placeholder
 * versions while empty. */

type PolicyDoc = { seq: string; title: string; date: string; blocks?: (PolicyBlock | { type: "table"; columns: string[]; rows: { cells: string[] }[] })[] };

function toDotted(iso: string) {
  const date = new Date(iso);
  return `${date.getUTCFullYear()}.${String(date.getUTCMonth() + 1).padStart(2, "0")}.${String(date.getUTCDate()).padStart(2, "0")}`;
}

export async function getPrivacyPolicy(): Promise<PolicyContent> {
  return readAll(
    "policies",
    (docs) => ({
      ...privacyPolicy,
      versions: clean<PolicyDoc[]>(docs, "type").map(
        (doc): PolicyVersion => ({
          seq: doc.seq,
          title: doc.title,
          date: toDotted(doc.date),
          blocks: (doc.blocks ?? []).map((block) => (block.type === "table" ? { ...block, rows: (block.rows as { cells: string[] }[]).map((row) => row.cells) } : block)) as PolicyBlock[],
        }),
      ),
    }),
    privacyPolicy,
    "-date",
  );
}

export async function getPrivacyVersion(seq?: string) {
  const policy = await getPrivacyPolicy();
  return policy.versions.find((version) => version.seq === seq) ?? policy.versions[0];
}
