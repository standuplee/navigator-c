"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { NewsCardItem } from "@/types/mainTemplate";
import { AnchorSection } from "./blocks/AnchorNav";
import { MediaSlot } from "./blocks/MediaSlot";
import { Pagination } from "./blocks/Pagination";
import { Reveal } from "./blocks/Reveal";

const CARD_PAGE = 6;
const ROW_PAGE = 3;

export type AiQuery = { category?: string; keyword?: string; page?: string; bldPage?: string };

/** /media/aiInNaver (docs/PRD-navercorp-ui-parity.md §7.10).
 * Centered hero (title 40/48/64, description 26/26/32, 1184×508 video) → anchor nav over two
 * sections, each with a title | description header:
 * 1) service cards: category chips + search + 1/1/3-column cards, paginated by ?page=
 * 2) "how we build" articles: 250px list rows, paginated independently by ?bldPage= */
export function AiInServicePage({
  title,
  description,
  categories,
  services,
  building,
  query = {},
}: {
  title: string;
  description: string;
  categories: string[];
  services: NewsCardItem[];
  building: NewsCardItem[];
  query?: AiQuery;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [draft, setDraft] = useState(query.keyword ?? "");
  const category = query.category ?? "";
  const keyword = query.keyword ?? "";
  const page = Math.max(1, Number(query.page) || 1);
  const bldPage = Math.max(1, Number(query.bldPage) || 1);

  const filtered = useMemo(
    () =>
      services.filter(
        (item) => (!category || item.category === category) && (!keyword || `${item.title} ${(item.tags ?? []).join(" ")}`.toLowerCase().includes(keyword.toLowerCase())),
      ),
    [services, category, keyword],
  );
  const cardTotal = Math.max(1, Math.ceil(filtered.length / CARD_PAGE));
  const rowTotal = Math.max(1, Math.ceil(building.length / ROW_PAGE));

  const build = (next: AiQuery, hash = "") => {
    const params = new URLSearchParams();
    Object.entries({ category, keyword, page: query.page, bldPage: query.bldPage, ...next }).forEach(([key, value]) => value && params.set(key, String(value)));
    const qs = params.toString();
    return `${qs ? `${pathname}?${qs}` : pathname}${hash}`;
  };
  const go = (next: AiQuery) => router.replace(build({ ...next, page: undefined }), { scroll: false });

  return (
    <main>
      <section className="mx-auto max-w-[1280px] px-gutter pb-16 pt-[calc(var(--header-h)+56px)] text-center xl:pb-32 xl:pt-[calc(var(--header-h)+128px)]">
        <Reveal>
          <h1 className="text-page-title">{title}</h1>
          <p className="mx-auto mt-6 max-w-[944px] text-[26px] font-bold leading-snug text-zinc-500 xl:text-[32px]">{description}</p>
        </Reveal>
        <Reveal delay={0.2} className="-mx-gutter mt-12 md:mx-0 xl:mt-20">
          <MediaSlot kind="video" label="소개 영상" className="aspect-[3/2] md:aspect-[1184/508] md:rounded-3xl" />
        </Reveal>
      </section>

      <AnchorSection
        title={title}
        items={[
          { id: "ai-services", label: "QT 나눔" },
          { id: "ai-building", label: "성경공부 가이드" },
        ]}
      >
        <section id="ai-services" className="pb-8">
          <SectionHeader title="QT 나눔" text="형제자매들이 매일 아침 묵상한 말씀을 나눕니다." border />
          <div className="mx-auto max-w-[1280px] px-gutter">
            <div className="flex flex-col-reverse gap-4 border-b border-zinc-200 md:flex-row md:items-center md:justify-between">
              <ul className="-mx-gutter flex h-[50px] items-center gap-6 overflow-x-auto px-gutter [scrollbar-width:none] md:mx-0 md:h-[60px] md:px-0 [&::-webkit-scrollbar]:hidden">
                {["전체", ...categories].map((item) => {
                  const value = item === "전체" ? "" : item;
                  const active = value === category;
                  return (
                    <li key={item} className="shrink-0">
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => go({ category: value })}
                        className={`relative h-[50px] text-base transition-colors duration-200 md:h-[60px] md:text-lg ${active ? "font-bold text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-ink" : "text-zinc-500 hover:text-ink"}`}
                      >
                        {item}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <form role="search" className="flex h-11 w-full items-center rounded-lg bg-zinc-100 pl-4 md:w-[240px]" onSubmit={(event) => { event.preventDefault(); go({ keyword: draft.trim() }); }}>
                <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="말씀 검색" aria-label="말씀 검색" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
                <button type="submit" aria-label="검색" className="grid size-9 place-items-center"><span aria-hidden="true">⌕</span></button>
              </form>
            </div>
            {filtered.length ? (
              <ul className="grid gap-x-6 gap-y-10 pt-10 xl:grid-cols-3">
                {filtered.slice((page - 1) * CARD_PAGE, page * CARD_PAGE).map((item) => (
                  <li key={item.id}>
                    <a href={item.href} className="group block">
                      <MediaSlot src={item.image} label={item.category} ratio="379/252" className="rounded-2xl" mediaClassName="transition-transform duration-200 ease-smooth can-hover:group-hover:scale-105" />
                      <p className="mt-5 text-sm text-zinc-500">{item.category}</p>
                      <p className="mt-2 line-clamp-2 text-lg font-bold leading-snug group-hover:underline">{item.title}</p>
                      <time className="mt-3 block text-sm text-zinc-400">{item.date}</time>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-20 text-center text-zinc-500">검색 결과가 없습니다.</p>
            )}
            <Pagination current={Math.min(page, cardTotal)} total={cardTotal} hrefFor={(value) => build({ page: String(value) }, "#ai-services")} label="QT 나눔 페이지" />
          </div>
        </section>

        <section id="ai-building" className="pb-8">
          <SectionHeader title="성경공부 가이드" text="QT, 암송, 소그룹 인도까지 — 네비게이토 도구를 활용하는 방법입니다." />
          <div className="mx-auto max-w-[1280px] px-gutter">
            <ul className="border-t border-ink">
              {building.slice((bldPage - 1) * ROW_PAGE, bldPage * ROW_PAGE).map((item) => (
                <li key={item.id} className="border-b border-zinc-200">
                  <a href={item.href} className="group flex min-h-[144px] items-center gap-6 py-5 md:min-h-[200px] xl:min-h-[250px] xl:gap-8 xl:py-8">
                    <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-row md:gap-8">
                      <time className="shrink-0 text-sm text-zinc-500 md:w-40 md:text-base xl:w-52">{item.date}</time>
                      <p className="line-clamp-2 text-base font-bold leading-snug group-hover:underline md:text-lg xl:max-w-[480px] xl:text-xl">{item.title}</p>
                    </div>
                    <MediaSlot src={item.image} label={item.category} className="hidden aspect-[278/186] w-[200px] shrink-0 rounded-xl md:block xl:w-[278px]" mediaClassName="transition-transform duration-200 ease-smooth can-hover:group-hover:scale-[1.08]" />
                  </a>
                </li>
              ))}
            </ul>
            <Pagination current={Math.min(bldPage, rowTotal)} total={rowTotal} hrefFor={(value) => build({ bldPage: String(value) }, "#ai-building")} label="성경공부 가이드 페이지" />
          </div>
        </section>
      </AnchorSection>
    </main>
  );
}

function SectionHeader({ title, text, border = false }: { title: string; text: string; border?: boolean }) {
  return (
    <div className={`py-14 xl:py-24 ${border ? "border-t border-zinc-200" : ""}`}>
      <div className="mx-auto grid max-w-[1280px] gap-3 px-gutter lg:grid-cols-2 lg:gap-8">
        <h2 className="text-section-title">{title}</h2>
        <p className="text-base text-zinc-600 xl:text-lg">{text}</p>
      </div>
    </div>
  );
}
