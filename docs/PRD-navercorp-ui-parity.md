# PRD — navercorp UI/UX 정밀 재현 (navigator-c)

| 항목 | 내용 |
|---|---|
| 문서 버전 | v1.0 (2026-11-12) |
| 대상 저장소 | `navigator-c` (Next.js 16.3 · React 19.2 · Tailwind v4 · Swiper 11 · Payload 3) |
| 근거 자료 | `navercorp_UI_정밀비교.xlsx`(2026-11-12 측정), `docs/animations.md`(메인 페이지 인벤토리), `docs/routes.md`, `docs/HANDOFF.md` |
| 범위 밖 | ESG(`/esg/*`), 투자정보(`/investment/*`), 채용, 네비게이토 콘텐츠 이관(별도 문서), 배포 |
| 후속 문서 | 네비게이토 콘텐츠 매핑(`navigator-c_콘텐츠_매핑.xlsx`), 어드민 스키마 |

---

## 1. 배경과 목표

### 1.1 배경
이 프로젝트는 navercorp.com의 레이아웃·인터랙션·애니메이션·UX 흐름을 그대로 재현한 틀 위에 네비게이토 서울C지구 콘텐츠를 올리는 것이 목표다. 2026-11-12에 두 사이트를 같은 스크립트로 375×812 / 768×1024 / 1440×900에서 측정한 결과, 현재 구현은 **페이지 목록과 섹션 순서만 따라간 단순화 버전**이다.

| 지표 | 결과 |
|---|---|
| 데스크톱 페이지 길이 (프로젝트 ÷ 원본, 평균) | **약 29%** |
| 서비스 상세 10개 | 전부 같은 3섹션 화면 (원본은 페이지마다 4,000~15,000px, 이미지 11~52장) |
| 반응형 단계 | 원본 3단계(+데스크톱 내부 2단계) vs 프로젝트 사실상 2단계 |
| 공통 UI 누락 | 헤더 스크롤 숨김, 제목 밴드, 탭 영역, 앵커 내비+진행 막대, 연관 콘텐츠 캐러셀, 상세 sticky 제목 |
| 없는 페이지 | 16개 (그중 3개는 현재 메뉴 링크가 404) |

### 1.2 목표
1. navercorp의 **모든 대상 페이지(ESG·투자정보·채용 제외)** 를 모바일·태블릿·데스크톱 세 단계에서 구조·인터랙션·애니메이션·hover까지 재현한다.
2. 재현은 **템플릿 단위**로 한다. 같은 골격의 페이지는 하나의 템플릿 + 데이터로 만든다.
3. 모든 템플릿 데이터는 이후 Payload 블록/컬렉션으로 옮길 수 있는 형태로 설계한다.

### 1.3 비목표
- 네이버 로고·사진·영상·카피 사용 (HANDOFF 규칙 3). 비주얼은 같은 비율·위치의 **슬롯**으로 재현하고 placeholder를 넣는다.
- 원본 JS/CSS 코드·변수명 복사 (HANDOFF 규칙 2). 이 문서의 수치는 측정 데이터이며 구현은 새로 작성한다.
- 콘텐츠 이관, 어드민 스키마 구현 (후속 단계).

### 1.4 성공 기준
- 대상 페이지 전부에서 **섹션 수·순서·열 수**가 세 화면 크기 모두 원본과 같다.
- 섹션 높이가 원본 대비 **±15% 이내** (콘텐츠 길이 차이가 나는 상세 본문은 제외).
- 이 문서 §6~§8의 인터랙션 체크리스트 항목이 모두 동작한다.
- `prefers-reduced-motion: reduce`에서 자동 재생·스크롤 연동 애니메이션이 모두 꺼지고 최종 상태로 표시된다.
- 키보드만으로 모든 탭·캐러셀·메뉴·앵커 내비를 조작할 수 있다.
- `npm run check` 통과, Lighthouse 모바일 CLS < 0.1.

---

## 2. 원칙

1. **CSS가 상태를 그리고, JS는 상태만 바꾼다.** 원본처럼 스크롤·교차 상태를 `data-*` 속성(또는 클래스)으로 토글하고, 전환은 CSS transition으로 처리한다. React 상태로 매 프레임 리렌더하지 않는다.
2. **스크롤 리스너는 하나.** 전역 `ScrollProvider`가 `requestAnimationFrame`으로 스크롤 위치·방향을 계산해 `<html>`에 `data-scroll-dir`, `data-scrolled`를 쓴다. 헤더·앵커 내비·page-stack은 이 값을 CSS에서 읽는다.
3. **교차 관찰은 IntersectionObserver.** reveal, 활성 섹션 추적, 영상 재생/정지 모두 IO로 처리한다.
4. **템플릿은 데이터 주도.** 섹션 구성은 `sections: Section[]`(discriminated union) 배열로 받는다. 이 타입이 그대로 Payload `blocks` 필드가 된다.
5. **모든 애니메이션은 reduced-motion 분기**를 가진다 (`useReducedMotion` 이미 있음).
6. **새 의존성은 최소화.** Swiper(이미 설치)로 캐러셀, 나머지는 CSS + 작은 훅. lottie는 §4.6 참고.

---

## 3. 디자인 토큰 (Tailwind v4 `@theme`)

토큰 이름은 이 프로젝트 고유 이름으로 새로 정한다(원본 변수명 사용 금지).

### 3.1 브레이크포인트
원본 미디어쿼리는 `max-width` 기준 767 / 1023 / 1279 / 1599 / 1919 (+480, 375 미세 조정). Tailwind는 `min-width` 기준이므로 다음처럼 정의한다.

| 토큰 | min-width | 의미 |
|---|---|---|
| (기본) | 0 | 모바일 (≤767) |
| `md` | 768px | 태블릿 (768–1023) |
| `lg` | 1024px | 소형 데스크톱 (1024–1279) |
| `xl` | 1280px | 데스크톱 (≥1280) — 헤더 64px, 제목 64px 기준점 |
| `2xl` | 1600px | 대형 (간격·캐러셀 gap 32px) |
| `3xl` | 1920px | 초대형 (최대 폭 고정) |

```css
@theme {
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1600px;
  --breakpoint-3xl: 1920px;
}
```
> 현재 코드는 `md` 한 번만 분기한다. 태블릿과 데스크톱이 같은 값을 쓰는 곳(특히 제목 60px)을 전부 `md`/`xl` 2단계로 다시 나눈다.

