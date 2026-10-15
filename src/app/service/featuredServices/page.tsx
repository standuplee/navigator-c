import { PageChrome } from "@/components/content/main/PageChrome";
import { SectionLandingPage } from "@/components/content/SectionLandingPage";
import { getSectionLanding } from "@/lib/data/serviceRepository";

export const metadata = { title: "서비스 l NOVA" };

export default async function FeaturedServicesPage() {
  const content = await getSectionLanding("service");
  return (
    <PageChrome>
      <SectionLandingPage content={content} />
    </PageChrome>
  );
}
