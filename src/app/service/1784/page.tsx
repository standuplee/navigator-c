import { PageChrome } from "@/components/content/main/PageChrome";
import { ServiceDetailTemplate } from "@/components/content/ServiceDetailTemplate";
import { getServiceDetail } from "@/lib/data/serviceRepository";

export const metadata = { title: "사옥 l navigators-c" };

/** Reference route /service/1784 (office-space page, fullscreen video hero + CTA). */
export default async function OfficeSpacePage() {
  const content = await getServiceDetail("space1784");
  return (
    <PageChrome>
      <ServiceDetailTemplate content={content} />
    </PageChrome>
  );
}
