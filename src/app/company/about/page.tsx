import { PageChrome } from "@/components/content/main/PageChrome";
import { AboutStoryPage } from "@/components/content/about/AboutStoryPage";
import { getAboutStory } from "@/lib/data/companyRepository";

export const metadata = { title: "소개 l NOVA" };

export default async function CompanyAboutRoute() {
  const content = await getAboutStory();
  return (
    <PageChrome headerTheme="transparent-dark">
      <AboutStoryPage content={content} />
    </PageChrome>
  );
}
