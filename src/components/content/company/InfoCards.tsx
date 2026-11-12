import type { InfoLinkCard } from "@/types/pageTemplates";

/** Link cards used on contact / partnership pages (reference 379×186–204, title 20px, text 16px),
 * 1 / 2 / 3 columns. */
export function InfoCards({ cards, tall = false }: { cards: InfoLinkCard[]; tall?: boolean }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
      {cards.map((card) => (
        <li key={card.title}>
          <a
            href={card.href}
            className={`group flex flex-col justify-between rounded-2xl bg-zinc-100 p-6 transition-colors duration-200 hover:bg-zinc-200 ${tall ? "h-[180px] xl:h-[204px]" : "h-[160px] xl:h-[186px]"}`}
          >
            <div>
              <p className="text-lg font-bold xl:text-xl">{card.title}</p>
              <p className="mt-2 text-sm text-zinc-600 xl:text-base">{card.text}</p>
            </div>
            <span aria-hidden="true" className="self-end motion-safe:can-hover:group-hover:animate-nudge-x">→</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
