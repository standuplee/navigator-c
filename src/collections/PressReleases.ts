import type { CollectionConfig } from "payload";
import { safeRevalidatePath } from "@/lib/payload/safeRevalidate";

/** Mirrors src/types/mainTemplate.ts NewsCardItem + src/types/content.ts ArticleDetail. */
export const PressReleases: CollectionConfig = {
  slug: "press-releases",
  labels: { singular: "소식", plural: "소식" },
  admin: {
    group: "소식·미디어",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "_status"],
    preview: (doc) => `/news/${doc.seq}`,
  },
  versions: { drafts: true },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "seq", type: "text", required: true, unique: true, admin: { description: "원본 URL 호환용 식별자 — /news/<값>" } },
    { name: "category", type: "text", defaultValue: "보도자료" },
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
        safeRevalidatePath("/news");
        safeRevalidatePath(`/news/${doc.seq}`);
      },
    ],
  },
};
