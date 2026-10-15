import { PageChrome } from "@/components/content/main/PageChrome";
import { NarrativePage } from "@/components/content/NarrativePage";
import { getNarrative } from "@/lib/data/companyRepository";

export const metadata = { title: "회사소개 l NOVA" };

export default async function CompanyAboutPage() {
  const content = await getNarrative();
  return (
    <PageChrome>
      <NarrativePage content={content} />
    </PageChrome>
  );
}
