import { PageChrome } from "@/components/content/main/PageChrome";
import { TechDetailPage } from "@/components/content/TechDetailPage";
import { getTechDetail } from "@/lib/data/techRepository";

export const metadata = { title: "양육·훈련 l navigators-c" };

export default async function RoboticsPage() {
  const content = await getTechDetail("discipleship");
  return (
    <PageChrome headerTheme="dark">
      <TechDetailPage content={content} />
    </PageChrome>
  );
}
