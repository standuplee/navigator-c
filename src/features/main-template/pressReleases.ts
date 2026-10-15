import type { NewsCardItem } from "@/types/mainTemplate";
import type { ArticleDetail } from "@/types/content";

/** Placeholder press-release content for the `content-list-filter-pagination` /
 * `article-detail` templates. Dummy copy only — no real press release text. */
export const pressReleaseList: NewsCardItem[] = [
  { id: "pr1", category: "보도자료", date: "2026.09.07", title: "검색 결과 요약 카드, 모바일 전면 적용", tags: ["검색", "업데이트"], href: "/media/pressReleasesDetail?seq=pr1", tone: "light" },
  { id: "pr2", category: "보도자료", date: "2026.09.05", title: "온디바이스 추천 모델 경량화 연구 공개", tags: ["AI", "연구"], href: "/media/pressReleasesDetail?seq=pr2", tone: "light" },
  { id: "pr3", category: "보도자료", date: "2026.09.03", title: "중소 파트너사 대상 광고 비용 지원 프로그램 확대", tags: ["광고", "상생"], href: "/media/pressReleasesDetail?seq=pr3", tone: "light" },
  { id: "pr4", category: "보도자료", date: "2026.09.01", title: "지도 서비스에 실내 길찾기 기능 추가", tags: ["지도"], href: "/media/pressReleasesDetail?seq=pr4", tone: "light" },
  { id: "pr5", category: "보도자료", date: "2026.08.29", title: "개발자 커뮤니티 밋업 다섯 번째 개최", tags: ["커뮤니티"], href: "/media/pressReleasesDetail?seq=pr5", tone: "light" },
  { id: "pr6", category: "보도자료", date: "2026.08.27", title: "결제 실패율을 낮춘 커머스 체크아웃 리뉴얼", tags: ["커머스"], href: "/media/pressReleasesDetail?seq=pr6", tone: "light" },
  { id: "pr7", category: "보도자료", date: "2026.08.24", title: "제휴 파트너 120곳과 함께하는 상생 프로그램 발표", tags: ["상생"], href: "/media/pressReleasesDetail?seq=pr7", tone: "light" },
  { id: "pr8", category: "보도자료", date: "2026.07.07", title: "연내 전 서비스에 접근성 가이드라인 전면 적용", tags: ["접근성"], href: "/media/pressReleasesDetail?seq=pr8", tone: "light" },
  { id: "pr9", category: "보도자료", date: "2026.06.18", title: "대규모 트래픽 대응을 위한 캐시 아키텍처 개편", tags: ["인프라"], href: "/media/pressReleasesDetail?seq=pr9", tone: "light" },
];

const detailBySeq: Record<string, ArticleDetail> = Object.fromEntries(
  pressReleaseList.map((item) => [
    item.id,
    {
      category: item.category,
      title: item.title,
      date: item.date,
      publishedAt: item.date,
      images: [{ src: "", alt: `${item.title} 대표 이미지`, caption: "" }],
      paragraphs: [
        `${item.title}. 이 보도자료는 데모용 placeholder 본문입니다.`,
        "실제 배포 시 이 자리에 진짜 보도자료 본문이 들어갑니다. 지금은 레이아웃과 인터랙션을 보여주기 위한 더미 텍스트입니다.",
      ],
    } satisfies ArticleDetail,
  ])
);

export function getPressRelease(seq?: string): ArticleDetail {
  return (seq && detailBySeq[seq]) || detailBySeq[pressReleaseList[0].id];
}
