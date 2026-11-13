/** Main page and site chrome content with the text of navigators-seoulc.org (main, sub1–sub4).
 * Fallback for the admin globals main-page / navigation / site-settings; components only depend
 * on the types in src/types/mainTemplate.ts. */
import type {
  FooterLinkGroup,
  NavMenuItem,
  NewsCardItem,
  PartnerTabGroup,
  PromotionSlide,
  ShortcutCard,
  SummaryPanel,
} from "@/types/mainTemplate";

export const brandName = "navigators-c";

/** Menu groups from the content mapping (route sheet "새 메뉴 그룹"). Labels are the page
 * names from navigators-seoulc.org; edit them in the admin (global `navigation`). */
export const navMenuItems: NavMenuItem[] = [
  { label: "About", href: "/about", children: [
    { label: "네비게이토란?", href: "/about" },
    { label: "목사님 추천", href: "/about/recommendations" },
    { label: "연혁", href: "/about/history" },
    { label: "비전관", href: "/about/vision-center" },
    { label: "네비게이토 도구", href: "/about/tools" },
    { label: "갤러리", href: "/about/gallery" },
    { label: "Contact", href: "/about/contact" },
  ] },
  { label: "우리의 사역", href: "/ministry", children: [
    { label: "사역 소개", href: "/ministry" },
    { label: "성경공부", href: "/ministry/bible-study" },
    { label: "캠퍼스", href: "/ministry/campus" },
    { label: "직장", href: "/ministry/workplace" },
    { label: "군대", href: "/ministry/military" },
    { label: "해외", href: "/ministry/missions" },
    { label: "교계 기여", href: "/ministry/church-contribution" },
    { label: "한눈에 보기", href: "/ministry/all" },
  ] },
  { label: "우리의 활동", href: "/fellowship", children: [
    { label: "활동 소개", href: "/fellowship" },
    { label: "정기모임", href: "/fellowship/gatherings" },
    { label: "양육·훈련", href: "/fellowship/discipleship" },
    { label: "행사", href: "/fellowship/events" },
    { label: "함께 즐기기", href: "/fellowship/leisure" },
  ] },
  { label: "소식·미디어", href: "/news", children: [
    { label: "소식", href: "/news" },
    { label: "모임 일정", href: "/news/schedule" },
    { label: "간증", href: "/testimony" },
    { label: "채널", href: "/media/channels" },
  ] },
  { label: "QnA", href: "/faq", children: [
    { label: "자주 묻는 질문", href: "/faq" },
  ] },
];

export const headlineSlides: NewsCardItem[] = [
  { id: "h1", category: "네비게이토란?", date: "Since 1933", title: "‘그리스도를 알고, 그를 알게 하라.’ — ‘항해자’라는 뜻의 국제적인 초교파 선교회", href: "/about", tone: "dark" },
  { id: "h2", category: "Navigator Ministries", date: "캠퍼스 · 직장 · 군대 · 해외", title: "네비게이토는 전국의 캠퍼스와 직장, 군대 그리고 해외에서 제자와 일꾼을 키우고 있습니다", href: "/ministry", tone: "dark" },
  { id: "h3", category: "서울C지구", date: "Since 1984", title: "1984년 중앙대 캠퍼스에서 시작된 네비게이토 서울C지구", href: "/about/history", tone: "dark" },
  { id: "h4", category: "주일교제", date: "매주 주일 오후 2:30", title: "찬양과 은혜로운 간증, 그룹별 성경공부 — 상도동 비전관에서 만나요", href: "/fellowship/gatherings", tone: "dark" },
];

export const shortcutCards: ShortcutCard[] = [
  { id: "s1", label: "정기모임", title: "주일교제 · 매주 주일 오후 2:30", href: "/fellowship/gatherings#sunday", tone: "light" },
  { id: "s2", label: "열린 모임", title: "은혜의 샘 · 매주 화요일 오후 7시", href: "/fellowship/gatherings#grace-spring", tone: "light" },
  { id: "s3", label: "QnA", title: "안 믿는데 성경공부는 할 수 있나요?", href: "/faq", tone: "light" },
];

