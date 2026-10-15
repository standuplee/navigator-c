# 라우트 트리 + 페이지 템플릿 (다중 페이지 단계)

> `docs/HANDOFF.md` "다중 페이지(라우트 트리) 재현" 1~2번 결과물. 메가메뉴를 실제 라이브 사이트에서 JS로 직접 읽어 확정했고(2026-10-15), ESG/투자정보/채용은 범위 제외가 확정 상태라 방문하지 않았다. 전체를 하나씩 복제하지 않고, 같은 골격을 공유하는 페이지를 템플릿 단위로 묶었다 — 템플릿마다 대표 URL 1~2개만 방문해서 확정했다(HANDOFF 지침).

## 전체 라우트 (실제 메가메뉴 기준)

| 그룹 | 경로 | 템플릿 | 상태 |
|---|---|---|---|
| 회사소개 | `/company/about` | `narrative-scrollytelling` | 신규 |
| 회사소개 | `/company/affiliates` | 미방문(추정 `simple-info`) | 신규 |
| 회사소개 | `/company/history` | `timeline-list` | 신규 |
| 회사소개 | `/company/brandGuide` | `simple-info` | 신규 |
| 회사소개 | `/company/partnership` | 미방문(추정 `simple-info`) | 신규 |
| 회사소개 | `/company/contact` | `simple-info` | 신규 |
| 서비스 | `/service/featuredServices` | `section-landing` | **구현됨**(구 NAVER 클론) |
| 서비스 | `/service/portal` | `service-detail` | 신규(기존 템플릿 재사용) |
| 서비스 | `/service/tools` | 미방문(추정 `service-detail`) | 신규 |
| 서비스 | `/service/search` | `service-detail` | **구현됨** |
| 서비스 | `/service/advertisement` | `service-detail` | **구현됨** |
| 서비스 | `/service/commerce` | `service-detail` | **구현됨** |
| 서비스 | `/service/cloud` | 미방문(추정 `service-detail`) | 신규 |
| 서비스 | `/service/fintech` | 미방문(추정 `service-detail`) | 신규 |
| 서비스 | `/service/1784` | `service-detail` | 신규(기존 템플릿 재사용) |
| 서비스 | `/service/contents` | 미방문(추정 `service-detail`) | 신규 |
| 서비스 | `/service/datacenterGak` | 미방문(추정 `service-detail`) | 신규 |
| 서비스 | `/service/community` | 미방문(추정 `service-detail`) | 신규 |
| 서비스 | `/service/all` | `service-directory` | 신규 |
| 서비스 | `/service/map` | `service-detail` | **구현됨** |
| 기술 | `/tech/innovation` | `section-landing` | **구현됨** |
| 기술 | `/tech/hyperclovax` | `feature-detail-with-related` | 신규 |
| 기술 | `/tech/spatialAI` | 미방문(추정 `feature-detail-with-related`) | 신규 |
| 기술 | `/tech/robotics` | 미방문(추정 `feature-detail-with-related`) | 신규 |
| 기술 | `/tech/immersiveMedia` | 미방문(추정 `feature-detail-with-related`) | 신규 |
| 미디어 | `/media/pressReleases` | `content-list-filter-pagination` | **구현됨** |
| 미디어 | `/media/pressReleasesDetail?seq=` | `article-detail` | **구현됨** |
| 미디어 | `/media/mediaEvents` | `simple-table-list` | 신규 |
| 미디어 | `/media/naverReports` | `content-list-filter-pagination` | 신규(기존 템플릿 재사용) |
| 미디어 | `/media/aiInNaver` | `feature-detail-with-related`(잠정) | 신규 |
| 스토리 | `/story` | `story-list` | **구현됨** |
| 스토리 | `/story/storyDetail?seq=` | `story-detail` | **구현됨** |

범위 제외: `/esg/*`(7개), `/investment/*`(6개), 채용(외부 `recruit.navercorp.com` 링크 — 내부 라우트 아님). `/media/naverReportsDetail?seq=`은 `article-detail`과 같은 템플릿으로 추정(미방문).

## 템플릿 정의 (12종)

