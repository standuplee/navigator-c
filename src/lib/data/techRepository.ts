import type { TechDetailContent } from "@/types/pageTemplates";
import { techDetails, type TechDetailKey } from "@/features/main-template/techDetail";
import { clean, present, readBySlug } from "@/lib/payload/read";

/** Repository boundary for the /fellowship/* activity pages (collection activity-pages,
 * placeholder module as fallback). */
export async function getTechDetail(key: TechDetailKey): Promise<TechDetailContent> {
  return readBySlug(
    "activity-pages",
    key,
    (doc) => {
      const data = clean<TechDetailContent>(doc);
      return { ...data, cta: present(data.cta, "title"), related: data.related ?? [] };
    },
    techDetails[key],
  );
}
