/** Sample photos from navigators-seoulc.org (public/sample/, downloaded by
 * scripts/download-navigators-assets.py) filled into the mock content's empty image slots,
 * picked by topic from the surrounding titles and labels. Admin content is never touched:
 * only the fallback modules in this folder call withSampleImages, and the seed uploads these
 * files to the media library (scripts/seedContent.ts). */

const files = (prefix: string, count: number, ext = "jpg") =>
  Array.from({ length: count }, (_, index) => `/sample/${prefix}-${index + 1}.${ext}`);

export const samplePhotos = {
  hero: files("hero", 3, "png"),
  tabBible: files("tab-bible", 2, "png"),
  tabPrayer: files("tab-prayer", 2, "png"),
  tabDisciple: files("tab-disciple", 2, "png"),
  about: files("about", 4),
  vision1f: files("vision-1f", 2),
  vision2f: files("vision-2f", 8),
  vision34f: files("vision-34f", 6),
  bible: files("bible", 2),
  campus: files("campus", 4),
  missions: files("missions", 7),
  contrib: files("contrib", 9, "png"),
  sunday: files("sunday", 2, "png"),
  online: files("online", 2),
  oneonone: files("oneonone", 3),
  grace: files("grace", 1),
  couples: files("couples", 6),
  training: files("training", 3),
  retreat: files("retreat", 8),
  eve: files("eve", 5),
  sports: files("sports", 2),
  enjoy: files("enjoy", 14),
};

type Pool = keyof typeof samplePhotos;

const vision = [...samplePhotos.vision1f, ...samplePhotos.vision2f, ...samplePhotos.vision34f];
const general = [...samplePhotos.about, ...samplePhotos.campus, ...samplePhotos.retreat, ...samplePhotos.enjoy, ...samplePhotos.couples];

/** First matching rule wins, so the specific topics come first. */
const RULES: [RegExp, string[]][] = [
  [/1층|예배실/, samplePhotos.vision1f],
  [/2층|카페|잔잔한/, samplePhotos.vision2f],
  [/3·4층|라이브러리|주님 품|옥상|기도실|지하|탁구장|피트니스 공간/, samplePhotos.vision34f],
  [/비전관/, vision],
  [/서울C지구|중앙대/, samplePhotos.campus],
  [/모이는 곳|공간/, vision],
  [/예화|도구|교재|암송카드|전도지|성경색인|말씀의 손|기도의 손|Wheel|V Hand|교계|경건의 시간/, samplePhotos.contrib],
  [/이브|크리스마스|성탄/, samplePhotos.eve],
  [/수양회|캠핑|바닷가|수련회|자연/, samplePhotos.retreat],
  [/커플|가정|결혼/, samplePhotos.couples],
  [/개인교제|1:1|1대1|양육|멘토|선배/, samplePhotos.oneonone],
  [/은혜의 샘|복음서|열린 모임/, samplePhotos.grace.concat(samplePhotos.bible)],
  [/온라인|유튜브|라이브|채널|인스타/, samplePhotos.online],
  [/Training|STP|WTP|훈련|암송|1독/, samplePhotos.training],
  [/해외|선교|캄보디아|영국|멕시코|미국|세계/, samplePhotos.missions],
  [/스포츠|축구|농구|운동|체육/, samplePhotos.sports],
  [/Enjoy|MT|피크닉|에버랜드|함께 즐기기|봉사|섬김/, samplePhotos.enjoy],
  [/캠퍼스|대학|새내기|신입생|새가족|동아리|중앙대|학생|장학금/, samplePhotos.campus],
  [/주일|찬양|예배|간증/, samplePhotos.sunday.concat(samplePhotos.about)],
  [/성경공부|소그룹|말씀|묵상|사역/, samplePhotos.bible.concat(samplePhotos.about)],
];

const cursor = new Map<string[], number>();

/** A photo for the given text; repeated calls for the same topic rotate through its pool. */
export function sampleFor(text: string): string {
  const pool = RULES.find(([pattern]) => pattern.test(text))?.[1] ?? general;
  const index = cursor.get(pool) ?? 0;
  cursor.set(pool, index + 1);
  return pool[index % pool.length];
}

export const samplePick = (pool: Pool, index = 0) => samplePhotos[pool][index % samplePhotos[pool].length];

type AnyRecord = Record<string, unknown>;
const MEDIA_KEYS = new Set(["src", "label", "alt", "kind", "caption", "downloadHref", "tone", "wide"]);
const TEXT_KEYS = ["title", "label", "name", "alt", "category", "eyebrow", "year", "subTitle"];

const own = (record: AnyRecord) =>
  [...TEXT_KEYS.map((key) => record[key]), ...(Array.isArray(record.tags) ? record.tags : [])]
    .filter((value): value is string => typeof value === "string")
    .join(" ");

/** Media objects ({ src?, label?, kind? }, photos, tiles, article images). */
const isMedia = (record: AnyRecord) => {
  const keys = Object.keys(record);
  return keys.length > 0 && keys.every((key) => MEDIA_KEYS.has(key)) && ("label" in record || "alt" in record || "kind" in record || "src" in record);
};

/** Cards that carry a plain `image` URL. */
const wantsImage = (record: AnyRecord) =>
  ("href" in record && "category" in record && "title" in record && record.kind !== "text") || // news cards
  ("seq" in record && "category" in record && "image" in record) || // stories
  ("year" in record && "title" in record && "description" in record) || // about timeline / lineup items
  ("eyebrow" in record && "title" in record) || // about card groups
  "feature" in record || // about lineup panels
  "logoText" in record; // about info

/** Fills every empty image slot in mock content with a topical sample photo. */
export function withSampleImages<T>(value: T): T {
  const walk = (input: unknown, context: string): unknown => {
    if (Array.isArray(input)) return input.map((item) => walk(item, context));
    if (!input || typeof input !== "object") return input;
    const record = input as AnyRecord;
    const text = `${own(record)} ${context}`.trim();
    const out: AnyRecord = {};
    for (const [key, raw] of Object.entries(record)) out[key] = walk(raw, text);
    if (isMedia(record) && !record.src) {
      out.src = sampleFor(text);
      if (record.kind === "video") out.kind = "image";
    } else if (wantsImage(record) && !record.image) {
      out.image = sampleFor(text);
    }
    return out;
  };
  return walk(value, "") as T;
}
