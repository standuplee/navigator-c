import type { NewsCardItem } from "@/types/mainTemplate";

/** Dummy ministry reports for /media/naverReports (사역 리포트). Placeholder titles. */
const report = (id: string, category: string, date: string, title: string, tags: string[]): NewsCardItem => ({
  id, category, date, title, tags, href: `/media/naverReportsDetail?seq=${id}`, tone: "light",
});

export const naverReportsList: NewsCardItem[] = [
  report("rp1", "사역 보고", "2026.09.30", "2026 상반기 서울C지구 사역 보고", ["사역 보고"]),
  report("rp2", "수양회", "2026.08.28", "2026 여름 캠핑 수양회 결산", ["수양회"]),
  report("rp3", "훈련", "2026.08.25", "STP 2026 — 6주 성경 1독 기록", ["STP"]),
  report("rp4", "선교", "2026.05.25", "캄보디아 단기선교 보고서", ["해외"]),
  report("rp5", "훈련", "2026.02.20", "WTP 2026 — 암송과 나눔", ["WTP"]),
  report("rp6", "사역 보고", "2026.01.10", "2025 연간 사역 보고", ["사역 보고"]),
  report("rp7", "수양회", "2025.08.30", "2025 여름 캠핑 수양회 결산", ["수양회"]),
  report("rp8", "선교", "2025.06.12", "해외 파송 선교사 소식 모음", ["해외"]),
];
