import { PageChrome } from "@/components/content/main/PageChrome";
import { ServiceDetailTemplate } from "@/components/content/ServiceDetailTemplate";
import { getServiceDetail } from "@/lib/data/serviceRepository";

export const metadata = { title: "지도 l NOVA" };

export default async function MapPage() {
  const content = await getServiceDetail("map");
  return (
    <PageChrome overDarkHero>
      <ServiceDetailTemplate content={content} />
    </PageChrome>
  );
}
