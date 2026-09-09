export function ResearchAreaList({ title, items }: { title: string; items: Array<{ name: string; description: string }> }) {
  return <section className="content-research"><h3>{title}</h3><ul>{items.map((item) => <li key={item.name}><strong>{item.name}</strong><p>{item.description}</p></li>)}</ul></section>;
}
