import { PageChrome } from "@/components/content/main/PageChrome";
import { PolicyDocument } from "@/components/content/policy/PolicyDocument";
import { getPrivacyVersion } from "@/lib/data/policyRepository";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ seq?: string }> }) {
  const { seq } = await searchParams;
  const version = await getPrivacyVersion(seq);
  return { title: `${version.title} l NOVA` };
}

export default async function PrivacyPolicyDetailRoute({ searchParams }: { searchParams: Promise<{ seq?: string }> }) {
  const { seq } = await searchParams;
  const version = await getPrivacyVersion(seq);
  return (
    <PageChrome headerTheme="transparent">
      <PolicyDocument version={version} />
    </PageChrome>
  );
}
