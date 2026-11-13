import { PageChrome } from "@/components/content/main/PageChrome";
import { AffiliatesPage } from "@/components/content/company/AffiliatesPage";
import { getAffiliates } from "@/lib/data/companyRepository";

export const metadata = { title: "목사님 추천 l navigators-c" };

export default async function CompanyAffiliatesRoute() {
  const content = await getAffiliates();
  return (
    <PageChrome title={content.title}>
      <AffiliatesPage content={content} />
    </PageChrome>
  );
}
