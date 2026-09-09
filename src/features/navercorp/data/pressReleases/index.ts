import type { PressRelease } from "@/types/pressRelease";

const root = "/sites/navercorp-65983208/main-c98712e4";
export const pressReleases: PressRelease[] = [
  { seq: "10034640", date: "2026.09.07", title: "네이버웹툰, 연재작가 넘어 완결 작가까지…'웹툰위드'로 지원", category: "보도자료", tags: ["네이버웹툰", "상생", "웹툰위드"], image: `${root}/cbb766db37-________________.jpg` },
  { seq: "10034637", date: "2026.09.07", title: "네이버클라우드 공공 협업툴, 대만 반도체 도시 ‘신주시’ 도입…글로벌 공공 시장 공략 가속", category: "보도자료", image: `${root}/4dcbe9248c-_____2026-08-07_151751.png` },
  { seq: "10034636", date: "2026.09.07", title: "네이버, 7일부터 추석 쇼핑 프로모션 ... 명절 선물 세트부터 귀성길 필수템까지 풍성", category: "보도자료", image: `${root}/ff4876ef66-_________7_______________..._____________.png` },
  { seq: "10034634", date: "2026.09.04", title: "네이버 이해진 의장, 브룩필드 브루스 플랫 회장과 회동… AI 팩토리 구축 사업 순항 확인", category: "보도자료", image: `${root}/10dbf60504-__1.jpg` },
  { seq: "10034633", date: "2026.09.04", title: "네이버, 네이버플러스 멤버십 이용자 전용 오프라인 페스티벌 연다", category: "보도자료", image: `${root}/09fb4af452-____.jpg` },
  { seq: "10034628", date: "2026.09.03", title: "네이버클라우드 컨소시엄, 국내 보안 환경 특화 AI 모델 만든다", category: "보도자료", image: `${root}/7667f28ab2-_____2026-08-07_151751.png` },
  { seq: "10034627", date: "2026.09.03", title: "네이버 예약, JW 메리어트 호텔과 ‘미쉐린 스타 셰프’ 미식 행사 진행", category: "보도자료", image: `${root}/8c4ce0c294-______x_____________________.png` },
  { seq: "10034626", date: "2026.09.03", title: "네이버플러스 멤버십, 전용 혜택가로 'EBS eBook' 콘텐츠 무제한 즐겨보세요", category: "보도자료", image: `${root}/2ce013786b-________________________EBS_eBook__________.png` },
  { seq: "10034623", date: "2026.09.01", title: "크림, 고감도 프리미엄 편집숍 '크림플러스(KREAM+)' 론칭", category: "보도자료", tags: ["크림"], image: `${root}/0b37df85ab-____________.jpg` },
  { seq: "10034621", date: "2026.08.31", title: "네이버페이(Npay), SK에너지와 주유소 고객 경험 혁신을 위한 업무협약 체결", category: "보도자료", image: `${root}/acca126175-Npay-SK_____1_.jpg` },
  { seq: "10034619", date: "2026.08.31", title: "컬리N마트, 장보기 '단골' 잡으며 출시 1년 만에 거래액 10배 성장", category: "보도자료", tags: ["NAVER"], image: `${root}/1ec06661c9-______N__________________1_________10____.png` },
  { seq: "10034616", date: "2026.08.28", title: "팀네이버, 비전 AI 분야 글로벌 기술력 또 한번 입증…세계 최정상 학회서 논문 대거 채택", category: "보도자료" },
];

export const pressReleaseBySeq = Object.fromEntries(
  pressReleases.map((release) => [release.seq, release]),
) as Record<string, PressRelease>;
