"use client";
import { useEffect } from "react";
import Swiper from "swiper";
import { Autoplay, Pagination, EffectFade, A11y } from "swiper/modules";

export function MainBehavior() {
 useEffect(() => {
  const disposers: (()=>void)[] = [];
  const timers: ReturnType<typeof setInterval>[] = [];
  const all = <T extends Element=HTMLElement>(selector:string) => Array.from(document.querySelectorAll<T>(selector));
  document.querySelectorAll<HTMLAnchorElement>('a[href*="pressReleasesDetail?seq=10034634"]').forEach((link) => {
   link.setAttribute('href', '/media/pressReleasesDetail?seq=10034634');
  });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clock = () => {
   const time = new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Seoul',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date()).split(':');
   ['hour','minute','second'].forEach((name,i)=> { const e=document.querySelector(`.main-timer .${name}`); if(e)e.textContent=time[i]; });
  };
  clock(); timers.push(setInterval(clock,1000));
  const stock = document.querySelector('.main-stock');
  stock?.setAttribute('title','2026-09-07 원본 페이지에 표시된 주가 — 실시간 연동 아님');
  for(const selector of ['.main-headline','.main-middle-banner']) {
   const group=document.querySelector<HTMLElement>(selector);
   const el=group?.querySelector<HTMLElement>('.swiper');
   if(!el || !group)continue;
   const pager=group.querySelector<HTMLElement>('.swiper-pagination');
   const button=group.querySelector<HTMLButtonElement>('.btn-auto-control');
   const middle=selector.includes('middle');
   const sync=(s:Swiper)=>{
    if(middle) {
     const color=s.slides[s.activeIndex]?.dataset.color || '#ffffff';
     el.style.backgroundColor=color;
     const dark=['#000000','#050b25'].includes(color.toLowerCase());
     el.classList.toggle('black',dark);el.classList.toggle('white',!dark);
    }
   };
   const s=new Swiper(el,{modules:[Autoplay,Pagination,EffectFade,A11y],loop:true,speed:600,effect:middle?'slide':'fade',fadeEffect:{crossFade:true},autoplay:reduced?false:{delay:4000,disableOnInteraction:false},pagination:pager?{el:pager,clickable:true,renderBullet:(index,cls)=>`<button type="button" class="${cls}" aria-label="${index+1}번째 배너"><span class="bar">${index+1}</span>${middle?`<span class="off">${index+1}</span>`:''}</button>`}:undefined,on:{init:sync,slideChange:sync}});
   const toggle=()=>{const paused=button?.classList.toggle('paused');if(paused)s.autoplay.stop();else s.autoplay.start();button?.setAttribute('aria-label',paused?'자동재생':'자동멈춤');button?.setAttribute('aria-pressed',String(paused));};
   button?.addEventListener('click',toggle);
   if(reduced){button?.classList.add('paused');button?.setAttribute('aria-label','자동재생');}
   disposers.push(()=>{button?.removeEventListener('click',toggle);s.destroy(true,true);});
  }
  const tech=all<HTMLElement>('.main-tech-items');
  const activate=(index:number)=>tech.forEach((e,i)=>{e.closest('.list-cell')?.classList.toggle('active',i===index);e.setAttribute('aria-expanded',String(i===index));});
  tech.forEach((e,i)=>{const click=(event:Event)=>{if(!(event.target as HTMLElement).closest('a'))activate(i);};const key=(event:KeyboardEvent)=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate(i);} if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();const n=(i+(event.key==='ArrowRight'?1:tech.length-1))%tech.length;activate(n);tech[n].focus();}};e.addEventListener('click',click);e.addEventListener('keydown',key);disposers.push(()=>{e.removeEventListener('click',click);e.removeEventListener('keydown',key);});});
  const tabs=all<HTMLButtonElement>('.main-partner [role="tab"]');
  tabs.forEach((tab,i)=>{
   const choose=()=>{tabs.forEach((t,j)=>{t.classList.toggle('active',i===j);t.setAttribute('aria-selected',String(i===j));t.tabIndex=i===j?0:-1;const panel=document.getElementById(t.getAttribute('aria-controls')||'');panel?.classList.toggle('active',i===j);if(panel)panel.hidden=i!==j;});};
   const key=(e:KeyboardEvent)=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();tabs[1-i].click();tabs[1-i].focus();}};
   tab.addEventListener('click',choose);tab.addEventListener('keydown',key);disposers.push(()=>{tab.removeEventListener('click',choose);tab.removeEventListener('keydown',key);});
  });
  return ()=>{timers.forEach(clearInterval);disposers.forEach(fn=>fn());};
 },[]);
 return null;
}
