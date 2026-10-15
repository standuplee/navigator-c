import { PageChrome } from "@/components/content/main/PageChrome";
import { StoryDetailTemplate } from "@/components/content/StoryDetailTemplate";
import { getStoryDetail } from "@/lib/data/storyRepository";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ seq?: string }> }) {
  const { seq } = await searchParams;
  const story = await getStoryDetail(seq);
  return { title: `${story.title} l NOVA` };
}

export default async function StoryDetailRoute({ searchParams }: { searchParams: Promise<{ seq?: string }> }) {
  const { seq } = await searchParams;
  const story = await getStoryDetail(seq);
  return (
    <PageChrome>
      <StoryDetailTemplate story={story} />
    </PageChrome>
  );
}
