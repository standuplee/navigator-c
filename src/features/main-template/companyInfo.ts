import type { AffiliatesContent, ContactContent, PartnershipContent } from "@/types/pageTemplates";

/** Placeholder content for /company/affiliates, /company/contact, /company/partnership
 * (PRD §7.6). Counts follow the reference (5 affiliates, HQ + 5 offices + 3 support cards,
 * 7 + 5 partnership cards); copy is neutral. */
export const affiliates: AffiliatesContent = {
  title: "주요 계열사",
  items: ["클라우드", "카메라·영상", "기술 연구", "콘텐츠", "금융"].map((area, index) => ({
    name: `계열사 ${index + 1}`,
    tagline: `${area} 분야를 이끄는 계열사`,
    description: `${area} 분야에서 어떤 일을 하는지, 어떤 서비스를 운영하는지 두세 문장으로 소개하는 자리입니다. 실제 내용은 어드민에서 입력합니다.`,
    href: "#",
    image: { label: `계열사 ${index + 1}` },
  })),
};

export const contact: ContactContent = {
  title: "Contact",
  groups: [
    { title: "본사", map: true, entries: [{ name: "본사", address: "주소를 입력하는 자리", addressEn: "Address in English", tel: "000-0000-0000" }] },
    {
      title: "주요 사무소",
      entries: Array.from({ length: 5 }, (_, index) => ({ name: `사무소 ${index + 1}`, address: "주소를 입력하는 자리", addressEn: "Address in English", tel: "000-0000-0000" })),
    },
  ],
  support: {
    title: "고객센터",
    cards: [
      { title: "서비스 문의", text: "서비스 이용에 대해 궁금한 점을 문의하세요.", href: "#" },
      { title: "회원 정보 관리", text: "회원 정보를 쉽고 편리하게 관리하세요.", href: "#" },
      { title: "신고 센터", text: "유해 게시물이나 권리 침해를 신고하세요.", href: "#" },
    ],
  },
};

export const partnership: PartnershipContent = {
  title: "제휴 제안",
  sections: [
    {
      title: "함께할 새로운 제휴 제안을 기다립니다",
      description: "제휴 분야를 선택하고 제안 내용을 보내 주세요.",
      cards: ["서비스·콘텐츠", "광고", "미디어", "브랜딩·마케팅", "기술·API", "공공기관", "비즈니스"].map((name) => ({
        title: `${name} 제휴`,
        text: `${name} 분야 제휴 제안`,
        href: "/company/contact",
      })),
    },
    {
      title: "계열사와 함께할 제휴 제안을 기다립니다",
      description: "계열사별 제휴 창구로 바로 연결됩니다.",
      cards: Array.from({ length: 5 }, (_, index) => ({ title: `계열사 ${index + 1}`, text: "계열사 제휴 창구", href: "#" })),
    },
  ],
  cta: { label: "제휴 문의하기", href: "/company/contact" },
};
