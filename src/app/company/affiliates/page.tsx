import { PageChrome } from "@/components/content/main/PageChrome";
import { AffiliatesPage } from "@/components/content/company/AffiliatesPage";
import { getAffiliates } from "@/lib/data/companyRepository";

export const metadata = { title: "주요 계열사 l NOVA" };

export default async function CompanyAffiliatesRoute() {
  const content = await getAffiliates();
  return (
    <PageChrome title={content.title}>
      <AffiliatesPage content={content} />
    </PageChrome>
  );
}
