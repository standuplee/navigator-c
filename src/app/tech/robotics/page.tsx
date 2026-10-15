import { PageChrome } from "@/components/content/main/PageChrome";
import { FeatureDetailPage } from "@/components/content/FeatureDetailPage";
import { getFeatureDetail } from "@/lib/data/featureRepository";

export const metadata = { title: "로보틱스 l NOVA" };

export default async function RoboticsPage() {
  const content = await getFeatureDetail("robotics");
  return (
    <PageChrome overDarkHero>
      <FeatureDetailPage content={content} />
    </PageChrome>
  );
}
