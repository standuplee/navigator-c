import type { Story, StoryDetail } from "@/types/story";
import { stories } from "@/features/navercorp/data/story";
import { getStoryDetail } from "@/features/navercorp/data/storyDetails";

/** Repository boundary used by the pages. Replace the seed adapter with the Prisma adapter
 * when DATABASE_URL is provisioned; UI components remain unchanged. */
export async function listStories(): Promise<Story[]> {
  return stories;
}

export async function findStory(seq?: string): Promise<StoryDetail> {
  return getStoryDetail(seq);
}