| 템플릿 | 골격 | 대표 페이지 |
|---|---|---|
| `main-landing` | 헤더 + 헤드라인 캐러셀 + 뉴스 + 프로모션 + 패널 + 파트너 탭 + 푸터 | `/main` |
| `section-landing` | 히어로 + 탭 전환 카드 그리드 | `/service/featuredServices`, `/tech/innovation` |
| `service-detail` | 히어로 + 섹션 반복(아이콘+타이틀+텍스트+이미지) + 스크롤 진행률 | `/service/search`·`/advertisement`·`/commerce`·`/map`·`/portal`·`/1784` 등 |
| `content-list-filter-pagination` | 헤딩 + 주요 항목 캐러셀 + 연도/월 필터 + 검색 + 페이지네이션 | `/media/pressReleases`, `/media/naverReports` |
| `article-detail` | 헤딩 + 본문(이미지+문단) + 공유 + 목록으로 | `/media/pressReleasesDetail` |
| `story-list` / `story-detail` | 카테고리 탭+검색 그리드 / 마크다운 본문+태그 | `/story`, `/story/storyDetail` |
| `narrative-scrollytelling` | 스크롤 연동 섹션 리빌 + 연혁 블록 + 통계 + 회사 정보 표 | `/company/about` |
| `timeline-list` | 탭(연혁/수상) + 연도별 이벤트 리스트 | `/company/history` |
| `simple-info` | 정적 카드/표 콘텐츠, 리스트·페이지네이션 없음 | `/company/contact`, `/company/brandGuide`, (추정) `/company/affiliates`, `/company/partnership` |
| `service-directory` | 카테고리 탭 + 알파벳 정렬 토글 + 외부 링크 그리드(30+개) | `/service/all` |
| `feature-detail-with-related` | 히어로 + 제품/모델 카드 묶음 + 하단 관련 콘텐츠 캐러셀 | `/tech/hyperclovax`, (추정) 나머지 `/tech/*`, `/media/aiInNaver` |
| `simple-table-list` | 2열 표 형태 목록(날짜/제목), 필터·페이지네이션 없음 | `/media/mediaEvents` |

## 우선순위 메모

- `service-detail`·`content-list-filter-pagination`·`article-detail`·`story-list`·`story-detail`·`section-landing`은 이미 구현되어 있지만 **전부 구 NAVER 클론(실제 브랜드 콘텐츠, 원본 CSS 의존) 상태** — `/main`처럼 브랜드 중립 템플릿으로 다시 만들어야 한다.
- 완전 신규 템플릿은 6개: `narrative-scrollytelling`, `timeline-list`, `simple-info`, `service-directory`, `feature-detail-with-related`, `simple-table-list`.
- `/company/affiliates`, `/company/partnership`, `/service/tools`·`/cloud`·`/fintech`·`/contents`·`/datacenterGak`·`/community`, `/tech/spatialAI`·`/robotics`·`/immersiveMedia`는 미방문 — 템플릿 추정치이며 실제 작업 들어갈 때 재확인 필요.

## 진행 상황

**1순위(기존 6개 템플릿 브랜드 중립 재구축) 완료 — 2026-10-15.** `main-landing`, `section-landing`, `service-detail`, `content-list-filter-pagination`, `article-detail`, `story-list`/`story-detail` 전부 `src/components/content/*`의 신규 컴포넌트 + `src/features/main-template/*` mock 데이터로 교체. 구 NAVER 클론(`src/features/navercorp/*`)은 더 이상 어떤 라우트에서도 쓰이지 않고 참고 자료로만 남음.

**2순위(신규 템플릿 3종) 완료 — 2026-10-15.** `narrative-scrollytelling`(`/company/about`), `service-directory`(`/service/all`), `feature-detail-with-related`(`/tech/hyperclovax`·`/tech/spatialAI`·`/tech/robotics`·`/tech/immersiveMedia`·`/media/aiInNaver` — 5개 라우트 모두 같은 컴포넌트 재사용) 신규 구현. 헤더/푸터 내비게이션 데이터(`navMenuItems`, `footerGroups`)를 이 신규 라우트들에 맞춰 갱신함.

**3순위(나머지 템플릿 3종) 완료 — 2026-10-15.** `timeline-list`(`/company/history`), `simple-info`(`/company/contact`·`/brandGuide`·`/affiliates`·`/partnership` — 4개 라우트가 컴포넌트 하나 재사용), `simple-table-list`(`/media/mediaEvents`) 구현. 헤더/푸터 내비게이션을 다시 한번 전체 동기화.

## 전체 완료 — 12개 템플릿, 28개 라우트 (2026-10-15)

`docs/routes.md`에 정리했던 ESG/투자정보/채용 제외 전체 라우트 중, 미방문으로 남겨뒀던 `/service/tools`·`/cloud`·`/fintech`·`/contents`·`/datacenterGak`·`/community`(service-detail 템플릿으로 추정)와 `/media/naverReports`(content-list-filter-pagination 재사용)는 아직 라우트 자체를 만들지 않았다 — 템플릿은 이미 있으니 필요해지면 mock 데이터만 추가하면 됨. 그 외 메가메뉴에 있는 모든 라우트는 템플릿까지 구현 완료.
