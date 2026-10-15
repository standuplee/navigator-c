# 작업 핸드오프: navercorp.com 메인 UI/UX 재현

> claude.ai 채팅에서 논의한 내용을 정리한 문서입니다. Claude Code는 이 문서를 먼저 읽고 작업을 이어가세요.

## 목표

- 기존 프로젝트(`/Users/seora/github/navigator-c`)에서 https://www.navercorp.com/main 의 **레이아웃, 인터랙션, 애니메이션, UX 흐름**을 재현한다.
- 결과물은 **다른 서비스에서 활용**할 예정이다. 따라서 패턴과 동작은 가져오되 브랜딩은 자체 것으로 교체한다.
- 애니메이션은 **전부** 재현 대상이다.

## 반드시 지킬 규칙

1. 기존 프로젝트의 스택, 폴더 구조, 컨벤션을 따른다. 새 프로젝트를 스캐폴딩하거나 기존 파일을 덮어쓰지 않는다.
2. 원본 사이트의 JS/CSS 코드를 복사하지 않는다. 동작과 수치(duration, easing, delay, 크기, 간격)를 분석해서 이 프로젝트 스택으로 새로 작성한다.
3. 네이버 로고, 사옥·서비스 이미지, 보도자료·카피 텍스트 등 브랜드 에셋은 사용하지 않는다. placeholder 이미지와 더미 카피로 대체한다.
4. 주가, 보도자료, 스토리 목록 같은 동적 데이터는 mock JSON으로 분리해서, 나중에 API/CMS로 교체하기 쉽게 만든다.
5. 모든 애니메이션에 `prefers-reduced-motion` 대응과 키보드 접근성을 넣는다.

## 사용할 스킬

