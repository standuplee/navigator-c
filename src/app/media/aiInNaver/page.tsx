import { PageChrome } from "@/components/content/main/PageChrome";
import { AiInServicePage, type AiQuery } from "@/components/content/AiInServicePage";
import { getAiInNaver } from "@/lib/data/mediaRepository";

export const metadata = { title: "서비스 속의 AI l navigators-c" };

export default async function AiInServiceRoute({ searchParams }: { searchParams: Promise<AiQuery> }) {
  const query = await searchParams;
  const data = await getAiInNaver();
  return (
    <PageChrome>
      <AiInServicePage title="서비스 속의 AI" description="AI가 서비스를 바꾸는 오늘과 앞으로의 이야기" categories={data.categories} services={data.services} building={data.building} query={query} />
    </PageChrome>
  );
}
