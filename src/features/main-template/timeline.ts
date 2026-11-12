import type { TimelineContent } from "@/types/pageTemplates";

/** Placeholder history content (/company/history). Real entries are entered in the admin. */
export const timeline: TimelineContent = {
  title: "연혁",
  tabs: [
    {
      id: "history",
      label: "주요 연혁",
      events: [
        { year: "2026", month: "06월", title: "파운데이션 모델 라인업 공개" },
        { year: "2026", month: "03월", title: "플레이스홀더 서비스 출시" },
        { year: "2024", month: "11월", title: "글로벌 거점 확장" },
        { year: "2024", month: "04월", title: "신규 사옥 입주" },
        { year: "2021", month: "09월", title: "클라우드 리전 개설" },
        { year: "2018", month: "05월", title: "기술 연구 조직 출범" },
        { year: "2018", month: "01월", title: "플레이스홀더 파트너십 체결" },
        { year: "1999", month: "06월", title: "회사 설립" },
      ],
    },
    {
      id: "awards",
      label: "수상 내역",
      events: [
        { year: "2025", month: "12월", title: "플레이스홀더 디자인 어워드 수상" },
        { year: "2025", month: "07월", title: "플레이스홀더 기술상 수상" },
        { year: "2023", month: "10월", title: "플레이스홀더 서비스 대상" },
      ],
    },
  ],
};
