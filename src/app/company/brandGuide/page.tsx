import { PageChrome } from "@/components/content/main/PageChrome";
import { ResourcePage } from "@/components/content/company/ResourcePage";
import { getBrandGuide, getBrandResourcesTabs } from "@/lib/data/companyRepository";

export const metadata = { title: "브랜드 리소스 l NOVA" };

export default async function BrandGuideRoute() {
  const [content, tabs] = await Promise.all([getBrandGuide(), getBrandResourcesTabs()]);
  return (
    <PageChrome title={content.title} tabs={tabs}>
      <ResourcePage content={content} />
    </PageChrome>
  );
}