### 3.2 타이포 스케일 (측정값)

| 용도 | 모바일 | 태블릿 | 데스크톱(xl) | 토큰 제안 |
|---|---|---|---|---|
| 페이지 제목 (제목 밴드·히어로) | 40 | 48 | 64 | `text-page-title` |
| 섹션 제목 (h2/h3) | 26 | 26 | 32 | `text-section-title` |
| 메인 섹션 제목 | 26 | 26 | 32 | 동일 |
| 상세 페이지 제목 | 26 | 26 | 48 | `text-article-title` |
| 카드 제목 (계열사·전체 서비스 그룹) | 20 | 20 | 26~32 | `text-card-title` |
| 절차 단계 제목 | 18 | 18 | 20 | `text-step-title` |
| 메인 소식 카드 제목 | 18.72 | 18.72 | 18.72 | 고정 |

현재: 페이지 제목 36/60/60, 섹션 제목 24 고정, 상세 30/36/36 → 전부 교체.

### 3.3 레이아웃 수치

| 항목 | 모바일 | 태블릿 | 데스크톱 |
|---|---|---|---|
| 헤더 높이 | 48 | 48 | 64 (메인 최상단 100 → 스크롤 시 64) |
| 제목 밴드 (회사·서비스 전체·정책) | 228 | 268 | 336 |
| 제목 밴드 (미디어·스토리 목록) | 180 | 220 | 280 |
| 탭 영역 | 61 | 61 | 63 |
| 앵커 내비 높이 | 56 | 56 | 56 |
| 연관 콘텐츠 섹션 | 637 | 641 | 714 |
| CTA 배너 | 540 | 480 | 558 |
| 풀스크린 히어로 | 100svh | 100svh | 100svh (영상 히어로는 데스크톱 1121) |
| 아이콘 그리드 히어로 | 1421 | 1792 | 1575 |
| 상세 제목 영역 | ~386 | ~374 | ~486 |
| 캐러셀 카드 간격 | 24 | 24 | 24 (≥1600: 32) |
| sticky 비주얼 top | 0 | 0 | 100 (1024–1599: 72 / 스크롤 업 시 144) |

### 3.4 모션 토큰 (측정값)

| 토큰 제안 | 값 | 원본 사용처 |
|---|---|---|
| `--ease-out` | `cubic-bezier(.33, 1, .68, 1)` | 대부분 hover·헤더 숨김·버튼 |
| `--ease-out-soft` | `cubic-bezier(.25, 1, .5, 1)` | 앵커 내비 opacity·높이, 패널 확장, sticky 제목 |
| `--ease-standard` | `cubic-bezier(.15, 0, .15, 1)` | 헤더 배경 전환 |
| `--ease-in-out` | `cubic-bezier(.65, 0, .35, 1)` | 일반 왕복 |
| `--ease-sine` | `cubic-bezier(.37, 0, .63, 1)` | 회사소개 하이라이트 문구 |
| `--ease-menu` | `cubic-bezier(.59, .01, .28, 1)` | 메가메뉴·검색 패널·sticky 제목 목록 |
| `--ease-stack` | `cubic-bezier(.28, 0, .15, 1)` | 기술 page-stack |
| `--ease-arrow` | `cubic-bezier(.455, .03, .515, .955)` | 화살표 반복 키프레임 |
| `--ease-search` | `cubic-bezier(.78, 0, .38, 1.01)` | sticky 제목 검색 입력 |

| 시간 토큰 | 값 | 빈도/용도 |
|---|---|---|
| `--dur-fast` | 0.2s | 가장 많이 쓰임: hover, 링크 색, 진행 막대 width, 탭 |
| `--dur-base` | 0.4s | 헤더 숨김, 앵커 내비 이동, 캐러셀 전환, 패널 |
| `--dur-mid` | 0.3s | 라인업 하이라이트, 모바일 메뉴 |
| `--dur-slow` | 0.6s | 패널 확장, 하이라이트 문구 |
| `--dur-slower` | 0.8s | 하이라이트 문구 표시(is-show) |
| `--dur-stack` | 1.06s | page-stack |
| `--dur-arrow` | 1.6s | 화살표 반복 |

---

## 4. 기술 결정

### 4.1 전역 스크롤 상태 — `ScrollProvider`
- 위치: `src/components/layouts/ScrollProvider.tsx` (client), `SiteShell`에서 감싼다.
- `scroll` 이벤트(passive) → rAF 1회로 묶어서 계산:
  - `data-scrolled="true"`: `scrollY > 0`
  - `data-scroll-dir="down" | "up"`: 직전 대비 4px 이상 움직였을 때만 갱신(떨림 방지)
  - `--scroll-y`(선택): page-stack 같은 계산용
- `<html>`에 속성으로 쓴다. 헤더·앵커 내비·sticky 제목은 `html[data-scroll-dir=down] &` 같은 Tailwind 커스텀 variant로 스타일링.

```css
@custom-variant scroll-down (html[data-scroll-dir="down"] &);
@custom-variant scroll-up   (html[data-scroll-dir="up"] &);
@custom-variant scrolled    (html[data-scrolled="true"] &);
```

### 4.2 Reveal — `useInView` + `<Reveal>`
- `IntersectionObserver`(`rootMargin: "0px 0px -10% 0px"`, `threshold: 0.15`), 한 번 보이면 `data-inview="true"` 고정(원본도 대부분 한 번 등장 후 유지).
- `<Reveal as="div" delay={0.2} variant="fade-up">`: 초기 `opacity:0; translateY(40px)`, 진입 시 `--dur-base`~`--dur-slow` + `--ease-out`.
- stagger: 자식에 `style={{ transitionDelay: i * 0.1s }}`.
- reduced-motion: 처음부터 `data-inview="true"`.

### 4.3 스크롤 진행 — `useScrollProgress(ref)`
- 요소가 화면에 들어온 비율(0~1)을 rAF로 계산해 `--progress` CSS 변수로 쓴다.
- 사용처: 앵커 내비 진행 막대, 상세 sticky 제목 진행 막대, 회사소개 하이라이트 단계, sticky 히어로 문단 등장 단계, page-stack.

### 4.4 캐러셀 — Swiper React 래퍼 `<Carousel preset="…">`
측정한 원본 파라미터를 프리셋으로 고정한다.

