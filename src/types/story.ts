export const STORY_CATEGORIES = ["캠퍼스", "직장", "수양회", "훈련", "해외", "가정"] as const;
export type StoryCategory = (typeof STORY_CATEGORIES)[number];

export type Story = { seq: string; category: StoryCategory; date: string; title: string; tags: string[]; image: string };
export type StoryDetail = Omit<Story, "image"> & { markdown: string };
