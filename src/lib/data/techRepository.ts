import { techDetails, type TechDetailKey } from "@/features/main-template/techDetail";

/** Repository boundary for /tech/* detail pages (PRD §7.3, §11). Swap the body for a
 * Payload query later; pages and the template stay unchanged. */
export async function getTechDetail(key: TechDetailKey) {
  return techDetails[key];
}
