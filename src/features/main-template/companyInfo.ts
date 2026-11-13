import { withSampleImages } from "./sampleImages";
import type { AffiliatesContent, ContactContent, PartnershipContent } from "@/types/pageTemplates";

/** /about/recommendations, /about/contact and /faq with the text of navigators-seoulc.org
 * (sub1 목사님 추천 · Contact us, sub4 QnA). The two personal phone numbers of the original
 * contact page are left out until it is decided whether to publish them. */
export const affiliates: AffiliatesContent = withSampleImages({
  title: "목사님 추천",
  items: [
    {
      name: "빌리 그래함 목사님",
      tagline: "네비게이토 창시자 도슨 트로트맨의 친구",
      description: "빌리 그래함 목사님은 네비게이토 창시자 도슨의 장례식 예배를 인도할 만큼 도슨과 절친한 친구 사이였습니다. 그는 선교 여행을 다닐 때 네비게이토가 선교 여행지에 있는지 물어보셨다고 합니다. 전도 집회를 통해 예수님을 영접한 사람들을 네비게이토에서 양육하고 도와줄 수 있기 때문이었습니다. 그는 도슨 트로트맨에 대해 “평생 누군가를 붙들어 주다가 간 사람”이라고 했습니다.",
      href: "#",
      image: { label: "빌리 그래함 목사님" },
    },
    {
      name: "옥한흠 목사님",
      tagline: "미국 유학시절 네비게이토에서 제자 사역을 배움",
      description: "옥한흠 목사님께서는 미국 유학시절 네비게이토에서 제자 사역을 배우셨습니다. “네비게이토에만 가면 애들이 달라져버려요. 눈이 반짝반짝해요. 복음이 살아있어요!”",
      href: "#",
      image: { label: "옥한흠 목사님" },
    },
    {
      name: "장경동 목사님",
      tagline: "대전 중문교회",
      description: "오랫동안 한국 교회에 있어서 대학생들을 위해 아주 열심히 잘 해줬어요. 보통 훌륭한 일이 아니지. 교회에서 대학생들에게 다 못 해 준 부분들을 너무 잘 해줘서 고마워. 네비게이토는 성경공부를 중심으로 하잖아. 막상해 보니까 훨씬 유용해. — 장경동 목사님 네비게이토 추천사 中",
      href: "#",
      image: { label: "장경동 목사님" },
    },
    {
      name: "박찬호 목사님",
      tagline: "백석대 기독교학부",
      description: "부목사 시절 네비게이토에서 3년간 양육을 받았습니다. 네비게이토의 장점은 신앙을 잘 세워준다는 것입니다. 제대로 된 제자로서의 삶을 맛보기 원한다면 네비게이토를 추천합니다. 만약 불신자들이 기독교가 무엇인지 제대로 알고, 복음의 핵심적 가치에 접근하기 원한다면 네비게이토에 가는 것이 좋다고 생각합니다.",
      href: "#",
      image: { label: "박찬호 목사님" },
    },
    {
      name: "명성훈 목사님",
      tagline: "성시교회",
      description: "중앙대학교 네비게이토와 성경공부를 강력히 추천합니다. 저도 대학시절에 네비게이토를 통해 주님을 다시 한 번 새롭게 만났고 정확한 복음을 제시 받았습니다. 무엇보다 일대일 및 소그룹 훈련을 통해서 예수 그리스도의 제자가 되는 삶에 아주 결정적인 영향을 받았습니다.",
      href: "#",
      image: { label: "명성훈 목사님" },
    },
  ],
});

export const contact: ContactContent = {
  title: "Contact",
  groups: [
    { title: "비전관", map: true, entries: [{ name: "서울 C지구 비전관", address: "서울시 동작구 상도로 39가길 1 (상도1동 458-2)", addressEn: "1, Sangdo-ro 39ga-gil, Dongjak-gu, Seoul" }] },
    { title: "캠퍼스", entries: [{ name: "중앙대 동아리방", address: "중앙대학교 107관(학생회관) 1층" }] },
  ],
  support: {
    title: "채널",
    cards: [
      { title: "유튜브", text: "“네비게이토 서울C 중앙대”", href: "https://www.youtube.com/channel/UCplE5M_H4uWxQNuo5JyKpYQ" },
      { title: "인스타그램", text: "중앙대 기독교동아리 네비게이토", href: "https://www.instagram.com/nav_cau" },
      { title: "자주 묻는 질문", text: "처음 오시는 분들이 많이 묻는 질문들", href: "/faq" },
    ],
  },
};

export const partnership: PartnershipContent = {
  title: "자주 묻는 질문",
  sections: [
    {
      title: "QnA",
      description: "처음 오시는 분들이 많이 묻는 질문들입니다.",
      cards: [
        { title: "안 믿는데 성경공부는 할 수 있나요?", text: "진리를 알고 싶은 귀한 마음이네요. 환영합니다. 네비게이토 성경공부는 하나님과 성경에 관심있는 사람이라면 누구든지 함께 할 수 있습니다. 수준별 소그룹으로 진행되기 때문에 하나님에 대해 배경 지식이 없는 분들도 얼마든지 시작할 수 있습니다.", href: "/ministry/bible-study" },
        { title: "대학생인데 학업과 병행을 잘 할 수 있나요?", text: "네비게이토는 믿음생활 뿐 아니라 개인의 삶을 충실하고 성실하게 살기 위해 많은 노력을 하고 있습니다. 하나님을 의뢰하며 공부하는 즐거움을 함께 느껴보면 좋겠어요. 이 교제에서는 서로 공부를 잘 하도록 격려해주고 도와주고 있습니다. 많은 학과 수석과 장학생을 배출하여, 네비게이토가 공부 잘 하는 애들만 들어가는 동아리냐는 얘기를 들은 적도 있답니다.", href: "/ministry/campus" },
        { title: "직장인인데 캠퍼스 선교단체 함께 할 수 있나요?", text: "물론입니다. 네비게이토 서울C지구가 중앙대에서 기독교 동아리로 활동하고 있지만 그렇다고 캠퍼스에만 국한된 곳은 아닙니다. 이미 많은 직장인들이 함께 신앙생활을 해 나가고 있습니다. 하나님과 성경을 알고자 하는 분이라면 누구든지 와서 함께 할 수 있습니다.", href: "/ministry/workplace" },
      ],
    },
    {
      title: "질문해주세요!",
      description: "인스타그램 DM을 통해 문의사항을 남겨주세요. 확인하고 정성껏 답을 드리겠습니다.",
      cards: [{ title: "인스타그램 DM", text: "@nav_cau", href: "https://www.instagram.com/nav_cau" }],
    },
  ],
  cta: { label: "인스타그램으로 질문하기", href: "https://www.instagram.com/nav_cau" },
};
