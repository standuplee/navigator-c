import { PageChrome } from "@/components/content/main/PageChrome";
import { ServiceDetailTemplate } from "@/components/content/ServiceDetailTemplate";
import { getServiceDetail } from "@/lib/data/serviceRepository";

export const metadata = { title: "포털 l NOVA" };

export default async function PortalServicePage() {
  const content = await getServiceDetail("portal");
  return (
    <PageChrome>
      <ServiceDetailTemplate content={content} />
    </PageChrome>
  );
}
