import type { ServiceDetailContent, ServiceProduct } from "@/types/pageTemplates";
import { pressReleaseList } from "./pressReleases";

/** Content for the service-detail template: the ministry pages, the vision center and the
 * channels page carry the text of navigators-seoulc.org (sub1 / sub2, main); portal and 1784
 * are reserve templates with neutral dummy text. Edited later in the admin (service-pages). */

const related = pressReleaseList.slice(0, 6).map((item) => ({
  id: item.id,
  title: item.title,
  href: item.href,
  date: item.date,
  category: item.category,
}));

const LINKS = [
  { label: "앱 내려받기", href: "#" },
  { label: "웹에서 보기", href: "#" },
];

function product(id: string, title: string, description: string, opts: Partial<ServiceProduct> = {}): ServiceProduct {
  return { id, title, description, links: LINKS, images: [{ label: `${title} 화면 1` }, { label: `${title} 화면 2` }], ...opts };
}

function items(prefix: string, names: string[]) {
  return names.map((name) => ({ title: name, description: `${prefix} 안에서 ${name} 기능이 하는 일을 짧게 설명하는 자리입니다.`, image: { label: name } }));
}

const iconHero = (title: string, description: string, count: number) => ({
  variant: "icon-grid" as const,
  title,
  description,
  icons: Array.from({ length: count }, (_, index) => `${title} 아이콘 ${index + 1}`),
});

export type ServiceDetailKey =
  | "bible-study" | "church-contribution" | "missions" | "workplace" | "military" | "channels" | "vision-center" | "campus" | "portal" | "space1784";

