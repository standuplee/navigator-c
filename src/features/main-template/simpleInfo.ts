import type { SimpleInfoContent } from "@/types/pageTemplates";

/** Placeholder simple-info content for /company/contact, /brandGuide, /affiliates, /partnership. */
export const simpleInfoPages: Record<"contact" | "brandGuide" | "affiliates" | "partnership", SimpleInfoContent> = {
  contact: {
    title: "Contact",
    intro: "문의 성격에 맞는 창구로 연락해 주세요.",
    sections: [
      {
        heading: "오피스",
        cards: [
          { title: "본사", description: "플레이스홀더 주소 · 플레이스홀더 전화번호" },
          { title: "분당 사옥", description: "플레이스홀더 주소 · 플레이스홀더 전화번호" },
        ],
      },
      {
        heading: "고객지원",
        links: [
          { label: "고객센터", href: "#" },
          { label: "제휴 제안", href: "/company/partnership" },
          { label: "채용 문의", href: "#" },
        ],
      },
    ],
  },
  brandGuide: {
    title: "브랜드 리소스",
    intro: "로고와 컬러, 사용 가이드를 확인하세요.",
    sections: [
      {
        heading: "로고",
        cards: [
          { title: "기본 로고", description: "흰 배경에서 사용하는 기본 버전입니다." },
          { title: "다크 로고", description: "어두운 배경에서 사용하는 버전입니다." },
        ],
      },
      {
        heading: "다운로드",
        links: [
          { label: "로고 패키지 다운로드", href: "#" },
          { label: "브랜드 가이드라인 PDF", href: "#" },
        ],
      },
    ],
  },
  affiliates: {
    title: "주요 계열사",
    sections: [
      {
        heading: "계열사",
        cards: [
          { title: "클라우드", description: "클라우드 인프라와 플랫폼을 담당합니다." },
          { title: "파이낸셜", description: "결제와 금융 서비스를 담당합니다." },
          { title: "웹툰", description: "콘텐츠와 창작 플랫폼을 담당합니다." },
          { title: "랩스", description: "로보틱스·공간지능 연구를 담당합니다." },
        ],
      },
    ],
  },
  partnership: {
    title: "제휴 제안",
    intro: "함께 성장할 파트너를 찾고 있습니다.",
    sections: [
      {
        heading: "제휴 분야",
        body: "서비스 연동, 콘텐츠 제휴, 마케팅 협업 등 다양한 형태의 제휴를 제안해 주세요.",
        links: [{ label: "제휴 제안서 보내기", href: "#" }],
      },
    ],
  },
};
