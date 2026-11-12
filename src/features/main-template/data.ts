/** Brand-neutral mock data for the main page template.
 * Placeholder copy and colors only — no NAVER branding or copied copy.
 * Swap this module's source for a CMS-backed repository later (docs/content-model.md);
 * components only depend on the types in src/types/mainTemplate.ts. */
import type {
  FooterLinkGroup,
  NavMenuItem,
  NewsCardItem,
  PartnerTabGroup,
  PromotionSlide,
  ShortcutCard,
  SummaryPanel,
} from "@/types/mainTemplate";

export const brandName = "NOVA";

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
  { id: "h1", category: "스토리", date: "2026.09.04", title: "분산 추론 인프라로 응답 속도를 3배 끌어올린 과정", href: "/testimony/s1", tone: "dark" },
  { id: "h2", category: "보도자료", date: "2026.08.24", title: "제휴 파트너 120곳과 함께하는 상생 프로그램 발표", href: "/news/pr7", tone: "dark" },
  { id: "h3", category: "보도자료", date: "2026.07.07", title: "연내 전 서비스에 접근성 가이드라인 전면 적용", href: "/news/pr8", tone: "dark" },
  { id: "h4", category: "리포트", date: "2026.06.30", title: "올해 상반기 공동체 활동 리포트 공개", href: "/media/naverReports", tone: "dark" },
];

export const shortcutCards: ShortcutCard[] = [
  { id: "s1", label: "공지", title: "이번 학기 모임 일정 안내", href: "#", tone: "light" },
  { id: "s2", label: "리소스", title: "브랜드 리소스 다운로드", href: "/about/tools", tone: "light" },
  { id: "s3", label: "함께하기", title: "처음 오신 분을 위한 안내", href: "/about/contact", tone: "light" },
];

/** 15 cards like the reference: mobile shows the first 5, tablet/desktop all. */
export const newsCards: NewsCardItem[] = [
  { id: "n1", category: "Product", date: "2026.09.07", title: "검색 결과 요약 카드, 모바일 전면 적용", tags: ["검색", "업데이트"], href: "/news/pr1", tone: "light" },
  { id: "n2", category: "공지", date: "2026.09.06", title: "가을 학기 정기 모임 장소 변경 안내", href: "#", tone: "light", kind: "text" },
  { id: "n3", category: "공지", date: "2026.09.05", title: "신입생 환영 모임 신청 접수", href: "#", tone: "light", kind: "text" },
  { id: "n4", category: "Tech", date: "2026.09.05", title: "온디바이스 추천 모델 경량화 연구 공개", tags: ["AI", "연구"], href: "/news/pr2", tone: "light" },
  { id: "n5", category: "Story", date: "2026.09.03", title: "신입 개발자가 겪은 첫 배포의 기록", tags: ["Culture"], href: "/testimony/s2", tone: "light" },
  { id: "n6", category: "Product", date: "2026.09.01", title: "지도 서비스에 실내 길찾기 기능 추가", tags: ["지도"], href: "/news/pr4", tone: "light" },
  { id: "n7", category: "보도자료", date: "2026.08.29", title: "중소 파트너사 대상 광고 비용 지원 프로그램 확대", tags: ["광고", "상생"], href: "/news/pr3", tone: "light" },
  { id: "n8", category: "Tech", date: "2026.08.27", title: "대규모 트래픽 대응을 위한 캐시 아키텍처 개편", tags: ["인프라"], href: "/news/pr9", tone: "light" },
  { id: "n9", category: "Story", date: "2026.08.24", title: "AI 큐레이션이 바꾼 쇼핑 경험", tags: ["커머스", "AI"], href: "/testimony/s3", tone: "light" },
  { id: "n10", category: "보도자료", date: "2026.08.20", title: "개발자 커뮤니티 밋업 다섯 번째 개최", tags: ["커뮤니티"], href: "/news/pr5", tone: "light" },
  { id: "n11", category: "Product", date: "2026.08.18", title: "결제 실패율을 낮춘 커머스 체크아웃 리뉴얼", tags: ["커머스"], href: "/news/pr6", tone: "light" },
  { id: "n12", category: "Story", date: "2026.08.14", title: "여름 수련회, 함께한 사흘의 기록", tags: ["수련회"], href: "/testimony", tone: "light" },
  { id: "n13", category: "보도자료", date: "2026.08.10", title: "접근성 가이드라인 2.0 공개", tags: ["접근성"], href: "/news", tone: "light" },
  { id: "n14", category: "Story", date: "2026.08.06", title: "졸업생이 전하는 일터에서의 하루", tags: ["졸업생"], href: "/testimony", tone: "light" },
  { id: "n15", category: "Tech", date: "2026.08.02", title: "검색 품질 평가 방법론 정리", tags: ["검색"], href: "/news", tone: "light" },
];

