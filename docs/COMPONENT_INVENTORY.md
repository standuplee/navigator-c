# NAVER 전체 트리 React 컴포넌트 분석

분석 기준은 `/main`에서 GNB와 Footer의 내부 링크를 따라가며 확인한 공개 페이지다. 반복되는 시각 패턴을 HTML 조각이 아니라 데이터 props를 받는 React 컴포넌트로 정의한다.

## 공통 컴포넌트 레지스트리

| 컴포넌트 | 사용 페이지 | 관리자 입력 데이터 | 상호작용 |
| --- | --- | --- | --- |
| `SiteHeader` / `MobileNavigation` | 모든 페이지 | 메뉴 label, route, 외부 링크, 언어 | 메뉴, 검색, 언어 |
| `SiteFooter` | 모든 페이지 | 링크 그룹, SNS, 약관 | 아코디언(모바일) |
| `HeroSection` | 메인, 서비스/기술 랜딩 | 제목, 설명, 이미지·영상, CTA | 자동 재생/스크롤 |
| `TickerCarousel` | 메인 상단 | 국가, 주가, 공지 카드, interval | 자동재생, 이전/다음 |
| `CardGallery` | 메인, 스토리, 미디어 | 카드 타입, 제목, 날짜, 썸네일, tags, route | hover, 페이지네이션 |
| `FeaturedCarousel` | 메인, 스토리, 보도자료 | 슬라이드 배열, active index, autoplay | 이전/다음, 자동정지 |
| `Banner` | 메인 프로모션, 서비스 | 배경, 문구, 링크, 노출 기간 | CTA, 외부 링크 |
| `ServiceSummary` | 메인·서비스 | 탭 이름, 제목, 설명, detail route | 탭 전환 |
| `TabPanel` | 메인 파트너, 기술/서비스 | 탭 label, panel component, order | 선택 탭 |
| `FilterBar` | 스토리·보도자료 | 카테고리, 연도, 월, 검색 placeholder | query/filter |
| `RichTextArticle` | 스토리·보도자료 상세 | Markdown, block JSON, 이미지 | 공유, 본문 링크 |
| `MediaGallery` | 상세 페이지 | asset URL, alt, caption, order | 확대/갤러리 |
| `RelatedContent` | 상세 페이지(선택) | entry IDs, 카드 variant | 캐러셀 |
| `Pagination` | 목록 페이지 | total, current, pageSize | URL query |

## 원본 트리에서 확인한 페이지 그룹

- 회사: `/company/about`, `/company/brandGuide`, `/company/contact`, `/company/partnership`
- 우리의 사역: `/service/featuredServices`, `/service/search`, `/service/advertisement`, `/service/commerce`, `/service/map`
- 우리의 활동: `/tech/innovation`
- 지속가능성: `/esg/sustainability`, `/esg/esgReports`
- 투자정보: `/investment/irUpdates`, `/investment/earnings`, `/investment/stock`, `/investment/corporateGovernance`
- 미디어: `/media/pressReleases`, `/media/pressReleasesDetail`, `/media/mediaEvents`, `/media/naverReports`, `/media/aiInNaver`
- 스토리: `/story`, `/story/storyDetail`

## DB 주도 렌더링 규칙

1. `SitePage.route`로 URL과 페이지 타입을 등록한다.
2. `PageSection.sortOrder` 순서로 섹션을 읽는다.
3. `componentType`을 레지스트리에서 찾고 `data` JSON을 props로 검증한다.
4. 카드·배너·기사·서비스는 `ContentEntry`와 `MediaAsset` ID만 참조한다.
5. 관리자 미리보기는 `isPublished=false` 데이터도 같은 레지스트리로 렌더링한다.
6. 공개 페이지는 서버에서 DB를 조회하고, 탭·필터·캐러셀만 클라이언트 상태를 사용한다.

## 관리자 입력 UX

- 페이지 편집: 섹션 추가·삭제·순서 이동, 컴포넌트 타입 선택
- 카드/배너: 제목, 요약, 카테고리, 태그, 썸네일, 링크, 노출 기간
- 기사: 제목, 분류, Markdown 편집기, 이미지 업로드, 실시간 미리보기
- 미디어: 파일 업로드, alt, caption, 대표 이미지 지정
- 게시: 임시저장 → 미리보기 → 예약/즉시 공개 → 비공개

## 적용 순서

1. `SiteHeader`, `SiteFooter`, `CardGallery`, `Banner`, `FilterBar`를 DB props 기반으로 통합한다.
2. 메인 페이지의 ticker·featured·promotion·service summary를 `PageSection` 데이터로 이전한다.
3. 스토리와 보도자료의 목록·상세를 `ContentEntry` + `MediaAsset` 조회로 전환한다.
4. 서비스/기술 상세의 섹션을 `PageSection`과 `componentType`으로 이전한다.
5. 관리자 페이지에서 각 컴포넌트 전용 폼과 Markdown 편집기를 제공한다.
