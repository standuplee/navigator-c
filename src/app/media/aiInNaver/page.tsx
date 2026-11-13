import { PageChrome } from "@/components/content/main/PageChrome";
import { AiInServicePage, type AiQuery } from "@/components/content/AiInServicePage";
import { getAiInNaver } from "@/lib/data/mediaRepository";

export const metadata = { title: "말씀 나눔 l navigators-c" };

export default async function AiInServiceRoute({ searchParams }: { searchParams: Promise<AiQuery> }) {
  const query = await searchParams;
  const data = await getAiInNaver();
  return (
    <PageChrome>
      <AiInServicePage title="말씀 나눔" description="매일의 QT 묵상과 성경공부 가이드를 나눕니다" categories={data.categories} services={data.services} building={data.building} query={query} />
    </PageChrome>
  );
}
