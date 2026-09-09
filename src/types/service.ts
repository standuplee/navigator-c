export type ServiceDetail = {
  eyebrow: string;
  title: string;
  description: string;
  introTitle: string;
  introDescription: string;
  appImage?: string;
  sections: { title: string; body: string; images: string[] }[];
  related: { title: string; date: string; href: string }[];
};
