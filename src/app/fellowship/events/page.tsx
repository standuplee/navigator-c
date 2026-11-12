import { PageChrome } from "@/components/content/main/PageChrome";
import { TechDetailPage } from "@/components/content/TechDetailPage";
import { getTechDetail } from "@/lib/data/techRepository";

export const metadata = { title: "이머시브 미디어 l NOVA" };

export default async function ImmersiveMediaPage() {
  const content = await getTechDetail("events");
  return (
    <PageChrome headerTheme="dark">
      <TechDetailPage content={content} />
    </PageChrome>
  );
}