| 프리셋 | effect | speed | autoplay | loop | slidesPerView | gap | UI | 사용처 |
|---|---|---|---|---|---|---|---|---|
| `headline` | fade | 400 | 4000 | ✓ | 1 | 0 | 불릿+진행 막대(bar width 0→100% linear 4s)+자동멈춤 | 메인 헤드라인 |
| `promo` | slide | 400 | 4000 | ✓ | 1 | 0 | 동일 + 슬라이드별 배경색 0.4s 전환, 텍스트 흑/백 테마 | 메인 프로모션 |
| `inline-images` | slide | 300 | 2000 | ✓ | 1 | 0 | 없음 | 서비스 상세 섹션 이미지 |
| `feature-fade` | fade | 300 | off | ✗ | 1 | 0 | 불릿 | 서비스 상세 대표 이미지 |
| `cards` | slide | 400 | off | ✗ | auto | 24 (≥1600: 32) | 이전/다음 버튼(섹션 제목 우측, top −87 / ≤1279: −70), 끝에서 버튼 opacity .2 | 연관 콘텐츠, 기술 모델 카드 |
| `recommend` | slide | 400 | off | ✗ | 1 | 24 / 32 | 이전/다음 + 스크롤바, 비활성 카드 opacity .6, 등장 시 리스트 opacity 0→1 0.2s | 스토리 추천 |
| `free-list` | slide | 300 | off | ✗ | auto | 0 | freeMode | 스토리 목록 키워드 칩 |
| `banner` | slide | 400 | off | ✗ | auto | 24 | 이전/다음 | 보도자료·리포트 주요 배너 |

공통 요구:
- 자동 재생 프리셋은 **자동멈춤 토글 버튼**(`aria-pressed`)을 가진다. reduced-motion이면 autoplay 시작 안 함.
- 키보드: `keyboard: { enabled: true, onlyInViewport: true }`, 슬라이드 `role="group"` + `aria-roledescription="slide"`, 라벨 "n / 전체".
- 화면 밖 캐러셀은 IO로 autoplay 정지.

### 4.5 영상 슬롯 — `<MediaSlot>`
- `kind: "image" | "video"`, `ratio`, `poster`, `src?`. 소스가 없으면 placeholder 박스(현재 `PlaceholderVisual` 확장).
- video: `muted playsInline loop autoPlay preload="metadata"`, IO로 화면 밖에서 `pause()`. reduced-motion이면 poster만.
- 모든 비주얼은 `aspect-ratio`로 자리를 먼저 확보(CLS 방지).

### 4.6 Lottie
회사소개 sticky 구간에 lottie 애니메이션이 있다. 원본 애니메이션 파일은 쓸 수 없으므로:
- **1차**: 같은 크기의 sticky 슬롯 + 스크롤 진행에 따라 바뀌는 SVG/CSS 플레이스홀더.
- **2차(선택)**: 자체 제작한 lottie JSON이 생기면 `lottie-web`(light)를 동적 import로 붙인다. 이 결정은 콘텐츠 단계에서 한다.

### 4.7 테마
- 페이지 메타로 `headerTheme: "white" | "transparent" | "dark"`, `pageTheme: "light" | "dark"`를 받는다.
- 다크: 배경 `rgb(10,13,18)` 계열, 텍스트 반전. 기술 페이지 전체가 다크.
- 투명 헤더: 회사소개·모든 상세 페이지 최상단. `scrolled` 상태에서 흰색으로.

---

## 5. 페이지 셸 (모든 페이지 공통)

`PageChrome` 확장 props:
```ts
type PageChromeProps = {
  headerTheme?: "white" | "transparent" | "dark";
  pageTheme?: "light" | "dark";
  hideHeaderOnScroll?: boolean;   // 기본 true, 메인만 false
  title?: { text: string; size: "large" | "compact" };  // 제목 밴드
  tabs?: { label: string; href: string }[];             // 탭 영역
};
```

---

## 6. 공통 컴포넌트 명세

### 6.1 SiteHeader

| 항목 | 명세 |
|---|---|
| 높이 | 48 / 48 / 64 (`xl`부터 64). 메인 데스크톱만 최상단 100 → `scrolled`에서 64, 0.4s `--ease-out` |
| 스크롤 숨김 | 하위 페이지: `scroll-down`에서 `translateY(-100%)`, 0.4s `--ease-out` / `scroll-up`에서 복귀. 메인은 숨기지 않고 `scrolled` 스타일만 |
| 배경 | `white`: 흰색 고정 / `transparent`: 최상단 투명 → `scrolled` 흰색 / `dark`: rgb(10,13,18) 고정. 전환 0.4s `--ease-standard` |
| 메가메뉴 | 기존 구현 유지, `docs/animations.md` 1-4~1-6 수치(0.4s `--ease-menu`, 하위 링크 opacity, 인트로 0.25s) 재확인 |
| 모바일 메뉴 | 현재 우측 85vw 드로어 → **전체화면 메뉴 + 딤**. 열림 0.3s ease-out, 배경 스크롤 잠금, Esc로 닫기, 포커스 트랩 |
| 검색 | 기존 오버레이 유지, 패널 0.4s delay 0.2s / 입력 0.5s (animations 1-9, 1-10) |
| 수용 기준 | 서비스 상세에서 아래로 200px 스크롤 → 헤더가 화면 밖, 위로 10px → 다시 표시. 메인에서는 계속 표시되고 데스크톱 높이 100→64 |

### 6.2 PageTitle (제목 밴드)
- `size="large"`: 228 / 268 / 336, `size="compact"`: 180 / 220 / 280.
- 제목 `text-page-title`(40/48/64), 좌측 정렬, 컨테이너 기준.
- 등장: 페이지 진입 시 fade-up 0.4s.
- 사용: 회사소개 계열(about 제외), 전체 서비스, 미디어 행사, 갤러리, 제휴 4종, 정책(large) / 보도자료·리포트·스토리 목록(compact).

### 6.3 TabArea (페이지 전환 탭)
- 높이 61 / 61 / 63, 하단 보더. 모바일은 가로 스크롤(`overflow-x:auto`, 스크롤바 숨김, 활성 탭이 보이도록 `scrollIntoView({inline:"center"})`).
- 링크 탭(라우트 이동)이므로 `role="tablist"`가 아니라 `<nav aria-label>` + `aria-current="page"`.
- 활성 표시: 텍스트 굵기 + 하단 2px 바. hover 색 0.2s.
- 탭 세트:
  - 연혁 2탭, 브랜드 리소스 2탭(리소스 / 갤러리), 제휴 4탭(제안 / 신청 / 절차 / 현황), 전체 서비스 2탭, 미디어 행사 1탭, 정책 4탭.

