/** Brand-neutral page template types for the multi-page rebuild (docs/routes.md). */
import type { NewsCardItem } from "@/types/mainTemplate";

/** `section-landing` v2 (docs/PRD-navercorp-ui-parity.md §7.2, §7.4):
 * sticky hero with a two-step title + parallax tiles, then either a featured list
 * (/service/featuredServices) or the domain page-stack (/tech/innovation), then a CTA. */
export type LandingFeaturedItem = { id: string; title: string; text: string; href?: string; media?: { src?: string; label?: string; kind?: "image" | "video" } };
export type LandingStackDomain = {
  id: string;
  title: string;
  description: string;
  points: { title: string; text: string }[];
  media?: { src?: string; label?: string; kind?: "image" | "video" };
};
export type SectionLandingContent = {
  theme: "light" | "dark";
  hero: { line1: [string, string]; line2: string; tiles: number };
  body:
    | { type: "featured"; items: LandingFeaturedItem[] }
    | { type: "stack"; title: string; domains: LandingStackDomain[]; research?: { title: string; items: { title: string; text: string; href?: string }[] } };
  cta: { title: string; description?: string; href: string; ctaLabel?: string };
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

/** Company info pages (docs/PRD-navercorp-ui-parity.md §7.6). */
export type InfoLinkCard = { title: string; text: string; href: string };
export type AffiliatesContent = {
  title: string;
  items: { name: string; tagline: string; description: string; href: string; image?: { src?: string; label?: string } }[];
};
export type ContactContent = {
  title: string;
  groups: { title: string; entries: { name: string; address: string; addressEn?: string; tel?: string }[]; map?: boolean }[];
  support: { title: string; cards: InfoLinkCard[] };
};
export type PartnershipContent = {
  title: string;
  sections: { title: string; description: string; cards: InfoLinkCard[] }[];
  cta?: { label: string; href: string };
};

/** `service-directory` (docs/routes.md): category tabs + A-Z toggle over a link grid. */
/** One directory row (future Payload collection `services`). `href` is the in-site detail
 * page when there is one; `links` are the outbound shortcuts shown as icon buttons. */
export type ServiceDirectoryLink = { kind: "home" | "app"; href: string };
export type ServiceDirectoryItem = { name: string; category: string; href: string; links?: ServiceDirectoryLink[] };
export type ServiceDirectoryContent = {
  title: string;
  categories: string[];
  items: ServiceDirectoryItem[];
};

/** `timeline-list` (docs/routes.md): tab-scoped year/event list. Used by /company/history. */
/** One history entry. `month` ("06월") is optional; events with the same year are grouped
 * under one year heading (reference: year column 403px | month 120px + title). */
export type TimelineEvent = { year: string; month?: string; title: string; description?: string };
export type TimelineTab = { id: string; label: string; events: TimelineEvent[] };
export type TimelineContent = { title: string; tabs: TimelineTab[] };

/** `simple-table-list` (docs/routes.md): plain date/title rows, no filter/pagination.
 * Used by /media/mediaEvents. */
export type SimpleTableRow = { date: string; title: string; href?: string };
export type SimpleTableListContent = { title: string; rows: SimpleTableRow[] };

export type { NewsCardItem };

/** Brand resources / gallery (PRD §7.6, future Payload global `brand-resources`).
 * Page = section groups (h2 32px band) → items laid out as title column (404px: name,
 * text, optional download) | content column (780px) holding one visual block. */
export type ResourceTile = { label: string; caption?: string; tone?: "light" | "dark" | "brand"; wide?: boolean; src?: string };
export type ResourceSwatch = { name: string; hex: string; rgb?: string; cmyk?: string; textTone?: "light" | "dark" };
export type ResourceVisual =
  | { kind: "tiles"; tiles: ResourceTile[]; note?: string }
  | { kind: "swatches"; swatches: ResourceSwatch[] }
  | { kind: "bans"; items: { caption: string; src?: string }[] }
  | { kind: "photos"; photos: { alt: string; src?: string; downloadHref?: string }[] };
export type ResourceItem = {
  id: string;
  title: string;
  subTitle?: string;
  text: string;
  download?: { label: string; href: string };
  visual: ResourceVisual;
};
export type ResourceSection = { id: string; title: string; items: ResourceItem[] };
export type ResourceConsent = { title: string; text: string; cancelLabel: string; confirmLabel: string };
export type ResourcePageContent = { title: string; sections: ResourceSection[]; consent: ResourceConsent };

/** Privacy policy (PRD §7.11, future Payload collection `policies`): versions listed newest
 * first; each version is a document of structured blocks (stand-in for Payload rich text). */
export type PolicyBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; columns: string[]; rows: string[][] };
export type PolicyVersion = { seq: string; title: string; date: string; effectiveDate?: string; blocks: PolicyBlock[] };
export type PolicyContent = { title: string; listTitle: string; note?: string; versions: PolicyVersion[] };

/** /company/about scroll story (PRD §7.5, future Payload global `about-page`).
 * Mirrors the reference sequence: video hero → highlight statement → three chapters
 * (timeline cards / lineup panels / card groups) → extending ending statement → info. */
export type AboutCopy = { lead: string; highlight: string; tail: string };
export type AboutTimelineCard = { year: string; title: string; description: string; image?: string };
export type AboutLineupItem = { year: string; title: string; description: string };
export type AboutLineupPanel = {
  label: string;
  title: string;
  image?: string;
  items: AboutLineupItem[];
  feature?: AboutLineupItem & { image?: string };
};
export type AboutCardGroup = { title: string; description: string; cards: { eyebrow: string; title: string; image?: string }[] };
export type AboutChapter =
  | { id: string; copy: AboutCopy; kind: "timeline"; cards: AboutTimelineCard[] }
  | { id: string; copy: AboutCopy; kind: "lineup"; panels: AboutLineupPanel[] }
  | { id: string; copy: AboutCopy; kind: "groups"; groups: AboutCardGroup[] };
export type AboutStoryContent = {
  hero: { text: string; video?: string; poster?: string };
  intro: { lead: string; statement: string };
  chapters: AboutChapter[];
  ending: { lead: string; before: string; after: string; highlight: string; tail: string };
  info: { image?: string; logoText: string; items: { label: string; value: string }[] };
};
