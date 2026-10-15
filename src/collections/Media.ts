import type { CollectionConfig } from "payload";

/** Uploaded images for stories/press releases (thumbnails, body figures). */
export const Media: CollectionConfig = {
  slug: "media",
  access: { read: () => true },
  upload: { staticDir: "media" },
  fields: [{ name: "alt", type: "text", required: true }],
};
