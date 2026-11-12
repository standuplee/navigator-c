import { MediaSlot } from "./MediaSlot";

/** "~가 더 궁금하다면" closing banner (PRD §6.6): 540 / 480 / 558px, image background with
 * a dark overlay, title and a link button whose arrow nudges on hover. */
export function CtaBanner({
  title,
  description,
  href,
  ctaLabel = "자세히 보기",
  image,
  external = false,
  variant = "full",
}: {
  title: string;
  description?: string;
  href: string;
  ctaLabel?: string;
  image?: string;
  external?: boolean;
  /** full: edge-to-edge banner (540/480/558). card: rounded card inside the content width
   * (reference tech pages: 380/320/366). */
  variant?: "full" | "card";
}) {
  if (variant === "card") {
    return (
      <section className="mx-auto max-w-[1280px] px-gutter py-16 xl:py-24">
        <div className="relative flex min-h-[380px] items-center overflow-hidden rounded-3xl bg-zinc-900 text-white md:min-h-[320px] xl:min-h-[366px]">
          <MediaSlot src={image} label="배너 이미지" tone="dark" className="absolute inset-0" />
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          <div className="relative p-8 md:p-12">
            <h2 className="text-section-title max-w-xl">{title}</h2>
            {description && <p className="mt-3 max-w-lg text-white/80 md:text-lg">{description}</p>}
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener" } : {})}
              className="group mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-ink transition-colors duration-200 ease-smooth hover:bg-zinc-100"
            >
              {ctaLabel}
              <span aria-hidden="true" className="inline-block motion-safe:group-hover:animate-nudge-x">→</span>
            </a>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="relative flex min-h-[540px] items-center overflow-hidden bg-zinc-900 text-white md:min-h-[480px] xl:min-h-[558px]">
      <MediaSlot src={image} label="배너 이미지" tone="dark" className="absolute inset-0" />
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1920px] px-gutter">
        <h2 className="text-section-title max-w-2xl">{title}</h2>
        {description && <p className="mt-4 max-w-xl text-base text-white/80 md:text-lg">{description}</p>}
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener" } : {})}
          className="group mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-white px-6 text-sm font-semibold text-ink transition-colors duration-200 ease-smooth hover:bg-zinc-100"
        >
          {ctaLabel}
          <span aria-hidden="true" className="inline-block motion-safe:group-hover:animate-nudge-x">→</span>
        </a>
      </div>
    </section>
  );
}