### 6.4 AnchorNav (페이지 내 섹션 내비 + 진행 막대)
원본에서 가장 많이 쓰이는 공통 인터랙션. 서비스 상세 10개, 기술 5개, 스토리, 연혁, 보도자료 목록 등에 있다.

**구조**
```
<section data-anchor-root>
  <div class="anchor-nav (sticky top:0, h 56)">
    <div class="bar"><span class="progress" style="width: calc(var(--progress)*100%)"/></div>
    <nav> 섹션 링크들 (가로 스크롤) </nav>
    [모바일] 현재 섹션명 + 펼침 버튼 → 전체 목록 드롭다운(딤)
  </div>
  <section id="…" data-anchor-section> … </section> × N
</section>
```

**동작**
| 상태 | 명세 |
|---|---|
| 붙기 | 루트 상단이 헤더 아래에 닿으면 sticky. 헤더가 보일 때는 헤더 바로 아래(48/64), `scroll-down`으로 헤더가 숨으면 top 0 |
| 이동 | top·transform 0.4s `--ease-out`, 높이 0.4s `--ease-out-soft` |
| 활성 링크 | IO로 화면 중앙선을 지나는 섹션 → 해당 링크 `aria-current="true"` + 색 0.2s. 링크 목록이 넘치면 활성 링크를 가운데로 스크롤 |
| 진행 막대 | 루트 영역 기준 스크롤 진행률, width 0.2s 전환 |
| 숨김 | 루트 끝을 지나면 opacity 0 (0.2s `--ease-out-soft`), 끝 지점에서는 하단 고정 상태 해제 |
| 클릭 | 해당 섹션으로 smooth scroll(헤더+앵커 내비 높이만큼 offset), reduced-motion이면 즉시 이동, 이동 후 섹션 제목에 포커스 |
| 모바일 전체 목록 | 펼침 버튼 화살표 회전 0.2s, 딤 opacity, Esc로 닫기 |

**sticky 비주얼과의 연동**: 앵커 내비가 붙어 있을 때 섹션 이미지 래퍼 top = 100 (1024–1599: 72), 위로 스크롤 중이면 144(헤더+내비), 1023 이하 0. 전환 0.4s `--ease-out-soft`.

**수용 기준**: 링크 클릭 시 정확히 해당 섹션 제목이 내비 바로 아래에 보인다 / 스크롤하면 활성 링크와 진행 막대가 따라간다 / 아래로 스크롤 시 헤더와 함께 위로 붙는다.

### 6.5 RelatedContent (연관 콘텐츠)
- 섹션 제목 "연관 콘텐츠" `text-section-title`, 우측 이전/다음 버튼.
- 카드 5~6개, `cards` 프리셋. 카드: 썸네일(비율 고정) + 카테고리 + 제목 + 날짜.
- 카드 hover(≥1024만): 이미지 `scale(1) → 1.08` 0.2s `--ease-out`, 제목 밑줄. 1023 이하 hover 효과 제거.
- 섹션 높이 637 / 641 / 714.
- 사용: 서비스 상세 전부, 기술 상세 전부, 스토리 상세, 리포트 상세.

### 6.6 CtaBanner ("~가 더 궁금하다면")
- 높이 540 / 480 / 558, 배경 이미지 슬롯 + 어둡게 오버레이 + 제목 + 버튼.
- 버튼 hover: 화살표 아이콘 `arrowAnimation`류 이동(아래 6.11), 배경색 0.2s.
- 사용: 주요 서비스, 1784, 데이터센터 각, 기술 상세.

### 6.7 Card (공통 카드 hover 규칙)
| 카드 종류 | hover (≥1024) |
|---|---|
| 일반 콘텐츠 카드(목록·연관) | 이미지 scale 1.08, 0.2s `--ease-out` |
| 스토리 카드 | 이미지 scale 1.05 |
| 메인 소식 카드 | 이미지 scale 1.08 + 정보 영역 배경색 전환 (animations 3-2) |
| 메인 헤드라인 카드 | 이미지 scale 1.05 (animations 2-4) |
| 링크 버튼 | 배경색 0.2s `--ease-out` |
| 텍스트 링크 | 색상 0.2s |
- 모두 `@media (hover:hover) and (min-width:1024px)`에서만. 키보드 포커스(`:focus-visible`)에도 같은 시각 효과.

### 6.8 StickyVisual (서비스 상세 sticky 이미지)
- 데스크톱(≥1024): 텍스트 열은 스크롤되고 이미지 열이 sticky로 남아 섹션이 바뀔 때 이미지가 교체(cross-fade 0.4s).
- 첫/마지막 sticky 영역은 페이지 단위 sticky(`section-type__page` 패턴), **1023 이하에서는 sticky 해제**하고 이미지가 각 텍스트 위로 들어간다.
- top 값은 §6.4 연동 규칙.

### 6.9 ArticleChrome (상세 페이지 공통)
| 요소 | 명세 |
|---|---|
| 헤더 | `transparent` 테마로 시작 |
| 제목 영역 | 카테고리·날짜 + 제목(26/26/48) + 공유 버튼, 높이 ~386/374/486 |
| sticky 제목 바 | 제목 영역을 지나면 상단에 붙음(opacity 0→1, 0.4s `--ease-out-soft`). 내용: 뒤로가기 버튼 + 짧은 제목 + 읽기 진행 막대. 헤더 숨김/표시와 연동해 top·transform 0.4s |
| 읽기 진행 막대 | 본문 영역 기준 `--progress`, width 0.2s |
| 공유 | 링크 복사(Clipboard API, 완료 토스트) + 네이티브 공유(`navigator.share` 지원 시). 원본의 네이버 공유 플러그인은 재현하지 않고 같은 위치의 버튼으로 대체 |
| 본문 | 리치텍스트(이미지·문단·인용·표), 이미지 캡션 |
| 하단 | 목록으로 버튼 + (해당 시) RelatedContent |
| 사용 | 보도자료·리포트·행사·AI 2종·스토리·정책 상세 (8종) |

