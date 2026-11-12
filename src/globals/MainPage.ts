import type { Field, GlobalConfig } from "payload";
import { publicRead, tone } from "@/payload/fields";
import { safeRevalidatePath } from "@/lib/payload/safeRevalidate";

const card: Field[] = [
  { name: "anchor", label: "id", type: "text", required: true },
  { name: "category", label: "분류", type: "text", required: true },
  { name: "date", label: "날짜", type: "text", admin: { description: "예: 2026.09.07" } },
  { name: "title", type: "text", required: true },
  { name: "href", type: "text", required: true },
  tone(),
];

/** / (main page) sections, in page order. */
export const MainPage: GlobalConfig = {
  slug: "main-page",
  label: "메인 페이지",
  admin: { group: "페이지" },
  access: publicRead,
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "헤드라인",
          fields: [
            {
              name: "headlineSlides",
              label: "헤드라인 슬라이드",
              type: "array",
              fields: [...card, { name: "image", type: "upload", relationTo: "media" }],
            },
            {
              name: "shortcutCards",
              label: "옆 카드 3개",
              type: "array",
              maxRows: 3,
              fields: [
                { name: "anchor", label: "id", type: "text", required: true },
                { name: "label", type: "text", required: true },
                { name: "title", type: "text", required: true },
                { name: "href", type: "text", required: true },
                tone(),
              ],
            },
          ],
        },
        {
          label: "소식 카드",
          fields: [
            {
              name: "newsCards",
              label: "소식 카드 (모바일은 앞 5개)",
              type: "array",
              fields: [
                ...card,
                { name: "kind", label: "형태", type: "select", defaultValue: "image", options: [{ label: "사진 카드", value: "image" }, { label: "글 카드", value: "text" }] },
                { name: "tags", type: "text", hasMany: true },
                { name: "image", type: "upload", relationTo: "media" },
              ],
            },
          ],
        },
        {
          label: "프로모션",
          fields: [
            {
              name: "promotionSlides",
              label: "프로모션 슬라이드",
              type: "array",
              fields: [
                { name: "anchor", label: "id", type: "text", required: true },
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
                { name: "ctaLabel", label: "버튼 문구", type: "text", required: true, defaultValue: "자세히 보기" },
                { name: "href", type: "text", required: true },
                { name: "backgroundColor", label: "배경색", type: "text", required: true, defaultValue: "#f2f4f5" },
                tone(),
                { name: "image", type: "upload", relationTo: "media" },
              ],
            },
          ],
        },
        {
          label: "요약 패널",
          fields: [
            {
              name: "summaryPanels",
              label: "가로 확장 패널",
              type: "array",
              fields: [
                { name: "anchor", label: "id", type: "text", required: true },
                { name: "label", type: "text", required: true },
                { name: "title", type: "text", required: true },
                { name: "titleEn", label: "영문 부제", type: "text" },
                { name: "description", type: "textarea", required: true },
                { name: "href", type: "text", required: true },
                { name: "color", label: "열렸을 때 배경색", type: "text", required: true, defaultValue: "#1a1d24" },
                tone("tone", "글자색 톤", { defaultValue: "dark" }),
                { name: "image", type: "upload", relationTo: "media" },
              ],
            },
          ],
        },
        {
          label: "함께하기 탭",
          fields: [
            {
              name: "partnerTabs",
              label: "탭",
              type: "array",
              fields: [
                { name: "anchor", label: "id", type: "text", required: true },
                { name: "label", type: "text", required: true },
                {
                  name: "links",
                  type: "array",
                  fields: [
                    { name: "label", type: "text", required: true },
                    { name: "href", type: "text", required: true },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: { afterChange: [() => safeRevalidatePath("/")] },
};
