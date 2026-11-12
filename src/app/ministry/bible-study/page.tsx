import { PageChrome } from "@/components/content/main/PageChrome";
import { ServiceDetailTemplate } from "@/components/content/ServiceDetailTemplate";
import { getServiceDetail } from "@/lib/data/serviceRepository";

export const metadata = { title: "검색 l NOVA" };

export default async function SearchServicePage() {
  const content = await getServiceDetail("bible-study");
  return (
    <PageChrome>
      <ServiceDetailTemplate content={content} />
    </PageChrome>
  );
}
