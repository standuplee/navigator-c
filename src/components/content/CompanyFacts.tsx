export function CompanyFacts({ items }: { items: Array<{ label: string; value: string }> }) {
  return <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map((item) => <div className="bg-zinc-100 p-6" key={item.label}><dt className="text-sm text-zinc-500">{item.label}</dt><dd className="mt-3 font-semibold">{item.value}</dd></div>)}</dl>;
}
