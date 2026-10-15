import type { CollectionConfig } from "payload";

/** Admin operators. Role-gates editing vs. read-only (HANDOFF.md: "운영자 로그인, 역할별 권한"). */
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email" },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => (user as { role?: string } | undefined)?.role === "admin",
    update: ({ req: { user } }) => (user as { role?: string } | undefined)?.role === "admin",
    delete: ({ req: { user } }) => (user as { role?: string } | undefined)?.role === "admin",
  },
  fields: [
    { name: "name", type: "text" },
    { name: "role", type: "select", required: true, defaultValue: "editor", options: ["admin", "editor"] },
  ],
};
