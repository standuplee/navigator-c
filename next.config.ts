import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

/** Old template paths (navercorp structure) → church routes (content-mapping sheet
 * "변경할 라우트"). Permanent, so links and bookmarks to the old paths keep working. */
const moved: [string, string][] = [
  ["/main", "/"],
  ["/company/about", "/about"],
  ["/company/affiliates", "/about/recommendations"],
  ["/company/history", "/about/history"],
  ["/company/brandGuide", "/about/tools"],
  ["/company/gallery", "/about/gallery"],
  ["/company/contact", "/about/contact"],
  ["/company/partnership", "/faq"],
  ["/service/datacenterGak", "/about/vision-center"],
  ["/service/featuredServices", "/ministry"],
  ["/service/search", "/ministry/bible-study"],
  ["/service/community", "/ministry/campus"],
  ["/service/tools", "/ministry/workplace"],
  ["/service/cloud", "/ministry/military"],
  ["/service/map", "/ministry/missions"],
  ["/service/advertisement", "/ministry/church-contribution"],
  ["/service/all", "/ministry/all"],
  ["/service/allString", "/ministry/all/abc"],
  ["/service/contents", "/media/channels"],
  ["/tech/innovation", "/fellowship"],
  ["/tech/hyperclovax", "/fellowship/gatherings"],
  ["/tech/robotics", "/fellowship/discipleship"],
  ["/tech/immersiveMedia", "/fellowship/events"],
  ["/tech/spatialAI", "/fellowship/leisure"],
  ["/media/pressReleases", "/news"],
  ["/media/mediaEvents", "/news/schedule"],
  ["/story", "/testimony"],
  ["/policy/privacy", "/privacy"],
];

/** Query-string detail pages → path segments. */
const details: [string, string][] = [
  ["/media/pressReleasesDetail", "/news"],
  ["/story/storyDetail", "/testimony"],
  ["/media/mediaEventsDetail", "/news/schedule"],
  ["/policy/privacyDetail", "/privacy"],
];

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      ...details.map(([source, base]) => ({
        source,
        has: [{ type: "query" as const, key: "seq", value: "(?<seq>.+)" }],
        destination: `${base}/:seq`,
        permanent: true,
      })),
      ...details.map(([source, base]) => ({ source, destination: base, permanent: true })),
      ...moved.map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
};

export default withPayload(nextConfig);
