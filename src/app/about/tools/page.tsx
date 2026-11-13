import { PageChrome } from "@/components/content/main/PageChrome";
import { ResourcePage } from "@/components/content/company/ResourcePage";
import { getBrandGuide, getBrandResourcesTabs } from "@/lib/data/companyRepository";

export const metadata = { title: "네비게이토 도구 l navigators-c" };

export default async function BrandGuideRoute() {
  const [content, tabs] = await Promise.all([getBrandGuide(), getBrandResourcesTabs()]);
  return (
    <PageChrome title={content.title} tabs={tabs}>
      <ResourcePage content={content} />
    </PageChrome>
  );
}
