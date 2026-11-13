import type { TechDetailContent } from "@/types/pageTemplates";
import { pressReleaseList } from "./pressReleases";

/** Activity pages (/fellowship/*) on the dark tech-detail template, with the text of
 * navigators-seoulc.org sub3 (우리의 활동). Section ids are the in-page anchors the content
 * sheet uses (#sunday, #grace-spring …). Edited later in the admin (activity-pages). */

const related = pressReleaseList.slice(0, 6).map((item) => ({ id: item.id, title: item.title, href: item.href, date: item.date, category: item.category }));

const photo = (label: string) => ({ label });

export type TechDetailKey = "gatherings" | "leisure" | "discipleship" | "events";

export const techDetails: Record<TechDetailKey, TechDetailContent> = {
  gatherings: {
    title: "정기모임",
    keycopy: "주일 오후, 화요일 저녁 — 말씀으로 함께 모입니다",
    heroMedia: { kind: "image", label: "주일교제" },
    sections: [
      {
        id: "sunday",
        title: "주일교제",
        description: "주일 오후 2:30부터 말씀 배우는 시간을 갖고 있습니다.",
        items: [
          { title: "1부 : 찬양과 은혜로운 간증", description: "네비게이토 형제자매들의 예수님을 믿고 말씀을 따라 살며 삶에서 누린 은혜와 축복들을 들을 수 있습니다.", image: photo("1부 찬양과 간증") },
          { title: "2부 : 그룹별 성경공부", description: "성경공부를 통해 예수 그리스도와 복음, 성경에 대해 잘 알게 될 뿐만 아니라 주님의 제자와 일꾼으로 성장하게 됩니다. 네비게이토 성경공부 교재는 한국 교회의 70% 이상이 사용하고 있으며 대학 채플에서도 많이 사용되고 있습니다.", image: photo("2부 그룹별 성경공부"), links: [{ label: "성경공부 소개", href: "/ministry/bible-study" }] },
        ],
      },
      {
        id: "grace-spring",
        title: "은혜의 샘",
        description: "매주 화요일 오후 7시. 네비게이토가 아니어도 편하게 오실 수 있는 열린 모임입니다.",
        items: [
          { title: "복음서 스터디", description: "복음서 스터디를 통해 좋으신 예수님과 하나님의 사랑, 은혜를 나누는 시간입니다. 하나님의 은혜의 샘물을 마시며 영혼이 살아나는 시간이지요.", image: photo("은혜의 샘") },
        ],
      },
      {
        id: "online",
        title: "온라인교제",
        description: "주일 1부는 유튜브 라이브 방송으로, 2부는 그룹 화상으로 성경공부를 해 왔습니다.",
        wideImages: [photo("온라인교제 1"), photo("온라인교제 2")],
        items: [
          { title: "주님과의 거리는 더 가깝게", description: "물리적 거리 두기는 하여도 주님과의 거리는 더욱 가까워져야 하기에 네비게이토 형제자매들은 여느 때보다 뜨겁게 사랑과 위로와 은혜를 나누는 교제를 했고, 개인 질병과 대면이 어려운 때에는 온라인으로도 함께 함으로 교제에 더욱 힘쓰고 있습니다.", image: photo("온라인 성경공부"), links: [{ label: "유튜브 채널", href: "/media/channels" }] },
        ],
      },
    ],
    cta: { title: "주일교제에 함께하고 싶다면", description: "주일 오후 2:30, 상도동 비전관에서 만나요.", href: "/about/contact", ctaLabel: "오시는 길" },
    related,
  },
  discipleship: {
    title: "양육·훈련",
    keycopy: "한 사람이 그리스도 안에서 성숙한 제자가 되도록",
    heroMedia: { kind: "image", label: "개인교제" },
    sections: [
      {
        id: "one-on-one",
        title: "개인교제",
        description: "예수님께서 제자들에게, 바울이 디모데에게 1:1양육을 하셨던 것처럼 네비게이토는 1대1 양육을 통해 한 사람이 그리스도 안에서 거듭나고 성숙한 그리스도인이 되도록 도와주고 있습니다.",
        items: [
          { title: "삶의 모든 영역을 말씀으로", description: "믿음 성장 뿐 아니라 삶의 여러 영역들도 말씀으로 도와주어 많은 축복을 누리고 영육간에 성장하는 크리스찬이 되도록 해줍니다.", image: photo("1:1 양육") },
        ],
      },
      {
        id: "couples",
        title: "커플스터디",
        description: "네비게이토 커플스터디는 성경 말씀으로 주님 안에서 행복한 가정이 될 수 있도록 도움을 줍니다.",
        wideImages: [photo("커플스터디 1"), photo("커플스터디 2")],
        items: [
          { title: "위기를 넘어 서로를 붙들어 주는 가정", description: "이미 네비게이토 안의 수 많은 부부들이 커플스터디를 통해 가정의 어려움, 위기들을 잘 극복하고 이제는 서로 사랑하고 서로의 믿음을 붙들어 주고 있습니다.", image: photo("커플스터디") },
          { title: "자녀들도 함께 자라는 믿음", description: "가정의 자녀들도 부모들의 변화를 통해 행복해지고 하나님을 향한 사랑과 믿음도 자라고 있습니다.", image: photo("가정") },
        ],
      },
      {
        id: "training",
        title: "Training Program",
        description: "방학기간동안 믿음을 키울 수 있는 제자훈련 프로그램입니다. 여름은 STP(Summer Training Program), 겨울은 WTP(Winter Training Program).",
        cards: [
          { title: "성경 1독", description: "성경 1독의 꿈을 이룹니다" },
          { title: "기도", description: "기도로 주님을 깊이 만납니다" },
          { title: "책자공부", description: "은혜로운 책자공부를 합니다" },
          { title: "자기계발", description: "스포츠, 영어/한자 스터디" },
        ],
        items: [
          { title: "주님을 더 사랑하는 제자로", description: "이를 통해 영육간에 많은 진보를 이루는, 주님을 더 사랑하는 제자가 된 자신의 모습을 만날 수 있습니다. 캠퍼스 형제자매들은 방학기간 화, 목요일에, 직장인들은 방학기간 화요일 저녁에 진행됩니다.", image: photo("Training Program") },
        ],
      },
    ],
    cta: { title: "1:1 양육이 궁금하다면", description: "인스타그램 DM으로 편하게 물어보세요.", href: "/faq", ctaLabel: "자주 묻는 질문" },
    related,
  },
  events: {
    title: "행사",
    keycopy: "바다와 산에서, 크리스마스 만찬에서 — 함께 누리는 은혜",
    heroMedia: { kind: "image", label: "여름 캠핑 수양회" },
    sections: [
      {
        id: "summer-retreat",
        title: "여름 캠핑 수양회",
        description: "뜨거운 아스팔트 도시를 벗어나, 아름다운 바닷가와 청량한 산에서 하나님을 만난다!",
        wideImages: [photo("캠핑 수양회 1"), photo("캠핑 수양회 2"), photo("캠핑 수양회 3")],
        items: [
          { title: "휴가지에서 말씀을 배우는 은혜", description: "캠핑수양회는 휴가지에서 말씀을 배우는 은혜가 넘치고 재미있고 풍성한 시간입니다. 지치는 수련회가 아니라, 풍성해지고 특별하고 놀라운 시간입니다.", image: photo("수양회 말씀") },
          { title: "매년 손꼽아 기다리는 시간", description: "방학 때 특별한 여행을 기대하는 캠퍼스 학생, 고된 직장생활로 휴식이 필요한 직장인 모두 이 캠핑수양회를 매년 손꼽아 기다립니다.", image: photo("수양회 캠핑") },
        ],
      },
      {
        id: "christmas-eve",
        title: "이브파티",
        description: "네비게이토 형제자매들은 매년 크리스마스 때 마다 예수님의 탄생을 축하하는 정말 멋진 ‘파티’를 열고 있습니다.",
        wideImages: [photo("이브파티 1"), photo("이브파티 2")],
        items: [
          { title: "특별한 만찬", description: "형제자매들이 직접 만든, 어디에서도 맛볼 수 없는 특별한 만찬!", image: photo("이브파티 만찬") },
          { title: "공연과 찬양", description: "형제자매들의 숨은 끼가 마음 껏 발휘되는 수준 높은 공연, 찬양, 밴드, 워십댄스, 스킷, 성극! 우리 함께 예수님의 탄생을 축하해요.", image: photo("이브파티 공연") },
        ],
      },
    ],
    cta: { title: "다음 행사가 궁금하다면", href: "/news/schedule", ctaLabel: "모임 일정 보기" },
    related,
  },
  leisure: {
    title: "함께 즐기기",
    keycopy: "그리스도인의 삶은 딱딱하지 않습니다",
    heroMedia: { kind: "image", label: "Enjoy" },
    sections: [
      {
        id: "sports",
        title: "스포츠",
        description: "축구, 농구, 탁구, 피트니스, 웨이트!",
        wideImages: [photo("스포츠 1"), photo("스포츠 2")],
        items: [
          { title: "함께할 땐 할 수 있습니다", description: "혼자서는 못하지만 함께할 땐 할 수 있습니다. 네비게이토 형제자매들은 정기적인 스포츠 교제 시간을 통해서 영적, 육적으로 건강한 삶을 누리고 있습니다.", image: photo("스포츠 교제") },
          { title: "다른 대학과의 교류", description: "다른 대학과의 스포츠 교제를 통해서 여러 대학과의 교류, 교제를 하고 서로 믿음의 격려와 도전을 받고 있습니다.", image: photo("대학 교류") },
        ],
      },
      {
        id: "enjoy",
        title: "Enjoy",
        description: "오히려 하나님 안에서 더 자유하고 즐겁습니다. 놀 때 하나님이 동행하시면 얼마나 즐거울까요?",
        wideImages: [photo("Enjoy 1"), photo("Enjoy 2"), photo("Enjoy 3")],
        items: [
          { title: "놀 때도 확실하게", description: "빛 가운데 거하는 네비게이토 형제자매들은 놀 때도 확실하게 놉니다. 에버랜드를 가도 1박 2일 하면서 재밌는 놀이기구 다 타고, MT도 술없이 완전 즐겁고... 서울 도심 속에서도 예쁜 꽃이 피어있는 곳으로 피크닉 가는 등 인생의 여유와 즐거움을 놓치지 않습니다.", image: photo("Enjoy") },
        ],
      },
    ],
    cta: { title: "우리 함께 해요!", description: "궁금한 점은 인스타그램 DM으로 남겨주세요.", href: "/faq", ctaLabel: "자주 묻는 질문" },
    related,
  },
};
