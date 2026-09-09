export type StoryCategory = "Leader's View" | "Culture" | "Service" | "People" | "Tech" | "Impact";

export type Story = { seq: string; category: StoryCategory; date: string; title: string; tags: string[]; image: string };
export type StoryDetail = Omit<Story, "image"> & { markdown: string };
