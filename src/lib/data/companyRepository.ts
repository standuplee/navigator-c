import { narrative } from "@/features/main-template/narrative";
import { timeline } from "@/features/main-template/timeline";
import { simpleInfoPages } from "@/features/main-template/simpleInfo";
import { affiliates, contact, partnership } from "@/features/main-template/companyInfo";

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

export async function getAffiliates() {
  return affiliates;
}

export async function getContact() {
  return contact;
}

export async function getPartnership() {
  return partnership;
}
