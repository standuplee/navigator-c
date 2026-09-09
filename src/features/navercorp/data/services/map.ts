import type { ServiceDetail } from "@/types/service";
const root = "/sites/navercorp-65983208/service/search";
export const mapService: ServiceDetail = {
  eyebrow: "지도", title: "지도", description: "현실에 가까운 공간 정보로\n더 나은 이동을 돕습니다", introTitle: "네이버 지도", introDescription: "네이버 지도는 장소와 이동에 필요한 정보를 한 곳에 모아 일상의 모든 길을 더 쉽고 편리하게 연결합니다.", appImage: `${root}/service-search-app-1.png`, sections: [
    { title: "3D 공간 정보", body: "현실에 가까운 3D 공간 정보로 장소를 더욱 생생하게 경험할 수 있습니다.", images: [`${root}/service-search-01-1.jpg`] },
    { title: "공간지능", body: "AI와 공간 데이터를 결합해 주변 장소와 이동 경로를 더 정확하게 안내합니다.", images: [`${root}/service-search-02-1.jpg`, `${root}/service-search-02-2.jpg`] },
    { title: "새로운 이동 경험", body: "온라인과 오프라인을 연결해 누구나 편리하게 목적지에 도착하도록 돕습니다.", images: [`${root}/service-search-03-1.jpg`, `${root}/service-search-03-2.jpg`, `${root}/service-search-03-3.jpg`] },
  ], related: [],
};
