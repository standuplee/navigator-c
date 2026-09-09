"use client";

import { useEffect, useState } from "react";
import { SiteShell } from "@/components/layouts/SiteShell";
import { MobileNavigation } from "../main/main-c98712e4/MobileNavigation";
import { SiteFooter } from "../main/main-c98712e4/SiteFooter";
import { SiteHeader } from "../main/main-c98712e4/SiteHeader";
import { NavigationBehavior } from "../main/main-c98712e4/NavigationBehavior";
import { ServiceCardList, type ServiceCardItem } from "./ServiceCardList";

const asset = (name: string) => `/sites/navercorp-65983208/service/${name}`;
const cards = [
  { no: "01", title: "AI 브리핑", category: "검색", text: "네이버 검색이 AI 브리핑을 시작으로 새로운 AI 에이전트를 향해 진화합니다. 검색 기술과 AI 기술을 바탕으로 모든 네이버 사용자들의 니즈에 맞춰 적재적소에 콘텐츠와 서비스를 연결합니다.", image: "service-main-headline-visual-5.png", href: "/service/search" },
  { no: "02", title: "ADVoost", category: "광고", text: "네이버 광고에 AI 기반 자동화기술인 ADVoost가 접목됩니다. 입찰, 예산, 지면, 타겟팅, 소재 등 광고 집행 전반을 AI 기반으로 자동화하여 광고주의 상품 판매를 최적화합니다.", image: "service-main-headline-visual-6.png", href: "/service/advertisement" },
  { no: "03", title: "AI 쇼핑 가이드", category: "커머스", text: "네이버플러스 스토어가 AI 쇼핑 가이드를 통해 초개인화 쇼핑으로 나아갑니다. AI가 쇼핑 이력과 관심사를 반영하여 개인 맞춤형 상품을 추천합니다.", image: "service-main-headline-visual-7.png", href: "/service/commerce" },
  { no: "04", title: "3D 공간 정보", category: "지도", text: "네이버 지도에 공간지능 기술이 더해져 현실에 가깝게 공간 정보를 제공합니다. 3D 거리뷰와 AR 실내 내비게이션으로 더욱 쉽게 길을 찾을 수 있습니다.", image: "service-main-headline-visual-8.png", href: "/service/map" },
];
const activityCards: ServiceCardItem[] = [
  { no: "01", title: "AI 인프라", category: "클라우드", text: "초대규모 AI와 클라우드 인프라 기술로 더 많은 가능성을 연결합니다.", image: "service-main-headline-visual-1.png", href: "/tech/innovation" },
  { no: "02", title: "로보틱스", category: "기술", text: "공간과 이동의 한계를 넘어 일상을 바꾸는 로봇 기술을 연구합니다.", image: "service-main-headline-visual-2.png", href: "/tech/innovation" },
  { no: "03", title: "공간지능", category: "지도", text: "현실 세계를 이해하는 기술로 더 안전하고 편리한 경험을 만듭니다.", image: "service-main-headline-visual-3.png", href: "/tech/innovation" },
  { no: "04", title: "AI 연구", category: "원천기술", text: "지속적인 연구개발로 네이버 플랫폼의 미래를 준비합니다.", image: "service-main-headline-visual-4.png", href: "/tech/innovation" },
];

export function ServiceOverview({ initialTab = "service" }: { initialTab?: "service" | "activity" }) {
  const [tab, setTab] = useState<"service" | "activity">(initialTab);
  useEffect(() => {
    document.title = "우리의 사역 l NAVER Corp.";
    const rename = () => document.querySelectorAll<HTMLElement>('a[href="https://www.navercorp.com/service/featuredServices"], a[href="/service/featuredServices"]').forEach((link) => { link.textContent = "우리의 사역"; });
    rename();
    const frame = requestAnimationFrame(rename);
    const timer = window.setTimeout(rename, 50);
    return () => { cancelAnimationFrame(frame); window.clearTimeout(timer); };
  }, []);
  return <SiteShell className="navercorp service-page" header={<SiteHeader />} navigation={<MobileNavigation />} footer={<SiteFooter />}>
    <NavigationBehavior />
    <main id="content">
      <section className="service-hero">
        <div className="service-hero__visuals" aria-hidden="true">{[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <img key={n} src={asset(`service-main-headline-visual-${n}.png`)} alt="" />)}</div>
        <h1>검색에서 탐색으로 진화<span>On-Service AI</span></h1>
        <button className="service-hero__next" type="button" onClick={() => document.querySelector(".service-intro")?.scrollIntoView({ behavior: "smooth" })} aria-label="다음 컨텐츠로 이동">↓</button>
      </section>
      <section className="service-intro"><p className="eyebrow">당신에게 최적화될</p><h2>AI Agent <span aria-hidden="true">✣</span></h2><p className="description">검색, 광고, 콘텐츠, 커머스 등 네이버의 서비스에 영역별로 특화된 AI 원천기술을 도입하여,<br />사용자의 다양한 요구와 개별적 상황에 최적화된 맞춤형 서비스로 진화합니다.</p></section>
      <section className="service-cards" aria-labelledby="service-cards-title"><div className="service-cards__heading"><h2 id="service-cards-title">네이버 주요 {tab === "service" ? "서비스" : "활동"}</h2><div className="service-cards__tabs"><button type="button" className={tab === "service" ? "active" : ""} onClick={() => setTab("service")}>우리의 사역</button><button type="button" className={tab === "activity" ? "active" : ""} onClick={() => setTab("activity")}>우리의 활동</button></div></div><ServiceCardList items={tab === "service" ? cards : activityCards} /></section>
      <section className="service-all"><h2>네이버의 다양한 서비스가<br />더 궁금하다면</h2><p>주요 서비스를 한 눈에 확인해 보세요.</p><a className="btn-basic btn-primary" href="/service/all">전체 서비스 보러가기</a><img src={asset("service-bottom-info-01.png")} alt="네이버 서비스" /></section>
    </main>
  </SiteShell>;
}
