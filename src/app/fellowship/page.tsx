import { PageChrome } from "@/components/content/main/PageChrome";
import { SectionLandingPage } from "@/components/content/SectionLandingPage";
import { getSectionLanding } from "@/lib/data/serviceRepository";

export const metadata = { title: "기술 l NOVA" };

export default async function InnovationPage() {
  const content = await getSectionLanding("fellowship");
  return (
    <PageChrome headerTheme="dark">
      <SectionLandingPage content={content} />
    </PageChrome>
  );
}
