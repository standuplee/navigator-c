import type { ServiceDirectoryContent } from "@/types/pageTemplates";

/** Placeholder service-directory content for /service/all. Mixes real in-project
 * routes with "#" placeholders standing in for the ~30 external product links
 * the source page has — the grid/filter/sort pattern is what matters here. */
export const serviceDirectory: ServiceDirectoryContent = {
  title: "전체 서비스",
  categories: ["검색", "광고", "커머스", "지도", "콘텐츠", "클라우드", "핀테크", "커뮤니티", "도구"],
  items: [
    { name: "검색", category: "검색", href: "/service/search" },
    { name: "AI탭", category: "검색", href: "#" },
    { name: "이미지 검색", category: "검색", href: "#" },
    { name: "광고주센터", category: "광고", href: "/service/advertisement" },
    { name: "성과형 광고", category: "광고", href: "#" },
    { name: "브랜드 광고", category: "광고", href: "#" },
    { name: "쇼핑", category: "커머스", href: "/service/commerce" },
    { name: "스마트스토어", category: "커머스", href: "#" },
    { name: "간편결제", category: "핀테크", href: "/service/fintech" },
    { name: "지도", category: "지도", href: "/service/map" },
    { name: "길찾기", category: "지도", href: "#" },
    { name: "플레이스", category: "지도", href: "#" },
    { name: "콘텐츠", category: "콘텐츠", href: "/service/contents" },
    { name: "웹툰", category: "콘텐츠", href: "#" },
    { name: "블로그", category: "콘텐츠", href: "#" },
    { name: "클라우드 플랫폼", category: "클라우드", href: "/service/cloud" },
    { name: "데이터센터", category: "클라우드", href: "/service/datacenterGak" },
    { name: "오픈 API", category: "커뮤니티", href: "#" },
    { name: "개발자 센터", category: "커뮤니티", href: "/service/community" },
    { name: "오픈소스", category: "커뮤니티", href: "#" },
    { name: "생산성 도구", category: "도구", href: "/service/tools" },
  ],
};
