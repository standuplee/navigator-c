import type { ServiceDetailContent } from "@/types/pageTemplates";

/** Placeholder service-detail content for the ten known service-detail routes.
 * Swap per deployment — structure only, no NAVER copy. */
export const serviceDetails: Record<
  "search" | "advertisement" | "commerce" | "map" | "tools" | "cloud" | "fintech" | "contents" | "datacenterGak" | "community",
  ServiceDetailContent
> = {
  search: {
    eyebrow: "검색",
    title: "질문 하나로 끝까지",
    description: "탐색부터 실행까지, 대화형 검색 경험을 제공합니다.",
    introTitle: "검색에서 탐색으로",
    introDescription: "사용자의 의도를 이해하고, 다음 행동까지 자연스럽게 이어지는 검색을 설계합니다.",
    sections: [
      { title: "요약 카드", body: "길고 복잡한 결과 대신, 핵심만 담은 요약 카드로 빠르게 답을 확인할 수 있습니다." },
      { title: "대화형 탐색", body: "후속 질문을 이어가며 점점 더 구체적인 답을 찾아갈 수 있습니다." },
      { title: "실행 연결", body: "검색 결과에서 바로 예약, 구매 같은 다음 행동으로 연결됩니다." },
    ],
  },
  advertisement: {
    eyebrow: "광고",
    title: "자동화로 더 똑똑하게",
    description: "입찰부터 소재까지, 광고 운영 전반을 자동화합니다.",
    introTitle: "운영 부담은 줄이고 성과는 높이고",
    introDescription: "데이터 기반 자동화로 광고주가 핵심 전략에만 집중할 수 있도록 돕습니다.",
    sections: [
      { title: "자동 입찰", body: "목표에 맞춰 입찰가를 실시간으로 조정합니다." },
      { title: "소재 최적화", body: "성과가 좋은 소재 조합을 자동으로 찾아 적용합니다." },
      { title: "타겟팅", body: "관심사와 행동 데이터를 바탕으로 정확한 타겟에게 노출합니다." },
    ],
  },
  commerce: {
    eyebrow: "커머스",
    title: "초개인화 쇼핑",
    description: "쇼핑 이력과 취향을 반영한 맞춤형 추천을 제공합니다.",
    introTitle: "나에게 맞는 쇼핑",
    introDescription: "방대한 상품 속에서 지금 나에게 필요한 것만 골라 보여줍니다.",
    sections: [
      { title: "맞춤 추천", body: "구매·탐색 이력을 분석해 지금 필요한 상품을 먼저 보여줍니다." },
      { title: "간편 결제", body: "몇 번의 터치로 결제를 끝낼 수 있습니다." },
      { title: "배송 추적", body: "주문부터 도착까지 실시간으로 확인할 수 있습니다." },
    ],
  },
  map: {
    eyebrow: "지도",
    title: "현실에 가까운 길찾기",
    description: "공간 정보를 더 정확하고 입체적으로 제공합니다.",
    introTitle: "더 쉬운 길찾기",
    introDescription: "3D 거리뷰와 실내 내비게이션으로 복잡한 공간에서도 길을 잃지 않습니다.",
    sections: [
      { title: "3D 거리뷰", body: "실제 거리와 가까운 입체 화면으로 방향을 쉽게 파악합니다." },
      { title: "실내 내비게이션", body: "건물 안에서도 목적지까지 경로를 안내합니다." },
      { title: "실시간 정보", body: "혼잡도와 교통 상황을 반영해 최적 경로를 제안합니다." },
    ],
  },
  tools: {
    eyebrow: "도구",
    title: "일을 더 가볍게",
    description: "메모, 일정, 협업까지 하나로 연결되는 생산성 도구 모음입니다.",
    introTitle: "흩어진 작업을 한 곳에",
    introDescription: "따로 쓰던 도구들을 연결해 맥락이 끊기지 않는 작업 흐름을 만듭니다.",
    sections: [
      { title: "메모", body: "생각을 빠르게 기록하고 검색할 수 있습니다." },
      { title: "일정 공유", body: "팀원과 일정을 한눈에 맞춰볼 수 있습니다." },
      { title: "파일 동기화", body: "기기 간에 작업 파일이 자동으로 동기화됩니다." },
    ],
  },
  cloud: {
    eyebrow: "클라우드",
    title: "필요한 만큼, 그만큼 빠르게",
    description: "확장 가능한 클라우드 인프라로 서비스 성장을 뒷받침합니다.",
    introTitle: "탄탄한 인프라 위에서",
    introDescription: "트래픽이 몰려도 안정적으로 버티는 인프라를 제공합니다.",
    sections: [
      { title: "오토스케일링", body: "트래픽에 맞춰 서버 자원을 자동으로 조절합니다." },
      { title: "글로벌 리전", body: "전 세계 여러 리전에서 서비스를 운영할 수 있습니다." },
      { title: "보안 컴플라이언스", body: "업계 표준 보안 인증을 충족합니다." },
    ],
  },
  fintech: {
    eyebrow: "핀테크",
    title: "더 간편한 결제 경험",
    description: "간편결제부터 금융 서비스까지 하나의 흐름으로 연결합니다.",
    introTitle: "복잡함은 줄이고, 신뢰는 더하고",
    introDescription: "결제와 금융 서비스를 더 쉽고 안전하게 이용할 수 있도록 설계합니다.",
    sections: [
      { title: "간편결제", body: "몇 번의 터치로 결제를 끝낼 수 있습니다." },
      { title: "포인트 적립", body: "이용할수록 쌓이는 리워드를 제공합니다." },
      { title: "이상거래 탐지", body: "실시간으로 이상 거래를 감지해 막습니다." },
    ],
  },
  contents: {
    eyebrow: "콘텐츠",
    title: "읽고, 보고, 즐기는 모든 것",
    description: "뉴스, 웹툰, 블로그까지 다양한 콘텐츠를 한 곳에서 만납니다.",
    introTitle: "취향에 맞는 콘텐츠",
    introDescription: "관심사를 학습해 더 보고 싶은 콘텐츠를 먼저 보여줍니다.",
    sections: [
      { title: "맞춤 피드", body: "관심사에 맞는 콘텐츠를 우선 노출합니다." },
      { title: "창작 도구", body: "누구나 쉽게 콘텐츠를 만들고 올릴 수 있습니다." },
      { title: "수익화", body: "창작자가 콘텐츠로 수익을 낼 수 있도록 돕습니다." },
    ],
  },
  datacenterGak: {
    eyebrow: "데이터센터",
    title: "안정성의 기반",
    description: "대규모 서비스를 떠받치는 자체 데이터센터입니다.",
    introTitle: "가장 밑단에서부터",
    introDescription: "전력, 냉각, 보안까지 자체 설계한 인프라로 서비스를 지탱합니다.",
    sections: [
      { title: "친환경 냉각", body: "에너지 효율을 높인 냉각 시스템을 사용합니다." },
      { title: "이중화 설계", body: "장애 상황에도 서비스가 끊기지 않도록 설계합니다." },
      { title: "물리 보안", body: "다층 보안 체계로 시설을 보호합니다." },
    ],
  },
  community: {
    eyebrow: "커뮤니티",
    title: "함께 만드는 생태계",
    description: "개발자와 파트너가 함께 성장하는 커뮤니티를 운영합니다.",
    introTitle: "혼자가 아니라 함께",
    introDescription: "지식과 경험을 나누는 공간을 만들어 생태계 전체가 성장하도록 돕습니다.",
    sections: [
      { title: "오픈소스", body: "사내 기술을 오픈소스로 공개하고 함께 발전시킵니다." },
      { title: "밋업", body: "개발자들이 모여 지식을 나누는 자리를 엽니다." },
      { title: "멘토링", body: "주니어 개발자를 위한 멘토링 프로그램을 운영합니다." },
    ],
  },
};
