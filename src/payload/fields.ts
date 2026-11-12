import type { Field, SelectField } from "payload";

/** Field builders shared by the content collections / globals.
 *
 * Field names mirror the frontend content types in src/types/*.ts so a fetched document
 * maps onto them with one generic pass (src/lib/payload/read.ts):
 * - uploads use the type's own property name (`src`, `image`, `poster` …) and become URLs
 * - an `anchor` text field becomes the type's `id` (Payload owns the row `id`)
 * - single-choice unions are `blocks` fields; the block slug is the union value */

export const anchor = (description = "페이지 내 이동/링크에 쓰는 영문 id (예: bible-study)"): Field => ({
  name: "anchor",
  type: "text",
  required: true,
  admin: { description },
});

export const slugField = (description: string): Field => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: { position: "sidebar", description },
});

/** `{ src?: string; label?: string; kind?: "image" | "video" }` */
export const media = (name: string, label: string, { kind = false } = {}): Field => ({
  name,
  label,
  type: "group",
  fields: [
    { name: "src", label: "파일", type: "upload", relationTo: "media" },
    { name: "label", label: "대체 텍스트 / 자리 표시 문구", type: "text" },
    ...(kind
      ? [{ name: "kind", label: "종류", type: "select", defaultValue: "image", options: [{ label: "이미지", value: "image" }, { label: "영상", value: "video" }] } as Field]
      : []),
  ],
});

export const mediaList = (name: string, label: string): Field => ({
  name,
  label,
  type: "array",
  fields: [
    { name: "src", label: "파일", type: "upload", relationTo: "media" },
    { name: "label", label: "대체 텍스트", type: "text" },
  ],
});

export const upload = (name: string, label: string): Field => ({ name, label, type: "upload", relationTo: "media" });

export const links = (name = "links", label = "링크"): Field => ({
  name,
  label,
  type: "array",
  fields: [
    { name: "label", type: "text", required: true },
    { name: "href", type: "text", required: true },
  ],
});

/** Optional "더 궁금하다면" banner — left empty means no banner. */
export const cta = (): Field => ({
  name: "cta",
  label: "하단 CTA 배너 (비우면 표시 안 함)",
  type: "group",
  fields: [
    { name: "title", type: "text" },
    { name: "description", type: "textarea" },
    { name: "href", type: "text" },
    { name: "ctaLabel", label: "버튼 문구", type: "text" },
  ],
});

/** "연관 콘텐츠" cards. */
export const related = (): Field => ({
  name: "related",
  label: "연관 콘텐츠",
  type: "array",
  fields: [
    { name: "anchor", label: "id", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "href", type: "text", required: true },
    { name: "date", type: "text", admin: { description: "예: 2026.09.07" } },
    { name: "category", type: "text" },
  ],
});

/** Listing in the "한눈에 보기" directory (/ministry/all). */
export const directory = (): Field => ({
  name: "directory",
  label: "한눈에 보기 목록",
  type: "group",
  admin: { position: "sidebar" },
  fields: [
    { name: "category", label: "분류 (비우면 목록에서 제외)", type: "text" },
    {
      name: "links",
      label: "바로가기 아이콘",
      type: "array",
      fields: [
        { name: "kind", type: "select", required: true, defaultValue: "home", options: [{ label: "홈페이지", value: "home" }, { label: "앱", value: "app" }] },
        { name: "href", type: "text", required: true },
      ],
    },
  ],
});

export const tone = (
  name = "tone",
  label = "글자색 톤",
  { defaultValue = "light", extra = [] as { label: string; value: string }[] } = {},
): SelectField => ({
  name,
  label,
  type: "select",
  defaultValue,
  options: [
    { label: "밝은 배경 (검정 글자)", value: "light" },
    { label: "어두운 배경 (흰 글자)", value: "dark" },
    ...extra,
  ],
});

export const publicRead = { read: () => true };
