import { PageChrome } from "@/components/content/main/PageChrome";
import { SimpleInfoPage } from "@/components/content/SimpleInfoPage";
import { getSimpleInfo } from "@/lib/data/companyRepository";

export const metadata = { title: "제휴 제안 l NOVA" };

export default async function PartnershipPage() {
  const content = await getSimpleInfo("partnership");
  return (
    <PageChrome>
      <SimpleInfoPage content={content} />
    </PageChrome>
  );
}
