import { PageChrome } from "@/components/content/main/PageChrome";
import { SimpleInfoPage } from "@/components/content/SimpleInfoPage";
import { getSimpleInfo } from "@/lib/data/companyRepository";

export const metadata = { title: "주요 계열사 l NOVA" };

export default async function AffiliatesPage() {
  const content = await getSimpleInfo("affiliates");
  return (
    <PageChrome>
      <SimpleInfoPage content={content} />
    </PageChrome>
  );
}
