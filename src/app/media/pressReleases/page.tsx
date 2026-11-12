import { PageChrome } from "@/components/content/main/PageChrome";
import { ContentListPage, type ContentListQuery } from "@/components/content/ContentListPage";
import { getPressReleaseList } from "@/lib/data/mediaRepository";

export const metadata = { title: "보도자료 l NOVA" };

const quickLinks = [
  { title: "미디어 행사 일정", text: "예정된 행사와 초청 안내", href: "/media/mediaEvents" },
  { title: "리포트", text: "기술과 서비스에 대한 리포트", href: "/media/naverReports" },
  { title: "브랜드 리소스", text: "로고와 브랜드 자료", href: "/company/brandGuide" },
];

export default async function PressReleasesPage({ searchParams }: { searchParams: Promise<ContentListQuery> }) {
  const query = await searchParams;
  const items = await getPressReleaseList();
  return (
    <PageChrome title="보도자료" titleSize="compact">
      <ContentListPage title="보도자료" items={items} query={query} quickLinks={quickLinks} />
    </PageChrome>
  );
}
