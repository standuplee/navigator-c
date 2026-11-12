import { privacyPolicy } from "@/features/main-template/policy";

/** Repository boundary for /policy/* (swap for a Payload `policies` query later). */
export async function getPrivacyPolicy() {
  return privacyPolicy;
}

export async function getPrivacyVersion(seq?: string) {
  return privacyPolicy.versions.find((version) => version.seq === seq) ?? privacyPolicy.versions[0];
}
