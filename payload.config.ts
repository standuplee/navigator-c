import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

import { Users } from "./src/collections/Users";
import { Media } from "./src/collections/Media";
import { Stories } from "./src/collections/Stories";
import { PressReleases } from "./src/collections/PressReleases";
import { ServicePages } from "./src/collections/ServicePages";
import { ActivityPages } from "./src/collections/ActivityPages";
import { LandingPages } from "./src/collections/LandingPages";
import { HistoryEntries } from "./src/collections/HistoryEntries";
import { Recommendations } from "./src/collections/Recommendations";
import { ResourcePages } from "./src/collections/ResourcePages";
import { Events } from "./src/collections/Events";
import { Policies } from "./src/collections/Policies";
import { SiteSettings } from "./src/globals/SiteSettings";
import { Navigation } from "./src/globals/Navigation";
import { MainPage } from "./src/globals/MainPage";
import { AboutPage } from "./src/globals/AboutPage";
import { HistoryPage } from "./src/globals/HistoryPage";
import { ContactPage } from "./src/globals/ContactPage";
import { FaqPage } from "./src/globals/FaqPage";
import { DirectoryPage } from "./src/globals/DirectoryPage";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/** Admin for every page's content (content-mapping sheet "어드민 관리 항목").
 * Collections/globals mirror the frontend content types; the repositories in
 * src/lib/data read them and fall back to the placeholder modules while empty.
 * SQLite so no external DB is needed — swap `db` for @payloadcms/db-postgres when
 * this moves toward production (docs/progress.md "3단계 착수" entry). */
export default buildConfig({
  admin: { user: Users.slug },
  collections: [
    LandingPages,
    ServicePages,
    ActivityPages,
    Recommendations,
    HistoryEntries,
    ResourcePages,
    PressReleases,
    Events,
    Stories,
    Policies,
    Media,
    Users,
  ],
  globals: [MainPage, AboutPage, HistoryPage, ContactPage, DirectoryPage, FaqPage, Navigation, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-only-insecure-secret",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || "file:./payload.db" },
    // Dev schema sync runs in `next dev` only. Scripts (npm run seed) set PAYLOAD_DB_PUSH=false:
    // a second push from another process makes drizzle-kit rebuild SQLite tables and fail on
    // indexes that already exist ("index ... already exists").
    push: process.env.PAYLOAD_DB_PUSH !== "false",
  }),
});
