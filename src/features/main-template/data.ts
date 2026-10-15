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

export const navMenuItems: NavMenuItem[] = [
  { label: "회사소개", href: "/company/about", children: [
    { label: "소개", href: "/company/about" },
    { label: "주요 계열사", href: "/company/affiliates" },
    { label: "연혁", href: "/company/history" },
    { label: "브랜드 리소스", href: "/company/brandGuide" },
    { label: "제휴 제안", href: "/company/partnership" },
    { label: "Contact", href: "/company/contact" },
  ] },
  { label: "서비스", href: "/service/featuredServices", children: [
    { label: "주요 서비스", href: "/service/featuredServices" },
    { label: "검색", href: "/service/search" },
    { label: "광고", href: "/service/advertisement" },
    { label: "커머스", href: "/service/commerce" },
    { label: "지도", href: "/service/map" },
    { label: "전체 서비스", href: "/service/all" },
  ] },
  { label: "기술", href: "/tech/innovation", children: [
    { label: "주요 기술", href: "/tech/innovation" },
    { label: "파운데이션 모델", href: "/tech/hyperclovax" },
    { label: "공간지능", href: "/tech/spatialAI" },
    { label: "로보틱스", href: "/tech/robotics" },
    { label: "이머시브 미디어", href: "/tech/immersiveMedia" },
  ] },
  { label: "미디어", href: "/media/pressReleases", children: [
    { label: "보도자료", href: "/media/pressReleases" },
    { label: "미디어 행사", href: "/media/mediaEvents" },
    { label: "네이버 리포트", href: "/media/naverReports" },
    { label: "서비스 속의 AI", href: "/media/aiInNaver" },
  ] },
  { label: "스토리", href: "/story", children: [
    { label: "스토리 전체보기", href: "/story" },
  ] },
];

export const headlineSlides: NewsCardItem[] = [
  { id: "h1", category: "스토리", date: "2026.09.04", title: "분산 추론 인프라로 응답 속도를 3배 끌어올린 과정", href: "/story/storyDetail?seq=s1", tone: "dark" },
  { id: "h2", category: "보도자료", date: "2026.08.24", title: "제휴 파트너 120곳과 함께하는 상생 프로그램 발표", href: "/media/pressReleasesDetail?seq=pr7", tone: "dark" },
  { id: "h3", category: "보도자료", date: "2026.07.07", title: "연내 전 서비스에 접근성 가이드라인 전면 적용", href: "/media/pressReleasesDetail?seq=pr8", tone: "dark" },
];

export const shortcutCards: ShortcutCard[] = [
  { id: "s1", label: "공지", title: "이번 분기 서비스 업데이트 노트 보기", href: "#", tone: "light" },
  { id: "s2", label: "리소스", title: "브랜드 가이드라인 다운로드", href: "#", tone: "dark" },
  { id: "s3", label: "커뮤니티", title: "파트너·개발자 지원 센터 바로가기", href: "#", tone: "light" },
];

export const newsCards: NewsCardItem[] = [
  { id: "n1", category: "Product", date: "2026.09.07", title: "검색 결과 요약 카드, 모바일 전면 적용", tags: ["검색", "업데이트"], href: "/media/pressReleasesDetail?seq=pr1", tone: "light" },
  { id: "n2", category: "Tech", date: "2026.09.05", title: "온디바이스 추천 모델 경량화 연구 공개", tags: ["AI", "연구"], href: "/media/pressReleasesDetail?seq=pr2", tone: "light" },
  { id: "n3", category: "Story", date: "2026.09.03", title: "신입 개발자가 겪은 첫 배포의 기록", tags: ["Culture"], href: "/story/storyDetail?seq=s2", tone: "light" },
  { id: "n4", category: "Product", date: "2026.09.01", title: "지도 서비스에 실내 길찾기 기능 추가", tags: ["지도"], href: "/media/pressReleasesDetail?seq=pr4", tone: "light" },
  { id: "n5", category: "보도자료", date: "2026.08.29", title: "중소 파트너사 대상 광고 비용 지원 프로그램 확대", tags: ["광고", "상생"], href: "/media/pressReleasesDetail?seq=pr3", tone: "light" },
  { id: "n6", category: "Tech", date: "2026.08.27", title: "대규모 트래픽 대응을 위한 캐시 아키텍처 개편", tags: ["인프라"], href: "/media/pressReleasesDetail?seq=pr9", tone: "light" },
  { id: "n7", category: "Story", date: "2026.08.24", title: "AI 큐레이션이 바꾼 쇼핑 경험", tags: ["커머스", "AI"], href: "/story/storyDetail?seq=s3", tone: "light" },
  { id: "n8", category: "보도자료", date: "2026.08.20", title: "개발자 커뮤니티 밋업 다섯 번째 개최", tags: ["커뮤니티"], href: "/media/pressReleasesDetail?seq=pr5", tone: "light" },
  { id: "n9", category: "Product", date: "2026.08.18", title: "결제 실패율을 낮춘 커머스 체크아웃 리뉴얼", tags: ["커머스"], href: "/media/pressReleasesDetail?seq=pr6", tone: "light" },
];

