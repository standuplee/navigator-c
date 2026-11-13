import type { ArticleDetail } from "@/types/content";
import { MediaSlot } from "./MediaSlot";

/** Paragraph/image body for structured articles (press releases, reports, events).
 * 18px body on desktop, 16px on mobile; figures are full column width with captions. */
export function ArticleBody({ article }: { article: Pick<ArticleDetail, "images" | "paragraphs"> }) {
  return (
    <div className="flex flex-col gap-7 text-base leading-[1.85] text-zinc-800 xl:text-lg">
      {article.images.map((image) => (
        <figure key={image.alt}>
          <MediaSlot src={image.src || undefined} alt={image.alt} label={image.alt || "본문 이미지"} ratio="16/9" className="rounded-xl" />
          {image.caption && <figcaption className="mt-3 text-center text-sm text-zinc-500">{image.caption}</figcaption>}
        </figure>
      ))}
      {article.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
