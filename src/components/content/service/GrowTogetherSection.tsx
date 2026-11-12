import type { GrowTogether } from "@/types/pageTemplates";
import { MediaSlot } from "../blocks/MediaSlot";
import { Reveal } from "../blocks/Reveal";

/** "함께 성장하는 …" block (reference: 32px heading, 366px image banner, then groups of an
 * info column (277px) + card row; cards 306px tall, 3-up or 2-up). Cards scroll sideways
 * below 1024px. */
export function GrowTogetherSection({ data }: { data: GrowTogether }) {
  return (
    <section className="bg-zinc-50 py-20 md:py-24 xl:py-32" aria-labelledby="grow-together-heading">
      <div className="mx-auto max-w-[1280px] px-gutter">
        <h2 id="grow-together-heading" className="text-section-title">{data.title}</h2>

        {data.banner && (
          <Reveal className="relative mt-10 flex min-h-[320px] items-center overflow-hidden rounded-2xl bg-zinc-900 text-white xl:min-h-[366px]">
            <MediaSlot src={data.banner.image?.src} label="배너 이미지" tone="dark" className="absolute inset-0" />
            <div className="relative p-8 md:p-12">
              <p className="text-2xl font-bold xl:text-[32px]">{data.banner.title}</p>
              <p className="mt-3 max-w-lg text-white/80 md:text-lg">{data.banner.text}</p>
              <a href={data.banner.href} className="mt-6 inline-flex h-10 items-center rounded-full bg-white px-5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-zinc-100">
                자세히 보기
              </a>
            </div>
          </Reveal>
        )}

        {data.groups.map((group) => (
          <Reveal key={group.title} className="mt-12 lg:flex lg:gap-6">
            <div className="lg:w-[277px] lg:shrink-0">
              <h3 className="text-xl font-bold xl:text-2xl">{group.title}</h3>
              <p className="mt-2 text-zinc-600">{group.text}</p>
            </div>
            <ul className="-mx-gutter mt-6 flex gap-4 overflow-x-auto px-gutter pb-2 [scrollbar-width:none] lg:mx-0 lg:mt-0 lg:flex-1 lg:gap-6 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
              {group.cards.map((card) => (
                <li key={card.title} className="w-[260px] shrink-0 lg:w-auto lg:flex-1">
                  <a
                    href={card.href}
                    className="group flex h-[240px] flex-col justify-between rounded-2xl bg-white p-6 transition-colors duration-200 ease-smooth hover:bg-zinc-100 xl:h-[306px]"
                  >
                    <div>
                      <p className="text-lg font-bold">{card.title}</p>
                      <p className="mt-2 text-sm text-zinc-600">{card.text}</p>
                    </div>
                    <span aria-hidden="true" className="self-end text-xl motion-safe:can-hover:group-hover:animate-nudge-x">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
