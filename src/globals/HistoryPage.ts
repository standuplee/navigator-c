import type { GlobalConfig } from "payload";
import { publicRead } from "@/payload/fields";
import { safeRevalidatePath } from "@/lib/payload/safeRevalidate";

/** /about/history title and tabs; the entries are the "연혁" collection. */
export const HistoryPage: GlobalConfig = {
  slug: "history-page",
  label: "연혁 페이지",
  admin: { group: "About" },
  access: publicRead,
  fields: [
    { name: "title", type: "text", required: true, defaultValue: "연혁" },
    {
      name: "tabs",
      label: "탭",
      type: "array",
      minRows: 1,
      fields: [
        { name: "anchor", label: "탭 id", type: "text", required: true },
        { name: "label", type: "text", required: true },
      ],
    },
  ],
  hooks: { afterChange: [() => safeRevalidatePath("/about/history")] },
};