export const promotionSlides: PromotionSlide[] = [
  { id: "p1", title: "제품 업데이트 노트 공개", description: "매달 바뀌는 기능을 한 페이지에서 확인하세요.", ctaLabel: "자세히 보기", href: "#", backgroundColor: "#ffffff", tone: "light" },
  { id: "p2", title: "누구나 참여하는 커뮤니티 이벤트", description: "이번 달 참여하고 혜택 받아가세요.", ctaLabel: "자세히 보기", href: "#", backgroundColor: "#edeff3", tone: "light" },
  { id: "p3", title: "대화형 검색, 처음 써보세요", description: "질문 하나로 탐색부터 실행까지 한 번에.", ctaLabel: "자세히 보기", href: "#", backgroundColor: "#e8f6ff", tone: "light" },
  { id: "p4", title: "끝까지 끝내주는 AI 경험", description: "질문 하나면 탐색부터 실행까지 한 번에 해결하세요.", ctaLabel: "자세히 보기", href: "#", backgroundColor: "#050b25", tone: "dark" },
];

export const summaryPanels: SummaryPanel[] = [
  { id: "sp1", label: "제품", title: "검색에서 탐색으로 진화", description: "사용자의 다양한 요구와 상황에 최적화된 맞춤형 경험으로 나아갑니다.", href: "/service/featured" },
  { id: "sp2", label: "기술", title: "혁신의 기술을 일상의 서비스로", description: "지속적인 연구개발 투자로 일상 속에 깊숙이 자리할 플랫폼의 미래를 준비합니다.", href: "/tech/innovation" },
];

export const partnerTabs: PartnerTabGroup[] = [
  { id: "partner", label: "파트너 지원", links: [
    { label: "광고주 센터", href: "#" },
    { label: "스토어 센터", href: "#" },
    { label: "플레이스 센터", href: "#" },
    { label: "비즈니스 스쿨", href: "#" },
  ] },
  { id: "developer", label: "개발자 지원", links: [
    { label: "개발자 센터", href: "#" },
    { label: "오픈 API", href: "#" },
    { label: "오픈소스", href: "#" },
    { label: "테크 블로그", href: "#" },
  ] },
];

export const footerGroups: FooterLinkGroup[] = [
  { title: "서비스", links: [{ label: "검색", href: "/service/search" }, { label: "광고", href: "/service/advertisement" }, { label: "커머스", href: "/service/commerce" }, { label: "지도", href: "/service/map" }, { label: "전체 서비스", href: "/service/all" }] },
  { title: "기술", links: [{ label: "주요 기술", href: "/tech/innovation" }, { label: "파운데이션 모델", href: "/tech/hyperclovax" }, { label: "공간지능", href: "/tech/spatialAI" }, { label: "로보틱스", href: "/tech/robotics" }] },
  { title: "미디어", links: [{ label: "보도자료", href: "/media/pressReleases" }, { label: "미디어 행사", href: "/media/mediaEvents" }, { label: "네이버 리포트", href: "/media/naverReports" }, { label: "서비스 속의 AI", href: "/media/aiInNaver" }] },
  { title: "회사", links: [{ label: "소개", href: "/company/about" }, { label: "주요 계열사", href: "/company/affiliates" }, { label: "연혁", href: "/company/history" }, { label: "브랜드 리소스", href: "/company/brandGuide" }, { label: "제휴 제안", href: "/company/partnership" }, { label: "Contact", href: "/company/contact" }] },
];
