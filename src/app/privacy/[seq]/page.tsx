import { PageChrome } from "@/components/content/main/PageChrome";
import { PolicyDocument } from "@/components/content/policy/PolicyDocument";
import { getPrivacyVersion } from "@/lib/data/policyRepository";

export async function generateMetadata({ params }: { params: Promise<{ seq: string }> }) {
  const { seq } = await params;
  const version = await getPrivacyVersion(seq);
  return { title: `${version.title} l NOVA` };
}

export default async function PrivacyPolicyDetailRoute({ params }: { params: Promise<{ seq: string }> }) {
  const { seq } = await params;
  const version = await getPrivacyVersion(seq);
  return (
    <PageChrome headerTheme="transparent">
      <PolicyDocument version={version} />
    </PageChrome>
  );
}
