import type { CollectionConfig } from "payload";
import { publicRead } from "@/payload/fields";
import { safeRevalidatePath } from "@/lib/payload/safeRevalidate";

/** /privacy version list + /privacy/[seq] documents (PolicyVersion). */
export const Policies: CollectionConfig = {
  slug: "policies",
  labels: { singular: "개인정보 처리방침", plural: "개인정보 처리방침" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "date", "seq"], group: "설정", preview: (doc) => `/privacy/${doc.seq}` },
  access: publicRead,
  defaultSort: "-date",
  fields: [
    { name: "title", type: "text", required: true, admin: { description: "예: 개인정보 처리방침 (VER 1.0)" } },
    { name: "seq", type: "text", required: true, unique: true, admin: { description: "주소 /privacy/<값>" } },
    { name: "date", label: "공지일", type: "date", required: true, admin: { date: { pickerAppearance: "dayOnly" } } },
    {
      name: "blocks",
      label: "본문",
      type: "blocks",
      blocks: [
        { slug: "heading", labels: { singular: "제목", plural: "제목" }, fields: [{ name: "text", type: "text", required: true }] },
        { slug: "paragraph", labels: { singular: "문단", plural: "문단" }, fields: [{ name: "text", type: "textarea", required: true }] },
        { slug: "list", labels: { singular: "목록", plural: "목록" }, fields: [{ name: "items", type: "text", hasMany: true, required: true }] },
        {
          slug: "table",
          labels: { singular: "표", plural: "표" },
          fields: [
            { name: "columns", label: "머리글", type: "text", hasMany: true, required: true },
            { name: "rows", type: "array", fields: [{ name: "cells", type: "text", hasMany: true, required: true }] },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        safeRevalidatePath("/privacy");
        safeRevalidatePath(`/privacy/${doc.seq}`);
      },
    ],
  },
};
