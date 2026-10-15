# 콘텐츠 모델 — 메인 페이지 범위 초안

> `docs/HANDOFF.md`의 "관리자(어드민) 페이지 / 콘텐츠 관리" 작업 순서 1번("프론트 mock 데이터를 CMS 스키마와 같은 구조로 설계") 대응 문서. **지금은 메인 페이지 범위만** 다룬다. 전체 사이트 모델은 `docs/routes.md` 작성 후 이 문서를 확장해서 확정한다.
>
> CMS(Payload 등) 설치는 아직 하지 않는다. 이 문서는 (1) 메인 페이지 리빌드에서 쓸 mock JSON의 필드 구조, (2) 나중에 Payload 컬렉션으로 옮길 때의 매핑 초안 역할을 한다. 컴포넌트는 `src/lib/data/*` 리포지토리 함수로만 이 데이터를 읽어서, 소스를 mock→CMS로 바꿔도 컴포넌트가 바뀌지 않게 한다(`ARCHITECTURE.md` 원칙).

## 분류 (HANDOFF 기준)

| 분류 | 메인 페이지 해당 항목 |
|---|---|
| CMS 컬렉션(어드민에서 작성·발행) | 메인 프로모션 캐러셀, 메인 롤링 배너(헤드라인), 메인 바로가기 배너, 보도자료, 스토리 |
| 코드/MDX(변경이 드문 정적 콘텐츠) | 헤더/푸터 내비게이션 구조, "주요 서비스와 기술 요약" 패널 카피, "함께 성장하는 네이버" 파트너·개발자 링크 |
| 외부 API(어드민 대상 아님) | 주가 표시 — 지금 단계에서는 정적 mock 값으로 자리만 잡고, 실연동은 범위 밖 |

## CMS 컬렉션 초안

### `MainHeadlineSlide` (메인 롤링 배너)

원본의 헤드라인 캐러셀은 보도자료/스토리 콘텐츠를 그대로 노출하는 카드다. 별도 테이블을 새로 만들지 않고 **`PressRelease`/`Story` 중 노출할 항목을 고르는 "노출 순서" 레이어**로 모델링한다.

| 필드 | 타입 | 설명 |
|---|---|---|
| `id` | string | 슬라이드 식별자 |
| `sourceType` | `"pressRelease" \| "story"` | 어떤 콘텐츠 컬렉션을 참조하는지 |
| `sourceId` | string | 참조 대상의 `seq` |
| `order` | number | 캐러셀 노출 순서 |
| `isPublished` | boolean | 노출 여부 |

파생 표시 필드(제목/날짜/카테고리/이미지)는 참조 대상에서 읽어온다 — 중복 입력 방지.

### `MainPromotionSlide` (메인 프로모션 캐러셀)

| 필드 | 타입 | 설명 |
|---|---|---|
| `id` | string | — |
| `title` | string (KR/EN) | 슬라이드 제목 |
| `description` | richText 또는 string[] (줄바꿈 단위) | 설명 카피 |
| `image` | media 참조 | 비주얼 이미지 (placeholder) |
| `backgroundColor` | string(hex) | 배경색 — 원본처럼 슬라이드별 배경색 전환에 사용 |
| `ctaLabel` | string (KR/EN) | 버튼 라벨("자세히 보기" 자리) |
| `ctaHref` | string | 내부/외부 링크 |
| `order` | number | 노출 순서 |
| `publishFrom` / `publishUntil` | date (선택) | 노출 기간 |
| `isPublished` | boolean | — |

### `MainShortcutBanner` (메인 바로가기 배너)

**Chrome으로 라이브 사이트를 직접 열어 구조를 확인했다**(기존엔 추정이었음): 헤드라인 캐러셀 옆에 세로로 쌓인 카드 3장 — `main-sustainability`(지속가능성 — 2025년 통합보고서 다운로드), `main-investment`(투자정보 — 2026년 2분기 실적발표), `main-recruit`(채용). 전부 ESG/투자정보/채용 콘텐츠이고, **사용자가 이 3개 카테고리를 범위에서 제외하기로 확정했다.** 따라서:

- 레이아웃·호버 패턴(헤드라인 옆 세로 카드 스택)은 재사용 가치가 있는 UI 패턴이라 **구조는 유지**한다.
- 라벨·링크는 지속가능성/투자정보/채용과 무관한 **중립 placeholder 콘텐츠**로 채운다(예: 일반 공지/하이라이트 카드 등 호출 서비스가 자유롭게 바꿔 끼울 수 있는 자리).
- `/esg/*`, `/investment/*` 같은 실제 목적지 라우트는 만들지 않는다 — placeholder 카드의 링크도 내부 데모 경로나 `#` 정도로 둔다.

| 필드 | 타입 | 설명 |
|---|---|---|
| `id` | string | — |
| `label` | string (KR/EN) | 배너 라벨 |
| `description` | string | 보조 설명(선택) |
| `href` | string | 이동 경로 |
| `order` | number | 노출 순서 |
| `isPublished` | boolean | — |

