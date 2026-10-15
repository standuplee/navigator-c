# 메인 페이지 애니메이션 인벤토리

> `docs/HANDOFF.md` 3단계 결과물. 원본 https://www.navercorp.com/main 을 (1) `docs/research/navercorp-65983208/main-c98712e4/source/main.css`(스냅샷, 1줄 압축본 925KB)·`main.html` 마크업 역산, (2) **Chrome으로 라이브 사이트에 접속해 `window`에 노출된 Swiper 인스턴스(`el.swiper.params`)와 masonry 아이템의 실제 inline style·computed style을 직접 읽어 교차 검증**한 결과다. 라이브 검증으로 CSS만으로는 알 수 없었던 JS 파라미터(autoplay delay/speed)를 확인했고, 1차 CSS 분석에서 잘못 추정했던 부분(News 섹션 가로 스와이프 여부, 헤더 로고 전환)을 바로잡았다. **이 표의 수치는 분석 결과(데이터)이며, 원본 CSS/JS 코드 자체를 복사하지 않는다** — 실제 재구현은 이 프로젝트 스택(Tailwind, CSS transition, Motion, Swiper React)으로 새로 작성한다.
>
> 원본이 공용으로 쓰는 easing 토큰(값은 분석을 위해 해석해 둔 것, 변수명 자체를 그대로 가져다 쓰지 않는다):
> - `bon-ease-Out` → `cubic-bezier(.33, 1, .68, 1)`
> - `bon-ease-Standard` → `cubic-bezier(.15, 0, .15, 1)`
> - `bon-ease-Out-Level1` → `cubic-bezier(.25, 1, .5, 1)`(기술 패널 전용 `tech-timing`과 동일)
>
> 브레이크포인트: 데스크톱 ≥1024px, 태블릿 768–1023px, 모바일 ≤767px. 헤더/헤드라인 구성은 767px에서, 기술 패널 이미지·카드 호버는 1023px에서 전환된다.

## 1. 헤더 / GNB

| # | 트리거 | 대상 | 속성 변화 | duration | easing | delay | 원본 구현 | 데스크톱/모바일 |
|---|---|---|---|---|---|---|---|---|
| 1-1 | 스크롤(최초 뷰포트 통과) | `.header` | 배경 투명→불투명, 보더 등 상태 전환 | 0.4s | `bon-ease-Standard` | 0 | CSS class 토글(JS가 스크롤 리스너로 `is-scroll*` 클래스 추가) + `transition` | 공통 |
| 1-2 | 스크롤 방향(아래로) | `.header`(비메인 페이지) | `transform: translateY(-100%)` 식 숨김 | 0.4s | `bon-ease-Out` | 0 | class 토글 + transition. **메인 페이지에서는 숨김 없음 — 라이브 검증 완료**: `window.scrollTo`로 아래/위 스크롤 후 `.header`의 `transform`을 읽으면 두 경우 모두 `none`이었고 class는 `is-scrolled`만 붙음(`is-scroll-down`은 루트 `.navercorp` 엘리먼트에 붙지만 헤더 자체는 안 움직임) | 공통(페이지 유형별 분기), 메인은 숨김 없음 확정 |
| 1-3 | 메인 페이지 한정 스크롤 | `.header__logo` | CSS에는 `transition:all .4s var(--bon-ease-Out)` 규칙이 걸려 있어 배경 이미지 전환 여지가 있음 | 0.4s | `bon-ease-Out` | 0 | `background-image` 전환 + class. **라이브 검증: 현재 노출 중인 헤드라인 슬라이드에서는 스크롤해도 로고 이미지(`logo.svg`)가 바뀌지 않음 확인** — 다크 배경 슬라이드(`bg-black` 계열 클래스)일 때만 트리거될 가능성이 있으나 추가 확인 전까지는 "전환 규칙은 존재하나 상시 발생하지는 않음"으로 기록 | 공통, 재구현 우선순위 낮음 |
| 1-4 | GNB 항목 hover | `.nav__list2`(메가메뉴 패널) | 열림: `transform`/`opacity` 진입 | 0.4s | `cubic-bezier(.59,.01,.28,1)` | 닫힘 시 패널 0.2s, 인트로 텍스트·이미지 0.5s 지연 | CSS `:hover`/`.is-show` 토글, `transition-delay` 중첩으로 단계적 등장 | 데스크톱 전용(모바일은 아코디언으로 대체) |
| 1-5 | 메가메뉴 하위 링크 | `.nav__item2` | `opacity` 0→1 | 0.4s | `cubic-bezier(.59,.01,.28,1)` | 패널과 동시 | CSS transition | 데스크톱 |
| 1-6 | 메가메뉴 인트로 카피/이미지 | `.nav__intro__message`, `.nav__intro__photo` | `opacity` | 0.25s | `cubic-bezier(.59,.01,.28,1)` | 0 | CSS transition | 데스크톱 |
| 1-7 | 모바일 메뉴 버튼 클릭 | `.mo-nav` | 화면 우측에서 슬라이드 인(`right` 속성) + `html.is-scroll-lock` | 0.3s | `ease-out` | 0 | class 토글 + transition, 배경 스크롤 잠금은 즉시(애니메이션 없음) | 모바일 전용 |
| 1-8 | 모바일 하위메뉴 항목 클릭 | `.mo-nav__item.is-open .mo-nav__list2` | `display:none → block` | 없음(즉시) | — | — | **트랜지션 없이 display 토글** — 접힘 높이 애니메이션 없음 | 모바일 전용 |
| 1-9 | 검색 아이콘 클릭 | `.search-tab` | 패널 진입 `transform` + 포커스 이동 | 0.4s | `cubic-bezier(.59,.01,.28,1)` | 0.2s(패널), 입력창/배너는 0.5s | CSS transition + JS `focus()` 호출 | 공통 |
| 1-10 | 검색창 열림 중 입력 UI | `.search-tab__box` | `opacity` | 0.25s | `cubic-bezier(.59,.01,.28,1)` | 0 | CSS transition | 공통 |
| 1-11 | Escape 키 | 모바일 메뉴·검색 패널 | 닫힘(위 1-7/1-9 역방향) | 동일 | 동일 | 동일 | `keydown` 리스너 → class 제거 | 공통, 키보드 접근성 핵심 경로 |
| 1-12 | 언어선택 버튼 클릭 | `.btn-lang__list` | `display:none ↔ block` | 없음(즉시) | — | — | display 토글, 트랜지션 없음 | 공통 |

