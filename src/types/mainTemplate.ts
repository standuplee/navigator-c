/** Brand-neutral main page template types (docs/HANDOFF.md rebuild, docs/content-model.md). */

export type NavMenuItem = {
  label: string;
  href: string;
  children: { label: string; href: string }[];
};

export type NewsCardItem = {
  id: string;
  category: string;
  date: string;
  title: string;
  tags?: string[];
  href: string;
  tone: "light" | "dark";
};

export type ShortcutCard = {
  id: string;
  label: string;
  title: string;
  href: string;
  tone: "light" | "dark";
};

export type PromotionSlide = {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  backgroundColor: string;
  tone: "light" | "dark";
};

export type SummaryPanel = {
  id: string;
  label: string;
  title: string;
  description: string;
  href: string;
};

export type PartnerLink = { label: string; href: string };
export type PartnerTabGroup = { id: string; label: string; links: PartnerLink[] };

export type FooterLinkGroup = { title: string; links: { label: string; href: string }[] };
