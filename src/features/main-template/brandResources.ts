import type { ResourceConsent, ResourcePageContent } from "@/types/pageTemplates";

/** Placeholder brand resources + gallery (/company/brandGuide, /company/gallery).
 * Future Payload global `brand-resources`; files come from the media collection. */
const consent: ResourceConsent = {
  title: "브랜드 지침 동의",
  text: "브랜드 관련 지침 및 기타 사용 항목을 읽고 이에 동의합니다.",
  cancelLabel: "취소",
  confirmLabel: "동의 후 다운로드",
};

export const brandResourcesTabs = [
  { label: "브랜드 리소스", href: "/company/brandGuide" },
  { label: "갤러리", href: "/company/gallery" },
];

export const brandGuide: ResourcePageContent = {
  title: "브랜드 리소스",
  consent,
  sections: [
    {
      id: "identity",
      title: "브랜드 아이덴티티",
      items: [
        {
          id: "logotype",
          title: "로고타입",
          text: "로고타입은 공동체의 정체성을 담은 가장 기본적인 요소입니다. 정해진 형태와 비율을 유지해 사용해 주세요. 적용 환경에 따라 기본형과 단색형 중 알맞은 버전을 선택합니다.",
          download: { label: "전체 다운로드", href: "#" },
          visual: {
            kind: "tiles",
            tiles: [
              { label: "Primary Logo", caption: "기본형", wide: true },
              { label: "Primary Logo", caption: "어두운 배경", tone: "dark", wide: true },
              { label: "White Color", caption: "단색 · 흰색", tone: "brand" },
              { label: "Black Color", caption: "단색 · 검정" },
            ],
            note: "적용 환경의 그래픽 요소나 배경과 충돌하지 않도록 충분한 여백을 확보해 주세요.",
          },
        },
        {
          id: "color",
          title: "컬러",
          text: "브랜드 컬러는 로고와 주요 그래픽에 사용합니다. 화면과 인쇄물 모두에서 같은 인상을 주도록 지정된 값을 사용해 주세요.",
          visual: {
            kind: "swatches",
            swatches: [
              { name: "Brand Primary", hex: "#1A1D24", rgb: "26 29 36", cmyk: "C28 M20 Y0 K86", textTone: "light" },
              { name: "Brand Light", hex: "#F4F4F5", rgb: "244 244 245", cmyk: "C0 M0 Y0 K4", textTone: "dark" },
            ],
          },
        },
        {
          id: "misuse",
          title: "로고 사용 시 유의사항",
          subTitle: "로고 변형 금지",
          text: "브랜드가 일관되게 전달될 수 있도록 로고를 임의로 변형하지 않습니다.",
          visual: {
            kind: "bans",
            items: [
              { caption: "비율을 임의로 변경하지 않습니다." },
              { caption: "회전하거나 기울이지 않습니다." },
              { caption: "지정되지 않은 색상을 사용하지 않습니다." },
              { caption: "효과(그림자·외곽선)를 넣지 않습니다." },
              { caption: "복잡한 배경 위에 사용하지 않습니다." },
              { caption: "요소의 배치를 바꾸지 않습니다." },
              { caption: "다른 서체로 다시 쓰지 않습니다." },
              { caption: "일부를 잘라 사용하지 않습니다." },
            ],
          },
        },
      ],
    },
  ],
};

export const gallery: ResourcePageContent = {
  title: "브랜드 리소스",
  consent,
  sections: [
    {
      id: "photos",
      title: "사진",
      items: [
        {
          id: "gathering",
          title: "모임",
          text: "정기 모임 사진입니다.",
          visual: { kind: "photos", photos: Array.from({ length: 4 }, (_, i) => ({ alt: `모임 사진 ${i + 1}`, downloadHref: "#" })) },
        },
        {
          id: "retreat",
          title: "수련회",
          text: "수련회 사진입니다.",
          visual: { kind: "photos", photos: Array.from({ length: 2 }, (_, i) => ({ alt: `수련회 사진 ${i + 1}`, downloadHref: "#" })) },
        },
      ],
    },
  ],
};
