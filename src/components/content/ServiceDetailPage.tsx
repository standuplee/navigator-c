"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { ServiceDetail } from "@/types/service";

export function ServiceDetailPage({ detail }: { detail: ServiceDetail }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => setProgress(Math.min(1, Math.max(0, window.scrollY / Math.max(1, document.body.scrollHeight - innerHeight))));
    addEventListener("scroll", update, { passive: true }); update();
    return () => removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)), { threshold: 0.18 });
    document.querySelectorAll(".service-detail-section, .service-detail-related").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <main className="service-detail-page" style={{ "--scroll-progress": progress } as React.CSSProperties}>
    <section className="service-detail-hero"><p>{detail.eyebrow}</p><h1>{detail.title}</h1><div className="service-detail-hero__desc">{detail.description}</div><div className="service-detail-hero__mark">N<span>→</span></div></section>
    <section className="section-type__page"><div className="section-type__content"><div className="section-type__content-inner"><div className="section-type__icon is-border">{detail.appImage && <Image src={detail.appImage} alt={detail.introTitle} width={200} height={200} />}</div><h2 className="section-type__title">{detail.introTitle}</h2><p className="section-type__text">{detail.introDescription}</p><div className="section-type__btn-wrap"><a href="#service-sections" className="section-type__btn section-type__btn--home">홈</a></div><div className="section-type__img-view" aria-hidden="true"><div className="section-type__images"><div className="phone-visual"><div className="phone"><div className="obj"><Image src={detail.sections[0]?.images[0] ?? ""} alt="" width={632} height={1364} /></div></div></div></div></div></div></div></section>
    <section className="service-detail-sections" id="service-sections">{detail.sections.map((section, index) => <article className="service-detail-section" key={section.title}><div className="service-detail-section__heading"><span>0{index + 1}</span><h2>{section.title}</h2><p>{section.body}</p></div><div className={`service-detail-section__images count-${section.images.length}`}>{section.images.map((image) => <Image key={image} src={image} alt="" width={1112} height={741} loading="lazy" />)}</div></article>)}</section>
    <div className="service-detail-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
  </main>;
}
