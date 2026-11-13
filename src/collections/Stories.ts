import type { CollectionConfig } from "payload";
import { safeRevalidatePath } from "@/lib/payload/safeRevalidate";
import { STORY_CATEGORIES } from "@/types/story";

/** Mirrors src/types/story.ts — same shape the frontend already expects, so the
 * repository swap (src/lib/data/storyRepository.ts) only needs its implementation
 * changed, never the components (docs/content-model.md, HANDOFF.md 작업 순서 2). */
export const Stories: CollectionConfig = {
  slug: "stories",
  labels: { singular: "간증", plural: "간증" },
  admin: {
    group: "소식·미디어",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "_status"],
    preview: (doc) => `/testimony/${doc.seq}`,
  },
  versions: { drafts: true },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "seq", type: "text", required: true, unique: true, admin: { description: "원본 URL 호환용 식별자 — /testimony/<값>" } },
    { name: "category", type: "select", required: true, options: [...STORY_CATEGORIES] },
    { name: "tags", type: "text", hasMany: true },
    { name: "publishedAt", type: "date", required: true, admin: { date: { pickerAppearance: "dayOnly" } } },
    { name: "thumbnail", type: "upload", relationTo: "media" },
    { name: "body", type: "richText" },
    {
      type: "collapsible",
      label: "SEO",
      fields: [
        { name: "seoTitle", type: "text" },
        { name: "seoDescription", type: "textarea" },
        { name: "ogImage", type: "upload", relationTo: "media" },
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        safeRevalidatePath("/testimony");
        safeRevalidatePath(`/testimony/${doc.seq}`);
      },
    ],
  },
};