export const promotionSlides: PromotionSlide[] = [
  { id: "p1", title: "제품 업데이트 노트 공개", description: "매달 바뀌는 기능을 한 페이지에서 확인하세요.", ctaLabel: "자세히 보기", href: "#", backgroundColor: "#ffffff", tone: "light" },
  { id: "p2", title: "누구나 참여하는 커뮤니티 이벤트", description: "이번 달 참여하고 혜택 받아가세요.", ctaLabel: "자세히 보기", href: "#", backgroundColor: "#edeff3", tone: "light" },
  { id: "p3", title: "대화형 검색, 처음 써보세요", description: "질문 하나로 탐색부터 실행까지 한 번에.", ctaLabel: "자세히 보기", href: "#", backgroundColor: "#e8f6ff", tone: "light" },
  { id: "p4", title: "끝까지 끝내주는 AI 경험", description: "질문 하나면 탐색부터 실행까지 한 번에 해결하세요.", ctaLabel: "자세히 보기", href: "#", backgroundColor: "#050b25", tone: "dark" },
  { id: "p5", title: "업무 노트, 이렇게 씁니다", description: "기획자와 마케터가 직접 쓰는 기록법을 소개합니다.", ctaLabel: "자세히 보기", href: "#", backgroundColor: "#f6f1e9", tone: "light" },
];

export const summaryPanels: SummaryPanel[] = [
  { id: "sp1", label: "서비스", title: "검색에서 탐색으로 진화", titleEn: "On-Service AI", description: "사용자의 다양한 요구와 상황에 최적화된 맞춤형 경험으로 나아갑니다.", href: "/ministry", color: "#193194", tone: "dark" },
  { id: "sp2", label: "기술", title: "혁신의 기술을 일상의 서비스로", titleEn: "Everyday Tech", description: "지속적인 연구개발 투자로 일상 속에 깊숙이 자리할 플랫폼의 미래를 준비합니다.", href: "/fellowship", color: "#2f80d5", tone: "dark" },
  { id: "sp3", label: "스토리", title: "함께 만든 이야기", description: "공동체가 함께 걸어온 시간과 사람들의 이야기를 전합니다.", href: "/testimony", color: "#92e7fa", tone: "light" },
];

export const partnerTabs: PartnerTabGroup[] = [
  { id: "partner", label: "파트너 지원", links: [
    { label: "광고주 센터", href: "#" },
    { label: "스토어 센터", href: "#" },
    { label: "플레이스 센터", href: "#" },
    { label: "비즈니스 스쿨", href: "#" },
    { label: "임팩트 프로그램", href: "#" },
    { label: "비즈니스 케어", href: "#" },
  ] },
  { id: "developer", label: "개발자 지원", links: [
    { label: "개발자 센터", href: "#" },
    { label: "오픈 API", href: "#" },
    { label: "오픈소스", href: "#" },
    { label: "테크 블로그", href: "#" },
    { label: "개발자 포럼", href: "#" },
    { label: "클라우드 플랫폼", href: "#" },
  ] },
];

export const footerGroups: FooterLinkGroup[] = navMenuItems.map((item) => ({
  title: item.label,
  links: (item.children ?? []).map(({ label, href }) => ({ label, href })),
}));
