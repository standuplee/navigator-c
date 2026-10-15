# 진행 상황 기록

> `docs/HANDOFF.md`의 "진행 순서"를 따라 작업한 기록. 세션이 끊겨도 이 문서로 이어갈 수 있게 업데이트한다.

## 1. 현황 파악 (완료 — 2026-10-15)

### 스택
- Next.js 16.3.0 (App Router) · React 19.2.4 · TypeScript 5
- Tailwind CSS v4 (`@tailwindcss/postcss`) + `class-variance-authority` + `@base-ui/react` (shadcn 계열 신규 UI 원자 컴포넌트)
- `swiper` 11.2.10 — 캐러셀/오토플레이에 실제 사용 중 (라이브러리 기준 결정 완료, Embla 도입 불필요)
- `@prisma/client` / `prisma` — 설치만 되어 있고 스키마·연결은 미구현(`docs/DATABASE_PLAN.md`에 계획만 존재)

### 폴더 구조 (`docs/ARCHITECTURE.md`와 일치)
```
src/
  app/                 Next.js 라우트
  components/
    content/           범용 콘텐츠 레이아웃 (ArticleDetailPage, CardGallery, Banner …)
    layouts/            SiteShell
    ui/                 shadcn 스타일 Tailwind 원자 컴포넌트 (button 등)
  features/navercorp/   "레퍼런스 어댑터" — NAVER 전용 조합 + 데이터
    components/main/main-c98712e4/   메인 페이지 섹션 + 동작 레이어
    data/                            시드 데이터(TS literal)
  lib/content/story-repository.ts   DB 교체 대비 리포지토리 경계
  types/                            Story/PressRelease/Service 등 공유 타입
```
원칙: `components/content`·`components/layouts`는 NAVER 전용 데이터에 의존하지 않아야 하고, 사이트별 결합은 `features/<site>`에서만 일어나야 한다(ARCHITECTURE.md 명시).

### `/main` 구현 현황 (HANDOFF "대상 페이지 구조" 기준 대조)

| HANDOFF 섹션 | 현재 구현 | 비고 |
|---|---|---|
| 헤더/메가메뉴(회사소개·서비스·기술·ESG·투자정보·미디어·스토리·채용, 언어전환, 통합검색, 모바일 전체메뉴) | `SiteHeader`+`MobileNavigation`+`NavigationBehavior` | ESG·투자정보·채용 메뉴 없음(의도적 범위 제외, 아래 갭 참고). 언어전환 UI는 있으나 EN 전환 로직 없음(버튼만 존재). 검색 패널 열기/닫기/포커스/Escape는 동작. |
| 상단 정보 바(주가 티커, 보도자료 롤링 배너) | `HeroSection`의 `.main-timer`(서울 시간 실시간 갱신) + 헤드라인 캐러셀 | 주가 티커 자체는 없음 — `MainBehavior`가 `.main-stock` 셀렉터에 "실시간 연동 아님" 타이틀만 주석 처리(요소가 실제로 렌더링되는지 재확인 필요). |
| 바로가기 배너(통합보고서/실적발표/채용) | 없음 | 투자정보·채용과 함께 범위 제외 상태. |
| We the Navigators (스토리/보도자료 카드) | `NewsSection` | 원본은 가로 스와이프 가능한 swiper(`masonry-list swiper-wrapper`)이지만, `globals.css`가 이를 고정 CSS 그리드로 강제 override — **스와이프 인터랙션 미재현**, 반응형 그리드로 대체. |
| 프로모션 캐러셀(자동재생/멈춤) | `PromotionSection` + `MainBehavior`의 Swiper(EffectFade, autoplay 4s, pagination, 배경색 전환) | 거의 완전 재현. reduced-motion 분기 있음. |
| 서비스/기술/ESG 요약 3블록 | `TechnologySection` — 서비스/기술 2블록만, 클릭·키보드(Enter/Space/화살표)로 패널 확장 | ESG 블록 없음. width 0.6s cubic-bezier 전환은 CSS(reference.css)에 의존. |
| 함께 성장하는 네이버(파트너/개발자 탭) | `PartnerSection` + `MainBehavior`의 ARIA 탭(화살표 키 전환) | 재현됨. |
| 푸터(데스크톱 그리드/모바일 아코디언, SNS, 정책) | `SiteFooter` | 아코디언 토글 로직이 `MainBehavior`/`NavigationBehavior`에 안 보임 — `.menu__link.btn-footer-item-nav` 클릭 핸들러 미확인(검증 필요). SNS 링크 섹션 없음. |

### 데이터 접근 패턴
- `src/lib/content/story-repository.ts`가 리포지토리 경계 역할. 현재는 `features/navercorp/data/*.ts`의 TS 리터럴을 반환하고, 주석으로 "DATABASE_URL 생기면 Prisma로 교체" 명시.
- 단, 헤더/푸터/모바일내비의 메뉴 데이터와 메인 섹션 콘텐츠(기사 제목, 이미지 경로, 파트너 링크)는 **컴포넌트 파일 내부에 하드코딩**되어 있고 별도 mock JSON으로 분리되어 있지 않음.

## 2. 갭 분석 (완료 — 2026-10-15)

### 🔴 구조적 충돌 — 먼저 결정이 필요함

현재 `/main` 구현은 `docs/OUTPUT_PLAN.md`/`docs/COMPONENT_INVENTORY.md`가 정의한 **이전 작업 지침**("원본 메인 페이지를 정확히 복제, 소스 충실 마크업 유지")에 따라 만들어졌다. 이 지침은 `docs/HANDOFF.md`의 "반드시 지킬 규칙"과 정면으로 충돌한다.

| HANDOFF 규칙 | 현재 코드 상태 |
|---|---|
| 규칙 2: 원본 JS/CSS 코드를 복사하지 않고, 동작·수치를 분석해 이 스택으로 새로 작성 | `MainBehavior.tsx`/`NavigationBehavior.tsx`가 원본 클래스 셀렉터(`.main-headline`, `.main-tech-items`, `.swiper-pagination` 등)를 직접 쿼리하는 방식으로 동작을 "이식"했고, `HeroSection`/`NewsSection`/`PromotionSection`/`PartnerSection`에는 "Source-faithful React markup generated from the retained NAVER reference" 주석이 달려 있음. `docs/research/.../source/main.css`, `main.html` 원본 전문이 그대로 보관되어 있고, `DESIGN_TOKENS.md`는 "`reference.css`가 완전한 소스 스타일시트이며 유일한 토큰 구현"이라고 명시 — 즉 스타일 수치가 새로 작성된 게 아니라 원본 CSS 그대로 로드됨. |
| 규칙 3: 네이버 로고·사옥/서비스 이미지·보도자료·카피 텍스트 등 브랜드 에셋 금지 → placeholder로 대체 | 헤더 로고가 실제 NAVER 로고 에셋을 참조, 328개의 스크래핑된 실제 이미지가 `public/sites/navercorp-65983208/`에 존재, 기사·스토리 제목이 실제 보도자료 카피("이해진 의장, 엔비디아·브룩필드…" 등)이며 파트너 링크도 실제 `naver.me`/`developers.naver.com` URL. |
| 규칙 4: 동적 데이터는 API/CMS로 교체하기 쉬운 mock JSON으로 분리 | 데이터가 TS 모듈로는 분리되어 있으나(형식은 OK) 내용이 실제 네이버 브랜드 카피이고, 헤더/푸터/모바일내비 메뉴 데이터는 분리조차 안 되어 컴포넌트 내부에 하드코딩됨. |
| HANDOFF 목표: "다른 서비스에서 활용" — 브랜딩을 교체 가능해야 함 | 모든 메인 섹션 컴포넌트가 props 없이 자체 하드코딩 데이터를 렌더링하는 구조라, 다른 브랜드로 교체하려면 컴포넌트 파일을 직접 고쳐야 함. 재사용 가능한 패턴/컴포넌트가 아니라 네이버 전용 1:1 복제본. |

**즉, "이미 메인 페이지가 완성되어 있다"는 이전 결론과, HANDOFF가 요구하는 "브랜드 중립적이고 재사용 가능한 UI 패턴"은 다른 결과물이다.** 이 문서 하나로는 어느 지침이 우선인지 판단할 수 없어 사용자 확인이 필요하다(아래 질문 참고).

