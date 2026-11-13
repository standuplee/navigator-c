import type { GlobalConfig } from "payload";
import { publicRead } from "@/payload/fields";
import { safeRevalidatePath } from "@/lib/payload/safeRevalidate";

/** Site-wide name and footer line (header logo text, footer © line, page titles). */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "사이트 기본 정보",
  admin: { group: "설정" },
  access: publicRead,
  fields: [
    { name: "brandName", label: "단체명 (헤더·푸터)", type: "text", required: true, defaultValue: "navigators-c" },
    { name: "copyright", label: "푸터 저작권 문구", type: "text" },
  ],
  hooks: { afterChange: [() => safeRevalidatePath("/", "layout")] },
};
