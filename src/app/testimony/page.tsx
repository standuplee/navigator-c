import { PageChrome } from "@/components/content/main/PageChrome";
import { StoryListPage, type StoryListQuery } from "@/components/content/StoryListPage";
import { getStoryList } from "@/lib/data/storyRepository";

export const metadata = { title: "간증 l navigators-c" };

export default async function StoryPage({ searchParams }: { searchParams: Promise<StoryListQuery> }) {
  const query = await searchParams;
  const stories = await getStoryList();
  return (
    <PageChrome title="스토리" titleSize="compact">
      <StoryListPage stories={stories} query={query} />
    </PageChrome>
  );
}
