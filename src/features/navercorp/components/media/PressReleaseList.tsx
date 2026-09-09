"use client";

import { useMemo, useState } from "react";
import { PressReleaseCard } from "./PressReleaseCard";
import type { PressRelease } from "@/types/pressRelease";

export function PressReleaseList({ items, initialQuery = "", initialPage = 1 }: { items: PressRelease[]; initialQuery?: string; initialPage?: number }) {
  const [year, setYear] = useState("전체 연도");
  const [month, setMonth] = useState("전체 월");
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const filtered = useMemo(() => items.filter((item) => (!query || item.title.toLowerCase().includes(query.toLowerCase()) || item.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))) && (year === "전체 연도" || item.date.startsWith(year)) && (month === "전체 월" || item.date.slice(5, 7) === month)), [items, query, year, month]);
  const pages = Math.max(1, Math.ceil(filtered.length / 8));
  const visible = filtered.slice((page - 1) * 8, page * 8);
  const search = (value: string) => { setQuery(value); setPage(1); };
  return <>
    <div className="press-release-toolbar"><div className="press-release-selects"><select aria-label="연도" value={year} onChange={(e) => { setYear(e.target.value); setPage(1); }}><option>전체 연도</option><option>2026</option><option>2025</option></select><select aria-label="월" value={month} onChange={(e) => { setMonth(e.target.value); setPage(1); }} disabled={year === "전체 연도"}><option>전체 월</option>{Array.from({ length: 12 }, (_, i) => <option key={i}>{String(i + 1).padStart(2, "0")}</option>)}</select></div><form role="search" onSubmit={(e) => e.preventDefault()}><input aria-label="보도자료 검색" value={query} onChange={(e) => search(e.target.value)} placeholder="보도자료 검색" /><button type="submit">검색</button></form></div>
    <div className="press-release-grid">{visible.map((item) => <PressReleaseCard item={item} key={item.seq} />)}</div>
    {!visible.length && <p className="press-release-empty">검색 결과가 없습니다.</p>}
    <nav className="press-release-pagination" aria-label="보도자료 페이지네이션">{Array.from({ length: pages }, (_, i) => <button key={i + 1} type="button" aria-current={page === i + 1 ? "page" : undefined} onClick={() => setPage(i + 1)}>{i + 1}</button>)}</nav>
  </>;
}
