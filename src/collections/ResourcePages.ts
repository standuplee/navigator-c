import type { CollectionConfig } from "payload";
import { anchor, publicRead, slugField, tone } from "@/payload/fields";
import { safeRevalidatePath } from "@/lib/payload/safeRevalidate";

/** /about/tools and /about/gallery (ResourcePageContent): sections of items, each with
 * one visual block, plus the download-consent dialog text. */
export const ResourcePages: CollectionConfig = {
  slug: "resource-pages",
  labels: { singular: "도구·갤러리", plural: "도구·갤러리" },
  admin: { useAsTitle: "title", group: "About", preview: (doc) => `/about/${doc.slug}` },
  access: publicRead,
  fields: [
    { name: "title", label: "페이지 이름", type: "text", required: true },
    slugField("tools 또는 gallery"),
    {
      name: "sections",
      type: "array",
      fields: [
        anchor(),
        { name: "title", type: "text", required: true },
        {
          name: "items",
          type: "array",
          fields: [
            anchor(),
            { name: "title", type: "text", required: true },
            { name: "subTitle", type: "text" },
            { name: "text", type: "textarea", required: true },
            {
              name: "download",
              label: "다운로드 버튼 (비우면 없음)",
              type: "group",
              fields: [
                { name: "label", type: "text" },
                { name: "href", type: "text" },
              ],
            },
            {
              name: "visual",
              type: "blocks",
              minRows: 1,
              maxRows: 1,
              blocks: [
                {
                  slug: "tiles",
                  labels: { singular: "이미지 타일", plural: "이미지 타일" },
                  fields: [
                    {
                      name: "tiles",
                      type: "array",
                      fields: [
                        { name: "label", type: "text", required: true },
                        { name: "caption", type: "text" },
                        tone("tone", "배경 톤", { extra: [{ label: "강조색", value: "brand" }] }),
                        { name: "wide", label: "넓게 (한 줄 전체)", type: "checkbox" },
                        { name: "src", label: "이미지", type: "upload", relationTo: "media" },
                      ],
                    },
                    { name: "note", type: "textarea" },
                  ],
                },
                {
                  slug: "swatches",
                  labels: { singular: "색상표", plural: "색상표" },
                  fields: [
                    {
                      name: "swatches",
                      type: "array",
                      fields: [
                        { name: "name", type: "text", required: true },
                        { name: "hex", type: "text", required: true },
                        { name: "rgb", type: "text" },
                        { name: "cmyk", type: "text" },
                        tone("textTone", "글자색", { defaultValue: "dark" }),
                      ],
                    },
                  ],
                },
                {
                  slug: "bans",
                  labels: { singular: "사용 금지 예시", plural: "사용 금지 예시" },
                  fields: [
                    {
                      name: "items",
                      type: "array",
                      fields: [
                        { name: "caption", type: "text", required: true },
                        { name: "src", label: "이미지", type: "upload", relationTo: "media" },
                      ],
                    },
                  ],
                },
                {
                  slug: "photos",
                  labels: { singular: "사진", plural: "사진" },
                  fields: [
                    {
                      name: "photos",
                      type: "array",
                      fields: [
                        { name: "alt", label: "사진 설명", type: "text", required: true },
                        { name: "src", label: "사진", type: "upload", relationTo: "media" },
                        { name: "downloadHref", label: "다운로드 주소", type: "text" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "consent",
      label: "다운로드 동의 창",
      type: "group",
      fields: [
        { name: "title", type: "text", required: true, defaultValue: "자료 사용 동의" },
        { name: "text", type: "textarea", required: true, defaultValue: "자료 사용 지침을 읽고 이에 동의합니다." },
        { name: "cancelLabel", type: "text", required: true, defaultValue: "취소" },
        { name: "confirmLabel", type: "text", required: true, defaultValue: "동의 후 다운로드" },
      ],
    },
  ],
  hooks: { afterChange: [({ doc }) => safeRevalidatePath(`/about/${doc.slug}`)] },
};