export const serviceDetails: Record<ServiceDetailKey, ServiceDetailContent> = {
  "bible-study": {
    title: "성경공부",
    hero: iconHero("성경공부", "“네가 진리의 말씀을 옳게 분변하며 부끄러울 것이 없는 일꾼으로 인정된 자로 자신을 하나님 앞에 드리기를 힘쓰라” 디모데후서 2:15", 3),
    layout: "sticky-visual",
    products: [
      { id: "growth", title: "말씀으로 자라는 제자", description: "성경공부를 통해 예수 그리스도와 복음, 성경에 대해 잘 알게 될 뿐만 아니라 주님의 제자와 일꾼으로 성장하게 됩니다.", images: [{ label: "성경공부 사진 1" }, { label: "성경공부 사진 2" }] },
      { id: "systematic", title: "수준별, 체계적인 성경공부", description: "네비게이토 성경공부는 수준별, 체계적인 성경공부로 교계 많은 목사님들도 추천할 정도로 유명합니다. 네비게이토 성경공부 교재는 한국 교회의 70% 이상이 사용하고 있으며 대학 채플에서도 많이 사용되고 있습니다.", images: [{ label: "성경공부 교재" }] },
      { id: "small-group", title: "주일 소그룹 성경공부", description: "네비게이토 주일 성경공부는 소그룹으로 진행하고 있습니다.", links: [{ label: "주일교제 안내", href: "/fellowship/gatherings" }], images: [{ label: "소그룹 성경공부" }] },
    ],
    related,
  },
  campus: {
    title: "캠퍼스",
    hero: iconHero("캠퍼스", "네비게이토 서울 C지구는 중앙대 기독교 동아리로서 캠퍼스 사역을 하고 있습니다.", 4),
    layout: "sticky-visual",
    products: [
      { id: "joy", title: "선한 목자 되신 하나님을 알아가는 즐거움", description: "학생들이 사랑의 하나님을 알아가고 말씀에 순종, 넘치는 축복을 누리도록 돕고 있습니다. QT모임, 기도 등을 통해 하나님과 동행하는 대학생활을 하고 있습니다. 크리스찬이 아니어도 누구든지 동아리방에 와서 성경을 함께 읽고 나눌 수 있습니다.", images: [{ label: "캠퍼스 사진 1" }, { label: "캠퍼스 사진 2" }] },
      { id: "victory", title: "승리하는 대학생활", description: "믿음생활 뿐 아니라 네비게이토 선배들은 대학생활에 실질적인 도움을 주는 좋은 멘토가 되어주고 있습니다. 다양한 직장의 선배들의 유익한 조언을 들을 수 있는 기회도 있습니다.", images: [{ label: "캠퍼스 사진 3" }] },
      { id: "fun", title: "즐거운 대학생활", description: "하나님 안에는 모든 즐거움과 기쁨이 있습니다. 여행, 스포츠, 공연, 베이킹, 영어회화, 싸이클링 등 다양한 즐거움과 경험을 하나님 안에서 누릴 수 있습니다.", links: [{ label: "스포츠", href: "/fellowship/leisure#sports" }, { label: "Enjoy", href: "/fellowship/leisure#enjoy" }], images: [{ label: "캠퍼스 사진 4" }] },
    ],
    related,
  },
  workplace: {
    title: "직장",
    hero: iconHero("직장", "하나님과 동행하는 즐거운 직장생활", 3),
    layout: "sticky-visual",
    products: [
      { id: "walk", title: "하나님과 동행하는 즐거운 직장생활", description: "꿈에도 그리던 직장생활이지만 막상 수많은 어려움에 직면하면, 나는 이 직장을 위한 기계인건지, 나는 무엇을 위해 사는 것인지 등 많은 고민에 빠지게 됩니다. 네비게이토는 직장인들이 하나님과 동행하며 인생의 진정한 비전을 설계할 수 있도록 돕고 있습니다. 바쁜 중에도 주님과 은혜로운 교제로 힘을 얻고, 오히려 기쁨, 평안, 기대로 하루의 업무를 시작합니다. 이렇게 직장생활을 해 나갈 때 동료들과 만나는 사람들에게 선한 영향력을 끼치고, 빛 된 삶을 살아가게 되는 것은 자연스러운 결과입니다.", images: [{ label: "직장 사진" }] },
      { id: "growth", title: "진정한 자기계발", description: "직장생활은 업무 능력과 여러 성숙한 성품을 필요로 합니다. 사회성, 사랑과 섬김, 겸손함, 경청함, 배려, 탁월함, 적극성, 성실함, 책임감…. 네비게이토 직장인들은 예수님의 성품을 닮기 위해 훈련하고 있습니다. 그 결과, 직장에서 축복을 누리고 있습니다.", images: [{ label: "직장인 모임" }] },
      { id: "head", title: "꼬리가 아닌 머리가 되게 해주시는 하나님", description: "“너희는 먼저 그의 나라와 그의 의를 구하라 그리하면 이 모든 것을 너희에게 더하시리라” 마태복음 6:33 — 우리를 사랑하시는 하나님을 우선순위에 두고 말씀에 순종하는 삶을 살면, 어려워 보였던 문제들이 해결되고 형통해지는 경험을 할 수 있습니다. 네비게이토 직장인 형제자매들은 하나님과 동행하는 직장생활을 잘 하기 위해 서로를 붙들어주고 있습니다.", images: [{ label: "직장인 교제" }] },
    ],
    related,
  },
  military: {
    title: "군대",
    hero: { variant: "fullscreen", title: "군대", description: "나라를 지키는 군인으로, 그리스도의 군사로" },
    layout: "stacked",
    products: [
      { id: "mission", title: "그리스도의 군사로서", description: "네비게이토 군인들은 휴전국의 군인으로서 늘 전쟁에 대비하여 나라를 지키는 군 본연의 임무에 충실하게 임하고, 또 그리스도의 군사로서 군대 내에 있는 많은 영혼을 인도하는 삶을 살아가고 있습니다.", images: [{ label: "군 사역" }] },
      { id: "gospel", title: "군대의 영혼들에게 복음을", description: "군대의 많은 영혼에게 복음을 전해 영혼들을 구하며 하나님 나라의 충성된 군사로 성장하도록 도와가고 있습니다.", images: [{ label: "군 사역 2" }] },
      { id: "together", title: "군 생활을 함께", description: "군 기간동안 함께 성경말씀을 나누며 하나님을 알려주고, 군생활의 적응도 도와주고 함께 말씀을 배워가며 성장해갈 수 있도록 돕고 있습니다.", images: [{ label: "군 사역 3" }] },
    ],
    related,
  },
  missions: {
    title: "해외",
    hero: iconHero("해외", "네비게이토 서울 C지구는 세계 각국으로 선교사를 파송하고 있습니다.", 4),
    layout: "sticky-visual",
    products: [
      { id: "sending", title: "세계로 보내는 일꾼", description: "영국, 캄보디아, 멕시코, 미국 등 세계 여러 나라에서 그리스도의 질적인 일꾼들이 세워지게 되었고, 재생산과 배가가 이루어지고 있습니다.", images: [{ label: "해외 사진 1" }, { label: "해외 사진 2" }] },
      { id: "uk", title: "영국", description: "영국 형제자매들 사진입니다.", images: [{ label: "영국" }] },
      { id: "cambodia", title: "캄보디아", description: "캄보디아 형제자매들 사진입니다.", images: [{ label: "캄보디아" }] },
      { id: "mexico", title: "멕시코", description: "멕시코 형제자매들 사진입니다.", images: [{ label: "멕시코" }] },
      { id: "usa", title: "미국", description: "미국 형제자매들 사진입니다.", images: [{ label: "미국" }] },
    ],
    related,
  },
  "church-contribution": {
    title: "교계 기여",
    hero: { variant: "fullscreen", title: "교계 기여", description: "네비게이토에서 제자 삼는 사역을 위해 계발한 도구 및 예화들은 오늘날 많은 그리스도인들이 사용하고 있습니다." },
    layout: "stacked",
    products: [
      {
        id: "tools",
        title: "도구와 교재",
        description: "많은 교회와 그리스도인이 사용하는 네비게이토의 도구들입니다.",
        images: [],
        items: [
          { title: "경건의 시간(Quiet Time)", description: "경건의 시간을 한국에 처음 소개하고 보급하는 데 기여했습니다. 그래서 많은 그리스도인들이 하루 첫 시간에 하나님과 교제를 갖는 데 도움을 주고 있습니다.", image: { label: "경건의 시간" } },
          { title: "성경공부 교재", description: "네비게이토 성경공부 교재는 현재 많은 교회와 기독교 대학들의 채플 교재로 쓰이고 있습니다.", image: { label: "성경공부 교재" } },
          { title: "암송카드", description: "네비게이토 창시자 도슨 트로트맨은 믿음성장에서 성경암송의 중요성을 알고 암송카드를 사용하여 꾸준히 암송을 했습니다. 여기에서 시작된 네비게이토 암송카드는 현재 많은 교회에서 사용하고 있습니다.", image: { label: "암송카드" } },
          { title: "전도지", description: "네비게이토 전도지는 복음의 핵심을 잘 설명하고 있어 복음을 능력 있게 전하는 데 효과적입니다.", image: { label: "전도지" } },
          { title: "성경색인", description: "성경색인은 도슨 트로트맨이 주일학교 선생님으로 있을 때 아이들이 어떻게 하면 성경책을 빨리 찾을 수 있을까 생각하여 고안된 것입니다.", image: { label: "성경색인" } },
        ],
      },
      {
        id: "illustrations",
        title: "예화",
        description: "제자 삼는 사역을 위해 계발한 예화들입니다.",
        images: [],
        links: [{ label: "네비게이토 도구 자세히 보기", href: "/about/tools" }],
        items: [
          { title: "‘말씀의 손’ 예화", description: "묵상, 암송, 공부, 읽기, 듣기. 이 5가지를 균형 있게 해 나갈 때, 말씀을 효과적으로 섭취할 수 있습니다.", image: { label: "말씀의 손" } },
          { title: "‘기도의 손’ 예화", description: "찬양, 감사, 자백, 중보, 간구. 이 5가지는 균형 있는 기도를 할 수 있는 방법입니다.", image: { label: "기도의 손" } },
          { title: "Wheel Life", description: "성령충만한 그리스도인의 삶을 사는 데 필요한 원리를 도슨 트로트맨은 휠라이프(Wheel life) 예화로 잘 설명하였습니다.", image: { label: "Wheel Life" } },
          { title: "‘V Hand’ 예화", description: "V Hand는 그리스도인의 승리하는 삶을 제시해줍니다. 요일 2:15~16", image: { label: "V Hand" } },
        ],
      },
      {
        id: "history",
        title: "교계 기록·훈련",
        description: "한국 교회와 함께 걸어온 기록입니다.",
        images: [],
        items: [
          { title: "한국 교회 100주년사", description: "한국 교회 100주년사에 “제자 삼는 사역을 처음 시작한 곳은 네비게이토”라고 기록되어 있습니다.", image: { label: "한국 교회 100주년사" } },
          { title: "교회 제자 훈련원", description: "네비게이토 교회 제자 훈련원에서는 목회자를 위한 교회 제자 훈련 세미나를 개최하여 목회자들이 제자훈련목회를 할 수 있도록 돕고 있습니다.", image: { label: "교회 제자 훈련원" } },
        ],
      },
    ],
    related,
  },
  "vision-center": {
    title: "비전관",
    hero: { variant: "fullscreen", title: "비전관", description: "상도동에 위치한 비전관에서 주일교제와 성경공부를 하고 있습니다.", media: { kind: "image", label: "비전관" } },
    layout: "stacked",
    products: [
      {
        id: "floors",
        title: "층별 소개",
        description: "서울 C지구 비전관 : 서울시 동작구 상도로 39가길 1 (상도1동 458-2)",
        images: [],
        items: [
          { title: "1층 · 예배실", description: "언제나 십자가는 환히 밝혀져 있고, 기도음악이 흐르고 있습니다. 주중에도 자유롭게 이곳에서 성경을 읽고 기도하는 시간을 가질 수 있습니다.", image: { label: "1층 예배실" } },
          { title: "2층 · 카페 ‘잔잔한 물가’", description: "“여호와는 나를 잔잔한 물가로 이끌어 쉬게 하시며” 시 23:2 — 하나님의 마음을 담은 따뜻하고 행복하고 아름다운 카페입니다. 깔끔한 드립 커피와 직접 만든 음료와 샌드위치까지, 잔잔하고 평안한 시간 누리세요.", image: { label: "2층 카페" } },
          { title: "3·4층 · 라이브러리와 ‘주님 품’", description: "조용히 성경을 읽거나 공부를 할 수 있는 ‘라이브러리’, 편하게 쉴 수 있는 휴식공간 ‘주님 품’이 있는 생활 공간 층입니다.", image: { label: "3·4층 라이브러리" } },
          { title: "피트니스 공간", description: "함께 운동하며 건강을 지킬 수 있는 피트니스 공간입니다.", image: { label: "피트니스 공간" } },
          { title: "옥상 기도실", description: "골방에서 주님과 단둘이 대화하고 싶을 때, 아늑한 기도실이 있습니다.", image: { label: "옥상 기도실" } },
          { title: "지하 · 탁구장", description: "탁구대 및 탁구용품들이 구비되어 함께 운동을 즐길 수 있습니다.", image: { label: "지하 탁구장" } },
        ],
      },
      {
        id: "places",
        title: "모이는 곳",
        description: "비전관과 캠퍼스 동아리방에서 만납니다.",
        images: [],
        items: [
          { title: "서울 C지구 비전관", description: "서울시 동작구 상도로 39가길 1 (상도1동 458-2) — 주일교제와 성경공부", image: { label: "비전관" } },
          { title: "중앙대 동아리방", description: "중앙대학교 107관(학생회관) 1층", image: { label: "동아리방" } },
        ],
      },
    ],
    cta: { title: "비전관에 오고 싶다면", description: "주일 오후 2:30, 주일교제에 함께해요.", href: "/about/contact", ctaLabel: "오시는 길" },
    related,
  },
  channels: {
    title: "채널",
    hero: iconHero("채널", "유튜브와 인스타그램에서 네비게이토 서울C 중앙대를 만나보세요.", 2),
    layout: "sticky-visual",
    products: [
      { id: "youtube", title: "유튜브 · 네비게이토 서울C 중앙대", description: "주일교제와 간증, 커플스터디 영상을 볼 수 있습니다.", links: [{ label: "유튜브 채널", href: "https://www.youtube.com/channel/UCplE5M_H4uWxQNuo5JyKpYQ" }], images: [{ label: "유튜브 영상 1"}, { label: "유튜브 영상 2" }] },
      { id: "instagram", title: "인스타그램 · 중앙대 기독교동아리 네비게이토", description: "궁금한 점은 인스타그램 DM으로 남겨주세요. 확인하고 정성껏 답을 드리겠습니다.", links: [{ label: "인스타그램", href: "https://www.instagram.com/nav_cau" }], images: [{ label: "인스타그램" }] },
    ],
    related,
  },
  portal: {
    title: "처음 오셨나요?",
    hero: iconHero("처음 오셨나요?", "누구나 환영합니다. 처음 오신 분을 위한 안내입니다.", 2),
    layout: "sticky-visual",
    products: [
      product("first-visit", "첫 방문 안내", "주일 오후 2:30, 상도동 비전관으로 오세요. 1부 찬양과 간증, 2부 그룹별 성경공부가 이어집니다. 안 믿어도, 처음이어도 괜찮습니다."),
      product("newcomer-study", "새가족 성경공부", "처음 오신 분은 입문 교재로 선배 한 명과 함께 시작합니다. 궁금한 것을 마음껏 물어볼 수 있습니다."),
      product("ask-first", "먼저 물어보고 싶다면", "인스타그램 @nav_cau로 DM을 남겨주세요. 확인하고 정성껏 답을 드리겠습니다."),
    ],
    related,
  },
  space1784: {
    title: "수양회",
    hero: { variant: "fullscreen", title: "수양회", description: "아름다운 바닷가와 청량한 산에서, 하나님과 함께하는 시간", media: { kind: "video" } },
    layout: "stacked",
    products: [
      { id: "retreat-word", title: "말씀 앞에서", description: "새벽 묵상과 조별 성경공부, 저녁 집회로 하루를 채웁니다.", images: [], items: items("수양회", ["새벽 묵상", "조별 성경공부", "저녁 집회"]) },
      { id: "retreat-fellowship", title: "함께하는 교제", description: "텐트를 치고 밥을 지으며 서로를 알아갑니다.", images: [], items: items("수양회", ["캠핑", "조별 식사", "밤 찬양", "기도 나눔"]) },
      { id: "retreat-nature", title: "자연 속에서", description: "바닷가 레크리에이션과 산행으로 몸과 마음을 쉬게 합니다.", images: [], items: items("수양회", ["바닷가 레크리에이션", "산행", "캠프파이어", "단체 사진"]) },
    ],
    cta: { title: "다음 수양회가 궁금하다면", description: "일정은 모임 일정에서 확인할 수 있습니다.", href: "/news/schedule", ctaLabel: "모임 일정" },
    related,
  },
};
