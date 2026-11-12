import type { CollectionConfig } from "payload";
import { anchor, cta, directory, links, media, mediaList, publicRead, related, slugField } from "@/payload/fields";
import { safeRevalidatePath } from "@/lib/payload/safeRevalidate";

/** Detail pages on the service-detail template (src/types/pageTemplates.ts
 * ServiceDetailContent): the ministries, the vision center and the channels page.
 * `slug` decides the route — see SERVICE_PAGE_PATHS. */
export const SERVICE_PAGE_PATHS: Record<string, string> = {
  "bible-study": "/ministry/bible-study",
  campus: "/ministry/campus",
  workplace: "/ministry/workplace",
  military: "/ministry/military",
  missions: "/ministry/missions",
  "church-contribution": "/ministry/church-contribution",
  "vision-center": "/about/vision-center",
  channels: "/media/channels",
  portal: "/service/portal",
  space1784: "/service/1784",
};

export const ServicePages: CollectionConfig = {
  slug: "service-pages",
  labels: { singular: "사역·소개 상세", plural: "사역·소개 상세" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "layout", "updatedAt"],
    group: "페이지",
    preview: (doc) => SERVICE_PAGE_PATHS[String(doc.slug)] ?? "/",
  },
  access: publicRead,
  fields: [
    { name: "title", label: "페이지 이름", type: "text", required: true },
    slugField(`주소를 정하는 값: ${Object.keys(SERVICE_PAGE_PATHS).join(", ")}`),
    directory(),
    {
      name: "hero",
      label: "상단 히어로",
      type: "blocks",
      minRows: 1,
      maxRows: 1,
      blocks: [
        {
          slug: "icon-grid",
          labels: { singular: "아이콘 격자", plural: "아이콘 격자" },
          fields: [
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
            { name: "icons", label: "아이콘 이름", type: "text", hasMany: true },
          ],
        },
        {
          slug: "fullscreen",
          labels: { singular: "전체 화면 사진/영상", plural: "전체 화면 사진/영상" },
          fields: [
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
            media("media", "배경", { kind: true }),
          ],
        },
      ],
    },
    {
      name: "layout",
      label: "본문 배치",
      type: "select",
      required: true,
      defaultValue: "sticky-visual",
      options: [
        { label: "왼쪽 고정 이미지 + 오른쪽 항목", value: "sticky-visual" },
        { label: "전체 폭 항목 + 카드", value: "stacked" },
      ],
    },
    {
      name: "products",
      label: "항목",
      type: "array",
      fields: [
        anchor(),
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        links(),
        mediaList("images", "이미지"),
        {
          name: "detailServices",
          label: "세부 항목",
          type: "array",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea" },
          ],
        },
        {
          name: "items",
          label: "카드 (전체 폭 배치에서 사용)",
          type: "array",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea" },
            media("image", "이미지"),
          ],
        },
      ],
    },
    {
      name: "growTogether",
      label: "함께 성장 섹션 (비우면 표시 안 함)",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        {
          name: "banner",
          type: "group",
          fields: [
            { name: "title", type: "text" },
            { name: "text", type: "textarea" },
            { name: "href", type: "text" },
            media("image", "이미지"),
          ],
        },
        {
          name: "groups",
          type: "array",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "text", type: "textarea" },
            {
              name: "cards",
              type: "array",
              fields: [
                { name: "title", type: "text", required: true },
                { name: "text", type: "textarea" },
                { name: "href", type: "text", required: true },
              ],
            },
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
        safeRevalidatePath(SERVICE_PAGE_PATHS[String(doc.slug)] ?? "/");
        safeRevalidatePath("/ministry/all");
      },
    ],
  },
};
