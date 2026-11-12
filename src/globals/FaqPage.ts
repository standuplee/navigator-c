import type { GlobalConfig } from "payload";
import { publicRead } from "@/payload/fields";
import { safeRevalidatePath } from "@/lib/payload/safeRevalidate";

/** /faq (PartnershipContent layout: sections of link cards + an optional button). */
export const FaqPage: GlobalConfig = {
  slug: "faq-page",
  label: "자주 묻는 질문",
  admin: { group: "페이지" },
  access: publicRead,
  fields: [
    { name: "title", type: "text", required: true, defaultValue: "자주 묻는 질문" },
    {
      name: "sections",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
        {
          name: "cards",
          type: "array",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "text", type: "textarea" },
            { name: "href", type: "text", required: true, defaultValue: "#" },
          ],
        },
      ],
    },
    {
      name: "cta",
      label: "하단 버튼 (비우면 없음)",
      type: "group",
      fields: [
        { name: "label", type: "text" },
        { name: "href", type: "text" },
      ],
    },
  ],
  hooks: { afterChange: [() => safeRevalidatePath("/faq")] },
};
