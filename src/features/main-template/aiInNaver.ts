import type { NewsCardItem } from "@/types/mainTemplate";

/** Dummy lists for /media/aiInNaver (말씀 나눔): QT sharing cards and Bible study guides,
 * each with its own pagination. Placeholder copy. */
const card = (prefix: "ai" | "bld", index: number, category: string, title: string, date: string, tags: string[]): NewsCardItem => ({
  id: `${prefix}${index}`,
  category,
  title,
  date,
  tags,
  href: prefix === "ai" ? `/media/aiInNaver/naverAiDetail?seq=${prefix}${index}` : `/media/aiInNaver/buildingAiDetail?seq=${prefix}${index}`,
  tone: "light",
});

export const aiServiceCategories = ["복음서", "시편", "잠언", "서신서"];

export const aiServiceList: NewsCardItem[] = [
  card("ai", 1, "복음서", "마가복음 4장 — 씨 뿌리는 비유 앞에서", "2026.11.08", ["QT", "마가복음"]),
  card("ai", 2, "시편", "시편 23편 — 잔잔한 물가로", "2026.10.26", ["QT", "시편"]),
  card("ai", 3, "서신서", "빌립보서 4장 — 염려 대신 기도", "2026.10.12", ["QT", "빌립보서"]),
  card("ai", 4, "잠언", "잠언 3장 — 네 길을 인정하라", "2026.09.28", ["QT", "잠언"]),
  card("ai", 5, "복음서", "요한복음 15장 — 포도나무와 가지", "2026.09.14", ["QT", "요한복음"]),
  card("ai", 6, "서신서", "디모데후서 2장 — 부끄러울 것이 없는 일꾼", "2026.08.31", ["QT", "디모데후서"]),
  card("ai", 7, "시편", "시편 1편 — 복 있는 사람", "2026.08.17", ["QT", "시편"]),
  card("ai", 8, "복음서", "누가복음 10장 — 마르다와 마리아", "2026.08.03", ["QT", "누가복음"]),
];

export const buildingAiList: NewsCardItem[] = [
  card("bld", 1, "가이드", "처음 하는 QT, 이렇게 시작해 보세요", "2026.10.30", ["QT"]),
  card("bld", 2, "가이드", "말씀의 손으로 균형 있게 말씀 섭취하기", "2026.09.12", ["말씀의 손"]),
  card("bld", 3, "가이드", "암송카드 활용법", "2026.08.08", ["암송"]),
  card("bld", 4, "가이드", "기도의 손으로 드리는 기도", "2026.06.20", ["기도의 손"]),
  card("bld", 5, "가이드", "소그룹 성경공부 인도하기", "2026.05.15", ["성경공부"]),
];
