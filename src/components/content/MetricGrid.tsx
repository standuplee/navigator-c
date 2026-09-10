import type { MetricItem } from "@/types/components";

export function MetricGrid({ items }: { items: MetricItem[] }) {
  return <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map((item) => <div className="bg-zinc-100 p-6" key={item.label}><dt className="text-sm text-zinc-500">{item.label}</dt><dd className="my-3 text-3xl font-bold">{item.value}{item.unit && <small className="ml-1 text-sm">{item.unit}</small>}</dd>{item.description && <p className="text-sm leading-6 text-zinc-600">{item.description}</p>}</div>)}</dl>;
}