## 2. 메인 헤드라인(상단 캐러셀 + 시계)

| # | 트리거 | 대상 | 속성 변화 | duration | easing | delay | 원본 구현 | 데스크톱/모바일 |
|---|---|---|---|---|---|---|---|---|
| 2-1 | 자동(진입 시) | `.main-headline .swiper` | 슬라이드 크로스페이드(fade effect) | 전환 0.4s, 자동 전환 간격 4s | 라이브러리 기본(crossFade) | 0 | Swiper(core) `effect:"fade"` + `autoplay:{delay:4000}` + `speed:400`. **라이브 검증**: `el.swiper.params`를 직접 읽어 `effect:"fade", autoplay.delay:4000, speed:400, loop:true` 확인(기존 클론 코드의 `speed:600` 가정은 틀렸음 — 400으로 정정) | 공통. `prefers-reduced-motion`이면 autoplay 비활성 |
| 2-7 | 없음(정적, 헤드라인 옆 세로 스택) | `.main-banner-items`(3개 카드: 지속가능성/통합보고서, 투자정보/실적발표, 채용) | 없음 — hover 시 배경색 정도만 전환 | 0.2s 내외 | `bon-ease-Out` | 0 | 정적 링크 카드 3장, 캐러셀 아님. **라이브 검증**: `main-banner-items`에 `main-sustainability`/`main-investment`/`main-recruit` 3개 항목 확인 — ESG·투자·채용 콘텐츠라 이번 범위에서는 **제외 확정**(사용자 확인). 레이아웃 패턴(헤드라인 옆 세로 카드 스택) 자체는 재사용 가치가 있어 자리만 유지하고 **중립 placeholder 라벨로 교체**, 목적지 라우트는 만들지 않음 | 공통 |
| 2-2 | 자동/수동 | `.swiper-pagination-bullet .bar` | `width` 0%→100% (진행 표시) | 4s(자동재생 간격과 동기) | linear | 0 | pagination bullet 내부 `<span class=bar>`에 JS가 `transition-duration`을 autoplay delay와 동일하게 세팅 | 공통 |
| 2-3 | "자동멈춤" 버튼 클릭 | swiper 인스턴스 | autoplay 정지/재개, 버튼 라벨·`aria-pressed` 토글 | — | — | — | JS: `swiper.autoplay.stop()/start()` | 공통, 키보드 포커스 가능 버튼 |
| 2-4 | 카드 hover(데스크톱만) | `.item-visual img` | `transform: scale(1) → scale(1.05)` | 0.2s | `bon-ease-Out` | 0 | CSS `:hover` + transition. **1023px 이하에서는 transition 자체가 제거**(터치 환경 호버 방지) | 데스크톱 전용 |
| 2-5 | 1초 간격 자동 | `.main-timer` 시계 | 텍스트 콘텐츠 교체(시:분:초) | — | — | — | `setInterval(1000)` + `Intl.DateTimeFormat` | 공통. 애니메이션 아님(텍스트 갱신) — reduced-motion과 무관 |
| 2-6 | 없음(정적) | `.main-stock` 주가 표시 | 없음 | — | — | — | 정적 서버 렌더 텍스트, 실시간 연동/애니메이션 없음 — `/investment/stock` 링크만 존재 | 공통. **애니메이션 인벤토리 대상 아님**, 재구현 시 mock 정적 값 또는 외부 API 바인딩으로 대체(HANDOFF 어드민 분류: 외부 API) |

