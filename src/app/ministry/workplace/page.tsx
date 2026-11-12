import { PageChrome } from "@/components/content/main/PageChrome";
import { ServiceDetailTemplate } from "@/components/content/ServiceDetailTemplate";
import { getServiceDetail } from "@/lib/data/serviceRepository";

export const metadata = { title: "도구 l NOVA" };

export default async function ToolsPage() {
  const content = await getServiceDetail("workplace");
  return (
    <PageChrome>
      <ServiceDetailTemplate content={content} />
    </PageChrome>
  );
}
