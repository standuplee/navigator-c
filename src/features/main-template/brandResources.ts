import { withSampleImages } from "./sampleImages";
import type { ResourceConsent, ResourcePageContent } from "@/types/pageTemplates";

/** /about/tools (네비게이토 도구 — the illustrations and materials of navigators-seoulc.org
 * sub2 교계 기여) and /about/gallery (the photo groups of sub1–sub3). Edited later in the admin
 * (resource-pages); the pictures come from the media collection. */
const consent: ResourceConsent = {
  title: "자료 사용 안내",
  text: "네비게이토 예화와 자료는 제자 삼는 사역과 개인 신앙생활을 위해 사용해 주세요. 위 내용을 읽고 이에 동의합니다.",
  cancelLabel: "취소",
  confirmLabel: "동의 후 다운로드",
};

export const brandResourcesTabs = [
  { label: "네비게이토 도구", href: "/about/tools" },
  { label: "갤러리", href: "/about/gallery" },
];

export const brandGuide: ResourcePageContent = withSampleImages({
  title: "네비게이토 도구",
  consent,
  sections: [
    {
      id: "illustrations",
      title: "예화",
      items: [
        {
          id: "hand-of-word",
          title: "말씀의 손",
          text: "묵상, 암송, 공부, 읽기, 듣기. 이 5가지를 균형 있게 해 나갈 때, 말씀을 효과적으로 섭취할 수 있습니다. 이것을 ‘말씀의 손’이라 부릅니다.",
          download: { label: "예화 내려받기", href: "#" },
          visual: { kind: "tiles", tiles: [{ label: "말씀의 손", caption: "묵상 · 암송 · 공부 · 읽기 · 듣기", wide: true }] },
        },
        {
          id: "hand-of-prayer",
          title: "기도의 손",
          text: "찬양, 감사, 자백, 중보, 간구. 이 5가지는 균형 있는 기도를 할 수 있는 방법입니다. 이것을 ‘기도의 손’이라 부릅니다. 기도의 손은 기도로 하나님과 친밀히 교제할 수 있는 좋은 기도의 방법입니다.",
          download: { label: "예화 내려받기", href: "#" },
          visual: { kind: "tiles", tiles: [{ label: "기도의 손", caption: "찬양 · 감사 · 자백 · 중보 · 간구", wide: true }] },
        },
        {
          id: "wheel-life",
          title: "Wheel Life",
          text: "성령충만한 그리스도인의 삶을 사는 데 필요한 원리를 도슨 트로트맨은 휠라이프(Wheel life) 예화로 잘 설명하였습니다. 이 예화는 각 캠퍼스, 직장, 지역교회 그리고 해외 선교지에 이르기까지 그리스도인의 삶에서 필수요소가 무엇인지를 이해하고 기억하는데 유익하게 사용되고 있습니다.",
          download: { label: "예화 내려받기", href: "#" },
          visual: { kind: "tiles", tiles: [{ label: "Wheel Life", caption: "수레바퀴 예화", wide: true }] },
        },
        {
          id: "v-hand",
          title: "V Hand",
          subTitle: "요일 2:15~16",
          text: "V Hand는 그리스도인의 승리하는 삶을 제시해줍니다. 말씀, 기도, Lordship, 증거, 교제, 순종의 두 손가락은 적극적으로 펴고, 육신의 정욕, 안목의 정욕, 이생의 자랑 이 세 가지 손가락을 접고 누를 때 우리는 승리하는 그리스도인의 삶을 살 수 있습니다.",
          download: { label: "예화 내려받기", href: "#" },
          visual: { kind: "tiles", tiles: [{ label: "V Hand", caption: "승리하는 그리스도인의 삶", wide: true }] },
        },
      ],
    },
    {
      id: "materials",
      title: "도구와 교재",
      items: [
        {
          id: "quiet-time",
          title: "경건의 시간(Quiet Time)",
          text: "경건의 시간을 한국에 처음 소개하고 보급하는 데 기여했습니다. 그래서 많은 그리스도인들이 하루 첫 시간에 하나님과 교제를 갖는 데 도움을 주고 있습니다.",
          visual: { kind: "tiles", tiles: [{ label: "경건의 시간" }, { label: "QT", tone: "brand" }] },
        },
        {
          id: "bible-study-books",
          title: "성경공부 교재",
          text: "네비게이토 성경공부 교재는 현재 많은 교회와 기독교 대학들의 채플 교재로 쓰이고 있습니다.",
          visual: { kind: "tiles", tiles: [{ label: "성경공부 교재", wide: true }] },
        },
        {
          id: "memory-cards",
          title: "암송카드",
          text: "네비게이토 창시자 도슨 트로트맨은 믿음성장에서 성경암송의 중요성을 알고 암송카드를 사용하여 꾸준히 암송을 했습니다. 여기에서 시작된 네비게이토 암송카드는 현재 많은 교회에서 사용하고 있습니다.",
          visual: { kind: "tiles", tiles: [{ label: "암송카드" }, { label: "암송카드 2", tone: "dark" }] },
        },
        {
          id: "tract",
          title: "전도지",
          text: "네비게이토 전도지는 복음의 핵심을 잘 설명하고 있어 복음을 능력 있게 전하는 데 효과적입니다.",
          visual: { kind: "tiles", tiles: [{ label: "전도지", wide: true }] },
        },
      ],
    },
  ],
});

const photos = (group: string, count: number) => ({
  kind: "photos" as const,
  photos: Array.from({ length: count }, (_, index) => ({ alt: `${group} 사진 ${index + 1}`, downloadHref: "#" })),
});

export const gallery: ResourcePageContent = withSampleImages({
  title: "갤러리",
  consent,
  sections: [
    {
      id: "places",
      title: "공간",
      items: [
        { id: "vision-center", title: "비전관", text: "상도동 비전관의 예배실, 카페 ‘잔잔한 물가’, 라이브러리, 기도실입니다.", visual: photos("비전관", 4) },
        { id: "seoul-c", title: "서울C지구", text: "중앙대 캠퍼스와 서울C지구 형제자매들입니다.", visual: photos("서울C지구", 4) },
      ],
    },
    {
      id: "activities",
      title: "활동",
      items: [
        { id: "retreat", title: "여름 캠핑 수양회", text: "아름다운 바닷가와 청량한 산에서 하나님을 만난 시간입니다.", visual: photos("캠핑 수양회", 4) },
        { id: "eve-party", title: "이브파티", text: "예수님의 탄생을 축하하는 크리스마스 파티입니다.", visual: photos("이브파티", 4) },
        { id: "enjoy", title: "스포츠 · Enjoy", text: "스포츠 교제와 에버랜드, MT, 피크닉의 기록입니다.", visual: photos("Enjoy", 4) },
        { id: "missions", title: "해외", text: "영국, 캄보디아, 멕시코, 미국 형제자매들 사진입니다.", visual: photos("해외", 4) },
      ],
    },
  ],
});