### 6.10 SiteFooter
- 높이 707 / 689 / 569. 링크 그룹은 **모바일에서도 펼친 상태**(현재 아코디언 4개 → 제거).
- 패밀리 사이트 펼침 버튼 1개(열림 시 목록, 화살표 회전 0.2s, Esc 닫기).
- SNS 아이콘 hover 색, 정책 링크 굵게(개인정보 처리방침).

### 6.11 키프레임
| 이름(새로 정의) | 동작 | 사용처 |
|---|---|---|
| `nudge-down` | 화살표 아래로 반복 이동, 1.6s `--ease-arrow` infinite | 회사소개 스크롤 유도, 히어로 하단 화살표 |
| `slide-in-content` | 콘텐츠 옆에서 밀려 들어옴 | 패널·리스트 등장 |
| `nudge-x` | 화살표 좌우 반복 | 절차 단계 화살표, CTA 버튼 |
- reduced-motion이면 `animation: none`.

### 6.12 목록 공통: Filter·Keyword·Pagination
- 필터: 연/월 `<select>` 2개(sticky 필터 바), 변경 시 URL 쿼리 갱신.
- 키워드 칩: `?keyword=…` 링크, 활성 칩 표시, 모바일 가로 스크롤(freeMode).
- 페이지 넘김: `?page=N` 링크 기반(서버 렌더 + 뒤로가기 유지), 현재 페이지 `aria-current`. AI in NAVER는 목록 2개가 각각 `page`, `bldPage`를 쓴다.
- RSS: 보도자료·리포트 목록에 RSS 링크(`/api/…/rss` 라우트, 후속 단계에서 실제 피드).

---

## 7. 템플릿 명세

각 템플릿은 `src/components/content/templates/<Name>/`에 두고, 데이터 타입은 `src/types/templates.ts`에 `Section` 유니언으로 정의한다.

### 7.1 ServiceDetail v2 (서비스 상세 12종)
대상: search, tools, advertisement, commerce, cloud, fintech, contents, community, map, datacenterGak, **portal(신규)**, **1784(신규)**

**섹션 구성**
1. **Hero** — 두 가지 변형
   - `icon-grid`: 높이 1421 / 1792 / 1575. 페이지 제목 + 제품 아이콘 카드 N개(3~7개, 측정: tools 3, commerce 4, community 5, contents 7). 진입 시 parallax 레이어 이동(transform, 레이어별 속도 차), 카드 순차 fade-up.
   - `fullscreen`: 100svh 이미지 또는 영상(1784·데이터센터 각: 영상, 데스크톱 1121). 하단 스크롤 유도 화살표 `nudge-down`.
2. **AnchorNav** — 제품 섹션 수만큼 링크.
3. **ProductSection** × N — 하위 블록 조합:
   - `intro`: 제품명(섹션 제목) + 설명 + 외부 링크 버튼
   - `sticky-visual`: §6.8
   - `image-slider`: `inline-images` 프리셋(2초 자동)
   - `feature-fade`: 불릿이 있는 fade 이미지
   - `detail-services`: "세부 서비스" 카드 그리드 1 / 2 / 3열
   - `feature-list`: 광고 페이지처럼 그룹 제목 + 상품 카드 다수(1열 목록, 각 카드 이미지)
4. **GrowTogether** (선택) — "함께 성장하는" 파트너 링크 블록
5. **CtaBanner** (선택) — 1784·데이터센터 각
6. **RelatedContent**

**페이지별 데이터 요점 (측정)**
| 페이지 | 히어로 | 제품 섹션 | 본문 높이(모/태/데) | 이미지·영상 |
|---|---|---|---|---|
| search | icon-grid(이미지형) | 3 (검색·AI 브리핑·AI탭) | 2229/2418/4050 | 13 |
| tools | icon-grid 3 | 3 | 2361/2576/4050 | 11 |
| advertisement | fullscreen | 그룹 3 · 상품 27 (feature-list) | 13145/10789/13252 | 52 |
| commerce | icon-grid 4 | 5 | 7401/6932/7646 | 24 · 영상 2 |
| cloud | fullscreen | 6 특징 | 4396/3409/4523 | 14 |
| fintech | icon-grid 3 | 3 (+세부 서비스) | 5265/4737/5812 | 18 |
| contents | icon-grid 7 | 7 | 6315/6583/7650 | 21 |
| community | icon-grid 5 | 5 | 4603/4758/5850 | 15 |
| map | icon-grid(이미지형) | 3 (+세부 서비스) | 5850/5026/6149 | 22 |
| datacenterGak | fullscreen 영상 | 6 + 거점 2 + 리전 | 6650/5119/6638 | 18 · 영상 3 |
| portal | icon-grid | 2 | 1376/1534/3150 | 5 |
| 1784 | fullscreen 영상 | 3 그룹(로봇·업무·친환경) | 7964/6380/8509 | 28 |

**반응형**: 제품 섹션 카드 열 수 1 / 1~2 / 3 (측정: fintech·map 1/2/3, community 1/1/5, contents 1/1/7). sticky는 ≥1024에서만.

**수용 기준**: 12개 페이지가 같은 컴포넌트로 렌더되고 데이터만 다르다 / 페이지 길이가 원본 ±15% / 앵커 내비·sticky 비주얼·이미지 슬라이더·연관 콘텐츠 동작.

### 7.2 SectionLanding (주요 서비스 · 주요 기술)
대상: `/service/featuredServices`, `/tech/innovation`(다크)

1. **StickyHero** — 높이 2030 / 2560 / 2925. 화면에 고정된 상태에서 스크롤 진행에 따라 문단·이미지가 차례로 등장.
   - 문단 초기: `translateY(100%)`, opacity 0 → `ready`: 1번 `translateY(50%)`·opacity 1, 2번 delay 0.2s → `enter`: `translate(0)` → `leave`: 다시 `translateY(50%)`, 3번 문단 opacity 0.
   - 이미지 8장 parallax(레이어별 transform).
   - 태블릿부터 이미지 줄이 가로 스크롤(측정).
   - reduced-motion: 모든 문단·이미지 최종 상태로 정적 배치.
2. **featuredServices**: 대표 서비스 4개, 1열, 각 항목 영상 슬롯 + sticky(3594/2804/4275) → CtaBanner.
3. **innovation**: 분야 섹션(§7.4 page-stack) + 투자·연구 블록.

