import type { CollectionConfig } from "payload";
import { publicRead } from "@/payload/fields";
import { safeRevalidatePath } from "@/lib/payload/safeRevalidate";

/** /news/schedule rows (+ /news/schedule/[seq] detail). */
export const Events: CollectionConfig = {
  slug: "events",
  labels: { singular: "일정", plural: "모임·행사 일정" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "date", "seq"], group: "소식·미디어", preview: (doc) => `/news/schedule/${doc.seq}` },
  access: publicRead,
  defaultSort: "-date",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "seq", type: "text", required: true, unique: true, admin: { description: "주소 /news/schedule/<값>" } },
    { name: "date", label: "날짜", type: "date", required: true, admin: { date: { pickerAppearance: "dayOnly" } } },
    { name: "displayDate", label: "날짜 표시 문구 (선택)", type: "text", admin: { description: "예: 매주 화 19:00 — 비우면 날짜를 표시" } },
    { name: "place", label: "장소", type: "text" },
    { name: "body", label: "내용", type: "richText" },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        safeRevalidatePath("/news/schedule");
        safeRevalidatePath(`/news/schedule/${doc.seq}`);
      },
    ],
  },
};
