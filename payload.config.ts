import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

import { Users } from "./src/collections/Users";
import { Media } from "./src/collections/Media";
import { Stories } from "./src/collections/Stories";
import { PressReleases } from "./src/collections/PressReleases";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/** Local-dev admin backing this project's /admin route (HANDOFF.md "관리자 페이지").
 * SQLite so no external DB is needed — swap `db` for @payloadcms/db-postgres when
 * this moves toward production (docs/progress.md "3단계 착수" entry). */
export default buildConfig({
  admin: { user: Users.slug },
  collections: [Users, Media, Stories, PressReleases],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-only-insecure-secret",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: sqliteAdapter({ client: { url: process.env.DATABASE_URI || "file:./payload.db" } }),
});
