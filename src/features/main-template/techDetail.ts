import type { TechDetailContent, TechItem } from "@/types/pageTemplates";
import { pressReleaseList } from "./pressReleases";

/** Placeholder content for the tech-detail template (PRD §7.3). Section / row counts follow
 * the reference measurements; copy is neutral dummy text. */

const related = pressReleaseList.slice(0, 6).map((item) => ({ id: item.id, title: item.title, href: item.href, date: item.date, category: item.category }));

const rows = (names: string[]): TechItem[] =>
  names.map((name) => ({ title: name, description: `${name}이(가) 어떤 문제를 풀고 어디에 쓰이는지 두세 문장으로 설명하는 자리입니다.`, image: { label: name } }));

export type TechDetailKey = "gatherings" | "leisure" | "discipleship" | "events";

export const techDetails: Record<TechDetailKey, TechDetailContent> = {
  gatherings: {
    title: "파운데이션 모델",
    keycopy: "자체 데이터와 인프라로 만든 언어 모델",
    heroMedia: { kind: "video", label: "모델 소개 영상" },
    sections: [
      {
        id: "model-lineup",
        title: "모델 라인업",
        description: "용도와 규모에 맞춰 고를 수 있는 모델 패밀리입니다.",
        cards: [
          { title: "추론 모델", description: "복잡한 문제를 단계적으로 푸는 모델" },
          { title: "경량 모델", description: "빠른 응답이 필요한 작업용 모델" },
          { title: "멀티모달 모델", description: "이미지와 텍스트를 함께 이해하는 모델" },
          { title: "코드 모델", description: "프로그래밍 작업에 특화된 모델" },
          { title: "임베딩 모델", description: "검색과 추천을 위한 표현 모델" },
          { title: "음성 모델", description: "음성을 이해하고 만들어 내는 모델" },
        ],
        items: [],
      },
      { id: "model-services", title: "주요 서비스", description: "모델을 업무와 서비스에 적용하는 도구입니다.", items: rows(["전용 클라우드", "개발 도구"]) },
    ],
    cta: { title: "모델이 더 궁금하다면", description: "공식 사이트에서 자세한 정보를 확인하세요.", href: "#", ctaLabel: "공식 사이트 바로가기" },
    related,
  },
  leisure: {
    title: "공간지능",
    keycopy: "현실과 디지털 세계를 연결하는 기술",
    heroMedia: { kind: "video", label: "공간지능 소개 영상" },
    sections: [
      { id: "digital-twin", title: "디지털 트윈", description: "도시와 건물을 디지털로 옮겨 정밀하게 재현합니다.", wideImages: [{ label: "디지털 트윈" }], items: rows(["도시 규모 트윈", "건물 규모 트윈"]) },
      { id: "mapping-device", title: "고정밀 매핑 장비", description: "다양한 환경을 정밀하게 기록하는 장비입니다.", items: rows(["백팩형 장비", "차량형 장비", "로봇형 장비", "휴대형 장비"]) },
      { id: "vision-ai", title: "비전 AI", description: "이미지만으로 위치와 공간을 이해합니다.", items: rows(["시각 측위", "3D 재구성"]) },
      { id: "in-service", title: "서비스 속 공간지능", items: rows(["입체 거리뷰", "VR 투어", "AR 내비게이션"]) },
    ],
    cta: { title: "공간지능이 더 궁금하다면", href: "#", ctaLabel: "공식 사이트 바로가기" },
    related,
  },
  discipleship: {
    title: "로보틱스",
    keycopy: "사람과 자연스럽게 공존하는 로봇",
    heroMedia: { kind: "video", label: "로보틱스 소개 영상" },
    sections: [
      { id: "robots", title: "로봇 라인업", description: "공간과 목적에 맞게 설계한 로봇들입니다.", wideImages: [{ label: "로봇 라인업 1" }, { label: "로봇 라인업 2" }], items: rows(["배송 로봇", "안내 로봇", "양팔 로봇", "보행 로봇"]) },
      { id: "robot-cloud", title: "로봇 클라우드와 OS", description: "여러 로봇을 하나의 시스템으로 운영합니다.", items: rows(["관제 두뇌", "공간 인식", "행동 판단"]) },
      { id: "robot-ai", title: "로봇 AI 연구", description: "로봇을 위한 모델과 인터랙션을 연구합니다.", items: rows(["로봇 파운데이션 모델", "글로벌 워크숍", "인터랙션 연구"]) },
      { id: "robot-cases", title: "적용 사례", items: rows(["사옥", "데이터센터", "글로벌 프로젝트"]) },
    ],
    cta: { title: "로보틱스가 더 궁금하다면", href: "#", ctaLabel: "공식 사이트 바로가기" },
    related,
  },
  events: {
    title: "이머시브 미디어",
    keycopy: "기술이 만드는 감각의 확장",
    heroMedia: { kind: "video", label: "이머시브 미디어 소개 영상" },
    sections: [
      { id: "vision-stage", title: "비전 스테이지", description: "실시간 콘텐츠 제작을 위한 스튜디오입니다.", wideImages: [{ label: "비전 스테이지" }], items: rows(["실시간 콘텐츠 인프라", "버추얼 프로덕션", "생성형 AI 제작", "컬러 매니지먼트"]) },
      { id: "motion-stage", title: "모션 스테이지", description: "사람의 움직임을 정밀하게 기록합니다.", items: rows(["풀바디 모션캡처", "표정·손 추적", "실시간 스트리밍", "맞춤형 파이프라인"]) },
      { id: "streaming", title: "몰입형 스트리밍", description: "소리와 화질로 현장감을 전합니다.", items: rows(["입체 음향 스트리밍", "HDR 스트리밍", "시청 환경 최적화"]) },
      { id: "partner-cases", title: "제휴 사례", items: rows(["몰입형 라이브 쇼핑", "버추얼 스트리밍", "숏폼 연출"]) },
    ],
    cta: { title: "이머시브 미디어가 더 궁금하다면", href: "#", ctaLabel: "공식 사이트 바로가기" },
    related,
  },
};
