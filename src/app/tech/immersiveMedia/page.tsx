import { PageChrome } from "@/components/content/main/PageChrome";
import { FeatureDetailPage } from "@/components/content/FeatureDetailPage";
import { getFeatureDetail } from "@/lib/data/featureRepository";

export const metadata = { title: "이머시브 미디어 l NOVA" };

export default async function ImmersiveMediaPage() {
  const content = await getFeatureDetail("immersiveMedia");
  return (
    <PageChrome overDarkHero>
      <FeatureDetailPage content={content} />
    </PageChrome>
  );
}
