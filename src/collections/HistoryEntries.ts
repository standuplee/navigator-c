import type { CollectionConfig } from "payload";
import { publicRead } from "@/payload/fields";
import { safeRevalidatePath } from "@/lib/payload/safeRevalidate";

/** One line of /about/history. Tabs (e.g. 네비게이토 / 서울C지구) are defined in the
 * "연혁 페이지" global; `tab` holds that tab's id. Listed newest first by year, then order. */
export const HistoryEntries: CollectionConfig = {
  slug: "history-entries",
  labels: { singular: "연혁 항목", plural: "연혁" },
  admin: { useAsTitle: "title", defaultColumns: ["year", "month", "title", "tab"], group: "About", preview: () => "/about/history" },
  access: publicRead,
  defaultSort: "-year",
  fields: [
    { name: "tab", label: "탭 id", type: "text", required: true, defaultValue: "history", admin: { description: "연혁 페이지 global의 탭 id와 같게" } },
    { name: "year", label: "연도", type: "text", required: true },
    { name: "month", label: "월", type: "text", admin: { description: "예: 06월" } },
    { name: "title", label: "내용", type: "text", required: true },
    { name: "description", label: "설명", type: "textarea" },
    { name: "order", label: "같은 연도 안 순서", type: "number", defaultValue: 0 },
  ],
  hooks: { afterChange: [() => safeRevalidatePath("/about/history")] },
};
