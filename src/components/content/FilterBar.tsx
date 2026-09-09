"use client";

export function FilterBar({ options, value, query, onChange, onQuery }: { options: string[]; value: string; query: string; onChange: (value: string) => void; onQuery: (value: string) => void }) {
  return <div className="content-filter-bar"><div role="tablist">{options.map((option) => <button key={option} type="button" role="tab" aria-selected={value === option} onClick={() => onChange(option)}>{option}</button>)}</div><input value={query} onChange={(event) => onQuery(event.target.value)} placeholder="검색" aria-label="검색" /></div>;
}
