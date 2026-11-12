import type {
  AboutChapter,
  AboutStoryContent,
  AffiliatesContent,
  ContactContent,
  PartnershipContent,
  ResourceItem,
  ResourcePageContent,
  TimelineContent,
  TimelineEvent,
} from "@/types/pageTemplates";
import { aboutStory } from "@/features/main-template/aboutStory";
import { timeline } from "@/features/main-template/timeline";
import { affiliates, contact, partnership } from "@/features/main-template/companyInfo";
import { brandGuide, brandResourcesTabs, gallery } from "@/features/main-template/brandResources";
import { clean, present, readAll, readBySlug, readGlobal } from "@/lib/payload/read";

/** Repository boundary for the /about pages and /faq. Each reads its Payload collection or
 * global and falls back to the placeholder module while nothing has been saved there. */

export async function getAboutStory(): Promise<AboutStoryContent> {
  return readGlobal(
    "about-page",
    (doc) => {
      const data = clean<AboutStoryContent>(doc);
      if (!data.chapters?.length) return null;
      data.chapters = data.chapters.map((chapter) =>
        chapter.kind === "lineup"
          ? { ...chapter, panels: chapter.panels.map((panel) => ({ ...panel, feature: present(panel.feature, "title") })) }
          : chapter,
      ) as AboutChapter[];
      return data;
    },
    aboutStory,
  );
}

type HistoryTab = { id: string; label: string };
type HistoryRow = TimelineEvent & { tab: string; order?: number };

export async function getTimeline(): Promise<TimelineContent> {
  const page = await readGlobal<{ title: string; tabs: HistoryTab[] } | null>("history-page", (doc) => clean(doc), null);
  const rows = await readAll<HistoryRow[] | null>("history-entries", (docs) => clean(docs), null, "-year");
  if (!rows) return timeline;
  const tabs = page?.tabs?.length ? page.tabs : [{ id: "history", label: "연혁" }];
  const byYear = (a: HistoryRow, b: HistoryRow) => b.year.localeCompare(a.year) || (a.order ?? 0) - (b.order ?? 0);
  return {
    title: page?.title ?? timeline.title,
    tabs: tabs.map((tab) => ({
      id: tab.id,
      label: tab.label,
      events: rows
        .filter((row) => row.tab === tab.id)
        .sort(byYear)
        .map(({ year, month, title, description }) => ({ year, month, title, description })),
    })),
  };
}

export async function getAffiliates(): Promise<AffiliatesContent> {
  return readAll(
    "recommendations",
    (docs) => ({ title: affiliates.title, items: clean<AffiliatesContent["items"]>(docs) }),
    affiliates,
  );
}

export async function getContact(): Promise<ContactContent> {
  return readGlobal("contact-page", (doc) => clean<ContactContent>(doc), contact);
}

export async function getPartnership(): Promise<PartnershipContent> {
  return readGlobal(
    "faq-page",
    (doc) => {
      const data = clean<PartnershipContent>(doc);
      return { ...data, cta: present(data.cta, "label") };
    },
    partnership,
  );
}

type ResourceItemDoc = Omit<ResourceItem, "visual"> & { visual: ResourceItem["visual"][] };

function resourcePage(fallback: ResourcePageContent, slug: string) {
  return readBySlug(
    "resource-pages",
    slug,
    (doc) => {
      const data = clean<Omit<ResourcePageContent, "sections"> & { sections: { id: string; title: string; items: ResourceItemDoc[] }[] }>(doc);
      return {
        ...data,
        sections: data.sections.map((section) => ({
          ...section,
          items: section.items.map((item) => ({ ...item, download: present(item.download, "label"), visual: item.visual[0] })),
        })),
      };
    },
    fallback,
  );
}

export async function getBrandGuide() {
  return resourcePage(brandGuide, "tools");
}

export async function getGallery() {
  return resourcePage(gallery, "gallery");
}

export async function getBrandResourcesTabs() {
  return brandResourcesTabs;
}
