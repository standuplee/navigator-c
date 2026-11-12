import type {
  GrowTogether,
  SectionLandingContent,
  ServiceDetailContent,
  ServiceDirectoryContent,
  ServiceDirectoryItem,
  ServiceDirectoryLink,
  ServiceHero,
} from "@/types/pageTemplates";
import { serviceDetails, type ServiceDetailKey } from "@/features/main-template/serviceDetail";
import { sectionLandings } from "@/features/main-template/sectionLanding";
import { serviceDirectory, serviceDirectoryTabs } from "@/features/main-template/serviceDirectory";
import { SERVICE_PAGE_PATHS } from "@/collections/ServicePages";
import { clean, payloadClient, present, readBySlug } from "@/lib/payload/read";

/** Repository boundary for /ministry, the service-detail pages (ministries, vision center,
 * channels) and the "한눈에 보기" directory. Payload first, placeholder module as fallback. */

export async function getServiceDetail(key: ServiceDetailKey): Promise<ServiceDetailContent> {
  return readBySlug(
    "service-pages",
    key,
    (doc) => {
      const data = clean<Omit<ServiceDetailContent, "hero"> & { hero: ServiceHero[] }>(doc, "variant");
      const grow = present(data.growTogether, "title") as GrowTogether | undefined;
      return {
        ...data,
        hero: data.hero[0],
        growTogether: grow ? { ...grow, banner: present(grow.banner, "title"), groups: grow.groups ?? [] } : undefined,
        cta: present(data.cta, "title"),
        related: data.related ?? [],
      };
    },
    serviceDetails[key],
  );
}

type LandingDoc = Omit<SectionLandingContent, "body"> & { body: SectionLandingContent["body"][] };

export async function getSectionLanding(key: keyof typeof sectionLandings): Promise<SectionLandingContent> {
  return readBySlug(
    "landing-pages",
    key,
    (doc) => {
      const data = clean<LandingDoc>(doc, "type");
      const body = data.body[0];
      return {
        ...data,
        hero: { ...data.hero, line1: [data.hero.line1[0] ?? "", data.hero.line1[1] ?? ""] },
        body: body.type === "stack" ? { ...body, research: present(body.research, "title") } : body,
        cta: present(data.cta, "title") ?? sectionLandings[key].cta,
      };
    },
    sectionLandings[key],
  );
}

type DirectoryDoc = { title?: string; slug?: string; directory?: { category?: string | null; links?: ServiceDirectoryLink[] | null } | null };

/** Directory rows come from every service / activity page with a "한눈에 보기" category,
 * plus the extra rows of the directory-page global. */
export async function getServiceDirectory(): Promise<ServiceDirectoryContent> {
  try {
    const payload = await payloadClient();
    const [services, activities, page] = await Promise.all([
      payload.find({ collection: "service-pages", limit: 200, depth: 0 }),
      payload.find({ collection: "activity-pages", limit: 200, depth: 0 }),
      payload.findGlobal({ slug: "directory-page", depth: 0 }),
    ]);
    const fromPages = (docs: unknown[], href: (slug: string) => string): ServiceDirectoryItem[] =>
      (docs as DirectoryDoc[])
        .filter((doc) => doc.directory?.category && doc.slug)
        .map((doc) => ({
          name: doc.title ?? "",
          category: doc.directory!.category!,
          href: href(doc.slug!),
          links: clean<ServiceDirectoryLink[]>(doc.directory!.links ?? []),
        }));
    const global = clean<{ title?: string; categories?: string[]; extraItems?: ServiceDirectoryItem[] }>(page);
    const items = [
      ...fromPages(services.docs, (slug) => SERVICE_PAGE_PATHS[slug] ?? "#"),
      ...fromPages(activities.docs, (slug) => `/fellowship/${slug}`),
      ...(global.extraItems ?? []),
    ];
    if (!items.length) return serviceDirectory;
    const categories = global.categories?.length ? global.categories : [...new Set(items.map((item) => item.category))];
    return { title: global.title ?? serviceDirectory.title, categories, items };
  } catch {
    return serviceDirectory;
  }
}

export async function getServiceDirectoryTabs() {
  return serviceDirectoryTabs;
}
