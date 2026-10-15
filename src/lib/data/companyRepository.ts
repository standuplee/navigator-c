import { narrative } from "@/features/main-template/narrative";
import { timeline } from "@/features/main-template/timeline";
import { simpleInfoPages } from "@/features/main-template/simpleInfo";

/** Repository boundary for /company/* pages (docs/HANDOFF.md 작업 순서 2).
 * Components/pages only call these functions; swap the mock source for a CMS
 * query later without touching any page or component. */
export async function getNarrative() {
  return narrative;
}

export async function getTimeline() {
  return timeline;
}

export async function getSimpleInfo(key: keyof typeof simpleInfoPages) {
  return simpleInfoPages[key];
}
