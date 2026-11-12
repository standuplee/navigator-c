import type { ServiceProduct } from "@/types/pageTemplates";
import { AnchorSection } from "../blocks/AnchorNav";
import { Carousel } from "../blocks/Carousel";
import { MediaSlot } from "../blocks/MediaSlot";
import { Reveal } from "../blocks/Reveal";

/** Full-width product sections for image-heavy pages (advertisement, cloud, data center,
 * office space) — PRD §7.1 `feature-list`. Heading row (title | description), then either a
 * card grid (1 / 2 columns, desktop-only image zoom) or a wide visual / inline slider. */
export function StackedProducts({ products }: { products: ServiceProduct[] }) {
  return (
    <AnchorSection items={products.map((product) => ({ id: product.id, label: product.title }))}>
      {products.map((product) => (
        <section key={product.id} id={product.id} className="border-b border-zinc-100 py-20 last:border-none md:py-24 xl:py-32">
          <div className="mx-auto max-w-[1280px] px-gutter">
            <Reveal className="grid gap-4 lg:grid-cols-2 lg:gap-12">
              <h2 className="text-section-title">{product.title}</h2>
              <p className="text-base leading-relaxed text-zinc-600 md:text-lg">{product.description}</p>
            </Reveal>

            {product.items && product.items.length > 0 ? (
              <ul className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 xl:gap-x-12 xl:gap-y-20">
                {product.items.map((item, index) => (
                  <Reveal as="li" key={item.title} delay={(index % 2) * 0.1} className="group">
                    <MediaSlot
                      src={item.image?.src}
                      label={item.image?.label ?? item.title}
                      ratio="16/10"
                      className="rounded-2xl"
                      mediaClassName="transition-transform duration-200 ease-smooth can-hover:group-hover:scale-[1.08]"
                    />
                    <h3 className="mt-5 text-card-title">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 md:text-base">{item.description}</p>
                  </Reveal>
                ))}
              </ul>
            ) : product.images.length > 1 ? (
              <Carousel preset="inline-images" label={`${product.title} 이미지`} className="mt-12">
                {product.images.map((image, index) => (
                  <MediaSlot key={index} src={image.src} label={image.label ?? product.title} ratio="16/9" className="rounded-3xl" />
                ))}
              </Carousel>
            ) : product.images.length === 1 ? (
              <Reveal className="mt-12">
                <MediaSlot src={product.images[0].src} label={product.images[0].label ?? product.title} ratio="16/9" className="rounded-3xl" />
              </Reveal>
            ) : null}
          </div>
        </section>
      ))}
    </AnchorSection>
  );
}
