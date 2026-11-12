import type { ServiceDetailContent, ServiceProduct } from "@/types/pageTemplates";
import { pressReleaseList } from "./pressReleases";

/** Placeholder content for the service-detail v2 template (PRD §7.1).
 * Section counts, hero type and layout follow the reference measurements per page
 * (navercorp_UI_정밀비교.xlsx); copy is neutral dummy text — no reference copy or assets. */

const related = pressReleaseList.slice(0, 6).map((item) => ({
  id: item.id,
  title: item.title,
  href: item.href,
  date: item.date,
  category: item.category,
}));

const LINKS = [
  { label: "앱 내려받기", href: "#" },
  { label: "웹에서 보기", href: "#" },
];

function product(id: string, title: string, description: string, opts: Partial<ServiceProduct> = {}): ServiceProduct {
  return { id, title, description, links: LINKS, images: [{ label: `${title} 화면 1` }, { label: `${title} 화면 2` }], ...opts };
}

function items(prefix: string, names: string[]) {
  return names.map((name) => ({ title: name, description: `${prefix} 안에서 ${name} 기능이 하는 일을 짧게 설명하는 자리입니다.`, image: { label: name } }));
}

const detailServices = (names: string[]) => names.map((name) => ({ title: name, description: `${name}에 대한 한 줄 설명` }));

const growTogether = (title: string): ServiceDetailContent["growTogether"] => ({
  title,
  banner: { title: "함께 성장하는 프로그램", text: "파트너의 시작과 성장을 돕는 지원 프로그램을 소개하는 배너 자리입니다.", href: "#" },
  groups: [
    {
      title: "시작 지원",
      text: "처음 시작하는 파트너를 위한 혜택",
      cards: [
        { title: "수수료 지원", text: "초기 단계 파트너의 부담을 덜어주는 프로그램", href: "#" },
        { title: "성장 포인트", text: "일정 성과를 달성하면 제공되는 리워드", href: "#" },
        { title: "교육 프로그램", text: "운영 노하우를 배울 수 있는 무료 강의", href: "#" },
      ],
    },
    {
      title: "운영 지원",
      text: "안정적인 운영을 위한 도구",
      cards: [
        { title: "운영 가이드", text: "꼭 알아야 할 운영 정보를 한곳에", href: "#" },
        { title: "금융 지원 센터", text: "운영 자금 관련 정보를 한눈에", href: "#" },
      ],
    },
  ],
});

const iconHero = (title: string, description: string, count: number) => ({
  variant: "icon-grid" as const,
  title,
  description,
  icons: Array.from({ length: count }, (_, index) => `${title} 아이콘 ${index + 1}`),
});

export type ServiceDetailKey =
  | "bible-study" | "church-contribution" | "missions" | "workplace" | "military" | "channels" | "vision-center" | "campus" | "portal" | "space1784";

