export type ArticleImage = { src: string; alt: string; caption: string };
export type ArticleDetail = {
  category: string;
  title: string;
  date: string;
  publishedAt: string;
  images: ArticleImage[];
  paragraphs: string[];
};
