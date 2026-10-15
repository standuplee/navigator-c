import type { NarrativeContent } from "@/types/pageTemplates";

/** Placeholder narrative content for /company/about. Generic chronology — no real
 * company history or identifying facts. */
export const narrative: NarrativeContent = {
  heroTitle: "작은 질문에서 시작된 이야기",
  heroDescription: "우리는 사람들의 일상에 필요한 기술을 만드는 일을 계속해 왔습니다.",
  chapters: [
    { era: "시작", title: "작은 팀, 큰 질문", description: "몇 명의 엔지니어가 모여 '더 쉬운 탐색'이라는 질문 하나로 첫 서비스를 만들었습니다." },
    { era: "성장", title: "일상 속으로", description: "검색을 넘어 광고, 커머스, 지도까지 — 사람들의 하루 곳곳에 기술을 연결했습니다." },
    { era: "확장", title: "기술의 다음 단계", description: "AI와 클라우드 인프라에 투자하며, 더 똑똑하고 개인화된 경험을 설계하기 시작했습니다." },
    { era: "지금", title: "함께 만드는 미래", description: "파트너와 개발자 커뮤니티와 함께, 더 많은 가능성을 연결하는 플랫폼으로 나아가고 있습니다." },
  ],
  stats: [
    { label: "서비스 영역", value: "4+" },
    { label: "파트너사", value: "1,200+" },
    { label: "누적 이용자", value: "수천만" },
    { label: "설립", value: "플레이스홀더" },
  ],
  facts: [
    { label: "회사명", value: "NOVA" },
    { label: "설립", value: "플레이스홀더 연도" },
    { label: "본사", value: "플레이스홀더 주소" },
    { label: "주요 서비스", value: "검색 · 광고 · 커머스 · 지도" },
  ],
};
