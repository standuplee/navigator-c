import { PageChrome } from "@/components/content/main/PageChrome";
import { TechDetailPage } from "@/components/content/TechDetailPage";
import { getTechDetail } from "@/lib/data/techRepository";

export const metadata = { title: "파운데이션 모델 l NOVA" };

export default async function FoundationModelPage() {
  const content = await getTechDetail("foundationModel");
  return (
    <PageChrome headerTheme="dark">
      <TechDetailPage content={content} />
    </PageChrome>
  );
}
