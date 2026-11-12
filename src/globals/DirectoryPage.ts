import type { GlobalConfig } from "payload";
import { publicRead } from "@/payload/fields";
import { safeRevalidatePath } from "@/lib/payload/safeRevalidate";

/** /ministry/all — the list is built automatically from 사역·소개 상세 and 활동 상세
 * documents that have a "한눈에 보기" category; this global sets the title, the category
 * order and any extra rows without a page of their own. */
export const DirectoryPage: GlobalConfig = {
  slug: "directory-page",
  label: "한눈에 보기",
  admin: { group: "페이지" },
  access: publicRead,
  fields: [
    { name: "title", type: "text", required: true, defaultValue: "한눈에 보기" },
    { name: "categories", label: "분류 순서", type: "text", hasMany: true },
    {
      name: "extraItems",
      label: "추가 항목",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "category", type: "text", required: true },
        { name: "href", type: "text", defaultValue: "#" },
        {
          name: "links",
          type: "array",
          fields: [
            { name: "kind", type: "select", required: true, defaultValue: "home", options: [{ label: "홈페이지", value: "home" }, { label: "앱", value: "app" }] },
            { name: "href", type: "text", required: true },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      () => {
        safeRevalidatePath("/ministry/all");
        safeRevalidatePath("/ministry/all/abc");
      },
    ],
  },
};
