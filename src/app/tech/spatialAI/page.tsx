import { PageChrome } from "@/components/content/main/PageChrome";
import { TechDetailPage } from "@/components/content/TechDetailPage";
import { getTechDetail } from "@/lib/data/techRepository";

export const metadata = { title: "공간지능 l NOVA" };

export default async function SpatialAIPage() {
  const content = await getTechDetail("spatialAI");
  return (
    <PageChrome headerTheme="dark">
      <TechDetailPage content={content} />
    </PageChrome>
  );
}
