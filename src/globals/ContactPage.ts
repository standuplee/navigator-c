import type { Field, GlobalConfig } from "payload";
import { publicRead } from "@/payload/fields";
import { safeRevalidatePath } from "@/lib/payload/safeRevalidate";

const cards: Field = {
  name: "cards",
  type: "array",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "text", type: "textarea" },
    { name: "href", type: "text", required: true },
  ],
};

/** /about/contact (ContactContent). */
export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "Contact",
  admin: { group: "About" },
  access: publicRead,
  fields: [
    { name: "title", type: "text", required: true, defaultValue: "Contact" },
    {
      name: "groups",
      label: "장소 묶음",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "map", label: "아래에 지도 자리 표시", type: "checkbox" },
        {
          name: "entries",
          type: "array",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "address", type: "text", required: true },
            { name: "addressEn", label: "영문 주소", type: "text" },
            { name: "tel", label: "전화", type: "text" },
          ],
        },
      ],
    },
    {
      name: "support",
      label: "문의 카드",
      type: "group",
      fields: [{ name: "title", type: "text", required: true, defaultValue: "문의" }, cards],
    },
  ],
  hooks: { afterChange: [() => safeRevalidatePath("/about/contact")] },
};