### 7.3 TechDetail (기술 상세 4종, 다크)
대상: hyperclovax, spatialAI, robotics, immersiveMedia

1. **VideoHero** — 770 / 797 / 1121(모바일 일부 808), 영상 자동 재생, 다크 헤더.
2. **AnchorNav**
3. **Blocks** — 분야별 블록(블록 4개 내외): 모델/제품 카드 `cards` 캐러셀(hyperclovax 6장), 이미지+텍스트 행, 영상 2, 사례 카드.
4. **CtaBanner** ("~가 더 궁금하다면")
5. **RelatedContent**

본문 높이(측정): hyperclovax 5107/3561/4663, spatialAI 9198/6622/9428, robotics 9964/6672/9744, immersiveMedia 11210/7772/10855.

### 7.4 PageStack (기술 혁신 분야 스택)
`/tech/innovation` 본문 15270 / 10935 / 20530의 핵심 인터랙션.
- 분야 카드가 sticky로 쌓이며, 다음 카드가 올라오면 이전 카드가 접힌 헤더 형태로 위에 남는다.
- 수치:
  - sticky top: 기본 0, 헤더 보일 때(`scroll-up`) 64, 앵커 내비 있을 때 56
  - 전환: `--dur-stack` 1.06s, `--ease-stack`
  - 접힌 카드: 정보 영역 `translateY(-80px)`, 제목 `scale(.625)`, 접힘 높이 64px (스택 전체는 `translateY(-128px)`로 밀림)
  - 마지막 카드(`end`)에서는 전환 제거
- 각 카드: 분야 제목 + 하위 항목 3개(`point-items`) + 비주얼(영상/이미지, `item-visual/item-desc` active 전환).
- 모바일: 스택 대신 세로 나열 + reveal(측정 결과 모바일도 sticky 존재 → 1차는 동일 구현, 성능 문제 시 모바일 단순화).
- reduced-motion: 스택 없이 세로 나열.

### 7.5 AboutStory (회사소개 스크롤 스토리)
`/company/about` 9825 / 11313 / 12350.

1. **MainVisual** — 100svh 영상 2개(교차) + sticky, 하단 `nudge-down` 화살표.
2. **FadeHighlight** 구간 — sticky 래퍼 안에서 문장 단위로:
   - 하이라이트 문구: 초기 `translateY(-50px)` opacity 0 → `is-show`: `translateY(-50%)` opacity 1, 0.8s `--ease-sine`
   - 문구 속 단어: opacity .2 → 1, 0.3s ease-in-out (스크롤 단계마다)
   - `is-extended`: 앞 문구 `translateY(-110px)` 사라지고 확장 문구가 0.8s로 등장, 이후 문구 `translateY(110px)`에서 올라옴
3. **ScrollTitle + Lineup** — "처음을 / 다시를 / 끝까지" 섹션 제목이 sticky, 라인업 항목들이 스크롤에 따라 하이라이트(opacity .2 → 1, 0.3s, 측정 17회 토글).
4. **LottieSlot** — sticky 애니메이션 자리(§4.6), `is-stick` 상태에서만 sticky.
5. 이미지 23장 · 캐러셀 · 수치 블록 · 회사 정보.

수용 기준: 스크롤만으로 하이라이트 단계가 순서대로 진행 / 뒤로 스크롤하면 역순 / reduced-motion에서 모든 문구가 정적으로 읽힌다.

### 7.6 Company 정보 페이지
| 페이지 | 구성 | 레이아웃 (모/태/데) | 인터랙션 |
|---|---|---|---|
| affiliates | PageTitle + 큰 카드 5개 | **1열 고정**, 카드마다 이미지 2장 + 태그라인 + 설명 + 링크. 높이 3263/2580/2810 | sticky 이미지, hover 7, reveal |
| history | PageTitle + TabArea(2) + 연혁 | 항목 25개 1열, 높이 6796/5860/4666 | 연도 AnchorNav + 진행 막대 |
| brandGuide | PageTitle + TabArea(리소스/갤러리) + 블록 11 | 1열, 이미지 8 | 다운로드 전 **동의 모달**(배경 클릭·Esc 닫기, 포커스 트랩) |
| gallery (신규) | PageTitle + TabArea + 사진 그리드 | 1 / 2 / 2열, 이미지 6+ | 사진 hover, 클릭 시 라이트박스(선택) |
| partnership | PageTitle + TabArea(4) + 안내 카드 7 | 1 / 2 / 3열 | hover 17 |
| partnerApply (신규) | 동일 셸 + 신청 폼 | 폼 블록 8, 1 / 2 / 2열, 유형 7개(`?joinSiteCd=`) | 유효성 검사, 개인정보 동의 체크, 제출 결과 화면 |
| partnerProcess (신규) | 동일 셸 + 절차 5단계 | 1열, 단계 제목 18/18/20 | 단계 화살표 `nudge-x` |
| partnerStatus (신규) | 동일 셸 + 조회 폼 | 블록 3 | 조회 결과 표시 |
| contact | PageTitle + 블록 5 | **1열 목록** (현재 3열 → 변경), 높이 3308/2595/2480 | 링크·전화 hover |

### 7.7 ContentList (보도자료 · 네이버 리포트)
1. PageTitle `compact`.
2. **주요 배너** — 9장 `banner` 캐러셀, 높이 429 / 444 / 576, 이미지.
3. **목록** — **1열 리스트(전 화면 크기)**: 썸네일 + 카테고리 + 제목 + 날짜. 12개/페이지. sticky 필터 바(연·월 select 2개), 키워드 칩, 페이지 넘김(§6.12). hover: 행 배경/제목 밑줄 + 썸네일 scale.
4. **퀵 링크** (보도자료만) — 3개 1 / 3 / 3열, 높이 733 / 387 / 409.
5. RSS 링크.

현재와 차이: 2장 고정 카드 → 9장 캐러셀 / 1·2·4열 그리드 → 1열 리스트 / 썸네일·키워드·URL 페이지 넘김·퀵 링크 없음.

### 7.8 StoryList
1. PageTitle `compact`.
2. **추천 스토리** — `recommend` 프리셋 10장, 높이 428 / 438 / 573. 카드 이미지가 슬라이드 상태에 따라 위치·opacity 전환(데스크톱), ≤1023은 전환 없이 정적.
3. **목록** — AnchorNav(키워드 카테고리) + 카드 12개 1 / 2 / 3열, 키워드 칩(freeMode), 페이지 넘김, 카드 hover scale 1.05.

