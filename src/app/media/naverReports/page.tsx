import { PageChrome } from "@/components/content/main/PageChrome";
import { ContentListPage, type ContentListQuery } from "@/components/content/ContentListPage";
import { getNaverReportsList } from "@/lib/data/mediaRepository";

export const metadata = { title: "사역 리포트 l navigators-c" };

export default async function NaverReportsPage({ searchParams }: { searchParams: Promise<ContentListQuery> }) {
  const query = await searchParams;
  const items = await getNaverReportsList();
  return (
    <PageChrome title="사역 리포트" titleSize="compact">
      <ContentListPage title="사역 리포트" items={items} query={query} />
    </PageChrome>
  );
}
