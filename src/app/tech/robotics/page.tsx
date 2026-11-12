import { PageChrome } from "@/components/content/main/PageChrome";
import { TechDetailPage } from "@/components/content/TechDetailPage";
import { getTechDetail } from "@/lib/data/techRepository";

export const metadata = { title: "로보틱스 l NOVA" };

export default async function RoboticsPage() {
  const content = await getTechDetail("robotics");
  return (
    <PageChrome headerTheme="dark">
      <TechDetailPage content={content} />
    </PageChrome>
  );
}
