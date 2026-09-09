import { StoryDetailPage } from "@/features/navercorp/components/story/StoryDetailPage";
import { findStory } from "@/lib/content/story-repository";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ seq?: string }> }) { const story = await findStory((await searchParams).seq); return { title: `${story.title} l NAVER Corp.` }; }
export default async function StoryDetailRoute({ searchParams }: { searchParams: Promise<{ seq?: string }> }) { return <StoryDetailPage story={await findStory((await searchParams).seq)} />; }
