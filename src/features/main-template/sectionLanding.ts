import type { SectionLandingContent } from "@/types/pageTemplates";

/** /ministry and /fellowship landings with the text of navigators-seoulc.org (main
 * "Navigator Ministries", sub2, sub3). Edited later in the admin (landing-pages). */
export const sectionLandings: Record<"ministry" | "fellowship", SectionLandingContent> = {
  ministry: {
    theme: "light",
    hero: { line1: ["그리스도를 알고,", "그를 알게 하라"], line2: "Navigator Ministries", tiles: 8 },
    body: {
      type: "featured",
      items: [
        { id: "bible-study", title: "성경공부", text: "수준별, 체계적인 네비게이토 성경공부를 통해 예수 그리스도와 복음, 성경에 대해 잘 알게 되고 주님의 제자와 일꾼으로 성장합니다.", href: "/ministry/bible-study", media: { kind: "image", label: "성경공부" } },
        { id: "campus", title: "캠퍼스", text: "중앙대 기독교 동아리로서 학생들이 하나님을 알아가는 즐거움과 승리하는 대학생활을 누리도록 돕습니다.", href: "/ministry/campus", media: { kind: "image", label: "캠퍼스" } },
        { id: "workplace", title: "직장", text: "직장인들이 하나님과 동행하며 인생의 진정한 비전을 설계할 수 있도록 돕고 있습니다.", href: "/ministry/workplace", media: { kind: "image", label: "직장" } },
        { id: "military", title: "군대", text: "나라를 지키는 군인으로, 그리스도의 군사로서 군대 내 많은 영혼을 인도합니다.", href: "/ministry/military", media: { kind: "image", label: "군대" } },
        { id: "missions", title: "해외", text: "영국, 캄보디아, 멕시코, 미국 등 세계 각국으로 선교사를 파송하고 있습니다.", href: "/ministry/missions", media: { kind: "image", label: "해외" } },
        { id: "church-contribution", title: "교계 기여", text: "경건의 시간, 성경공부 교재, 암송카드, 말씀의 손과 기도의 손 — 제자 삼는 사역을 위해 계발한 도구들입니다.", href: "/ministry/church-contribution", media: { kind: "image", label: "교계 기여" } },
      ],
    },
    cta: { title: "사역과 활동을 한눈에 보고 싶다면", description: "네비게이토 서울C지구의 사역과 활동을 모아 보세요.", href: "/ministry/all", ctaLabel: "한눈에 보기" },
  },
  fellowship: {
    theme: "dark",
    hero: { line1: ["말씀으로", "함께 자라는"], line2: "Navigators Fellowship", tiles: 8 },
    body: {
      type: "stack",
      title: "네비게이토 서울C지구의 활동",
      domains: [
        {
          id: "gatherings",
          title: "정기모임",
          description: "주일 오후와 화요일 저녁, 말씀으로 함께 모입니다.",
          points: [
            { title: "주일교제", text: "주일 오후 2:30 — 1부 찬양과 간증, 2부 그룹별 성경공부" },
            { title: "은혜의 샘", text: "매주 화요일 오후 7시, 누구나 올 수 있는 복음서 스터디" },
            { title: "온라인교제", text: "유튜브 라이브와 화상 성경공부로 함께하는 교제" },
          ],
          media: { kind: "image", label: "정기모임" },
        },
        {
          id: "discipleship",
          title: "양육·훈련",
          description: "한 사람이 그리스도 안에서 성숙한 제자가 되도록 돕습니다.",
          points: [
            { title: "개인교제", text: "예수님과 바울처럼, 1대1 양육" },
            { title: "커플스터디", text: "말씀으로 행복한 가정" },
            { title: "Training Program", text: "방학 제자훈련 STP · WTP" },
          ],
          media: { kind: "image", label: "양육·훈련" },
        },
        {
          id: "events",
          title: "행사",
          description: "해마다 기다려지는 은혜의 시간들입니다.",
          points: [
            { title: "여름 캠핑 수양회", text: "바닷가와 산에서 하나님을 만나는 시간" },
            { title: "이브파티", text: "예수님의 탄생을 축하하는 크리스마스 파티" },
            { title: "함께하는 섬김", text: "축제 부스 수익금 장학금 기부" },
          ],
          media: { kind: "image", label: "행사" },
        },
        {
          id: "leisure",
          title: "함께 즐기기",
          description: "하나님 안에서 더 자유하고 즐겁습니다.",
          points: [
            { title: "스포츠", text: "축구, 농구, 탁구, 피트니스, 웨이트" },
            { title: "Enjoy", text: "에버랜드, 술 없는 MT, 피크닉" },
            { title: "대학 교류", text: "다른 대학과의 스포츠 교제" },
          ],
          media: { kind: "image", label: "함께 즐기기" },
        },
      ],
      research: {
        title: "함께하는 곳",
        items: [
          { title: "상도동 비전관", text: "서울시 동작구 상도로 39가길 1 — 주일교제와 성경공부", href: "/about/vision-center" },
          { title: "중앙대 동아리방", text: "중앙대학교 107관(학생회관) 1층", href: "/about/contact" },
        ],
      },
    },
    cta: { title: "모임 일정이 궁금하다면", description: "정기모임과 행사 일정을 확인해 보세요.", href: "/news/schedule", ctaLabel: "모임 일정 보기" },
  },
};
