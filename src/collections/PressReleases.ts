import type { CollectionConfig } from "payload";
import { safeRevalidatePath } from "@/lib/payload/safeRevalidate";

/** Mirrors src/types/mainTemplate.ts NewsCardItem + src/types/content.ts ArticleDetail. */
export const PressReleases: CollectionConfig = {
  slug: "press-releases",
  labels: { singular: "보도자료", plural: "보도자료" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "_status"],
    preview: (doc) => `/media/pressReleasesDetail?seq=${doc.seq}`,
  },
  versions: { drafts: true },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "seq", type: "text", required: true, unique: true, admin: { description: "원본 URL 호환용 식별자 — /media/pressReleasesDetail?seq=<값>" } },
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
        safeRevalidatePath("/media/pressReleases");
        safeRevalidatePath(`/media/pressReleasesDetail?seq=${doc.seq}`);
      },
    ],
  },
};
