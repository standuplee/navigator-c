import type { SectionLandingContent } from "@/types/pageTemplates";

/** Placeholder section-landing content for /service/featuredServices, /tech/innovation. */
export const sectionLandings: Record<"service" | "tech", SectionLandingContent> = {
  service: {
    heroEyebrow: "우리의 사역",
    heroTitle: "검색에서 탐색으로 진화",
    introEyebrow: "당신에게 최적화될",
    introTitle: "AI Agent",
    introDescription: "검색, 광고, 콘텐츠, 커머스 등 각 영역에 특화된 AI 기술로 맞춤형 서비스로 진화합니다.",
    tabs: [
      {
        id: "service",
        label: "서비스",
        cards: [
          { no: "01", category: "검색", title: "요약 카드", text: "핵심만 담은 요약으로 빠르게 답을 찾습니다.", href: "/service/search" },
          { no: "02", category: "광고", title: "자동화 입찰", text: "입찰과 소재를 AI가 자동으로 최적화합니다.", href: "/service/advertisement" },
          { no: "03", category: "커머스", title: "맞춤 추천", text: "취향과 이력을 반영한 개인화 쇼핑을 제공합니다.", href: "/service/commerce" },
          { no: "04", category: "지도", title: "3D 길찾기", text: "현실에 가까운 공간 정보로 길을 안내합니다.", href: "/service/map" },
        ],
      },
    ],
    ctaTitle: "더 많은 서비스가 궁금하다면",
    ctaDescription: "주요 서비스를 한 눈에 확인해 보세요.",
    ctaHref: "/service/all",
  },
  tech: {
    heroEyebrow: "우리의 활동",
    heroTitle: "혁신의 기술을 일상의 서비스로",
    introEyebrow: "지속적인 연구개발로",
    introTitle: "Everyday Tech",
    introDescription: "일상 속으로 더 깊숙이 확장될 플랫폼의 미래를 기술로 준비합니다.",
    tabs: [
      {
        id: "activity",
        label: "활동",
        cards: [
          { no: "01", category: "클라우드", title: "AI 인프라", text: "초대규모 AI와 클라우드 인프라로 더 많은 가능성을 연결합니다.", href: "/tech/innovation" },
          { no: "02", category: "기술", title: "로보틱스", text: "공간과 이동의 한계를 넘는 로봇 기술을 연구합니다.", href: "/tech/innovation" },
          { no: "03", category: "지도", title: "공간지능", text: "현실 세계를 이해하는 기술로 안전한 경험을 만듭니다.", href: "/tech/innovation" },
          { no: "04", category: "원천기술", title: "AI 연구", text: "지속적인 연구개발로 플랫폼의 미래를 준비합니다.", href: "/tech/innovation" },
        ],
      },
    ],
    ctaTitle: "기술이 더 궁금하다면",
    ctaDescription: "연구 영역을 한 눈에 확인해 보세요.",
    ctaHref: "/tech/innovation",
  },
};
