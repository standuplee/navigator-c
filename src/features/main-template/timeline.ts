import type { TimelineContent } from "@/types/pageTemplates";

/** /about/history with the dates from navigators-seoulc.org (sub1 네비게이토란? · 서울C지구).
 * More entries are added in the admin (history-entries). */
export const timeline: TimelineContent = {
  title: "연혁",
  tabs: [
    {
      id: "navigators",
      label: "네비게이토",
      events: [
        { year: "현재", title: "140여 개국에서 활동", description: "전국 많은 캠퍼스와 직장, 군대 등에서 사역을 해 나가고 있습니다." },
        { year: "1966", title: "한국 네비게이토 시작", description: "한국에서 처음으로 제자 삼는 사역을 시작했습니다." },
        { year: "1933", title: "미국에서 시작", description: "도슨 트로트맨의 해군사역으로 ‘항해자’라는 뜻의 국제적인 초교파 선교회가 시작되었습니다." },
      ],
    },
    {
      id: "seoul-c",
      label: "서울C지구",
      events: [
        { year: "현재", title: "중앙대 기독인 연합 기독교 분과장", description: "학교 축제 부스 운영 수익금을 장학금으로 기부하고, 해외 선교사를 파송하고 있습니다." },
        { year: "1984", title: "중앙대 캠퍼스에서 시작", description: "네비게이토 서울 C지구가 중앙대 캠퍼스에서 시작되었습니다." },
      ],
    },
  ],
};
