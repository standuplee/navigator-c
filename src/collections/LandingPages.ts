import type { CollectionConfig } from "payload";
import { anchor, cta, media, publicRead, slugField } from "@/payload/fields";
import { safeRevalidatePath } from "@/lib/payload/safeRevalidate";

/** Section landings (SectionLandingContent): /ministry and /fellowship. */
export const LandingPages: CollectionConfig = {
  slug: "landing-pages",
  labels: { singular: "사역·활동 첫 화면", plural: "사역·활동 첫 화면" },
  admin: { useAsTitle: "slug", group: "페이지", preview: (doc) => `/${doc.slug}` },
  access: publicRead,
  fields: [
    slugField("ministry 또는 fellowship"),
    {
      name: "theme",
      label: "색 테마",
      type: "select",
      required: true,
      defaultValue: "light",
      options: [
        { label: "밝게", value: "light" },
        { label: "어둡게", value: "dark" },
      ],
    },
    {
      name: "hero",
      label: "첫 화면 문구",
      type: "group",
      fields: [
        { name: "line1", label: "첫 줄 (단어 2개)", type: "text", hasMany: true, minRows: 2, maxRows: 2, required: true },
        { name: "line2", label: "둘째 줄", type: "text", required: true },
        { name: "tiles", label: "떠다니는 사진 수", type: "number", defaultValue: 8, min: 0, max: 8 },
      ],
    },
    {
      name: "body",
      label: "본문",
      type: "blocks",
      minRows: 1,
      maxRows: 1,
      blocks: [
        {
          slug: "featured",
          labels: { singular: "대표 항목 목록", plural: "대표 항목 목록" },
          fields: [
            {
              name: "items",
              type: "array",
              fields: [
                anchor(),
                { name: "title", type: "text", required: true },
                { name: "text", type: "textarea", required: true },
                { name: "href", type: "text" },
                media("media", "사진/영상", { kind: true }),
              ],
            },
          ],
        },
        {
          slug: "stack",
          labels: { singular: "분야별 카드 쌓기", plural: "분야별 카드 쌓기" },
          fields: [
            { name: "title", type: "text", required: true },
            {
              name: "domains",
              label: "분야",
              type: "array",
              fields: [
                anchor(),
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
                {
                  name: "points",
                  label: "하위 항목",
                  type: "array",
                  fields: [
                    { name: "title", type: "text", required: true },
                    { name: "text", type: "textarea" },
                  ],
                },
                media("media", "사진/영상", { kind: true }),
              ],
            },
            {
              name: "research",
              label: "하단 블록 (비우면 표시 안 함)",
              type: "group",
              fields: [
                { name: "title", type: "text" },
                {
                  name: "items",
                  type: "array",
                  fields: [
                    { name: "title", type: "text", required: true },
                    { name: "text", type: "textarea" },
                    { name: "href", type: "text" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    cta(),
  ],
  hooks: { afterChange: [({ doc }) => safeRevalidatePath(`/${doc.slug}`)] },
};