### 7.9 ArticleDetail (상세 8종)
§6.9 ArticleChrome + 본문 + (해당 시) RelatedContent.

| 상세 | 연관 콘텐츠 | 비고 |
|---|---|---|
| pressReleasesDetail | ✗ | 공유 |
| naverReportsDetail (신규) | ✓ 5장 | 보고서 다운로드 버튼 |
| mediaEventsDetail (신규) | ✗ | 마감 표시 |
| aiInNaver/naverAiDetail (신규) | ✗ | |
| aiInNaver/buildingAiDetail (신규) | ✗ | |
| storyDetail | ✓ 6장 | 태그 |
| policy/privacyDetail (신규) | ✗ | 긴 문서 → sticky 목차(앵커) |
| policy/partnerDetail (신규) | ✗ | |

### 7.10 기타 신규 목록
| 페이지 | 구성 |
|---|---|
| mediaEvents | PageTitle + TabArea(1) + 행사 목록 1 / 2 / 2열 (날짜·제목·상태) |
| aiInNaver | VideoHero(754/782/1106, 키프레임 1) + 목록 2개(각 6개 1 / 1 / 3열 캐러셀, 독립 페이지 넘김 `page`/`bldPage`) |
| policy/privacy · partner · notice · video | PageTitle + TabArea(4) + 버전 목록 1열 + 페이지 넘김 |

### 7.11 Main 보정
`docs/animations.md` 수치를 기준으로 하고 측정 차이만 보정한다.

| 섹션 | 원본 (모/태/데) | 현재 | 할 일 |
|---|---|---|---|
| 헤더 | 48/48/100→64 | 65 | §6.1 |
| 헤드라인 | 1016/718/638, 슬라이드 4 | 638/402/714, 3 | 슬라이드 4, 모바일 세로 배치, `headline` 프리셋 진행 막대·자동멈춤 |
| 소식 카드 | 1775/3465/2634, 5개 1열(모)·3열 masonry(태·데) | 2/2/3열 | 태블릿 3열 masonry(animations 3-1: 768–1023은 2열 50%라는 기존 기록과 측정이 다름 → 구현 시 실제 화면으로 재확인), 모바일 5장 + 전체보기 |
| 프로모션 | 718/532/675, 5장 | 554/404/530, 4장 | 5장, `promo` 프리셋 |
| 서비스·기술 요약 | 847/1261/757, 블록 3, 1열(모·태)·3열(데) | 644 고정, 2블록 2열 | 블록 3, 가로 확장 패널(animations 5-1~5-5: width 0.6s `--ease-out-soft`, 버튼 0.6s 지연 등장) |
| 함께 성장 | 792/608/650, 링크 6, 1열→3열 | 4개 2/4열 | 링크 6, 1 / 3 / 3열 |

---

## 8. 반응형 매트릭스 (요약)

| 컴포넌트 | 모바일 ≤767 | 태블릿 768–1023 | 데스크톱 ≥1024 (≥1280 수치) |
|---|---|---|---|
| 헤더 | 48, 전체화면 메뉴 | 48, 전체화면 메뉴 | 64, 메가메뉴 |
| 제목 | 40 | 48 | 64 |
| 앵커 내비 | 현재 섹션명 + 펼침 목록 | 가로 스크롤 링크 | 가로 링크 전체 |
| sticky 비주얼 | 해제 | 해제 | 적용 (top 72~144) |
| 카드 hover | 없음 | 없음 | 있음 |
| 캐러셀 gap | 24 | 24 | 24 (≥1600: 32) |
| 연관 콘텐츠 | 637 | 641 | 714 |
| 목록(보도자료) | 1열 | 1열 | 1열 |
| 스토리 카드 | 1열 | 2열 | 3열 |
| 제품 카드 | 1열 | 1~2열 | 3열 이상 |
| 푸터 | 펼침(아코디언 없음) | 펼침 | 그리드 |

---

## 9. 접근성

- 모든 인터랙티브 요소 `:focus-visible` 링. hover 효과는 포커스에도 동일 적용.
- 캐러셀: 자동멈춤 버튼, 슬라이드 그룹 라벨, 키보드 화살표, 화면 밖 정지.
- 앵커 내비: `<nav aria-label="페이지 내 이동">`, 활성 `aria-current`, 이동 후 포커스 이동.
- 모달·전체화면 메뉴·검색: 포커스 트랩, Esc 닫기, 닫으면 여는 버튼으로 포커스 복귀, 배경 `inert`.
- 영상: 장식용은 `aria-hidden`, 정보성 영상은 정지 버튼.
- 색 대비: 다크 테마 본문 대비 4.5:1 이상.
- reduced-motion: autoplay·parallax·sticky 순차 등장·page-stack·하이라이트·키프레임 전부 비활성, 최종 상태 표시.

## 10. 성능

- 스크롤 리스너 1개(passive + rAF). 컴포넌트별 `scroll` 리스너 금지.
- 스크롤 중 레이아웃 읽기는 rAF 안에서 한 번에, 쓰기는 CSS 변수로.
- `transform`/`opacity`만 애니메이션(레이아웃 속성 전환 금지, 예외: 패널 width·page-stack height는 원본과 같게 하되 `will-change` 제한적으로).
- 영상: `preload="metadata"`, 화면 밖 정지, 모바일 저해상도 소스.
- 이미지: `next/image`, 비율 고정, 첫 화면 외 lazy.
- 목표: 모바일 Lighthouse Performance 80+, CLS < 0.1, INP < 200ms.

## 11. 데이터 · 어드민 연계

- 템플릿 props = 데이터 타입. 예:
```ts
type ServiceDetailContent = {
  hero: { variant: "icon-grid"; title: string; icons: IconCard[] }
      | { variant: "fullscreen"; title: string; media: Media };
  sections: ProductSection[];      // AnchorNav 링크 자동 생성
  growTogether?: LinkGroup;
  cta?: CtaBanner;
  related?: RelatedItem[];
};
type ProductSection = {
  id: string; title: string; description: string;
  blocks: Array<
    | { type: "sticky-visual"; items: { title: string; text: string; media: Media }[] }
    | { type: "image-slider"; images: Media[] }
    | { type: "feature-fade"; images: Media[] }
    | { type: "detail-services"; cards: Card[] }
    | { type: "feature-list"; groups: { title: string; cards: Card[] }[] }
  >;
};
```
- 이 `blocks` 유니언을 그대로 Payload `blocks` 필드로 옮긴다(콘텐츠 단계).
- 현재 리포지토리 경계(`src/lib/data/*`)는 유지. 템플릿 교체 시 리포지토리 반환 타입만 v2로 올린다.

