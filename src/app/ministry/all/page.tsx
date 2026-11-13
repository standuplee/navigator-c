import { PageChrome } from "@/components/content/main/PageChrome";
import { ServiceDirectoryPage } from "@/components/content/ServiceDirectoryPage";
import { getServiceDirectory, getServiceDirectoryTabs } from "@/lib/data/serviceRepository";

export const metadata = { title: "한눈에 보기 l navigators-c" };

export default async function ServiceAllRoute() {
  const [content, tabs] = await Promise.all([getServiceDirectory(), getServiceDirectoryTabs()]);
  return (
    <PageChrome title={content.title} tabs={tabs}>
      <ServiceDirectoryPage content={content} mode="topic" />
    </PageChrome>
  );
}