## 3. News 섹션("We the Navigators")

> **라이브 검증으로 1차 추정을 정정**: `.main-news-list.swiper` 엘리먼트에는 `swiper` 클래스가 붙어 있지만 **실제 Swiper 인스턴스는 생성되지 않는다**(`el.swiper === undefined` 확인). 데스크톱·태블릿에서는 각 `.masonry-grid-item`에 `position:absolute; left/top`이 px 단위로 직접 계산되어 박혀 있고(진짜 masonry 패킹 — 자바스크립트가 레이아웃만 계산), 컨테이너는 `overflow-x:hidden`이라 **가로 스크롤/드래그 인터랙션이 아예 없다**. 스크롤바 관련 CSS(`swiper-scrollbar`)는 min-width 767px 이하에서만 `display:block`으로 켜지는데, 그 구간에서도 `.swiper-ui`는 `display:none`으로 숨겨져 있어 실제로 노출되지 않는다.

| # | 트리거 | 대상 | 속성 변화 | duration | easing | delay | 원본 구현 | 데스크톱/모바일 |
|---|---|---|---|---|---|---|---|---|
| 3-1 | 없음(정적 레이아웃 계산) | `.main-news .masonry-list`(`.masonry-grid-item`들) | 각 카드가 JS로 계산된 `left`/`top` px 값으로 절대 배치 — 애니메이션은 없고 **3열 패킹 레이아웃 자체가 인터랙션 대상** | — | — | — | 커스텀 masonry 레이아웃 스크립트(절대 포지셔닝, 가변 행 높이로 빈틈 최소화). Swiper/스크롤 라이브러리 아님 | 데스크톱(1024px↑) 3열 · 768–1023px 2열(폭 50%) 모두 동일 방식의 정적 masonry. **모바일(≤767px)은 `flex-direction:column; gap:20px`의 단순 세로 리스트로 전환되고, `:nth-child(6)` 이후 카드는 `display:none`으로 숨겨 처음 5장만 노출**(더 보려면 하단 "전체보기" 버튼으로 이동) |
| 3-2 | 카드 hover(1023px 초과) | `.item-visual img` | `scale(1) → scale(1.08)`, `.item-visual`/`.item-info` 배경색 전환 | 0.2s | `bon-ease-Out` | 0 | CSS `:hover` + transition, 1023px 이하 제거 | 데스크톱 전용 |

## 4. 프로모션(미들 배너) 캐러셀

| # | 트리거 | 대상 | 속성 변화 | duration | easing | delay | 원본 구현 | 데스크톱/모바일 |
|---|---|---|---|---|---|---|---|---|
| 4-1 | 자동(진입 시) | `.main-middle-banner .swiper` | 슬라이드 전환(slide, fade 아님) + 배경색 크로스페이드 | 전환 0.4s(슬라이드, 배경색 동일) | `bon-ease-Out`(배경색) | 0 | Swiper `effect:"slide"` + JS가 `slideChange`마다 `el.style.backgroundColor`를 `data-color`에서 읽어 교체. **라이브 검증**: `effect:"slide", autoplay.delay:4000, speed:400, loop:true` 확인(기존 클론의 `speed:600` 가정 정정 — 2-1과 동일 수정) | 공통. reduced-motion이면 autoplay 비활성 |
| 4-2 | 슬라이드 전환 | `.item-subject`, `.item-desc`, `.btn-nav` 텍스트 색상 | `color` 전환(밝은/어두운 배경 대비) | 0.4s | `bon-ease-Out` | 0 | 슬라이드 컨테이너에 `black`/`white` class 토글 + CSS 상속 색상 transition | 공통 |
| 4-3 | 자동/수동 | pagination bullet `.bar` | `width` 0→100% | 4s | linear | 0 | 2-2와 동일 패턴 | 공통 |
| 4-4 | "자동멈춤" 버튼 클릭 | swiper 인스턴스 | autoplay 정지/재개 | — | — | — | JS `swiper.autoplay.stop()/start()` | 공통 |

