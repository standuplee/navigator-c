# 콘텐츠 데이터베이스 계획

PostgreSQL을 기준 DB로 사용하고 Prisma를 데이터 모델·마이그레이션 계층으로 둔다. 모든 라우트는 `SitePage`로 등록하고 화면은 `PageSection.componentType`에 맞는 공통 컴포넌트를 찾아 `data`를 props로 전달한다. 콘텐츠는 Markdown 원문과 `StoryBlock` 구조화 블록을 함께 보관한다. Markdown은 관리자 편집기와 export/import에 유리하고, 블록 데이터는 이미지·인용·임베드 같은 편집 기능을 안전하게 확장할 수 있다.

- `Story`: 제목, 카테고리, 게시일, Markdown 본문, 공개 상태
- `StoryBlock`: 렌더링 순서와 타입별 JSON payload
- `Tag`/`StoryTag`: 카드 태그와 검색 인덱스
- `MediaAsset`: 업로드 이미지의 URL, 대체 텍스트, 크기와 MIME 정보
- `SitePage`/`PageSection`: 메인, 서비스, 기술, 스토리, 보도자료 등 모든 페이지와 섹션 순서·컴포넌트 props
- `ContentEntry`: 스토리·보도자료·서비스 콘텐츠를 공통 검색/게시 모델로 관리

관리자 페이지는 `Story` 초안 저장 → 미리보기 → 공개 전환 흐름으로 만든다. 이미지는 DB에 바이너리를 넣지 않고 object storage 또는 `public/uploads`의 URL만 저장한다. 공개 페이지는 서버 컴포넌트에서 repository를 호출하고, 검색·카테고리 탭만 클라이언트에서 필터링한다.

현재 화면 데이터는 `src/features/navercorp/data/`에 seed 형태로 남아 있으며, Prisma 설치와 `prisma migrate deploy` 이후 `StoryRepository`를 DB 조회로 교체하면 된다. 초기 운영 절차는 `npx prisma migrate dev --name content-foundation` → seed 실행 → 관리자 API 연결 순서다.