/** 15 cards like the reference: mobile shows the first 5, tablet/desktop all. */
export const newsCards: NewsCardItem[] = [
  { id: "n1", category: "정기모임", date: "매주 주일", title: "주일교제 — 1부 찬양과 간증, 2부 그룹별 성경공부", tags: ["주일교제", "성경공부"], href: "/fellowship/gatherings#sunday", tone: "light" },
  { id: "n2", category: "QnA", date: "", title: "대학생인데 학업과 병행을 잘 할 수 있나요?", href: "/faq", tone: "light", kind: "text" },
  { id: "n3", category: "QnA", date: "", title: "직장인인데 캠퍼스 선교단체 함께 할 수 있나요?", href: "/faq", tone: "light", kind: "text" },
  { id: "n4", category: "사역", date: "", title: "수준별, 체계적인 네비게이토 성경공부", tags: ["성경공부", "디모데후서 2:15"], href: "/ministry/bible-study", tone: "light" },
  { id: "n5", category: "행사", date: "매년 여름", title: "아름다운 바닷가와 청량한 산에서 — 여름 캠핑 수양회", tags: ["수양회"], href: "/fellowship/events#summer-retreat", tone: "light" },
  { id: "n6", category: "사역", date: "", title: "선한 목자 되신 하나님을 알아가는 즐거움 — 캠퍼스", tags: ["캠퍼스", "중앙대"], href: "/ministry/campus", tone: "light" },
  { id: "n7", category: "양육·훈련", date: "", title: "예수님과 바울처럼, 1대1 양육 — 개인교제", tags: ["1:1 양육"], href: "/fellowship/discipleship#one-on-one", tone: "light" },
  { id: "n8", category: "정기모임", date: "매주 화요일", title: "누구나 올 수 있는 복음서 스터디 — 은혜의 샘", tags: ["열린 모임"], href: "/fellowship/gatherings#grace-spring", tone: "light" },
  { id: "n9", category: "행사", date: "매년 12월", title: "예수님의 탄생을 축하하는 이브파티", tags: ["크리스마스"], href: "/fellowship/events#christmas-eve", tone: "light" },
  { id: "n10", category: "사역", date: "", title: "하나님과 동행하는 즐거운 직장생활", tags: ["직장"], href: "/ministry/workplace", tone: "light" },
  { id: "n11", category: "양육·훈련", date: "방학", title: "성경 1독의 꿈을 이루는 Training Program", tags: ["STP", "WTP"], href: "/fellowship/discipleship#training", tone: "light" },
  { id: "n12", category: "양육·훈련", date: "", title: "말씀으로 행복한 가정 — 커플스터디", tags: ["가정"], href: "/fellowship/discipleship#couples", tone: "light" },
  { id: "n13", category: "사역", date: "", title: "영국, 캄보디아, 멕시코, 미국으로 — 해외 선교사 파송", tags: ["해외"], href: "/ministry/missions", tone: "light" },
  { id: "n14", category: "함께 즐기기", date: "", title: "축구, 농구, 탁구, 피트니스 — 함께할 땐 할 수 있습니다", tags: ["스포츠"], href: "/fellowship/leisure#sports", tone: "light" },
  { id: "n15", category: "About", date: "", title: "잔잔한 물가가 있는 상도동 비전관", tags: ["비전관"], href: "/about/vision-center", tone: "light" },
];

export const promotionSlides: PromotionSlide[] = [
  { id: "p1", title: "네비게이토 성경공부", description: "체계적인 네비게이토 성경공부를 통해 하나님을 알고 믿음이 자랄 수 있습니다.", ctaLabel: "자세히 보기", href: "/ministry/bible-study", backgroundColor: "#ffffff", tone: "light" },
  { id: "p2", title: "소그룹 성경공부", description: "네비게이토 성경공부는 소그룹으로 진행되어 각 개인의 믿음을 잘 세워줍니다.", ctaLabel: "자세히 보기", href: "/fellowship/gatherings#sunday", backgroundColor: "#fff3e6", tone: "light" },
  { id: "p3", title: "기도", description: "기도를 통해 살아계신 하나님을 경험할 수 있습니다. 또한 기도의 손은 기도로 하나님과 친밀히 교제할 수 있는 좋은 기도의 방법입니다.", ctaLabel: "자세히 보기", href: "/about/tools#hand-of-prayer", backgroundColor: "#edeff3", tone: "light" },
  { id: "p4", title: "Wheel Life", description: "성령충만한 그리스도인의 삶을 사는 데 필요한 원리를 도슨 트로트맨은 휠라이프 예화로 잘 설명하였습니다.", ctaLabel: "자세히 보기", href: "/about/tools#wheel-life", backgroundColor: "#1a1d24", tone: "dark" },
  { id: "p5", title: "전도와 양육", description: "네비게이토는 다른 사람을 주님께로 인도할 뿐만 아니라 1:1 개인 양육을 통해 각 사람을 주님의 제자로 세워줍니다.", ctaLabel: "자세히 보기", href: "/fellowship/discipleship", backgroundColor: "#f6f1e9", tone: "light" },
];

export const summaryPanels: SummaryPanel[] = [
  { id: "sp1", label: "성경공부", title: "말씀을 알고, 제자로 자라는", titleEn: "Bible Study", description: "체계적인 네비게이토 성경공부를 통해 하나님을 알고 믿음이 자랄 수 있습니다. 소그룹으로 진행되어 각 개인의 믿음을 잘 세워줍니다.", href: "/ministry/bible-study", color: "#f88b01", tone: "dark" },
  { id: "sp2", label: "말씀과 기도", title: "말씀의 손, 기도의 손", titleEn: "Word & Prayer", description: "기도를 통해 살아계신 하나님을 경험할 수 있습니다. 말씀과 기도로 하나님과 친밀히 교제합니다.", href: "/about/tools", color: "#1a1d24", tone: "dark" },
  { id: "sp3", label: "제자훈련", title: "한 사람을 제자로 세우는", titleEn: "Discipleship", description: "다른 사람을 주님께로 인도할 뿐만 아니라 1:1 개인 양육을 통해 각 사람을 주님의 제자로 세워줍니다.", href: "/fellowship/discipleship", color: "#fff3e6", tone: "light" },
];

export const partnerTabs: PartnerTabGroup[] = [
  { id: "ministries", label: "우리의 사역", links: [
    { label: "캠퍼스", href: "/ministry/campus" },
    { label: "직장", href: "/ministry/workplace" },
    { label: "군대", href: "/ministry/military" },
    { label: "해외", href: "/ministry/missions" },
    { label: "성경공부", href: "/ministry/bible-study" },
    { label: "커플스터디", href: "/fellowship/discipleship#couples" },
    { label: "교계기여", href: "/ministry/church-contribution" },
  ] },
  { id: "channels", label: "채널", links: [
    { label: "유튜브", href: "https://www.youtube.com/channel/UCplE5M_H4uWxQNuo5JyKpYQ" },
    { label: "인스타그램", href: "https://www.instagram.com/nav_cau" },
    { label: "자주 묻는 질문", href: "/faq" },
    { label: "Contact", href: "/about/contact" },
  ] },
];

export const footerGroups: FooterLinkGroup[] = navMenuItems.map((item) => ({
  title: item.label,
  links: (item.children ?? []).map(({ label, href }) => ({ label, href })),
}));
