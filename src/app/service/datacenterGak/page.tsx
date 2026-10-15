import { PageChrome } from "@/components/content/main/PageChrome";
import { ServiceDetailTemplate } from "@/components/content/ServiceDetailTemplate";
import { getServiceDetail } from "@/lib/data/serviceRepository";

export const metadata = { title: "데이터센터 l NOVA" };

export default async function DatacenterPage() {
  const content = await getServiceDetail("datacenterGak");
  return (
    <PageChrome overDarkHero>
      <ServiceDetailTemplate content={content} />
    </PageChrome>
  );
}
