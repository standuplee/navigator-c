import type { ServiceDirectoryContent, ServiceDirectoryItem } from "@/types/pageTemplates";

/** Placeholder directory for /service/all and /service/allString. Names and links are
 * stand-ins; in-site detail pages are linked where they exist. Real entries come from the
 * admin (collection `services`). */
const web = (href = "#"): ServiceDirectoryItem["links"] => [{ kind: "home", href }];
const both = (href = "#"): ServiceDirectoryItem["links"] => [
  { kind: "home", href },
  { kind: "app", href: "#" },
];

export const serviceDirectory: ServiceDirectoryContent = {
  title: "전체 서비스",
  categories: ["검색", "광고", "커머스", "지도", "콘텐츠", "클라우드", "핀테크", "커뮤니티", "도구"],
  items: [
    { name: "검색", category: "검색", href: "/ministry/bible-study", links: both() },
    { name: "AI탭", category: "검색", href: "#", links: both() },
    { name: "이미지 검색", category: "검색", href: "#", links: web() },
    { name: "광고주센터", category: "광고", href: "/ministry/church-contribution", links: web() },
    { name: "성과형 광고", category: "광고", href: "#", links: web() },
    { name: "브랜드 광고", category: "광고", href: "#", links: web() },
    { name: "쇼핑", category: "커머스", href: "#", links: both() },
    { name: "스마트스토어", category: "커머스", href: "#", links: both() },
    { name: "가격비교", category: "커머스", href: "#", links: web() },
    { name: "지도", category: "지도", href: "/ministry/missions", links: both() },
    { name: "길찾기", category: "지도", href: "#", links: both() },
    { name: "플레이스", category: "지도", href: "#", links: web() },
    { name: "예약", category: "지도", href: "#", links: both() },
    { name: "콘텐츠", category: "콘텐츠", href: "/media/channels", links: both() },
    { name: "웹툰", category: "콘텐츠", href: "#", links: both() },
    { name: "블로그", category: "콘텐츠", href: "#", links: both() },
    { name: "카페", category: "콘텐츠", href: "#", links: both() },
    { name: "클라우드 플랫폼", category: "클라우드", href: "/ministry/military", links: web() },
    { name: "데이터센터", category: "클라우드", href: "/about/vision-center", links: web() },
    { name: "간편결제", category: "핀테크", href: "#", links: both() },
    { name: "가계부", category: "핀테크", href: "#", links: both() },
    { name: "오픈 API", category: "커뮤니티", href: "#", links: web() },
    { name: "개발자 센터", category: "커뮤니티", href: "/ministry/campus", links: web() },
    { name: "오픈소스", category: "커뮤니티", href: "#", links: web() },
    { name: "생산성 도구", category: "도구", href: "/ministry/workplace", links: web() },
    { name: "메일", category: "도구", href: "#", links: both() },
    { name: "캘린더", category: "도구", href: "#", links: both() },
    { name: "메모", category: "도구", href: "#", links: both() },
    { name: "Papago", category: "도구", href: "#", links: both() },
  ],
};

export const serviceDirectoryTabs = [
  { label: "주제별", href: "/ministry/all" },
  { label: "가나다순", href: "/ministry/all/abc" },
];
