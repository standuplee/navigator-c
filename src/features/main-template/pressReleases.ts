import { withSampleImages } from "./sampleImages";
import type { NewsCardItem } from "@/types/mainTemplate";
import type { ArticleDetail } from "@/types/content";

/** Dummy news for /news (content-list-filter-pagination / article-detail): notices,
 * community news and event reports of 서울C지구. Written for layout; replace in the admin
 * (press-releases). */
type Entry = { id: string; category: "공지" | "소식" | "행사"; date: string; title: string; tags: string[]; paragraphs: string[] };

const entries: Entry[] = [
  { id: "n2611-1", category: "공지", date: "2026.11.10", title: "12월 이브파티 준비팀 모집", tags: ["이브파티"], paragraphs: [
    "올해 이브파티를 함께 준비할 섬김이를 모집합니다. 찬양, 연극, 영상, 데코, 음식 등 원하는 팀을 선택할 수 있습니다.",
    "준비 모임은 11월 셋째 주부터 매주 목요일 저녁 비전관 2층에서 진행됩니다.",
    "신청은 주일교제 후 안내 데스크 또는 인스타그램 DM으로 받습니다.",
  ] },
  { id: "n2611-2", category: "소식", date: "2026.11.03", title: "가을 학기 은혜의 샘, 마가복음 완독", tags: ["은혜의 샘", "복음서"], paragraphs: [
    "9월에 시작한 은혜의 샘이 마가복음 16장을 모두 함께 읽고 마무리했습니다.",
    "이번 학기에는 처음 참석한 새내기 열두 명이 함께했고, 마지막 주에는 각자 가장 기억에 남는 장면을 나눴습니다.",
    "다음 주부터는 누가복음을 이어서 읽습니다. 처음 오셔도 부담 없이 참여할 수 있습니다.",
  ] },
  { id: "n2610-1", category: "행사", date: "2026.10.25", title: "가을 MT 다녀왔습니다", tags: ["Enjoy", "MT"], paragraphs: [
    "가평에서 1박 2일 가을 MT를 다녀왔습니다. 레크리에이션과 바비큐, 밤 찬양까지 알찬 시간이었습니다.",
    "둘째 날 아침에는 조별로 말씀을 묵상하고 서로를 위해 기도했습니다.",
  ] },
  { id: "n2610-2", category: "공지", date: "2026.10.12", title: "시험 기간 주일교제 시간 안내", tags: ["주일교제"], paragraphs: [
    "중간고사 기간인 10월 셋째 주에는 주일교제가 1부 찬양과 말씀으로만 진행됩니다.",
    "그룹별 성경공부는 시험이 끝난 다음 주부터 다시 시작합니다. 비전관 3층 라이브러리는 시험 기간 동안 늦게까지 열어둡니다.",
  ] },
  { id: "n2609-1", category: "소식", date: "2026.09.21", title: "새 학기 개인교제 매칭 완료", tags: ["개인교제", "양육"], paragraphs: [
    "가을 학기 1:1 개인교제 매칭이 마무리되었습니다. 이번 학기에는 스물네 쌍이 함께 말씀을 공부합니다.",
    "매칭을 원했지만 아직 연결되지 않은 분은 간사님께 따로 연락해 주세요.",
  ] },
  { id: "n2609-2", category: "행사", date: "2026.09.06", title: "새내기 환영 주일교제", tags: ["새내기", "주일교제"], paragraphs: [
    "개강 첫 주일, 새내기 환영 교제가 비전관에서 열렸습니다. 선배들이 준비한 웰컴 키트와 간식으로 새 학기를 시작했습니다.",
    "2부 그룹별 성경공부에서는 새내기들을 위한 입문 교재로 첫 모임을 가졌습니다.",
  ] },
  { id: "n2608-1", category: "행사", date: "2026.08.18", title: "2026 여름 캠핑 수양회 후기", tags: ["여름 캠핑 수양회"], paragraphs: [
    "3박 4일 동안 동해 바닷가에서 여름 캠핑 수양회를 가졌습니다. 주제 말씀은 ‘그리스도를 알고, 그를 알게 하라’였습니다.",
    "새벽 묵상, 조별 성경공부, 저녁 집회와 바닷가 레크리에이션까지 함께했습니다.",
    "수양회 사진은 갤러리에서 볼 수 있습니다.",
  ] },
  { id: "n2607-1", category: "공지", date: "2026.07.01", title: "STP 등록 안내", tags: ["STP", "Training Program"], paragraphs: [
    "여름방학 STP(Summer Training Program)는 7월 둘째 주부터 6주 동안 매주 화·목요일에 진행됩니다.",
    "성경 1독과 암송, 소그룹 나눔을 함께합니다. 등록은 6월 마지막 주일까지 받습니다.",
  ] },
  { id: "n2606-1", category: "소식", date: "2026.06.14", title: "졸업생 직장 사역 모임 시작", tags: ["직장"], paragraphs: [
    "올해 졸업한 형제자매들을 중심으로 직장 사역 모임이 새로 시작되었습니다.",
    "매달 둘째 주 토요일 오전, 비전관 카페에서 말씀과 일터 이야기를 나눕니다.",
  ] },
  { id: "n2605-1", category: "소식", date: "2026.05.20", title: "캄보디아 단기선교팀 귀국 보고", tags: ["해외", "단기선교"], paragraphs: [
    "열흘간의 캄보디아 단기선교를 마친 팀이 주일교제에서 귀국 보고를 했습니다.",
    "현지 선교사님 가정과 함께한 어린이 사역과 영어 성경공부 이야기를 나누고, 함께 기도했습니다.",
  ] },
  { id: "n2604-1", category: "행사", date: "2026.04.18", title: "봄 피크닉, 한강에서", tags: ["Enjoy", "피크닉"], paragraphs: [
    "중간고사가 끝난 주말, 한강에서 봄 피크닉을 가졌습니다. 돗자리와 도시락, 그리고 작은 체육대회까지.",
  ] },
  { id: "n2603-1", category: "공지", date: "2026.03.02", title: "2026 봄 학기 모임 일정", tags: ["주일교제", "은혜의 샘"], paragraphs: [
    "봄 학기 주일교제는 매주 주일 오후 2시 30분, 은혜의 샘은 매주 화요일 오후 7시에 비전관에서 모입니다.",
    "중앙대 107관 1층 동아리방은 평일 낮 동안 열려 있습니다. 언제든 들러 주세요.",
  ] },
];

export const pressReleaseList: NewsCardItem[] = withSampleImages(entries.map(({ id, category, date, title, tags }) => ({
  id,
  category,
  date,
  title,
  tags,
  href: `/news/${id}`,
  tone: "light" as const,
})));

const detailBySeq: Record<string, ArticleDetail> = Object.fromEntries(
  entries.map((item) => [
    item.id,
    {
      category: item.category,
      title: item.title,
      date: item.date,
      publishedAt: item.date,
      images: [{ src: "", alt: `${item.title} 사진`, caption: "" }], // filled from the list image below
      paragraphs: item.paragraphs,
    } satisfies ArticleDetail,
  ])
);

export function getPressRelease(seq?: string): ArticleDetail {
  const detail = (seq && detailBySeq[seq]) || detailBySeq[pressReleaseList[0].id];
  const image = pressReleaseList.find((item) => item.title === detail.title)?.image ?? "";
  return { ...detail, images: detail.images.map((figure) => ({ ...figure, src: figure.src || image })) };
}
