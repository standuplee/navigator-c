import { PageChrome } from "@/components/content/main/PageChrome";
import { TimelinePage } from "@/components/content/TimelinePage";
import { getTimeline } from "@/lib/data/companyRepository";

export const metadata = { title: "연혁 l NOVA" };

export default async function CompanyHistoryPage() {
  const content = await getTimeline();
  return (
    <PageChrome>
      <TimelinePage content={content} />
    </PageChrome>
  );
}
