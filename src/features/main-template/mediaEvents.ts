import type { SimpleTableListContent } from "@/types/pageTemplates";

/** /news/schedule rows from the meeting times on navigators-seoulc.org (sub3). The date column
 * holds free text for recurring meetings; dated events are added in the admin (events). */
export const mediaEvents: SimpleTableListContent = {
  title: "모임 일정",
  rows: [
    { date: "매주 주일 오후 2:30", title: "주일교제 — 1부 찬양과 간증, 2부 그룹별 성경공부", href: "/news/schedule/sunday" },
    { date: "매주 화요일 오후 7시", title: "은혜의 샘 — 복음서 스터디 (누구나 참여 가능)", href: "/news/schedule/grace-spring" },
    { date: "여름방학 화·목", title: "STP (Summer Training Program)", href: "/news/schedule/stp" },
    { date: "겨울방학 화·목", title: "WTP (Winter Training Program)", href: "/news/schedule/wtp" },
    { date: "매년 여름", title: "여름 캠핑 수양회", href: "/news/schedule/summer-retreat" },
    { date: "매년 12월", title: "이브파티", href: "/news/schedule/christmas-eve" },
  ],
};
