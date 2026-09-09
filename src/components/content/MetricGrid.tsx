import type { MetricItem } from "@/types/components";

export function MetricGrid({ items }: { items: MetricItem[] }) {
  return <dl className="content-metric-grid">{items.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}{item.unit && <small>{item.unit}</small>}</dd>{item.description && <p>{item.description}</p>}</div>)}</dl>;
}