`/clone-website` 스킬 (출처: https://github.com/JCodesMore/ai-website-cloner-template)

설치(아직 안 했다면):

```bash
git clone https://github.com/JCodesMore/ai-website-cloner-template.git /tmp/cloner
mkdir -p .claude/skills
cp -r /tmp/cloner/.claude/skills/clone-website .claude/skills/
claude --chrome
```

주의: 이 스킬은 원래 템플릿 스택(Next.js + shadcn/ui + Tailwind v4)을 전제로 작성되어 있다. 이 프로젝트에 적용할 때는 스킬의 분석 파이프라인(스크린샷, 디자인 토큰 추출, 인터랙션 스윕)만 활용하고, 코드 생성은 이 프로젝트 구조에 맞춘다.

## 대상 페이지 구조 (사전 조사)

- **헤더 / 메가메뉴**: 회사소개, 서비스, 기술, 지속가능성, 투자정보, 미디어, 스토리, 채용. 각 메뉴가 헤드라인 카피 + 하위 링크 + 대표 이미지로 구성된 드롭다운을 연다. 언어 전환(KR/EN), 통합검색 레이어, 모바일 전체 메뉴 있음.
- **상단 정보 바**: 주가 티커, 보도자료 롤링 배너(자동 재생 + "자동멈춤" 토글).
- **바로가기 배너**: 통합보고서, 실적발표, 채용 등.
- **We the Navigators**: 스토리/보도자료 카드 리스트(가로 스크롤 또는 슬라이더 가능성).
- **프로모션 캐러셀**: 이미지 + 제목 + 설명 + "자세히 보기", 자동 재생/멈춤.
- **주요 서비스와 기술 요약**: 서비스 / 기술 / 지속가능성 3개 블록, 큰 비주얼 + 헤드라인 + 설명 + 링크. 스크롤 인터랙션 여부 확인 필요.
- **함께 성장하는 네이버**: 파트너 지원 / 개발자 지원 탭 또는 링크 그룹.
- **푸터**: 데스크톱은 링크 그리드, 모바일은 아코디언. SNS 링크, 정책 링크.

## 진행 순서

1. **현황 파악**: 이 프로젝트의 package.json, 폴더 구조, 이미 구현된 컴포넌트를 확인하고 요약한다.
2. **갭 분석**: 원본 메인 페이지와 현재 구현을 비교해 남은 레이아웃·인터랙션·애니메이션·UX 흐름 목록을 만든다.
3. **애니메이션 인벤토리**: `docs/animations.md`에 모든 애니메이션을 정리한다. 항목마다 트리거(hover/scroll/click/자동), 대상 요소, 속성 변화, duration, easing, delay, 원본의 구현 방식(CSS/JS, 사용 라이브러리)을 적는다. 데스크톱과 모바일 모두 확인한다.
4. **구현 방식 결정**: 프로젝트 스택에 맞게 통일한다. (예: 단순 transition은 CSS/Tailwind, 진입·퇴장·스크롤 연동은 Motion, 캐러셀은 Embla 또는 Swiper React) 이미 쓰는 라이브러리가 있으면 그것을 우선한다.
5. **섹션별 구현 + 비교 검증**: 한 항목씩 구현하고, Chrome에서 원본과 클론을 나란히 열어 스크린샷/GIF로 비교하며 수치를 맞춘다.
6. **반응형·접근성 점검**: 브레이크포인트별 레이아웃, reduced-motion, 키보드 포커스 이동을 확인한다.

## 다중 페이지(라우트 트리) 재현

메인 이후에는 사이트 전체 라우트 구조를 재현한다. 페이지를 하나씩 복제하지 말고 **템플릿 단위**로 재현한다.

### 원본 라우트 (메가메뉴 기준, 방문해서 확정할 것)

- `/company/*`: about, affiliates, history, brandGuide, partnership, contact
- `/service/*`: featuredServices, portal, tools, search, advertisement, commerce, cloud, fintech, 1784, contents, datacenterGak, community, all, map
- `/tech/*`: innovation, hyperclovax, spatialAI, robotics, immersiveMedia
- `/esg/*`: sustainability, sustainableManagement, techForPeople, social, environment, fairTrade, esgReports
- `/investment/*`: irUpdates, corporateGovernance, irEvents, disclosure, stock, earnings
- `/media/*`: pressReleases, pressReleasesDetail?seq=, mediaEvents, naverReports, naverReportsDetail?seq=, aiInNaver
- `/story`, `/story/storyDetail?seq=`

### 대표 샘플 URL (템플릿 분석용)

- https://www.navercorp.com/service/featuredServices
- https://www.navercorp.com/esg/sustainableManagement
- https://www.navercorp.com/story
- https://www.navercorp.com/story/storyDetail?seq=10034596

### 절차

1. 위 라우트를 모두 방문해 `docs/routes.md`에 라우트 트리를 정리한다. 각 페이지마다 레이아웃 골격, 섹션 구성, 서브 내비게이션 유무를 적는다.
2. 같은 골격을 공유하는 페이지끼리 묶어 **페이지 템플릿 목록**을 만든다. (예상: 섹션 랜딩, 서비스 상세, ESG 콘텐츠, 목록+필터+페이지네이션, 게시글 상세 등. 실제 방문 결과로 확정)
3. `/clone-website`는 템플릿별 대표 URL 1~2개씩만 넣어 실행한다. 한 번에 전체 URL을 넣지 않는다.
4. 라우트 구조는 이 프로젝트 라우터에 맞춘다. (Next.js App Router라면) 공통 헤더·푸터는 루트 layout, 섹션별 서브 내비게이션은 섹션 layout으로 분리한다.
5. 상세 페이지는 `?seq=` 쿼리 대신 `/story/[id]` 같은 동적 라우트로 만든다. 원본 URL 호환이 필요하면 리다이렉트로 처리한다.
6. 템플릿 컴포넌트를 먼저 완성하고, 각 페이지는 mock 데이터(JSON 또는 MDX)만 바꿔 끼워 생성한다.
7. 페이지 간 UX 흐름도 재현한다: 메가메뉴 이동 시 전환, 현재 메뉴 하이라이트, 서브 내비게이션 고정, 스크롤 복원, 목록→상세→목록 복귀 시 필터·스크롤 상태 유지.
8. 각 페이지의 애니메이션도 `docs/animations.md`에 페이지/템플릿별로 추가한다.

## 관리자(어드민) 페이지 / 콘텐츠 관리

보도자료 등 운영 콘텐츠는 mock이 아니라 어드민에서 작성·저장·발행되어야 한다.

### 데이터 분류

- **어드민 관리 대상(CMS 컬렉션)**: 보도자료, 스토리, 네이버 리포트, 미디어 행사, IR 뉴스, IR 일정, IR 자료실, ESG 자료실(PDF), 메인 프로모션 캐러셀, 메인 롤링 배너, 메인 바로가기 배너
- **코드/MDX로 관리**: 회사소개, 서비스·기술 소개 등 변경이 드문 정적 페이지
- **외부 API 연동**: 주가 등 실시간 데이터 (어드민 대상 아님)

실제 분류는 라우트 조사(`docs/routes.md`) 후 확정해서 `docs/content-model.md`에 정리한다.

### 구현 방식

- 기본안: **Payload CMS**를 기존 Next.js 앱에 통합 (스키마를 코드로 정의, 어드민 UI 자동 생성, 같은 프로젝트 내 운영). 프로젝트 스택이 Next.js가 아니거나 다른 요구가 있으면 대안(Sanity, Strapi, Supabase + 자체 어드민)을 비교해서 제안하고 확인받은 뒤 진행한다.
- DB, 파일 스토리지, 배포 환경은 도입 전에 사용자에게 확인한다.

### 필수 기능

- 리치 텍스트 에디터, 이미지·파일 업로드
- 초안 저장 / 발행 / 예약 발행
- 카테고리·태그 (예: Service, Tech, Leader's View)
- 운영자 로그인, 역할별 권한
- 발행 전 미리보기
- KR/EN 다국어 필드
- 게시글별 SEO·OG 이미지 필드
- 발행·수정 시 프론트 캐시 재검증(revalidate) 연동

### 작업 순서

1. 프론트 재현 단계에서 mock 데이터 형태를 **CMS 스키마와 같은 구조**로 설계한다 (`docs/content-model.md` 기준).
2. 프론트는 데이터 접근을 `lib/data/*` 같은 데이터 레이어 함수로만 하게 해서, 소스 교체 시 컴포넌트를 수정하지 않게 한다.
3. 프론트 템플릿이 안정되면 CMS를 도입하고 컬렉션을 정의한다.
4. mock 데이터를 시드 스크립트로 CMS에 넣고, 데이터 레이어를 CMS 조회로 교체한다.
5. 미리보기, 재검증, 권한을 연결하고 운영 시나리오(작성→미리보기→예약 발행→프론트 반영)를 테스트한다.

## 진행 상황 기록

작업하면서 `docs/progress.md`에 완료/진행 중/남은 항목을 계속 업데이트해서, 세션이 끊겨도 이어갈 수 있게 한다.
