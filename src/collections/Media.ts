import type { CollectionConfig } from "payload";

/** Uploaded images and videos used across the site (every upload field points here). */
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "사진·파일", plural: "사진·파일" },
  admin: { group: "설정" },
  access: { read: () => true },
  upload: { staticDir: "media" },
  fields: [{ name: "alt", label: "사진 설명 (대체 텍스트)", type: "text", required: true }],
};
