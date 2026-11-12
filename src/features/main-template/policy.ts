import type { PolicyBlock, PolicyContent } from "@/types/pageTemplates";

/** Placeholder privacy policy content (/policy/privacy, /policy/privacyDetail).
 * Wording is a generic skeleton — the real policy text is entered in the admin. */
const blocks = (version: string): PolicyBlock[] => [
  { type: "paragraph", text: `본 개인정보 처리방침(${version})은 공동체가 제공하는 웹사이트와 모임 신청 과정에서 수집하는 개인정보의 처리 기준을 안내합니다.` },
  { type: "heading", text: "1. 수집하는 개인정보 항목과 수집 방법" },
  { type: "paragraph", text: "모임 신청, 문의 접수 과정에서 아래와 같이 최소한의 개인정보를 수집합니다." },
  {
    type: "table",
    columns: ["수집 시점", "처리 목적", "수집 항목", "보유 기간"],
    rows: [
      ["모임 신청", "참가자 확인 및 안내", "이름, 연락처, 소속(학과)", "모임 종료 후 1년"],
      ["문의 접수", "문의 답변", "이름, 이메일, 문의 내용", "답변 완료 후 1년"],
      ["뉴스레터 신청", "소식 발송", "이메일", "구독 해지 시까지"],
    ],
  },
  { type: "heading", text: "2. 개인정보의 처리 목적" },
  { type: "list", items: ["모임 및 행사 참가 신청 확인과 안내", "문의 사항에 대한 답변", "공동체 소식 전달(동의한 경우에 한함)"] },
  { type: "heading", text: "3. 개인정보의 보유 및 이용 기간" },
  { type: "paragraph", text: "수집한 개인정보는 처리 목적이 달성되면 지체 없이 파기합니다. 다만 관련 법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 보관합니다." },
  { type: "heading", text: "4. 개인정보의 제3자 제공" },
  { type: "paragraph", text: "이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 법령에 근거한 요청이 있는 경우에 한해 예외로 합니다." },
  { type: "heading", text: "5. 정보주체의 권리와 행사 방법" },
  { type: "paragraph", text: "이용자는 언제든지 자신의 개인정보 열람, 정정, 삭제, 처리 정지를 요구할 수 있으며, 아래 담당자에게 연락해 요청할 수 있습니다." },
  { type: "heading", text: "6. 개인정보 보호책임자" },
  { type: "table", columns: ["구분", "내용"], rows: [["담당자", "플레이스홀더"], ["연락처", "플레이스홀더"], ["이메일", "플레이스홀더"]] },
  { type: "heading", text: "7. 부칙" },
  { type: "paragraph", text: "본 방침은 공지일로부터 7일 후 시행합니다." },
];

const dates = ["2026.08.26", "2025.11.03", "2025.03.17", "2024.09.02", "2024.01.15", "2023.06.30", "2022.12.01", "2022.04.11", "2021.10.05", "2021.02.22", "2020.08.10", "2020.01.06", "2019.07.01"];

export const privacyPolicy: PolicyContent = {
  title: "개인정보 처리방침",
  listTitle: "개인정보 처리방침 목록",
  versions: dates.map((date, index) => {
    const version = `VER ${(dates.length - index).toFixed(1)}`;
    return { seq: String(dates.length - index), title: `개인정보 처리방침 (${version})`, date, blocks: blocks(version) };
  }),
};
