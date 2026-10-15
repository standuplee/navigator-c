import { PageChrome } from "@/components/content/main/PageChrome";
import { ServiceDirectoryPage } from "@/components/content/ServiceDirectoryPage";
import { getServiceDirectory } from "@/lib/data/serviceRepository";

export const metadata = { title: "전체 서비스 l NOVA" };

export default async function ServiceAllPage() {
  const content = await getServiceDirectory();
  return (
    <PageChrome>
      <ServiceDirectoryPage content={content} />
    </PageChrome>
  );
}
