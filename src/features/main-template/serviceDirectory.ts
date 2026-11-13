import type { ServiceDirectoryContent, ServiceDirectoryItem } from "@/types/pageTemplates";

/** /ministry/all and /ministry/all/abc — every ministry, activity and page of the site in one
 * list (navigators-seoulc.org menus). Built automatically from the admin once pages have a
 * "한눈에 보기" category; this module is the fallback. */
const youtube: ServiceDirectoryItem["links"] = [{ kind: "home", href: "https://www.youtube.com/channel/UCplE5M_H4uWxQNuo5JyKpYQ" }];
const instagram: ServiceDirectoryItem["links"] = [{ kind: "app", href: "https://www.instagram.com/nav_cau" }];

export const serviceDirectory: ServiceDirectoryContent = {
  title: "한눈에 보기",
  categories: ["About", "사역", "정기모임", "양육·훈련", "행사", "함께 즐기기", "소식·미디어"],
  items: [
    { name: "네비게이토란?", category: "About", href: "/about" },
    { name: "목사님 추천", category: "About", href: "/about/recommendations" },
    { name: "연혁", category: "About", href: "/about/history" },
    { name: "비전관", category: "About", href: "/about/vision-center" },
    { name: "네비게이토 도구", category: "About", href: "/about/tools" },
    { name: "Contact", category: "About", href: "/about/contact" },
    { name: "성경공부", category: "사역", href: "/ministry/bible-study" },
    { name: "캠퍼스", category: "사역", href: "/ministry/campus", links: instagram },
    { name: "직장", category: "사역", href: "/ministry/workplace" },
    { name: "군대", category: "사역", href: "/ministry/military" },
    { name: "해외", category: "사역", href: "/ministry/missions" },
    { name: "교계 기여", category: "사역", href: "/ministry/church-contribution" },
    { name: "주일교제", category: "정기모임", href: "/fellowship/gatherings#sunday" },
    { name: "은혜의 샘", category: "정기모임", href: "/fellowship/gatherings#grace-spring" },
    { name: "온라인교제", category: "정기모임", href: "/fellowship/gatherings#online", links: youtube },
    { name: "개인교제", category: "양육·훈련", href: "/fellowship/discipleship#one-on-one" },
    { name: "커플스터디", category: "양육·훈련", href: "/fellowship/discipleship#couples" },
    { name: "Training Program", category: "양육·훈련", href: "/fellowship/discipleship#training" },
    { name: "여름 캠핑 수양회", category: "행사", href: "/fellowship/events#summer-retreat" },
    { name: "이브파티", category: "행사", href: "/fellowship/events#christmas-eve" },
    { name: "스포츠", category: "함께 즐기기", href: "/fellowship/leisure#sports" },
    { name: "Enjoy", category: "함께 즐기기", href: "/fellowship/leisure#enjoy" },
    { name: "소식", category: "소식·미디어", href: "/news" },
    { name: "모임 일정", category: "소식·미디어", href: "/news/schedule" },
    { name: "간증", category: "소식·미디어", href: "/testimony" },
    { name: "유튜브 · 네비게이토 서울C 중앙대", category: "소식·미디어", href: "/media/channels", links: youtube },
    { name: "인스타그램 · @nav_cau", category: "소식·미디어", href: "/media/channels", links: instagram },
  ],
};

export const serviceDirectoryTabs = [
  { label: "분류별", href: "/ministry/all" },
  { label: "가나다순", href: "/ministry/all/abc" },
];
