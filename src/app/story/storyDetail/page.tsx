import { PageChrome } from "@/components/content/main/PageChrome";
import { StoryDetailTemplate } from "@/components/content/StoryDetailTemplate";
import { getStoryDetail, getStoryList } from "@/lib/data/storyRepository";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ seq?: string }> }) {
  const { seq } = await searchParams;
  const story = await getStoryDetail(seq);
  return { title: `${story.title} l NOVA` };
}

export default async function StoryDetailRoute({ searchParams }: { searchParams: Promise<{ seq?: string }> }) {
  const { seq } = await searchParams;
  const [story, list] = await Promise.all([getStoryDetail(seq), getStoryList()]);
  const related = list
    .filter((item) => item.title !== story.title)
    .slice(0, 6)
    .map((item) => ({ id: item.seq, title: item.title, href: `/story/storyDetail?seq=${item.seq}`, date: item.date, category: item.category }));
  return (
    <PageChrome headerTheme="transparent">
      <StoryDetailTemplate story={story} related={related} />
    </PageChrome>
  );
}
