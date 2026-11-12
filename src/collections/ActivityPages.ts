import type { CollectionConfig } from "payload";
import { anchor, cta, directory, links, media, mediaList, publicRead, related, slugField } from "@/payload/fields";
import { safeRevalidatePath } from "@/lib/payload/safeRevalidate";

/** Activity detail pages on the dark tech-detail template (TechDetailContent):
 * /fellowship/{gatherings, discipleship, events, leisure}. */
export const ActivityPages: CollectionConfig = {
  slug: "activity-pages",
  labels: { singular: "활동 상세", plural: "활동 상세" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    group: "페이지",
    preview: (doc) => `/fellowship/${doc.slug}`,
  },
  access: publicRead,
  fields: [
    { name: "title", label: "페이지 이름", type: "text", required: true },
    slugField("주소 /fellowship/<값>: gatherings, discipleship, events, leisure"),
    directory(),
    { name: "keycopy", label: "대표 문구", type: "textarea", required: true },
    media("heroMedia", "대표 사진/영상", { kind: true }),
    {
      name: "sections",
      label: "섹션",
      type: "array",
      fields: [
        anchor(),
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
        mediaList("wideImages", "넓은 이미지 (여러 장이면 슬라이드)"),
        {
          name: "cards",
          label: "가로 카드",
          type: "array",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea" },
          ],
        },
        {
          name: "items",
          label: "항목",
          type: "array",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea" },
            media("image", "이미지"),
            links(),
          ],
        },
      ],
    },
    cta(),
    related(),
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        safeRevalidatePath(`/fellowship/${doc.slug}`);
        safeRevalidatePath("/ministry/all");
      },
    ],
  },
};
