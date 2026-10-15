import { PageChrome } from "@/components/content/main/PageChrome";
import { ServiceDetailTemplate } from "@/components/content/ServiceDetailTemplate";
import { getServiceDetail } from "@/lib/data/serviceRepository";

export const metadata = { title: "광고 l NOVA" };

export default async function AdvertisementPage() {
  const content = await getServiceDetail("advertisement");
  return (
    <PageChrome overDarkHero>
      <ServiceDetailTemplate content={content} />
    </PageChrome>
  );
}
