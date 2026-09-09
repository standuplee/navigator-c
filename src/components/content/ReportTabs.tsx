"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import type { TabItem } from "@/types/components";

export function ReportTabs({ tabs }: { tabs: TabItem<ReactNode>[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? ""); const current = tabs.find((tab) => tab.id === active) ?? tabs[0];
  if (!current) return null;
  return <section className="content-tabs"><div role="tablist">{tabs.map((tab) => <button key={tab.id} type="button" role="tab" aria-selected={tab.id === active} onClick={() => setActive(tab.id)}>{tab.label}</button>)}</div><div role="tabpanel">{current.content}</div></section>;
}
