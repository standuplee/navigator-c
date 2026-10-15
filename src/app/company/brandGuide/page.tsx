import { PageChrome } from "@/components/content/main/PageChrome";
import { SimpleInfoPage } from "@/components/content/SimpleInfoPage";
import { getSimpleInfo } from "@/lib/data/companyRepository";

export const metadata = { title: "브랜드 리소스 l NOVA" };

export default async function BrandGuidePage() {
  const content = await getSimpleInfo("brandGuide");
  return (
    <PageChrome>
      <SimpleInfoPage content={content} />
    </PageChrome>
  );
}
