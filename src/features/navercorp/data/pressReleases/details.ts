import type { ArticleDetail } from "@/types/content";
import { pressRelease10034634 } from "./pressRelease10034634";
import { pressReleaseBySeq } from "./index";

/**
 * The source site uses one detail template for every press release. Keeping
 * the resolver here lets every card in the archive open the same reusable
 * detail component while richer article copy is added incrementally.
 */
export function getPressReleaseDetail(seq?: string): ArticleDetail {
  if (seq === "10034634") return pressRelease10034634;

  const release = (seq ? pressReleaseBySeq[seq] : undefined) || pressReleasesFallback;
  return {
    category: release.category ?? "보도자료",
    title: release.title,
    date: release.date,
    publishedAt: release.date.replaceAll(".", "-"),
    images: release.image
      ? [{ src: release.image, alt: release.title, caption: "" }]
      : [],
    paragraphs: [
      `${release.title}에 대한 네이버 보도자료입니다.`,
      "네이버는 다양한 서비스와 기술을 통해 사용자와 파트너의 일상을 더 나은 방향으로 연결하고 있습니다.",
      "자세한 내용은 본문과 관련 안내를 통해 확인하실 수 있습니다.",
    ],
  };
}

const pressReleasesFallback = {
  seq: "10034640",
  date: "2026.09.07",
  title: "네이버웹툰, 연재작가 넘어 완결 작가까지…'웹툰위드'로 지원",
  category: "보도자료",
  image: "/sites/navercorp-65983208/main-c98712e4/cbb766db37-________________.jpg",
};
