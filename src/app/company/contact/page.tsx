import { PageChrome } from "@/components/content/main/PageChrome";
import { SimpleInfoPage } from "@/components/content/SimpleInfoPage";
import { getSimpleInfo } from "@/lib/data/companyRepository";

export const metadata = { title: "Contact l NOVA" };

export default async function CompanyContactPage() {
  const content = await getSimpleInfo("contact");
  return (
    <PageChrome>
      <SimpleInfoPage content={content} />
    </PageChrome>
  );
}
