import type { ServiceProduct } from "@/types/pageTemplates";
import { MediaSlot } from "../blocks/MediaSlot";

/** Text part of a product section: icon, title, description, link buttons and the optional
 * "세부 서비스" list (reference: title 32px desktop, text 16px, list heading 20px). */
export function ProductBody({ product }: { product: ServiceProduct }) {
  return (
    <div className="max-w-[480px]">
      <MediaSlot label="" className="size-14 rounded-2xl" />
      <h2 className="mt-6 text-section-title">{product.title}</h2>
      <p className="mt-4 text-base leading-relaxed text-zinc-600">{product.description}</p>
      {product.links && product.links.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {product.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="inline-flex h-9 items-center rounded-full border border-zinc-300 px-4 text-sm text-zinc-700 transition-colors duration-200 ease-smooth hover:border-ink hover:text-ink"
                aria-label={`${product.title} ${link.label}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      {product.detailServices && product.detailServices.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-bold">세부 서비스</h3>
          <ul className="mt-4 grid gap-4">
            {product.detailServices.map((service) => (
              <li key={service.title} className="flex items-center gap-4">
                <MediaSlot label="" className="size-10 shrink-0 rounded-xl" />
                <div>
                  <p className="font-semibold">{service.title}</p>
                  <p className="text-sm text-zinc-500">{service.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
