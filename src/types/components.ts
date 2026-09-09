import type { ReactNode } from "react";

export type ImageSource = { src: string; alt?: string; caption?: string };
export type LinkItem = { label: string; href: string; external?: boolean };
export type CardItem = { id: string; eyebrow?: string; title: string; description?: string; image?: ImageSource; tags?: string[]; href?: string };
export type HeroProps = { eyebrow?: string; title: string; description?: string; image?: ImageSource; cta?: LinkItem };
export type BannerProps = { title: string; description?: string; image?: ImageSource; href?: string; tone?: "light" | "dark" | "green" };
export type TimelineItem = { year: string; title: string; description?: string; image?: ImageSource };
export type MetricItem = { label: string; value: string; unit?: string; description?: string };
export type TabItem<T = ReactNode> = { id: string; label: string; content: T };
export type TableColumn<T> = { key: keyof T; label: string };
