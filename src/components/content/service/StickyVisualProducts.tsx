"use client";

import { useEffect, useState } from "react";
import type { ServiceProduct } from "@/types/pageTemplates";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AnchorSection } from "../blocks/AnchorNav";
import { Carousel } from "../blocks/Carousel";
import { MediaSlot } from "../blocks/MediaSlot";
import { Reveal } from "../blocks/Reveal";
import { ProductBody } from "./ProductBody";

/** Product sections with a sticky visual column (PRD §6.8, §7.1).
 * >=1024: left half is a sticky device frame that cross-fades (.4s) to the active product's
 * visual, with vertical bullet bars to jump between products; right half scrolls the product
 * sections (one screen each). <1024: no sticky column — each section shows its own visuals
 * (single image, or the auto-advancing inline slider when there are several). */
export function StickyVisualProducts({ products }: { products: ServiceProduct[] }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const nodes = products.map((product) => document.getElementById(product.id)).filter((node): node is HTMLElement => !!node);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(nodes.indexOf(entry.target as HTMLElement))),
      { rootMargin: "-50% 0px -50% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [products]);

  const jump = (index: number) => {
    const node = document.getElementById(products[index].id);
    if (!node) return;
    window.scrollTo({ top: node.getBoundingClientRect().top + window.scrollY - 56, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <AnchorSection items={products.map((product) => ({ id: product.id, label: product.title }))}>
      <div className="mx-auto max-w-[1920px] lg:grid lg:grid-cols-2">
        <div className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+56px)] flex h-[calc(100svh-var(--header-h)-56px)] items-center justify-center transition-[top] duration-400 ease-smooth scroll-down:top-14">
            <div className="relative aspect-[9/16] h-[78%] max-h-[760px]">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  aria-hidden={index !== active}
                  className={`absolute inset-0 transition-opacity duration-400 ease-smooth ${index === active ? "opacity-100" : "opacity-0"}`}
                >
                  <MediaSlot src={product.images[0]?.src} label={product.images[0]?.label ?? product.title} className="size-full rounded-[32px] shadow-[0_20px_50px_rgb(0_0_0/0.08)]" />
                </div>
              ))}
            </div>
            <div className="absolute right-8 top-1/2 flex -translate-y-1/2 flex-col gap-2">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  aria-label={`${product.title}로 이동`}
                  aria-current={index === active ? "true" : undefined}
                  onClick={() => jump(index)}
                  className={`h-7 w-2 rounded-full transition-colors duration-200 ease-smooth ${index === active ? "bg-ink" : "bg-zinc-300 hover:bg-zinc-400"}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          {products.map((product) => (
            <section
              key={product.id}
              id={product.id}
              className="flex min-h-[calc(100svh-56px)] flex-col justify-center border-b border-zinc-100 px-gutter py-16 last:border-none lg:pl-0 xl:py-24"
            >
              <Reveal>
                <ProductBody product={product} />
              </Reveal>
              {product.images.length > 0 && (
                <div className="mt-10 w-full max-w-[335px] md:max-w-[420px] lg:hidden">
                  {product.images.length > 1 ? (
                    <Carousel preset="inline-images" label={`${product.title} 화면`}>
                      {product.images.map((image, imageIndex) => (
                        <MediaSlot key={imageIndex} src={image.src} label={image.label ?? product.title} ratio="335/437" className="rounded-3xl" />
                      ))}
                    </Carousel>
                  ) : (
                    <MediaSlot src={product.images[0].src} label={product.images[0].label ?? product.title} ratio="335/437" className="rounded-3xl" />
                  )}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </AnchorSection>
  );
}
