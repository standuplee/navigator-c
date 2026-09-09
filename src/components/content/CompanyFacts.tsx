export function CompanyFacts({ items }: { items: Array<{ label: string; value: string }> }) {
  return <dl className="content-facts">{items.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>;
}
