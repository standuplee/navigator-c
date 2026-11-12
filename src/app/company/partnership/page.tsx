import { PageChrome } from "@/components/content/main/PageChrome";
import { PartnershipPage } from "@/components/content/company/PartnershipPage";
import { getPartnership } from "@/lib/data/companyRepository";

export const metadata = { title: "제휴 제안 l NOVA" };

export default async function CompanyPartnershipRoute() {
  const content = await getPartnership();
  return (
    <PageChrome title={content.title}>
      <PartnershipPage content={content} />
    </PageChrome>
  );
}
