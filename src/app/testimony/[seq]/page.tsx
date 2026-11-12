import { PageChrome } from "@/components/content/main/PageChrome";
import { StoryDetailTemplate } from "@/components/content/StoryDetailTemplate";
import { getStoryDetail, getStoryList } from "@/lib/data/storyRepository";

export async function generateMetadata({ params }: { params: Promise<{ seq: string }> }) {
  const { seq } = await params;
  const story = await getStoryDetail(seq);
  return { title: `${story.title} l NOVA` };
}

export default async function StoryDetailRoute({ params }: { params: Promise<{ seq: string }> }) {
  const { seq } = await params;
  const [story, list] = await Promise.all([getStoryDetail(seq), getStoryList()]);
  const related = list
    .filter((item) => item.title !== story.title)
    .slice(0, 6)
    .map((item) => ({ id: item.seq, title: item.title, href: `/testimony/${item.seq}`, date: item.date, category: item.category }));
  return (
    <PageChrome headerTheme="transparent">
      <StoryDetailTemplate story={story} related={related} />
    </PageChrome>
  );
}
