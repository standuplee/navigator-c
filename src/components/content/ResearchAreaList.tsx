export function ResearchAreaList({ title, items }: { title: string; items: Array<{ name: string; description: string }> }) {
  return <section><h3 className="text-3xl font-semibold tracking-tight">{title}</h3><ul className="grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">{items.map((item) => <li className="bg-zinc-100 p-5" key={item.name}><strong>{item.name}</strong><p className="leading-6 text-zinc-600">{item.description}</p></li>)}</ul></section>;
}
