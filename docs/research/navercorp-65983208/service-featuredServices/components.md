# 서비스·기술·회사소개 컴포넌트 분석

## `/service/featuredServices`

- `ServiceHero`: On-Service AI 제목, 설명, 다음 섹션 이동
- `ServiceFeatureList`: AI 브리핑, ADVoost, AI 쇼핑 가이드, 3D 공간 정보 4개 항목
- `ServiceFeatureCard`: 순번, 서비스명, 분류, 설명, 상세 route
- `ServiceDirectoryBanner`: 전체 서비스 보기 CTA
- 관리자 필드: title, subtitle, category, description, visual asset, detail route, order, publishedAt

## `/tech/innovation`

- `TechHero`: Everyday Tech 제목/설명
- `TechDomainSection`: HyperCLOVA X, 공간지능, 로보틱스, 이머시브 미디어
- `TechCapabilityCard`: 분야별 2~3개 세부 기술 카드
- `InvestmentMetricGrid`: D2SF 투자 팀 수·비율·협력 건수
- `ResearchAreaList`: 네이버클라우드·네이버랩스 AI 연구 분야
- 관리자 필드: domain title/description, detail route, capability cards, metric value/unit, research category/list

## `/company/about`

- `CompanyHero`: Navigators 브랜드 메시지와 배경 이미지
- `Timeline`: 1999~2022 연혁 항목
- `BusinessTimeline`: SEARCH, COMMERCE, FINTECH의 연도별 서비스 항목
- `EvidenceCardGrid`: 정보 연결, 글로벌 시장, 미래 기술 투자 카드
- `CompanyFacts`: 설립연도, 본사, 주요 서비스, 사업, 해외 법인, 매출, 인력
- 관리자 필드: timeline year/title/description/icon, business group, evidence items, fact label/value

세 페이지 모두 기존 Header/Footer를 공유하며, 스크롤 진입 애니메이션과 다음 섹션 이동은 RCC behavior 레이어로 분리한다. 내용과 순서는 `SitePage`/`PageSection`에 저장하고, 반복 항목은 `data` JSON 또는 `ContentEntry` 참조로 관리한다.
