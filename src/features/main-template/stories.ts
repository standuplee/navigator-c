import type { Story, StoryDetail } from "@/types/story";

/** Placeholder story content for the `story-list` / `story-detail` templates. */
export const storyList: Story[] = [
  { seq: "s1", category: "Tech", date: "2026.09.04", title: "분산 추론 인프라로 응답 속도를 3배 끌어올린 과정", tags: ["인프라", "AI"], image: "" },
  { seq: "s2", category: "People", date: "2026.08.24", title: "신입 개발자가 겪은 첫 배포의 기록", tags: ["Culture"], image: "" },
  { seq: "s3", category: "Service", date: "2026.07.16", title: "AI 큐레이션이 바꾼 쇼핑 경험", tags: ["커머스", "AI"], image: "" },
  { seq: "s4", category: "Leader's View", date: "2026.07.07", title: "연내 접근성 가이드라인을 전면 적용하기로 한 이유", tags: ["접근성"], image: "" },
  { seq: "s5", category: "Culture", date: "2026.06.18", title: "2026 업무 노트 — 기획자·마케터의 기록법", tags: ["Culture"], image: "" },
  { seq: "s6", category: "Impact", date: "2026.05.30", title: "중소 파트너와 함께 만든 상생 프로그램 1년", tags: ["상생"], image: "" },
];

const detailBySeq: Record<string, StoryDetail> = Object.fromEntries(
  storyList.map((story) => [
    story.seq,
    {
      ...story,
      markdown: `이 스토리는 데모용 placeholder 본문입니다. 실제 배포 시 이 자리에 진짜 스토리 콘텐츠가 들어갑니다.\n\n지금은 마크다운 렌더링과 레이아웃을 보여주기 위한 더미 텍스트입니다. **굵게**, *기울임* 같은 서식도 지원합니다.\n\n- 목록 항목 하나\n- 목록 항목 둘`,
    } satisfies StoryDetail,
  ])
);

export function findStoryDetail(seq?: string): StoryDetail {
  return (seq && detailBySeq[seq]) || detailBySeq[storyList[0].seq];
}