export const serviceDetails: Record<ServiceDetailKey, ServiceDetailContent> = {
  "bible-study": {
    title: "검색",
    hero: iconHero("검색", "질문 하나로 탐색부터 실행까지 이어지는 검색 경험", 3),
    layout: "sticky-visual",
    products: [
      product("search-core", "통합 검색", "사용자의 의도를 이해하고 필요한 정보를 빠르게 찾아주는 기본 검색입니다."),
      product("search-summary", "요약 카드", "길고 복잡한 결과 대신 핵심만 담은 요약 카드로 답을 확인할 수 있습니다."),
      product("search-dialog", "대화형 탐색", "후속 질문을 이어가며 점점 더 구체적인 답을 찾아갈 수 있습니다."),
    ],
    related,
  },
  "workplace": {
    title: "도구",
    hero: iconHero("도구", "메모, 일정, 협업까지 하나로 연결되는 생산성 도구", 3),
    layout: "sticky-visual",
    products: [
      product("tools-work", "협업 도구", "메시지, 일정, 문서를 한곳에서 함께 다루는 업무 공간입니다."),
      product("tools-browser", "브라우저", "빠르고 안전하게 웹을 이용할 수 있는 브라우저입니다."),
      product("tools-translate", "번역", "여러 언어를 자연스럽게 옮겨주는 번역 도구입니다."),
    ],
    related,
  },
  "channels": {
    title: "콘텐츠",
    hero: iconHero("콘텐츠", "읽고, 보고, 즐기는 모든 것", 7),
    layout: "sticky-visual",
    products: ["웹툰", "라이브 방송", "숏폼", "동영상", "음악", "카메라 앱", "가상 공간"].map((name, index) =>
      product(`contents-${index + 1}`, name, `${name} 콘텐츠를 즐기고 창작자와 연결되는 서비스입니다.`),
    ),
    related,
  },
  "campus": {
    title: "커뮤니티",
    hero: iconHero("커뮤니티", "관심사로 모이고 함께 이야기하는 공간", 5),
    layout: "sticky-visual",
    products: ["메신저", "블로그", "카페", "모임", "지식 나눔"].map((name, index) =>
      product(`community-${index + 1}`, name, `${name}에서 사람들이 소통하고 기록을 나누는 방법을 소개합니다.`),
    ),
    related,
  },
  "missions": {
    title: "지도",
    hero: iconHero("지도", "공간 정보를 더 정확하고 입체적으로", 3),
    layout: "sticky-visual",
    products: [
      product("map-core", "지도", "길찾기와 장소 정보를 빠르게 확인하는 지도 서비스입니다.", {
        detailServices: detailServices(["대중교통", "자전거", "실내 지도", "거리뷰"]),
      }),
      product("map-place", "장소 정보", "가게와 장소의 정보, 예약, 리뷰를 한곳에서 확인합니다.", {
        detailServices: detailServices(["예약", "주문", "리뷰"]),
      }),
      product("map-3d", "3D 공간 정보", "실제와 가까운 입체 지도로 공간을 이해합니다."),
    ],
    growTogether: growTogether("함께 성장하는 파트너"),
    related,
  },
  portal: {
    title: "포털",
    hero: iconHero("포털", "하루의 시작을 여는 첫 화면", 2),
    layout: "sticky-visual",
    products: [
      product("portal-home", "홈", "뉴스와 날씨, 관심 정보를 한 화면에 모아 보여줍니다."),
      product("portal-feed", "홈 피드", "관심사에 맞춘 콘텐츠를 끊김 없이 이어 보여줍니다."),
    ],
    related,
  },
  "church-contribution": {
    title: "광고",
    hero: { variant: "fullscreen", title: "광고", description: "데이터 기반 자동화로 성과를 높이는 광고 솔루션" },
    layout: "stacked",
    products: [
      { id: "ad-search", title: "검색 광고", description: "검색 의도에 맞춰 노출되는 광고 상품입니다.", images: [], items: items("검색 광고", ["사이트 검색", "쇼핑 검색", "콘텐츠 검색", "브랜드 검색", "신제품 검색", "장소", "지역 소상공인", "탐색 뷰"]) },
      { id: "ad-performance", title: "성과형 디스플레이", description: "목표에 맞춰 자동으로 최적화되는 광고 상품입니다.", images: [], items: items("성과형 광고", ["자동 최적화", "인지도 및 트래픽", "웹사이트 전환", "앱 전환", "쇼핑 다이내믹", "쇼핑 고객 확장", "동영상 조회", "커뮤니케이션"]) },
      { id: "ad-guaranteed", title: "보장형 디스플레이", description: "정해진 위치와 기간에 노출을 보장하는 광고 상품입니다.", images: [], items: items("보장형 광고", ["홈 프리미엄", "전면 광고", "배너 광고", "동영상 광고", "버티컬 광고", "패밀리 광고"]) },
    ],
    related,
  },
  "military": {
    title: "클라우드",
    hero: { variant: "fullscreen", title: "클라우드", description: "필요한 만큼, 필요한 순간에 쓰는 클라우드 플랫폼" },
    layout: "stacked",
    products: [
      { id: "cloud-platform", title: "클라우드 플랫폼", description: "다양한 규모의 서비스를 안정적으로 운영하는 기반입니다.", images: [{ label: "클라우드 플랫폼" }] },
      { id: "cloud-infra", title: "안정적인 인프라", description: "대규모 서비스를 운영한 경험이 담긴 인프라입니다.", images: [{ label: "인프라" }] },
      { id: "cloud-global", title: "글로벌 플랫폼", description: "해외 서비스를 위한 리전과 네트워크를 제공합니다.", images: [{ label: "글로벌" }] },
      { id: "cloud-cert", title: "검증된 보안", description: "엄격한 인증 기준을 통과한 보안 체계를 갖췄습니다.", images: [{ label: "보안" }] },
      { id: "cloud-ai", title: "AI 솔루션", description: "비즈니스 특성에 맞는 AI 도구를 제공합니다.", images: [{ label: "AI 솔루션" }] },
      { id: "cloud-saas", title: "바로 쓰는 서비스", description: "PaaS부터 SaaS까지 바로 적용할 수 있는 서비스입니다.", images: [{ label: "SaaS" }] },
    ],
    related,
  },
  "vision-center": {
    title: "데이터센터",
    hero: { variant: "fullscreen", title: "데이터센터", description: "서비스를 받치는 가장 단단한 기반", media: { kind: "video" } },
    layout: "stacked",
    products: [
      { id: "dc-next", title: "차세대 데이터센터", description: "변화하는 기술에도 유연하게 대응하는 설비입니다.", images: [], items: items("데이터센터", ["유연한 설비", "에너지 효율", "로봇 자동화", "견고한 건축", "친환경 인증", "보안 검증"]) },
      { id: "dc-sites", title: "거점", description: "각 지역 거점의 특징을 소개합니다.", images: [], items: items("거점", ["제1 거점", "제2 거점"]) },
      { id: "dc-region", title: "글로벌 리전", description: "해외 리전과 연결된 인프라를 소개합니다.", images: [{ label: "글로벌 리전" }] },
    ],
    cta: { title: "데이터센터가 더 궁금하다면", description: "방문 프로그램과 자세한 정보를 확인해 보세요.", href: "#" },
    related,
  },
  space1784: {
    title: "사옥",
    hero: { variant: "fullscreen", title: "사옥", description: "기술이 일상이 되는 업무 공간", media: { kind: "video" } },
    layout: "stacked",
    products: [
      { id: "space-robot", title: "로봇과 함께하는 일상", description: "공간 곳곳에서 로봇이 일상 업무를 돕습니다.", images: [], items: items("사옥", ["자율주행 로봇", "로봇 전용 엘리베이터", "로봇 관제 시스템"]) },
      { id: "space-work", title: "일하는 방식의 미래", description: "출입부터 회의까지 업무 흐름을 기술로 연결합니다.", images: [], items: items("사옥", ["얼굴 인식 출입", "업무 비서", "스마트 제어", "건강 관리"]) },
      { id: "space-green", title: "친환경 인프라", description: "에너지를 아끼는 건축과 설비를 적용했습니다.", images: [], items: items("사옥", ["이중 외벽", "복사 냉방", "조명 제어", "친환경 인증"]) },
    ],
    cta: { title: "사옥이 더 궁금하다면", description: "공간 투어와 자세한 정보를 확인해 보세요.", href: "#" },
    related,
  },
};