### 레이아웃/인터랙션 세부 갭 (브랜드 문제와 무관하게 남아있는 것)

1. **News 섹션 가로 스와이프 미재현**: 원본은 `swiper`(가로 스크롤+스크롤바) 기반 masonry 카드 목록이지만 현재는 CSS Grid로 고정 — 인터랙션 자체가 빠짐.
2. **주가 티커 실물 확인 필요**: `MainBehavior`에 `.main-stock` 셀렉터 언급은 있으나 `HeroSection` JSX에 해당 마크업이 보이지 않음 — 렌더링되는지, 애니메이션(숫자 롤링 등)이 있는지 재확인 필요.
3. **푸터 모바일 아코디언 로직 미확인**: `.btn-footer-item-nav` 클릭에 대응하는 토글 핸들러가 `MainBehavior`/`NavigationBehavior` 어디에도 없음 — 현재 CSS만으로 열리는지, 아예 미구현인지 검증 필요.
4. **언어 전환(EN) 미구현**: KR/EN 버튼 UI는 있으나 실제 언어 전환 로직 없음.
5. **reduced-motion 커버리지 불완전**: Swiper autoplay(헤드라인/프로모션)와 기술 패널 키보드 내비게이션은 `prefers-reduced-motion` 분기가 있지만, 헤더 스크롤 전환(0.4s cubic-bezier), 모바일 메뉴 열림/닫힘, 검색 패널 열림, 푸터 아코디언 등 나머지 전환에 대한 reduced-motion 처리 여부는 미검증.
6. **애니메이션 수치는 문서화되어 있지만 "재구현"은 안 됨**: `docs/research/.../DESIGN_TOKENS.md`·`BEHAVIORS.md`에 duration/easing 일부가 정리되어 있으나(예: 헤더 0.4s cubic-bezier, 기술 패널 0.6s cubic-bezier(0.25,1,0.5,1), 미들배너 pagination 4s), 이 수치들이 **Tailwind/Motion 등 프로젝트 스택 코드로 재작성된 게 아니라 원본 `reference.css`에 의존**하고 있음 — 3단계(`docs/animations.md`) 작업 시 "원본에서 분석한 수치"와 "이 스택에서 재작성한 구현"을 분리해서 기록해야 함.

### 범위(스코프) 갭 — 메인 이후 다중 페이지 단계에서 드러날 문제

- HANDOFF의 원본 라우트 목록에는 `/esg/*`, `/investment/*`가 포함되어 있으나, 기존 `OUTPUT_PLAN.md`는 "지속가능성, 투자정보, 채용 영역은 제품 범위에서 제외"라고 명시 — 역시 상충. 다중 페이지 단계로 넘어가기 전에 같이 정리해야 함.
- HANDOFF는 상세 페이지를 `?seq=` 쿼리 대신 `/story/[id]` 동적 라우트로 만들고 원본 URL은 리다이렉트 처리하라고 하지만, 현재 `/story/storyDetail?seq=`, `/media/pressReleasesDetail?seq=`는 그대로 쿼리 기반.

## 충돌 해결 방향 결정 (2026-10-15)

사용자 확인 결과: **"새로 리빌드"** — 기존 `/main` 섹션·동작 로직은 분석 참고 자료로만 남기고, HANDOFF 규칙대로 각 섹션을 placeholder 브랜딩 + 재작성된(Tailwind/Motion 등 프로젝트 스택 기반) 애니메이션 코드로 새로 구현한다.

