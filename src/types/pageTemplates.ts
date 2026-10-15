/** Brand-neutral page template types for the multi-page rebuild (docs/routes.md). */
import type { NewsCardItem } from "@/types/mainTemplate";

export type FeatureCard = { no: string; category: string; title: string; text: string; href: string };
export type FeatureTab = { id: string; label: string; cards: FeatureCard[] };

export type SectionLandingContent = {
  heroEyebrow: string;
  heroTitle: string;
  introEyebrow: string;
  introTitle: string;
  introDescription: string;
  tabs: FeatureTab[];
  ctaTitle: string;
  ctaDescription: string;
  ctaHref: string;
};

export type ServiceDetailSection = { title: string; body: string };
export type ServiceDetailContent = {
  eyebrow: string;
  title: string;
  description: string;
  introTitle: string;
  introDescription: string;
  sections: ServiceDetailSection[];
};

export type ArticleContent = {
  seq: string;
  category: string;
  title: string;
  date: string;
  publishedAt: string;
  paragraphs: string[];
  imageCount: number;
};

/** `feature-detail-with-related` (docs/routes.md): hero + variant cards + product
 * links + a related-content carousel. Used by /tech/* detail pages, /media/aiInNaver. */
export type FeatureVariant = { name: string; description: string };
export type FeatureProduct = { title: string; description: string; href: string };
export type FeatureDetailContent = {
  eyebrow: string;
  title: string;
  description: string;
  variants: FeatureVariant[];
  products: FeatureProduct[];
  related: NewsCardItem[];
};

/** `service-directory` (docs/routes.md): category tabs + A-Z toggle over a link grid. */
export type ServiceDirectoryItem = { name: string; category: string; href: string };
export type ServiceDirectoryContent = {
  title: string;
  categories: string[];
  items: ServiceDirectoryItem[];
};

/** `narrative-scrollytelling` (docs/routes.md): scroll-revealed chronology + stats
 * + a company-facts table. Used by /company/about. */
export type NarrativeChapter = { era: string; title: string; description: string };
export type NarrativeStat = { label: string; value: string };
export type NarrativeFact = { label: string; value: string };
export type NarrativeContent = {
  heroTitle: string;
  heroDescription: string;
  chapters: NarrativeChapter[];
  stats: NarrativeStat[];
  facts: NarrativeFact[];
};

/** `timeline-list` (docs/routes.md): tab-scoped year/event list. Used by /company/history. */
export type TimelineEvent = { year: string; title: string; description?: string };
export type TimelineTab = { id: string; label: string; events: TimelineEvent[] };
export type TimelineContent = { title: string; tabs: TimelineTab[] };

/** `simple-info` (docs/routes.md): static content, no list/filter/pagination.
 * Used by /company/contact, /company/brandGuide, /company/affiliates, /company/partnership. */
export type SimpleInfoCard = { title: string; description: string };
export type SimpleInfoSection = { heading: string; body?: string; cards?: SimpleInfoCard[]; links?: { label: string; href: string }[] };
export type SimpleInfoContent = { title: string; intro?: string; sections: SimpleInfoSection[] };

/** `simple-table-list` (docs/routes.md): plain date/title rows, no filter/pagination.
 * Used by /media/mediaEvents. */
export type SimpleTableRow = { date: string; title: string; href?: string };
export type SimpleTableListContent = { title: string; rows: SimpleTableRow[] };

export type { NewsCardItem };
