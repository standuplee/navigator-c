import type { AboutStoryContent } from "@/types/pageTemplates";

/** Placeholder story for /company/about. Every text, year and figure here is a stand-in;
 * the real copy is entered in the admin (global `about-page`). */
export const aboutStory: AboutStoryContent = {
  hero: { text: "말씀이라는 나침반을 따라 함께 걸어가는 사람들" },
  intro: {
    lead: "우리의 시작은 Navigators 였습니다",
    statement: "우리는 캠퍼스를 넘어\n변화하는 시대를 함께 항해합니다",
  },
  chapters: [
    {
      id: "beginning",
      copy: { lead: "처음을", highlight: "처음", tail: "시작하는 사람들" },
      kind: "timeline",
      cards: [
        { year: "0000", title: "첫 모임", description: "몇 명의 학생이 모여\n첫 성경공부를 시작" },
        { year: "0000", title: "캠퍼스 모임", description: "정기 캠퍼스 모임\n시작" },
        { year: "0000", title: "수련회", description: "첫 여름 수련회\n개최" },
        { year: "0000", title: "제자훈련", description: "1:1 양육 과정\n정착" },
        { year: "0000", title: "지구 확장", description: "인근 캠퍼스로\n모임 확장" },
        { year: "0000", title: "온라인 모임", description: "온라인으로 함께하는\n모임 시작" },
        { year: "0000", title: "현재", description: "지금도 새로운 처음을\n이어가는 중" },
      ],
    },
    {
      id: "again",
      copy: { lead: "다시를", highlight: "몇 번이고", tail: "다시 하는 사람들" },
      kind: "lineup",
      panels: [
        {
          label: "WORD",
          title: "말씀을 읽는 데서\n말씀대로 사는 데까지",
          items: [
            { year: "0000", title: "성경 읽기", description: "매일 말씀을 읽는 습관" },
            { year: "0000", title: "성경공부", description: "소그룹으로 함께 나누는 말씀" },
            { year: "0000", title: "암송", description: "마음에 새기는 말씀" },
            { year: "0000", title: "묵상 나눔", description: "일상에 적용하는 말씀" },
          ],
          feature: { year: "0000", title: "말씀 세미나", description: "함께 배우고 깊이 나누는 시간" },
        },
        {
          label: "COMMUNITY",
          title: "혼자가 아닌 함께\n서로를 세우는 공동체",
          items: [
            { year: "0000", title: "소그룹", description: "삶을 나누는 작은 모임" },
            { year: "0000", title: "1:1 양육", description: "한 사람에게 집중하는 동행" },
            { year: "0000", title: "수련회", description: "함께 쉬고 함께 배우는 시간" },
            { year: "0000", title: "섬김", description: "서로를 돕는 손길" },
          ],
        },
        {
          label: "MISSION",
          title: "캠퍼스에서\n세상으로",
          items: [
            { year: "0000", title: "캠퍼스 전도", description: "캠퍼스에서 시작하는 복음" },
            { year: "0000", title: "단기 선교", description: "가까운 곳과 먼 곳으로" },
            { year: "0000", title: "졸업생 사역", description: "일터로 이어지는 제자의 삶" },
          ],
        },
      ],
    },
    {
      id: "finish",
      copy: { lead: "끝까지", highlight: "함께", tail: "해내는 사람들" },
      kind: "groups",
      groups: [
        {
          title: "말씀으로 연결",
          description: "모든 모임의 중심에는 말씀이 있습니다",
          cards: [
            { eyebrow: "매주 함께하는", title: "캠퍼스 모임" },
            { eyebrow: "삶을 나누는", title: "소그룹" },
            { eyebrow: "한 사람에게 집중하는", title: "1:1 양육" },
            { eyebrow: "깊이 배우는", title: "말씀 세미나" },
          ],
        },
        {
          title: "세대를 넘어",
          description: "선배와 후배가 함께 걸어갑니다",
          cards: [
            { eyebrow: "새내기를 위한", title: "신입생 모임" },
            { eyebrow: "일터로 이어지는", title: "졸업생 모임" },
            { eyebrow: "함께 쉬는", title: "수련회" },
          ],
        },
        {
          title: "다음 세대를 위해",
          description: "오늘의 제자가 내일의 제자를 세웁니다",
          cards: [
            { eyebrow: "섬김으로 배우는", title: "리더 훈련" },
            { eyebrow: "세상으로 나아가는", title: "단기 선교" },
            { eyebrow: "기록으로 남기는", title: "간증" },
          ],
        },
      ],
    },
  ],
  ending: {
    lead: "우리는",
    before: "Navigators",
    after: "말씀이라는 나침반을 따라",
    highlight: "변함없이 함께 걸어가는 사람들",
    tail: "입니다",
  },
  info: {
    logoText: "NAVIGATORS",
    items: [
      { label: "시작", value: "플레이스홀더" },
      { label: "모임 장소", value: "플레이스홀더 주소" },
      { label: "정기 모임", value: "플레이스홀더 요일 · 시간" },
      { label: "주요 활동", value: "캠퍼스 모임, 소그룹, 1:1 양육, 수련회" },
      { label: "함께하는 캠퍼스", value: "플레이스홀더" },
      { label: "문의", value: "플레이스홀더" },
    ],
  },
};
