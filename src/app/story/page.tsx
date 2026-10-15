import { PageChrome } from "@/components/content/main/PageChrome";
import { StoryListPage } from "@/components/content/StoryListPage";
import { getStoryList } from "@/lib/data/storyRepository";

export const metadata = { title: "스토리 l NOVA" };

export default async function StoryPage({ searchParams }: { searchParams: Promise<{ keyword?: string }> }) {
  const { keyword = "" } = await searchParams;
  const stories = await getStoryList();
  return (
    <PageChrome>
      <StoryListPage stories={stories} initialQuery={keyword} />
    </PageChrome>
  );
}
