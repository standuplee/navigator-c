import type { ServiceDirectoryContent, ServiceDirectoryItem, ServiceDirectoryLink } from "@/types/pageTemplates";
import { Reveal } from "./blocks/Reveal";
import { AnchorSection } from "./blocks/AnchorNav";

const CHOSEONG = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const BASE: Record<string, string> = { ㄲ: "ㄱ", ㄸ: "ㄷ", ㅃ: "ㅂ", ㅆ: "ㅅ", ㅉ: "ㅈ" };

/** Index heading for the 가나다순 view: Hangul initial consonant (double consonants folded),
 * Latin capital letter, or "0-9". */
function initialOf(name: string) {
  const code = name.charCodeAt(0);
  if (code >= 0xac00 && code <= 0xd7a3) {
    const initial = CHOSEONG[Math.floor((code - 0xac00) / 588)];
    return BASE[initial] ?? initial;
  }
  const first = name[0].toUpperCase();
  return /[A-Z]/.test(first) ? first : "0-9";
}

const groupRank = (title: string) => (/^[ㄱ-ㅎ]$/.test(title) ? 0 : /^[A-Z]$/.test(title) ? 1 : 2);

function groupsFor(content: ServiceDirectoryContent, mode: "topic" | "alphabet") {
  if (mode === "topic") {
    return content.categories
      .map((category) => ({ title: category, items: content.items.filter((item) => item.category === category) }))
      .filter((group) => group.items.length);
  }
  const map = new Map<string, ServiceDirectoryItem[]>();
  [...content.items]
    .sort((a, b) => a.name.localeCompare(b.name, "ko"))
    .forEach((item) => {
      const key = initialOf(item.name);
      map.set(key, [...(map.get(key) ?? []), item]);
    });
  return [...map.entries()]
    .map(([title, items]) => ({ title, items }))
    .sort((a, b) => groupRank(a.title) - groupRank(b.title) || a.title.localeCompare(b.title, "ko"));
}

function LinkIcon({ link, name }: { link: ServiceDirectoryLink; name: string }) {
  const label = link.kind === "home" ? `${name} 홈페이지 (새 창 열림)` : `${name} 앱 다운로드 (새 창 열림)`;
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener"
      aria-label={label}
      className="grid size-7 place-items-center rounded-full border border-zinc-200 text-zinc-600 transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white"
    >
      {link.kind === "home" ? (
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2.5 7 8 2.5 13.5 7v6.5h-4v-4h-3v4h-4z" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4.5" y="1.5" width="7" height="13" rx="1.5" />
          <path d="M7 12h2" strokeLinecap="round" />
        </svg>
      )}
    </a>
  );
}

/** /service/all (주제별) and /service/allString (가나다순), PRD §7.3 directory: per group a
 * title column (368px, 26px) beside a two-column list of rows (380px, 69px with a bottom rule):
 * service name (20px, links to its page when there is one) + outbound icon buttons. Below
 * 1024px the title sits above a one- (mobile) or two-column (tablet) list. */
export function ServiceDirectoryPage({ content, mode }: { content: ServiceDirectoryContent; mode: "topic" | "alphabet" }) {
  const groups = groupsFor(content, mode);
  return (
    <AnchorSection title={content.title} items={groups.map((group, index) => ({ id: `dir-group-${index}`, label: group.title }))}>
    <main className="pb-20 pt-6 md:pt-12 xl:pb-32 xl:pt-24">
      {groups.map((group, index) => (
        <section key={group.title} id={`dir-group-${index}`} aria-labelledby={`dir-${group.title}`} className="mx-auto max-w-[1280px] px-gutter pt-8 first:pt-0 lg:pt-20">
          <Reveal className="lg:grid lg:grid-cols-[368px_1fr] lg:gap-8">
            <h2 id={`dir-${group.title}`} className="text-xl font-semibold text-ink lg:text-[26px]">{group.title}</h2>
            <ul className="mt-5 grid md:grid-cols-2 md:gap-x-6 lg:mt-0 lg:-translate-y-5 lg:grid-cols-[repeat(2,380px)]">
              {group.items.map((item) => (
                <li key={item.name} className="flex min-h-[65px] items-center justify-between gap-4 border-b border-[#e9eaeb] py-5 lg:min-h-[69px]">
                  {item.href && item.href !== "#" ? (
                    <a href={item.href} className="text-base font-semibold text-ink underline-offset-4 hover:underline lg:text-xl">{item.name}</a>
                  ) : (
                    <h3 className="text-base font-semibold text-ink lg:text-xl">{item.name}</h3>
                  )}
                  {item.links && item.links.length > 0 && (
                    <div className="flex shrink-0 gap-2">
                      {item.links.map((link) => (
                        <LinkIcon key={link.kind} link={link} name={item.name} />
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      ))}
    </main>
    </AnchorSection>
  );
}
