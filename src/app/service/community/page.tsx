import { PageChrome } from "@/components/content/main/PageChrome";
import { ServiceDetailTemplate } from "@/components/content/ServiceDetailTemplate";
import { getServiceDetail } from "@/lib/data/serviceRepository";

export const metadata = { title: "커뮤니티 l NOVA" };

export default async function CommunityPage() {
  const content = await getServiceDetail("community");
  return (
    <PageChrome overDarkHero>
      <ServiceDetailTemplate content={content} />
    </PageChrome>
  );
}
