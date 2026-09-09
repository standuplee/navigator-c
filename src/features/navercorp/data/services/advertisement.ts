import type { ServiceDetail } from "@/types/service";
const root = "/sites/navercorp-65983208/service/search";
export const advertisementService: ServiceDetail = {
  eyebrow: "광고", title: "광고", description: "더 정확하고 편리하게\n광고의 가능성을 확장합니다", introTitle: "네이버 광고", introDescription: "네이버 광고는 AI 기반 자동화 기술을 바탕으로 광고주의 목표와 상품에 맞는 최적의 광고 경험을 제공합니다.", appImage: `${root}/service-search-app-1.png`, sections: [
    { title: "ADVoost", body: "입찰, 예산, 지면, 타겟팅, 소재 등 광고 집행 전반을 AI 기반으로 자동화합니다.", images: [`${root}/service-search-01-1.jpg`] },
    { title: "맞춤형 광고", body: "사용자의 관심사와 광고주의 비즈니스 목표를 연결해 더 나은 성과를 만듭니다.", images: [`${root}/service-search-02-1.jpg`, `${root}/service-search-02-2.jpg`] },
    { title: "새로운 성장", body: "데이터와 기술로 광고주와 사용자가 함께 성장하는 생태계를 만들어갑니다.", images: [`${root}/service-search-03-1.jpg`, `${root}/service-search-03-2.jpg`, `${root}/service-search-03-3.jpg`] },
  ], related: [],
};
