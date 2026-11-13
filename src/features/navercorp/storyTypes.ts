/** Story types of the raw reference clone (its own category set), kept apart from the
 * site's testimony types in src/types/story.ts. */
export type StoryCategory = "Leader's View" | "Culture" | "Service" | "People" | "Tech" | "Impact";
export type Story = { seq: string; category: StoryCategory; date: string; title: string; tags: string[]; image: string };
export type StoryDetail = Omit<Story, "image"> & { markdown: string };
