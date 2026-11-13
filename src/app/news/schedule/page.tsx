import { PageChrome } from "@/components/content/main/PageChrome";
import { SimpleTableListPage } from "@/components/content/SimpleTableListPage";
import { getMediaEvents } from "@/lib/data/mediaRepository";

export const metadata = { title: "모임 일정 l navigators-c" };

export default async function MediaEventsPage() {
  const content = await getMediaEvents();
  return (
    <PageChrome title={content.title} tabs={[{ label: "미디어 행사", href: "/news/schedule" }]}>
      <SimpleTableListPage content={content} />
    </PageChrome>
  );
}
