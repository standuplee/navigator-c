import type { AboutStoryContent } from "@/types/pageTemplates";

/** /about scroll story with the text of navigators-seoulc.org sub1 (네비게이토란? · 서울C지구)
 * and sub2 (교계 기여). Edited later in the admin (global about-page). */
export const aboutStory: AboutStoryContent = {
  hero: { text: "‘그리스도를 알고, 그를 알게 하라.’" },
  intro: {
    lead: "네비게이토란?",
    statement: "‘항해자’라는 뜻의\n국제적인 초교파 선교회",
  },
  chapters: [
    {
      id: "beginning",
      copy: { lead: "처음을", highlight: "처음", tail: "시작한 사람들" },
      kind: "timeline",
      cards: [
        { year: "1933", title: "미국에서 시작", description: "도슨 트로트맨의\n해군사역으로 시작" },
        { year: "1966", title: "한국 네비게이토", description: "한국에서 처음으로\n제자 삼는 사역 시작" },
        { year: "1984", title: "서울C지구", description: "중앙대 캠퍼스에서\n시작" },
        { year: "QT", title: "경건의 시간", description: "경건의 시간을 한국에\n처음 소개하고 보급" },
        { year: "70%", title: "성경공부 교재", description: "한국 교회의 70% 이상이\n사용하는 교재" },
        { year: "CDM", title: "교회제자훈련", description: "목회자를 위한\n교회 제자 훈련 세미나" },
        { year: "140+", title: "140여 개국", description: "지금도 세계 곳곳에서\n제자를 세우는 중" },
      ],
    },
    {
      id: "again",
      copy: { lead: "제자를", highlight: "몇 번이고", tail: "다시 세우는 사람들" },
      kind: "lineup",
      panels: [
        {
          label: "WORD",
          title: "말씀을 섭취하는 데서\n말씀대로 사는 데까지",
          items: [
            { year: "말씀의 손", title: "묵상 · 암송 · 공부 · 읽기 · 듣기", description: "말씀을 효과적으로 섭취하는 5가지" },
            { year: "암송카드", title: "도슨 트로트맨의 성경암송", description: "많은 교회에서 사용하는 암송카드" },
            { year: "성경색인", title: "성경책을 빨리 찾도록", description: "주일학교 아이들을 위해 고안" },
            { year: "QT", title: "경건의 시간", description: "하루 첫 시간, 하나님과의 교제" },
          ],
          feature: { year: "교재", title: "네비게이토 성경공부", description: "수준별, 체계적인 성경공부 교재" },
        },
        {
          label: "PRAYER",
          title: "살아계신 하나님을\n기도로 경험하는 삶",
          items: [
            { year: "기도의 손", title: "찬양 · 감사 · 자백 · 중보 · 간구", description: "균형 있는 기도의 방법" },
            { year: "Wheel Life", title: "성령충만한 그리스도인의 삶", description: "도슨 트로트맨의 휠라이프 예화" },
            { year: "V Hand", title: "승리하는 그리스도인의 삶", description: "요일 2:15~16" },
          ],
        },
        {
          label: "DISCIPLESHIP",
          title: "한 사람을 붙들어\n제자로 세우는 사역",
          items: [
            { year: "1:1", title: "개인 양육", description: "예수님과 바울처럼 한 사람을 세웁니다" },
            { year: "소그룹", title: "주일 그룹별 성경공부", description: "각 개인의 믿음을 잘 세워줍니다" },
            { year: "전도", title: "네비게이토 전도지", description: "복음의 핵심을 능력 있게 전합니다" },
          ],
        },
      ],
    },
    {
      id: "finish",
      copy: { lead: "끝까지", highlight: "함께", tail: "걸어가는 사람들" },
      kind: "groups",
      groups: [
        {
          title: "캠퍼스에서",
          description: "중앙대 기독인 연합 소속, 기독교 분과장을 맡고 있습니다",
          cards: [
            { eyebrow: "믿음의 대학생활을 돕는", title: "1:1 양육" },
            { eyebrow: "축제 부스 수익금으로", title: "장학금 기부" },
            { eyebrow: "누구나 와서 성경을 읽는", title: "동아리방" },
            { eyebrow: "좋은 멘토가 되어주는", title: "선배들" },
          ],
        },
        {
          title: "삶의 자리에서",
          description: "캠퍼스 뿐 아니라 직장인과 군인들의 믿음생활도 돕고 있습니다",
          cards: [
            { eyebrow: "하나님과 동행하는", title: "직장생활" },
            { eyebrow: "그리스도의 군사로", title: "군대" },
            { eyebrow: "말씀으로 행복한 가정", title: "커플스터디" },
          ],
        },
        {
          title: "세계로",
          description: "해외 선교사 파송으로 재생산과 배가가 이루어지고 있습니다",
          cards: [
            { eyebrow: "그리스도의 질적인 일꾼", title: "영국" },
            { eyebrow: "그리스도의 질적인 일꾼", title: "캄보디아" },
            { eyebrow: "그리스도의 질적인 일꾼", title: "멕시코" },
            { eyebrow: "그리스도의 질적인 일꾼", title: "미국" },
          ],
        },
      ],
    },
  ],
  ending: {
    lead: "우리는",
    before: "Navigators",
    after: "그리스도를 알고",
    highlight: "그를 알게 하는 사람들",
    tail: "입니다",
  },
  info: {
    logoText: "NAVIGATORS SEOUL C",
    items: [
      { label: "시작", value: "1984년 중앙대 캠퍼스" },
      { label: "소속", value: "중앙대 기독인 연합 기독교 분과" },
      { label: "비전관", value: "서울시 동작구 상도로 39가길 1 (상도1동 458-2)" },
      { label: "동아리방", value: "중앙대학교 107관(학생회관) 1층" },
      { label: "주일교제", value: "매주 주일 오후 2:30" },
      { label: "은혜의 샘", value: "매주 화요일 오후 7시" },
      { label: "문의", value: "인스타그램 @nav_cau" },
    ],
  },
};
