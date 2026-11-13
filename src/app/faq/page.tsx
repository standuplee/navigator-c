import { PageChrome } from "@/components/content/main/PageChrome";
import { PartnershipPage } from "@/components/content/company/PartnershipPage";
import { getPartnership } from "@/lib/data/companyRepository";

export const metadata = { title: "자주 묻는 질문 l navigators-c" };

export default async function CompanyPartnershipRoute() {
  const content = await getPartnership();
  return (
    <PageChrome title={content.title}>
      <PartnershipPage content={content} />
    </PageChrome>
  );
}