## 5. 주요 서비스·기술 요약 (가로 확장 패널)

| # | 트리거 | 대상 | 속성 변화 | duration | easing | delay | 원본 구현 | 데스크톱/모바일 |
|---|---|---|---|---|---|---|---|---|
| 5-1 | 클릭 / Enter / Space / 화살표 키 | `.list-cell`(패널 컨테이너) | `width` 확장/축소(선택 패널이 넓어짐) | 0.6s | `bon-ease-Out-Level1`(`cubic-bezier(.25,1,.5,1)`) | 0 | class(`active`) 토글 + CSS `width` transition. 키보드: `click`/`keydown`(Enter,Space,ArrowLeft/Right) 리스너 | 공통. 1023px 이하에서는 이미지가 `mobileImage`(별도 자산)로 교체, 패널 확장 자체는 유지 |
| 5-2 | 패널 전환과 동시 | `.item-visual img` | `transform`(확대/비율 변화) | 0.6s | `bon-ease-Out-Level1` | 0 | CSS transition, `.list-cell.active`와 동기 | 공통 |
| 5-3 | 패널 전환과 동시 | `.item-label` | `opacity` | 0.3s | `bon-ease-Out-Level1` | 0 | CSS transition | 공통 |
| 5-4 | 패널 전환과 동시 | `.item-info`(제목/설명 블록) | `opacity`, `left`, `width`, `height` 동시 전환 | 0.6s | `bon-ease-Out-Level1` | 0 | CSS 복합 transition | 공통 |
| 5-5 | 패널 열림 완료 후 | `.btn-main-tech-link`("자세히 보기") | `visibility`, `opacity`, `transform` 등장 | 0.6s | `bon-ease-Out-Level1` | **등장 지연 = 패널 전환 시간(0.6s)만큼 delay** — 패널이 다 넓어진 뒤 버튼이 나타남 | CSS `transition-delay: var(--tech-duration)` | 공통 |

## 6. 함께 성장하는 네이버 (파트너/개발자 탭)

| # | 트리거 | 대상 | 속성 변화 | duration | easing | delay | 원본 구현 | 데스크톱/모바일 |
|---|---|---|---|---|---|---|---|---|
| 6-1 | 탭 클릭 / 화살표 키(좌우) | `.btn-tab-nav`(ARIA role=tab) | `background-color` 전환, `aria-selected`/`tabIndex` 갱신, 대응 패널만 `hidden` 해제 | 0.2s | `bon-ease-Out` | 0 | ARIA 탭 패턴. `keydown`에서 ArrowLeft/Right가 반대 탭 `.click()` 호출 | 공통, 키보드 필수 경로 |
| 6-2 | 링크 hover | `.btn-partner-nav` | `background-color` 전환 | 0.2s | `bon-ease-Out` | 0 | CSS `:hover` + transition | 공통 |

## 7. 푸터

| # | 트리거 | 대상 | 속성 변화 | duration | easing | delay | 원본 구현 | 데스크톱/모바일 |
|---|---|---|---|---|---|---|---|---|
| 7-1 | 모바일 메뉴 그룹 클릭 | `.menu__item.is-open .menu__list2` | `display:none → block`(아코디언) | 없음(즉시) | — | — | class 토글 + display 전환, **높이 애니메이션 없음** | 모바일 전용(데스크톱은 항상 펼친 그리드) |
| 7-2 | 아코디언 토글과 동시 | `.menu__link:after`(쉐브론 아이콘) | `rotate(0deg) → rotate(180deg)` | 0.2s | `bon-ease-Out` | 0 | CSS transition, `.is-open` class와 연동 | 모바일 전용 |
| 7-3 | 개인정보처리방침 드롭다운 클릭 | `.service-policy__toggle:after`(쉐브론) | `rotate(180deg)` | 0.2s | `bon-ease-Out` | 0 | CSS transition + `aria-expanded` | 공통 |
| 7-4 | SNS 아이콘 hover | `.social__link:before/:after`(두 아이콘 레이어) | `opacity` 크로스페이드 | 0.2s | `bon-ease-Out` | 0 | 두 개의 겹친 `::before`/`::after` 아이콘을 `:hover`에서 opacity 교차 | 공통 |
| 7-5 | 외부 링크(`target=_blank`) hover | `.menu__link2:after`(외부링크 아이콘) | `opacity` 등장 | 0.2s | `bon-ease-Out` | 등장 0s / 사라짐 0.2s(비대칭) | CSS `transition-property`별 개별 duration/delay | 공통 |
| 7-6 | 없음(정적 로고) | `.footer__lottie` | 없음 — 이름은 "lottie"지만 실제로는 **정적 SVG 배경 이미지**(`We the Navigators` 워드마크), Lottie JS 애니메이션 아님 | — | — | — | `background-image` 단일 교체(다크 배경에서 흰색 버전) | 공통. **PAGE_TOPOLOGY.md의 "애니메이션 브랜드 마크" 추정은 과대평가 — 실제 애니메이션 없음으로 정정** |

