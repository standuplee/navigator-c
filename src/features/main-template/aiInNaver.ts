import type { NewsCardItem } from "@/types/mainTemplate";

/** Placeholder lists for /media/aiInNaver (PRD §7.10): "AI in services" cards and
 * "how we build AI" articles, each with its own pagination. Neutral copy. */
const card = (prefix: "ai" | "bld", index: number, category: string, title: string, date: string, tags: string[]): NewsCardItem => ({
  id: `${prefix}${index}`,
  category,
  title,
  date,
  tags,
  href: prefix === "ai" ? `/media/aiInNaver/naverAiDetail?seq=${prefix}${index}` : `/media/aiInNaver/buildingAiDetail?seq=${prefix}${index}`,
  tone: "light",
});

export const aiServiceCategories = ["검색", "쇼핑", "지도", "콘텐츠", "업무"];

export const aiServiceList: NewsCardItem[] = [
  card("ai", 1, "검색", "검색 경험 위에 AI를 더한 요약 브리핑", "2026.11.03", ["검색", "요약"]),
  card("ai", 2, "쇼핑", "취향을 이해하는 쇼핑 가이드", "2026.10.21", ["쇼핑"]),
  card("ai", 3, "지도", "AI로 더 정확해진 장소 추천", "2026.10.02", ["지도"]),
  card("ai", 4, "콘텐츠", "창작자를 돕는 AI 편집 도구", "2026.09.18", ["콘텐츠"]),
  card("ai", 5, "업무", "회의록을 정리해 주는 업무 비서", "2026.09.01", ["업무"]),
  card("ai", 6, "검색", "대화형 검색의 다음 단계", "2026.08.14", ["검색"]),
  card("ai", 7, "쇼핑", "리뷰를 요약해 보여주는 AI", "2026.07.30", ["쇼핑", "요약"]),
  card("ai", 8, "콘텐츠", "AI 자막과 번역", "2026.07.02", ["콘텐츠"]),
];

export const buildingAiList: NewsCardItem[] = [
  card("bld", 1, "안전", "AI 안전성 점검 보고서", "2026.10.30", ["안전"]),
  card("bld", 2, "원칙", "신뢰할 수 있는 AI를 위한 원칙", "2026.09.12", ["원칙"]),
  card("bld", 3, "연구", "AI 평가 방법론 공개", "2026.08.08", ["연구"]),
  card("bld", 4, "협력", "학계와 함께하는 AI 윤리 연구", "2026.06.20", ["협력"]),
  card("bld", 5, "안전", "레드팀 운영 결과 공유", "2026.05.15", ["안전"]),
];
