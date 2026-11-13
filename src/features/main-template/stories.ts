import { withSampleImages } from "./sampleImages";
import type { Story, StoryDetail } from "@/types/story";

/** Dummy testimonies for /testimony (story-list / story-detail). Fictional people and
 * events written for layout; replace them in the admin (stories). */
type Entry = Story & { markdown: string };

const entries: Entry[] = [
  {
    seq: "t1", category: "캠퍼스", date: "2026.10.28", title: "안 믿던 내가 은혜의 샘에 처음 간 날", tags: ["은혜의 샘", "새내기"], image: "",
    markdown: `신입생 때 동아리 박람회에서 받은 전단지 한 장이 시작이었습니다. 교회에 다녀본 적도 없고, 성경은 두꺼운 책이라는 것밖에 몰랐어요. "안 믿어도 와도 돼요"라는 말에 반신반의하며 화요일 저녁 비전관 문을 열었습니다.\n\n## 질문해도 괜찮은 자리\n\n복음서를 한 장씩 같이 읽으면서 궁금한 걸 마음껏 물어볼 수 있었습니다. 누구도 정답을 강요하지 않았고, 선배들은 제 질문을 끝까지 들어주었어요. 그 자리에서 예수님이 어떤 분인지 처음으로 궁금해졌습니다.\n\n## 지금은\n\n한 학기가 지나 이제는 주일교제에도 함께하고 있습니다. 아직 모르는 게 많지만, 매주 화요일이 기다려진다는 것만은 분명합니다.\n\n> 너희가 진리를 알지니 진리가 너희를 자유롭게 하리라 (요 8:32)`,
  },
  {
    seq: "t2", category: "훈련", date: "2026.09.15", title: "STP 6주, 성경 1독을 마치고", tags: ["STP", "성경 1독"], image: "",
    markdown: `여름방학마다 "이번엔 성경을 다 읽어야지" 다짐만 하다 끝났습니다. 올해는 STP에 등록해 화요일과 목요일마다 함께 읽고 나눴어요.\n\n## 혼자가 아니어서\n\n하루 분량이 밀린 날에도 같은 조 지체들이 기도해 주고 기다려 주었습니다. 레위기에서 멈출 뻔했지만, 서로의 읽기표를 확인하며 끝까지 갈 수 있었어요.\n\n## 남은 것\n\n마지막 주에 요한계시록을 덮으며 성경 전체가 한 분의 이야기라는 게 처음으로 실감났습니다. 이제는 매일 아침 QT로 이어가고 있습니다.`,
  },
  {
    seq: "t3", category: "수양회", date: "2026.08.20", title: "바닷가 캠핑 수양회에서 다시 만난 하나님", tags: ["여름 캠핑 수양회"], image: "",
    markdown: `시험과 아르바이트로 지쳐 있던 여름, 수양회는 사실 쉬러 가는 마음이었습니다.\n\n## 텐트 앞에서 드린 기도\n\n새벽 바닷가에서 말씀을 묵상하던 시간, 오랫동안 하나님과 대화하지 않았다는 걸 깨달았어요. 조원들과 둘러앉아 서로를 위해 기도하던 밤은 잊을 수 없습니다.\n\n## 돌아와서\n\n수양회 후 개인교제를 다시 시작했습니다. 바쁜 일상은 그대로지만, 그 안에서 주님과 동행하는 법을 조금씩 배우는 중입니다.`,
  },
  {
    seq: "t4", category: "직장", date: "2026.07.02", title: "첫 직장에서 지켜낸 아침 30분", tags: ["직장", "QT"], image: "",
    markdown: `졸업 후 첫 회사에 들어가며 가장 걱정했던 건 신앙생활이었습니다. 야근과 회식 사이에서 말씀을 놓칠까 두려웠어요.\n\n## 출근 전 30분\n\n직장 사역 모임에서 선배가 권한 건 거창한 계획이 아니라 출근 전 30분이었습니다. 지하철 대신 한 정거장 일찍 내려 카페에서 QT를 하는 습관이 생겼어요.\n\n## 일터가 선교지\n\n동료의 고민을 들어주고, 정직하게 일하려 애쓰는 것도 예배라는 걸 배웠습니다. 하나님과 동행하는 직장생활, 이제 막 시작입니다.`,
  },
  {
    seq: "t5", category: "해외", date: "2026.05.18", title: "캄보디아 단기선교, 열흘의 기록", tags: ["해외", "단기선교"], image: "",
    markdown: `현지 선교사님 가정과 함께한 열흘은 짧지만 깊었습니다.\n\n## 말이 통하지 않아도\n\n아이들과 찬양하고 영어 성경공부를 도우며, 언어보다 마음이 먼저 전해진다는 걸 느꼈어요. 매일 저녁 팀원들과 나눈 묵상은 서로에게 큰 힘이 되었습니다.\n\n## 보내는 선교사로\n\n돌아와서는 기도로 함께하는 '보내는 선교사'가 되기로 했습니다. 매달 선교 편지를 함께 읽으며 중보하고 있어요.`,
  },
  {
    seq: "t6", category: "가정", date: "2026.04.06", title: "커플스터디로 시작한 우리 가정의 예배", tags: ["커플스터디", "가정"], image: "",
    markdown: `결혼을 앞두고 커플스터디에 참여했습니다. 둘이 같은 말씀을 읽고 나누는 건 생각보다 어색했어요.\n\n## 대화가 달라졌다\n\n서로의 묵상을 들으며 상대가 무엇을 소망하는지 더 잘 알게 되었습니다. 다툼이 있던 날에도 말씀 앞에 함께 앉으면 마음이 풀렸어요.\n\n## 작은 가정예배\n\n지금은 일주일에 한 번, 저녁 식탁에서 짧은 가정예배를 드립니다. 말씀으로 행복한 가정을 꿈꾸며.`,
  },
  {
    seq: "t7", category: "캠퍼스", date: "2026.03.10", title: "1:1 개인교제, 한 사람이 나에게 쏟은 시간", tags: ["개인교제", "양육"], image: "",
    markdown: `2학년 때 한 선배가 매주 한 시간씩 저와 성경공부를 해주었습니다. 1년 동안 한 번도 빠짐없이요.\n\n## 시간이 증거였다\n\n선배는 바쁜 학기에도 약속을 지켰고, 제 삶의 작은 이야기까지 기억해 주었습니다. 그 성실함이 어떤 설교보다 큰 울림이었어요.\n\n## 이제 내 차례\n\n올해 처음으로 새내기 한 명과 개인교제를 시작했습니다. 받은 사랑을 흘려보내는 게 제자 삼는 삶이라는 걸 배워가고 있습니다.`,
  },
  {
    seq: "t8", category: "훈련", date: "2026.01.27", title: "WTP에서 암송카드 60장을 외우며", tags: ["WTP", "암송"], image: "",
    markdown: `겨울방학 WTP의 목표는 암송카드 60장이었습니다. 처음엔 불가능해 보였어요.\n\n## 하루 한 구절\n\n매일 한 구절씩, 짝과 서로 점검하며 외웠습니다. 걸으면서, 버스에서, 잠들기 전에 카드를 꺼내 보았어요.\n\n## 말씀이 떠오를 때\n\n개강 후 힘든 순간마다 외운 말씀이 먼저 떠올랐습니다. 마음에 새긴 말씀이 삶을 붙드는 힘이 된다는 걸 경험했습니다.`,
  },
];

export const storyList: Story[] = withSampleImages(entries.map(({ seq, category, date, title, tags, image }) => ({ seq, category, date, title, tags, image })));

const detailBySeq: Record<string, StoryDetail> = Object.fromEntries(
  entries.map(({ seq, category, date, title, tags, markdown }) => [seq, { seq, category, date, title, tags, markdown } satisfies StoryDetail])
);

export function findStoryDetail(seq?: string): StoryDetail {
  return (seq && detailBySeq[seq]) || detailBySeq[storyList[0].seq];
}
