# NAVER 하위 트리 컴포넌트 분석

2026-09-09 Chrome guest sweep 기준. `/main`의 GNB·Footer 내부 링크와 사용자가 지정한 서비스 포털, ESG, 미디어, 투자정보 라우트를 확인했다. 401/403 또는 로그인 리다이렉트는 관찰되지 않았다.

## `/service/portal`

포털 소개 Hero, 네이버 서비스 소개 카드, 앱스토어 링크 그룹, 홈피드 설명, 보도자료 기반 연관 콘텐츠 캐러셀을 사용한다. 관리자 필드는 Hero 제목/이미지, 서비스 카드 제목·설명·스토어 링크, 연관 콘텐츠 entry ID 배열이다.

## `/esg/sustainability`

스크롤형 Hero, `4 ESG MANAGEMENT STRATEGY` 4분할 탭/섹션, 각 전략의 지표 카드 4개, 상세 링크, 통합보고서 CTA로 구성된다. `StrategyPanel`, `MetricCard`, `ReportBanner`로 분리하고 전략명·설명·지표 label/value·detail route를 DB 섹션 props로 저장한다.

## `/media/pressReleases`

주요 보도자료 캐러셀, 연도/월 필터, 검색, 12개 이상의 보도자료 카드, 페이지네이션, 미디어 연관 링크가 반복된다. 카드 데이터는 `ContentEntry`와 `MediaAsset`·`Tag` 관계로 관리한다.

## `/media/pressReleasesDetail?seq=10034637`

분류·제목·게시일 Header, 공유/텍스트 복사, 본문 RichText, 전체 이미지 다운로드, 목록보기로 구성된다. 본문은 Markdown 원문과 `StoryBlock` 타입 데이터를 함께 저장하고, 이미지 caption/alt를 `MediaAsset`로 분리한다.

## `/investment/irUpdates`

IR Hero/미팅 CTA, 최신 실적발표 링크와 PDF 다운로드, 주가 요약, 결산공고·주주서한·주주총회 바로가기 카드, 실적발표와 주주총회 테이블, 연도별 주요 보고서 탭으로 구성된다. `DataTable`, `ReportTabs`, `StockTicker`, `QuickLinkCard`를 공통화하며 표 행과 다운로드 URL을 관리자에서 반복 등록한다.

## 공통 적용 원칙

- 정적 표시 컴포넌트는 RSC, 탭·캐러셀·필터·아코디언은 RCC로 분리한다.
- 모든 섹션은 `SitePage.sections`의 `componentType`, `sortOrder`, `data`로 렌더링한다.
- 카드·배너·기사·표 행은 `ContentEntry` 또는 JSON payload를 통해 관리자에서 추가/정렬/게시한다.
- 원본에서 확인한 Footer 개인정보 팝업과 헤더 검색은 공통 Shell 레이어에서 관리한다.
