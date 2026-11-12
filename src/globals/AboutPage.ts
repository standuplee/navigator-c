import type { Field, GlobalConfig } from "payload";
import { publicRead } from "@/payload/fields";
import { safeRevalidatePath } from "@/lib/payload/safeRevalidate";

const copy: Field = {
  name: "copy",
  label: "챕터 제목 (앞말 · 강조어 · 뒷말)",
  type: "group",
  fields: [
    { name: "lead", type: "text", required: true },
    { name: "highlight", type: "text", required: true },
    { name: "tail", type: "text", required: true },
  ],
};
const year = (): Field[] => [
  { name: "year", type: "text", required: true },
  { name: "title", type: "text", required: true },
  { name: "description", type: "textarea" },
];

/** /about scroll story (AboutStoryContent). */
export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "About 스토리",
  admin: { group: "About" },
  access: publicRead,
  fields: [
    {
      name: "hero",
      label: "첫 화면",
      type: "group",
      fields: [
        { name: "text", type: "text", required: true },
        { name: "video", label: "영상", type: "upload", relationTo: "media" },
        { name: "poster", label: "영상 대표 이미지", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "intro",
      label: "강조 문구",
      type: "group",
      fields: [
        { name: "lead", type: "text", required: true },
        { name: "statement", type: "textarea", required: true, admin: { description: "줄바꿈이 그대로 표시됩니다" } },
      ],
    },
    {
      name: "chapters",
      label: "챕터",
      type: "blocks",
      blocks: [
        {
          slug: "timeline",
          labels: { singular: "연도 카드", plural: "연도 카드" },
          fields: [
            { name: "anchor", type: "text", required: true },
            copy,
            { name: "cards", type: "array", fields: [...year(), { name: "image", type: "upload", relationTo: "media" }] },
          ],
        },
        {
          slug: "lineup",
          labels: { singular: "라인업", plural: "라인업" },
          fields: [
            { name: "anchor", type: "text", required: true },
            copy,
            {
              name: "panels",
              type: "array",
              fields: [
                { name: "label", type: "text", required: true },
                { name: "title", type: "textarea", required: true },
                { name: "image", type: "upload", relationTo: "media" },
                { name: "items", type: "array", fields: year() },
                {
                  name: "feature",
                  label: "강조 항목 (비우면 없음)",
                  type: "group",
                  fields: [
                    { name: "year", type: "text" },
                    { name: "title", type: "text" },
                    { name: "description", type: "textarea" },
                    { name: "image", type: "upload", relationTo: "media" },
                  ],
                },
              ],
            },
          ],
        },
        {
          slug: "groups",
          labels: { singular: "카드 묶음", plural: "카드 묶음" },
          fields: [
            { name: "anchor", type: "text", required: true },
            copy,
            {
              name: "groups",
              type: "array",
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea" },
                {
                  name: "cards",
                  type: "array",
                  fields: [
                    { name: "eyebrow", type: "text", required: true },
                    { name: "title", type: "text", required: true },
                    { name: "image", type: "upload", relationTo: "media" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "ending",
      label: "마무리 문구",
      type: "group",
      fields: [
        { name: "lead", type: "text", required: true },
        { name: "before", label: "바뀌기 전 단어", type: "text", required: true },
        { name: "after", label: "바뀐 뒤 문장", type: "text", required: true },
        { name: "highlight", label: "강조 문장", type: "text", required: true },
        { name: "tail", type: "text", required: true },
      ],
    },
    {
      name: "info",
      label: "개요",
      type: "group",
      fields: [
        { name: "image", type: "upload", relationTo: "media" },
        { name: "logoText", type: "text", required: true },
        {
          name: "items",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "value", type: "text", required: true },
          ],
        },
      ],
    },
  ],
  hooks: { afterChange: [() => safeRevalidatePath("/about")] },
};