### `PressRelease` (기존 `src/types/pressRelease.ts` 확장)

현재: `{ seq, date, title, category?, tags?, image? }` — 목록/카드용 필드만 있음. 상세 페이지는 별도 `src/types/content.ts`의 `ArticleDetail`(`category, title, date, publishedAt, images[], paragraphs[]`)을 쓰고 있어 **두 타입이 분리되어 있다**. CMS 전환 시 하나의 컬렉션으로 합쳐야 함.

| 필드 | 타입 | 설명 |
|---|---|---|
| `seq` | string | 식별자(원본 URL 쿼리 호환용, 내부적으로는 CMS `id`와 별도 유지) |
| `title` | string (KR/EN) | — |
| `category` | string | — |
| `tags` | string[] | — |
| `thumbnail` | media 참조 | 목록 카드용 이미지 |
| `publishedAt` | date | — |
| `body` | richText(블록) | 상세 본문 — `ArticleDetail.paragraphs`/`images`를 블록 배열로 흡수 |
| `isPublished` | boolean | — |

### `Story` (기존 `src/types/story.ts` 확장)

현재: `{ seq, category, date, title, tags, image }` + 상세는 `markdown` 필드. `docs/DATABASE_PLAN.md`가 이미 Markdown 원문 + `StoryBlock` 구조 병행 보관을 제안한 것과 일치 — 그대로 유지.

| 필드 | 타입 | 설명 |
|---|---|---|
| `seq` | string | — |
| `category` | `StoryCategory` | Leader's View / Culture / Service / People / Tech / Impact |
| `title` | string (KR/EN) | — |
| `tags` | string[] | — |
| `thumbnail` | media 참조 | — |
| `publishedAt` | date | — |
| `markdown` | text | 관리자 편집기 원문 |
| `blocks` | StoryBlock[] (선택) | 이미지/인용/임베드 등 구조화 확장용 |
| `isPublished` | boolean | — |

## 코드/MDX로 유지하는 항목 (CMS 아님)

| 항목 | 현재 위치 | 유지 이유 |
|---|---|---|
| 헤더/푸터/모바일 내비게이션 메뉴 구조 | `SiteHeader`/`SiteFooter`/`MobileNavigation` 내부 상수 | 사이트 구조와 함께 배포되는 내비게이션이라 변경 빈도가 낮고, 라우트 존재 여부와 강하게 결합됨 |
| "주요 서비스와 기술 요약" 패널(2개 블록: 서비스/기술) | `TechnologySection` | 서비스/기술 소개 자체가 코드/정적 페이지 성격(HANDOFF 분류 기준) |
| "함께 성장하는 네이버" 파트너·개발자 링크 | `PartnerSection` | 외부 고정 링크 모음, 운영자가 수시로 바꾸는 콘텐츠가 아님 |

리빌드 시에도 이 항목들은 mock JSON으로 분리하되(브랜딩 placeholder 적용), **CMS 컬렉션으로 옮기지 않고 코드/데이터 파일로 유지**한다.

## 외부 API로 유지하는 항목

| 항목 | 메모 |
|---|---|
| 주가(`.main-stock`) | 원본도 실시간 연동 아님(정적 스냅샷) — 지금 단계는 mock 정적 값 1개만 두고, 실제 연동은 범위 밖. 어드민 작성 대상 아님. |

## 데이터 접근 레이어 적용 방향

- `src/lib/content/story-repository.ts` 패턴을 그대로 가져가 `src/lib/data/`로 일반화: `pressReleaseRepository`, `mainContentRepository`(headline/promotion/shortcut) 추가.
- 각 리포지토리는 지금은 `features/navercorp/data/*`(→ 리빌드 후에는 브랜드 중립 mock 모듈)를 반환하고, 주석으로 CMS 교체 지점을 명시한다(`story-repository.ts`에 이미 있는 패턴 그대로).
- 컴포넌트는 이 리포지토리 함수의 반환 타입(위 필드 스키마)에만 의존하고, mock/CMS 여부를 모른다.

## 남은 결정 사항 (라우트 조사 이후 확정)

- `PressRelease`/`ArticleDetail` 타입 통합 여부와 정확한 필드명.
- `MainHeadlineSlide`를 참조형(위 설계)으로 할지, 캐러셀 전용 독립 콘텐츠로 할지 — 원본은 참조형이지만 운영 편의상 독립형을 선호할 수도 있음(사용자 확인 필요, 어드민 단계에서).

## 범위 확정 (2026-10-15)

ESG/투자정보/채용은 범위에서 **제외 확정**(사용자 확인). `docs/routes.md`에도 `/esg/*`, `/investment/*`, 채용 관련 라우트는 포함하지 않는다. 메인 바로가기 배너처럼 원본에 이 카테고리가 쓰이는 레이아웃 자리가 있으면, 구조만 가져오고 콘텐츠는 중립 placeholder로 채운다.
