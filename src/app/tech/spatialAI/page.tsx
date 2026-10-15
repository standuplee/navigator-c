import { PageChrome } from "@/components/content/main/PageChrome";
import { FeatureDetailPage } from "@/components/content/FeatureDetailPage";
import { getFeatureDetail } from "@/lib/data/featureRepository";

export const metadata = { title: "공간지능 l NOVA" };

export default async function SpatialAIPage() {
  const content = await getFeatureDetail("spatialAI");
  return (
    <PageChrome overDarkHero>
      <FeatureDetailPage content={content} />
    </PageChrome>
  );
}
