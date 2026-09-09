import type { ServiceDetail } from "@/types/service";
const root = "/sites/navercorp-65983208/service/search";
export const commerceService: ServiceDetail = {
  eyebrow: "커머스", title: "커머스", description: "취향을 발견하고\n쇼핑의 새로운 경험을 만듭니다", introTitle: "네이버 커머스", introDescription: "네이버 커머스는 AI와 데이터를 활용해 발견부터 구매까지 개인에게 최적화된 쇼핑 경험을 제공합니다.", appImage: `${root}/service-search-app-1.png`, sections: [
    { title: "AI 쇼핑 가이드", body: "쇼핑 이력과 관심사를 반영해 개인에게 맞는 상품과 정보를 추천합니다.", images: [`${root}/service-search-01-1.jpg`] },
    { title: "발견에서 구매까지", body: "콘텐츠와 커머스를 자연스럽게 연결해 새로운 상품을 발견하는 즐거움을 전합니다.", images: [`${root}/service-search-02-1.jpg`, `${root}/service-search-02-2.jpg`] },
    { title: "함께 성장하는 생태계", body: "판매자와 브랜드, 사용자가 함께 성장하는 커머스 플랫폼을 만들어갑니다.", images: [`${root}/service-search-03-1.jpg`, `${root}/service-search-03-2.jpg`, `${root}/service-search-03-3.jpg`] },
  ], related: [],
};
