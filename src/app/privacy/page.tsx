import { PageChrome } from "@/components/content/main/PageChrome";
import { PolicyListPage } from "@/components/content/policy/PolicyListPage";
import { getPrivacyPolicy } from "@/lib/data/policyRepository";

export const metadata = { title: "개인정보 처리방침 l NOVA" };

export default async function PrivacyPolicyRoute({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const [{ page }, content] = await Promise.all([searchParams, getPrivacyPolicy()]);
  return (
    <PageChrome title={content.title} tabs={[{ label: "개인정보 처리방침", href: "/privacy" }]}>
      <PolicyListPage content={content} page={Number(page) || 1} />
    </PageChrome>
  );
}
