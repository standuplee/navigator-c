import type { GlobalConfig } from "payload";
import { publicRead } from "@/payload/fields";
import { safeRevalidatePath } from "@/lib/payload/safeRevalidate";

/** Header mega menu; the footer link groups are built from the same tree. */
export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "메뉴",
  admin: { group: "설정" },
  access: publicRead,
  fields: [
    {
      name: "menu",
      label: "상단 메뉴",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
        {
          name: "children",
          label: "하위 메뉴",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "href", type: "text", required: true },
          ],
        },
      ],
    },
  ],
  hooks: { afterChange: [() => safeRevalidatePath("/", "layout")] },
};