적용 지침:
- `docs/research/navercorp-65983208/main-c98712e4/`(BEHAVIORS.md, DESIGN_TOKENS.md, PAGE_TOPOLOGY.md, source/*)는 **수치·동작 분석용 참고 자료로만 유지**하고 삭제하지 않는다.
- `src/features/navercorp/components/main/main-c98712e4/*`의 기존 컴포넌트(HeroSection, NewsSection, PromotionSection, TechnologySection, PartnerSection, SiteHeader, SiteFooter, MobileNavigation, MainBehavior, NavigationBehavior)는 새 브랜드 중립 버전으로 교체 대상이다. 원본 클래스 셀렉터 의존(`.main-headline` 등)과 `reference.css` 의존을 제거한다.
- 새 구현은 실제 네이버 카피·이미지·링크 대신 placeholder 이미지/더미 카피를 쓰고, 콘텐츠는 `ARCHITECTURE.md` 원칙대로 props로 주입되는 재사용 가능한 컴포넌트로 만든다(다른 브랜드로 교체 가능해야 함).
- 동적 데이터(주가, 보도자료, 스토리 등)는 mock JSON으로 분리해 API/CMS 교체를 쉽게 한다.
- 모든 애니메이션은 `prefers-reduced-motion` 대응과 키보드 접근성을 포함한다.
- ESG/투자정보/채용 섹션 포함 여부, `?seq=` 쿼리 vs `/story/[id]` 동적 라우트 전환 등 다중 페이지 단계의 범위 충돌은 메인 페이지 작업 완료 후 별도로 재확인한다.

## HANDOFF.md 수정 반영 (2026-10-15, 2차)

사용자가 `docs/HANDOFF.md`에 **"관리자(어드민) 페이지 / 콘텐츠 관리"** 섹션을 새로 추가함. 목표·규칙·대상 페이지 구조·진행 순서(1~6)·다중 페이지 재현 절차는 기존과 동일하고, 아래 내용만 새로 추가됨.

### 추가된 내용 요약

- 보도자료 등 운영 콘텐츠는 mock이 아니라 **어드민에서 작성·저장·발행**되어야 한다.
- 데이터 3분류: ① CMS 컬렉션(보도자료, 스토리, 네이버 리포트, 미디어 행사, IR 뉴스/일정/자료실, ESG 자료실, 메인 프로모션 캐러셀·롤링 배너·바로가기 배너) ② 코드/MDX(회사소개 등 정적 페이지) ③ 외부 API(주가 — 어드민 대상 아님). 실제 분류는 `docs/routes.md` 조사 후 `docs/content-model.md`에 확정.
- 기본 구현안은 **Payload CMS**를 기존 Next.js 앱에 통합(스키마 코드 정의, 어드민 UI 자동 생성). 스택이 안 맞거나 다른 요구가 있으면 대안(Sanity/Strapi/Supabase+자체 어드민)을 비교 제안 후 확인받는다.
- DB·파일 스토리지·배포 환경은 **CMS 도입 전에 사용자 확인** 필요(지금 당장은 아님 — 작업 순서상 "프론트 템플릿이 안정된 후").
- 필수 기능: 리치 텍스트 에디터, 업로드, 초안/발행/예약, 카테고리·태그, 로그인·권한, 미리보기, KR/EN, SEO/OG 필드, 발행 시 revalidate 연동.
- 작업 순서: (1) 프론트 재현 단계의 mock 데이터를 **CMS 스키마와 같은 구조**로 설계 → (2) 데이터 접근을 `lib/data/*` 레이어로만 하게 분리 → (3) 프론트 템플릿 안정화 후 CMS 도입 → (4) mock을 시드 스크립트로 이전 → (5) 미리보기·재검증·권한 연결.

### 현황 재확인 (어드민 관련)

- `package.json`에 Payload 관련 의존성 없음. `docs/content-model.md`, `docs/routes.md`, admin 라우트(`src/app/**/admin`) 전부 없음 — 어드민/CMS는 설계 문서(`docs/DATABASE_PLAN.md`, `COMPONENT_INVENTORY.md`)만 있고 코드 착수 전.
- 기존 `docs/DATABASE_PLAN.md`는 **Prisma + PostgreSQL 커스텀 스키마**(`SitePage`/`PageSection`/`ContentEntry`/`Story`/`StoryBlock` 등) + 손수 만든 관리자 폼(`COMPONENT_INVENTORY.md`의 "관리자 입력 UX": 섹션 편집, 마크다운 에디터 등)을 전제로 쓰여 있음.
- `src/lib/content/story-repository.ts`가 이미 "리포지토리 경계" 패턴(컴포넌트는 조회 함수만 호출, 구현은 나중에 교체)을 쓰고 있어, HANDOFF의 `lib/data/*` 레이어 요구와 **방향은 일치**함. 다만 현재는 `story`에만 있고 pressReleases/services/main 섹션 데이터에는 이 경계가 없음(컴포넌트 안에 하드코딩).

### 새로 드러난 갭/충돌

1. **CMS 구현 방식 충돌**: `DATABASE_PLAN.md`(Prisma 커스텀 스키마 + 수작업 어드민)와 HANDOFF 신규 지침(Payload CMS 기본안, 스키마 코드 정의 + 어드민 UI 자동 생성)이 다른 접근이다. Payload를 쓰면 `COMPONENT_INVENTORY.md`의 "관리자 입력 UX" 스펙(섹션 추가/삭제, 폼, 마크다운 에디터)은 **직접 구현할 UI가 아니라 Payload 컬렉션/필드 설계 입력값**으로 바뀐다. → `docs/content-model.md` 작성 시점에 어떤 방식으로 갈지 재확인 필요(단, HANDOFF 자체가 "프론트 안정화 후" 결정하라고 명시하므로 지금 당장 막히는 지점은 아님).
2. **범위 재확인 필요 항목 확정**: 어드민 데이터 분류에 "IR 뉴스/일정/자료실", "ESG 자료실"이 CMS 컬렉션으로 명시되어, 1차 갭 분석에서 충돌로만 짚었던 `/esg/*`·`/investment/*` 라우트가 **범위에 포함된다는 쪽으로 기울었음** — 이전 `OUTPUT_PLAN.md`의 "ESG/투자정보/채용 제외" 지침은 이 시점에서 폐기된 것으로 보임. `docs/routes.md` 작성 시 명시적으로 포함.
3. **mock 데이터 설계 순서 변경**: 이전에 합의한 "새로 리빌드" 방향(3단계 `animations.md` → 섹션별 재구현)에서, mock 데이터는 그냥 placeholder 값이 아니라 **처음부터 미래 CMS 컬렉션 스키마를 반영한 구조**로 설계해야 한다. 즉 `docs/content-model.md`의 초안을 메인 페이지 mock 데이터 작업과 병행(또는 선행)해서 잡아두는 게 안전함.

## 구현 방향 (갱신)

1. **메인 페이지 리빌드는 계속 진행** — 이전 합의("새로 리빌드": placeholder 브랜딩, 원본 셀렉터/CSS 의존 제거, props 기반 재사용 컴포넌트, mock JSON 분리, reduced-motion+키보드 접근성 포함)는 유효하다.
2. **데이터 레이어를 먼저 일반화**: `story-repository.ts` 패턴을 `lib/data/*`로 확장해 pressReleases·services·main 섹션(헤드라인/프로모션/뉴스카드/파트너 링크)에도 리포지토리 경계를 둔다. 컴포넌트는 조회 함수만 호출하게 해서 이후 Payload 연동 시 컴포넌트를 건드리지 않게 한다.
3. **mock 데이터 스키마를 CMS 컬렉션 지향으로 설계**: `docs/content-model.md`를 초안으로 만들어(라우트 조사 전이라도 메인 페이지 범위에서 우선 초안화) `PressRelease`/`Story`/`MainPromotionSlide`/`MainBannerItem` 같은 필드 구조를 mock JSON에 그대로 반영한다. 나중에 Payload 컬렉션으로 옮길 때 구조 변경이 최소화되도록 한다.
4. **CMS(Payload) 도입은 별도 단계로 명확히 분리**: 지금 단계(메인 UI/UX 재현)에서는 설치하지 않는다. 프론트 템플릿이 안정된 후 별도로 Payload 설치/스키마/DB·스토리지·배포 확인을 사용자와 다시 논의한다.
5. **범위 확정은 `docs/routes.md` 작성 시 재확인**: ESG/투자정보 포함 여부를 명시적으로 기록하고 넘어간다(현재는 포함 쪽으로 기울어 있다고 가정하되, 라우트 조사 단계에서 최종 확인).

## 3단계 완료: `docs/animations.md` (2026-10-15)

`source/main.css`(925KB 압축 스냅샷)를 파싱해 메인 페이지 관련 선택자의 `transition`/`animation`/`@keyframes`를 추출하고, easing 커스텀 프로퍼티(`bon-ease-Out` 등)를 실제 `cubic-bezier` 값으로 역산해서 표로 정리했다. 섹션별(헤더/GNB, 헤드라인, News, 프로모션, 기술 패널, 파트너 탭, 푸터) 트리거·대상·속성·duration·easing·delay·원본 구현 방식·데스크톱/모바일 차이를 모두 채웠다.

### 분석 중 새로 확인된 사실 (이전 갭 분석 갱신)

- **주가 티커**: 애니메이션/실시간 연동 전혀 없음 — 정적 서버 렌더 텍스트, `/investment/stock` 링크만 있음. (1차 갭 분석의 "확인 필요" 항목 해소)
- **푸터 "애니메이션 브랜드 마크"(`footer__lottie`)**: 실제로는 Lottie가 아니라 **정적 SVG 배경 이미지 교체**(다크 배경에서 흰색 버전)뿐 — `PAGE_TOPOLOGY.md`의 "애니메이션 브랜드 마크" 서술은 과대평가였음, 정정함.
- **푸터 모바일 아코디언**: `display:none/block` 즉시 토글이며 높이 애니메이션 없음 — 다만 클릭 핸들러 자체가 현재 `SiteFooter`/`NavigationBehavior`에 없다는 1차 갭은 그대로 유효(구현 필요, 애니메이션은 불필요).
- **헤더 스크롤 동작**: 원본은 단순 스크롤 임계값(20px) class 토글이 아니라, **스크롤 방향(up/down)에 따라 헤더를 가리고/보이는 로직 + 메인 페이지 전용 로고 색상 반전**이 별도로 있음. 현재 `NavigationBehavior.tsx`는 `is-scrolled` 단일 토글만 구현해서 방향 감지·로고 반전이 빠져 있음 — 리빌드 시 추가해야 할 항목으로 기록.
- **News 섹션**: 원본이 실제로 가로 스크롤 Swiper(스크롤바 포함, autoplay 없음)이고 모바일에서만 세로 플로우로 전환됨을 확인 — 1차 갭 분석의 "스와이프 인터랙션 미재현" 추정이 맞았음.
- **카드 hover 수치 확정**: News 카드 `scale(1.08)`, 헤드라인 카드 `scale(1.05)`, 둘 다 0.2s `bon-ease-Out`, 1023px 이하에서 비활성.
- **기술 패널**: 패널 열림 후 "자세히 보기" 링크가 **패널 확장 시간(0.6s)만큼 지연되어 등장**하는 2단계 모션이었음 — 기존 코드엔 반영 안 됨.

## 병행 작업: `docs/content-model.md` 초안 (메인 페이지 범위, 2026-10-15)

HANDOFF의 CMS 분류를 메인 페이지 범위로 먼저 적용해 초안을 작성했다.

- **CMS 컬렉션**: `MainHeadlineSlide`(PressRelease/Story 참조형), `MainPromotionSlide`, `MainShortcutBanner`(원본엔 있지만 현재 클론 코드에는 아직 없는 섹션 — 리빌드 때 신규 추가 필요), `PressRelease`, `Story`.
- **코드/MDX 유지**: 헤더·푸터·모바일내비 메뉴 구조, 기술 패널 2블록 카피, 파트너/개발자 링크.
- **외부 API**: 주가 — mock 정적 값 1개만 두고 실연동은 범위 밖.
- **발견한 구조적 이슈**: `src/types/pressRelease.ts`(목록용)와 `src/types/content.ts`의 `ArticleDetail`(상세용)이 분리돼 있어 CMS 컬렉션 하나로 합치려면 통합이 필요 — "남은 결정 사항"에 기록.
- 데이터 접근은 기존 `story-repository.ts` 패턴을 `src/lib/data/*`로 일반화해 pressRelease·main 콘텐츠까지 확장하는 방향으로 적었다.

## 범위 확정: ESG/투자정보/채용 제외 (2026-10-15)

사용자 확인: **ESG/투자정보는 포함하지 않는다.** 이전 갭 분석에서 "포함 쪽으로 기울었다"고 적었던 추정은 폐기. `docs/content-model.md`·`docs/routes.md`(작성 예정)에 `/esg/*`, `/investment/*`, 채용 라우트는 포함하지 않는다. 다만 이 카테고리가 쓰던 **레이아웃 자리**(메인 바로가기 배너 등)는 구조만 재사용하고 콘텐츠는 중립 placeholder로 채우기로 함(아래 Chrome 검증 참고).

## Chrome 라이브 검증 (2026-10-15)

사용자가 "Chrome 켜서 검토·비교하면서 진행해도 됨"이라고 승인해서, `claude-in-chrome`으로 실제 https://www.navercorp.com/main 에 접속해 `docs/animations.md`의 추정치를 교차 검증했다. `el.swiper.params`(실제 Swiper 인스턴스 파라미터)와 masonry 아이템의 inline style을 JS로 직접 읽어 확인했고, read-only 조회만 수행(폼 제출·로그인 등 없음).

### 확정/정정된 사실

1. **Swiper 수치 정정**: 헤드라인·미들배너 캐러셀 모두 `autoplay.delay:4000, speed:400, loop:true` 확인. 기존 클론 코드(`MainBehavior.tsx`)가 쓰던 `speed:600`은 틀렸음 — `docs/animations.md` 2-1, 4-1 정정 완료.
2. **News 섹션은 Swiper가 아니다**: `.main-news-list.swiper`에 `swiper` 클래스는 붙어 있지만 `el.swiper`는 `undefined` — 실제로는 커스텀 masonry 레이아웃(각 카드에 JS가 계산한 `left`/`top` px를 inline style로 직접 박음, `overflow-x:hidden`이라 가로 스크롤 자체가 없음). CSS에 있던 `swiper-scrollbar` 규칙은 767px 이하에서만 `display:block`이지만 같은 구간에서 `.swiper-ui`가 `display:none`이라 실사용되지 않음. 모바일(≤767px)은 `flex-direction:column`의 단순 세로 리스트로 전환되고 **6번째 카드부터 `display:none`으로 숨겨 5장만 노출**. → 1차 CSS 분석에서 "가로 스와이프 가능"이라 적었던 추정은 틀렸음, `animations.md` 3절 전면 정정.
3. **헤더 스크롤 숨김**: 메인 페이지에서 `window.scrollTo`로 아래/위 스크롤 후 `.header`의 `computed transform`을 읽으면 두 경우 모두 `none` — **메인 페이지는 헤더가 전혀 숨지 않는다**는 1차 분석이 맞았음(확정).
4. **헤더 로고 색상 반전**: CSS에 전환 규칙(`transition:all .4s`)은 있지만, 실측에서는 스크롤해도 로고 이미지가 안 바뀜(`logo.svg` 그대로) — 다크 배경 슬라이드 조건부일 가능성이 있으나 미확정이라 "낮은 우선순위"로 다운그레이드.
5. **메인 바로가기 배너 실존 확인**: 헤드라인 옆 세로 카드 3장 — 지속가능성(통합보고서), 투자정보(실적발표), 채용. 전부 방금 제외하기로 한 카테고리라서, **레이아웃 패턴만 유지하고 중립 placeholder로 대체**하기로 함(`content-model.md`의 `MainShortcutBanner` 갱신).

## 5단계 완료: 메인 페이지 리빌드 구현 (2026-10-15)

`/main`(및 `/` 재노출)을 브랜드 중립 템플릿으로 교체했다. 기존 `src/features/navercorp/components/main/main-c98712e4/*`(HeroSection, NewsSection, PromotionSection, TechnologySection, PartnerSection, SiteHeader, SiteFooter, MobileNavigation, MainBehavior, NavigationBehavior)는 **삭제하지 않고 그대로 보존** — 더 이상 어떤 라우트에서도 import하지 않는 참고 자료로만 남는다. `/service/*`, `/media/*`, `/story/*`는 이번 범위가 아니라서 그대로 두었고, 지금은 과도기적으로 메인 페이지만 새 템플릿이고 나머지는 기존 NAVER 클론이다(다중 페이지 단계에서 정리 예정).

### 추가된 파일

- `src/types/mainTemplate.ts` — 브랜드 중립 템플릿 타입(NavMenuItem, NewsCardItem, ShortcutCard, PromotionSlide, SummaryPanel, PartnerTabGroup, FooterLinkGroup).
- `src/features/main-template/data.ts` — placeholder mock 데이터(브랜드명 "NOVA", 실제 네이버 카피/링크 없음). ESG/투자/채용 관련 항목은 제외하고 중립적인 "공지/리소스/커뮤니티" 바로가기 카드로 대체.
- `src/lib/data/mainTemplateRepository.ts` — `story-repository.ts`와 동일한 리포지토리 경계 패턴, 컴포넌트는 이 함수만 호출.
- `src/hooks/useReducedMotion.ts` — `prefers-reduced-motion` 공용 훅.
- `src/components/content/main/*` — `PlaceholderVisual`(실제 이미지 대신 그라디언트+라벨), `SiteHeader`, `MobileNav`, `HeadlineSection`(헤드라인 캐러셀+바로가기 카드 스택), `NewsMasonryGrid`, `PromotionCarousel`, `SummaryPanels`, `PartnerTabs`, `SiteFooter`. 전부 props만 받고 브랜드 데이터에 의존하지 않음(`ARCHITECTURE.md` 원칙 준수).
- `src/app/main/page.tsx` — 위 컴포넌트들을 리포지토리 데이터로 조립하는 서버 컴포넌트로 교체.
- `src/app/globals.css` — `@import "tailwindcss/theme.css"` + `@import "tailwindcss/utilities.css"` 추가(단, **preflight는 의도적으로 제외** — 아직 reference.css에 의존하는 `/service/*`·`/media/*`·`/story/*` 페이지의 리셋을 건드리지 않기 위함).

### 애니메이션 재구현 매핑 (docs/animations.md 수치 그대로 적용)

- 헤드라인·프로모션 캐러셀: `swiper` core 클래스(기존 코드와 동일 라이브러리) — `autoplay.delay:4000, speed:400, effect:"fade"/"slide"`, pagination bar 4s linear, 자동멈춤 토글, `prefers-reduced-motion`이면 autoplay 비활성.
- News 카드: CSS Grid(3/2/1열) + hover `scale(1.08)`/`scale(1.05)`(헤드라인) 0.2s, `min-[1024px]:` 조건으로 데스크톱 전용 — 모바일 5개 cap은 `max-[767px]:hidden`으로 구현.
- 기술/서비스 요약 패널: `width` 70%/30% 전환 0.6s `cubic-bezier(.25,1,.5,1)`, 클릭/Enter/Space/ArrowLeft/Right, CTA 링크는 600ms 지연 후 `@keyframes fadeIn`으로 등장.
- 파트너 탭: ARIA `role="tablist"`, ArrowLeft/Right로 포커스+선택 이동.
- 헤더: 스크롤 20px 이후 배경 전환만(원본처럼 메인 페이지에서는 숨지 않음), 메가메뉴는 `group-hover`/`group-focus-within`으로 호버+키보드 둘 다 지원, 검색 패널은 열릴 때 `input`에 포커스 이동 + Escape로 닫힘, 모바일 드로어는 0.3s 슬라이드 + `html` 스크롤 잠금.

### 구현 중 발견한 버그와 수정

- **Tailwind `1fr` 그리드 트랙이 거대한 값으로 깨지는 버그**: `HeadlineSection`의 2열 그리드(`md:grid-cols-[1fr_320px]`) 안에 `<style>` 태그를 형제로 두자 `gridTemplateColumns`가 `16777216px`로 계산되는 문제를 Chrome에서 직접 발견(1차), `<style>`을 그리드 밖으로 빼도 여전히 큰 값(`71280px`)으로 깨짐(2차) — 원인은 Swiper의 `.swiper-slide{width:100%}` 같은 퍼센트 기반 내재 크기가 그리드 트랙 계산에 역류하는 전형적인 "grid item의 기본 `min-width:auto`" 문제였음. 그리드와 그 첫 자식에 `min-w-0`을 추가해 해결. **Chrome으로 직접 렌더링을 확인하지 않았다면 놓쳤을 버그** — 코드만 보면 아무 문제 없어 보였음.

### 라이브 브라우저 QA (완료)

데스크톱(1512px 기준)에서 전 섹션 스크린샷 확인 + 실제 동작 테스트: 헤드라인 자동재생(슬라이드 전환 확인됨), 메가메뉴 hover 드롭다운, 검색 패널 열림 시 포커스 이동 + Escape 닫힘, 기술 패널 클릭 전환(70/30 폭 확인), 프로모션 캐러셀 배경색·텍스트 톤 자동 전환, 파트너 탭, 푸터 — 전부 정상 동작 확인. `npm run typecheck`, `npx next build --webpack` 둘 다 통과.

**모바일 뷰포트 인터랙션 테스트 완료 (2026-10-15, 재확인)**: 새 Chrome 탭 그룹이 기본 500px 폭 창으로 열린 덕분에 `resize_window` 없이 모바일 레이아웃을 직접 테스트할 수 있었다. 확인된 것:
- 헤더 햄버튼 클릭 → 모바일 드로어가 우측에서 슬라이드인, 그룹별 아코디언이 `+`/`−` 토글과 함께 즉시 열리고 하위 링크 노출.
- Escape로 드로어 닫힘.
- News 섹션: 9개 카드 중 5개만 노출(`totalCards:9, visibleCards:5`) — `:nth-child(6)` 이후 숨김 규칙이 의도대로 동작.

반응형 클래스(`md:hidden`, `max-[767px]:hidden` 등) 컴파일과 실제 동작 모두 확인 완료.

### 알려진 단순화/미반영 항목

- 주가 표시(`.main-stock`)는 완전히 제외(외부 API, 범위 밖) — 원본에 있던 "상단 정보 바"의 절반만 재현.
- 푸터 SNS 아이콘 크로스페이드 호버(두 레이어 아이콘)는 실제 아이콘 에셋이 없어 생략 — 지금 푸터엔 SNS 링크 자체가 없음.
- 헤더 로고의 다크 배경 조건부 반전은 실측으로 트리거 조건을 못 찾아 구현하지 않음(`animations.md` 1-3 참고).
- 메가메뉴 패널 등장의 0.5s/0.2s 단계적 `delay` 중첩(인트로 텍스트 vs 하위 링크)은 생략하고 단일 0.4s 전환으로 단순화.

## 애니메이션 정확도 재점검 + 수정 (2026-10-15, 사용자 피드백 대응)

사용자가 "애니메이션 구현 정확도가 원본에 비해 많이 떨어지는 느낌"이라고 지적. 섹션별로 재점검해 정확도표를 만들고, 발견한 문제 중 임팩트가 큰 두 가지를 바로 고쳤다.

### 발견한 버그: SummaryPanels의 죽은 트랜지션

`PlaceholderVisual`에 `transition-transform` 클래스는 넣었지만 실제로 `scale` 값을 `isActive`에 따라 바꾸는 코드가 없어서, 패널이 넓어져도 이미지가 전혀 확대되지 않는 **아무 효과 없는 트랜지션**이었다. `isActive ? "scale-100" : "scale-[1.15]"`로 수정. 검증 중 Tailwind v4는 `scale-*` 유틸리티를 `transform: scale()`이 아니라 별도 CSS `scale` 프로퍼티로 컴파일한다는 것도 확인(`getComputedStyle(el).transform`이 아니라 `.scale`을 읽어야 보임) — `transition-transform` 유틸리티가 `transform, translate, scale, rotate`를 한꺼번에 묶어 트랜지션하므로 정상 동작.

### News 섹션을 CSS Grid → CSS Columns(멀티컬럼) masonry로 교체

균일한 그리드 대신 `columns-1 md:columns-2 lg:columns-3` + `break-inside-avoid`로 바꾸고, 썸네일 비율을 인덱스별로 `16:9 / 4:3 / 1:1`로 번갈아 적용해 실제 masonry처럼 행 높이가 들쭉날쭉하게 패킹되도록 했다. 원본처럼 JS로 px 단위 절대배치를 하진 않지만(인터랙션이 없는 섹션이라 그렇게까지 할 이유는 적음), 브라우저의 컬럼 밸런싱(`column-fill:balance`)이 자동으로 비슷한 효과를 낸다.

### 여전히 단순화된 상태로 남긴 것 (우선순위 낮음, 필요시 추가 요청)

- 헤더 메가메뉴의 0.2s/0.5s 단계적 delay(인트로 텍스트 vs 하위 링크) — 단일 0.4s로 유지.
- 푸터 SNS 아이콘 크로스페이드 — 아이콘 에셋 자체가 없어 섹션 생략 상태 유지.
- 헤더 로고 다크 배경 반전 — 실측으로 트리거 조건을 못 찾아 미구현 유지.

둘 다 Chrome에서 직접 렌더링 확인 완료(모바일 500px 뷰포트), `npm run typecheck` / `npx next build --webpack` 통과.

### 나머지 디테일 정리 (2026-10-15, 추가 폴리시)

- **메가메뉴 단계적 reveal**: 패널 상단에 중립 라벨(원본의 `nav__intro__message` 대응)을 추가하고 `delay-[300ms]`로 살짝 늦게 드러나게 했고, 각 하위 링크는 `transitionDelay: index*40ms`로 순차 캐스케이드 등장하도록 함. 원본의 정확한 0.2s/0.5s 수치를 그대로 베끼지 않고 이 스택에서 새로 정한 값(HANDOFF 규칙 2 준수).
- **푸터 SNS 크로스페이드**: 실제 브랜드 로고 없이 중립 모노그램(B/N/C) 뱃지 3개를 추가하고, 원본과 동일한 "두 레이어 opacity 크로스페이드, 0.2s" 패턴으로 구현. Chrome에서 hover 크로스페이드 직접 확인함.
- **헤더 로고 다크 반전은 구현하지 않기로 결정**: 원본은 헤더가 히어로 이미지 위에 완전히 겹쳐 뜨는(full-bleed) 구조라 로고가 어두운/밝은 배경에 따라 반전되지만, 이 리빌드의 헤드라인 섹션은 헤더 아래 여백을 두고 카드형으로 떠 있어 헤더가 항상 흰 배경 위에 있다. 이 상태에서 로고를 하얗게 바꾸면 대비가 깨져서 오히려 가독성이 나빠진다. 억지로 흉내내려면 히어로를 풀블리드로 바꾸는 더 큰 구조 변경이 필요해서, 지금은 보류하고 사용자에게 구조 변경 여부를 물어봄.

typecheck/build 재통과 확인.

## 다중 페이지 단계 착수: `docs/routes.md` 작성 (2026-10-15)

사용자 결정: "6단계는 전체적으로 다 해야 하니" 메인 페이지 단독 반응형·접근성 점검은 생략하고 **다중 페이지 단계로 바로 진행**.

1. 라이브 사이트에서 `.nav__item`을 JS로 직접 읽어 실제 메가메뉴를 확정(HANDOFF의 사전 조사 목록과 거의 일치, ESG/투자정보/채용 제외는 그대로 유지 — 채용은 애초에 내부 라우트가 아니라 `recruit.navercorp.com` 외부 링크였음을 확인).
2. 포크 에이전트로 아직 분류 안 된 11개 대표 URL(회사소개 4개, 서비스 3개, 기술 1개, 미디어 3개)을 샘플 방문해 구조 분석 — HANDOFF 지침대로 전체 라우트를 다 보지 않고 템플릿별 대표만 확인.
3. `docs/routes.md`에 전체 라우트 표 + 템플릿 정의 12종을 정리함.

### 결과 요약

- 총 템플릿 12종: 이미 구현된 6종(`main-landing`, `section-landing`, `service-detail`, `content-list-filter-pagination`, `article-detail`, `story-list`/`story-detail`)은 **전부 구 NAVER 클론 상태**(실제 브랜드 콘텐츠, 원본 CSS 의존) — `/main`처럼 다시 만들어야 함. 완전 신규 템플릿 6종: `narrative-scrollytelling`(회사소개), `timeline-list`(연혁), `simple-info`(연락처/브랜드가이드), `service-directory`(전체 서비스), `feature-detail-with-related`(기술 상세+관련 콘텐츠), `simple-table-list`(미디어 행사).
- 미방문 라우트(약 10개)는 추정 템플릿만 기록해둠 — 실제 작업 시 재확인 필요.

## 1순위 완료: 기존 6개 템플릿 브랜드 중립 재구축 (2026-10-15)

사용자 확인한 순서(제안대로)에 따라 이미 구현되어 있던 6개 템플릿을 전부 다시 만들었다. 라우트는 그대로 유지하고 내부만 교체했다.

### 신규 타입/데이터/컴포넌트

- `src/types/pageTemplates.ts` — `SectionLandingContent`, `ServiceDetailContent`, `ArticleContent`.
- `src/features/main-template/{serviceDetail,sectionLanding,pressReleases,stories}.ts` — placeholder mock 데이터(브랜드 "NOVA", 실제 네이버 카피 없음). 스토리/보도자료는 메인 페이지의 헤드라인·뉴스 카드 href와 실제로 연결되도록 seq를 맞춰둠(`/story/storyDetail?seq=s1` 등).
- `src/components/content/`:
  - `SectionLandingPage.tsx` — 히어로+인트로+탭 카드그리드+CTA (`/service/featuredServices`, `/tech/innovation`)
  - `ServiceDetailTemplate.tsx` — 풀블리드 다크 히어로+섹션 반복+스크롤 진행바 (`/service/search`·`advertisement`·`commerce`·`map`)
  - `ContentListPage.tsx` — 주요소식 캐러셀+연도/월 필터+검색+페이지네이션 (`/media/pressReleases`)
  - `ArticleDetailPage.tsx`(교체) — 원본 `board-view-*` 클래스명 의존을 걷어내고 Tailwind로 재작성 (`/media/pressReleasesDetail`)
  - `StoryListPage.tsx`/`StoryDetailTemplate.tsx` — 카테고리 탭+검색 그리드 / 마크다운 본문 (`/story`, `/story/storyDetail`)
  - `MarkdownRenderer.tsx` — `features/navercorp`에 있던 것을 브랜드 비의존 버전으로 `content/`에 복제
  - `main/PageChrome.tsx` — 모든 신규 페이지가 공유하는 헤더+푸터 셸(내비/푸터 데이터 fetch 공통화)

### 실제로 잡은 버그: 헤더가 다크 히어로 위에서 안 보임

`service-detail` 템플릿은 헤더가 풀블리드 다크 히어로 바로 위에 뜨는 구조라, 기존 헤더의 `text-zinc-800` 고정 색상으로는 글자가 거의 안 보였다(Chrome 스크린샷으로 직접 확인하고서야 발견). `SiteHeader`에 `overDarkHero` prop을 추가해 스크롤 전엔 흰 글자, 스크롤 후엔 기존처럼 어두운 글자로 전환되게 했다 — `/main`에서 보류했던 "헤더 로고 다크 반전"을, 실제로 필요한 템플릿(`service-detail`)에는 제대로 구현한 셈.

### 검증

- `npm run typecheck`, `npx next build --webpack` 통과.
- Chrome으로 `/service/featuredServices`, `/service/search`(헤더 대비 수정 전/후), `/media/pressReleases`→상세 클릭, `/story`→상세 클릭까지 실제 네비게이션 확인.

## 2순위 완료: 신규 템플릿 3종 (2026-10-15)

### 신규 타입/컴포넌트/데이터

- `src/types/pageTemplates.ts`에 `FeatureDetailContent`, `ServiceDirectoryContent`, `NarrativeContent` 추가.
- `src/components/content/`:
  - `NarrativePage.tsx` + `ScrollReveal.tsx` — IntersectionObserver 기반 스크롤 reveal(이 프로젝트에 처음 쓰는 애니메이션 기법). `prefers-reduced-motion`이면 애니메이션 없이 즉시 표시.
  - `ServiceDirectoryPage.tsx` — 카테고리 탭 + 가나다순 정렬 토글 + 링크 그리드.
  - `FeatureDetailPage.tsx` — 풀블리드 다크 히어로(`overDarkHero` 재사용) + 모델/제품 카드 + 수동 prev/next 관련 콘텐츠 캐러셀(autoplay 없음 — 원본 관찰 결과와 일치).
- `src/features/main-template/{narrative,serviceDirectory,featureDetail}.ts` — placeholder 데이터. `featureDetail.ts`는 `foundationModel`/`spatialAI`/`robotics`/`immersiveMedia`/`aiInService` 5개 변형을 하나의 레코드로 관리해, 라우트 5개가 컴포넌트 하나를 재사용.

### 라우트

`/company/about`, `/service/all`, `/tech/hyperclovax`, `/tech/spatialAI`, `/tech/robotics`, `/tech/immersiveMedia`, `/media/aiInNaver` — 7개 신규 라우트 추가.

### 놓칠 뻔한 것: 헤더/푸터 내비게이션 데이터 동기화

새 라우트를 추가해도 `src/features/main-template/data.ts`의 `navMenuItems`/`footerGroups`는 자동으로 안 바뀌어서, 메가메뉴·푸터에서 새 페이지로 가는 링크가 없거나 깨진 경로(`/tech/ai`, `/media/press` 등 존재하지 않는 경로)를 가리키고 있었다. 두 데이터를 실제 라우트에 맞춰 전부 정리함(`전체 서비스`, `파운데이션 모델`, `공간지능`, `이머시브 미디어`, `서비스 속의 AI` 등 신규 항목 추가, 기존 오탈자 경로 수정).

### 검증

- `npm run typecheck`, `npx next build --webpack` 통과(22개 라우트 전부 생성 확인).
- Chrome으로 `/company/about`(스크롤하며 reveal 애니메이션이 실제로 섹션별로 순차 발생하는 것 확인), `/service/all`(카테고리 필터+가나다순 정렬 클릭 테스트), `/tech/hyperclovax`(관련 콘텐츠 캐러셀 다음 버튼 클릭해 슬라이드 이동 확인) 직접 확인.

## 3순위 완료 + 전체 템플릿 작업 마무리 (2026-10-15)

### 신규 컴포넌트/데이터/라우트

- `src/components/content/{TimelinePage,SimpleInfoPage,SimpleTableListPage}.tsx`
- `src/features/main-template/{timeline,simpleInfo,mediaEvents}.ts`
- 라우트 6개: `/company/history`, `/company/contact`, `/company/brandGuide`, `/company/affiliates`, `/company/partnership`, `/media/mediaEvents`. `simple-info`는 네 라우트가 컴포넌트 하나(`SimpleInfoPage`)를 재사용.

### 헤더/푸터 내비게이션 재정리

이번에도 신규 라우트 추가 후 `navMenuItems`/`footerGroups`에 깨진 링크(`/company/brand`, `/media/events`)가 남아있던 걸 발견해서 전부 실제 라우트에 맞게 정리했다(두 번째 반복 — 다음에 라우트를 또 추가할 때는 이 동기화를 매번 빠뜨리지 않도록 주의).

### 검증

`npm run typecheck`, `npx next build --webpack` 통과(28개 라우트 전부 생성). Chrome으로 `/company/history`(탭 전환), `/company/contact`, `/media/mediaEvents` 직접 확인.

## 전체 요약: 12개 템플릿 × 28개 라우트 완료

메가메뉴 전체(ESG/투자정보/채용 제외)에서 템플릿 분류까지 끝난 라우트는 전부 브랜드 중립 구현을 마쳤다. 미구현으로 남은 건 `/service/tools`·`/cloud`·`/fintech`·`/contents`·`/datacenterGak`·`/community`(service-detail 템플릿 추정, 미방문)와 `/media/naverReports`(content-list-filter-pagination 재사용 추정, 미방문) — 템플릿 컴포넌트는 이미 있어서 필요해지면 mock 데이터만 추가하면 된다.

## 1단계 완료: 남은 7개 라우트 채우기 (2026-10-15)

라이브 사이트에서 2곳(`/service/cloud`, `/media/naverReports`)을 샘플 확인해 템플릿 추정이 맞았음을 확인한 뒤 진행.

- `service-detail` 재사용: `/service/tools`·`cloud`·`fintech`·`contents`·`datacenterGak`·`community` 6개 라우트 + `serviceDetail.ts`에 placeholder 콘텐츠 6개 추가.
- `content-list-filter-pagination` 재사용: `/media/naverReports` + `naverReports.ts` 신규 데이터.
- `service-directory`(`/service/all`) 아이템에 새로 생긴 서비스 라우트 링크를 연결하고, 메가메뉴·푸터도 다시 동기화(`네이버 리포트` 추가 등).
- typecheck/build 통과(35개 라우트), Chrome으로 `/media/naverReports`·`/service/cloud` 직접 확인.

## 2단계 완료: 반응형·접근성 점검 (2026-10-15)

코드 레벨로 전체 템플릿을 훑으며 두 가지 실제 버그를 발견해서 고쳤다.

### 고친 것

1. **reduced-motion 처리가 빠져 있던 hover-zoom 6곳**: `docs/animations.md` §8에 "새 구현에서는 reduced-motion일 때 hover zoom도 끄는 쪽으로 처리한다"고 적어놓고 실제 코드에는 반영이 안 돼 있었다(News 카드, 헤드라인 카드, 스토리/보도자료/섹션랜딩 카드 썸네일 등). `motion-reduce:scale-100!`을 전부 추가하고, 컴파일된 CSS에 `@media (prefers-reduced-motion:reduce)` 블록 안에 `!important`로 들어갔는지 직접 확인함.
2. **`FeatureDetailPage` 관련 콘텐츠 캐러셀이 반응형이 아니었음**: 뷰포트 폭과 무관하게 항상 3개씩 보여주도록 JS로 폭을 계산(`calc((100%-32px)/3)`)해서, 모바일에서는 카드가 극단적으로 찌그러지는 버그였다. 네이티브 `scroll-snap`(1열 모바일/2열 태블릿/3열 데스크톱, Tailwind 반응형 클래스로 자연스럽게 분기) 방식으로 다시 짰고, prev/next 버튼은 `scrollBy`로 교체. Chrome에서 데스크톱 3열 + 다음 버튼 클릭 스크롤 이동까지 확인.

### 검증했지만 한계가 있었던 부분

- **실제 Tab 키 포커스 이동을 라이브로 재현하지 못함**: 이 세션의 `computer` 도구로 클릭/Tab 키를 보내도 `document.activeElement`가 계속 `BODY`로 남아, 실제 포커스 이동이 자동화 도구에 반영되지 않았다(이전 세션의 `resize_window` 문제와 비슷한 종류의 환경 한계로 보임). 메가메뉴는 표준 CSS `:focus-within`(Tailwind `group-focus-within:`)으로 구현되어 있어 네이티브 anchor 포커스만 있으면 동작이 보장되는 패턴이지만, **이번 세션에서 직접 Tab으로 열어본 적은 없다** — 코드 검토로만 신뢰하고 있음.
- `prefers-reduced-motion`도 OS 수준에서 실제로 토글해 브라우저로 본 게 아니라, 컴파일된 CSS에 올바른 미디어쿼리 규칙이 생성됐는지로 간접 검증함.

## 3단계 착수: 어드민/CMS 논의 → 데이터 레이어 정리로 결정 (2026-10-15)

### 현황 재확인에서 발견한 것

- `prisma/schema.prisma`가 **이미 존재**했다 — `docs/DATABASE_PLAN.md`가 설계한 커스텀 스키마(`SitePage`/`PageSection`/`ContentEntry`/`Story`/`MediaAsset` 등) 그대로지만, 실제 코드 어디에서도 `PrismaClient`를 쓰지 않는 방치된 스캐폴드였다. `.env.example`만 있고 실제 `.env`·`docker-compose.yml`은 없어 당장 연결할 DB가 없다. 이 스키마는 HANDOFF에 Payload CMS 기본안이 추가되기 **이전**에 만들어진 것으로 보임 — 전에 기록해둔 "DATABASE_PLAN.md(Prisma 커스텀) vs HANDOFF(Payload 기본안)" 충돌의 실체였다.
- HANDOFF 작업 순서 2번("데이터 접근은 `lib/data/*` 레이어로만")이 `/main`·`/story`에만 적용돼 있고, 나머지 새 템플릿 페이지 15개는 `page.tsx`에서 mock 데이터 파일을 직접 import하고 있었다.

### 사용자 결정

**"데이터 레이어만 정리"** — 지금 이 레포에 실제 CMS/DB를 설치하지 않는다. 프론트 템플릿 전체가 `lib/data/*` 경계를 통해서만 데이터를 읽도록 리팩터링해서, 나중에 진짜 서비스에 이식할 때 리포지토리 함수 구현만 CMS/DB 조회로 교체하면 되게 준비해둔다. `prisma/schema.prisma`는 **삭제하지 않고 참고용으로 보존**(사용자가 명시적으로 지우라고 하면 그때 삭제) — 현재는 미사용 상태임을 이 문서에 기록해 혼동을 막는다.

### 실행한 리팩터링

신규 리포지토리 5개 추가:
- `src/lib/data/companyRepository.ts` — `getNarrative`, `getTimeline`, `getSimpleInfo(key)`
- `src/lib/data/serviceRepository.ts` — `getServiceDetail(key)`, `getSectionLanding(key)`, `getServiceDirectory`
- `src/lib/data/featureRepository.ts` — `getFeatureDetail(key)`
- `src/lib/data/mediaRepository.ts` — `getPressReleaseList`, `getPressRelease(seq)`, `getMediaEvents`, `getNaverReportsList`
- `src/lib/data/storyRepository.ts` — `getStoryList`, `getStoryDetail(seq)` (기존 `src/lib/content/story-repository.ts`는 더 이상 쓰이지 않는 구 NAVER 클론 전용이라 손대지 않고 그대로 둠 — 이름이 비슷해 혼동 주의)

`src/app/**/page.tsx` 27개 전부 `@/features/main-template/*` 직접 import를 걷어내고 위 리포지토리 함수 호출로 교체. `grep`으로 `src/app/` 안에 남은 직접 import가 없는지 확인함.

### 검증

`npm run typecheck`, `npx next build --webpack` 통과(35개 라우트). Chrome으로 동적 `seq` 파라미터가 리포지토리를 경유해도 정상 동작하는지(`/media/pressReleasesDetail?seq=pr3`) 확인.

## 방침 변경: Payload CMS 실제 설치 (2026-10-15)

사용자가 "admin 라우트 해서 mock 데이터 대신 컨텐츠 발행할 수 있도록" 요청 — 보류했던 "지금 바로 Payload 설치"로 방향 전환.

### 버전 호환성 확인

- 프로젝트의 Next.js는 정확히 `16.3.0`. 최신 Payload(`3.90.2`)의 `@payloadcms/next` peer dependency는 `next >=16.3.3`을 요구해서 **호환 안 됨**.
- `payload@3.89.0`(및 동일 버전의 `@payloadcms/next`, `@payloadcms/db-sqlite`, `@payloadcms/richtext-lexical`)은 `next >=16.2.6 <17.0.0`을 허용해서 호환됨. Next.js 버전 자체는 건드리지 않고(이미 동작 중인 35개 라우트에 영향 주지 않기 위해) **Payload를 3.89.0으로 고정 설치**.
- `react: ^19.2.1`과 설치된 `19.2.4`도 호환 확인.

### 설치한 것

- `payload@3.89.0`, `@payloadcms/next@3.89.0`, `@payloadcms/db-sqlite@3.89.0`(로컬 SQLite — 외부 DB 서비스 불필요), `@payloadcms/richtext-lexical@3.89.0`, `graphql@^16.8.1`.
- `payload.config.ts`(루트) — 컬렉션 4개: `Users`(auth, role 기반 권한), `Media`(업로드), `Stories`, `PressReleases`(둘 다 `src/types/story.ts`·`src/types/mainTemplate.ts`/`content.ts`가 이미 쓰는 필드 모양과 1:1 대응, richText 본문, SEO 접이식 섹션, `versions.drafts: true`, `admin.preview`로 프론트 상세 URL 연결, `afterChange` 훅으로 `revalidatePath` 호출).
- `src/app/(payload)/` 라우트 그룹: `layout.tsx`, `admin/[[...segments]]/page.tsx`·`not-found.tsx`, `admin/importMap.js`(자동 생성), `api/[...slug]/route.ts`, `api/graphql/route.ts`, `api/graphql-playground/route.ts` — Payload 공식 Next.js App Router 통합 패턴 그대로.
- `next.config.ts`를 `withPayload()`로 감쌈, `tsconfig.json`에 `@payload-config` 경로 추가, `.env`에 `PAYLOAD_SECRET`/`DATABASE_URI` 추가(둘 다 gitignore 대상), `.gitignore`에 `payload.db`/`payload-types.ts`/`media/` 추가.

### 막혔다가 고친 것

`npx payload generate:importmap` 실행 시 `ERR_REQUIRE_ASYNC_MODULE` 에러 발생 — Node 26의 엄격해진 CJS/ESM 상호운용 때문에, `package.json`에 `"type": "module"`이 없어서 Payload CLI(tsx 기반)가 ESM 전용 패키지(`@payloadcms/richtext-lexical`, top-level await 사용)를 `require()`로 불러오려다 실패. `package.json`에 `"type": "module"` 추가로 해결 — 프로젝트의 다른 설정 파일(`postcss.config.mjs`, `eslint.config.mjs`)이 이미 `.mjs` 확장자로 ESM이었고 `.js`/`module.exports`를 쓰는 파일이 없어서 부작용 없음을 먼저 확인하고 진행함.

### 검증 (Chrome으로 끝까지)

1. `/admin` 접속 → "Create first user" 화면 확인.
2. 테스트 관리자 계정 생성(이메일/비밀번호는 `.env`에 주석으로만 기록, 채팅엔 남기지 않음) — role을 `admin`으로 설정.
3. Dashboard에서 4개 컬렉션이 한글 라벨(`스토리`, `보도자료`)로 정상 표시.
4. 스토리 하나를 실제로 작성해 **Publish** → "성공적으로 생성" 토스트, Status: Published 확인.
5. `GET /api/stories`로 Payload REST API가 방금 발행한 문서를 실제로 반환하는 것 확인(SQLite에 영구 저장됨, Lexical richText JSON 포함).
6. `npm run typecheck`, `npx next build --webpack` 둘 다 통과(37개 라우트 — 기존 35개 + `/admin`, API 라우트들).

### 지금 상태의 한계 — 아직 안 끝난 것

**프론트 공개 페이지는 여전히 mock 데이터를 보여준다.** `/story`에 방금 어드민에서 발행한 글이 **안 보이는 것까지 확인함** — `src/lib/data/storyRepository.ts`/`mediaRepository.ts`가 아직 `src/features/main-template/*` mock 배열을 반환하도록 구현돼 있고, Payload의 Local API를 호출하도록 바꾸지 않았기 때문이다(의도적으로 멈춘 지점). "mock 대신 발행한 콘텐츠가 보이게" 하려면 이 리포지토리 함수들의 구현부만 Payload 조회로 바꾸면 되는데(페이지/컴포넌트는 안 건드림 — 리포지토리 경계를 만든 보람), 기존 mock 6~9개 항목을 Payload에 시드하는 작업과 richText(JSON) ↔ 프론트가 기대하는 마크다운 문자열 간 변환을 어떻게 할지 결정이 필요해서 별도로 확인받고 진행하기로 함.

## 마지막 연결 완료: mock → Payload 전환 (2026-10-15)

### 만든 것

- `src/lib/payload/lexical.ts` — markdown ↔ Lexical JSON, 그리고 plain paragraphs ↔ Lexical JSON 양방향 변환기. 범용 변환기는 아니고 이 프로젝트의 placeholder 콘텐츠 수준(문단/헤딩/굵게·기울임/목록/인용)만 정확히 왕복하도록 최소로 구현.
- `scripts/seedPayload.ts`(`npm run seed`) — 기존 mock `storyList`(6개)·`pressReleaseList`(9개)를 Payload에 생성. `seq` 기준으로 이미 있으면 건너뛰는 멱등 스크립트.
- `src/lib/payload/safeRevalidate.ts` — 컬렉션 `afterChange` 훅의 `revalidatePath`가 Next 요청 스코프 밖(시드 스크립트 등)에서 호출되면 조용히 무시하도록 감싼 헬퍼. `Stories.ts`/`PressReleases.ts`가 이걸 사용하도록 교체.
- `src/lib/data/storyRepository.ts`, `src/lib/data/mediaRepository.ts`(보도자료 부분만) — mock 반환 대신 `getPayload({config}).find(...)`로 Payload를 조회하도록 교체. DB가 비어있으면(시드 전) mock으로 자동 폴백. `mediaEvents`/`naverReportsList`는 이번 범위에 없어서 그대로 mock 유지.

### 막혔다가 고친 것

1. **JSDoc 주석이 스스로를 깨뜨림**: `lexical.ts` 맨 위 설명에 `**bold**/*italic*`라고 적었는데, 그 안의 `**/`가 블록 주석 종료 기호로 해석돼서 `esbuild`가 `Unexpected "*"` 파싱 에러를 냄 — 문구를 "bold/italic emphasis"로 바꿔서 해결.
2. **`revalidatePath`가 스크립트에서 터짐**: 컬렉션 훅이 Next.js 요청 컨텍스트를 요구하는데 독립 실행 스크립트에는 그게 없어서 `Invariant: static generation store missing` 에러 — `safeRevalidatePath`(try/catch)로 감싸서 해결. 첫 시도에서 story 1개는 이미 생성된 뒤 에러가 나서, 재실행 시 멱등 체크가 제대로 건너뛰는 것도 확인함.
3. **타입 에러**: 손으로 만든 Lexical JSON 객체가 Payload의 자동 생성 richText 필드 타입(`payload-types.ts`)과 구조적으로 안 맞음 — 시드 스크립트 두 곳에서만 `as never`로 좁게 캐스팅(이유를 주석으로 남김), 공용 라이브러리 코드 쪽은 느슨한 타입을 유지하지 않고 `LexicalJSON` 타입을 명시해 나머지는 정상 타입 체크되게 함.

### 검증 (Chrome으로 끝까지)

- `npm run seed` 실행 → "stories: +5 (skipped 1 existing), press releases: +9" 확인(먼저 수동으로 만든 테스트 글 1개는 건너뜀).
- `npm run typecheck`, `npx next build --webpack` 통과(37개 라우트).
- `/story` 방문 → 어드민에서 발행한 "어드민에서 처음 발행한 스토리"가 목록 맨 앞에 실제로 보임(전에는 안 보였던 것과 대조).
- 시드된 스토리 상세(`?seq=s1`) → **굵게**/목록까지 마크다운 왕복 변환이 정확하게 렌더링됨.
- 보도자료 상세(`?seq=pr1`) → DB에서 읽은 내용이 기존 mock과 동일하게 표시됨.

## 다음 단계

- 이 상태로 "컨텐츠 발행" 요청은 완전히 끝났다고 볼 수 있음. 어드민에서 쓰고 발행하면 실제로 공개 페이지에 반영된다.
- 남은 선택지(필요할 때): `mediaEvents`/`naverReports`를 포함한 나머지 컬렉션도 CMS로 승격할지, 메인 페이지 콘텐츠(헤드라인/프로모션/바로가기 카드)도 CMS로 옮길지, 로컬 SQLite를 Postgres로 바꿀지/파일 스토리지를 S3로 바꿀지(실제 배포 시점에 다시 논의하기로 한 부분 — 아직 보류 중).

## 세션 중 발생한 사고 — 공유 프로세스 종료 (2026-10-15)

QA용 dev 서버를 백그라운드로 띄우기 전, **포트 3000에 이미 다른 프로세스(PID 59015)가 떠 있었다**(그래서 Next가 자동으로 3002번을 썼다). 테스트가 끝난 뒤 정리한다고 `pkill -f "next dev"`를 실행했는데, 이 명령이 **내가 띄운 프로세스뿐 아니라 포트 3000의 기존 프로세스까지 패턴 매칭으로 함께 종료시켰다.** 그 프로세스가 사용자가 띄워둔 다른 작업(이 프로젝트의 다른 dev 서버거나 별도 프로젝트)이었을 가능성이 있다 — 확인이 필요하다. 다음부터는 `pkill -f`처럼 넓은 패턴 대신 내가 직접 띄운 PID만 특정해서 종료하도록 수정.
