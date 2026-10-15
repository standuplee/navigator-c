import { PageChrome } from "@/components/content/main/PageChrome";
import { ContentListPage } from "@/components/content/ContentListPage";
import { getPressReleaseList } from "@/lib/data/mediaRepository";

export const metadata = { title: "보도자료 l NOVA" };

export default async function PressReleasesPage({ searchParams }: { searchParams: Promise<{ keyword?: string }> }) {
  const { keyword = "" } = await searchParams;
  const items = await getPressReleaseList();
  return (
    <PageChrome>
      <ContentListPage title="보도자료" items={items} initialQuery={keyword} />
    </PageChrome>
  );
}
