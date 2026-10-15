import { serviceDetails } from "@/features/main-template/serviceDetail";
import { sectionLandings } from "@/features/main-template/sectionLanding";
import { serviceDirectory } from "@/features/main-template/serviceDirectory";

/** Repository boundary for /service/* and section-landing pages
 * (docs/HANDOFF.md 작업 순서 2). See src/lib/data/companyRepository.ts for the pattern. */
export async function getServiceDetail(key: keyof typeof serviceDetails) {
  return serviceDetails[key];
}

export async function getSectionLanding(key: keyof typeof sectionLandings) {
  return sectionLandings[key];
}

export async function getServiceDirectory() {
  return serviceDirectory;
}
