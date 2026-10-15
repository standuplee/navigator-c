import type { FeatureDetailContent } from "@/types/pageTemplates";
import { pressReleaseList } from "./pressReleases";

const related = pressReleaseList.slice(0, 5);

/** Placeholder feature-detail content for /tech/* detail routes and /media/aiInNaver. */
export const featureDetails: Record<"foundationModel" | "spatialAI" | "robotics" | "immersiveMedia" | "aiInService", FeatureDetailContent> = {
  foundationModel: {
    eyebrow: "기술",
    title: "독자 파운데이션 모델",
    description: "자체 학습 데이터와 인프라로 구축한 언어 모델 패밀리입니다.",
    variants: [
      { name: "Lite", description: "빠른 응답이 필요한 가벼운 작업에 최적화되어 있습니다." },
      { name: "Standard", description: "범용 작업에 균형 잡힌 성능을 제공합니다." },
      { name: "Pro", description: "복잡한 추론과 긴 문맥 처리에 특화되어 있습니다." },
    ],
    products: [
      { title: "AI탭", description: "대화형 검색에 모델을 적용한 제품입니다.", href: "#" },
      { title: "개발자 API", description: "외부 개발자가 모델을 직접 호출할 수 있는 API입니다.", href: "#" },
    ],
    related,
  },
  spatialAI: {
    eyebrow: "기술",
    title: "공간지능",
    description: "현실 공간을 이해하고 해석하는 기술로 더 안전한 경험을 만듭니다.",
    variants: [
      { name: "실내 매핑", description: "건물 내부 구조를 3D로 인식합니다." },
      { name: "경로 추론", description: "실시간 상황을 반영해 최적 경로를 계산합니다." },
      { name: "객체 인식", description: "주변 사물과 장애물을 인식합니다." },
    ],
    products: [
      { title: "실내 내비게이션", description: "복잡한 건물에서도 길을 안내합니다.", href: "#" },
      { title: "3D 거리뷰", description: "실제에 가까운 입체 화면을 제공합니다.", href: "#" },
    ],
    related,
  },
  robotics: {
    eyebrow: "기술",
    title: "로보틱스",
    description: "공간과 이동의 한계를 넘어 일상을 바꾸는 로봇 기술을 연구합니다.",
    variants: [
      { name: "실내 배송 로봇", description: "건물 내부에서 물건을 배송합니다." },
      { name: "안내 로봇", description: "방문객에게 길을 안내합니다." },
      { name: "원격 제어 로봇", description: "사람이 원격으로 제어할 수 있는 로봇입니다." },
    ],
    products: [
      { title: "스마트빌딩 연동", description: "건물 인프라와 로봇을 연동합니다.", href: "#" },
      { title: "로봇 친화적 설계 가이드", description: "로봇이 다니기 쉬운 공간 설계를 제안합니다.", href: "#" },
    ],
    related,
  },
  immersiveMedia: {
    eyebrow: "기술",
    title: "이머시브 미디어",
    description: "현실과 가상을 넘나드는 몰입형 콘텐츠 기술을 연구합니다.",
    variants: [
      { name: "3D 콘텐츠", description: "입체감 있는 콘텐츠를 제작합니다." },
      { name: "실시간 렌더링", description: "지연 없이 몰입형 화면을 보여줍니다." },
      { name: "아바타", description: "사용자를 대신하는 디지털 아바타를 만듭니다." },
    ],
    products: [
      { title: "가상 공간 플랫폼", description: "아바타로 소통하는 가상 공간입니다.", href: "#" },
      { title: "콘텐츠 제작 도구", description: "누구나 몰입형 콘텐츠를 만들 수 있는 도구입니다.", href: "#" },
    ],
    related,
  },
  aiInService: {
    eyebrow: "미디어",
    title: "서비스 속의 AI",
    description: "우리 서비스 곳곳에 적용된 AI 기술을 한 곳에서 소개합니다.",
    variants: [
      { name: "검색 속 AI", description: "질문의 의도를 이해하고 핵심만 요약합니다." },
      { name: "추천 속 AI", description: "취향을 학습해 맞춤 콘텐츠를 보여줍니다." },
      { name: "광고 속 AI", description: "입찰과 소재를 자동으로 최적화합니다." },
    ],
    products: [
      { title: "AI탭", description: "대화형 검색 서비스입니다.", href: "#" },
      { title: "AI 쇼핑 가이드", description: "맞춤형 쇼핑 추천을 제공합니다.", href: "#" },
    ],
    related,
  },
};
