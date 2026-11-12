import { PageChrome } from "@/components/content/main/PageChrome";
import { ServiceDetailTemplate } from "@/components/content/ServiceDetailTemplate";
import { getServiceDetail } from "@/lib/data/serviceRepository";

export const metadata = { title: "콘텐츠 l NOVA" };

export default async function ContentsPage() {
  const content = await getServiceDetail("channels");
  return (
    <PageChrome>
      <ServiceDetailTemplate content={content} />
    </PageChrome>
  );
}