## 8. 공통 접근성/반응형 규칙

- **reduced-motion**: 헤드라인·미들배너 캐러셀은 `matchMedia('(prefers-reduced-motion: reduce)')`가 true면 `autoplay` 비활성 + "자동멈춤" 버튼을 처음부터 멈춤 상태로 표시. 카드 hover zoom(2-4, 3-2)은 지속시간이 짧고(0.2s) 스크롤/자동재생이 아니므로 reduced-motion에서도 유지하되, 새 구현에서는 `prefers-reduced-motion`일 때 transform 애니메이션도 끄는 쪽으로 보수적으로 처리한다.
- **키보드 접근성이 이미 확인된 경로**: 기술 패널(클릭/Enter/Space/화살표), 파트너 탭(ArrowLeft/Right), 검색 패널(Escape로 닫기), 모바일 메뉴(Escape로 닫기).
- **키보드 접근성 보강이 필요한 경로(원본에 명시적 키보드 처리가 안 보임)**: GNB 메가메뉴 열기(hover 기반 — focus-within 대응 필요), 헤드라인/미들배너 캐러셀의 pagination bullet 직접 선택, 언어선택 드롭다운, 푸터 아코디언/정책 드롭다운(버튼이지만 Enter/Space 기본 동작에 의존 — 명시적 `aria-expanded` 동기화 필요).
- **반응형 분기 요약**: 767px에서 헤더/헤드라인 레이아웃 전체 전환(데스크톱 GNB ↔ 모바일 메뉴), 1023px에서 기술 패널 이미지 자산 교체 및 카드 hover transition 비활성(터치 기기 가정).

## 재구현 시 라이브러리 매핑 (4단계 예고)

| 원본 패턴 | 이 프로젝트에서 재작성 방식 |
|---|---|
| Swiper(core) autoplay/fade/slide + pagination bar(헤드라인·프로모션만) | 이미 설치된 `swiper`(React 바인딩)를 그대로 사용, `autoplay.delay:4000 / speed:400`로 수치 맞춤 — 셀렉터 의존을 props/ref 기반으로 재작성 |
| News 섹션의 masonry 패킹(Swiper 아님, 절대 포지셔닝 레이아웃) | Swiper를 쓰지 않는다. CSS Grid(현재 클론이 이미 쓰는 방식, 행 높이가 균일해져 원본과 약간 다름)로 단순화하거나, 더 가깝게 재현하려면 `react-masonry-css` 등 경량 패킹 라이브러리 도입을 검토 — **인터랙션(스크롤/드래그)이 없으므로 라이브러리 선택의 영향은 시각적 패킹 결과에만 국한** |
| 복합 width/opacity 패널 확장(기술 섹션) | CSS `transition`(Tailwind `transition-[width,opacity]` 임의 값) 또는 Motion `layout` 애니메이션 — 라이브러리 추가 없이 CSS로 충분 |
| 메가메뉴 단계적 delay 등장 | CSS `transition-delay` 유틸리티 또는 Motion의 `staggerChildren` — 섹션 5단계에서 난이도 보고 결정 |
| 헤더 스크롤 상태(hide/show, 로고 교체) | `IntersectionObserver`/스크롤 리스너 + CSS class, 기존 패턴 유지(원본 셀렉터 의존만 제거) |
| 검색 패널, 모바일 메뉴 슬라이드 | CSS transition + `useState` 기반 토글(라이브러리 불필요) |
