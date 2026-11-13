import { PageChrome } from "@/components/content/main/PageChrome";
import { ContentListPage, type ContentListQuery } from "@/components/content/ContentListPage";
import { getPressReleaseList } from "@/lib/data/mediaRepository";

export const metadata = { title: "소식 l navigators-c" };

const quickLinks = [
  { title: "모임 일정", text: "주일교제, 은혜의 샘, 훈련과 행사 일정", href: "/news/schedule" },
  { title: "사역 리포트", text: "학기별 사역 보고와 수양회 결산", href: "/media/naverReports" },
  { title: "간증", text: "형제자매들이 만난 하나님 이야기", href: "/testimony" },
];

export default async function PressReleasesPage({ searchParams }: { searchParams: Promise<ContentListQuery> }) {
  const query = await searchParams;
  const items = await getPressReleaseList();
  return (
    <PageChrome title="소식" titleSize="compact">
      <ContentListPage title="소식" items={items} query={query} quickLinks={quickLinks} />
    </PageChrome>
  );
}