## 12. 검증 방법

1. **측정 스크립트 재사용**: 이번 비교에 쓴 측정 스크립트를 `scripts/ui-parity/measure.js`로 저장하고, 페이지 목록을 받아 두 사이트 결과를 JSON으로 출력 → 차이 리포트 자동 생성. (구현 단계에서 추가)
2. **섹션 단위 나란히 비교**: 원본과 로컬을 세 크기로 열어 섹션별 스크린샷·GIF 비교.
3. **인터랙션 체크리스트**: §6~§7 수용 기준을 페이지별 체크리스트로 만들어 PR마다 확인.
4. **자동 검사**: `npm run check`, Playwright로 키보드 동선·reduced-motion 스냅샷(선택).

## 13. 작업 단계

| 단계 | 내용 | 산출물 | 의존 | 규모 |
|---|---|---|---|---|
| 0 | 브랜치, 토큰(§3), `ScrollProvider`, `useInView`·`useScrollProgress`, Tailwind variant | 토큰·훅 | — | S |
| 1 | 셸: SiteHeader 개편, PageTitle, TabArea, SiteFooter, 전체화면 모바일 메뉴 | 공통 셸 | 0 | M |
| 2 | 공통 블록: AnchorNav, Carousel 프리셋, RelatedContent, CtaBanner, MediaSlot, Card hover, Reveal, 키프레임 | 공통 블록 | 0 | L |
| 3 | ServiceDetail v2 + 12페이지 데이터(portal·1784 신규 라우트 포함) | 서비스 상세 12 | 1, 2 | L |
| 4 | SectionLanding(StickyHero) + TechDetail(다크·영상) + PageStack | 서비스·기술 랜딩, 기술 상세 4 | 1, 2 | L |
| 5 | ArticleChrome + ContentList + StoryList + 상세 8종 + mediaEvents·naverReports·aiInNaver 라우트(404 해소) | 미디어·스토리 | 1, 2 | L |
| 6 | Company 정보 페이지 + gallery·partnerApply·Process·Status + 정책 | 회사·정책 | 1, 2 | M |
| 7 | AboutStory(스크롤 스토리) | 회사소개 | 2 | L |
| 8 | Main 보정 | 메인 | 2 | M |
| 9 | 전체 측정·체크리스트 검증, 접근성·성능 점검 | 검증 리포트 | 전부 | M |

> 404가 나는 미디어 3개 라우트는 단계 5를 기다리지 말고 단계 1 직후 임시 셸로 먼저 만들어 링크 깨짐을 막는다.

## 14. 리스크 · 열린 질문

| 항목 | 내용 | 제안 |
|---|---|---|
| 원본 측정값 불일치 | 메인 소식 카드 태블릿 열 수가 `docs/animations.md`(2열)와 이번 측정(3열)이 다름 | 단계 8에서 실제 화면으로 재확인 후 animations.md 갱신 |
| page-stack 모바일 성능 | 모바일에서도 sticky 스택이 측정됨 | 동일 구현 후 저사양 기기에서 프레임 확인, 문제 시 모바일 단순화 |
| lottie | 원본 애니메이션 사용 불가 | 1차 플레이스홀더, 자체 제작 여부는 콘텐츠 단계에서 |
| 비주얼 소스 | 이미지·영상 0장 상태 | 슬롯만 먼저, 네비게이토 사진 이관 때 채움 |
| 신청 폼 | partnerApply 실제 제출 처리 | UI는 이번 범위, 저장은 Payload 컬렉션(후속) |
| 라우트 이름 | 교회식 경로(`/about`, `/ministry` 등)로 바꿀지 | UI 재현은 현재 경로로 진행, 이름 변경은 콘텐츠 단계 1에서 일괄 |
| hover 세부값 | 이번 측정은 hover 요소 수와 공통 규칙까지 | 섹션 구현 시 원본 DevTools로 개별 값 재확인 |

## 부록 A. 측정 요약 (데스크톱 페이지 길이, px)

| 페이지 | navercorp | 프로젝트 | 비율 |
|---|---|---|---|
| /main | 6118 | 4376 | 72% |
| /company/about | 12350 | 2091 | 17% |
| /company/affiliates | 3811 | 1095 | 29% |
| /company/history | 5729 | 1292 | 23% |
| /service/featuredServices | 7523 | 2341 | 31% |
| /service/advertisement | 15531 | 2495 | 16% |
| /service/commerce | 10600 | 2495 | 24% |
| /tech/innovation | 23220 | 2341 | 10% |
| /tech/immersiveMedia | 12641 | 2159 | 17% |
| /media/pressReleases | 5284 | 2157 | 41% |
| /story | 3894 | 1749 | 45% |
| 평균(28개) | | | 약 29% |

전체 수치·섹션별 비교는 `navercorp_UI_정밀비교.xlsx` 참고.

## 부록 B. 측정한 Swiper 파라미터

| 위치 | effect | speed | autoplay | loop | slidesPerView | gap | 기타 |
|---|---|---|---|---|---|---|---|
| 메인 헤드라인 | fade | 400 | 4000 | ✓ | 1 | — | 진행 막대 불릿 (animations 2-1) |
| 메인 프로모션 | slide | 400 | 4000 | ✓ | 1 | — | 배경색 전환 (animations 4-1) |
| 서비스 상세 대표 이미지 | fade | 300 | — | ✗ | 1 | 0 | 불릿 |
| 서비스 상세 섹션 이미지 | slide | 300 | 2000 | ✓ | 1 | 0 | — |
| 연관 콘텐츠 | slide | 400 | — | ✗ | auto | 24 (≥1600: 32) | 이전/다음 |
| 스토리 추천 | slide | 400 | — | ✗ | 1 | 24 (≥1600: 32) | 이전/다음 + 스크롤바 |
| 스토리 키워드 | slide | 300 | — | ✗ | auto | 0 | freeMode |
