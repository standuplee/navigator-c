import type { ServiceDetail } from "@/types/service";

const root = "/sites/navercorp-65983208/service/search";
export const searchService: ServiceDetail = {
  eyebrow: "검색",
  title: "검색",
  description: "사용자의 관심사와 취향에 맞게\n맞춤형 결과를 제공합니다",
  introTitle: "네이버 검색",
  introDescription: "세계 최초로 통합 검색 서비스를 실시한 네이버 검색은 뉴스, 지도, 카페, 블로그, 이미지, 동영상, 사전 등 다양한 영역에서 검색어에 따라 최적화된 검색 결과를 제공합니다.",
  appImage: `${root}/service-search-app-1.png`,
  sections: [
    { title: "AI 브리핑", body: "사용자의 검색 의도에 맞는 핵심 정보를 요약해 제공하고, 창작자와 원문 콘텐츠의 출처를 연결합니다.", images: [`${root}/service-search-01-1.jpg`] },
    { title: "AI탭", body: "대화를 통해 복합적인 질문을 깊이 있게 이해하고, 필요한 정보를 종합해 풍부한 답변을 제공합니다.", images: [`${root}/service-search-02-1.jpg`, `${root}/service-search-02-2.jpg`] },
    { title: "검색의 새로운 경험", body: "찾고 판단하는 과정부터 예약과 구매 같은 실행까지 자연스럽게 이어지는 검색을 만들어갑니다.", images: [`${root}/service-search-03-1.jpg`, `${root}/service-search-03-2.jpg`, `${root}/service-search-03-3.jpg`] },
  ],
  related: [
    { title: "네이버 검색의 진화된 AI 브리핑을 선보입니다.", date: "SERVICE 2025.05.23", href: "/story/storyDetail?seq=32525" },
    { title: "네이버, 검색·숏텐츠·플레이스·쇼핑까지 AI 브리핑 도입", date: "보도자료 2025.03.24", href: "/media/pressReleasesDetail?seq=32374" },
  ],
};
