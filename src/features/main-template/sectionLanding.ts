import type { SectionLandingContent } from "@/types/pageTemplates";

/** Placeholder section-landing content for /service/featuredServices and /tech/innovation
 * (PRD §7.2, §7.4). Counts follow the reference: 8 hero tiles, 4 featured items, 4 domains
 * with 3 points each. Neutral copy. */
export const sectionLandings: Record<"service" | "tech", SectionLandingContent> = {
  service: {
    theme: "light",
    hero: { line1: ["검색에서", "탐색으로 진화"], line2: "On-Service AI", tiles: 8 },
    body: {
      type: "featured",
      items: [
        { id: "featured-1", title: "요약 브리핑", text: "길고 복잡한 결과 대신 핵심만 정리해 보여줍니다.", href: "/service/search", media: { kind: "video", label: "요약 브리핑 영상" } },
        { id: "featured-2", title: "자동화 광고", text: "입찰과 소재를 목표에 맞춰 자동으로 최적화합니다.", href: "/service/advertisement", media: { kind: "video", label: "자동화 광고 영상" } },
        { id: "featured-3", title: "쇼핑 가이드", text: "취향과 이력을 반영해 상품 선택을 돕습니다.", href: "/service/commerce", media: { kind: "video", label: "쇼핑 가이드 영상" } },
        { id: "featured-4", title: "3D 공간 정보", text: "현실에 가까운 입체 지도로 길을 안내합니다.", href: "/service/map", media: { kind: "video", label: "3D 공간 정보 영상" } },
      ],
    },
    cta: { title: "다양한 서비스가 더 궁금하다면", description: "전체 서비스를 한눈에 확인해 보세요.", href: "/service/all", ctaLabel: "전체 서비스 보기" },
  },
  tech: {
    theme: "dark",
    hero: { line1: ["혁신의 기술을", "일상의 서비스로"], line2: "Everyday Tech", tiles: 8 },
    body: {
      type: "stack",
      title: "일상에서 체감하는 미래 기술",
      domains: [
        {
          id: "domain-model",
          title: "파운데이션 모델",
          description: "자체 데이터와 인프라로 만든 언어 모델을 서비스 곳곳에 적용합니다.",
          points: [
            { title: "언어 모델", text: "이해하고 생성하는 대규모 언어 모델" },
            { title: "전용 클라우드", text: "높은 보안의 AI 특화 클라우드" },
            { title: "개발 도구", text: "업무에 맞춰 쓰는 AI 개발 도구" },
          ],
          media: { kind: "video", label: "파운데이션 모델" },
        },
        {
          id: "domain-spatial",
          title: "공간지능",
          description: "현실과 디지털 세계를 연결하는 기술을 연구합니다.",
          points: [
            { title: "AR / VR / MR", text: "공간에 겹쳐 보이는 정보" },
            { title: "스마트 빌딩", text: "건물을 이해하는 디지털 트윈" },
            { title: "스마트 시티", text: "도시 규모의 공간 데이터" },
          ],
          media: { kind: "video", label: "공간지능" },
        },
        {
          id: "domain-robotics",
          title: "로보틱스",
          description: "사람과 자연스럽게 공존하는 로봇을 만듭니다.",
          points: [
            { title: "로봇 친화 빌딩", text: "로봇이 함께 일하는 업무 공간" },
            { title: "하이퍼스케일 데이터센터", text: "로봇이 운영을 돕는 인프라" },
            { title: "로봇 AI", text: "파운데이션 모델 기반 로봇 지능" },
          ],
          media: { kind: "video", label: "로보틱스" },
        },
        {
          id: "domain-immersive",
          title: "이머시브 미디어",
          description: "기술로 감각을 확장하는 미디어 경험을 만듭니다.",
          points: [
            { title: "몰입형 라이브", text: "현장감 있는 라이브 커머스" },
            { title: "버추얼 스트리밍", text: "가상 공간 속 실시간 방송" },
            { title: "시청 환경 최적화", text: "기기에 맞춘 화질과 소리" },
          ],
          media: { kind: "video", label: "이머시브 미디어" },
        },
      ],
      research: {
        title: "기술 투자와 연구",
        items: [
          { title: "기술 스타트업 투자", text: "초기 기술 기업에 투자하고 함께 성장합니다.", href: "#" },
          { title: "AI 연구 협업", text: "학계와 함께 AI 연구를 이어갑니다.", href: "#" },
        ],
      },
    },
    cta: { title: "기술이 더 궁금하다면", description: "분야별 기술 소개를 확인해 보세요.", href: "/tech/hyperclovax", ctaLabel: "자세히 보기" },
  },
};
