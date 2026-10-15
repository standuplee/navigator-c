import { featureDetails } from "@/features/main-template/featureDetail";

/** Repository boundary for the feature-detail-with-related template
 * (/tech/*, /media/aiInNaver). See src/lib/data/companyRepository.ts for the pattern. */
export async function getFeatureDetail(key: keyof typeof featureDetails) {
  return featureDetails[key];
}
