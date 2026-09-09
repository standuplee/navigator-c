"use client";

import { useEffect } from "react";

/** Small interaction layer for the source navigation markup. */
export function NavigationBehavior() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const on = <T extends Element>(selector: string, event: string, handler: EventListener) => {
      document.querySelectorAll<T>(selector).forEach((element) => {
        element.addEventListener(event, handler);
        cleanups.push(() => element.removeEventListener(event, handler));
      });
    };
    const html = document.documentElement;
    document.querySelectorAll<HTMLAnchorElement>('a[href="https://www.navercorp.com/service/featuredServices"]').forEach((link) => link.setAttribute("href", "/service/featuredServices"));
    document.querySelectorAll<HTMLElement>(".nav__link, .mo-nav__link, .nav__link2").forEach((link) => {
      if (link.textContent?.trim() === "서비스") link.textContent = "우리의 사역";
    });
    const mobile = document.querySelector<HTMLElement>(".mo-nav");
    const menuButton = document.querySelector<HTMLButtonElement>(".btn-mo-nav");
    const closeButton = mobile?.querySelector<HTMLButtonElement>(".btn-close");
    const setMobile = (open: boolean) => {
      mobile?.classList.toggle("is-active", open);
      html.classList.toggle("is-scroll-lock", open);
      menuButton?.setAttribute("aria-expanded", String(open));
    };
    if (menuButton) {
      const open = () => setMobile(true);
      menuButton.addEventListener("click", open);
      cleanups.push(() => menuButton.removeEventListener("click", open));
    }
    if (closeButton) {
      const close = () => setMobile(false);
      closeButton.addEventListener("click", close);
      cleanups.push(() => closeButton.removeEventListener("click", close));
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobile(false);
        document.querySelector<HTMLElement>(".search-tab")?.classList.remove("is-active");
      }
    };
    document.addEventListener("keydown", escape);
    cleanups.push(() => document.removeEventListener("keydown", escape));

    on<HTMLAnchorElement>(".mo-nav__link[role=button]", "click", (event) => {
      const target = event.currentTarget as HTMLElement;
      const item = target.closest(".mo-nav__item");
      item?.classList.toggle("is-open");
      const panel = item?.querySelector<HTMLElement>(".mo-nav__list2");
      if (panel) panel.style.display = item?.classList.contains("is-open") ? "block" : "none";
    });
    on<HTMLButtonElement>(".btn-selected", "click", (event) => {
      const button = event.currentTarget as HTMLElement;
      const list = button.closest(".btn-lang")?.querySelector<HTMLElement>(".btn-lang__list");
      if (list) list.style.display = list.style.display === "block" ? "none" : "block";
    });
    on<HTMLButtonElement>(".btn-search", "click", (event) => {
      const button = event.currentTarget as HTMLButtonElement;
      if (button.closest(".search-tab")) return;
      const panel = document.querySelector<HTMLElement>(".search-tab");
      panel?.classList.add("is-active");
      panel?.querySelector<HTMLInputElement>("input")?.focus();
    });
    on<HTMLButtonElement>(".search-tab .btn-delete", "click", () => {
      const input = document.querySelector<HTMLInputElement>(".search-tab input");
      if (input) input.value = "";
    });
    const scroll = () => {
      const header = document.querySelector<HTMLElement>("#header");
      if (!header) return;
      const scrolled = window.scrollY > 20;
      header.classList.toggle("is-scrolled", scrolled);
      header.classList.toggle("is-scroll", scrolled);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    cleanups.push(() => window.removeEventListener("scroll", scroll));
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
  return null;
}
