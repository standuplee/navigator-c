# 어드민(Payload) 안내

`/admin`에서 사이트의 모든 페이지 내용을 고칩니다. 저장하면 해당 페이지가 바로 다시 그려집니다.

## 처음 한 번

```bash
npm run dev          # 개발 서버 (SQLite payload.db, 스키마는 자동 반영)
npm run seed         # 지금 화면에 보이는 임시 내용을 어드민에 채워 넣기 (여러 번 실행해도 안전)
npm run seed -- --reset  # 예전 임시 내용을 지우고 지금 코드의 임시 내용으로 다시 채우기
                         # (콘텐츠 컬렉션 문서 삭제 + 글로벌 덮어쓰기, 사용자·미디어는 그대로)
```

`/admin`에 처음 들어가면 첫 관리자 계정을 만듭니다. 시드를 돌리지 않아도 사이트는 열리지만,
비어 있는 컬렉션·글로벌은 코드에 있는 임시 내용으로 표시됩니다(아래 "대체 표시").

## 페이지별 관리 위치

| 페이지 | 주소 | 어드민 위치 | 종류 |
|---|---|---|---|
| 메인 | `/` | 페이지 › 메인 페이지 | 글로벌 |
| 헤더·푸터 메뉴 | 전체 | 설정 › 메뉴 | 글로벌 |
| 단체명·저작권 | 전체 | 설정 › 사이트 기본 정보 | 글로벌 |
| About 스토리 | `/about` | About › About 스토리 | 글로벌 |
| 목사님 추천 | `/about/recommendations` | About › 목사님 추천 | 컬렉션 |
| 연혁 | `/about/history` | About › 연혁 페이지(탭) + 연혁(항목) | 글로벌 + 컬렉션 |
| 비전관 | `/about/vision-center` | 페이지 › 사역·소개 상세 (slug `vision-center`) | 컬렉션 |
| 네비게이토 도구 / 갤러리 | `/about/tools`, `/about/gallery` | About › 도구·갤러리 (slug `tools`, `gallery`) | 컬렉션 |
| Contact | `/about/contact` | About › Contact | 글로벌 |
| 사역 첫 화면 | `/ministry` | 페이지 › 사역·활동 첫 화면 (slug `ministry`) | 컬렉션 |
| 사역 상세 6개 | `/ministry/<slug>` | 페이지 › 사역·소개 상세 | 컬렉션 |
| 한눈에 보기 | `/ministry/all`, `/ministry/all/abc` | 페이지 › 한눈에 보기 + 각 상세의 "한눈에 보기 목록" | 자동 + 글로벌 |
| 활동 첫 화면 | `/fellowship` | 페이지 › 사역·활동 첫 화면 (slug `fellowship`) | 컬렉션 |
| 활동 상세 4개 | `/fellowship/<slug>` | 페이지 › 활동 상세 | 컬렉션 |
| 자주 묻는 질문 | `/faq` | 페이지 › 자주 묻는 질문 | 글로벌 |
| 소식 | `/news`, `/news/<seq>` | 소식·미디어 › 소식 | 컬렉션 |
| 모임·행사 일정 | `/news/schedule`, `/news/schedule/<seq>` | 소식·미디어 › 모임·행사 일정 | 컬렉션 |
| 간증 | `/testimony`, `/testimony/<seq>` | 소식·미디어 › 간증 | 컬렉션 |
| 채널 | `/media/channels` | 페이지 › 사역·소개 상세 (slug `channels`) | 컬렉션 |
| 개인정보 처리방침 | `/privacy`, `/privacy/<seq>` | 설정 › 개인정보 처리방침 | 컬렉션 |
| 사진·영상 파일 | 전체 | 설정 › 사진·파일 | 컬렉션 |

## 입력 규칙

- **slug / seq**: 주소를 정하는 값입니다. 사역·소개 상세는 `bible-study`, `campus`, `workplace`, `military`, `missions`, `church-contribution`, `vision-center`, `channels`.
- **anchor**: 페이지 안에서 섹션으로 이동할 때 쓰는 영문 id입니다(예: `sunday`, `grace-spring`).
- **"비우면 표시 안 함"** 이라고 적힌 묶음(하단 CTA, 함께 성장 섹션, 다운로드 버튼, 강조 항목 등)은 제목을 비워 두면 그 블록이 나오지 않습니다.
- **사진 자리**: 파일을 올리지 않으면 회색 자리 표시가 나옵니다. 올린 파일은 저장소 루트의 `/media`에 저장됩니다(git에는 올라가지 않음).

## 대체 표시

각 리포지토리(`src/lib/data/*`)는 Payload를 먼저 읽고, 아래 경우에는 `src/features/main-template/*`의 임시 내용을 보여 줍니다.

- 컬렉션에 해당 slug/seq 문서가 없을 때
- 글로벌을 한 번도 저장하지 않았을 때
- DB 연결 오류

그래서 실제 내용을 하나씩 채워 넣는 동안에도 사이트가 비지 않습니다.

## 구조 (개발용)

- 컬렉션: `src/collections/*`, 글로벌: `src/globals/*`, 공통 필드: `src/payload/fields.ts`
- 필드 이름은 화면 타입(`src/types/pageTemplates.ts`, `mainTemplate.ts`)과 같게 맞췄습니다.
  업로드 필드는 URL로, `anchor`는 `id`로, `blocks`의 종류는 유니언 값으로 바뀝니다(`src/lib/payload/clean.ts`).
- 시드: `scripts/seedPayload.ts` → `scripts/seedContent.ts`
- 운영 배포 시 `payload.config.ts`의 `sqliteAdapter`를 Postgres 어댑터로 바꾸고 `PAYLOAD_SECRET`을 설정합니다.
- 아직 내용 매핑이 없는 예비 템플릿 페이지(`/service/portal`, `/service/1784`, `/media/naverReports`, `/media/aiInNaver`)는 메뉴에 없고 임시 내용만 씁니다.
