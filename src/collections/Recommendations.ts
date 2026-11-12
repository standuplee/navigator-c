import type { CollectionConfig } from "payload";
import { media, publicRead } from "@/payload/fields";
import { safeRevalidatePath } from "@/lib/payload/safeRevalidate";

/** /about/recommendations — one large card per entry (AffiliatesContent item). */
export const Recommendations: CollectionConfig = {
  slug: "recommendations",
  labels: { singular: "추천", plural: "목사님 추천" },
  admin: { useAsTitle: "name", defaultColumns: ["name", "tagline", "order"], group: "About", preview: () => "/about/recommendations" },
  access: publicRead,
  defaultSort: "order",
  fields: [
    { name: "name", label: "이름", type: "text", required: true },
    { name: "tagline", label: "소속 / 한 줄", type: "text", required: true },
    { name: "description", label: "추천사", type: "textarea", required: true },
    { name: "href", label: "링크", type: "text", defaultValue: "#" },
    media("image", "사진"),
    { name: "order", label: "순서", type: "number", defaultValue: 0 },
  ],
  hooks: { afterChange: [() => safeRevalidatePath("/about/recommendations")] },
};
