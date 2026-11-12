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

/** `service-detail` v2 (docs/PRD-navercorp-ui-parity.md §7.1, §11).
 * Shape doubles as the future Payload blocks schema. */
export type ServiceLink = { label: string; href: string };
export type ServiceMedia = { src?: string; label?: string };
export type ServiceHero =
  | { variant: "icon-grid"; title: string; description: string; icons: string[] }
  | { variant: "fullscreen"; title: string; description: string; media?: ServiceMedia & { kind?: "image" | "video" } };
export type ServiceDetailItem = { title: string; description: string; image?: ServiceMedia };
export type ServiceProduct = {
  id: string;
  title: string;
  description: string;
  links?: ServiceLink[];
  /** Visual slots: one slide in the desktop sticky column / one slider page on mobile per entry. */
  images: ServiceMedia[];
  /** "세부 서비스" list under the description. */
  detailServices?: { title: string; description: string }[];
  /** Card grid (e.g. ad products, data-center features) — used by the stacked layout. */
  items?: ServiceDetailItem[];
};
export type GrowTogether = {
  title: string;
  banner?: { title: string; text: string; href: string; image?: ServiceMedia };
  groups: { title: string; text: string; cards: { title: string; text: string; href: string }[] }[];
};
export type ServiceDetailContent = {
  /** Page name used for the hero title and metadata. */
  title: string;
  hero: ServiceHero;
  /** sticky-visual: desktop left sticky image column + right product sections (most pages).
   *  stacked: full-width sections with card grids (advertisement, cloud, data center, 1784). */
  layout: "sticky-visual" | "stacked";
  products: ServiceProduct[];
  growTogether?: GrowTogether;
  cta?: { title: string; description?: string; href: string; ctaLabel?: string };
  related: { id: string; title: string; href: string; date?: string; category?: string }[];
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

/** `tech-detail` (docs/PRD-navercorp-ui-parity.md §7.3): dark page — title + key copy + video
 * card, anchor-nav sections of image/text rows, contained CTA card, related carousel. */
export type TechItem = { title: string; description: string; image?: ServiceMedia; links?: ServiceLink[] };
export type TechSection = {
  id: string;
  title: string;
  description?: string;
  /** Wide visual(s) under the headline (slider when more than one). */
  wideImages?: ServiceMedia[];
  /** Horizontal card carousel (e.g. a model lineup). */
  cards?: { title: string; description: string }[];
  items: TechItem[];
};
export type TechDetailContent = {
  title: string;
  keycopy: string;
  heroMedia?: ServiceMedia & { kind?: "image" | "video" };
  sections: TechSection[];
  cta?: { title: string; description?: string; href: string; ctaLabel?: string };
  related: { id: string; title: string; href: string; date?: string; category?: string }[];
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
