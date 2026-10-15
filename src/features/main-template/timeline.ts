import type { TimelineContent } from "@/types/pageTemplates";

/** Placeholder chronology for /company/history. No real dates/milestones. */
export const timeline: TimelineContent = {
  title: "연혁",
  tabs: [
    {
      id: "history",
      label: "주요 연혁",
      events: [
        { year: "2026", title: "파운데이션 모델 라인업 공개", description: "독자 언어 모델을 전 서비스에 순차 적용했습니다." },
        { year: "2024", title: "커머스 체크아웃 전면 개편", description: "결제 실패율을 낮춘 새 결제 플로우를 도입했습니다." },
        { year: "2021", title: "클라우드 인프라 투자 확대", description: "데이터센터와 클라우드 플랫폼 투자를 늘렸습니다." },
        { year: "2018", title: "지도 3D 거리뷰 출시", description: "더 입체적인 길찾기 경험을 선보였습니다." },
        { year: "플레이스홀더", title: "회사 설립", description: "작은 팀으로 첫 서비스를 시작했습니다." },
      ],
    },
    {
      id: "awards",
      label: "수상 내역",
      events: [
        { year: "2025", title: "접근성 우수 서비스 선정", description: "플레이스홀더 수상 내역입니다." },
        { year: "2023", title: "올해의 기술 혁신상", description: "플레이스홀더 수상 내역입니다." },
      ],
    },
  ],
};
